# Độ phủ sách giáo khoa và ngân hàng câu hỏi lớp 1

## Kết quả

Ngân hàng lớp 1 hiện có **1.005 câu** ở 5 môn. Trong đó **774 câu** được đối chiếu
trực tiếp với 5 tệp PDF được cung cấp trong `pdf/`; mỗi câu có tên sách, tệp nguồn,
bài học và trang sách để truy vết.

| Môn | Phạm vi đã phủ | Số câu lớp 1 | Ghi chú nguồn |
| --- | --- | ---: | --- |
| Toán | Bài 1–41 | 400 | 200 câu Bài 21–41 bám Toán tập 2 trong `pdf/`; 200 câu tập 1 kế thừa bộ chuẩn hoá hiện có |
| Tiếng Việt | Tập 1: Bài 1–80; Tập 2: 45 bài đọc/8 chủ điểm | 338 | 248 câu học âm-vần và ôn tập; 90 câu đọc hiểu |
| Tiếng Anh | Unit 1–16 | 124 | Âm/chữ, từ vựng và mẫu câu theo từng Unit |
| Tự nhiên và Xã hội | Bài 1–28/6 chủ đề | 112 | 4 câu trọng tâm cho mỗi bài |
| Tin học | Bộ bổ trợ hiện có | 31 | Không có sách Tin học trong 5 PDF được cung cấp |

## Danh mục PDF đã phân rã

| Tệp | Số trang PDF | Phạm vi nội dung |
| --- | ---: | --- |
| `sgk-tieng-anh-lop-1-thong-nhat-tu-nam-2026_107202616.pdf` | 78 | 16 Unit, trang sách 6–68 |
| `sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-1_107202616.pdf` | 186 | 80 bài, trang sách 14–172 |
| `sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-2_107202616.pdf` | 177 | 45 bài đọc thuộc 8 chủ điểm, trang sách 4–158 |
| `sgk-toan-1-tu-nam-2026-tap-2_107202616 (1).pdf` | 110 | Bài 21–41, trang sách 4–104 |
| `sgk-tu-nhien-va-xa-hoi-lop-1-thong-nhat-tu-nam-2026_107202616.pdf` | 126 | Bài 1–28 thuộc 6 chủ đề, trang sách 6–120 |

Các PDF là bản quét ảnh nên không có lớp văn bản. Quy trình đối chiếu sử dụng OCR
theo từng trang, sau đó kiểm tra trực quan mục lục và các trang nội dung nguồn. Số
trang ghi trong dữ liệu là số trang in trên sách.

## Nguyên tắc biên soạn

- Câu hỏi chỉ dùng kiến thức xuất hiện trong bài tương ứng và phù hợp khả năng đọc,
  thao tác của học sinh lớp 1.
- Phương án nhiễu cùng loại, rõ nghĩa, không đánh đố; câu an toàn đưa ra hành vi có
  thể thực hiện ngay.
- Tiếng Việt tập 1 kiểm tra nhận diện âm/vần và gõ tiếng; tập 2 kiểm tra chi tiết,
  nhân vật, sự việc và ý nghĩa trực tiếp của bài đọc.
- Tiếng Anh kiểm tra âm/chữ, từ vựng và mẫu câu trong Book Map; không đưa cấu trúc
  ngoài Unit.
- Mỗi câu có mục tiêu học tập, độ khó, lời giải thích, gợi ý và nguồn/trang sách.

## Kiểm soát chất lượng tự động

Kiểm thử khóa các tiêu chí: đủ 16 Unit Tiếng Anh, đủ 28 bài Tự nhiên và Xã hội, đủ
80 bài Tiếng Việt tập 1, đủ 45 bài đọc tập 2, đủ Bài 1–41 Toán; không trùng câu;
đáp án nằm trong lựa chọn; metadata nguồn đầy đủ; dữ liệu tương tác được giữ nguyên
khi đi qua SQLite/API; và đồng bộ không ghi đè bản quản trị viên đã sửa.
