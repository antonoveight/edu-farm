# Game Knowledge Resources

Đầu ra phục vụ tạo game/bài tập nằm trong 3 thư mục:

- `ocr_pages/`: văn bản OCR hoặc text-layer theo từng trang. Dùng khi cần tra lại nguồn thô đầy đủ.
- `game_knowledge_raw/`: bản đọc được bằng mắt, đã chia thành các phần/bài và gom nguyên liệu tạo bài tập.
- `game_knowledge_jsonl/`: dữ liệu có cấu trúc cho code game. Mỗi dòng là một bài/phần học.

Mỗi object JSONL có các trường:

- `source_pdf`: PDF gốc.
- `lesson_index`: số thứ tự phần/bài trong file.
- `title`: tiêu đề phần/bài nhận diện được.
- `start_page`: trang PDF bắt đầu.
- `raw_knowledge`: dòng kiến thức thô giữ lại từ bài học.
- `quiz_or_fill_blank_candidates`: câu/ý có thể dùng tạo trắc nghiệm hoặc điền chỗ trống.
- `matching_pairs`: cặp `term` và `match` dùng cho game nối từ/nối khái niệm.
- `typing_passages`: đoạn ngắn dùng cho game gõ văn bản.
- `keywords`: từ khóa hoặc cụm từ chính.

Lưu ý chất lượng:

- Phần lớn PDF là ảnh scan nên OCR có thể sai dấu, sai chữ hoặc lẫn ký hiệu hình ảnh.
- `ocr_pages/` giữ đầy đủ nội dung theo trang; `game_knowledge_raw/` đã bỏ 8 trang đầu để giảm bìa, mục lục, hướng dẫn sử dụng sách.
- Các file JSONL là tài nguyên thô, phù hợp làm đầu vào cho bước tiếp theo: sinh câu hỏi, kiểm duyệt, sửa lỗi OCR, phân loại theo môn/kỹ năng.

Chạy lại pipeline:

```powershell
$env:PYTHONIOENCODING='utf-8'
python .\build_game_knowledge_resources.py
```

Chạy lại một khối lớp:

```powershell
$env:PYTHONIOENCODING='utf-8'
python .\build_game_knowledge_resources.py --grade grade3
```
