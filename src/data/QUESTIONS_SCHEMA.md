# Chuẩn dữ liệu ngân hàng câu hỏi

Các tệp dữ liệu nằm tại `src/data/grade[1-5]/[math|viet|english|science|tech].json`.
Mã môn học dùng thống nhất trong API và cơ sở dữ liệu:

- `math`: Toán
- `viet`: Tiếng Việt
- `english`: Tiếng Anh
- `science`: Tự nhiên và Xã hội
- `tech`: Tin học

## Cấu trúc một câu hỏi

```json
{
  "q": "Nội dung câu hỏi",
  "a": "Đáp án đúng",
  "c": ["Phương án 1", "Phương án 2"],
  "type": "multiple_choice",
  "lo": "Mục tiêu học tập",
  "difficulty": "easy",
  "status": "published",
  "sourceType": "book",
  "sourceRef": "Tên sách (tên-file.pdf) – Bài/Unit",
  "sourcePage": 18,
  "explanation": "Giải thích đáp án",
  "hints": ["Gợi ý phù hợp lứa tuổi"]
}
```

Các trường `sourceType`, `sourceRef` và `sourcePage` là bắt buộc đối với câu hỏi
biên soạn từ sách. `sourcePage` là số trang in trên sách, không phải chỉ số trang vật
lý của tệp PDF. Câu hỏi mới phải dùng Unicode NFC, có mục tiêu học tập và không
trùng nội dung trong cùng lớp, môn và loại câu hỏi.

## Loại câu hỏi và dữ liệu tương tác

- `multiple_choice`, `true_false`, `categorize`, `shortcut`: dùng `c`; đáp án `a`
  phải thuộc `c`.
- `fill_blank`: thêm `sentence` có chỗ trống `___`.
- `typing`: học sinh nhập đáp án, `c` để trống.
- `reorder`: thêm `words`, hoặc hệ thống tách từ từ đáp án.
- `matching`: thêm `pairs`, mỗi phần tử có `left` và `right`.
- `find_error`: thêm `sentence` và `words` khi cần chọn vị trí sai.

Các trường tương tác (`sentence`, `words`, `pairs`, `explanation`, `hints`) được lưu
trong `payload_json` của SQLite và được API công khai trả về nguyên dạng.

## API của trò chơi

`GET /api/questions?grade=1` trả về:

```json
{
  "math": [],
  "viet": [],
  "english": [],
  "science": [],
  "tech": []
}
```

Với lớp 2–5, API ghép câu của lớp được chọn và lớp ngay trước đó. Lớp 1 chỉ nhận
câu lớp 1. Chỉ câu ở trạng thái `published` được đưa vào trò chơi.

## Tái tạo và kiểm tra dữ liệu lớp 1

```bash
npm run questions:build:grade1
npm run questions:validate
npm test
```

Việc đồng bộ JSON vào SQLite dựa trên dấu vân tay của dữ liệu nguồn. Bản ghi nguồn
chưa được sửa sẽ được cập nhật; bản ghi đã được quản trị viên chỉnh sửa được giữ lại.
