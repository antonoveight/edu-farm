# Cơ chế câu hỏi và game Toán Vui

Tài liệu này mô tả đường đi thực tế của một câu hỏi, từ lúc biên soạn từ sách đến lúc xuất hiện trong trò chơi tại `/game/index.html`.

## 1. Bức tranh tổng quát

```text
PDF sách giáo khoa
        ↓
Tệp câu hỏi JSON: src/data/grade{1..5}/{môn}.json
        ↓
Kiểm tra định dạng: npm run questions:validate
        ↓
SQLite bền vững: /app/storage/questions.sqlite
        ↓
GET /api/questions?grade={lớp}
        ↓
QUIZ_BANK trong trình duyệt
        ↓
Chọn môn, chọn câu hỏi, chống lặp và hiển thị theo nhiệm vụ game
```

Mỗi lần người chơi vào game và chọn lớp, game gọi API một lần để lấy ngân hàng câu hỏi của lớp đó. Vì vậy câu hỏi mới chỉ xuất hiện sau khi JSON đã được đồng bộ vào SQLite và phiên bản ứng dụng mới đang chạy.

## 2. Nguồn câu hỏi

### Thư mục dữ liệu

- Dữ liệu chuẩn nằm tại `src/data/grade1` đến `src/data/grade5`.
- Một tệp tương ứng một môn, ví dụ: `math.json`, `viet.json`, `english.json`, `science.json`, `tech.json`, `music.json`, `history_geo.json`.
- Các bộ PDF gốc lưu tại `backup/grade{n}`. Phần văn bản đã trích xuất để hỗ trợ biên soạn nằm tại `textbooks/game_knowledge_raw/grade{n}`.
- Các script `scripts/build_grade*_textbook_banks.cjs` tạo lại những ngân hàng đã biên soạn theo sách. Chạy lại script sẽ ghi lại JSON của các môn mà script quản lý.

Mã môn học dùng xuyên suốt dữ liệu, SQLite, API và game:

| Mã | Tên môn |
| --- | --- |
| `math` | Toán |
| `viet` | Tiếng Việt |
| `english` | Tiếng Anh |
| `science` | Tự nhiên và Xã hội / Khoa học |
| `tech` | Tin học, Công nghệ |
| `ethics` | Đạo đức |
| `experience` | Hoạt động trải nghiệm |
| `music` | Âm nhạc |
| `art` | Mĩ thuật |
| `physical` | Giáo dục thể chất |
| `history_geo` | Lịch sử và Địa lí |

`tech` là ngân hàng dùng chung trong game cho Tin học và Công nghệ. Nếu có cả hai bộ sách, câu hỏi của hai sách cần được gộp vào cùng `tech.json`, không tạo mã môn mới.

### Dạng của một câu hỏi

Ví dụ một câu trắc nghiệm:

```json
{
  "q": "Nước chảy như thế nào?",
  "a": "Từ cao xuống thấp",
  "c": ["Từ cao xuống thấp", "Từ thấp lên cao", "Không thể chảy"],
  "type": "multiple_choice",
  "lo": "Khoa học – nhận biết tính chất của nước",
  "difficulty": "easy",
  "status": "published",
  "sourceType": "book",
  "sourceRef": "SGK Khoa học 4 (...) – Chất",
  "sourcePage": 10,
  "explanation": "Nước chảy từ nơi cao xuống nơi thấp.",
  "hints": ["Hãy nghĩ đến khi đổ nước từ cốc xuống đất."]
}
```

Các trường cốt lõi là:

- `q`: nội dung câu hỏi.
- `a`: đáp án đúng.
- `c`: các lựa chọn; với trắc nghiệm phải chứa `a`.
- `type`: kiểu tương tác, thường là `multiple_choice`.
- `lo`: mục tiêu học tập hiển thị trong game.
- `status`: chỉ `published` được đưa ra API công khai.
- `sourceRef`, `sourcePage`: truy vết đúng sách và trang in.
- `explanation`, `hints`: giải thích và gợi ý cho người chơi.

Các kiểu có hỗ trợ gồm `multiple_choice`, `fill_blank`, `typing`, `shortcut`, `reorder`, `matching`, `true_false`, `find_error` và `categorize`. Quy ước đầy đủ ở [QUESTIONS_SCHEMA.md](src/data/QUESTIONS_SCHEMA.md).

