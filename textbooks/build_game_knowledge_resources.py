import argparse
import json
import re
import subprocess
import tempfile
import unicodedata
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parent
OCR_TEXT_ROOT = ROOT / "ocr_pages"
RESOURCE_ROOT = ROOT / "game_knowledge_raw"
JSONL_ROOT = ROOT / "game_knowledge_jsonl"
OCR_CACHE_ROOT = ROOT / ".ocr_cache"
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")
TESSDATA = ROOT

NOISE_PATTERNS = [
    r"^https?://",
    r"blogtailieu",
    r"giao-an-lop",
    r"sach.*blog",
    r"hanh trang so",
    r"huong dan tai",
    r"nguon tai lieu",
    r"nha xuat ban giao duc",
    r"bo giao duc",
    r"ban quyen thuoc",
    r"tong chu bien",
    r"chu bien",
    r"tai ban lan",
    r"huong dan su dung sach",
    r"gui cac em",
    r"hay bao quan",
    r"khong dien, viet, lam",
    r"khong dien viet lam",
    r"loi noi dau",
    r"muc luc",
    r"^isbn\b",
    r"^trang\s*\d*$",
]

LESSON_RE = re.compile(
    r"^(?:bai|bài|unit|lesson|review|starter|phonics|chu de|chủ đề|tuan|tuần|phan|phần|chuong|chương)\s+"
    r"[\w\dIVXivx]+[A-Z]?(?:[.:)\-\s].*)?$",
    re.IGNORECASE,
)

ACTIVITY_RE = re.compile(
    r"^(?:kham pha|khám phá|luyen tap|luyện tập|thuc hanh|thực hành|van dung|vận dụng|ghi nho|ghi nhớ|"
    r"doc|đọc|viet|viết|noi|nói|nghe|listen|read|write|speak|practice|project|remember|"
    r"cau|câu)\b",
    re.IGNORECASE,
)


