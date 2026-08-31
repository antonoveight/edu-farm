const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATA_DIRECTORY = path.join(ROOT, 'src', 'data', 'grade2');

// These are the original filenames supplied in backup/grade2.  Keeping the
// filename and printed page on every question makes later editorial review
// possible without relying on a generated OCR fragment.
const BOOKS = {
    math1: { name: 'SGK Toán 2, Tập một – Kết nối tri thức với cuộc sống', file: 'toan-2-tap-1-ket-noi-tri-thuc-voi-cuoc-song56f30_5120269.pdf' },
    math2: { name: 'SGK Toán 2, Tập hai – Kết nối tri thức với cuộc sống', file: 'toan-2-tap-2-ket-noi-tri-thuc-voi-cuoc-song57e50_5120269.pdf' },
    viet1: { name: 'SGK Tiếng Việt 2, Tập một – Kết nối tri thức với cuộc sống', file: 'tieng-viet-2-tap-1-ket-noi-tri-thuc-voi-cuoc-song6167f_5120269.pdf' },
    viet2: { name: 'SGK Tiếng Việt 2, Tập hai – Kết nối tri thức với cuộc sống', file: 'tieng-viet-2-tap-2-ket-noi-tri-thuc-voi-cuoc-songeddfb_5120269.pdf' },
    ethics: { name: 'SGK Đạo đức 2 – Kết nối tri thức với cuộc sống', file: 'daoduc2ketnoitrithucvoicuocsong90e92_5120269.pdf' },
    experience: { name: 'SGK Hoạt động trải nghiệm 2 – Kết nối tri thức với cuộc sống', file: 'hoatdongtrainghiem2ketnoitrithucvoicuocsongf88b0_5120269.pdf' },
    music: { name: 'SGK Âm nhạc 2 – Kết nối tri thức với cuộc sống', file: 'amnhac2ketnoitrithucvoicuocsongd7bf0_5120269.pdf' },
    art: { name: 'SGK Mĩ thuật 2 – Kết nối tri thức với cuộc sống', file: 'mithuat2ketnoitrithucvoicuocsong4102f_5120269.pdf' },
    physical: { name: 'SGK Giáo dục thể chất 2 – Kết nối tri thức với cuộc sống', file: 'giaoducthechat2ketnoitrithucvoicuocsongba970_5120269.pdf' }
};

function rotate(values, amount) {
    const offset = amount % values.length;
    return [...values.slice(offset), ...values.slice(0, offset)];
}

function numericChoices(answer, spread = 3) {
    const value = Number(answer);
    const candidates = [value, value + 1, value - 1, value + spread, value - spread, value + 2, value - 2]
        .filter((item) => Number.isInteger(item) && item >= 0);
    return [...new Set(candidates)].slice(0, 4).map(String);
}

function createBank(subject) {
    const questions = [];

    function add({ q, a, c = [], type = 'multiple_choice', lo, difficulty = 'easy', book, page, lesson, explanation, hints = [], sentence }) {
        const answer = String(a).normalize('NFC').trim();
        let choices = c.map((choice) => String(choice).normalize('NFC').trim()).filter(Boolean);
        if (['multiple_choice', 'fill_blank', 'true_false'].includes(type)) {
            choices = [...new Set([answer, ...choices])];
            if (type === 'true_false') choices = ['Đúng', 'Sai'];
            if (choices.length < 2) throw new Error(`Câu hỏi thiếu phương án: ${q}`);
            choices = rotate(choices, questions.length % choices.length);
        }
        questions.push({
            q: q.normalize('NFC').trim(),
            a: answer,
            c: choices,
            type,
            ...(sentence ? { sentence } : {}),
            lo: `${lesson} – ${lo}`,
            difficulty,
            status: 'published',
            sourceType: 'book',
            sourceRef: `${book.name} (${book.file}) – ${lesson}`,
            sourcePage: page,
            explanation: explanation || `Đáp án đúng là “${answer}”.`,
            hints
        });
    }

    return { questions, add };
}

function writeBank(filename, questions) {
    const prompts = new Set();
    for (const question of questions) {
        const key = question.q.normalize('NFC').toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
        if (prompts.has(key)) throw new Error(`${filename} có câu hỏi trùng: ${question.q}`);
        prompts.add(key);
    }
    fs.writeFileSync(path.join(DATA_DIRECTORY, filename), `${JSON.stringify(questions, null, 2)}\n`, 'utf8');
    console.log(`${filename}: ${questions.length} câu`);
}

