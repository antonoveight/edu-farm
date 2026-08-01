# 📘 Lộ Trình Mở Rộng Game Giáo Dục — Tóm tắt Ghi nhớ

---

## 🎯 Triết lý cốt lõi

> **Kiến thức học tập → Trở thành hành động trong game → Tạo ra kết quả trong thế giới game**

Game phải đảm bảo học sinh **không thể tiến bộ** chỉ bằng:
- Chơi lâu / Bấm ngẫu nhiên / Mua vật phẩm
- Bỏ qua nội dung học tập

Mọi tính năng mới **bắt buộc** liên kết với:
- Learning Objective (LO)
- Knowledge Unit (KU)
- Kỹ năng học tập
- Chuẩn đầu ra

---

## 🏛️ Nguyên tắc tương thích code (BẮT BUỘC)

- **KHÔNG** đổi tên / xóa / thay đổi kiểu trường dữ liệu hiện tại
- **KHÔNG** thay đổi ID câu hỏi, màn chơi, nhiệm vụ, người chơi, vật phẩm
- Mọi metadata mới → bổ sung vào object `educore` riêng biệt:

```json
{
  "...trường cũ": "giữ nguyên",
  "educore": {
    "schema_version": "1.0",
    "grade": null,
    "subject": null,
    "domain": null,
    "topic": null,
    "lesson_id": null,
    "knowledge_unit_id": null,
    "learning_objective_id": null,
    "skills": [],
    "difficulty": null,
    "bloom_level": null,
    "question_template": null,
    "game_tags": []
  }
}
```

---

## 🗺️ Bản đồ thế giới theo môn học (Ý tưởng 1)

| Khu vực | Môn học |
|---------|---------|
| 🏰 Vương quốc Số học | Toán, Hình học, Đo lường, Thống kê |
| 🏙️ Thành phố Ngôn từ | Tiếng Việt, Đọc hiểu, Chính tả, Ngữ pháp |
| 🌿 Rừng Sinh thái | Khoa học, Thực vật, Động vật, Môi trường |
| ⏳ Dòng thời gian | Lịch sử, Nhân vật, Sự kiện |
| 🗾 Quần đảo Địa lý | Bản đồ, Địa hình, Khí hậu, Việt Nam |
| 💻 Thung lũng Công nghệ | Tin học, Tư duy thuật toán, An toàn số |
| 🏡 Làng Kỹ năng sống | Đạo đức, Giao tiếp, Hợp tác, An toàn |

> Mở khóa khu vực phải bằng hoàn thành LO — không chỉ bằng thời gian chơi.

---

## 📋 17 Ý tưởng mở rộng

| # | Tính năng | Mô tả ngắn |
|---|-----------|------------|
| 1 | Bản đồ thế giới | Khám phá các vùng theo môn học |
| 2 | Quest có bối cảnh | Câu hỏi + câu chuyện + NPC + phần thưởng |
| 3 | NPC gia sư | Gợi ý 3 cấp, giải thích lỗi, khuyến khích |
| 4 | Boss cuối chủ đề | Chuỗi 3–7 bước, đánh giá toàn diện |
| 5 | Xây dựng thị trấn | Công trình gắn kiến thức (Thư viện, Vườn, Phòng TN…) |
| 6 | Sưu tập thẻ kiến thức | Thẻ từ vựng, công thức, danh nhân, sự kiện… |
| 7 | Chế tạo vật phẩm | Crafting yêu cầu giải bài tập (tính nguyên liệu, sắp xếp quy trình) |
| 8 | Thám hiểm & quan sát | Câu hỏi phụ thuộc môi trường game |
| 9 | Phòng thí nghiệm mô phỏng | Dự đoán → Thực hiện → Quan sát → Kết luận |
| 10 | Trinh thám học đường | Giải vụ việc bằng đọc hiểu, suy luận, logic |
| 11 | Nhiệm vụ sáng tạo | Viết, vẽ, thiết kế (rubric, không chỉ đúng/sai) |
| 12 | Bạn đồng hành | Thú cưng/robot phát triển theo năng lực học |
| 13 | Nhiệm vụ nhóm | Hợp tác theo vai trò, không chat tự do |
| 14 | Ôn tập ngắt quãng | Spaced repetition: 1 / 3 / 7 / 14 / 30 ngày |
| 15 | Hệ thống sửa sai | Phát hiện dạng lỗi → phản hồi → gợi ý → câu tương tự |
| 16 | Sự kiện theo chủ đề | Bối cảnh mới nhưng LO không đổi |
| 17 | Chế độ phụ huynh/GV | Báo cáo tiến độ theo LO, kỹ năng, dạng lỗi |

