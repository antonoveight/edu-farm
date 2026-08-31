const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'grade4');
const BOOKS = {
    math1: ['SGK Toán 4, Tập một – Kết nối tri thức với cuộc sống', 'sgktoanhoctap1knttf29ff_5120269.pdf'],
    math2: ['SGK Toán 4, Tập hai – Kết nối tri thức với cuộc sống', 'sgktoanhoctap2kntt26b80_5120269.pdf'],
    viet1: ['SGK Tiếng Việt 4, Tập một – Kết nối tri thức với cuộc sống', 'sach-giao-khoa-tieng-viet-lop-4-tap-1-ket-noi-tri-thuc-pdfe60b1_5120269.pdf'],
    viet2: ['SGK Tiếng Việt 4, Tập hai – Kết nối tri thức với cuộc sống', 'sach-giao-khoa-tieng-viet-lop-4-tap-2-ket-noi-tri-thuc-pdfc509e_5120269.pdf'],
    science: ['SGK Khoa học 4 – Kết nối tri thức với cuộc sống', 'sach-giao-khoa-khoa-hoc-lop-4-ket-noi-tri-thuc-pdfac7d0_5120269.pdf'],
    historyGeo: ['SGK Lịch sử và Địa lí 4 – Kết nối tri thức với cuộc sống', 'sach-giao-khoa-lich-su-va-dia-li-lop-4-ket-noi-tri-thuc-pdfd98aa_5120269.pdf'],
    music: ['SGK Âm nhạc 4 – Kết nối tri thức với cuộc sống', 'sgkamnhacknttaaea0_5120269.pdf']
};

function rotate(values, amount) {
    return [...values.slice(amount % values.length), ...values.slice(0, amount % values.length)];
}

function numericChoices(value) {
    const number = Number(value);
    return [...new Set([number, number + 1, Math.max(0, number - 1), number + 10, Math.max(0, number - 10), number + 100])]
        .slice(0, 4).map(String);
}

function makeBank() {
    const questions = [];
    function add({ q, a, c, book, page, lesson, lo, difficulty = 'medium', explanation, hints = [] }) {
        const answer = String(a).normalize('NFC').trim();
        const choices = rotate([...new Set([answer, ...(c || []).map(String)])], questions.length % Math.max(1, (c || []).length + 1));
        if (choices.length < 2) throw new Error(`Thiếu phương án: ${q}`);
        questions.push({
            q: q.normalize('NFC').trim(), a: answer, c: choices, type: 'multiple_choice', lo: `${lesson} – ${lo}`,
            difficulty, status: 'published', sourceType: 'book', sourceRef: `${book[0]} (${book[1]}) – ${lesson}`,
            sourcePage: page, explanation: explanation || `Đáp án đúng là “${answer}”.`, hints
        });
    }
    return { questions, add };
}

