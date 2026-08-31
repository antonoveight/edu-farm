const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'grade3');
const BOOKS = {
    math1: ['SGK Toán 3, Tập một – Kết nối tri thức với cuộc sống', 'toan3tap1ketnoitrithucvoicuocsongecdc3_5120269.pdf'],
    math2: ['SGK Toán 3, Tập hai – Kết nối tri thức với cuộc sống', 'toan3tap2-ketnoitrithucvoicuocsong2c196_5120269.pdf'],
    viet1: ['SGK Tiếng Việt 3, Tập một – Kết nối tri thức với cuộc sống', 'tiengviet3tap1-ketnoitrithucvoicuocsongba2bc_5120269.pdf'],
    viet2: ['SGK Tiếng Việt 3, Tập hai – Kết nối tri thức với cuộc sống', 'tiengviet3tap2-ketnoitrithucvoicuocsong4350e_5120269.pdf'],
    english1: ['SGK Tiếng Anh 3, Tập một – Kết nối tri thức với cuộc sống', 'tienganh3tap1-ketnoitrithucvoicuocsongc46d7_5120269.pdf'],
    english2: ['SGK Tiếng Anh 3, Tập hai – Kết nối tri thức với cuộc sống', 'tienganh3tap2-ketnoitrithucvoicuocsongdb3f5_5120269.pdf'],
    science: ['SGK Tự nhiên và Xã hội 3 – Kết nối tri thức với cuộc sống', 'tunhienvaxahoi3-ketnoitrithucvoicuocsongb4ba3_5120269.pdf'],
    tech: ['SGK Tin học 3 – Kết nối tri thức với cuộc sống', 'tinhoc3-ketnoitrithucvoicuocsongf436c_5120269.pdf'],
    experience: ['SGK Hoạt động trải nghiệm 3 – Kết nối tri thức với cuộc sống', 'hoatdongtrainghiem3-ketnoitrithucvoicuocsong59c05_5120269.pdf'],
    art: ['SGK Mĩ thuật 3 – Kết nối tri thức với cuộc sống', 'mithuat3-ketnoitrithucvoicuocsong6d553_5120269.pdf'],
    physical: ['SGK Giáo dục thể chất 3 – Kết nối tri thức với cuộc sống', 'giaoducthechat3ketnoitrithucvoicuocsonga224b_5120269.pdf']
};

function rotate(values, amount) {
    return [...values.slice(amount % values.length), ...values.slice(0, amount % values.length)];
}

function numericChoices(value) {
    const n = Number(value);
    return [...new Set([n, n + 1, n - 1, n + 10, n - 10, n + 2].filter((item) => item >= 0))].slice(0, 4).map(String);
}