## 3. Kiểm tra và đồng bộ vào SQLite

Trước khi deploy, chạy tối thiểu:

```bash
npm run questions:build:grade5   # thay 5 bằng lớp tương ứng nếu có script
npm run questions:validate
npm test
npm run lint
npm run build
```

`questions:validate` kiểm tra JSON hợp lệ, có nội dung hỏi/đáp án, kiểu câu hỏi hợp lệ, lựa chọn không trùng và đáp án trắc nghiệm nằm trong các lựa chọn.

Khi ứng dụng mở cơ sở dữ liệu, `question-store` tạo schema SQLite nếu cần và tính dấu vân tay của toàn bộ JSON. Nếu dấu vân tay thay đổi, các tệp dữ liệu được đồng bộ vào bảng `questions`.

Nguyên tắc đồng bộ quan trọng:

1. Câu từ JSON được tạo với `status: "published"` sẽ sẵn sàng cho game.
2. Câu hạt giống chưa được quản trị viên sửa có thể được cập nhật theo JSON mới.
3. Câu đã được quản trị viên sửa trong trang quản trị được giữ nguyên, không bị JSON ghi đè.
4. Đồng bộ không tự xóa câu cũ chỉ vì câu đó không còn trong JSON. Do đó số câu trên API có thể cao hơn số câu trong tệp JSON mới tạo; đây là dữ liệu đã tồn tại trong volume SQLite.
5. SQLite production nằm ở `/app/storage/questions.sqlite`, gắn với Docker volume `question-data`, nên vẫn còn khi tạo lại container.

Nếu cần xóa hoặc thay thế hoàn toàn dữ liệu cũ, đó là thao tác dữ liệu riêng và phải sao lưu/xác nhận trước; không thực hiện chỉ bằng cách xóa khỏi JSON.

## 4. API cung cấp câu hỏi

Endpoint:

```text
GET /api/questions?grade=1
```

API trả về một object gồm tất cả mã môn, mỗi mã có một mảng câu hỏi. Chỉ các câu `published`, chưa bị xóa mềm, mới được trả về.

Quy tắc theo lớp:

- Lớp 1: chỉ trả câu lớp 1.
- Lớp 2 đến 5: trả cả câu của lớp được chọn và lớp ngay trước đó.

Ví dụ, API lớp 5 gộp câu lớp 5 và lớp 4. Đây là cơ chế ôn luyện kế thừa, không phải game nhầm lớp. Câu lớp đang học được xếp trước trong kết quả SQLite, nhưng lúc chơi vẫn được chọn ngẫu nhiên từ toàn bộ ngân hàng đã gộp.

Có thể kiểm tra ngân hàng production bằng lệnh sau (chạy trong container vì cổng app không public trực tiếp):

```bash
docker exec toanvui-app node -e "fetch('http://127.0.0.1:3000/api/questions?grade=5').then(r=>r.json()).then(d=>console.log(Object.fromEntries(Object.entries(d).map(([k,v])=>[k,v.length))))"
```

## 5. Cách game nạp và chọn câu hỏi

Khi bấm chơi sau khi chọn lớp:

1. `startGame()` gọi `/api/questions?grade={selectedGrade}`.
2. Kết quả được đưa vào `QUIZ_BANK`, ví dụ `g5_viet`, `g5_english`, `g5_tech`, `g5_history_geo`.
3. `getAvailableCurriculumSubjects()` chỉ giữ các môn có ít nhất một câu trong `QUIZ_BANK`.
4. Với nhiệm vụ thông thường, `generateCurriculumQuestion()` chọn ngẫu nhiên một môn khả dụng rồi gọi `generateSpecificSubjectQuestion()`.
5. Hàm này chọn ngẫu nhiên một câu trong ngân hàng môn tương ứng, tạo lựa chọn hiển thị, gắn mục tiêu học tập, gợi ý và giải thích.

Vì vậy, không có cam kết mỗi lượt sẽ đổi môn. Ví dụ, người chơi lớp 5 có thể gặp `126 : 6 = ?` nếu lượt đó ngẫu nhiên chọn `math`; điều này không có nghĩa các câu Tiếng Việt, Tiếng Anh hoặc Lịch sử – Địa lí chưa vào game. Chúng sẽ xuất hiện khi lượt sau chọn các môn đó.

### Chống lặp

Game có hai lớp lịch sử ở trình duyệt:

- Mỗi mode (`farm`, `boss`, `pet`, `map`, `daily`, `default`) lưu tối đa 20 câu gần nhất.
- Hàng đợi tương thích chung lưu tối đa 15 câu gần nhất.

Khi lấy câu, `pickQuizQuestion()` trộn ngân hàng, thử tối đa 5 ứng viên chưa có trong lịch sử của mode hiện tại. Nếu ngân hàng quá nhỏ hoặc cả 5 ứng viên đều đã gặp, game vẫn trả một câu để người chơi không bị kẹt.

Lịch sử chỉ tồn tại trong phiên JavaScript hiện tại. Khi tải lại trang hoặc bắt đầu một số hoạt động như rương kho báu, lịch sử được làm mới.

### Các loại nhiệm vụ

| Hoạt động | Cách dùng câu hỏi |
| --- | --- |
| Nông trại | Chọn ngẫu nhiên một môn có dữ liệu cho từng nhiệm vụ. |
| Bản đồ | Chặng thường có 3 câu theo môn của chặng. |
| Boss | Có từ 3 đến 6 câu, chọn theo cơ chế môn/câu hiện hành. |
| Rương kho báu | Có 5 câu, xáo trộn danh sách các môn đang có dữ liệu rồi lần lượt dùng các môn đó. |

Môn thiếu dữ liệu sẽ không có trong danh sách môn khả dụng. Nếu một môn không lấy được câu, game dùng ngân hàng dự phòng rất nhỏ cho Tiếng Việt/Tiếng Anh/Khoa học/Tin học; với Toán còn có bộ sinh phép tính. Đây là phương án an toàn, không thay thế việc bổ sung ngân hàng chuẩn.

## 6. Hiển thị và trả lời

- Câu có `c` hiển thị dưới dạng các nút lựa chọn; thứ tự các lựa chọn được xáo trộn trước khi render.
- `math_input` dùng ô nhập kết quả; một số câu Toán không quy định kiểu sẽ được chọn ngẫu nhiên giữa nhập đáp án và trắc nghiệm.
- `fill_blank`, `typing`, `shortcut`, `reorder`, `matching` có cách hiển thị riêng dựa vào `type` và dữ liệu tương tác đi kèm.
- Nhãn ở đầu hộp nhiệm vụ cho biết loại nhiệm vụ và môn/lớp, ví dụ `TIÊU DIỆT SÂU - TOÁN HỌC LỚP 5`.
- Nếu câu có `lo`, game hiển thị mục tiêu học tập. Khi hoàn thành, game dùng `explanation` và `hints` của câu nếu có.

## 7. Quy trình thêm một bộ sách mới

1. Đặt PDF vào `backup/grade{n}`.
2. Trích xuất/đọc phần kiến thức, xác định môn và bài/trang nguồn.
3. Tạo hoặc cập nhật script sinh dữ liệu và JSON đúng mã môn.
4. Giữ lại `sourceRef`, `sourcePage`, `lo`, `explanation`, `hints`; tránh câu trùng.
5. Chạy script tạo JSON và toàn bộ các lệnh kiểm tra ở mục 3.
6. Build image, deploy container rồi kiểm tra `/api/health` và `/api/questions?grade={n}` từ bên trong container.
7. Mở game, chọn đúng lớp, chơi nhiều lượt hoặc rương kho báu để quan sát các môn mới. Vì môn được chọn ngẫu nhiên, không kết luận thiếu dữ liệu chỉ từ một câu hỏi Toán xuất hiện đầu tiên.

## 8. Điểm cần nhớ khi kiểm thử

- `status: "draft"` hoặc `archived` sẽ không xuất hiện trong game.
- Game chỉ tải API khi bắt đầu phiên chơi; sau khi deploy dữ liệu mới, cần tải lại trang hoặc bắt đầu lại game để lấy ngân hàng mới.
- API lớp 2–5 có tính kế thừa lớp trước, nên cần đối chiếu `sourceRef` và `lo` nếu muốn kiểm thử đúng bộ sách/lớp mới.
- Số lượng trả từ API là số dữ liệu trong SQLite, không nhất thiết bằng số dòng của một JSON, do cơ chế giữ dữ liệu cũ và gộp lớp liền trước.
- Trước khi thay đổi nhiều dữ liệu production, sao lưu SQLite/volume và kiểm tra trên API trước khi kiểm thử trực quan.