function write(file, questions) {
    const seen = new Set();
    for (const question of questions) {
        const key = question.q.toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
        if (seen.has(key)) throw new Error(`Trùng câu hỏi trong ${file}: ${question.q}`);
        seen.add(key);
    }
    fs.writeFileSync(path.join(DATA_DIR, file), `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`${file}: ${questions.length} câu`);
}

function buildMath() {
    const { questions, add } = makeBank();
    const addNumeric = (q, a, lo, book, page, lesson, difficulty = 'medium', explanation) => add({
        q, a, c: numericChoices(a), lo, book, page, lesson, difficulty,
        explanation: explanation || `Thực hiện phép tính, ta được ${a}.`, hints: ['Ước lượng kết quả trước rồi tính cẩn thận.']
    });

    for (let index = 0; index < 75; index += 1) {
        const left = 12_435 + index * 1_127;
        const right = 6_789 + (index * 937 % 30_000);
        addNumeric(`${left.toLocaleString('vi-VN')} + ${right.toLocaleString('vi-VN')} = ?`, left + right,
            'Cộng các số tự nhiên', BOOKS.math1, 18, 'Số tự nhiên và phép tính', 'medium');
        addNumeric(`${(left + right).toLocaleString('vi-VN')} − ${left.toLocaleString('vi-VN')} = ?`, right,
            'Trừ các số tự nhiên', BOOKS.math1, 25, 'Số tự nhiên và phép tính', 'medium');
    }
    for (let factor = 12; factor <= 41; factor += 1) {
        for (const multiplier of [3, 4, 6, 7]) {
            addNumeric(`${factor} × ${multiplier} = ?`, factor * multiplier, 'Nhân với số có một chữ số', BOOKS.math1, 46, 'Phép nhân', 'medium');
        }
    }
    for (let divisor = 3; divisor <= 9; divisor += 1) {
        for (let quotient = 21; quotient <= 35; quotient += 1) {
            const dividend = divisor * quotient;
            addNumeric(`${dividend} : ${divisor} = ?`, quotient, 'Chia cho số có một chữ số', BOOKS.math1, 66, 'Phép chia', 'medium');
        }
    }
    for (let index = 0; index < 30; index += 1) {
        const numerator = 1 + index % 7;
        const denominator = 2 + (index * 3 % 8);
        add({
            q: `Trong phân số ${numerator}/${denominator}, số ${denominator} gọi là gì?`, a: 'Mẫu số',
            c: ['Tử số', 'Thương', 'Số dư'], lo: 'Nhận biết tử số và mẫu số', book: BOOKS.math2, page: 76,
            lesson: 'Phân số', explanation: `Trong phân số ${numerator}/${denominator}, ${denominator} là mẫu số.`, hints: ['Mẫu số là số ở dưới gạch ngang.']
        });
    }
    const applications = [
        ['Một cửa hàng có 48 250 quyển sách, đã bán 12 475 quyển. Cửa hàng còn lại bao nhiêu quyển sách?', 35_775, 'Giải bài toán bằng phép trừ'],
        ['Có 24 thùng nước, mỗi thùng 36 chai. Có tất cả bao nhiêu chai nước?', 864, 'Giải bài toán bằng phép nhân'],
        ['936 học sinh xếp đều thành 9 hàng. Mỗi hàng có bao nhiêu học sinh?', 104, 'Giải bài toán bằng phép chia'],
        ['Một xe chở 4 500 kg gạo. Có 6 xe như thế chở được bao nhiêu ki-lô-gam gạo?', 27_000, 'Giải bài toán bằng phép nhân'],
        ['Một hình vuông có cạnh dài 8 cm. Chu vi hình vuông là bao nhiêu xăng-ti-mét?', 32, 'Tính chu vi hình vuông'],
        ['Một hình chữ nhật dài 12 cm, rộng 7 cm. Chu vi hình chữ nhật là bao nhiêu xăng-ti-mét?', 38, 'Tính chu vi hình chữ nhật'],
        ['1 tấn bằng bao nhiêu ki-lô-gam?', 1000, 'Đổi đơn vị khối lượng'],
        ['1 thế kỉ bằng bao nhiêu năm?', 100, 'Đổi đơn vị thời gian'],
        ['Một góc có số đo 90°. Đó là góc gì?', 'Góc vuông', 'Nhận biết góc vuông', ['Góc nhọn', 'Góc tù', 'Góc bẹt']],
        ['Biểu thức nào có giá trị bằng 36?', '6 × 6', 'Tính giá trị biểu thức', ['6 + 6', '60 : 6', '6 × 5']],
        ['Phân số nào bằng một phần hai?', '1/2', 'Nhận biết phân số đơn giản', ['2/1', '1/3', '2/3']],
        ['Hình có sáu mặt đều là hình vuông là hình gì?', 'Hình lập phương', 'Nhận biết hình khối', ['Hình tam giác', 'Hình tròn', 'Hình chữ nhật']]
    ];
    applications.forEach(([q, a, lo, c], index) => {
        if (c) add({ q, a, c, lo, book: BOOKS.math2, page: 125, lesson: 'Ôn tập và vận dụng', hints: ['Xác định kiến thức toán được hỏi.'] });
        else addNumeric(q, a, lo, BOOKS.math2, 125, 'Ôn tập và vận dụng', 'medium');
    });
    return questions;
}

function buildFactBank(file, source, entries) {
    const { questions, add } = makeBank();
    entries.forEach(([lesson, page, q, a, c, lo, book]) => add({
        q, a, c, lo, book: book || source, page, lesson, hints: ['Đọc kỹ nội dung bài học và từng phương án.']
    }));
    write(file, questions);
}

function buildVietnamese() {
    const entries = [
        ['Đọc: Mỗi người một vẻ', 12, 'Trong bài thơ “Mỗi người một vẻ”, sự khác biệt của mỗi bạn được ví với điều gì?', 'Những bông hoa trong vườn', ['Những hòn đá', 'Những chiếc lá khô', 'Những quyển vở'], 'Hiểu hình ảnh so sánh', BOOKS.viet1],
        ['Đọc: Mỗi người một vẻ', 12, 'Thông điệp phù hợp của bài “Mỗi người một vẻ” là gì?', 'Tôn trọng sự khác biệt của mỗi người', ['Chỉ chơi với người giống mình', 'Chê bai bạn khác mình', 'Không cần hợp tác'], 'Rút ra ý nghĩa bài đọc', BOOKS.viet1],
        ['Luyện từ và câu', 24, 'Từ nào là danh từ?', 'cây phượng', ['xanh mướt', 'chạy nhanh', 'rất đẹp'], 'Nhận biết danh từ', BOOKS.viet1],
        ['Luyện từ và câu', 24, 'Từ nào là động từ?', 'đọc sách', ['quyển sách', 'xinh xắn', 'sân trường'], 'Nhận biết động từ', BOOKS.viet1],
        ['Luyện từ và câu', 24, 'Từ nào là tính từ?', 'chăm chỉ', ['học sinh', 'học bài', 'lớp học'], 'Nhận biết tính từ', BOOKS.viet1],
        ['Luyện từ và câu', 39, 'Câu nào là câu hỏi?', 'Bạn đã làm bài tập chưa?', ['Em đã làm bài tập.', 'Hãy làm bài tập!', 'Ôi, bài tập khó quá!'], 'Nhận biết câu hỏi', BOOKS.viet1],
        ['Luyện từ và câu', 39, 'Cuối câu hỏi thường dùng dấu gì?', 'Dấu chấm hỏi', ['Dấu chấm', 'Dấu phẩy', 'Dấu chấm than'], 'Sử dụng dấu câu', BOOKS.viet1],
        ['Luyện từ và câu', 55, 'Câu nào là câu khiến?', 'Em hãy giữ trật tự trong lớp.', ['Em giữ trật tự trong lớp.', 'Em có giữ trật tự không?', 'Lớp học yên tĩnh quá!'], 'Nhận biết câu khiến', BOOKS.viet1],
        ['Luyện từ và câu', 68, 'Trong câu “Lan, Mai và Hoa cùng trực nhật.”, dấu phẩy dùng để làm gì?', 'Ngăn cách các từ cùng loại', ['Kết thúc câu', 'Nêu cảm xúc', 'Nối hai câu'], 'Sử dụng dấu phẩy', BOOKS.viet1],
        ['Chính tả', 73, 'Từ nào viết đúng chính tả?', 'trung thực', ['chung thực', 'trung thựt', 'chung thựt'], 'Phân biệt tr/ch', BOOKS.viet1],
        ['Chính tả', 80, 'Từ nào viết đúng chính tả với âm đầu s/x?', 'sáng sủa', ['xáng xủa', 'sáng xủa', 'xáng sủa'], 'Phân biệt s/x', BOOKS.viet1],
        ['Chính tả', 95, 'Tên riêng nào viết hoa đúng?', 'Thành phố Hà Nội', ['thành phố Hà Nội', 'Thành phố hà nội', 'thành phố hà nội'], 'Viết tên riêng', BOOKS.viet1],
        ['Viết', 109, 'Bài văn kể chuyện cần có những phần nào?', 'Mở bài, thân bài, kết bài', ['Chỉ mở bài', 'Chỉ thân bài', 'Chỉ kết bài'], 'Nhận biết cấu tạo bài văn', BOOKS.viet1],
        ['Viết', 122, 'Khi miêu tả đồ vật, em cần quan sát điều gì?', 'Đặc điểm nổi bật của đồ vật', ['Chỉ giá tiền', 'Chỉ tên người mua', 'Chỉ số trang'], 'Viết đoạn văn miêu tả', BOOKS.viet1],
        ['Đọc: Hải Thượng Lãn Ông', 10, 'Hải Thượng Lãn Ông có tên thật là gì?', 'Lê Hữu Trác', ['Nguyễn Trãi', 'Chu Văn An', 'Lê Lợi'], 'Nhận biết nhân vật lịch sử trong bài đọc', BOOKS.viet2],
        ['Đọc: Hải Thượng Lãn Ông', 10, 'Hải Thượng Lãn Ông học nghề y vì điều gì?', 'Muốn chữa bệnh giúp người', ['Muốn trở nên giàu có', 'Muốn đi du lịch', 'Muốn tránh học sách'], 'Hiểu nội dung bài đọc', BOOKS.viet2],
        ['Đọc: Hải Thượng Lãn Ông', 10, 'Chi tiết nào cho thấy Hải Thượng Lãn Ông thương người nghèo?', 'Khám bệnh và cho thuốc không lấy tiền', ['Chỉ chữa cho người giàu', 'Không nhận bệnh nhân', 'Bắt người nghèo trả nhiều tiền'], 'Rút ra phẩm chất nhân vật', BOOKS.viet2],
        ['Luyện từ và câu', 35, 'Chủ ngữ trong câu “Các bạn học sinh đang đọc sách.” là bộ phận nào?', 'Các bạn học sinh', ['đang đọc sách', 'đọc sách', 'sách'], 'Nhận biết chủ ngữ', BOOKS.viet2],
        ['Luyện từ và câu', 35, 'Vị ngữ trong câu “Các bạn học sinh đang đọc sách.” là bộ phận nào?', 'đang đọc sách', ['Các bạn học sinh', 'học sinh', 'Các bạn'], 'Nhận biết vị ngữ', BOOKS.viet2],
        ['Luyện từ và câu', 51, 'Từ nào đồng nghĩa với “dũng cảm”?', 'can đảm', ['nhút nhát', 'lười biếng', 'ồn ào'], 'Mở rộng vốn từ', BOOKS.viet2],
        ['Luyện từ và câu', 64, 'Từ nào trái nghĩa với “đoàn kết”?', 'chia rẽ', ['gắn bó', 'hợp tác', 'yêu thương'], 'Mở rộng vốn từ', BOOKS.viet2],
        ['Viết', 88, 'Khi viết thư, phần đầu thư thường có gì?', 'Lời chào người nhận', ['Chỉ chữ kí', 'Chỉ số trang', 'Chỉ hình minh họa'], 'Viết thư', BOOKS.viet2],
        ['Nói và nghe', 103, 'Khi trình bày ý kiến trước lớp, em nên làm gì?', 'Nói rõ ràng và tôn trọng người nghe', ['Nói chen', 'Trêu chọc bạn', 'Không lắng nghe ai'], 'Kĩ năng giao tiếp', BOOKS.viet2],
        ['Đọc hiểu', 118, 'Khi đọc một văn bản thông tin, em cần chú ý điều gì?', 'Các ý chính và chi tiết quan trọng', ['Chỉ tranh minh họa', 'Chỉ số trang', 'Chỉ tên sách'], 'Đọc hiểu văn bản', BOOKS.viet2]
    ];
    buildFactBank('viet.json', BOOKS.viet1, entries);
}

function buildScience() {
    const entries = [
        ['Chất', 10, 'Nước có đặc điểm nào?', 'Không màu, không mùi, không vị', ['Có màu đỏ', 'Có mùi thơm cố định', 'Có hình dạng cố định'], 'Vận dụng kiến thức khoa học'],
        ['Chất', 10, 'Nước chảy như thế nào?', 'Từ cao xuống thấp', ['Từ thấp lên cao', 'Chỉ chảy sang trái', 'Không thể chảy'], 'Vận dụng kiến thức khoa học'],
        ['Chất', 10, 'Nước có thể làm gì với một số chất?', 'Hòa tan', ['Làm biến mất mọi vật', 'Làm vật phát sáng', 'Làm vật bay lên'], 'Vận dụng kiến thức khoa học'],
        ['Chất', 10, 'Nước cần thiết đối với ai?', 'Con người, động vật và thực vật', ['Chỉ con người', 'Chỉ động vật', 'Chỉ thực vật'], 'Vận dụng kiến thức khoa học'],
        ['Năng lượng', 36, 'Nguồn sáng tự nhiên quan trọng nhất là gì?', 'Mặt Trời', ['Đèn pin', 'Bóng điện', 'Ngọn nến'], 'Vận dụng kiến thức khoa học'],
        ['Năng lượng', 36, 'Vật phát ra ánh sáng gọi là gì?', 'Nguồn sáng', ['Vật cản sáng', 'Bóng tối', 'Gương'], 'Vận dụng kiến thức khoa học'],
        ['Năng lượng', 36, 'Âm thanh được tạo ra khi nào?', 'Khi vật rung động', ['Khi vật đứng yên hoàn toàn', 'Khi trời tối', 'Khi không có không khí'], 'Vận dụng kiến thức khoa học'],
        ['Năng lượng', 36, 'Để bảo vệ tai, em cần làm gì?', 'Không nghe âm thanh quá to lâu', ['Mở loa thật to', 'Đeo tai nghe suốt ngày', 'Đứng sát loa'], 'Vận dụng kiến thức khoa học'],
        ['Thực vật và động vật', 62, 'Cây cần gì để sống và phát triển?', 'Nước, không khí, ánh sáng và chất dinh dưỡng', ['Chỉ đồ chơi', 'Chỉ tiếng nhạc', 'Chỉ đất khô'], 'Vận dụng kiến thức khoa học'],
        ['Thực vật và động vật', 62, 'Bộ phận nào của cây thường hút nước?', 'Rễ', ['Lá', 'Hoa', 'Quả'], 'Vận dụng kiến thức khoa học'],
        ['Thực vật và động vật', 62, 'Động vật cần gì để sống?', 'Thức ăn, nước và không khí', ['Chỉ đồ chơi', 'Chỉ sách', 'Chỉ ánh sáng đèn'], 'Vận dụng kiến thức khoa học'],
        ['Thực vật và động vật', 62, 'Để bảo vệ động vật, em nên làm gì?', 'Không săn bắt và bảo vệ nơi ở của chúng', ['Phá tổ', 'Bắt con non', 'Ném đá'], 'Vận dụng kiến thức khoa học'],
        ['Con người và sức khỏe', 90, 'Cơ quan nào bơm máu đi khắp cơ thể?', 'Tim', ['Phổi', 'Dạ dày', 'Tai'], 'Vận dụng kiến thức khoa học'],
        ['Con người và sức khỏe', 90, 'Để bảo vệ mắt, em nên làm gì?', 'Đọc ở nơi đủ ánh sáng', ['Đọc khi nằm', 'Nhìn màn hình quá lâu', 'Dụi mắt bằng tay bẩn'], 'Vận dụng kiến thức khoa học'],
        ['Con người và sức khỏe', 90, 'Thức ăn cần được bảo quản thế nào?', 'Sạch sẽ và phù hợp', ['Để ôi thiu', 'Để lẫn với rác', 'Ăn khi chưa chín'], 'Vận dụng kiến thức khoa học'],
        ['Con người và sức khỏe', 90, 'Khi bị đau hoặc mệt, em nên làm gì?', 'Báo cho người lớn', ['Tự dùng thuốc lạ', 'Giấu đi', 'Chạy nhảy quá sức'], 'Vận dụng kiến thức khoa học'],
        ['Trái Đất và bầu trời', 112, 'Không khí có vai trò gì?', 'Cần cho sự sống và sự cháy', ['Không có tác dụng', 'Chỉ dùng để làm đồ chơi', 'Chỉ có ở trong nhà'], 'Vận dụng kiến thức khoa học'],
        ['Trái Đất và bầu trời', 112, 'Để giữ không khí trong lành, em nên làm gì?', 'Trồng cây và không đốt rác', ['Đốt rác', 'Xả khói bừa bãi', 'Chặt cây xanh'], 'Vận dụng kiến thức khoa học'],
        ['Trái Đất và bầu trời', 112, 'Nước bốc hơi nhanh hơn khi nào?', 'Khi trời nóng và có gió', ['Khi trời lạnh hơn', 'Khi để trong tủ lạnh', 'Khi đóng kín chai'], 'Vận dụng kiến thức khoa học'],
        ['Trái Đất và bầu trời', 112, 'Mây được hình thành từ đâu?', 'Hơi nước ngưng tụ', ['Đất tan ra', 'Cây biến mất', 'Đá bay lên'], 'Vận dụng kiến thức khoa học']
    ];
    buildFactBank('science.json', BOOKS.science, entries);
    return;
    /*
    const themes = [
        ['Chất', 10, [['Nước có đặc điểm nào?', 'Không màu, không mùi, không vị', ['Có màu đỏ', 'Có mùi thơm cố định', 'Có hình dạng cố định']], ['Nước chảy như thế nào?', 'Từ cao xuống thấp', ['Từ thấp lên cao', 'Chỉ chảy sang trái', 'Không thể chảy']], ['Nước có thể làm gì với một số chất?', 'Hòa tan', ['Làm biến mất mọi vật', 'Làm vật phát sáng', 'Làm vật bay lên']], ['Nước cần thiết đối với ai?', 'Con người, động vật và thực vật', ['Chỉ con người', 'Chỉ động vật', 'Chỉ thực vật']]],
        ['Năng lượng', 36, [['Nguồn sáng tự nhiên quan trọng nhất là gì?', 'Mặt Trời', ['Đèn pin', 'Bóng điện', 'Ngọn nến']], ['Vật phát ra ánh sáng gọi là gì?', 'Nguồn sáng', ['Vật cản sáng', 'Bóng tối', 'Gương']], ['Âm thanh được tạo ra khi nào?', 'Khi vật rung động', ['Khi vật đứng yên hoàn toàn', 'Khi trời tối', 'Khi không có không khí']], ['Để bảo vệ tai, em cần làm gì?', 'Không nghe âm thanh quá to lâu', ['Mở loa thật to', 'Đeo tai nghe suốt ngày', 'Đứng sát loa']],
        ['Thực vật và động vật', 62, [['Cây cần gì để sống và phát triển?', 'Nước, không khí, ánh sáng và chất dinh dưỡng', ['Chỉ đồ chơi', 'Chỉ tiếng nhạc', 'Chỉ đất khô']], ['Bộ phận nào của cây thường hút nước?', 'Rễ', ['Lá', 'Hoa', 'Quả']], ['Động vật cần gì để sống?', 'Thức ăn, nước và không khí', ['Chỉ đồ chơi', 'Chỉ sách', 'Chỉ ánh sáng đèn']], ['Để bảo vệ động vật, em nên làm gì?', 'Không săn bắt và bảo vệ nơi ở của chúng', ['Phá tổ', 'Bắt con non', 'Ném đá']],
        ['Con người và sức khỏe', 90, [['Cơ quan nào bơm máu đi khắp cơ thể?', 'Tim', ['Phổi', 'Dạ dày', 'Tai']], ['Để bảo vệ mắt, em nên làm gì?', 'Đọc ở nơi đủ ánh sáng', ['Đọc khi nằm', 'Nhìn màn hình quá lâu', 'Dụi mắt bằng tay bẩn']], ['Thức ăn cần được bảo quản thế nào?', 'Sạch sẽ và phù hợp', ['Để ôi thiu', 'Để lẫn với rác', 'Ăn khi chưa chín']], ['Khi bị đau hoặc mệt, em nên làm gì?', 'Báo cho người lớn', ['Tự dùng thuốc lạ', 'Giấu đi', 'Chạy nhảy quá sức']]],
        ['Trái Đất và bầu trời', 112, [['Không khí có vai trò gì?', 'Cần cho sự sống và sự cháy', ['Không có tác dụng', 'Chỉ dùng để làm đồ chơi', 'Chỉ có ở trong nhà']], ['Để giữ không khí trong lành, em nên làm gì?', 'Trồng cây và không đốt rác', ['Đốt rác', 'Xả khói bừa bãi', 'Chặt cây xanh']], ['Nước bốc hơi nhanh hơn khi nào?', 'Khi trời nóng và có gió', ['Khi trời lạnh hơn', 'Khi để trong tủ lạnh', 'Khi đóng kín chai']], ['Mây được hình thành từ đâu?', 'Hơi nước ngưng tụ', ['Đất tan ra', 'Cây biến mất', 'Đá bay lên']]]
    ];
    const entries = themes.flatMap(([lesson, page, rows]) => rows.map(([q, a, c]) => [lesson, page, q, a, c, 'Vận dụng kiến thức khoa học']));
    buildFactBank('science.json', BOOKS.science, entries);
    */
}

function buildHistoryGeo() {
    const entries = [
        ['Bản đồ và lược đồ', 8, 'Lược đồ là gì?', 'Hình vẽ thu nhỏ một khu vực theo tỉ lệ nhất định', ['Một bài thơ', 'Một phép tính', 'Một loại nhạc cụ'], 'Nhận biết lược đồ'],
        ['Bản đồ và lược đồ', 8, 'Để biết bản đồ thể hiện nội dung gì, trước hết cần đọc gì?', 'Tên bản đồ', ['Số trang', 'Màu bìa', 'Tên người đọc'], 'Sử dụng bản đồ'],
        ['Bản đồ và lược đồ', 9, 'Chú giải trên bản đồ giúp em biết điều gì?', 'Ý nghĩa của các kí hiệu', ['Giá tiền bản đồ', 'Tên tác giả bài thơ', 'Thời gian ra chơi'], 'Sử dụng bản đồ'],
        ['Bảng số liệu và biểu đồ', 12, 'Bảng số liệu là gì?', 'Tập hợp số liệu được sắp xếp có hệ thống', ['Một bài hát', 'Một bức tranh không có số', 'Một câu chuyện'], 'Đọc bảng số liệu'],
        ['Bảng số liệu và biểu đồ', 12, 'Biểu đồ giúp thể hiện điều gì?', 'Số liệu một cách trực quan', ['Chỉ lời bài hát', 'Chỉ tên địa phương', 'Chỉ màu sắc'], 'Đọc biểu đồ'],
        ['Bảng số liệu và biểu đồ', 13, 'Trục thời gian thể hiện điều gì?', 'Chuỗi sự kiện theo thời gian', ['Các phép tính', 'Các nốt nhạc', 'Các loại cây'], 'Đọc trục thời gian'],
        ['Thiên nhiên Việt Nam', 28, 'Việt Nam nằm ở châu lục nào?', 'Châu Á', ['Châu Âu', 'Châu Phi', 'Châu Mĩ'], 'Xác định vị trí Việt Nam'],
        ['Thiên nhiên Việt Nam', 31, 'Dạng địa hình nào chiếm phần lớn diện tích nước ta?', 'Đồi núi', ['Hoang mạc', 'Băng hà', 'Đồng cỏ savan'], 'Nhận biết địa hình Việt Nam'],
        ['Thiên nhiên Việt Nam', 34, 'Đồng bằng lớn nhất nước ta là đồng bằng nào?', 'Đồng bằng sông Cửu Long', ['Đồng bằng Bắc Bộ', 'Đồng bằng ven biển miền Trung', 'Đồng bằng Tây Nguyên'], 'Nhận biết đồng bằng'],
        ['Thiên nhiên Việt Nam', 38, 'Con sông dài nhất ở Việt Nam là sông nào?', 'Sông Hồng', ['Sông Thames', 'Sông Nin', 'Sông Volga'], 'Nhận biết sông ngòi'],
        ['Thiên nhiên Việt Nam', 44, 'Để bảo vệ tài nguyên thiên nhiên, em nên làm gì?', 'Sử dụng tiết kiệm và không xả rác', ['Khai thác bừa bãi', 'Đốt rừng', 'Vứt rác xuống sông'], 'Bảo vệ môi trường'],
        ['Dân cư và hoạt động sản xuất', 52, 'Người dân vùng đồng bằng thường thuận lợi phát triển hoạt động nào?', 'Trồng lúa', ['Đánh bắt cá voi ở đại dương', 'Trượt tuyết', 'Khai thác băng'], 'Nhận biết hoạt động sản xuất'],
        ['Dân cư và hoạt động sản xuất', 57, 'Nghề nào thuộc hoạt động dịch vụ?', 'Bán hàng', ['Trồng lúa', 'Nuôi gà', 'Khai thác gỗ'], 'Phân biệt hoạt động kinh tế'],
        ['Lịch sử dựng nước', 68, 'Nhà nước đầu tiên của người Việt cổ có tên là gì?', 'Văn Lang', ['Đại Việt', 'Việt Nam Dân chủ Cộng hòa', 'Cộng hòa Xã hội chủ nghĩa Việt Nam'], 'Nhận biết nhà nước Văn Lang'],
        ['Lịch sử dựng nước', 70, 'Ai là người đứng đầu nhà nước Văn Lang?', 'Hùng Vương', ['Ngô Quyền', 'Lý Thái Tổ', 'Quang Trung'], 'Nhận biết Hùng Vương'],
        ['Thời kì Bắc thuộc', 78, 'Hai Bà Trưng khởi nghĩa để làm gì?', 'Chống ách đô hộ của nhà Hán', ['Xây thành phố mới', 'Mở trường học', 'Tìm vàng'], 'Nhận biết khởi nghĩa Hai Bà Trưng'],
        ['Thời kì Bắc thuộc', 81, 'Ngô Quyền chiến thắng quân Nam Hán trên sông nào?', 'Sông Bạch Đằng', ['Sông Hồng', 'Sông Đà', 'Sông Mã'], 'Nhận biết chiến thắng Bạch Đằng'],
        ['Buổi đầu độc lập', 90, 'Lý Công Uẩn dời đô về đâu?', 'Thăng Long', ['Hoa Lư', 'Huế', 'Phú Xuân'], 'Nhận biết sự kiện dời đô'],
        ['Buổi đầu độc lập', 94, 'Tên gọi Thăng Long có nghĩa là gì?', 'Rồng bay lên', ['Sông đỏ', 'Núi cao', 'Biển lớn'], 'Hiểu tên gọi Thăng Long'],
        ['Nhà Trần', 104, 'Trần Hưng Đạo gắn với cuộc kháng chiến chống quân nào?', 'Quân Mông - Nguyên', ['Quân Nam Hán', 'Quân Thanh', 'Quân Pháp'], 'Nhận biết nhân vật lịch sử'],
        ['Khởi nghĩa Lam Sơn', 112, 'Ai là lãnh tụ cuộc khởi nghĩa Lam Sơn?', 'Lê Lợi', ['Quang Trung', 'Hùng Vương', 'Ngô Quyền'], 'Nhận biết khởi nghĩa Lam Sơn'],
        ['Văn hóa và di sản', 121, 'Khi tham quan di tích lịch sử, em cần làm gì?', 'Giữ gìn, tôn trọng và không vẽ bậy', ['Leo trèo phá hoại', 'Vứt rác', 'Lấy hiện vật về nhà'], 'Bảo vệ di sản']
    ];
    buildFactBank('history_geo.json', BOOKS.historyGeo, entries);
}

function buildMusic() {
    const entries = [
        ['Khuông nhạc và khóa Son', 8, 'Khóa Son được đặt ở đâu?', 'Đầu khuông nhạc', ['Cuối khuông nhạc', 'Giữa trang giấy', 'Dưới lời bài hát'], 'Nhận biết khóa Son'],
        ['Khuông nhạc và khóa Son', 8, 'Khuông nhạc thường có bao nhiêu dòng kẻ?', '5 dòng kẻ', ['3 dòng kẻ', '4 dòng kẻ', '6 dòng kẻ'], 'Nhận biết khuông nhạc'],
        ['Khuông nhạc và khóa Son', 9, 'Tên nào là một nốt nhạc?', 'Đô', ['Bút', 'Sách', 'Bàn'], 'Nhận biết nốt nhạc'],
        ['Khuông nhạc và khóa Son', 9, 'Dãy bảy nốt nhạc cơ bản gồm Đô, Rê, Mi, Pha, Son, La và nốt nào?', 'Si', ['Do', 'Fa', 'Re'], 'Nhận biết tên nốt'],
        ['Hát: Chuông gió teng keng', 11, 'Khi hát kết hợp vỗ tay theo phách, em cần làm gì?', 'Giữ đều phách', ['Vỗ tùy ý', 'Không nghe nhạc', 'Nói chuyện riêng'], 'Thực hành nhịp phách'],
        ['Hát: Chuông gió teng keng', 11, 'Khi hát cùng nhạc đệm, em cần chú ý gì?', 'Hát đúng giai điệu và nhịp', ['Hát thật nhanh bất kì', 'Bỏ qua nhịp', 'Làm ồn'], 'Thực hành hát'],
        ['Thường thức âm nhạc', 28, 'Âm thanh cao thấp khác nhau được thể hiện bằng gì trên khuông nhạc?', 'Vị trí các nốt nhạc', ['Màu giấy', 'Số trang', 'Tên người hát'], 'Nhận biết cao độ'],
        ['Thường thức âm nhạc', 34, 'Khi nghe bạn biểu diễn, em nên làm gì?', 'Lắng nghe và cổ vũ lịch sự', ['Chế giễu bạn', 'Nói chuyện to', 'Bỏ về'], 'Ứng xử trong âm nhạc'],
        ['Thực hành âm nhạc', 46, 'Trước khi hát, em nên làm gì?', 'Lắng nghe giai điệu và lấy hơi', ['Hét thật to', 'Bỏ qua hướng dẫn', 'Trêu bạn'], 'Chuẩn bị biểu diễn'],
        ['Thực hành âm nhạc', 58, 'Khi sử dụng nhạc cụ, em cần làm gì?', 'Dùng đúng cách và giữ gìn nhạc cụ', ['Ném nhạc cụ', 'Gõ quá mạnh tùy ý', 'Tự ý tháo nhạc cụ'], 'Giữ gìn nhạc cụ']
    ];
    buildFactBank('music.json', BOOKS.music, entries);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
write('math.json', buildMath());
buildVietnamese();
buildScience();
buildHistoryGeo();
buildMusic();
