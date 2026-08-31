const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'grade5');
const BOOKS = {
    viet1: ['SGK Tiếng Việt 5, Tập một – Kết nối tri thức với cuộc sống', 'sgk-tieng-viet-5-tap-1-kntt_5120269.pdf'],
    viet2: ['SGK Tiếng Việt 5, Tập hai – Kết nối tri thức với cuộc sống', 'sgk-tieng-viet-5-tap-2-kntt_5120269.pdf'],
    english1: ['SGK Tiếng Anh 5, Tập một – Global Success', 'sgk-tieng-anh-5-tap-1-globalsuccess_5120269.pdf'],
    english2: ['SGK Tiếng Anh 5, Tập hai – Global Success', 'sgk-tieng-anh-5-tap-2-globalsuccess_5120269.pdf'],
    tech: ['SGK Công nghệ 5 – Kết nối tri thức với cuộc sống', 'sgk-cong-nghe-5-kntt_5120269.pdf'],
    historyGeo: ['SGK Lịch sử và Địa lí 5 – Kết nối tri thức với cuộc sống', 'sgk-lich-su-va-dia-li-5-kntt_5120269.pdf'],
    music: ['SGK Âm nhạc 5 – Kết nối tri thức với cuộc sống', 'sgk-am-nhac-5-kntt_5120269.pdf'],
    it: ['SGK Tin học 5 – Kết nối tri thức với cuộc sống', 'sgk-tin-hoc-5-kntt_5120269.pdf']
};

function rotate(values, amount) {
    return [...values.slice(amount % values.length), ...values.slice(0, amount % values.length)];
}

function bank() {
    const questions = [];
    function add({ q, a, c, book, page, lesson, lo, difficulty = 'medium', explanation, hints = [] }) {
        const answer = String(a).normalize('NFC').trim();
        const choices = rotate([...new Set([answer, ...(c || []).map(String)])], questions.length % Math.max(1, (c || []).length + 1));
        if (choices.length < 2) throw new Error(`Thiếu phương án: ${q}`);
        questions.push({
            q: q.normalize('NFC').trim(), a: answer, c: choices, type: 'multiple_choice',
            lo: `${lesson} – ${lo}`, difficulty, status: 'published', sourceType: 'book',
            sourceRef: `${book[0]} (${book[1]}) – ${lesson}`, sourcePage: page,
            explanation: explanation || `Đáp án đúng là “${answer}”.`, hints
        });
    }
    return { questions, add };
}