function buildMath() {
    const { questions, add } = createBank('math');
    const addNumber = (q, answer, lo, book, page, lesson, difficulty = 'easy') => add({
        q, a: answer, c: numericChoices(answer), lo, book, page, lesson, difficulty,
        explanation: `Thực hiện tính toán cẩn thận, kết quả là ${answer}.`,
        hints: ['Có thể tách số thành chục, trăm và đơn vị để tính.']
    });

    const placeLesson = 'Chủ đề Số đến 100';
    for (let n = 21; n <= 99; n += 2) {
        const tens = Math.floor(n / 10);
        const units = n % 10;
        const answer = `${tens} chục và ${units} đơn vị`;
        add({
            q: `Số ${n} gồm mấy chục và mấy đơn vị?`, a: answer,
            c: [`${units} chục và ${tens} đơn vị`, `${Math.max(0, tens - 1)} chục và ${units + 10} đơn vị`, `${tens} chục và ${Math.max(0, units - 1)} đơn vị`],
            lo: 'Nhận biết cấu tạo số có hai chữ số', book: BOOKS.math1, page: 10, lesson: placeLesson,
            explanation: `${n} gồm ${tens} chục và ${units} đơn vị.`, hints: ['Xác định chữ số hàng chục rồi đến chữ số hàng đơn vị.']
        });
    }
    for (let n = 12; n <= 92; n += 4) {
        add({
            q: `Số liền sau của ${n} là số nào?`, a: String(n + 1), c: numericChoices(n + 1),
            lo: 'Xác định số liền sau', book: BOOKS.math1, page: 12, lesson: placeLesson,
            explanation: `Thêm 1 vào ${n} được ${n + 1}.`, hints: ['Đếm thêm một số.']
        });
    }
    for (let n = 14; n <= 94; n += 4) {
        add({
            q: `Số liền trước của ${n} là số nào?`, a: String(n - 1), c: numericChoices(n - 1),
            lo: 'Xác định số liền trước', book: BOOKS.math1, page: 13, lesson: placeLesson,
            explanation: `Bớt 1 từ ${n} được ${n - 1}.`, hints: ['Đếm lùi một số.']
        });
    }

    const noCarryPairs = [[23, 14], [45, 22], [31, 46], [52, 27], [64, 15], [72, 16], [34, 25], [41, 38], [53, 26], [62, 17], [24, 35], [43, 26], [51, 28], [63, 14], [71, 18], [32, 47], [54, 25], [61, 29], [42, 36], [73, 16]];
    for (const [left, right] of noCarryPairs) {
        addNumber(`${left} + ${right} = ?`, left + right, 'Cộng không nhớ trong phạm vi 100', BOOKS.math1, 37, 'Phép cộng trong phạm vi 100');
        addNumber(`${left + right} − ${left} = ?`, right, 'Trừ không nhớ trong phạm vi 100', BOOKS.math1, 51, 'Phép trừ trong phạm vi 100');
    }
    const carryPairs = [[28, 17], [36, 29], [47, 18], [59, 24], [68, 15], [27, 46], [38, 35], [49, 26], [57, 34], [69, 22], [26, 48], [37, 27], [48, 19], [58, 25], [67, 26], [29, 53], [39, 44], [46, 37], [55, 38], [64, 29]];
    for (const [left, right] of carryPairs) {
        addNumber(`${left} + ${right} = ?`, left + right, 'Cộng có nhớ trong phạm vi 100', BOOKS.math1, 77, 'Phép cộng có nhớ trong phạm vi 100', 'medium');
        const total = left + right;
        addNumber(`${total} − ${left} = ?`, right, 'Trừ có nhớ trong phạm vi 100', BOOKS.math1, 82, 'Phép trừ có nhớ trong phạm vi 100', 'medium');
    }

    for (let table = 2; table <= 5; table += 1) {
        for (let multiplier = 2; multiplier <= 10; multiplier += 1) {
            const result = table * multiplier;
            addNumber(`${table} × ${multiplier} = ?`, result, `Thuộc bảng nhân ${table}`, BOOKS.math2, 8 + (table - 2) * 11, `Bảng nhân ${table}`, multiplier > 6 ? 'medium' : 'easy');
            addNumber(`${result} : ${table} = ?`, multiplier, `Thuộc bảng chia ${table}`, BOOKS.math2, 16 + (table - 2) * 11, `Bảng chia ${table}`, multiplier > 6 ? 'medium' : 'easy');
        }
    }

    const wordMultiplication = [
        [3, 4, 'Mỗi hộp có 3 quả bóng. 4 hộp có tất cả bao nhiêu quả bóng?'],
        [5, 4, 'Mỗi bạn có 5 nhãn vở. 4 bạn có tất cả bao nhiêu nhãn vở?'],
        [2, 8, 'Mỗi con cua có 2 cái càng. 8 con cua có bao nhiêu cái càng?'],
        [4, 6, 'Mỗi bàn có 4 quyển truyện. 6 bàn có bao nhiêu quyển truyện?'],
        [5, 7, 'Mỗi ngày Lan tưới 5 chậu cây. 7 ngày Lan tưới bao nhiêu chậu cây?'],
        [3, 9, 'Mỗi bó có 3 bông hoa. 9 bó có bao nhiêu bông hoa?']
    ];
    for (const [one, groups, q] of wordMultiplication) {
        addNumber(q, one * groups, 'Giải bài toán gấp một số lên nhiều lần', BOOKS.math2, 13, 'Phép nhân và bài toán có lời văn', 'medium');
    }

    for (let n = 102; n <= 942; n += 42) {
        const hundreds = Math.floor(n / 100);
        const tens = Math.floor((n % 100) / 10);
        const units = n % 10;
        add({
            q: `Số ${n} gồm bao nhiêu trăm, chục và đơn vị?`, a: `${hundreds} trăm, ${tens} chục và ${units} đơn vị`,
            c: [`${hundreds} trăm, ${units} chục và ${tens} đơn vị`, `${hundreds - 1} trăm, ${tens + 1} chục và ${units} đơn vị`, `${hundreds} trăm, ${tens} chục và ${Math.max(0, units - 1)} đơn vị`],
            lo: 'Nhận biết cấu tạo số có ba chữ số', book: BOOKS.math2, page: 52, lesson: 'Các số đến 1000',
            explanation: `${n} = ${hundreds * 100} + ${tens * 10} + ${units}.`, hints: ['Xác định chữ số hàng trăm, hàng chục rồi hàng đơn vị.']
        });
    }
    const triplePairs = [[124, 235], [341, 126], [216, 343], [452, 127], [308, 241], [536, 162], [274, 315], [421, 158], [607, 126], [713, 154], [236, 472], [345, 236], [418, 271], [529, 184], [632, 157]];
    for (const [left, right] of triplePairs) {
        addNumber(`${left} + ${right} = ?`, left + right, 'Cộng các số có ba chữ số', BOOKS.math2, 69, 'Cộng trong phạm vi 1000', 'medium');
        addNumber(`${left + right} − ${right} = ?`, left, 'Trừ các số có ba chữ số', BOOKS.math2, 75, 'Trừ trong phạm vi 1000', 'medium');
    }

    const appliedFacts = [
        ['1 mét bằng bao nhiêu xăng-ti-mét?', '100 cm', ['10 cm', '1000 cm', '1 cm'], 'Đổi đơn vị đo độ dài', 93, 'Độ dài'],
        ['1 ki-lô-gam bằng bao nhiêu gam?', '1000 g', ['100 g', '10000 g', '10 g'], 'Đổi đơn vị đo khối lượng', 97, 'Khối lượng'],
        ['1 lít là đơn vị thường dùng để đo gì?', 'Dung tích chất lỏng', ['Độ dài con đường', 'Khối lượng cái cặp', 'Thời gian học'], 'Nhận biết đơn vị đo dung tích', 100, 'Dung tích'],
        ['Kim phút quay một vòng thì trôi qua bao lâu?', '60 phút', ['30 phút', '24 phút', '12 phút'], 'Đọc và nhận biết thời gian', 104, 'Thời gian'],
        ['Một ngày có bao nhiêu giờ?', '24 giờ', ['12 giờ', '60 giờ', '7 giờ'], 'Nhận biết đơn vị thời gian', 104, 'Thời gian'],
        ['Hình có 3 cạnh và 3 đỉnh là hình gì?', 'Hình tam giác', ['Hình vuông', 'Hình tròn', 'Hình chữ nhật'], 'Nhận biết hình phẳng', 111, 'Hình phẳng'],
        ['Hình có 4 cạnh bằng nhau và 4 góc vuông là hình gì?', 'Hình vuông', ['Hình tam giác', 'Hình tròn', 'Hình chữ nhật'], 'Nhận biết hình vuông', 111, 'Hình phẳng'],
        ['Tờ tiền nào có giá trị lớn hơn?', '20 000 đồng', ['1 000 đồng', '2 000 đồng', '5 000 đồng'], 'So sánh giá tiền Việt Nam', 116, 'Tiền Việt Nam'],
        ['Mua một quyển vở giá 8 000 đồng và một bút chì giá 3 000 đồng. Cần trả bao nhiêu tiền?', '11 000 đồng', ['5 000 đồng', '8 000 đồng', '13 000 đồng'], 'Giải bài toán mua bán đơn giản', 116, 'Tiền Việt Nam'],
        ['Nửa giờ bằng bao nhiêu phút?', '30 phút', ['15 phút', '45 phút', '60 phút'], 'Đổi đơn vị thời gian đơn giản', 104, 'Thời gian']
    ];
    for (const [q, a, c, lo, page, lesson] of appliedFacts) add({ q, a, c, lo, book: BOOKS.math2, page, lesson, explanation: `Theo kiến thức của bài ${lesson.toLowerCase()}, đáp án là ${a}.`, hints: ['Nhớ lại đơn vị đo hoặc đặc điểm hình học đã học.'] });

    for (let n = 105; n <= 975; n += 30) {
        const other = n + (n % 2 === 0 ? -7 : 8);
        add({
            q: `Số nào lớn hơn: ${n} hay ${other}?`, a: String(Math.max(n, other)), c: [String(n), String(other), String(Math.max(n, other) + 10)],
            lo: 'So sánh các số có ba chữ số', book: BOOKS.math2, page: 58, lesson: 'Các số đến 1000',
            explanation: `So sánh từ hàng trăm, rồi hàng chục và hàng đơn vị để thấy ${Math.max(n, other)} lớn hơn.`, hints: ['So sánh chữ số hàng trăm trước.']
        });
    }
    for (let n = 14; n <= 94; n += 4) {
        const addend = n + 8;
        const sum = n + addend;
        addNumber(`${n} + □ = ${sum}. Số thích hợp điền vào ô trống là số nào?`, addend, 'Tìm số hạng chưa biết', BOOKS.math1, 67, 'Tìm thành phần chưa biết của phép cộng', 'medium');
        addNumber(`□ − ${n} = ${sum}. Số thích hợp điền vào ô trống là số nào?`, sum + n, 'Tìm số bị trừ chưa biết', BOOKS.math1, 89, 'Tìm thành phần chưa biết của phép trừ', 'medium');
    }
    for (let n = 123; n <= 963; n += 42) {
        const digit = Math.floor((n % 100) / 10);
        add({
            q: `Trong số ${n}, chữ số hàng chục là số nào?`, a: String(digit), c: numericChoices(digit),
            lo: 'Xác định giá trị theo hàng của chữ số', book: BOOKS.math2, page: 53, lesson: 'Các số đến 1000',
            explanation: `Chữ số ở hàng chục của ${n} là ${digit}.`, hints: ['Đọc số từ phải sang trái: đơn vị, chục, trăm.']
        });
    }
    for (const [q, answer] of [
        ['Lan có 35 nhãn vở, được tặng thêm 12 nhãn vở. Lan có tất cả bao nhiêu nhãn vở?', 47],
        ['Một lớp có 48 học sinh, trong đó 21 bạn là học sinh nam. Có bao nhiêu học sinh nữ?', 27],
        ['Tổ Một trồng 26 cây, Tổ Hai trồng 34 cây. Cả hai tổ trồng bao nhiêu cây?', 60],
        ['Có 72 quả cam chia đều vào 4 giỏ. Mỗi giỏ có bao nhiêu quả cam?', 18],
        ['Một tuần lễ có 7 ngày. 3 tuần lễ có bao nhiêu ngày?', 21],
        ['Mẹ mua 3 hộp sữa, mỗi hộp có 4 chai. Mẹ mua tất cả bao nhiêu chai sữa?', 12]
    ]) addNumber(q, answer, 'Giải bài toán có lời văn lớp 2', BOOKS.math2, 119, 'Ôn tập và vận dụng', 'medium');

    return questions;
}

