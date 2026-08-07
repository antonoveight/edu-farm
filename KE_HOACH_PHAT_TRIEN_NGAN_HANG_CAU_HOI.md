# Kế hoạch phát triển ngân hàng câu hỏi Edu-Farm

> Trạng thái: Đề xuất để triển khai trong giai đoạn tiếp theo  
> Ngày lưu kế hoạch: 08/08/2026  
> Phạm vi: Ngân hàng câu hỏi, kiểm duyệt nội dung và cơ chế phân phối câu hỏi trong game

## 1. Mục tiêu

Ưu tiên hoàn thiện ngân hàng câu hỏi và hệ thống đánh giá trước khi mở rộng thêm gameplay. Mục tiêu là tạo được nguồn câu hỏi đủ lớn, có cấu trúc, hạn chế trùng lặp, phù hợp từng khối lớp và có thể theo dõi năng lực học sinh.

Các mốc chính:

- Mốc 1: 750 câu duy nhất, đã được kiểm duyệt.
- Mốc 2: 1.500 câu, tương đương tối thiểu 100 câu cho mỗi tổ hợp khối lớp và môn học hiện có.
- Mỗi câu gắn với chủ đề, mục tiêu học tập, độ khó và nguồn nội dung.
- Câu hỏi không lặp lại trong cùng một phiên chơi.
- Có giải thích đáp án và gợi ý theo cấp độ.

## 2. Hiện trạng tại thời điểm lập kế hoạch

- Tổng số câu hỏi: 445.
- Có 95 lượt câu trùng thuộc 22 nhóm nội dung trùng lặp.
- Số câu trong mỗi tổ hợp khối/môn hiện khoảng 24–40 câu.
- Khối 5 có tổng số câu thấp nhất: 80 câu.
- Trắc nghiệm nhiều lựa chọn chiếm 234/445 câu.
- Các dạng còn lại gồm đúng/sai, điền khuyết, nhập liệu, nối, sắp xếp, tìm lỗi, phân loại và phím tắt.
- Dữ liệu hiện có các trường cơ bản: `q`, `a`, `c`, `type`, `lo`.
- API đang trộn câu của lớp hiện tại với lớp trước, vì vậy câu sao chép giữa các lớp có thể xuất hiện lặp lại nhiều hơn trong lúc chơi.

## 3. Nguyên tắc phát triển

1. Chất lượng và khả năng truy xuất nguồn quan trọng hơn số lượng.
2. Không đưa câu hỏi do AI tạo tự động lên production khi chưa được kiểm duyệt.
3. Câu hỏi dùng để ôn tập giữa nhiều lớp chỉ nên lưu một bản và được gắn metadata phù hợp.
4. Mọi thay đổi dữ liệu phải vượt qua kiểm tra tự động trước khi deploy.
5. Kết quả học tập phải liên kết được với mục tiêu kiến thức, không chỉ tính điểm game.

## 4. Schema đề xuất

Giữ tương thích với các trường hiện tại và bổ sung:

- `id`: mã câu hỏi ổn định, duy nhất.
- `schema_version`: phiên bản cấu trúc dữ liệu.
- `grade`: khối lớp.
- `subject`: môn hoặc lĩnh vực.
- `domain`, `topic`, `lesson_id`: miền kiến thức, chủ đề và bài học.
- `knowledge_unit_id`: đơn vị kiến thức.
- `learning_objective_id`: mục tiêu học tập.
- `skills`: các kỹ năng được đánh giá.
- `difficulty`: dễ, trung bình hoặc khó.
- `bloom_level`: mức độ nhận thức.
- `question_template`: mẫu sinh câu hỏi nếu có.
- `game_tags`: ngữ cảnh sử dụng trong game.
- `explanation`: giải thích đáp án.
- `hints`: các cấp độ gợi ý.
- `source_ref`: nguồn sách hoặc tài liệu.
- `review_status`: `draft`, `in_review`, `published` hoặc `retired`.
- `author`, `reviewer`, `reviewed_at`: thông tin biên soạn và kiểm duyệt.

## 5. Quy trình biên soạn

Quy trình chuẩn:

`Sách giáo khoa → Trích xuất kiến thức → Soạn câu hỏi → Kiểm tra tự động → Giáo viên duyệt → Xuất bản`

Một câu hỏi chỉ được chuyển sang `published` khi:

- Đúng schema và có ID duy nhất.
- Có đáp án hợp lệ theo đúng loại câu hỏi.
- Không trùng hoặc gần trùng với câu đã xuất bản.
- Có khối lớp, môn, chủ đề, độ khó và mục tiêu học tập.
- Có nguồn tham chiếu.
- Được người kiểm duyệt xác nhận.

## 6. Lộ trình 12 tuần