---

## ✅ Checklist 12 câu hỏi cho mọi tính năng mới

1. Tính năng đang rèn **kiến thức** nào?
2. Tính năng đang rèn **kỹ năng** nào?
3. Liên kết với **Learning Objective** nào?
4. Kết quả học tập **được ghi nhận** bằng cách nào?
5. Học sinh có thể vượt qua **mà không cần học** không?
6. Tính năng có **khuyến khích đoán** không?
7. Tính năng có **phản hồi khi sai** không?
8. Tính năng có **hỗ trợ học sinh yếu** không?
9. Tính năng có **tạo áp lực thời gian** không cần thiết không?
10. Phần thưởng dựa trên **hiểu bài** hay chỉ chơi lâu?
11. Tính năng có **phù hợp độ tuổi** không?
12. Tính năng có tạo rủi ro **nghiện / cạnh tranh tiêu cực** không?

---

## 🛣️ Lộ trình triển khai (6 giai đoạn)

| Giai đoạn | Tên | Mục tiêu chính |
|-----------|-----|----------------|
| **0** | Kiểm kê hệ thống | Phân tích code, schema, quests, rewards, dependencies — **KHÔNG sửa code** |
| **1** | Chuẩn hóa dữ liệu | Thêm metadata `educore` cho tất cả câu hỏi hiện có |
| **2** | Quest có bối cảnh ⭐ | Thêm story + NPC + phần thưởng vào câu hỏi hiện có (ưu tiên triển khai trước) |
| **3** | Phản hồi & gợi ý | Gợi ý 3 cấp, phân tích lỗi, câu tương tự, giải thích đáp án |
| **4** | Boss cuối chủ đề | Chuỗi nhiệm vụ tổng hợp theo nhóm LO |
| **5** | Bản đồ tiến trình | Trực quan hóa chương trình học thành bản đồ |

> ⭐ Giai đoạn 2 là **ưu tiên triển khai đầu tiên** vì tận dụng nội dung hiện có mà không thay đổi logic câu hỏi.

---

## 📊 Trạng thái tiến độ thay cho nhãn năng lực

| ❌ Không dùng | ✅ Nên dùng |
|---|---|
| Yếu / Kém / Chậm | Đang làm quen |
| Không thông minh | Đang luyện tập |
| | Đang tiến bộ |
| | Đã thành thạo |
| | Sẵn sàng thử thách |

---

## 🏗️ Công trình thị trấn ↔ Kiến thức

| Công trình | Gắn với |
|-----------|---------|
| 📚 Thư viện | Đọc hiểu, từ vựng, kể chuyện |
| 🛒 Cửa hàng | Tiền, cộng trừ, phần trăm |
| 🌳 Vườn cây | Thực vật, đo lường, thời gian |
| 🏛️ Bảo tàng | Lịch sử, địa lý |
| 🔬 Phòng thí nghiệm | Khoa học |
| 🔭 Đài quan sát | Trái Đất, không gian |
| 🔧 Xưởng chế tạo | Tin học, công nghệ |
| 🏫 Trường học | Tổng hợp kỹ năng |
| 🐾 Trung tâm cứu hộ | Động vật, môi trường |