function write(file, questions) {
    const seen = new Set();
    questions.forEach((question) => {
        const key = question.q.toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
        if (seen.has(key)) throw new Error(`Trùng câu hỏi trong ${file}: ${question.q}`);
        seen.add(key);
    });
    fs.writeFileSync(path.join(DATA_DIR, file), `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`${file}: ${questions.length} câu`);
}

function buildFacts(file, source, entries) {
    const { questions, add } = bank();
    entries.forEach(([lesson, page, q, a, c, lo, book]) => add({
        q, a, c, lo, book: book || source, page, lesson, hints: ['Đọc kỹ nội dung bài học và từng phương án.']
    }));
    write(file, questions);
}

function buildVietnamese() {
    const entries = [
        ['Đọc: Thanh âm của gió', 10, 'Trong bài “Thanh âm của gió”, khung cảnh suối được miêu tả như thế nào?', 'Nước trong vắt, cát sỏi lấp lánh', ['Nước đục và đầy rác', 'Không có cây cỏ', 'Chỉ có nhà cao tầng'], 'Hiểu chi tiết bài đọc', BOOKS.viet1],
        ['Đọc: Thanh âm của gió', 10, 'Khi đọc văn bản miêu tả thiên nhiên, em cần chú ý điều gì?', 'Những hình ảnh và âm thanh nổi bật', ['Chỉ số trang', 'Chỉ tên tác giả', 'Chỉ tranh bìa'], 'Đọc hiểu văn bản', BOOKS.viet1],
        ['Luyện từ và câu', 24, 'Từ nào là đại từ?', 'chúng tôi', ['cánh đồng', 'xanh mướt', 'chạy nhảy'], 'Nhận biết đại từ', BOOKS.viet1],
        ['Luyện từ và câu', 24, 'Từ nào là quan hệ từ?', 'và', ['cây', 'đẹp', 'học'], 'Nhận biết quan hệ từ', BOOKS.viet1],
        ['Luyện từ và câu', 35, 'Câu nào là câu ghép?', 'Trời mưa nên chúng em ở trong lớp.', ['Trời mưa.', 'Chúng em ở trong lớp.', 'Ôi, trời mưa!'], 'Nhận biết câu ghép', BOOKS.viet1],
        ['Luyện từ và câu', 35, 'Trong câu ghép “Trời mưa nên chúng em ở trong lớp.”, từ “nên” có tác dụng gì?', 'Nối các vế câu', ['Đặt tên sự vật', 'Chỉ màu sắc', 'Kết thúc câu'], 'Nhận biết quan hệ từ trong câu ghép', BOOKS.viet1],
        ['Luyện từ và câu', 48, 'Từ nào đồng nghĩa với “hòa bình”?', 'bình yên', ['chiến tranh', 'ồn ào', 'vội vàng'], 'Mở rộng vốn từ', BOOKS.viet1],
        ['Luyện từ và câu', 62, 'Từ nào trái nghĩa với “trung thực”?', 'gian dối', ['thẳng thắn', 'thật thà', 'chăm chỉ'], 'Mở rộng vốn từ', BOOKS.viet1],
        ['Chính tả', 74, 'Từ nào viết đúng chính tả?', 'rừng xanh', ['dừng xanh', 'giừng xanh', 'rừng xang'], 'Phân biệt r/d/gi', BOOKS.viet1],
        ['Chính tả', 86, 'Từ nào viết đúng chính tả với âm đầu s/x?', 'suy nghĩ', ['xuy nghĩ', 'suy nghỉ', 'xuy nghỉ'], 'Phân biệt s/x và ng/ngh', BOOKS.viet1],
        ['Viết', 98, 'Khi viết bài văn tả cảnh, em cần làm gì?', 'Quan sát và chọn chi tiết tiêu biểu', ['Chép nguyên văn bài khác', 'Không cần mở bài', 'Chỉ viết một câu'], 'Viết văn miêu tả', BOOKS.viet1],
        ['Viết', 114, 'Bài văn tả người thường cần nêu những gì?', 'Ngoại hình, hoạt động và tính cách', ['Chỉ tên người', 'Chỉ tuổi người', 'Chỉ nơi ở'], 'Viết văn miêu tả', BOOKS.viet1],
        ['Nói và nghe', 126, 'Khi thảo luận nhóm, em nên làm gì?', 'Lắng nghe và nêu ý kiến tôn trọng', ['Nói át bạn', 'Không hợp tác', 'Chế giễu ý kiến khác'], 'Kĩ năng giao tiếp', BOOKS.viet1],
        ['Đọc: Tiếng hát của người đá', 10, 'Câu chuyện “Tiếng hát của người đá” mở đầu ở đâu?', 'Trên đỉnh núi cao ở vùng Chư Bô-đa', ['Ở biển', 'Trong lớp học', 'Ở thành phố'], 'Nhận biết chi tiết bài đọc', BOOKS.viet2],
        ['Đọc: Tiếng hát của người đá', 10, 'Mỏm đá trong câu chuyện có hình giống gì?', 'Em bé cưỡi voi', ['Con chim', 'Chiếc thuyền', 'Ngôi nhà'], 'Nhận biết chi tiết bài đọc', BOOKS.viet2],
        ['Luyện từ và câu', 34, 'Chủ ngữ trong câu “Những tia nắng vàng dịu sưởi ấm mỏm đá.” là gì?', 'Những tia nắng vàng dịu', ['sưởi ấm mỏm đá', 'mỏm đá', 'sưởi ấm'], 'Nhận biết chủ ngữ', BOOKS.viet2],
        ['Luyện từ và câu', 34, 'Vị ngữ trong câu “Những tia nắng vàng dịu sưởi ấm mỏm đá.” là gì?', 'sưởi ấm mỏm đá', ['Những tia nắng vàng dịu', 'tia nắng', 'mỏm đá'], 'Nhận biết vị ngữ', BOOKS.viet2],
        ['Luyện từ và câu', 51, 'Từ nào là từ đồng âm với “đường” trong nghĩa lối đi?', 'đường ăn', ['lối đi', 'con phố', 'ngõ nhỏ'], 'Nhận biết từ đồng âm', BOOKS.viet2],
        ['Luyện từ và câu', 68, 'Dấu gạch ngang trong lời đối thoại thường dùng để làm gì?', 'Đánh dấu lời nói trực tiếp của nhân vật', ['Ngăn cách các từ cùng loại', 'Kết thúc câu hỏi', 'Nêu cảm xúc'], 'Sử dụng dấu câu', BOOKS.viet2],
        ['Viết', 88, 'Khi viết đoạn văn nêu ý kiến, em cần có gì?', 'Ý kiến rõ ràng và lí do phù hợp', ['Chỉ một từ', 'Không cần lí do', 'Sao chép ý kiến bất kì'], 'Viết đoạn văn', BOOKS.viet2],
        ['Viết', 103, 'Khi viết thư, em cần dùng lời xưng hô như thế nào?', 'Phù hợp và lịch sự', ['Tùy tiện, thiếu lễ phép', 'Không cần người nhận', 'Chỉ dùng từ viết tắt'], 'Viết thư', BOOKS.viet2],
        ['Đọc hiểu', 118, 'Khi đọc truyện, em cần nhận ra điều gì?', 'Nhân vật, sự việc và ý nghĩa', ['Chỉ số trang', 'Chỉ tranh bìa', 'Chỉ tên nhà in'], 'Đọc hiểu truyện', BOOKS.viet2]
    ];
    buildFacts('viet.json', BOOKS.viet1, entries);
}

function buildEnglish() {
    const topics = [
        ['Back to school', 'friends', 'bạn bè', 8], ['Birthday', 'January', 'tháng Một', 14], ['Our appearance', 'tall', 'cao', 20], ['Our bodies', 'shoulder', 'vai', 26], ['Future jobs', 'doctor', 'bác sĩ', 32],
        ['Our school rooms', 'library', 'thư viện', 38], ['School activities', 'read books', 'đọc sách', 44], ['In our classroom', 'board', 'bảng', 50], ['Our outdoor activities', 'badminton', 'cầu lông', 56], ['Our summer holidays', 'beach', 'bãi biển', 62],
        ['Travel', 'boat trip', 'chuyến đi bằng thuyền', 8], ['Weekend', 'last weekend', 'cuối tuần trước', 14], ['Food and drink', 'noodles', 'mì', 20], ['Shopping', 'shop', 'cửa hàng', 26], ['Weather', 'sunny', 'nắng', 32],
        ['Directions', 'turn left', 'rẽ trái', 38], ['Health', 'headache', 'đau đầu', 44], ['Nature', 'forest', 'rừng', 50], ['Hobbies', 'drawing', 'vẽ tranh', 56], ['Review', 'thank you', 'cảm ơn', 62]
    ];
    const { questions, add } = bank();
    topics.forEach(([lesson, word, meaning, page], index) => {
        const source = index < 10 ? BOOKS.english1 : BOOKS.english2;
        const distractors = topics.filter((_, position) => position !== index).slice(index % 12, index % 12 + 3).map((item) => item[1]);
        add({ q: `Từ tiếng Anh nào có nghĩa là “${meaning}”?`, a: word, c: distractors, lo: `Nhận biết từ vựng chủ đề ${lesson}`, book: source, page, lesson: `Unit: ${lesson}`, hints: ['Nhớ lại từ vựng trong bài học.'] });
        add({ q: `Trong chủ đề “${lesson}”, mẫu câu nào phù hợp để hỏi về một sự việc trong quá khứ?`, a: 'When did you go there?', c: ['What is your name?', 'How old are you?', 'Can you swim?'], lo: 'Sử dụng mẫu câu giao tiếp', book: source, page, lesson: `Unit: ${lesson}`, hints: ['Chú ý từ để hỏi về thời điểm trong quá khứ.'] });
        add({ q: `Chữ cái đầu của từ “${word}” là gì? (${lesson})`, a: word[0].toUpperCase(), c: ['A', 'B', 'C'].filter((item) => item !== word[0].toUpperCase()), lo: `Nhận biết chữ cái đầu của từ ${word}`, book: source, page, lesson: `Unit: ${lesson}`, hints: ['Quan sát chữ cái đầu tiên của từ.'] });
    });
    write('english.json', questions);
}

function buildTech(extraEntries = []) {
    const entries = [
        ['Công nghệ trong đời sống', 8, 'Sản phẩm công nghệ có thể giúp con người làm gì?', 'Làm việc và sinh hoạt thuận tiện hơn', ['Không có tác dụng', 'Chỉ làm đồ chơi', 'Thay thế hoàn toàn con người'], 'Nhận biết vai trò công nghệ'],
        ['Mặt trái khi sử dụng công nghệ', 10, 'Sử dụng thiết bị công nghệ quá lâu có thể gây gì?', 'Ảnh hưởng đến sức khỏe', ['Luôn tốt cho mắt', 'Không có ảnh hưởng', 'Tạo thêm thời gian ngủ'], 'Nhận biết mặt trái của công nghệ'],
        ['Mặt trái khi sử dụng công nghệ', 10, 'Chia sẻ thông tin cá nhân tùy tiện có thể gây gì?', 'Mất an toàn thông tin', ['Tăng an toàn thông tin', 'Không có rủi ro', 'Giúp bảo mật hơn'], 'Sử dụng công nghệ an toàn'],
        ['Mặt trái khi sử dụng công nghệ', 11, 'Để tránh lệ thuộc vào thiết bị số, em nên làm gì?', 'Dùng đúng thời gian và tham gia hoạt động khác', ['Dùng liên tục không nghỉ', 'Bỏ giao tiếp trực tiếp', 'Dùng khi đang ăn ngủ'], 'Sử dụng công nghệ hợp lí'],
        ['Nhà sáng chế', 22, 'Nhà sáng chế cần có đức tính nào?', 'Sáng tạo và kiên trì', ['Bỏ cuộc ngay', 'Không quan sát', 'Không thử nghiệm'], 'Nhận biết phẩm chất nhà sáng chế'],
        ['Nhà sáng chế', 24, 'Khi tìm hiểu một sáng chế, em nên quan tâm điều gì?', 'Vai trò của sản phẩm đối với đời sống', ['Chỉ màu vỏ hộp', 'Chỉ giá tiền', 'Chỉ tên người mua'], 'Tìm hiểu sản phẩm công nghệ'],
        ['Sử dụng điện an toàn', 36, 'Khi tay ướt, em có nên chạm vào ổ điện không?', 'Không', ['Có, nếu chạm nhanh', 'Có, nếu ở nhà', 'Có, nếu có bạn bên cạnh'], 'An toàn điện'],
        ['Sử dụng điện an toàn', 37, 'Khi phát hiện dây điện hở, em nên làm gì?', 'Báo ngay cho người lớn', ['Tự sửa', 'Chạm thử', 'Đổ nước vào'], 'An toàn điện'],
        ['Trồng cây', 52, 'Cây trồng cần được chăm sóc như thế nào?', 'Tưới nước và làm cỏ phù hợp', ['Không cần nước', 'Bẻ cành thường xuyên', 'Để rác quanh gốc'], 'Chăm sóc cây trồng'],
        ['Trồng cây', 54, 'Khi dùng dụng cụ làm vườn, em cần làm gì?', 'Sử dụng đúng cách và bảo đảm an toàn', ['Ném dụng cụ', 'Đùa nghịch với dụng cụ', 'Dùng khi không có hướng dẫn'], 'An toàn lao động'],
        ['Thiết kế sản phẩm', 66, 'Khi thiết kế sản phẩm, bước đầu tiên là gì?', 'Xác định nhu cầu hoặc vấn đề cần giải quyết', ['Làm ngẫu nhiên', 'Bỏ qua yêu cầu', 'Chỉ chọn màu'], 'Quy trình thiết kế'],
        ['Thiết kế sản phẩm', 68, 'Một sản phẩm tốt cần đáp ứng điều gì?', 'Hữu ích, an toàn và phù hợp', ['Chỉ thật đắt', 'Chỉ có màu đẹp', 'Không cần sử dụng được'], 'Đánh giá sản phẩm']
    ];
    buildFacts('tech.json', BOOKS.tech, [...entries, ...extraEntries]);
}

function buildIT() {
    const entries = [
        ['Tìm kiếm thông tin trên website', 8, 'Khi truy cập website, trang nào thường xuất hiện đầu tiên?', 'Trang chủ', ['Trang cuối', 'Trang in', 'Trang đăng xuất'], 'Nhận biết trang chủ'],
        ['Tìm kiếm thông tin trên website', 9, 'Thông tin trên website thường được sắp xếp theo gì?', 'Chủ đề', ['Màu ngẫu nhiên', 'Tên người dùng', 'Kích thước màn hình'], 'Tìm kiếm thông tin'],
        ['Tìm kiếm thông tin trên website', 10, 'Nút tìm kiếm trên website thường có biểu tượng gì?', 'Kính lúp', ['Ngôi nhà', 'Cây bút', 'Quả bóng'], 'Sử dụng công cụ tìm kiếm'],
        ['Tìm kiếm thông tin trên website', 10, 'Để tìm thông tin trên website, em nên làm gì?', 'Nhập từ khóa phù hợp vào ô tìm kiếm', ['Bấm ngẫu nhiên', 'Chia sẻ thông tin cá nhân', 'Tin mọi quảng cáo'], 'Tìm kiếm thông tin'],
        ['Tìm kiếm thông tin trên website', 11, 'Biểu tượng ngôi nhà trên website thường dùng để làm gì?', 'Trở về trang chủ', ['Xóa website', 'In trang', 'Tắt máy tính'], 'Sử dụng website'],
        ['An toàn trên mạng', 35, 'Khi gặp thông tin đáng ngờ trên mạng, em nên làm gì?', 'Hỏi người lớn trước khi tin hoặc chia sẻ', ['Chia sẻ ngay', 'Bấm mọi liên kết', 'Gửi thông tin cá nhân'], 'Ứng xử an toàn số'],
        ['Tạo sản phẩm số', 54, 'Khi tạo bài trình bày, em nên chọn nội dung như thế nào?', 'Rõ ràng, phù hợp chủ đề', ['Quá nhiều chữ nhỏ', 'Không có tiêu đề', 'Sao chép tùy ý'], 'Tạo sản phẩm số'],
        ['Tạo sản phẩm số', 56, 'Trước khi chia sẻ sản phẩm số, em cần làm gì?', 'Kiểm tra nội dung và nguồn thông tin', ['Chia sẻ ngay không xem lại', 'Đăng thông tin cá nhân', 'Bỏ qua lỗi'], 'Chia sẻ sản phẩm số']
    ];
    return entries.map((entry) => [...entry, BOOKS.it]);
}

function buildHistoryGeo() {
    const entries = [
        ['Vị trí địa lí Việt Nam', 8, 'Thiên nhiên nước ta mang tính chất gì?', 'Nhiệt đới ẩm gió mùa', ['Hàn đới', 'Hoang mạc', 'Cận cực'], 'Nhận biết đặc điểm tự nhiên'],
        ['Lãnh thổ Việt Nam', 9, 'Lãnh thổ Việt Nam gồm những vùng nào?', 'Vùng đất, vùng trời và vùng biển', ['Chỉ vùng đất', 'Chỉ vùng biển', 'Chỉ vùng trời'], 'Nhận biết lãnh thổ Việt Nam'],
        ['Lãnh thổ Việt Nam', 9, 'Phần đất liền Việt Nam có dạng gì?', 'Chữ S', ['Hình tròn', 'Hình vuông', 'Tam giác đều'], 'Nhận biết hình dạng lãnh thổ'],
        ['Lãnh thổ Việt Nam', 10, 'Việt Nam có bao nhiêu tỉnh, thành phố trực thuộc Trung ương?', '63', ['53', '73', '83'], 'Nhận biết đơn vị hành chính'],
        ['Lãnh thổ Việt Nam', 10, 'Đâu là thành phố trực thuộc Trung ương?', 'Đà Nẵng', ['Bắc Ninh', 'Ninh Bình', 'Lào Cai'], 'Nhận biết đơn vị hành chính'],
        ['Quốc kì, Quốc huy, Quốc ca', 12, 'Quốc kì Việt Nam có hình gì?', 'Hình chữ nhật', ['Hình tròn', 'Hình tam giác', 'Hình vuông'], 'Nhận biết Quốc kì'],
        ['Quốc kì, Quốc huy, Quốc ca', 12, 'Ngôi sao trên Quốc kì Việt Nam có màu gì?', 'Màu vàng', ['Màu xanh', 'Màu đen', 'Màu tím'], 'Nhận biết Quốc kì'],
        ['Dân cư Việt Nam', 27, 'Dân cư nước ta phân bố đông ở đâu?', 'Đồng bằng và đô thị', ['Vùng núi rất cao', 'Giữa biển', 'Hoang mạc'], 'Nhận biết phân bố dân cư'],
        ['Nông nghiệp', 42, 'Cây lương thực quan trọng của nước ta là gì?', 'Lúa', ['Lúa mì', 'Khoai tây', 'Ô liu'], 'Nhận biết sản xuất nông nghiệp'],
        ['Công nghiệp và dịch vụ', 58, 'Hoạt động nào thuộc lĩnh vực dịch vụ?', 'Du lịch', ['Trồng lúa', 'Chăn nuôi', 'Khai thác mỏ'], 'Phân biệt ngành kinh tế'],
        ['Việt Nam từ năm 1945', 75, 'Ngày Quốc khánh Việt Nam là ngày nào?', '2 tháng 9', ['30 tháng 4', '1 tháng 5', '22 tháng 12'], 'Nhận biết sự kiện lịch sử'],
        ['Việt Nam từ năm 1945', 76, 'Ai đọc Tuyên ngôn Độc lập ngày 2 tháng 9 năm 1945?', 'Chủ tịch Hồ Chí Minh', ['Lê Lợi', 'Ngô Quyền', 'Quang Trung'], 'Nhận biết nhân vật lịch sử'],
        ['Kháng chiến chống thực dân Pháp', 88, 'Chiến thắng Điện Biên Phủ diễn ra năm nào?', '1954', ['1945', '1975', '1986'], 'Nhận biết sự kiện lịch sử'],
        ['Kháng chiến chống thực dân Pháp', 89, 'Chiến thắng Điện Biên Phủ có ý nghĩa gì?', 'Góp phần kết thúc cuộc kháng chiến chống Pháp', ['Bắt đầu thời kì Bắc thuộc', 'Lập nhà nước Văn Lang', 'Dời đô ra Thăng Long'], 'Hiểu ý nghĩa sự kiện lịch sử'],
        ['Kháng chiến chống Mỹ', 102, 'Ngày giải phóng miền Nam, thống nhất đất nước là ngày nào?', '30 tháng 4 năm 1975', ['2 tháng 9 năm 1945', '7 tháng 5 năm 1954', '19 tháng 8 năm 1945'], 'Nhận biết sự kiện lịch sử'],
        ['Xây dựng và bảo vệ đất nước', 118, 'Khi tham quan di tích lịch sử, em cần làm gì?', 'Giữ gìn, tôn trọng và không xả rác', ['Vẽ bậy', 'Lấy hiện vật', 'Phá hoại cảnh quan'], 'Bảo vệ di sản']
    ];
    buildFacts('history_geo.json', BOOKS.historyGeo, entries);
}

function buildMusic() {
    const entries = [
        ['Vạch nhịp và ô nhịp', 8, 'Vạch nhịp là gì?', 'Vạch thẳng đứng cắt ngang khuông nhạc để phân chia ô nhịp', ['Dòng kẻ ngang của khuông nhạc', 'Lời bài hát', 'Tên một nốt nhạc'], 'Nhận biết vạch nhịp'],
        ['Vạch nhịp và ô nhịp', 8, 'Vạch nhịp kép dùng để làm gì?', 'Kết thúc bản nhạc', ['Bắt đầu bài hát', 'Đổi lời bài hát', 'Vẽ tranh'], 'Nhận biết vạch nhịp kép'],
        ['Vạch nhịp và ô nhịp', 8, 'Ô nhịp là khoảng cách giữa những gì?', 'Hai vạch nhịp liên tiếp', ['Hai dòng kẻ bất kì', 'Hai nốt Đô', 'Hai lời bài hát'], 'Nhận biết ô nhịp'],
        ['Luyện tập nhịp', 9, 'Khi vỗ tay theo nhịp, em cần làm gì?', 'Giữ đều nhịp', ['Vỗ tùy ý', 'Không nghe nhạc', 'Nói chuyện riêng'], 'Thực hành nhịp'],
        ['Hát', 12, 'Khi hát với nhạc đệm, em cần chú ý gì?', 'Đúng giai điệu và nhịp', ['Hát thật nhanh bất kì', 'Bỏ qua nhịp', 'Không nghe nhạc'], 'Thực hành hát'],
        ['Thường thức âm nhạc', 26, 'Khi nghe bạn biểu diễn, em nên làm gì?', 'Lắng nghe và cổ vũ lịch sự', ['Chế giễu', 'Gây ồn', 'Bỏ về giữa chừng'], 'Ứng xử trong âm nhạc'],
        ['Thực hành âm nhạc', 44, 'Trước khi biểu diễn, em nên làm gì?', 'Luyện tập và chuẩn bị tự tin', ['Không cần luyện tập', 'Trêu chọc bạn', 'Bỏ qua hướng dẫn'], 'Chuẩn bị biểu diễn'],
        ['Thực hành âm nhạc', 58, 'Khi sử dụng nhạc cụ, em cần làm gì?', 'Dùng đúng cách và giữ gìn nhạc cụ', ['Ném nhạc cụ', 'Tự ý tháo rời', 'Dùng để đùa nghịch'], 'Giữ gìn nhạc cụ']
    ];
    buildFacts('music.json', BOOKS.music, entries);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
buildVietnamese();
buildEnglish();
buildTech(buildIT());
buildHistoryGeo();
buildMusic();