def strip_accents(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    return "".join(ch for ch in text if unicodedata.category(ch) != "Mn")


def slug_for_path(path: Path) -> str:
    slug = path.stem
    slug = re.sub(r"_[0-9]+$", "", slug)
    slug = re.sub(r"[^A-Za-z0-9._-]+", "-", slug)
    return slug[:140]


def clean_line(line: str) -> str:
    line = unicodedata.normalize("NFC", line)
    line = line.replace("\x0c", " ")
    line = re.sub(r"\s+", " ", line).strip()
    line = re.sub(r"^[^\wÀ-ỹ0-9]+", "", line).strip()
    line = re.sub(r"[.·•]{3,}\s*\d+\s*$", "", line).strip()
    return line.strip(" -–—:;|")


def is_noise(line: str) -> bool:
    line = clean_line(line)
    if len(line) < 3:
        return True
    if re.fullmatch(r"[\d\s.,:/\\|\-]+", line):
        return True
    low = strip_accents(line.lower())
    if any(re.search(pattern, low) for pattern in NOISE_PATTERNS):
        return True
    if len(line) < 12 and re.fullmatch(r"[A-ZÀ-Ỹ\s]+", line):
        return True
    return False


def useful_lines(text: str) -> list[str]:
    lines = []
    for line in text.splitlines():
        line = clean_line(line)
        if line and not is_noise(line):
            lines.append(line)
    return lines


def has_good_text_layer(text: str) -> bool:
    lines = useful_lines(text)
    if len("\n".join(lines)) < 120:
        return False
    low = strip_accents(text.lower())
    if low.count("blogtailieu") > 4 or low.count("giao-an-lop") > 4:
        return False
    return True


def ocr_page(page: fitz.Page, tmpdir: Path) -> str:
    pix = page.get_pixmap(matrix=fitz.Matrix(1.9, 1.9), alpha=False)
    image_path = tmpdir / f"page-{page.number + 1:04d}.png"
    pix.save(image_path)
    result = subprocess.run(
        [
            str(TESSERACT),
            str(image_path),
            "stdout",
            "-l",
            "vie+eng",
            "--tessdata-dir",
            str(TESSDATA),
            "--psm",
            "6",
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    return result.stdout if result.returncode == 0 else ""


def extract_pages(pdf: Path, force_ocr: bool = False) -> tuple[list[dict], int]:
    rel = pdf.relative_to(ROOT)
    cache_dir = OCR_CACHE_ROOT / rel.parent / slug_for_path(pdf)
    cache_dir.mkdir(parents=True, exist_ok=True)
    pages = []
    ocr_count = 0

    doc = fitz.open(pdf)
    with tempfile.TemporaryDirectory(dir=ROOT) as tmp:
        tmpdir = Path(tmp)
        for page in doc:
            page_no = page.number + 1
            cache_path = cache_dir / f"{page_no:04d}.txt"
            method_path = cache_dir / f"{page_no:04d}.method"

            if cache_path.exists() and method_path.exists():
                text = cache_path.read_text(encoding="utf-8", errors="replace")
                method = method_path.read_text(encoding="utf-8", errors="replace").strip()
            else:
                embedded = page.get_text("text")
                if not force_ocr and has_good_text_layer(embedded):
                    text = embedded
                    method = "text-layer"
                else:
                    text = ocr_page(page, tmpdir)
                    method = "ocr"
                    ocr_count += 1
                cache_path.write_text(text, encoding="utf-8")
                method_path.write_text(method, encoding="utf-8")

            pages.append({"page": page_no, "method": method, "text": text})

    doc.close()
    return pages, ocr_count


def write_page_text(pdf: Path, pages: list[dict]) -> Path:
    rel = pdf.relative_to(ROOT).with_suffix(".txt")
    out_path = OCR_TEXT_ROOT / rel
    out_path.parent.mkdir(parents=True, exist_ok=True)
    blocks = []
    for item in pages:
        blocks.append(f"[Trang {item['page']} | {item['method']}]\n{item['text'].strip()}")
    out_path.write_text("\n\n".join(blocks) + "\n", encoding="utf-8")
    return out_path


def line_is_heading(line: str) -> bool:
    plain = strip_accents(line.lower())
    if LESSON_RE.match(line) or LESSON_RE.match(plain):
        return True
    if ACTIVITY_RE.match(line) and len(line.split()) <= 12:
        return True
    return False


def page_is_learning_content(item: dict) -> bool:
    lines = useful_lines(item["text"])
    if not lines:
        return False
    if item["page"] <= 8:
        return False

    joined = strip_accents(" ".join(lines).lower())
    front_hits = [
        "bo giao duc",
        "huong dan su dung sach",
        "loi noi dau",
        "muc luc",
        "tai ban lan",
        "nha xuat ban",
        "cac em hoc sinh lop",
        "hay bao quan",
    ]
    if any(hit in joined for hit in front_hits):
        return False

    heading_count = sum(1 for line in lines if line_is_heading(line))
    activity_words = [
        "kham pha",
        "luyen tap",
        "thuc hanh",
        "van dung",
        "doc",
        "viet",
        "noi",
        "nghe",
        "quan sat",
        "tra loi",
        "tinh",
        "tim",
    ]
    activity_count = sum(joined.count(word) for word in activity_words)
    if heading_count >= 4 and activity_count <= 2:
        return False

    if len(" ".join(lines)) < 80:
        return False
    return True


def split_lessons(pages: list[dict]) -> list[dict]:
    sections = []
    current = {"title": "Phần kiến thức chung", "start_page": 1, "lines": []}

    for item in pages:
        if not page_is_learning_content(item):
            continue
        for line in useful_lines(item["text"]):
            if line_is_heading(line) and len(current["lines"]) >= 4:
                sections.append(current)
                current = {"title": line, "start_page": item["page"], "lines": []}
            elif line_is_heading(line) and current["title"] == "Phần kiến thức chung":
                current["title"] = line
                current["start_page"] = item["page"]
            else:
                current["lines"].append(line)

    if current["lines"]:
        sections.append(current)
    return sections


def sentence_candidates(lines: list[str]) -> list[str]:
    text = " ".join(lines)
    parts = re.split(r"(?<=[.!?。])\s+|(?<=\.)\s+", text)
    out = []
    for part in parts:
        part = clean_line(part)
        words = part.split()
        if 8 <= len(words) <= 35 and not is_noise(part):
            out.append(part)
    return dedupe(out)[:24]


def typing_candidates(lines: list[str]) -> list[str]:
    out = []
    buffer = []
    for line in lines:
        if 18 <= len(line) <= 120 and not line_is_heading(line):
            buffer.append(line)
        else:
            if buffer:
                para = " ".join(buffer)
                if 80 <= len(para) <= 420:
                    out.append(para)
                buffer = []
    if buffer:
        para = " ".join(buffer)
        if 80 <= len(para) <= 420:
            out.append(para)
    return dedupe(out)[:8]


def pair_candidates(lines: list[str]) -> list[dict]:
    pairs = []
    for line in lines:
        if len(line) > 150:
            continue
        for pattern in [
            r"^(.{2,45}?)\s+(?:la|là)\s+(.{8,100})$",
            r"^(.{2,45}?):\s+(.{8,100})$",
            r"^(.{2,45}?)\s+-\s+(.{8,100})$",
        ]:
            match = re.match(pattern, line, re.IGNORECASE)
            if match:
                left = clean_line(match.group(1))
                right = clean_line(match.group(2))
                if not is_noise(left) and not is_noise(right):
                    pairs.append({"term": left, "match": right})
                break
    return dedupe_pairs(pairs)[:16]


def keyword_candidates(lines: list[str], title: str) -> list[str]:
    terms = []
    for source in [title, *lines]:
        for chunk in re.split(r"[,;:()/\-–—]", source):
            chunk = clean_line(chunk)
            words = chunk.split()
            if 1 <= len(words) <= 5 and 4 <= len(chunk) <= 45 and not is_noise(chunk):
                low = strip_accents(chunk.lower())
                if not low.startswith(("cau ", "bai tap", "luyen tap", "thuc hanh")):
                    terms.append(chunk)
    return dedupe(terms)[:24]


def raw_knowledge(lines: list[str]) -> list[str]:
    out = []
    for line in lines:
        words = line.split()
        if 5 <= len(words) <= 45 and not is_noise(line):
            out.append(line)
    return dedupe(out)[:40]


def dedupe(items: list[str]) -> list[str]:
    seen = set()
    out = []
    for item in items:
        key = strip_accents(item.lower())
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out


def dedupe_pairs(items: list[dict]) -> list[dict]:
    seen = set()
    out = []
    for item in items:
        key = (strip_accents(item["term"].lower()), strip_accents(item["match"].lower()))
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out


def build_resource(pdf: Path, pages: list[dict]) -> tuple[Path, Path, int]:
    rel = pdf.relative_to(ROOT)
    sections = split_lessons(pages)
    txt_path = RESOURCE_ROOT / rel.with_suffix(".txt")
    jsonl_path = JSONL_ROOT / rel.with_suffix(".jsonl")
    txt_path.parent.mkdir(parents=True, exist_ok=True)
    jsonl_path.parent.mkdir(parents=True, exist_ok=True)

    txt_lines = [
        f"Tệp gốc: {rel.as_posix()}",
        "Mục tiêu: tài nguyên kiến thức thô để tạo game bài tập",
        "",
    ]
    json_rows = []

    for index, section in enumerate(sections, 1):
        lines = section["lines"]
        item = {
            "source_pdf": rel.as_posix(),
            "lesson_index": index,
            "title": section["title"],
            "start_page": section["start_page"],
            "raw_knowledge": raw_knowledge(lines),
            "quiz_or_fill_blank_candidates": sentence_candidates(lines),
            "matching_pairs": pair_candidates(lines),
            "typing_passages": typing_candidates(lines),
            "keywords": keyword_candidates(lines, section["title"]),
        }
        if not any(item[key] for key in ["raw_knowledge", "quiz_or_fill_blank_candidates", "matching_pairs", "typing_passages"]):
            continue
        json_rows.append(item)

        txt_lines.extend(
            [
                f"## {index}. {item['title']} (từ trang {item['start_page']})",
                "",
                "### Nội dung kiến thức thô",
            ]
        )
        txt_lines.extend(f"- {line}" for line in item["raw_knowledge"][:30])
        txt_lines.extend(["", "### Câu/ý có thể tạo trắc nghiệm hoặc điền khuyết"])
        txt_lines.extend(f"- {line}" for line in item["quiz_or_fill_blank_candidates"][:12])
        txt_lines.extend(["", "### Cặp nối từ/khái niệm"])
        if item["matching_pairs"]:
            txt_lines.extend(f"- {pair['term']} => {pair['match']}" for pair in item["matching_pairs"][:10])
        else:
            txt_lines.append("- Chưa phát hiện cặp rõ ràng.")
        txt_lines.extend(["", "### Đoạn gõ văn bản"])
        if item["typing_passages"]:
            txt_lines.extend(f"- {passage}" for passage in item["typing_passages"][:4])
        else:
            txt_lines.append("- Chưa phát hiện đoạn phù hợp.")
        txt_lines.extend(["", "### Từ khóa"])
        txt_lines.append(", ".join(item["keywords"][:24]) if item["keywords"] else "Chưa phát hiện từ khóa rõ ràng.")
        txt_lines.append("")

    txt_path.write_text("\n".join(txt_lines).strip() + "\n", encoding="utf-8")
    with jsonl_path.open("w", encoding="utf-8") as handle:
        for row in json_rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")
    return txt_path, jsonl_path, len(json_rows)


def find_pdfs(grade: str | None) -> list[Path]:
    pdfs = sorted(p for p in ROOT.rglob("*.pdf") if "ocr_pages" not in p.parts and "game_knowledge" not in p.parts)
    if grade:
        pdfs = [p for p in pdfs if p.parent.name.lower() == grade.lower()]
    return pdfs


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--grade", help="Process one grade folder, for example grade1.")
    parser.add_argument("--force-ocr", action="store_true", help="OCR all pages even when a text layer exists.")
    args = parser.parse_args()

    if not TESSERACT.exists():
        raise SystemExit(f"Missing Tesseract: {TESSERACT}")
    if not (TESSDATA / "vie.traineddata").exists():
        raise SystemExit(f"Missing Vietnamese OCR data: {TESSDATA / 'vie.traineddata'}")

    pdfs = find_pdfs(args.grade)
    for index, pdf in enumerate(pdfs, 1):
        pages, ocr_count = extract_pages(pdf, force_ocr=args.force_ocr)
        page_out = write_page_text(pdf, pages)
        txt_out, jsonl_out, lessons = build_resource(pdf, pages)
        rel = pdf.relative_to(ROOT)
        print(
            f"[{index:02d}/{len(pdfs)}] {rel} | pages={len(pages)} ocr_new={ocr_count} "
            f"lessons={lessons} -> {txt_out.relative_to(ROOT)} | {jsonl_out.relative_to(ROOT)} | {page_out.relative_to(ROOT)}",
            flush=True,
        )


if __name__ == "__main__":
    main()
