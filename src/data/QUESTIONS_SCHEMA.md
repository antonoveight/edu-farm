# Tài Liệu Chuẩn Hóa Dữ Liệu Câu Hỏi & Tích Hợp Backend

Tài liệu này hướng dẫn cách cấu trúc dữ liệu câu hỏi hiện tại, định dạng API và cách tích hợp backend ngoài (như Node.js Express, Laravel, Python FastAPI, Spring Boot,...) với game **Edu-Farm**.

---

## 1. Định Dạng Cấu Trúc Câu Hỏi (Question Schema)

Tất cả câu hỏi trong các file JSON (nằm trong `src/data/grade[1-5]/[viet|science|tech].json`) được chuẩn hóa theo cấu trúc sau:

```json
[
  {
    "q": "Nội dung câu hỏi hiển thị cho học sinh",
    "a": "Đáp án đúng chính xác",
    "c": [
      "Đáp án A",
      "Đáp án B",
      "Đáp án C",
      "Đáp án D"
    ],
    "type": "multiple_choice",
    "lo": "Mục tiêu học tập (Learning Objective) - Không bắt buộc"
  }
]
```

### Các loại câu hỏi hỗ trợ (`type`):
1.  **`multiple_choice`** (Trắc nghiệm): Cần có mảng `c` chứa các đáp án lựa chọn.
2.  **`typing`** (Tự luận điền từ): Bé tự nhập chữ. Không cần mảng `c`.
3.  **`matching`** (Nối chéo 2 cột): `c` chứa các cặp giá trị ghép nối dạng chuỗi `"A - B"`.
4.  **`fill_blank`** (Điền vào chỗ trống): Dùng ký tự gạch dưới `_` hoặc `...` để bé gõ từ điền vào.
5.  **`reorder`** (Sắp xếp lại câu): `c` chứa danh sách các từ bị xáo trộn.

---

## 2. Thiết Kế Database (Cơ Sở Dữ Liệu)

Khi chuyển lên Backend thực tế, bạn có thể tạo 1 bảng `questions` với cấu trúc tương ứng như sau:

### SQL Schema ví dụ (MySQL / PostgreSQL):
```sql
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grade INT NOT NULL, -- Lớp 1 -> 5
    subject VARCHAR(20) NOT NULL, -- 'viet', 'science', 'tech'
    question_text TEXT NOT NULL, -- Tương ứng trường "q"
    correct_answer TEXT NOT NULL, -- Tương ứng trường "a"
    choices JSON NULL, -- Mảng lựa chọn "c" dưới dạng JSON
    question_type VARCHAR(30) NOT NULL DEFAULT 'multiple_choice', -- Trường "type"
    learning_objective VARCHAR(255) NULL, -- Trường "lo"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Định Dạng Đầu Ra API Yêu Cầu (API Response Format)

Backend của bạn cần cung cấp một endpoint nhận vào `grade` (Lớp) và trả về dữ liệu câu hỏi có cấu trúc như sau:

*   **URL mẫu**: `/api/questions?grade=1`
*   **Method**: `GET`
*   **Response JSON**:
```json
{
  "viet": [
    { "q": "...", "a": "...", "c": [...], "type": "multiple_choice" }
  ],
  "science": [
    { "q": "...", "a": "...", "c": [...], "type": "multiple_choice" }
  ],
  "tech": [
    { "q": "...", "a": "...", "c": [...], "type": "multiple_choice" }
  ]
}
```

> **Lưu ý nghiệp vụ**:
> Hiện tại, game có cơ chế tự động ghép thêm câu hỏi của **lớp trước đó 1 cấp** vào danh sách câu hỏi của lớp hiện tại để tạo sự phong phú (ví dụ bé chọn học Lớp 2 thì API sẽ trả về gộp câu hỏi Lớp 2 + Lớp 1). Bạn có thể viết logic gộp này ở Backend để giảm tải xử lý cho Client.

---

## 4. Tích Hợp Với Game Client (Cấu Hình URL API Base)

Để đổi từ API Next.js mặc định sang API của Backend ngoài:

1.  Mở file [`public/game/index.html`](file:///d:/Định hướng phát triển/public/game/index.html)
2.  Tìm đoạn script cấu hình ở cuối file và điền URL của Backend của bạn:
    ```html
    <script>
        window.GAME_API_BASE = "https://api.ten-mien-cua-ban.com"; // Thay đổi địa chỉ này
    </script>
    ```
3.  Khi đó, mọi lệnh gọi API lấy câu hỏi từ Client sẽ tự động chuyển thành:
    `https://api.ten-mien-cua-ban.com/api/questions?grade=1`

---
*Tài liệu này được biên soạn để chuẩn bị cho giai đoạn chuyển giao và phát triển API bằng AI hoặc tích hợp cơ sở dữ liệu.*