function buildVietnamese() {
    const { questions, add } = createBank('viet');
    const languageLessons = [
        ['Chính tả: c/k/q', 'Trước e, ê, i, âm /c/ thường viết bằng chữ nào?', 'k', ['c', 'q', 'g'], 22],
        ['Chính tả: g/gh', 'Trước e, ê, i, âm /g/ thường viết bằng chữ nào?', 'gh', ['g', 'ngh', 'k'], 30],
        ['Chính tả: ng/ngh', 'Tiếng nào viết đúng?', 'nghỉ ngơi', ['ngỉ ngơi', 'nghĩ ngơi', 'ngỉ nghơi'], 42],
        ['Từ và câu', 'Từ nào là từ chỉ hoạt động?', 'chạy nhảy', ['cây bàng', 'xanh mướt', 'lớp học'], 52],
        ['Từ và câu', 'Từ nào là từ chỉ sự vật?', 'quyển sách', ['chăm chỉ', 'đọc to', 'xanh biếc'], 58],
        ['Từ và câu', 'Từ nào là từ chỉ đặc điểm?', 'dũng cảm', ['bút chì', 'học bài', 'sân trường'], 66],
        ['Câu kể', 'Câu nào là câu nêu hoạt động?', 'Bạn Lan đang đọc sách.', ['Sân trường rất rộng.', 'Ai đang trực nhật?', 'Ôi, bông hoa đẹp quá!'], 74],
        ['Dấu câu', 'Cuối câu hỏi thường dùng dấu gì?', 'Dấu chấm hỏi', ['Dấu chấm', 'Dấu chấm than', 'Dấu phẩy'], 82],
        ['Dấu câu', 'Cuối câu bộc lộ cảm xúc thường dùng dấu gì?', 'Dấu chấm than', ['Dấu chấm hỏi', 'Dấu phẩy', 'Dấu hai chấm'], 82],
        ['Từ trái nghĩa', 'Từ trái nghĩa với “cao” là từ nào?', 'thấp', ['dài', 'rộng', 'sáng'], 98],
        ['Từ đồng nghĩa', 'Từ nào gần nghĩa với “chăm chỉ”?', 'siêng năng', ['lười biếng', 'ồn ào', 'bé nhỏ'], 106],
        ['Mở rộng vốn từ', 'Khi gặp người lớn, em nên nói gì?', 'Cháu chào ạ.', ['Không cần nói gì', 'Tránh đi', 'Nói trống không'], 116],
        ['Câu nêu đặc điểm', 'Câu nào là câu nêu đặc điểm?', 'Bầu trời hôm nay trong xanh.', ['Các bạn xếp hàng vào lớp.', 'Em có thích đọc sách không?', 'Hãy giữ gìn sách vở!'], 12],
        ['Dấu phẩy', 'Dấu phẩy trong câu “Sân trường, lớp học, thư viện đều sạch đẹp.” dùng để làm gì?', 'Ngăn cách các bộ phận cùng loại', ['Kết thúc câu hỏi', 'Bộc lộ cảm xúc', 'Nối hai tiếng'], 36],
        ['Từ ngữ về thiên nhiên', 'Từ nào chỉ hiện tượng thời tiết?', 'mưa', ['quyển vở', 'bàn ghế', 'cô giáo'], 48],
        ['Viết tên riêng', 'Tên riêng địa lí nào được viết hoa đúng?', 'Hà Nội', ['hà nội', 'hà Nội', 'HÀ nội'], 64],
        ['Từ chỉ nghề nghiệp', 'Người chữa bệnh cho mọi người thường được gọi là gì?', 'bác sĩ', ['ngư dân', 'nông dân', 'kiến trúc sư'], 150],
        ['Từ ngữ về quê hương', 'Việc nào thể hiện tình yêu quê hương?', 'Giữ gìn cảnh đẹp nơi mình sống', ['Vứt rác bừa bãi', 'Bẻ cành cây', 'Vẽ bẩn lên tường'], 156]
    ];
    for (const [lesson, q, a, c, page] of languageLessons) {
        add({ q, a, c, lo: 'Vận dụng kiến thức tiếng Việt trong giao tiếp và viết', book: page < 140 ? BOOKS.viet1 : BOOKS.viet2, page, lesson, explanation: `Theo bài học ${lesson.toLowerCase()}, đáp án là “${a}”.`, hints: ['Đọc kỹ yêu cầu và nhớ lại cách dùng từ, câu hoặc dấu câu.'] });
    }

    const readings = [
        [BOOKS.viet1, 11, 'Tôi là học sinh lớp 2', 'Bạn nhỏ háo hức đến trường vì điều gì?', 'Muốn gặp lại thầy cô và bạn bè', ['Muốn nghỉ học', 'Muốn ở nhà cả ngày', 'Muốn đi mua đồ chơi']],
        [BOOKS.viet1, 14, 'Ngày hôm qua đâu rồi?', 'Bài thơ nhắc bạn nhỏ cần làm gì để ngày hôm qua có ý nghĩa?', 'Học hành chăm chỉ', ['Bỏ bài vở', 'Nói dối', 'Lười biếng']],
        [BOOKS.viet1, 22, 'Mít làm thơ', 'Khi đọc thơ, em nên chú ý điều gì?', 'Đọc rõ tiếng và thể hiện cảm xúc phù hợp', ['Đọc thật nhanh không cần hiểu', 'Nói chuyện riêng', 'Bỏ qua dấu câu']],
        [BOOKS.viet1, 34, 'Bím tóc đuôi sam', 'Khi làm bạn buồn, em nên làm gì?', 'Xin lỗi và sửa lỗi', ['Chế giễu bạn', 'Bỏ mặc bạn', 'Đổ lỗi cho bạn']],
        [BOOKS.viet1, 46, 'Mẩu giấy vụn', 'Việc làm nào giúp lớp học sạch đẹp?', 'Bỏ rác đúng nơi quy định', ['Vứt giấy xuống sàn', 'Vẽ lên bàn', 'Làm hỏng đồ dùng']],
        [BOOKS.viet1, 60, 'Cô giáo lớp em', 'Em thể hiện sự kính trọng cô giáo bằng cách nào?', 'Lễ phép và chăm học', ['Nói trống không', 'Không làm bài', 'Trêu chọc bạn']],
        [BOOKS.viet1, 72, 'Sáng kiến của bé Hà', 'Khi muốn giúp đỡ người thân, em cần làm gì?', 'Làm việc phù hợp với khả năng của mình', ['Tự ý làm việc nguy hiểm', 'Đòi phần thưởng', 'Bỏ mặc mọi người']],
        [BOOKS.viet1, 86, 'Câu chuyện bó đũa', 'Bài học từ bó đũa là gì?', 'Đoàn kết tạo nên sức mạnh', ['Ai cũng nên làm một mình', 'Không cần giúp nhau', 'Nên tranh giành']],
        [BOOKS.viet1, 104, 'Con chó nhà hàng xóm', 'Khi chăm sóc vật nuôi, em cần làm gì?', 'Yêu thương và chăm sóc đúng cách', ['Chọc phá con vật', 'Bỏ đói con vật', 'Làm con vật sợ']],
        [BOOKS.viet1, 122, 'Mẹ', 'Tình cảm của em với người thân nên được thể hiện như thế nào?', 'Bằng lời nói và việc làm yêu thương', ['Bằng lời nói thiếu lễ phép', 'Bằng việc làm người thân buồn', 'Không cần thể hiện']],
        [BOOKS.viet2, 10, 'Chuyện bốn mùa', 'Bốn nàng tiên trong câu chuyện tượng trưng cho điều gì?', 'Bốn mùa trong năm', ['Bốn ngày trong tuần', 'Bốn loại cây', 'Bốn môn học']],
        [BOOKS.viet2, 22, 'Mùa nước nổi', 'Khi quan sát thiên nhiên, em nên làm gì?', 'Giữ an toàn và tôn trọng môi trường', ['Tự ý đến nơi nguy hiểm', 'Vứt rác xuống nước', 'Phá tổ chim']],
        [BOOKS.viet2, 42, 'Sơn Tinh, Thủy Tinh', 'Câu chuyện giúp em hiểu cần làm gì khi có thiên tai?', 'Thực hiện hướng dẫn an toàn của người lớn', ['Chủ quan khi trời mưa bão', 'Tự ý đi qua vùng nguy hiểm', 'Không cần chuẩn bị']],
        [BOOKS.viet2, 58, 'Bác sĩ Sói', 'Khi bị ốm, em nên làm gì?', 'Báo cho người lớn và làm theo hướng dẫn', ['Tự uống thuốc không rõ loại', 'Giấu bệnh', 'Chạy nhảy quá sức']],
        [BOOKS.viet2, 76, 'Quả tim khỉ', 'Trong tình bạn, em cần cư xử như thế nào?', 'Chân thành và không lừa dối', ['Ích kỉ', 'Nói dối bạn', 'Trêu chọc bạn']],
        [BOOKS.viet2, 94, 'Ai ngoan sẽ được thưởng', 'Để được khen, học sinh cần làm gì?', 'Ngoan ngoãn và cố gắng học tập', ['Không nghe lời', 'Phá đồ dùng', 'Làm việc nguy hiểm']],
        [BOOKS.viet2, 112, 'Cây đa quê hương', 'Cảnh đẹp quê hương cần được làm gì?', 'Giữ gìn và bảo vệ', ['Làm hư hại', 'Vứt rác bừa bãi', 'Bẻ cành cây']],
        [BOOKS.viet2, 130, 'Những quả đào', 'Khi nhận quà từ người thân, em nên làm gì?', 'Biết ơn và trân trọng', ['Chê bai món quà', 'Đòi thêm ngay', 'Vứt đi']],
        [BOOKS.viet2, 146, 'Bảo vệ như thế là rất tốt', 'Để bảo vệ chim, em nên làm gì?', 'Không phá tổ và không săn bắt chim', ['Ném đá vào chim', 'Lấy trứng chim', 'Phá tổ chim']],
        [BOOKS.viet2, 158, 'Du lịch biển Việt Nam', 'Khi đi biển, em cần làm gì để an toàn?', 'Tuân theo hướng dẫn của người lớn', ['Tự bơi ra xa', 'Chạy vào nơi cấm', 'Xả rác xuống biển']]
    ];
    for (const [book, page, title, q, a, c] of readings) {
        add({ q, a, c, lo: `Đọc hiểu và rút ra bài học từ bài “${title}”`, difficulty: 'medium', book, page, lesson: `Đọc: ${title}`, explanation: `Chi tiết và bài học này được khai thác từ bài đọc “${title}”.`, hints: ['Nhớ lại nhân vật, sự việc và ý nghĩa chính của bài đọc.'] });
    }

    const spellingDrills = [
        ['Từ nào dưới đây viết đúng chính tả âm vần?', 'tiếng chim', ["tiến chim","tiếng trym","tiếng chym"], BOOKS.viet1, 118, 'Chính tả: vần tiếng'],
        ['Từ nào viết đúng chính tả vần “uan/uân”?', 'mùa xuân', ["mùa xuan","mùa suân","mùa chuân"], BOOKS.viet2, 18, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả vần “oa/ua”?', 'bông hoa', ["bôn hoa","bông qua","bông hoà"], BOOKS.viet2, 30, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả có dấu thanh?', 'cánh đồng', ["cánh đòng","cánh đồngg","cảnh đồng"], BOOKS.viet2, 44, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả phân biệt n/l?', 'ngọn núi', ["ngọn lúi","ngọn nũi","ngọn núy"], BOOKS.viet2, 56, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả về dấu thanh điệu?', 'thành phố', ["thành bố","thành phó","thành phỗ"], BOOKS.viet2, 72, 'Chính tả: thanh điệu'],
        ['Từ nào viết đúng chính tả vần “iêu/yêu”?', 'yêu thương', ["iêu thương","yêu thươn","yêu thưởng"], BOOKS.viet2, 88, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả phân biệt r/d/gi?', 'dũng cảm', ["rũng cảm","giũng cảm","dũng kảm"], BOOKS.viet2, 102, 'Chính tả: r/d/gi'],
        ['Từ nào viết đúng chính tả phân biệt ch/tr?', 'câu chuyện', ["câu truyện","câu chuyền","cầu chuyện"], BOOKS.viet2, 120, 'Chính tả: ch/tr'],
        ['Từ nào viết đúng chính tả có vần “ương”?', 'quê hương', ["quê hường","quề hương","quê hươn"], BOOKS.viet2, 136, 'Chính tả: vần'],
        ['Từ nào viết đúng chính tả phân biệt s/x và ch/tr?', 'sân trường', ["xân trường","sân chường","sân trườn"], BOOKS.viet2, 152, 'Chính tả: s/x, ch/tr']
    ];
    for (const [q, a, c, book, page, lesson] of spellingDrills) add({ q, a, c, lo: 'Viết đúng từ có âm, vần hoặc thanh điệu đã học', book, page, lesson, explanation: `Từ viết đúng là “${a}”.`, hints: ['Đọc chậm từng tiếng và nhớ quy tắc chính tả.'] });

    const wordDrills = [
        ['Trong các từ sau, từ nào là từ chỉ hiện tượng tự nhiên (sự vật)?', 'cơn mưa', ['vui vẻ', 'nhảy múa', 'rất nhanh']],
        ['Từ nào dưới đây là từ chỉ đồ vật/cảnh vật (sự vật)?', 'con đường', ['chăm ngoan', 'học bài', 'rất đẹp']],
        ['Từ nào dưới đây là từ chỉ người (sự vật)?', 'bác nông dân', ['siêng năng', 'đang cười', 'xanh mướt']],
        ['Từ nào dưới đây là từ chỉ hoạt động chăm sóc cây?', 'tưới cây', ['bông hoa', 'đỏ thắm', 'sân trường']],
        ['Từ nào dưới đây là từ chỉ hoạt động của học sinh?', 'xếp hàng', ['học sinh', 'ngoan ngoãn', 'cây bàng']],
        ['Từ nào dưới đây là từ chỉ hoạt động sáng tạo nghệ thuật?', 'vẽ tranh', ['bút màu', 'rực rỡ', 'cơn gió']],
        ['Từ nào dưới đây là từ chỉ đặc điểm hình dáng?', 'cao lớn', ['đọc sách', 'quyển vở', 'sân trường']],
        ['Từ nào dưới đây là từ chỉ tính nết, đặc điểm tính cách?', 'hiền lành', ['cô giáo', 'chạy nhảy', 'bông hoa']],
        ['Từ nào dưới đây là từ chỉ đặc điểm ánh sáng?', 'lấp lánh', ['ngôi sao', 'học bài', 'xe đạp']],
        ['Từ nào dưới đây là từ chỉ tình cảm yêu thương?', 'yêu quý', ['bàn học', 'đi bộ', 'màu xanh']],
        ['Từ nào dưới đây là từ chỉ lòng biết ơn?', 'biết ơn', ['trường lớp', 'viết bài', 'to lớn']],
        ['Từ nào dưới đây là từ chỉ cảm xúc vui mừng?', 'vui mừng', ['quả bóng', 'chạy nhanh', 'màu đỏ']],
        ['Từ nào trái nghĩa với “nhanh”?', 'chậm', ['cao', 'rộng', 'sáng']],
        ['Từ nào trái nghĩa với “sạch”?', 'bẩn', ['mát', 'nhỏ', 'vui']],
        ['Từ nào trái nghĩa với “yêu”?', 'ghét', ['nhớ', 'thương', 'quý']],
        ['Câu nào dưới đây là câu dùng để hỏi (câu hỏi)?', 'Bạn đã làm bài tập chưa?', ['Em đã làm bài tập.', 'Hãy làm bài tập!', 'Ôi, bài tập khó quá!']],
        ['Câu nào dưới đây là câu yêu cầu, đề nghị (câu khiến)?', 'Hãy xếp hàng ngay ngắn!', ['Các bạn đang xếp hàng.', 'Bạn có xếp hàng không?', 'Ôi, hàng dài quá!']],
        ['Câu nào dưới đây là câu bộc lộ cảm xúc (câu cảm)?', 'Ôi, bầu trời đẹp quá!', ['Bầu trời rất đẹp.', 'Bầu trời có đẹp không?', 'Hãy nhìn bầu trời.']]
    ];
    for (let index = 0; index < wordDrills.length; index += 1) {
        const [q, a, c] = wordDrills[index];
        const book = index < 9 ? BOOKS.viet1 : BOOKS.viet2;
        add({ q, a, c, lo: 'Nhận biết từ ngữ và kiểu câu đã học', book, page: 40 + (index % 9) * 10, lesson: 'Luyện từ và câu', explanation: `“${a}” là đáp án phù hợp với yêu cầu về từ hoặc câu.`, hints: ['Xác định từ chỉ người, vật, hoạt động, đặc điểm hoặc mục đích câu.'] });
    }
    const sentenceDrills = [
        ['Điền dấu câu phù hợp: “Bạn tên là gì___”', '?', ['.', '!', ','], 'Dùng dấu chấm hỏi ở cuối câu hỏi'],
        ['Điền dấu câu phù hợp: “Em rất yêu mái trường___”', '!', ['.', '?', ','], 'Dùng dấu chấm than để bộc lộ cảm xúc'],
        ['Điền dấu câu phù hợp: “Buổi sáng, em đến trường___”', '.', ['?', '!', ','], 'Dùng dấu chấm kết thúc câu kể'],
        ['Trong câu “Lan, Mai và Hoa cùng trồng cây.”, dấu phẩy dùng để làm gì?', 'Ngăn cách các từ cùng loại', ['Kết thúc câu hỏi', 'Bộc lộ cảm xúc', 'Nối hai tiếng'], 'Dùng dấu phẩy đúng cách'],
        ['Từ nào có thể dùng để xưng hô lễ phép với người lớn?', 'ạ', ['này', 'đấy', 'nhé'], 'Sử dụng từ ngữ lễ phép'],
        ['Khi viết đầu câu, chữ cái đầu tiên cần viết như thế nào?', 'Viết hoa', ['Viết thường', 'Viết thật nhỏ', 'Không cần viết'], 'Viết hoa đầu câu'],
        ['Tên người Việt Nam cần được viết như thế nào?', 'Viết hoa chữ cái đầu mỗi tiếng', ['Viết toàn chữ thường', 'Viết không dấu', 'Viết tùy ý'], 'Viết tên riêng'],
        ['Từ nào phù hợp để hoàn thành câu: “Chúng em ___ thầy cô.”', 'kính trọng', ['kính mời', 'chạy nhảy', 'cái bàn'], 'Dùng từ phù hợp trong câu'],
        ['Từ nào phù hợp để hoàn thành câu: “Buổi trưa, nắng ___.”', 'chói chang', ['đọc sách', 'con mèo', 'cái bút'], 'Dùng từ chỉ đặc điểm'],
        ['Từ nào phù hợp để hoàn thành câu: “Bạn Nam đang ___ bài.”', 'làm', ['xanh', 'quyển', 'sân'], 'Dùng từ chỉ hoạt động'],
        ['Câu nào thể hiện lời đề nghị lịch sự?', 'Bạn cho mình mượn bút nhé.', ['Đưa bút đây!', 'Không cho thì thôi!', 'Bạn thật dở!'], 'Giao tiếp lịch sự'],
        ['Câu nào thể hiện lời cảm ơn?', 'Em cảm ơn bác ạ.', ['Bác làm đi.', 'Con không cần.', 'Đi chỗ khác.'], 'Giao tiếp lễ phép'],
        ['Từ nào có tiếng chứa vần “ươn”?', 'vươn vai', ['bàn ghế', 'con mèo', 'đi học'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “iêng”?', 'tiếng chim', ['hoa sen', 'cây bàng', 'quả cam'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “uôn”?', 'buồn bã', ['vui vẻ', 'cây xanh', 'đi học'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “uy”?', 'ngày mai', ['hoa hồng', 'bông lúa', 'cái bàn'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “iêu”?', 'yêu quý', ['mùa hè', 'bầu trời', 'con đường'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “oang”?', 'rộng ràng', ['xinh xắn', 'chăm ngoan', 'vui vẻ'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “uông”?', 'ruộng lúa', ['cây cối', 'bút chì', 'sân trường'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “iêt”?', 'tiết học', ['bông hoa', 'đi chơi', 'mưa rơi'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “uyên”?', 'khuyên bảo', ['yêu thương', 'bầu trời', 'cây xanh'], 'Nhận biết vần đã học'],
        ['Từ nào có tiếng chứa vần “uynh”?', 'phụ huynh', ['học sinh', 'thầy giáo', 'bạn bè'], 'Nhận biết vần đã học'],
        ['Câu nào dùng từ chỉ hoạt động đúng?', 'Các bạn đang đá cầu.', ['Các bạn rất đá cầu.', 'Đá cầu rất các bạn.', 'Các bạn cái đá cầu.'], 'Dùng từ chỉ hoạt động'],
        ['Câu nào dùng từ chỉ đặc điểm đúng?', 'Bông hoa rất thơm.', ['Bông hoa đang thơm.', 'Bông hoa là thơm.', 'Thơm bông hoa rất.'], 'Dùng từ chỉ đặc điểm'],
        ['Câu nào dùng từ chỉ sự vật đúng?', 'Cây bàng ở sân trường.', ['Cây bàng rất chạy.', 'Cây bàng đang xanh bút.', 'Cây bàng học bài.'], 'Dùng từ chỉ sự vật']
    ];
    for (let index = 0; index < sentenceDrills.length; index += 1) {
        const [q, a, c, lo] = sentenceDrills[index];
        const book = index < 12 ? BOOKS.viet1 : BOOKS.viet2;
        add({ q, a, c, lo, book, page: 70 + (index % 10) * 7, lesson: 'Thực hành tiếng Việt', explanation: `Đáp án phù hợp là “${a}”.`, hints: ['Đọc cả câu để chọn từ, vần hoặc dấu câu đúng.'] });
    }
    return questions;
}

function buildValuesBank(subject, book, filename, lessons) {
    const { questions, add } = createBank(subject);
    for (const [lesson, page, facts] of lessons) {
        for (const [q, a, c, lo] of facts) {
            add({ q, a, c, lo, book, page, lesson, explanation: `Theo nội dung “${lesson}”, lựa chọn phù hợp là “${a}”.`, hints: ['Chọn hành vi hoặc kiến thức phù hợp với bài học.'] });
        }
    }
    writeBank(filename, questions);
    return questions;
}

function buildValues() {
    buildValuesBank('ethics', BOOKS.ethics, 'ethics.json', [
        ['Em yêu quê hương', 9, [['Việc nào thể hiện tình yêu quê hương?', 'Giữ gìn cảnh đẹp quê hương', ['Vứt rác xuống đường', 'Bẻ cành cây', 'Vẽ bẩn lên tường'], 'Thể hiện tình yêu quê hương'], ['Khi quê hương tổ chức trồng cây, em nên làm gì?', 'Tham gia phù hợp với khả năng', ['Phá cây mới trồng', 'Bỏ rác bừa bãi', 'Trêu chọc người tham gia'], 'Tham gia việc làm vì cộng đồng'], ['Khi xa quê, bạn Lan thường gọi điện hỏi thăm ông bà. Việc làm đó thể hiện điều gì?', 'Tình yêu và sự gắn bó với quê hương', ['Sự thờ ơ', 'Sự khoe khoang', 'Sự lười biếng'], 'Nhận biết biểu hiện yêu quê hương'], ['Em nên giới thiệu về quê hương bằng thái độ nào?', 'Tự hào và thân thiện', ['Chê bai', 'Thiếu lễ phép', 'Thờ ơ'], 'Giao tiếp về quê hương']]],
        ['Kính trọng thầy giáo, cô giáo', 17, [['Khi gặp thầy cô, em nên làm gì?', 'Chào hỏi lễ phép', ['Lờ đi', 'Nói trống không', 'Chạy tránh'], 'Thể hiện sự kính trọng thầy cô'], ['Khi thầy cô đang giảng bài, em cần làm gì?', 'Lắng nghe và phát biểu đúng lúc', ['Nói chuyện riêng', 'Chạy ra ngoài', 'Làm việc khác'], 'Ứng xử trong giờ học'], ['Việc nào là lời cảm ơn phù hợp với cô giáo?', 'Em cảm ơn cô ạ.', ['Cô làm đi', 'Con không cần', 'Cô sai rồi'], 'Nói lời cảm ơn'], ['Khi được thầy cô nhắc nhở, em nên làm gì?', 'Lắng nghe và sửa lỗi', ['Cãi lại', 'Bỏ đi', 'Trêu bạn'], 'Tiếp nhận lời nhắc nhở']]],
        ['Yêu quý bạn bè', 31, [['Khi bạn quên bút, em nên làm gì?', 'Cho bạn mượn nếu có thể', ['Chế giễu bạn', 'Giấu bút của bạn', 'Bỏ mặc bạn'], 'Biết giúp đỡ bạn bè'], ['Khi bạn buồn, em nên làm gì?', 'Hỏi thăm và động viên bạn', ['Trêu chọc', 'Cười lớn', 'Kể cho nhiều người'], 'Quan tâm bạn bè'], ['Muốn chơi vui cùng bạn, em cần làm gì?', 'Tôn trọng và hợp tác', ['Tranh giành', 'Gian lận', 'Nói xấu'], 'Hợp tác với bạn'], ['Khi làm bạn buồn, em cần làm gì?', 'Xin lỗi chân thành', ['Đổ lỗi', 'Bỏ đi', 'Cười bạn'], 'Biết nhận lỗi']]],
        ['Thực hiện nội quy', 63, [['Ở nơi công cộng, em nên làm gì?', 'Giữ trật tự và vệ sinh', ['La hét', 'Vứt rác', 'Chen lấn'], 'Thực hiện quy định nơi công cộng'], ['Khi xếp hàng, em cần làm gì?', 'Đứng đúng hàng và chờ đến lượt', ['Chen lên trước', 'Đẩy bạn', 'Bỏ hàng'], 'Tôn trọng quy tắc xếp hàng'], ['Biển báo nơi công cộng giúp mọi người điều gì?', 'Biết quy định để thực hiện', ['Chơi đùa tùy ý', 'Không cần quan sát', 'Đi vào nơi cấm'], 'Nhận biết ý nghĩa quy định'], ['Khi thấy bạn làm hỏng của chung, em nên làm gì?', 'Nhắc bạn giữ gìn và báo người lớn khi cần', ['Làm theo bạn', 'Cười bạn', 'Bỏ mặc'], 'Giữ gìn của công']]],
        ['Bảo vệ môi trường', 71, [['Việc nào giúp bảo vệ môi trường?', 'Bỏ rác đúng nơi quy định', ['Xả rác xuống ao', 'Đốt rác tùy ý', 'Bẻ cây non'], 'Bảo vệ môi trường'], ['Để tiết kiệm nước, em nên làm gì?', 'Khóa vòi nước khi dùng xong', ['Mở vòi thật lâu', 'Nghịch nước', 'Để nước chảy tràn'], 'Sử dụng tài nguyên tiết kiệm'], ['Khi thấy cây non, em nên làm gì?', 'Chăm sóc và không bẻ cành', ['Bẻ cành', 'Dẫm lên cây', 'Khắc chữ lên thân'], 'Chăm sóc cây xanh'], ['Tái sử dụng đồ dùng phù hợp giúp ích gì?', 'Giảm lãng phí', ['Tạo thêm rác', 'Làm bẩn môi trường', 'Không có ích'], 'Thực hành tiết kiệm']]]
    ]);

    buildValuesBank('experience', BOOKS.experience, 'experience.json', [
        ['Em và mái trường mến yêu', 8, [['Việc nào giúp em sẵn sàng đến trường?', 'Chuẩn bị sách vở từ tối hôm trước', ['Thức quá khuya', 'Quên đồ dùng', 'Đi học muộn'], 'Tự phục vụ và chuẩn bị học tập'], ['Khi tham gia hoạt động lớp, em nên làm gì?', 'Hợp tác với các bạn', ['Không lắng nghe', 'Tách khỏi nhóm', 'Tranh giành'], 'Hợp tác trong hoạt động tập thể'], ['Em nên làm gì để lớp học sạch đẹp?', 'Giữ vệ sinh chung', ['Vẽ lên bàn', 'Vứt giấy xuống sàn', 'Làm hỏng đồ dùng'], 'Giữ gìn môi trường lớp học'], ['Khi được phân công trực nhật, em nên làm gì?', 'Hoàn thành phần việc của mình', ['Bỏ qua việc được giao', 'Đổ lỗi cho bạn', 'Làm qua loa'], 'Có trách nhiệm với nhiệm vụ']]],
        ['Vì cuộc sống an toàn', 25, [['Khi qua đường, em nên làm gì?', 'Đi cùng người lớn và quan sát an toàn', ['Chạy băng qua đường', 'Chơi dưới lòng đường', 'Đi khi đèn đỏ'], 'Thực hành an toàn giao thông'], ['Khi có người lạ rủ đi, em nên làm gì?', 'Từ chối và báo người lớn', ['Đi theo ngay', 'Cho địa chỉ nhà', 'Nhận quà rồi đi'], 'Tự bảo vệ bản thân'], ['Khi ở nhà một mình có người lạ gõ cửa, em nên làm gì?', 'Không mở cửa và gọi người lớn', ['Mở cửa ngay', 'Ra ngoài gặp', 'Cho người lạ vào'], 'Ứng phó tình huống không an toàn'], ['Số điện thoại khẩn cấp cần dùng khi có việc nguy hiểm nên được làm gì?', 'Ghi nhớ và nhờ người lớn hỗ trợ gọi', ['Dùng để trêu đùa', 'Cho người lạ', 'Không cần biết'], 'Nhận biết cách tìm hỗ trợ']]],
        ['Gia đình yêu thương', 42, [['Việc nào em có thể làm để giúp gia đình?', 'Gấp quần áo gọn gàng', ['Tự sửa điện', 'Dùng dao lớn một mình', 'Leo lên cao lấy đồ'], 'Chia sẻ việc nhà phù hợp'], ['Khi người thân mệt, em nên làm gì?', 'Hỏi thăm và giúp việc phù hợp', ['Làm ồn', 'Trêu chọc', 'Đòi hỏi thêm'], 'Quan tâm người thân'], ['Khi cả nhà cùng ăn cơm, em nên làm gì?', 'Nói chuyện lễ phép và giữ vệ sinh', ['Nói trống không', 'Làm rơi vãi thức ăn', 'Bỏ đi không nói'], 'Ứng xử trong gia đình'], ['Ngày sinh nhật người thân là dịp để em làm gì?', 'Thể hiện tình cảm và lời chúc tốt đẹp', ['Quên hoàn toàn', 'Đòi quà cho mình', 'Nói lời làm buồn'], 'Bày tỏ tình cảm']]],
        ['Thiên nhiên quanh em', 62, [['Khi tham quan thiên nhiên, em nên làm gì?', 'Quan sát và không làm hại cây, con vật', ['Bẻ hoa', 'Bắt con vật tùy ý', 'Vứt rác'], 'Ứng xử thân thiện với thiên nhiên'], ['Một hoạt động bảo vệ trường xanh là gì?', 'Chăm sóc cây và nhặt rác', ['Bẻ cây', 'Xả nước lãng phí', 'Đốt lá bừa bãi'], 'Tham gia bảo vệ môi trường'], ['Khi làm việc nhóm, em cần lắng nghe điều gì?', 'Ý kiến của các bạn', ['Chỉ ý kiến của mình', 'Lời trêu chọc', 'Không cần nghe'], 'Kỹ năng hợp tác'], ['Sau hoạt động trải nghiệm, em nên làm gì?', 'Chia sẻ điều đã học được', ['Vứt bỏ dụng cụ', 'Không cần nhớ', 'Chế giễu bạn'], 'Tự đánh giá sau trải nghiệm']]],
        ['Nghề nghiệp quanh em', 82, [['Người nông dân góp phần làm gì?', 'Trồng trọt và tạo ra nông sản', ['Chữa bệnh', 'Dạy học', 'Lái tàu'], 'Nhận biết nghề nghiệp'], ['Khi gặp người lao động, em nên làm gì?', 'Lễ phép và trân trọng công việc của họ', ['Chê bai', 'Gây phiền', 'Nói trống không'], 'Tôn trọng người lao động'], ['Muốn tìm hiểu một nghề, em nên làm gì?', 'Đặt câu hỏi lịch sự và quan sát', ['Tự ý làm việc nguy hiểm', 'Chế giễu', 'Bỏ qua hướng dẫn'], 'Khám phá nghề nghiệp'], ['Mỗi nghề trong xã hội có ý nghĩa gì?', 'Góp phần phục vụ cuộc sống', ['Không có ích', 'Chỉ để vui chơi', 'Đều giống hệt nhau'], 'Tôn trọng đa dạng nghề nghiệp']]]
    ]);

    buildValuesBank('music', BOOKS.music, 'music.json', [
        ['Ước mơ của bạn Đô', 8, [['Trong câu chuyện Ước mơ của bạn Đô, nhạc cụ nào được nhắc đến?', 'Kèn', ['Đàn bầu', 'Trống cơm', 'Sáo trúc'], 'Nhận biết nhạc cụ trong câu chuyện'], ['Khi nghe Quốc ca trong lễ khai giảng, em nên có thái độ nào?', 'Nghiêm trang', ['Nói chuyện riêng', 'Chạy nhảy', 'Cười đùa'], 'Ứng xử khi nghe nhạc nghi lễ'], ['Khi tập đọc nhạc, em cần làm gì?', 'Đọc đúng tên nốt và nhịp', ['Đọc tùy ý', 'Bỏ qua nhịp', 'Nói chuyện riêng'], 'Thực hành đọc nhạc'], ['Vận động theo nhịp giúp ích gì?', 'Cảm nhận tiết tấu tốt hơn', ['Không liên quan đến âm nhạc', 'Làm mất nhịp', 'Không cần lắng nghe'], 'Cảm nhận tiết tấu']]],
        ['Hát và nhạc cụ dân tộc', 16, [['Song loan là loại nhạc cụ gì?', 'Nhạc cụ gõ', ['Nhạc cụ dây', 'Nhạc cụ hơi', 'Nhạc cụ điện tử'], 'Nhận biết nhạc cụ gõ'], ['Đàn bầu có đặc điểm nổi bật nào?', 'Có một dây', ['Có mười dây', 'Không có dây', 'Chỉ dùng pin'], 'Nhận biết đàn bầu'], ['Khi hát kết hợp gõ đệm, em cần chú ý điều gì?', 'Giữ nhịp đều', ['Gõ thật mạnh không theo nhịp', 'Không cần nghe nhạc', 'Gõ tùy ý'], 'Thực hành gõ đệm'], ['Bài Trống cơm thuộc loại hình âm nhạc nào?', 'Dân ca quan họ Bắc Ninh', ['Nhạc nước ngoài', 'Nhạc điện tử', 'Nhạc không lời'], 'Nhận biết dân ca']]],
        ['Hát và vận động', 28, [['Khi biểu diễn bài hát, em nên làm gì?', 'Tự tin và phối hợp cùng bạn', ['Trêu chọc bạn', 'Bỏ vị trí', 'Không nghe hướng dẫn'], 'Tham gia biểu diễn âm nhạc'], ['Vận động phụ họa cần phù hợp với điều gì?', 'Nội dung và nhịp điệu bài hát', ['Trang phục đắt tiền', 'Sở thích riêng không cần nhạc', 'Âm lượng nói chuyện'], 'Sáng tạo vận động theo nhạc'], ['Khi bạn đang biểu diễn, em nên làm gì?', 'Lắng nghe và cổ vũ lịch sự', ['Làm ồn', 'Chế giễu', 'Chạy lên sân khấu'], 'Tôn trọng người biểu diễn'], ['Âm thanh mạnh và nhẹ giúp bài hát như thế nào?', 'Có sắc thái rõ hơn', ['Không có thay đổi', 'Mất giai điệu', 'Không cần nhịp'], 'Cảm nhận sắc thái âm nhạc']]],
        ['Đọc nhạc', 51, [['Kí hiệu bàn tay trong giờ âm nhạc giúp gì?', 'Hỗ trợ đọc đúng cao độ nốt nhạc', ['Đếm số trang', 'Vẽ tranh', 'Chơi thể thao'], 'Sử dụng kí hiệu hỗ trợ đọc nhạc'], ['Khi đọc nhạc kết hợp vỗ tay, em cần làm gì?', 'Giữ đều phách', ['Vỗ ngẫu nhiên', 'Bỏ qua nhịp', 'Nói chuyện'], 'Thực hành tiết tấu'], ['Muốn hát hay hơn, em nên làm gì?', 'Lắng nghe và luyện tập thường xuyên', ['Hét thật to', 'Không luyện tập', 'Trêu bạn hát'], 'Rèn luyện kĩ năng âm nhạc'], ['Âm nhạc có thể giúp chúng ta làm gì?', 'Thể hiện cảm xúc và gắn kết mọi người', ['Gây mất trật tự', 'Không cần lắng nghe', 'Làm hỏng đồ dùng'], 'Cảm nhận vai trò của âm nhạc']]],
        ['Biểu diễn cuối năm', 60, [['Khi chuẩn bị biểu diễn, em cần làm gì?', 'Tập luyện theo hướng dẫn', ['Tự ý đổi bài giữa chừng', 'Không chuẩn bị', 'Làm ồn'], 'Chuẩn bị biểu diễn'], ['Trang phục khi biểu diễn nên như thế nào?', 'Gọn gàng, phù hợp', ['Vướng víu, không an toàn', 'Bẩn và rách', 'Không theo hướng dẫn'], 'Giữ gìn hình ảnh khi biểu diễn'], ['Sau khi biểu diễn xong, em nên làm gì?', 'Cảm ơn khán giả và bạn cùng nhóm', ['Bỏ đi ngay', 'Chê bạn', 'Ném đạo cụ'], 'Ứng xử văn minh trong biểu diễn'], ['Hoạt động âm nhạc nhóm rèn cho em điều gì?', 'Tinh thần hợp tác', ['Thói quen tranh giành', 'Không cần lắng nghe', 'Sự thờ ơ'], 'Hợp tác trong âm nhạc']]]
    ]);

    buildValuesBank('art', BOOKS.art, 'art.json', [
        ['Sự thú vị của nét', 9, [['Nét thẳng, nét cong, nét gấp khúc là gì trong mĩ thuật?', 'Các loại nét tạo hình', ['Các loại nhạc cụ', 'Các môn thể thao', 'Các loại quả'], 'Nhận biết yếu tố tạo hình'], ['Khi vẽ bằng nét, em có thể tạo hình ảnh gì?', 'Hình dạng của đồ vật và sự vật', ['Chỉ chữ số', 'Chỉ âm thanh', 'Chỉ mùi hương'], 'Sử dụng nét tạo hình'], ['Để bài vẽ sạch đẹp, em nên làm gì?', 'Giữ giấy và dụng cụ gọn gàng', ['Làm nhàu giấy', 'Vẽ lên bàn', 'Ném bút màu'], 'Giữ gìn dụng cụ học tập'], ['Khi nhận xét bài của bạn, em nên nói thế nào?', 'Nhẹ nhàng và tôn trọng', ['Chê bai', 'Trêu chọc', 'Giật bài của bạn'], 'Tôn trọng sản phẩm mĩ thuật']]],
        ['Hình và màu', 16, [['Màu sắc có thể giúp tranh như thế nào?', 'Tạo cảm xúc và làm nổi bật hình ảnh', ['Không có tác dụng', 'Làm tranh biến mất', 'Chỉ để viết chữ'], 'Cảm nhận màu sắc'], ['Khi pha màu, em cần làm gì?', 'Thử màu cẩn thận trên giấy', ['Đổ màu bừa bãi', 'Dùng màu vẽ lên người bạn', 'Không cần quan sát'], 'Thực hành sử dụng màu'], ['Hình tròn, hình vuông, hình tam giác có thể dùng để làm gì?', 'Tạo hình đồ vật, con vật', ['Chỉ làm phép tính', 'Chỉ đọc nhạc', 'Chỉ chạy bộ'], 'Sử dụng hình cơ bản'], ['Khi dùng kéo trong giờ mĩ thuật, em cần làm gì?', 'Dùng cẩn thận theo hướng dẫn', ['Chạy khi cầm kéo', 'Chĩa kéo vào bạn', 'Tự ý cắt đồ vật'], 'An toàn khi thực hành']]],
        ['Sáng tạo từ vật liệu', 26, [['Vật liệu đã qua sử dụng có thể dùng để làm gì?', 'Tạo sản phẩm mĩ thuật phù hợp', ['Vứt bừa bãi ngay', 'Dùng làm đồ nguy hiểm', 'Làm hỏng sản phẩm của bạn'], 'Tái sử dụng vật liệu'], ['Khi làm việc nhóm, em nên làm gì?', 'Chia sẻ dụng cụ và hợp tác', ['Giữ hết đồ dùng', 'Không lắng nghe', 'Tranh giành'], 'Hợp tác sáng tạo'], ['Trước khi làm sản phẩm, em nên làm gì?', 'Quan sát mẫu và lên ý tưởng', ['Làm ngay không cần suy nghĩ', 'Phá dụng cụ', 'Bỏ qua hướng dẫn'], 'Lập kế hoạch sáng tạo'], ['Một sản phẩm mĩ thuật có thể thể hiện điều gì?', 'Ý tưởng và cảm xúc của người làm', ['Chỉ giá tiền', 'Chỉ đáp án toán', 'Chỉ thời tiết'], 'Bày tỏ ý tưởng qua sản phẩm']]],
        ['Thiên nhiên trong tranh', 41, [['Khi vẽ cây cối, em nên quan sát điều gì?', 'Hình dáng, màu sắc và đặc điểm nổi bật', ['Chỉ tên cây', 'Chỉ số trang sách', 'Chỉ âm thanh'], 'Quan sát thiên nhiên'], ['Tranh về thiên nhiên nhắc em điều gì?', 'Yêu quý và bảo vệ môi trường', ['Bẻ cây', 'Vứt rác', 'Làm hại con vật'], 'Bày tỏ tình yêu thiên nhiên'], ['Nền tranh có thể giúp gì?', 'Làm rõ không gian của hình ảnh chính', ['Che hết hình ảnh', 'Làm tranh không có màu', 'Không có vai trò'], 'Nhận biết bố cục đơn giản'], ['Khi trưng bày tranh, em cần làm gì?', 'Giữ gìn sản phẩm cẩn thận', ['Làm rách tranh', 'Vẽ bẩn lên tranh bạn', 'Ném tranh'], 'Giữ gìn sản phẩm']]],
        ['Chia sẻ sản phẩm', 53, [['Khi giới thiệu sản phẩm, em nên nói gì?', 'Ý tưởng và cách thực hiện của mình', ['Chê bai sản phẩm khác', 'Nói chuyện không liên quan', 'Giấu sản phẩm'], 'Giao tiếp về sản phẩm'], ['Khi bạn góp ý cho bài vẽ, em nên làm gì?', 'Lắng nghe và chọn góp ý phù hợp', ['Giận dữ ngay', 'Xé bài', 'Không nghe ai'], 'Tiếp nhận góp ý'], ['Một bài mĩ thuật tốt cần điều gì?', 'Thể hiện được ý tưởng riêng và sự chăm chút', ['Sao chép tùy tiện', 'Làm qua loa', 'Không cần hoàn thành'], 'Đánh giá sản phẩm'], ['Sau giờ học, em nên làm gì với dụng cụ?', 'Thu dọn và cất đúng chỗ', ['Vứt bừa bãi', 'Mang nhầm của bạn', 'Làm hỏng'], 'Tự phục vụ sau thực hành']]]
    ]);

    buildValuesBank('physical', BOOKS.physical, 'physical.json', [
        ['Đội hình đội ngũ', 12, [['Khi tập đội hình, em cần làm gì?', 'Lắng nghe khẩu lệnh và thực hiện nghiêm túc', ['Tự ý chạy ra ngoài', 'Nói chuyện riêng', 'Xô đẩy bạn'], 'Thực hiện đội hình đội ngũ'], ['Khi chuyển đội hình hàng ngang, em cần chú ý điều gì?', 'Giữ khoảng cách phù hợp với bạn', ['Chen lấn', 'Đẩy bạn', 'Bỏ hàng'], 'Phối hợp trong đội hình'], ['Trước khi tập thể dục, em nên làm gì?', 'Khởi động cơ thể', ['Ngồi yên cả giờ', 'Ăn quá no', 'Chạy ngay thật nhanh'], 'Chuẩn bị vận động'], ['Khi nghe hiệu lệnh dừng, em cần làm gì?', 'Dừng lại theo hướng dẫn', ['Chạy nhanh hơn', 'Đùa nghịch', 'Bỏ vị trí'], 'Tuân thủ hiệu lệnh']]],
        ['Bài thể dục', 23, [['Động tác vươn thở giúp em làm gì?', 'Khởi động và điều hòa nhịp thở', ['Làm mệt hơn ngay', 'Không liên quan vận động', 'Thay cho ngủ'], 'Thực hiện bài thể dục'], ['Khi tập động tác chân, em cần chú ý gì?', 'Giữ tư thế an toàn và theo hướng dẫn', ['Đá gần bạn', 'Tập trên nền trơn', 'Đùa nghịch'], 'An toàn khi tập luyện'], ['Sau khi vận động mạnh, em nên làm gì?', 'Thả lỏng và uống nước phù hợp', ['Ngồi ở nơi nguy hiểm', 'Chạy tiếp không nghỉ', 'Uống nước quá lạnh thật nhanh'], 'Chăm sóc cơ thể sau vận động'], ['Tập thể dục đều đặn giúp ích gì?', 'Cơ thể khỏe mạnh hơn', ['Làm cơ thể yếu đi', 'Không có tác dụng', 'Không cần ngủ'], 'Lợi ích của vận động']]],
        ['Đi và chạy', 37, [['Khi đi theo vạch kẻ thẳng, em nên làm gì?', 'Giữ thăng bằng và nhìn phía trước', ['Nhắm mắt chạy', 'Xô đẩy bạn', 'Quay lưng di chuyển'], 'Rèn luyện kĩ năng đi'], ['Khi chạy trong giờ học, em cần làm gì?', 'Chạy đúng khu vực và theo hiệu lệnh', ['Chạy ra đường', 'Đuổi theo bạn ngoài khu vực', 'Không khởi động'], 'An toàn khi chạy'], ['Nếu cảm thấy mệt khi tập, em nên làm gì?', 'Báo với giáo viên', ['Cố gắng quá sức', 'Giấu đi', 'Trêu bạn'], 'Tự theo dõi sức khỏe'], ['Giày tập thể dục nên như thế nào?', 'Vừa chân và an toàn', ['Quá rộng dễ vấp', 'Trơn trượt', 'Không cần mang'], 'Chuẩn bị trang phục']]],
        ['Trò chơi vận động', 65, [['Khi chơi trò chơi vận động, em cần làm gì?', 'Tuân thủ luật chơi', ['Gian lận', 'Xô đẩy', 'Tranh cãi'], 'Tham gia trò chơi an toàn'], ['Nếu đội bạn chiến thắng, em nên làm gì?', 'Chúc mừng lịch sự', ['Chế giễu', 'Cãi nhau', 'Bỏ cuộc giữa chừng'], 'Tinh thần thể thao'], ['Khi chơi với bóng, em cần chú ý điều gì?', 'Không ném bóng vào mặt bạn', ['Ném thật mạnh vào bạn', 'Giành bóng bằng cách xô đẩy', 'Chơi ở nơi nguy hiểm'], 'An toàn với dụng cụ'], ['Trò chơi nhóm giúp rèn điều gì?', 'Tinh thần hợp tác', ['Thói quen ích kỉ', 'Không cần lắng nghe', 'Sự thờ ơ'], 'Hợp tác qua vận động']]],
        ['Bơi và an toàn dưới nước', 85, [['Khi ở gần ao, hồ, em nên làm gì?', 'Đi cùng người lớn và tuân theo quy định an toàn', ['Tự ý xuống nước', 'Đùa nghịch gần mép nước', 'Đẩy bạn xuống nước'], 'An toàn dưới nước'], ['Trước khi xuống bể bơi, em cần làm gì?', 'Khởi động và nghe hướng dẫn', ['Nhảy xuống ngay', 'Chạy quanh bể', 'Đùa nghịch'], 'Chuẩn bị bơi an toàn'], ['Khi thấy bạn gặp nguy hiểm dưới nước, em nên làm gì?', 'Gọi người lớn hỗ trợ ngay', ['Tự lao xuống khi chưa biết bơi', 'Đứng xem', 'Trêu bạn'], 'Ứng phó nguy hiểm dưới nước'], ['Học bơi đúng cách giúp gì?', 'Tăng kĩ năng an toàn dưới nước', ['Không cần người hướng dẫn', 'Có thể bơi ở mọi nơi một mình', 'Không cần khởi động'], 'Nhận biết lợi ích học bơi']]]
    ]);
}

fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
writeBank('math.json', buildMath());
writeBank('viet.json', buildVietnamese());
buildValues();
