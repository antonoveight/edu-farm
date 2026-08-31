# Độ phủ sách giáo khoa và ngân hàng câu hỏi lớp 2

## Kết quả

Đợt chuẩn hóa này bổ sung **600 câu hỏi lớp 2 có nguồn sách trực tiếp** từ 9 PDF
trong `backup/grade2`. Mọi câu hỏi đều có môn học, mục tiêu học tập, độ khó,
trạng thái xuất bản, lời giải thích, gợi ý, tệp nguồn và số trang để truy vết.

| Môn | Số câu | Nguồn và phạm vi |
| --- | ---: | --- |
| Toán | 400 | Cả hai tập: số đến 100/1000, cộng trừ, nhân chia 2–5, đo lường, thời gian, tiền Việt Nam, hình học và vận dụng |
| Tiếng Việt | 100 | Cả hai tập: chính tả, từ và câu, dấu câu, đọc hiểu, giao tiếp và viết |
| Đạo đức | 20 | Yêu quê hương, kính trọng thầy cô, bạn bè, nội quy, môi trường |
| Hoạt động trải nghiệm | 20 | Trường học, an toàn, gia đình, thiên nhiên, nghề nghiệp |
| Âm nhạc | 20 | Hát, đọc nhạc, nhịp điệu, nhạc cụ dân tộc, biểu diễn |
| Mĩ thuật | 20 | Nét, hình, màu, vật liệu, thiên nhiên và chia sẻ sản phẩm |
| Giáo dục thể chất | 20 | Đội hình, thể dục, đi/chạy, trò chơi vận động và an toàn dưới nước |

Các câu hỏi Tin học và Tự nhiên và Xã hội lớp 2 đã có từ trước vẫn được giữ nguyên.
Không có PDF hai môn này trong bộ tài liệu mới nên không gán sai nguồn sách cho chúng.

## Quy trình tái lập

```bash
npm run questions:build:grade2
npm run questions:validate
npm run db:sync
```

Trình sinh dữ liệu là `scripts/build_grade2_textbook_banks.cjs`. Các kiểm thử
`tests/grade2-textbook-banks.test.js` kiểm tra số lượng tối thiểu, tính duy nhất
của câu hỏi, đáp án/phương án và khả năng truy vết về đúng PDF.

## Ghi chú nguồn

PDF được giữ ở `backup/grade2/`; dữ liệu OCR và tri thức trung gian có trong
`textbooks/ocr_pages/grade2/`, `textbooks/game_knowledge_raw/grade2/` và
`textbooks/game_knowledge_jsonl/grade2/`. Số trang trong dữ liệu là số trang
in được đối chiếu từ tài liệu, không phải số thứ tự tệp OCR.