function bank(subject) {
    const questions = [];
    function add({ q, a, c, book, page, lesson, lo, difficulty = 'easy', explanation, hints = [] }) {
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

function write(name, questions) {
    const seen = new Set();
    for (const item of questions) {
        const key = item.q.toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
        if (seen.has(key)) throw new Error(`Trùng câu hỏi trong ${name}: ${item.q}`);
        seen.add(key);
    }
    fs.writeFileSync(path.join(DATA_DIR, name), `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`${name}: ${questions.length} câu`);
}

function buildMath() {
    const { questions, add } = bank('math');
    const addNumber = (q, a, lo, book, page, lesson, difficulty = 'easy') => add({
        q, a, c: numericChoices(a), lo, book, page, lesson, difficulty,
        explanation: `Tính lần lượt các hàng, kết quả là ${a}.`, hints: ['Ước lượng kết quả rồi thực hiện tính theo cột.']
    });

    for (let table = 2; table <= 9; table += 1) {
        for (let factor = 2; factor <= 10; factor += 1) {
            const product = table * factor;
            addNumber(`${table} × ${factor} = ?`, product, `Thuộc bảng nhân ${table}`, BOOKS.math1, 44 + table, `Bảng nhân ${table}`);
            addNumber(`${product} : ${table} = ?`, factor, `Thuộc bảng chia ${table}`, BOOKS.math1, 73, `Bảng chia ${table}`);
        }
    }
    for (let index = 0; index < 60; index += 1) {
        const left = 125 + index * 11;
        const right = 243 + (index * 13 % 420);
        addNumber(`${left} + ${right} = ?`, left + right, 'Cộng các số trong phạm vi 1000', BOOKS.math1, 52, 'Cộng, trừ trong phạm vi 1000', 'medium');
        addNumber(`${left + right} − ${left} = ?`, right, 'Trừ các số trong phạm vi 1000', BOOKS.math1, 61, 'Cộng, trừ trong phạm vi 1000', 'medium');
    }
    for (let multiplier = 11; multiplier <= 30; multiplier += 1) {
        for (const multiplicand of [2, 3, 4, 5]) {
            addNumber(`${multiplier} × ${multiplicand} = ?`, multiplier * multiplicand, 'Nhân số có hai chữ số với số có một chữ số', BOOKS.math1, 70, 'Phép nhân và phép chia', 'medium');
        }
    }
    for (let divisor = 2; divisor <= 9; divisor += 1) {
        for (let quotient = 11; quotient <= 15; quotient += 1) {
            const dividend = divisor * quotient;
            addNumber(`${dividend} : ${divisor} = ?`, quotient, 'Chia số có hai chữ số cho số có một chữ số', BOOKS.math1, 77, 'Phép nhân và phép chia', 'medium');
        }
    }
    for (let n = 1200; n <= 9900; n += 300) {
        const thousands = Math.floor(n / 1000);
        const hundreds = Math.floor(n % 1000 / 100);
        const tens = Math.floor(n % 100 / 10);
        const units = n % 10;
        add({
            q: `Số ${n} gồm mấy nghìn, trăm, chục và đơn vị?`, a: `${thousands} nghìn, ${hundreds} trăm, ${tens} chục và ${units} đơn vị`,
            c: [`${thousands} nghìn, ${tens} trăm, ${hundreds} chục và ${units} đơn vị`, `${thousands - 1} nghìn, ${hundreds + 10} trăm, ${tens} chục và ${units} đơn vị`, `${thousands} nghìn, ${hundreds} trăm, ${units} chục và ${tens} đơn vị`],
            lo: 'Nhận biết cấu tạo số trong phạm vi 10 000', book: BOOKS.math2, page: 29, lesson: 'Các số trong phạm vi 10 000',
            explanation: `${n} được đọc theo thứ tự hàng nghìn, trăm, chục, đơn vị.`, hints: ['Đọc các chữ số từ trái sang phải.']
        });
    }
    for (let n = 12000; n <= 96000; n += 4000) {
        const tenThousands = Math.floor(n / 10000);
        add({ q: `Trong số ${n}, chữ số hàng chục nghìn là số nào?`, a: String(tenThousands), c: numericChoices(tenThousands), lo: 'Nhận biết hàng chục nghìn', book: BOOKS.math2, page: 59, lesson: 'Các số trong phạm vi 100 000', explanation: `Chữ số đứng ở hàng chục nghìn của ${n} là ${tenThousands}.`, hints: ['Đếm hàng từ phải sang trái.'] });
    }
    const applications = [
        ['Một cửa hàng có 125 quyển vở, đã bán 48 quyển. Cửa hàng còn bao nhiêu quyển vở?', 77, 'Giải bài toán một bước'],
        ['Có 6 hộp bút, mỗi hộp 8 chiếc. Có tất cả bao nhiêu chiếc bút?', 48, 'Giải bài toán liên quan đến phép nhân'],
        ['72 học sinh xếp đều thành 8 hàng. Mỗi hàng có bao nhiêu học sinh?', 9, 'Giải bài toán liên quan đến phép chia'],
        ['Một xe chở 235 kg gạo buổi sáng và 164 kg buổi chiều. Xe chở tất cả bao nhiêu ki-lô-gam gạo?', 399, 'Giải bài toán có lời văn'],
        ['Một mảnh dây dài 84 cm, cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu xăng-ti-mét?', 21, 'Giải bài toán chia đều'],
        ['Một ngày có 24 giờ. 3 ngày có bao nhiêu giờ?', 72, 'Vận dụng đơn vị thời gian'],
        ['1 m bằng bao nhiêu cm?', 100, 'Đổi đơn vị đo độ dài'],
        ['1 kg bằng bao nhiêu g?', 1000, 'Đổi đơn vị đo khối lượng'],
        ['Hình có 4 góc vuông và hai cặp cạnh đối diện bằng nhau là hình gì?', 'Hình chữ nhật', 'Nhận biết hình chữ nhật', ['Hình vuông', 'Hình tam giác', 'Hình tròn']],
        ['Phân số nào chỉ một phần hai?', '1/2', 'Nhận biết phân số đơn giản', ['1/3', '2/1', '2/3']],
        ['Biểu đồ tranh giúp chúng ta làm gì?', 'Thu thập và so sánh số liệu', 'Đọc biểu đồ đơn giản', ['Viết thư', 'Vẽ bản đồ', 'Đọc nhạc']]
    ];
    for (const item of applications) {
        const [q, a, lo, choices] = item;
        if (choices) add({ q, a, c: choices, lo, book: BOOKS.math2, page: 128, lesson: 'Ôn tập và vận dụng', explanation: `Theo kiến thức toán lớp 3, đáp án là ${a}.`, hints: ['Xác định nội dung kiến thức được hỏi.'] });
        else addNumber(q, a, lo, BOOKS.math2, 68, 'Ôn tập và vận dụng', 'medium');
    }
    return questions;
}

function addFactBank(subject, file, source, facts) {
    const { questions, add } = bank(subject);
    for (const [lesson, page, q, a, c, lo, questionBook] of facts) add({ q, a, c, lo, book: questionBook || source, page, lesson, difficulty: 'medium', explanation: `Theo bài “${lesson}”, đáp án phù hợp là “${a}”.`, hints: ['Đọc kỹ tình huống và chọn kiến thức đã học.'] });
    write(file, questions);
}

function buildVietnamese() {
    const facts = [
        ['Chính tả và từ ngữ', 20, 'Từ nào viết đúng chính tả?', 'chăm chỉ', ['trăm chỉ', 'chăm trỉ', 'trăm trỉ'], 'Viết đúng âm đầu ch/tr'],
        ['Chính tả và từ ngữ', 24, 'Từ nào viết đúng chính tả?', 'sân trường', ['xân trường', 'sân chường', 'sân trườn'], 'Viết đúng âm đầu s/x'],
        ['Chính tả và từ ngữ', 32, 'Từ nào viết đúng chính tả?', 'dòng sông', ['ròng sông', 'giòng sông', 'dòng xông'], 'Phân biệt r/d/gi'],
        ['Chính tả và từ ngữ', 46, 'Từ nào viết đúng chính tả?', 'bầu trời', ['bầu chời', 'bầu chời', 'bầu lời'], 'Viết đúng âm đầu tr/ch'],
        ['Chính tả và từ ngữ', 58, 'Từ nào viết đúng chính tả?', 'nghệ sĩ', ['ngệ sĩ', 'nghệ xĩ', 'ngệ xĩ'], 'Phân biệt ng/ngh'],
        ['Luyện từ và câu', 33, 'Từ nào là từ chỉ hoạt động?', 'đọc sách', ['quyển sách', 'chăm ngoan', 'sân trường'], 'Nhận biết từ chỉ hoạt động'],
        ['Luyện từ và câu', 33, 'Từ nào là từ chỉ đặc điểm?', 'rực rỡ', ['bông hoa', 'học bài', 'cái bàn'], 'Nhận biết từ chỉ đặc điểm'],
        ['Luyện từ và câu', 41, 'Từ nào là từ chỉ sự vật?', 'cây bàng', ['xanh mướt', 'chạy nhảy', 'rất nhanh'], 'Nhận biết từ chỉ sự vật'],
        ['Luyện từ và câu', 55, 'Câu nào là câu kể?', 'Bầu trời hôm nay trong xanh.', ['Bạn có khỏe không?', 'Hãy giữ vệ sinh!', 'Ôi, đẹp quá!'], 'Nhận biết câu kể'],
        ['Luyện từ và câu', 69, 'Cuối câu hỏi dùng dấu gì?', 'Dấu chấm hỏi', ['Dấu chấm', 'Dấu phẩy', 'Dấu chấm than'], 'Dùng dấu câu đúng'],
        ['Luyện từ và câu', 81, 'Dấu phẩy trong câu “Lan, Mai và Hoa cùng trực nhật.” dùng để làm gì?', 'Ngăn cách các từ cùng loại', ['Kết thúc câu', 'Nêu cảm xúc', 'Nối hai tiếng'], 'Dùng dấu phẩy đúng'],
        ['Luyện từ và câu', 102, 'Từ nào trái nghĩa với “dũng cảm”?', 'nhút nhát', ['chăm chỉ', 'vui vẻ', 'tươi sáng'], 'Nhận biết từ trái nghĩa'],
        ['Luyện từ và câu', 114, 'Từ nào gần nghĩa với “chăm chỉ”?', 'siêng năng', ['lười biếng', 'ồn ào', 'bé nhỏ'], 'Nhận biết từ đồng nghĩa'],
        ['Viết', 128, 'Tên riêng nào được viết hoa đúng?', 'Nguyễn Trãi', ['nguyễn trãi', 'Nguyễn trãi', 'NGUYỄN trãi'], 'Viết tên riêng đúng quy tắc'],
        ['Đọc hiểu', 11, 'Khi đọc một câu chuyện, em cần chú ý điều gì?', 'Nhân vật, sự việc và ý nghĩa', ['Chỉ số trang', 'Chỉ tranh bìa', 'Chỉ chữ đầu'], 'Đọc hiểu văn bản'],
        ['Đọc hiểu', 35, 'Bài đọc về trường lớp nhắc em cần làm gì?', 'Yêu quý và giữ gìn trường lớp', ['Làm hỏng bàn ghế', 'Vứt rác', 'Nói chuyện trong giờ'], 'Rút ra bài học từ văn bản'],
        ['Đọc hiểu', 67, 'Khi kể lại một sự việc, em nên kể theo thứ tự nào?', 'Theo trình tự hợp lí', ['Kể ngẫu nhiên', 'Không cần mở đầu', 'Chỉ kể kết thúc'], 'Kể chuyện theo trình tự'],
        ['Đọc hiểu', 99, 'Khi viết thư, em cần có điều gì?', 'Lời chào, nội dung và lời kết', ['Chỉ chữ kí', 'Chỉ ngày tháng', 'Không cần người nhận'], 'Nhận biết cấu tạo thư'],
        ['Đọc hiểu', 12, 'Câu nào thể hiện lời đề nghị lịch sự?', 'Bạn giúp mình xếp sách nhé.', ['Đưa sách đây!', 'Đi chỗ khác!', 'Bạn thật dở!'], 'Giao tiếp lịch sự'],
        ['Đọc hiểu', 30, 'Khi bạn gặp khó khăn, em nên làm gì?', 'Hỏi thăm và giúp đỡ phù hợp', ['Chế giễu bạn', 'Bỏ mặc bạn', 'Nói xấu bạn'], 'Ứng xử với bạn bè'],
        ['Đọc hiểu', 54, 'Việc nào thể hiện tình yêu quê hương?', 'Giữ gìn cảnh đẹp nơi em sống', ['Vứt rác xuống đường', 'Bẻ cành cây', 'Vẽ bẩn lên tường'], 'Bày tỏ tình yêu quê hương'],
        ['Đọc hiểu', 76, 'Khi tham quan thiên nhiên, em cần làm gì?', 'Giữ an toàn và bảo vệ môi trường', ['Tự ý đến chỗ nguy hiểm', 'Phá tổ chim', 'Vứt rác'], 'Ứng xử với thiên nhiên']
    ];
    const words = [
        ['Từ nào có tiếng chứa vần “ươn”?', 'vươn vai', ['cây bàng', 'đi học', 'bông hoa']], ['Từ nào có tiếng chứa vần “iêng”?', 'tiếng chim', ['mùa hè', 'quả cam', 'sân trường']],
        ['Từ nào có tiếng chứa vần “uynh”?', 'phụ huynh', ['học sinh', 'cô giáo', 'bạn bè']], ['Từ nào có tiếng chứa vần “uyên”?', 'khuyên bảo', ['yêu thương', 'bầu trời', 'cây xanh']],
        ['Điền dấu câu phù hợp: “Bạn tên là gì___”', '?', ['.', '!', ',']], ['Điền dấu câu phù hợp: “Em rất yêu quê hương___”', '!', ['.', '?', ',']],
        ['Điền dấu câu phù hợp: “Sáng nay, em đến trường___”', '.', ['?', '!', ',']], ['Từ nào phù hợp: “Chúng em ___ thầy cô.”', 'kính trọng', ['chạy nhảy', 'cái bàn', 'bầu trời']],
        ['Từ nào phù hợp: “Bạn Nam đang ___ bài.”', 'làm', ['xanh', 'quyển', 'sân']], ['Câu nào là câu khiến?', 'Hãy xếp hàng ngay ngắn!', ['Các bạn xếp hàng.', 'Bạn có xếp hàng không?', 'Ôi, hàng dài quá!']]
    ];
    words.forEach(([q, a, c], index) => facts.push(['Thực hành tiếng Việt', 40 + index * 6, q, a, c, 'Vận dụng kiến thức tiếng Việt']));
    addFactBank('viet', 'viet.json', BOOKS.viet1, facts.map((fact, index) => {
        const [lesson, page, q, a, c, lo] = fact;
        const uniqueQuestion = q === 'Từ nào viết đúng chính tả?' ? `${q} (${a})` : q;
        return index >= 18 ? [lesson, page, uniqueQuestion, a, c, lo, BOOKS.viet2] : [lesson, page, uniqueQuestion, a, c, lo];
    }));
}

function buildEnglish() {
    const topics = [
        ['Hello', 'Hello', 'Xin chào', 15], ['My name', 'My name is Nam.', 'Tôi tên là Nam.', 21], ['Our friends', 'friend', 'bạn', 27], ['My body', 'hand', 'bàn tay', 33], ['My hobbies', 'music', 'âm nhạc', 39],
        ['Our school', 'school', 'trường học', 49], ['Classroom objects', 'book', 'quyển sách', 55], ['Toys', 'kite', 'cái diều', 61], ['Colours', 'blue', 'màu xanh dương', 67], ['Animals', 'dog', 'con chó', 73],
        ['Family', 'mother', 'mẹ', 10], ['Food', 'rice', 'cơm', 17], ['Weather', 'sunny', 'nắng', 23], ['Rooms', 'bedroom', 'phòng ngủ', 29], ['Clothes', 'shirt', 'áo sơ mi', 35],
        ['Daily activities', 'read', 'đọc', 41], ['Numbers', 'twenty', 'hai mươi', 47], ['Places', 'park', 'công viên', 53], ['Transport', 'bus', 'xe buýt', 59], ['Review', 'thank you', 'cảm ơn', 65]
    ];
    const { questions, add } = bank('english');
    for (let i = 0; i < topics.length; i += 1) {
        const [lesson, word, meaning, page] = topics[i];
        const source = i < 10 ? BOOKS.english1 : BOOKS.english2;
        const distractors = topics.filter((_, j) => j !== i).slice(i % 8, i % 8 + 3).map((item) => item[1]);
        add({ q: `Từ tiếng Anh nào có nghĩa là “${meaning}”?`, a: word, c: distractors, lo: `Nhận biết từ vựng chủ đề ${lesson}`, book: source, page, lesson: `Unit: ${lesson}`, explanation: `“${word}” có nghĩa là “${meaning}”.`, hints: ['Nhớ lại từ vựng của chủ đề.'] });
        add({ q: `Gặp một người bạn, em có thể nói gì để chào? (${lesson})`, a: 'Hello', c: ['Goodbye', 'Thank you', 'Sorry'], lo: 'Sử dụng mẫu câu giao tiếp đơn giản', book: source, page, lesson: `Unit: ${lesson}`, explanation: '“Hello” là lời chào thông dụng.', hints: ['Đây là câu dùng khi gặp nhau.'] });
        add({ q: `Chọn từ tiếng Anh bắt đầu bằng chữ cái nào: ${word}?`, a: word[0].toUpperCase(), c: ['A', 'B', 'C'].filter((item) => item !== word[0].toUpperCase()), lo: `Nhận biết chữ cái đầu của từ ${word}`, book: source, page, lesson: `Unit: ${lesson}`, explanation: `Từ “${word}” bắt đầu bằng chữ ${word[0].toUpperCase()}.`, hints: ['Nhìn chữ cái đầu tiên của từ.'] });
    }
    write('english.json', questions);
}

function buildScience() {
    const themes = [
        ['Gia đình và nhà trường', 10, [['Việc nào giúp giữ gìn nhà ở sạch đẹp?', 'Sắp xếp đồ dùng gọn gàng', ['Vứt đồ bừa bãi', 'Vẽ lên tường', 'Để rác trên sàn']], ['Khi sử dụng thiết bị điện, em cần làm gì?', 'Làm theo hướng dẫn của người lớn', ['Dùng tay ướt chạm ổ điện', 'Tự sửa dây điện', 'Đùa nghịch gần ổ điện']], ['Nơi nào trong trường dùng để mượn sách?', 'Thư viện', ['Nhà kho', 'Bãi xe', 'Phòng bảo vệ']], ['Khi bạn phát biểu, em cần làm gì?', 'Lắng nghe', ['Nói chen', 'Chạy ra ngoài', 'Gây ồn']]]],
        ['Cộng đồng địa phương', 27, [['Người nông dân thường làm công việc gì?', 'Trồng trọt và chăn nuôi', ['Dạy học', 'Khám bệnh', 'Lái tàu']], ['Khi gặp người lao động, em nên làm gì?', 'Lễ phép và tôn trọng', ['Chê bai', 'Gây phiền', 'Nói trống không']], ['Công trình công cộng cần được làm gì?', 'Giữ gìn và sử dụng đúng quy định', ['Làm hỏng', 'Vẽ bẩn', 'Vứt rác']], ['Khi qua đường, em nên làm gì?', 'Quan sát và tuân thủ luật giao thông', ['Chạy băng qua đường', 'Đi khi đèn đỏ', 'Chơi dưới lòng đường']]]],
        ['Thực vật và động vật', 68, [['Rễ cây có vai trò gì?', 'Hút nước và chất dinh dưỡng', ['Phát ra âm thanh', 'Di chuyển cây', 'Thay lá']], ['Bộ phận nào giúp cây tạo thức ăn?', 'Lá', ['Rễ', 'Thân', 'Hoa']], ['Động vật được phân loại theo cơ quan di chuyển dựa vào điều gì?', 'Cách chúng di chuyển', ['Màu sắc quyển vở', 'Tên người nuôi', 'Giá tiền']], ['Để bảo vệ động vật, em nên làm gì?', 'Không săn bắt và không phá nơi ở của chúng', ['Ném đá', 'Phá tổ', 'Bắt con non']]]],
        ['Cơ thể và sức khỏe', 84, [['Cơ quan nào giúp đưa máu đi khắp cơ thể?', 'Tim', ['Phổi', 'Dạ dày', 'Tai']], ['Để bảo vệ mắt, em nên làm gì?', 'Đọc nơi đủ ánh sáng', ['Nhìn màn hình quá lâu', 'Đọc khi nằm', 'Dụi mắt bằng tay bẩn']], ['Thức ăn cần được bảo quản thế nào?', 'Sạch sẽ và phù hợp', ['Để ôi thiu', 'Để lẫn rác', 'Ăn khi chưa chín']], ['Khi bị mệt hoặc đau, em nên làm gì?', 'Báo người lớn', ['Tự uống thuốc lạ', 'Giấu đi', 'Chạy nhảy quá sức']]]],
        ['Trái Đất và bầu trời', 103, [['La bàn dùng để làm gì?', 'Xác định phương hướng', ['Đo khối lượng', 'Đo thời gian', 'Đo nhiệt độ']], ['Phần Trái Đất được Mặt Trời chiếu sáng là gì?', 'Ban ngày', ['Ban đêm', 'Mùa đông', 'Mưa']], ['Quả địa cầu là mô hình của gì?', 'Trái Đất', ['Mặt Trăng', 'Mặt Trời', 'Ngôi trường']], ['Khi quan sát bầu trời, em nên làm gì?', 'Không nhìn trực tiếp vào Mặt Trời', ['Nhìn thẳng vào Mặt Trời lâu', 'Tự leo lên cao', 'Dùng vật nhọn chỉ lên trời']]]]
    ];
    const facts = themes.flatMap(([lesson, page, rows]) => rows.map(([q, a, c]) => [lesson, page, q, a, c, 'Vận dụng kiến thức Tự nhiên và Xã hội']));
    addFactBank('science', 'science.json', BOOKS.science, facts);
}

function buildTech() {
    const themes = [
        ['Sử dụng máy tính', 10, [['Thiết bị nào dùng để nhập chữ vào máy tính?', 'Bàn phím', ['Màn hình', 'Loa', 'Máy in']], ['Con chuột máy tính dùng để làm gì?', 'Điều khiển con trỏ và chọn đối tượng', ['In giấy', 'Phát nhạc', 'Sạc pin']], ['Khi ngồi máy tính, em cần làm gì?', 'Ngồi đúng tư thế', ['Cúi sát màn hình', 'Ngồi quá lâu không nghỉ', 'Để tay ướt dùng máy']], ['Khi dùng xong máy tính, em nên làm gì?', 'Tắt theo hướng dẫn', ['Rút điện tùy ý', 'Đập bàn phím', 'Để máy chạy mãi']]]],
        ['Tổ chức, lưu trữ và tìm kiếm', 35, [['Tệp là gì?', 'Đơn vị lưu trữ thông tin trong máy tính', ['Một loại chuột', 'Một loại màn hình', 'Một bàn học']], ['Thư mục dùng để làm gì?', 'Sắp xếp các tệp có liên quan', ['Chụp ảnh', 'Tăng âm lượng', 'In giấy']], ['Tên tệp nên như thế nào?', 'Dễ hiểu và phù hợp nội dung', ['Ngẫu nhiên khó nhớ', 'Quá dài vô nghĩa', 'Giống mọi tệp khác']], ['Khi tìm thông tin, em cần làm gì?', 'Dùng từ khóa phù hợp', ['Bấm ngẫu nhiên', 'Tin mọi thông tin', 'Chia sẻ ngay']]]],
        ['Đạo đức, pháp luật và văn hóa số', 47, [['Thông tin cá nhân cần được làm gì?', 'Giữ kín và chỉ chia sẻ khi người lớn đồng ý', ['Đăng công khai mọi nơi', 'Cho người lạ', 'Đổi lấy quà']], ['Khi gặp nội dung đáng sợ trên mạng, em nên làm gì?', 'Báo người lớn', ['Xem tiếp một mình', 'Chia sẻ cho bạn', 'Tự gặp người lạ']], ['Mật khẩu tốt cần thế nào?', 'Không cho người khác biết', ['Dán ngoài màn hình', 'Nói cho người lạ', 'Dùng chung với mọi người']], ['Khi nhận tin nhắn lạ, em nên làm gì?', 'Hỏi người lớn trước khi trả lời', ['Bấm mọi đường link', 'Gửi ảnh cá nhân', 'Tin ngay']]]],
        ['Phần mềm và trình chiếu', 51, [['Phần mềm trình chiếu dùng để làm gì?', 'Tạo các trang trình bày thông tin', ['Nấu ăn', 'Tưới cây', 'Đo nhiệt độ']], ['Một bài trình chiếu gồm những gì?', 'Các trang chiếu', ['Chỉ một bàn phím', 'Các con chuột', 'Các dây điện']], ['Khi làm trang chiếu, em nên làm gì?', 'Chọn chữ và hình rõ ràng', ['Dùng quá nhiều chữ nhỏ', 'Chọn màu khó đọc', 'Không cần tiêu đề']], ['Khi trình bày trước lớp, em nên làm gì?', 'Nói rõ ràng và tự tin', ['Quay lưng liên tục', 'Nói quá nhỏ', 'Trêu bạn']]]],
        ['Giải quyết vấn đề với máy tính', 69, [['Câu “Nếu trời mưa thì em mang áo mưa.” thể hiện điều gì?', 'Một điều kiện và việc cần làm', ['Một bài hát', 'Một phép tính', 'Một bức tranh']], ['Khi giải quyết vấn đề, bước đầu tiên là gì?', 'Xác định vấn đề', ['Bỏ qua vấn đề', 'Đổ lỗi cho bạn', 'Làm ngẫu nhiên']], ['Phân loại rác giúp ích gì?', 'Tái chế và bảo vệ môi trường', ['Tạo thêm rác', 'Không có tác dụng', 'Làm bẩn nơi ở']], ['Làm việc nhóm để giải quyết vấn đề cần gì?', 'Phân công và hợp tác', ['Tranh giành', 'Không lắng nghe', 'Bỏ việc']]]]
    ];
    const facts = themes.flatMap(([lesson, page, rows]) => rows.map(([q, a, c]) => [lesson, page, q, a, c, 'Sử dụng công nghệ an toàn và hiệu quả']));
    addFactBank('tech', 'tech.json', BOOKS.tech, facts);
}

function buildSkills() {
    const groups = [
        ['experience', 'experience.json', BOOKS.experience, [['Câu lạc bộ theo sở thích', 9, 'Khi tham gia câu lạc bộ, em nên làm gì?', 'Tôn trọng quy định và hợp tác', ['Gây mất trật tự', 'Bỏ mặc nhóm', 'Trêu chọc bạn']], ['Tủ sách lớp học', 30, 'Để giữ gìn tủ sách lớp học, em nên làm gì?', 'Mượn và trả sách đúng quy định', ['Làm rách sách', 'Vẽ lên sách', 'Giấu sách']], ['Phấn đấu thành đội viên', 35, 'Để trở thành đội viên tốt, em cần làm gì?', 'Chăm ngoan và có trách nhiệm', ['Không nghe lời', 'Bỏ nhiệm vụ', 'Nói dối']], ['Gia đình yêu thương', 61, 'Khi người thân mệt, em nên làm gì?', 'Hỏi thăm và giúp việc phù hợp', ['Làm ồn', 'Trêu chọc', 'Bỏ mặc']], ['Nghề truyền thống', 75, 'Khi tìm hiểu nghề truyền thống địa phương, em nên làm gì?', 'Lắng nghe và tôn trọng nghệ nhân', ['Chế giễu', 'Tự ý làm nguy hiểm', 'Phá sản phẩm']]]],
        ['art', 'art.json', BOOKS.art, [['Hoa văn trên trang phục', 9, 'Hoa văn trên trang phục giúp gì?', 'Làm trang phục thêm đẹp và có nét riêng', ['Làm mất màu', 'Không có tác dụng', 'Chỉ để tính toán']], ['Tạo hình từ vật liệu', 29, 'Vật liệu đã qua sử dụng có thể dùng để làm gì?', 'Tạo sản phẩm mĩ thuật phù hợp', ['Vứt bừa bãi', 'Làm đồ nguy hiểm', 'Phá sản phẩm']], ['Chân dung người thân', 47, 'Khi vẽ chân dung, em nên quan sát điều gì?', 'Đặc điểm khuôn mặt và biểu cảm', ['Chỉ màu giấy', 'Chỉ số trang', 'Chỉ tên bài']], ['Trưng bày sản phẩm', 59, 'Khi nhận xét bài của bạn, em nên làm gì?', 'Góp ý nhẹ nhàng và tôn trọng', ['Chê bai', 'Xé bài', 'Giật dụng cụ']], ['Thực hành mĩ thuật', 63, 'Sau giờ mĩ thuật, em cần làm gì?', 'Thu dọn dụng cụ gọn gàng', ['Vứt màu bừa bãi', 'Làm bẩn bàn', 'Mang nhầm đồ bạn']]]],
        ['physical', 'physical.json', BOOKS.physical, [['Vận động cơ bản', 9, 'Trước khi tập thể dục, em cần làm gì?', 'Khởi động cơ thể', ['Chạy ngay thật nhanh', 'Ngồi yên cả giờ', 'Ăn quá no']], ['Đội hình đội ngũ', 16, 'Khi tập đội hình, em cần làm gì?', 'Lắng nghe khẩu lệnh và giữ khoảng cách', ['Xô đẩy', 'Nói chuyện riêng', 'Tự ý rời hàng']], ['Bài thể dục', 31, 'Khi tập động tác chân, em cần chú ý gì?', 'Giữ tư thế an toàn', ['Đá gần bạn', 'Tập trên nền trơn', 'Đùa nghịch']], ['Trò chơi vận động', 52, 'Khi chơi thể thao, em cần làm gì?', 'Tuân thủ luật chơi', ['Gian lận', 'Tranh cãi', 'Xô đẩy']], ['An toàn dưới nước', 83, 'Khi thấy bạn gặp nguy hiểm dưới nước, em nên làm gì?', 'Gọi người lớn hỗ trợ ngay', ['Tự lao xuống khi chưa biết bơi', 'Đứng xem', 'Trêu bạn']]]]
    ];
    for (const [subject, file, source, rows] of groups) {
        const facts = rows.flatMap(([lesson, page, q, a, c]) => [
            [lesson, page, q, a, c, 'Thực hành kỹ năng phù hợp'],
            [lesson, page, `Trong bài “${lesson}”, hành động nào không phù hợp?`, c[0], [a, c[1], c[2]], 'Nhận biết hành vi cần tránh'],
            [lesson, page, `Để thực hiện tốt nội dung “${lesson}”, em cần có thái độ nào?`, 'Nghiêm túc và hợp tác', ['Thờ ơ', 'Trêu chọc bạn', 'Bỏ qua hướng dẫn'], 'Rèn luyện thái độ học tập'],
            [lesson, page, `Sau hoạt động “${lesson}”, em nên làm gì?`, 'Chia sẻ điều đã học được', ['Vứt dụng cụ bừa bãi', 'Không cần nhớ', 'Chê bạn'], 'Tự đánh giá sau hoạt động']
        ]);
        addFactBank(subject, file, source, facts);
    }
}

fs.mkdirSync(DATA_DIR, { recursive: true });
write('math.json', buildMath());
buildVietnamese();
buildEnglish();
buildScience();
buildTech();
buildSkills();
