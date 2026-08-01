import re
import shutil
import subprocess
import tempfile
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parent
OUT_ROOT = ROOT / "knowledge_texts"
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")
TESSDATA = ROOT
OCR_PAGES = 14


NOISE_PATTERNS = [
    r"blogtailieu\.com",
    r"^https?://",
    r"hướng dẫn tải",
    r"nội dung cập nhật",
    r"nguồn tài liệu",
    r"làm bài tập để thực hành",
    r"ôn tập, vận dụng kiến thức",
    r"^nhà xuất bản",
    r"^bản quyền",
    r"^các em học sinh",
    r"^các em yêu",
    r"^lời nói đầu",
    r"^mục lục$",
    r"^trang$",
    r"^page\b",
    r"^isbn\b",
]


def clean_line(line: str) -> str:
    line = re.sub(r"\s+", " ", line).strip()
    line = re.sub(r"[.·•]{2,}\s*\d+\s*$", "", line).strip()
    line = re.sub(r"\s+\d{1,3}\s*$", "", line).strip()
    line = line.strip(" -–—:;|")
    return line


def is_noise(line: str) -> bool:
    low = line.lower()
    if len(line) < 3:
        return True
    if re.fullmatch(r"[\d\s.,:/\\|\-]+", line):
        return True
    if re.fullmatch(r"\d{1,3}", line):
        return True
    if low.startswith(("sách chia sẻ", "blog tài liệu", "hành trang số")):
        return True
    return any(re.search(pattern, low) for pattern in NOISE_PATTERNS)


def looks_like_topic(line: str) -> bool:
    low = line.lower()
    if re.match(r"^(bài|unit|lesson|review|ôn tập|chủ đề|tuần|phần|chương)\s+[\w\divxIVX]+", low):
        return True
    if re.match(r"^(theme|starter|phonics|project|fun time)\b", low):
        return True
    if re.match(r"^\d{1,2}\.\s+\S+", line):
        return True
    if re.search(r"\b(bài đọc|luyện tập|thực hành|góc sáng tạo|em yêu|khám phá|vận dụng)\b", low):
        return True
    return False


def dedupe_keep_order(items):
    seen = set()
    out = []
    for item in items:
        key = item.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out


def extract_topics_from_text(text: str, limit: int = 80):
    raw_lines = [clean_line(line) for line in text.splitlines()]
    lines = [line for line in raw_lines if line and not is_noise(line)]
    topics = []

    for i, line in enumerate(lines):
        if looks_like_topic(line):
            topic = line
            if re.fullmatch(r"(?i)(bài|unit|lesson|chủ đề|tuần|phần|chương)\s+[\w\divxIVX]+", line):
                if i + 1 < len(lines) and 3 <= len(lines[i + 1]) <= 90:
                    topic = f"{line}: {lines[i + 1]}"
            topics.append(topic)

    if len(topics) < 8:
        for line in lines:
            words = line.split()
            if 3 <= len(words) <= 12 and line[:1].isupper():
                topics.append(line)

    topics = [
        topic
        for topic in dedupe_keep_order(topics)
        if 4 <= len(topic) <= 140 and not is_noise(topic)
    ]
    return topics[:limit]


def text_from_pdf(doc):
    chunks = []
    for page in doc:
        text = page.get_text("text").strip()
        if text:
            chunks.append(text)
    return "\n".join(chunks)


def ocr_page(page, tmpdir: Path):
    pix = page.get_pixmap(matrix=fitz.Matrix(2.2, 2.2), alpha=False)
    img_path = tmpdir / f"page-{page.number + 1:03d}.png"
    pix.save(img_path)
    result = subprocess.run(
        [
            str(TESSERACT),
            str(img_path),
            "stdout",
            "-l",
            "vie",
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


def ocr_front_matter(doc):
    if not TESSERACT.exists() or not (TESSDATA / "vie.traineddata").exists():
        return ""
    texts = []
    with tempfile.TemporaryDirectory(dir=ROOT) as d:
        tmpdir = Path(d)
        for page_index in range(min(OCR_PAGES, doc.page_count)):
            texts.append(ocr_page(doc[page_index], tmpdir))
    return "\n".join(texts)


def friendly_title(pdf: Path):
    name = pdf.stem
    name = re.sub(r"_[0-9]+$", "", name)
    name = re.sub(r"[a-f0-9]{5,}$", "", name)
    name = name.replace("-", " ").replace("_", " ")
    return re.sub(r"\s+", " ", name).strip().title()


def write_summary(pdf: Path):
    doc = fitz.open(pdf)
    toc = [
        clean_line(item[1])
        for item in doc.get_toc()
        if item[1].strip() and not is_noise(clean_line(item[1]))
    ]
    embedded = text_from_pdf(doc)
    embedded_topics = extract_topics_from_text(embedded)
    source_text = embedded

    ocr_text = ocr_front_matter(doc)
    ocr_topics = extract_topics_from_text(ocr_text)
    method = f"OCR {min(OCR_PAGES, doc.page_count)} trang đầu"

    if len(embedded_topics) > len(ocr_topics) * 2 and len(embedded_topics) >= 15:
        method = "text-layer"
        topics = dedupe_keep_order(toc + embedded_topics)
    else:
        topics = dedupe_keep_order(toc + ocr_topics + embedded_topics[:20])

    topics = [topic for topic in topics if not is_noise(topic)]
    doc.close()

    rel = pdf.relative_to(ROOT)
    out_path = OUT_ROOT / rel.with_suffix(".txt")
    out_path.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        f"Tệp gốc: {rel.as_posix()}",
        f"Tên sách: {friendly_title(pdf)}",
        f"Phương pháp trích xuất: {method}",
        "",
        "Kiến thức chính / chủ đề chính:",
    ]
    if topics:
        lines.extend(f"- {topic}" for topic in topics[:80])
    else:
        lines.append("- Chưa trích xuất được chủ đề rõ ràng từ PDF này.")
        lines.append("- PDF có thể là ảnh scan chất lượng thấp hoặc không có mục lục trong các trang đầu.")
    lines.extend(
        [
            "",
            "Ghi chú:",
            "- Đây là bản văn bản thô, chỉ giữ ý/chủ đề chính; không phải bản chép đầy đủ nội dung sách.",
        ]
    )
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out_path, len(topics), method


def main():
    if OUT_ROOT.exists():
        shutil.rmtree(OUT_ROOT)
    pdfs = sorted(
        p
        for p in ROOT.rglob("*.pdf")
        if OUT_ROOT not in p.parents
    )
    for index, pdf in enumerate(pdfs, 1):
        out_path, count, method = write_summary(pdf)
        print(f"[{index:02d}/{len(pdfs)}] {pdf.relative_to(ROOT)} -> {out_path.relative_to(ROOT)} ({count} topics, {method})")


if __name__ == "__main__":
    main()