### Tuần 1–2: Chuẩn hóa nền tảng

- Gắn ID ổn định cho toàn bộ câu hiện có.
- Bổ sung schema và metadata giáo dục.
- Phân biệt câu trùng ngoài ý muốn với câu dùng chung để ôn tập.
- Xử lý 22 nhóm nội dung trùng lặp.
- Tạo báo cáo độ phủ theo khối, môn, chủ đề, độ khó và dạng câu.
- Bổ sung kiểm tra riêng cho câu đúng/sai, bắt buộc chỉ có hai lựa chọn hợp lệ.

### Tuần 3–6: Mở rộng lên 750–900 câu

- Ưu tiên khối 3, 4 và 5.
- Bổ sung các chủ đề đang thiếu theo báo cáo độ phủ.
- Tăng tỷ lệ câu đúng/sai, nối, sắp xếp, điền khuyết, tìm lỗi và phân loại.
- Thêm lời giải và gợi ý cho nội dung mới.
- Thực hiện kiểm duyệt theo từng lô nhỏ.

### Tuần 7–10: Đạt tối thiểu 1.500 câu

- Đảm bảo mỗi tổ hợp khối/môn có ít nhất 100 câu đã duyệt.
- Mỗi mục tiêu học tập có câu ở nhiều mức độ khó.
- Hoàn thiện giải thích đáp án và gợi ý cho dữ liệu cũ.
- Đưa kiểm tra ngân hàng câu hỏi vào quy trình CI/deploy.

### Tuần 11–12: Cá nhân hóa và thử nghiệm

- Không lặp câu trong cùng phiên chơi.
- Áp dụng tỷ lệ chọn câu đề xuất:
  - 70% kiến thức lớp hiện tại.
  - 20% ôn tập lớp trước.
  - 10% kỹ năng học sinh thường trả lời sai.
- Điều chỉnh độ khó theo kết quả gần nhất.
- Thử nghiệm với một nhóm học sinh và giáo viên.
- Ghi nhận phản hồi về độ khó, cách diễn đạt và lỗi đáp án.

## 7. Công cụ kiểm soát chất lượng cần bổ sung

Các lệnh dự kiến:

- `npm run questions:validate`: kiểm tra schema, đáp án và cấu trúc theo từng loại câu.
- `npm run questions:duplicates`: tìm câu trùng và gần trùng.
- `npm run questions:coverage`: xuất báo cáo độ phủ nội dung.

Quy trình kiểm tra phải báo lỗi khi:

- Thiếu trường bắt buộc hoặc ID bị trùng.
- Đáp án đúng không nằm trong tập lựa chọn.
- Câu đúng/sai có nhiều hơn hai lựa chọn.
- Payload không phù hợp với loại câu hỏi.
- Nội dung trùng hoặc gần trùng chưa được đánh dấu chủ ý.
- Thiếu metadata giáo dục hoặc nguồn tham chiếu.
- Một thay đổi làm giảm độ phủ đã đạt được.

## 8. Theo dõi kết quả học tập

Chỉ lưu dữ liệu cần thiết:

- `question_id`.
- Kết quả đúng/sai.
- Số lần thử.
- Thời gian trả lời.
- Số lần sử dụng gợi ý.
- Mục tiêu học tập và kỹ năng liên quan.

Từ đó có thể xây dựng báo cáo:

- Chủ đề học sinh đã thành thạo.
- Chủ đề cần ôn lại.
- Câu hỏi có tỷ lệ sai bất thường để giáo viên kiểm tra.
- Câu quá dễ, quá khó hoặc có cách diễn đạt gây nhầm lẫn.

## 9. Tiêu chí hoàn thành mốc đầu tiên

Mốc 750 câu được coi là hoàn thành khi:

- Có tối thiểu 750 câu duy nhất ở trạng thái `published`.
- 100% câu vượt qua validator tự động.
- Không còn câu trùng ngoài ý muốn.
- 100% câu có khối, môn, chủ đề, độ khó và nguồn.
- Câu đúng/sai luôn hiển thị đúng hai lựa chọn.
- Có báo cáo độ phủ và danh sách phần nội dung còn thiếu.
- Production không phát sinh lỗi tải hoặc hiển thị câu hỏi.

## 10. Thứ tự ưu tiên khi bắt đầu triển khai

1. Chuẩn hóa schema và tạo ID.
2. Xử lý câu trùng.
3. Viết validator và báo cáo độ phủ.
4. Sửa thuật toán chọn câu để chống lặp.
5. Mở rộng nội dung lên 750 câu đã duyệt.
6. Bổ sung lời giải, gợi ý và dữ liệu đánh giá.
7. Tiến đến mốc 1.500 câu và thử nghiệm cá nhân hóa.

