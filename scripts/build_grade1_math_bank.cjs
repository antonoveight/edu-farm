const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'grade1', 'math.json');
const SOURCE_FILE = 'sgk-toan-1-tu-nam-2026-tap-1_107202616.pdf';
const BOOK_NAME = 'SGK Toán 1, Tập một – Kết nối tri thức với cuộc sống';
const SOURCE_FILE_SEMESTER_2 = 'sgk-toan-1-tu-nam-2026-tap-2_107202616.pdf';
const BOOK_NAME_SEMESTER_2 = 'SGK Toán 1, Tập hai – Kết nối tri thức với cuộc sống';
const NUMBER_WORDS = [
    'không', 'một', 'hai', 'ba', 'bốn', 'năm',
    'sáu', 'bảy', 'tám', 'chín', 'mười'
];

const LESSONS = {
    b1: { title: 'Bài 1: Các số 0, 1, 2, 3, 4, 5', page: 8 },
    b2: { title: 'Bài 2: Các số 6, 7, 8, 9, 10', page: 14 },
    b3: { title: 'Bài 3: Nhiều hơn, ít hơn, bằng nhau', page: 20 },
    b4: { title: 'Bài 4: So sánh số', page: 24 },
    b5: { title: 'Bài 5: Mấy và mấy', page: 32 },
    b6: { title: 'Bài 6: Luyện tập chung', page: 38 },
    b7: { title: 'Bài 7: Hình vuông, hình tròn, hình tam giác, hình chữ nhật', page: 46 },
    b8: { title: 'Bài 8: Thực hành lắp ghép, xếp hình', page: 50 },
    b9: { title: 'Bài 9: Luyện tập chung về hình phẳng', page: 54 },
    b10: { title: 'Bài 10: Phép cộng trong phạm vi 10', page: 56 },
    b11: { title: 'Bài 11: Phép trừ trong phạm vi 10', page: 68 },
    b12: { title: 'Bài 12: Bảng cộng, bảng trừ trong phạm vi 10', page: 80 },
    b13: { title: 'Bài 13: Luyện tập chung phép cộng, phép trừ', page: 86 },
    b14: { title: 'Bài 14: Khối lập phương, khối hộp chữ nhật', page: 92 },
    b15: { title: 'Bài 15: Vị trí, định hướng trong không gian', page: 96 },
    b16: { title: 'Bài 16: Luyện tập chung về hình khối và vị trí', page: 100 },
    b17: { title: 'Bài 17: Ôn tập các số trong phạm vi 10', page: 102 },
    b18: { title: 'Bài 18: Ôn tập phép cộng, phép trừ trong phạm vi 10', page: 106 },
    b19: { title: 'Bài 19: Ôn tập hình học', page: 110 },
    b20: { title: 'Bài 20: Ôn tập chung', page: 112 },
    b21: { title: 'Bài 21: Số có hai chữ số', page: 4 },
    b22: { title: 'Bài 22: So sánh số có hai chữ số', page: 16 },
    b23: { title: 'Bài 23: Bảng các số từ 1 đến 100', page: 22 },
    b24: { title: 'Bài 24: Luyện tập chung', page: 24 },
    b25: { title: 'Bài 25: Dài hơn, ngắn hơn', page: 28 },
    b26: { title: 'Bài 26: Đơn vị đo độ dài', page: 32 },
    b27: { title: 'Bài 27: Thực hành ước lượng và đo độ dài', page: 36 },
    b28: { title: 'Bài 28: Luyện tập chung', page: 40 },
    b29: { title: 'Bài 29: Phép cộng số có hai chữ số với số có một chữ số', page: 44 },
    b30: { title: 'Bài 30: Phép cộng số có hai chữ số với số có hai chữ số', page: 48 },
    b31: { title: 'Bài 31: Phép trừ số có hai chữ số cho số có một chữ số', page: 52 },
    b32: { title: 'Bài 32: Phép trừ số có hai chữ số cho số có hai chữ số', page: 58 },
    b33: { title: 'Bài 33: Luyện tập chung', page: 64 },
    b34: { title: 'Bài 34: Xem giờ đúng trên đồng hồ', page: 72 },
    b35: { title: 'Bài 35: Các ngày trong tuần', page: 76 },
    b36: { title: 'Bài 36: Thực hành xem lịch và giờ', page: 80 },
    b37: { title: 'Bài 37: Luyện tập chung', page: 84 },
    b38: { title: 'Bài 38: Ôn tập các số và phép tính trong phạm vi 10', page: 88 },
    b39: { title: 'Bài 39: Ôn tập các số và phép tính trong phạm vi 100', page: 94 },
    b40: { title: 'Bài 40: Ôn tập hình học và đo lường', page: 100 },
    b41: { title: 'Bài 41: Ôn tập chung', page: 104 }
};

for (let lesson = 21; lesson <= 41; lesson += 1) {
    LESSONS[`b${lesson}`].bookName = BOOK_NAME_SEMESTER_2;
    LESSONS[`b${lesson}`].sourceFile = SOURCE_FILE_SEMESTER_2;
}

const questions = [];

function rotate(values, amount) {
    const offset = amount % values.length;
    return [...values.slice(offset), ...values.slice(0, offset)];
}

function choicesFromUniverse(answer, universe, size = 4) {
    const normalizedAnswer = String(answer);
    const unique = [...new Set(universe.map(String))];
    const choices = [
        normalizedAnswer,
        ...unique.filter((value) => value !== normalizedAnswer)
    ].slice(0, size);
    return rotate(choices, questions.length % choices.length);
}

function numericChoices(answer) {
    const value = Number(answer);
    if (value > 10) {
        const candidates = [
            value,
            value - 1,
            value + 1,
            value - 10,
            value + 10,
            value - 2,
            value + 2,
            ...Array.from({ length: 11 }, (_, index) => index * 10)
        ].filter((item) => Number.isInteger(item) && item >= 0 && item <= 100);
        return choicesFromUniverse(value, candidates);
    }
    const candidates = [
        value,
        value - 1,
        value + 1,
        value - 2,
        value + 2,
        ...Array.from({ length: 11 }, (_, index) => index)
    ].filter((item) => Number.isInteger(item) && item >= 0 && item <= 10);
    return choicesFromUniverse(value, candidates);
}

function add({
    q,
    a,
    c,
    type = 'multiple_choice',
    lesson,
    lo,
    difficulty = 'easy',
    page
}) {
    const lessonData = LESSONS[lesson];
    if (!lessonData) throw new Error(`Unknown lesson: ${lesson}`);
    const answer = String(a);
    const choices = c ? c.map(String) : numericChoices(answer);
    questions.push({
        q: q.trim(),
        a: answer,
        c: choices,
        type,
        ...(type === 'fill_blank' ? { sentence: q.trim() } : {}),
        lo: `${lessonData.title} – ${lo}`,
        difficulty,
        status: 'published',
        sourceType: 'book',
        sourceRef: `${lessonData.bookName || BOOK_NAME} (${lessonData.sourceFile || SOURCE_FILE}) – ${lessonData.title}`,
        sourcePage: page || lessonData.page
    });
}

// 1. Nhận biết, đọc và thứ tự các số từ 0 đến 10.
for (let number = 0; number <= 10; number += 1) {
    add({
        q: `Số ${number} được đọc là gì?`,
        a: NUMBER_WORDS[number],
        c: choicesFromUniverse(NUMBER_WORDS[number], NUMBER_WORDS),
        lesson: number <= 5 ? 'b1' : 'b2',
        page: number <= 5 ? 8 : 14,
        lo: `Đọc đúng số ${number}`
    });
}

for (let number = 0; number < 10; number += 1) {
    add({
        q: `Số nào đứng ngay sau số ${number}?`,
        a: number + 1,
        lesson: number < 5 ? 'b1' : 'b2',
        lo: 'Xác định số liền sau trong dãy số 0 đến 10'
    });
}

for (let number = 1; number <= 10; number += 2) {
    add({
        q: `Số nào đứng ngay trước số ${number}?`,
        a: number - 1,
        lesson: number <= 5 ? 'b1' : 'b2',
        lo: 'Xác định số liền trước trong dãy số 0 đến 10'
    });
}

[
    [0, 1, 2, 3], [2, 3, 4, 5], [4, 5, 6, 7], [6, 7, 8, 9], [7, 8, 9, 10]
].forEach((sequence, index) => {
    const missingIndex = (index % 2) + 1;
    const answer = sequence[missingIndex];
    const display = sequence.map((value, position) => position === missingIndex ? '___' : value).join(', ');
    add({
        q: `Số còn thiếu trong dãy ${display} là số nào?`,
        a: answer,
        type: 'fill_blank',
        lesson: index < 2 ? 'b6' : 'b17',
        lo: 'Hoàn thiện dãy số tăng dần trong phạm vi 10'
    });
});

// 2. Nhiều hơn, ít hơn, bằng nhau và dấu so sánh.
[
    [2, 5], [7, 3], [4, 4], [0, 2], [6, 9], [10, 8], [1, 1], [5, 6],
    [9, 9], [3, 1], [8, 10], [6, 2], [4, 7], [10, 10], [1, 5], [8, 4],
    [3, 6], [9, 7]
].forEach(([left, right], index) => {
    const answer = left > right ? '>' : left < right ? '<' : '=';
    add({
        q: `Chọn dấu thích hợp: ${left} ___ ${right}.`,
        a: answer,
        c: rotate(['>', '<', '='], index % 3),
        type: 'fill_blank',
        lesson: 'b4',
        lo: 'So sánh hai số trong phạm vi 10 bằng dấu >, <, =',
        difficulty: index < 9 ? 'easy' : 'medium'
    });
});

[
    ['Nhóm có 7 bông hoa nhiều hơn nhóm có 5 bông hoa.', 'Đúng'],
    ['Nhóm có 3 con cá ít hơn nhóm có 6 con cá.', 'Đúng'],
    ['Hai nhóm cùng có 4 đồ vật thì bằng nhau.', 'Đúng'],
    ['Số 2 lớn hơn số 8.', 'Sai'],
    ['Số 10 bé hơn số 9.', 'Sai'],
    ['Số 0 bé hơn số 1.', 'Đúng'],
    ['Số 6 bằng số 9.', 'Sai'],
    ['Nhóm có 5 quả táo nhiều hơn nhóm có 5 quả táo.', 'Sai']
].forEach(([statement, answer], index) => {
    add({
        q: `Khẳng định sau đúng hay sai? ${statement}`,
        a: answer,
        c: ['Đúng', 'Sai'],
        type: 'true_false',
        lesson: index < 3 || index === 7 ? 'b3' : 'b4',
        lo: 'Nhận biết quan hệ nhiều hơn, ít hơn, bằng nhau và so sánh số'
    });
});

// 3. Tách – gộp số (mấy và mấy).
for (let total = 3; total <= 10; total += 1) {
    const firstParts = [1, Math.floor(total / 2)];
    [...new Set(firstParts)].forEach((firstPart) => {
        const missing = total - firstPart;
        add({
            q: `Điền số thích hợp: ${total} gồm ${firstPart} và ___.`,
            a: missing,
            type: 'fill_blank',
            lesson: 'b5',
            lo: `Tách số ${total} thành hai phần`,
            difficulty: total <= 6 ? 'easy' : 'medium'
        });
    });
}

[
    ['Bể cá có 5 con, gồm 2 con màu vàng và mấy con màu đỏ?', 3, 5],
    ['Có 6 que tính, tách 1 que sang một nhóm. Nhóm còn lại có mấy que?', 5, 6],
    ['Hộp có 7 viên bi, gồm 3 viên xanh và mấy viên đỏ?', 4, 7],
    ['Có 8 bông hoa, gồm 4 bông hồng và mấy bông cúc?', 4, 8],
    ['Rổ có 9 quả, gồm 5 quả cam và mấy quả táo?', 4, 9],
    ['Lớp có 10 bạn, gồm 6 bạn nữ và mấy bạn nam?', 4, 10],
    ['Mai có 3 con cá, Nam có 2 con cá. Cả hai bạn có mấy con cá?', 5, 5],
    ['Hai nhóm có 2 và 4 khối gỗ. Gộp lại có mấy khối gỗ?', 6, 6]
].forEach(([q, answer, total]) => {
    add({
        q,
        a: answer,
        lesson: 'b5',
        page: total <= 6 ? 32 : 35,
        lo: 'Vận dụng tách – gộp số trong tình huống gần gũi',
        difficulty: 'medium'
    });
});

// 4. Hình phẳng, lắp ghép, hình khối và vị trí không gian.
[
    ['Mặt đồng hồ treo tường thường gợi đến hình nào?', 'hình tròn', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Mặt bảng lớp thường có dạng hình nào?', 'hình chữ nhật', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Biển báo cảnh báo thường gợi đến hình nào?', 'hình tam giác', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Mặt của một ô cờ vuông có dạng hình nào?', 'hình vuông', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Hình nào không có góc?', 'hình tròn', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Hình nào có ba góc?', 'hình tam giác', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Bốn miếng bìa hình tam giác có thể ghép thành một hình vuông. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Cắt một hình vuông theo hai đường chéo có thể được bốn hình tam giác. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Chỉ có thể ghép các miếng bìa thành một hình duy nhất. Đúng hay sai?', 'Sai', ['Đúng', 'Sai'], 'true_false'],
    ['Khi xếp hình, có thể xoay miếng ghép để tìm vị trí phù hợp. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false']
].forEach(([q, answer, choices, type = 'multiple_choice'], index) => {
    add({
        q,
        a: answer,
        c: rotate(choices, index % choices.length),
        type,
        lesson: index < 4 ? 'b7' : index === 4 ? 'b9' : index === 5 ? 'b19' : 'b8',
        lo: index < 6 ? 'Nhận dạng hình phẳng qua đặc điểm và đồ vật quen thuộc' : 'Hiểu nguyên tắc lắp ghép, xếp hình'
    });
});

[
    ['Hộp quà có các mặt vuông bằng nhau gợi đến khối nào?', 'khối lập phương'],
    ['Viên xúc xắc có dạng khối nào?', 'khối lập phương'],
    ['Hộp bút dài có dạng khối nào?', 'khối hộp chữ nhật'],
    ['Thùng hàng hình hộp dài có dạng khối nào?', 'khối hộp chữ nhật'],
    ['Khối lập phương và khối hộp chữ nhật đều lăn tròn như quả bóng. Đúng hay sai?', 'Sai'],
    ['Có thể xếp chồng các khối lập phương nhỏ. Đúng hay sai?', 'Đúng'],
    ['Một khối hộp chữ nhật có thể có mặt hình chữ nhật. Đúng hay sai?', 'Đúng'],
    ['Viên xúc xắc không phải là khối lập phương. Đúng hay sai?', 'Sai']
].forEach(([q, answer], index) => {
    const isBinary = answer === 'Đúng' || answer === 'Sai';
    add({
        q,
        a: answer,
        c: isBinary
            ? ['Đúng', 'Sai']
            : rotate(['khối lập phương', 'khối hộp chữ nhật', 'hình vuông', 'hình chữ nhật'], index % 4),
        type: isBinary ? 'true_false' : 'multiple_choice',
        lesson: index < 6 ? 'b14' : 'b16',
        lo: 'Nhận dạng khối lập phương và khối hộp chữ nhật'
    });
});

[
    ['Lan đứng trước Mai, Mai đứng trước Nam. Ai đứng ở giữa?', 'Mai', ['Lan', 'Mai', 'Nam']],
    ['Trên bàn có quyển sách, dưới bàn có cặp sách. Vật nào ở trên?', 'quyển sách', ['quyển sách', 'cặp sách']],
    ['Trên bàn có quyển sách, dưới bàn có cặp sách. Vật nào ở dưới?', 'cặp sách', ['quyển sách', 'cặp sách']],
    ['An đứng bên trái Bình. Bình đứng bên nào của An?', 'bên phải', ['bên phải', 'bên trái', 'ở giữa']],
    ['Quả bóng ở bên phải con gấu. Con gấu ở bên nào của quả bóng?', 'bên trái', ['bên phải', 'bên trái', 'ở giữa']],
    ['Trong hàng ba bạn An, Bình, Chi, Bình ở giữa. Ai có thể ở hai bên Bình?', 'An và Chi', ['An và Chi', 'chỉ An', 'chỉ Chi']],
    ['Đèn đỏ ở trên đèn vàng, đèn xanh ở dưới đèn vàng. Đèn nào ở giữa?', 'đèn vàng', ['đèn đỏ', 'đèn vàng', 'đèn xanh']],
    ['Toa 1 ở trước toa 2. Toa nào ở sau?', 'toa 2', ['toa 1', 'toa 2']],
    ['Thỏ ở bên trái rùa. Rùa ở bên phải thỏ. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai']],
    ['Nếu búp bê ở trên bàn thì búp bê cũng ở dưới bàn. Đúng hay sai?', 'Sai', ['Đúng', 'Sai']]
].forEach(([q, answer, choices], index) => {
    const isBinary = choices.length === 2 && choices.includes('Đúng');
    add({
        q,
        a: answer,
        c: rotate(choices, index % choices.length),
        type: isBinary ? 'true_false' : 'multiple_choice',
        lesson: index < 8 ? 'b15' : 'b16',
        lo: 'Xác định vị trí trước, sau, ở giữa, trên, dưới, phải, trái',
        difficulty: index < 3 ? 'easy' : 'medium'
    });
});

// 5. Các phép cộng cơ bản trong phạm vi 10.
const additionPairs = [];
for (let sum = 2; sum <= 10; sum += 1) {
    const candidates = [[1, sum - 1], [2, sum - 2], [Math.floor(sum / 2), Math.ceil(sum / 2)]];
    for (const [left, right] of candidates) {
        if (left >= 0 && right >= 0 && left <= 10 && right <= 10) {
            const key = `${left}+${right}`;
            if (!additionPairs.some((pair) => `${pair[0]}+${pair[1]}` === key)) additionPairs.push([left, right]);
        }
    }
}
[[0, 3], [4, 0], [0, 7], [10, 0]].forEach((pair) => additionPairs.push(pair));

additionPairs.forEach(([left, right], index) => {
    add({
        q: `Tính: ${left} + ${right} = ${index % 3 === 0 ? '___' : '?'}`,
        a: left + right,
        type: index % 3 === 0 ? 'fill_blank' : 'multiple_choice',
        lesson: index < 18 ? 'b10' : index < additionPairs.length - 3 ? 'b12' : 'b13',
        lo: 'Thực hiện phép cộng trong phạm vi 10',
        difficulty: left + right <= 6 ? 'easy' : 'medium'
    });
});

// 6. Các phép trừ cơ bản trong phạm vi 10.
const subtractionPairs = [];
for (let minuend = 3; minuend <= 10; minuend += 1) {
    const subtrahends = [1, 2, Math.floor(minuend / 2), minuend];
    for (const subtrahend of [...new Set(subtrahends)]) {
        subtractionPairs.push([minuend, subtrahend]);
    }
}
[[1, 0], [2, 0], [5, 0], [8, 0]].forEach((pair) => subtractionPairs.push(pair));

subtractionPairs.forEach(([minuend, subtrahend], index) => {
    add({
        q: `Tính: ${minuend} − ${subtrahend} = ${index % 3 === 1 ? '___' : '?'}`,
        a: minuend - subtrahend,
        type: index % 3 === 1 ? 'fill_blank' : 'multiple_choice',
        lesson: index < 20 ? 'b11' : index < subtractionPairs.length - 3 ? 'b12' : 'b13',
        lo: 'Thực hiện phép trừ trong phạm vi 10',
        difficulty: minuend <= 6 ? 'easy' : 'medium'
    });
});

// 7. Bài toán có lời văn một bước, ngữ cảnh gần gũi.
[
    ['Lan có 3 quả táo, mẹ cho thêm 2 quả. Lan có tất cả bao nhiêu quả táo?', 5, 'b10'],
    ['Trên cành có 4 con chim, bay đến thêm 3 con. Có tất cả bao nhiêu con chim?', 7, 'b10'],
    ['Bể thứ nhất có 2 con cá, bể thứ hai có 6 con cá. Hai bể có tất cả bao nhiêu con cá?', 8, 'b10'],
    ['Mai có 5 bông hoa, Nam có 5 bông hoa. Cả hai bạn có bao nhiêu bông hoa?', 10, 'b10'],
    ['Rổ có 6 quả cam, bố đặt thêm 1 quả. Rổ có bao nhiêu quả cam?', 7, 'b10'],
    ['Hộp có 7 viên bi xanh và 2 viên bi đỏ. Hộp có tất cả bao nhiêu viên bi?', 9, 'b10'],
    ['Có 1 bạn đang chơi, 4 bạn khác cùng tham gia. Có tất cả bao nhiêu bạn?', 5, 'b10'],
    ['Trên bàn có 8 quyển sách, cô đặt thêm 2 quyển. Trên bàn có bao nhiêu quyển sách?', 10, 'b10'],
    ['Có 3 xe ô tô đỏ và 3 xe ô tô xanh. Có tất cả bao nhiêu xe ô tô?', 6, 'b10'],
    ['Giỏ có 9 quả bóng, thêm 0 quả bóng. Giỏ vẫn có bao nhiêu quả bóng?', 9, 'b10'],
    ['Trên cây có 6 quả, hái 1 quả. Trên cây còn bao nhiêu quả?', 5, 'b11'],
    ['Có 8 quả bóng, bay mất 3 quả. Còn lại bao nhiêu quả bóng?', 5, 'b11'],
    ['Bể có 9 con cá, vớt ra 2 con. Bể còn bao nhiêu con cá?', 7, 'b11'],
    ['Khay có 10 quả trứng, 4 quả đã nở. Còn bao nhiêu quả chưa nở?', 6, 'b11'],
    ['Có 7 bông hoa, tặng bạn 5 bông. Còn lại bao nhiêu bông hoa?', 2, 'b11'],
    ['Có 5 con chim, cả 5 con đều bay đi. Còn lại bao nhiêu con chim?', 0, 'b11'],
    ['Hộp có 4 viên bi, không lấy viên nào ra. Hộp còn bao nhiêu viên bi?', 4, 'b11'],
    ['Có 10 que tính, bớt 7 que. Còn bao nhiêu que tính?', 3, 'b11'],
    ['Lớp có 9 bạn đang ngồi, 1 bạn ra ngoài. Còn bao nhiêu bạn trong lớp?', 8, 'b11'],
    ['Trên bờ có 6 con vịt, 2 con xuống nước. Trên bờ còn bao nhiêu con vịt?', 4, 'b11']
].forEach(([q, answer, lesson], index) => {
    add({
        q,
        a: answer,
        lesson,
        lo: lesson === 'b10'
            ? 'Giải bài toán thêm, gộp bằng một phép cộng'
            : 'Giải bài toán bớt đi, còn lại bằng một phép trừ',
        difficulty: index % 5 === 0 ? 'easy' : 'medium'
    });
});

// 8. Quan hệ giữa phép cộng và phép trừ, ôn tập học kì I.
[
    ['Phép tính nào có kết quả bằng 5?', '2 + 3', ['2 + 3', '2 + 2', '6 − 2', '1 + 2']],
    ['Phép tính nào có kết quả bằng 7?', '9 − 2', ['9 − 2', '3 + 3', '8 − 2', '4 + 2']],
    ['Phép tính nào có kết quả bằng 10?', '6 + 4', ['6 + 4', '8 + 1', '10 − 1', '7 + 2']],
    ['Từ phép cộng 3 + 4 = 7, phép trừ nào đúng?', '7 − 3 = 4', ['7 − 3 = 4', '7 − 4 = 2', '4 − 3 = 7', '3 − 4 = 7']],
    ['Từ phép cộng 2 + 6 = 8, phép trừ nào đúng?', '8 − 6 = 2', ['8 − 6 = 2', '8 − 2 = 5', '6 − 2 = 8', '2 − 6 = 8']],
    ['Chọn số thích hợp: 4 + ___ = 9.', '5', ['3', '4', '5', '6']],
    ['Chọn số thích hợp: ___ + 3 = 10.', '7', ['5', '6', '7', '8']],
    ['Chọn số thích hợp: 10 − ___ = 6.', '4', ['3', '4', '5', '6']],
    ['Chọn số thích hợp: ___ − 2 = 5.', '7', ['5', '6', '7', '8']],
    ['3 + 5 và 5 + 3 có cùng kết quả. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai']],
    ['10 − 0 = 0. Đúng hay sai?', 'Sai', ['Đúng', 'Sai']],
    ['6 − 6 = 0. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai']]
].forEach(([q, answer, choices], index) => {
    const isBinary = choices.length === 2;
    add({
        q,
        a: answer,
        c: rotate(choices, index % choices.length),
        type: isBinary ? 'true_false' : (index >= 5 && index <= 8 ? 'fill_blank' : 'multiple_choice'),
        lesson: index < 3 ? 'b18' : index < 5 ? 'b13' : 'b20',
        lo: index < 5
            ? 'Củng cố quan hệ giữa phép cộng và phép trừ trong phạm vi 10'
            : 'Ôn tập tổng hợp số và phép tính trong phạm vi 10',
        difficulty: 'medium'
    });
});

// HỌC KÌ II – SGK TOÁN 1, TẬP HAI.
// Câu hỏi được diễn đạt mới theo chuẩn kiến thức của sách, không sao chép nguyên bài tập.
const semesterTwoStartIndex = questions.length;
const ONES_WORDS = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function readNumberTo100(number) {
    if (number === 100) return 'một trăm';
    if (number < 10) return NUMBER_WORDS[number];
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    const prefix = tens === 1 ? 'mười' : `${ONES_WORDS[tens]} mươi`;
    if (ones === 0) return prefix;
    if (tens >= 2 && ones === 1) return `${prefix} mốt`;
    if (tens >= 2 && ones === 4) return `${prefix} tư`;
    if (ones === 5) return `${prefix} lăm`;
    return `${prefix} ${ONES_WORDS[ones]}`;
}

// 6. Các số đến 100: đọc, viết, cấu tạo, thứ tự và so sánh.
[11, 14, 20, 25, 32, 40, 53, 61, 78, 99].forEach((number) => {
    const nearby = [
        number,
        Math.max(10, number - 1),
        Math.min(100, number + 1),
        number >= 90 ? number - 10 : number + 10
    ];
    add({
        q: `Số ${number} được đọc là gì?`,
        a: readNumberTo100(number),
        c: choicesFromUniverse(readNumberTo100(number), nearby.map(readNumberTo100)),
        lesson: 'b21',
        lo: 'Đọc đúng số có hai chữ số và số 100'
    });
});

[12, 20, 34, 45, 56, 67, 70, 89].forEach((number, index) => {
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    const answer = `${tens} chục và ${ones} đơn vị`;
    add({
        q: `Số ${number} gồm mấy chục và mấy đơn vị?`,
        a: answer,
        c: choicesFromUniverse(answer, [
            answer,
            `${ones} chục và ${tens} đơn vị`,
            `${tens} chục và ${Math.min(9, ones + 1)} đơn vị`,
            `${Math.max(0, tens - 1)} chục và ${ones} đơn vị`
        ]),
        lesson: index < 5 ? 'b21' : 'b24',
        lo: 'Xác định số chục và số đơn vị của một số',
        difficulty: index < 4 ? 'easy' : 'medium'
    });
});

[[2, 3], [4, 0], [5, 8], [9, 1]].forEach(([tens, ones]) => {
    add({
        q: `Số gồm ${tens} chục và ${ones} đơn vị là số nào?`,
        a: tens * 10 + ones,
        lesson: 'b21',
        lo: 'Viết số có hai chữ số từ cấu tạo chục và đơn vị'
    });
});

[
    [16, 19], [42, 25], [31, 31], [20, 18],
    [54, 59], [70, 67], [83, 38], [99, 100],
    [46, 64], [72, 72], [15, 51], [90, 89],
    [27, 30], [68, 61], [44, 45], [100, 100]
].forEach(([left, right], index) => {
    const answer = left > right ? '>' : left < right ? '<' : '=';
    add({
        q: `Chọn dấu thích hợp: ${left} ___ ${right}.`,
        a: answer,
        c: rotate(['>', '<', '='], index % 3),
        type: 'fill_blank',
        lesson: 'b22',
        lo: 'So sánh hai số trong phạm vi 100 bằng dấu >, <, =',
        difficulty: index < 8 ? 'easy' : 'medium'
    });
});

[
    [[21, 22, null, 24], 23],
    [[47, null, 49, 50], 48],
    [[76, 77, 78, null], 79],
    [[null, 98, 99, 100], 97]
].forEach(([sequence, answer]) => {
    add({
        q: `Điền số còn thiếu: ${sequence.map((value) => value ?? '___').join(', ')}.`,
        a: answer,
        type: 'fill_blank',
        lesson: 'b23',
        lo: 'Hoàn thiện dãy số liên tiếp trong bảng các số từ 1 đến 100'
    });
});

[
    ['Số nào đứng ngay sau số 99?', 100],
    ['Số nào đứng ngay trước số 100?', 99],
    ['Số lớn nhất có hai chữ số là số nào?', 99],
    ['Số gồm 10 chục là số nào?', 100],
    ['Trong bảng các số từ 1 đến 100, số nằm ngay dưới số 37 là số nào?', 47],
    ['Số tròn chục lớn nhất bé hơn 100 là số nào?', 90]
].forEach(([q, answer], index) => {
    add({
        q,
        a: answer,
        lesson: index < 2 || index === 4 ? 'b23' : 'b24',
        lo: 'Nhận biết thứ tự và đặc điểm các số trong phạm vi 100',
        difficulty: index < 2 ? 'easy' : 'medium'
    });
});

[
    ['Số sáu mươi hai được viết là số nào?', '62', ['26', '60', '62', '72']],
    ['100 là số có hai chữ số. Đúng hay sai?', 'Sai', ['Đúng', 'Sai'], 'true_false']
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b24',
        lo: 'Củng cố cách đọc, viết và nhận biết số trong phạm vi 100'
    });
});

// 7. Độ dài và đo độ dài.
[
    ['Bút mực dài hơn bút chì. Vật nào ngắn hơn?', 'bút chì', ['bút mực', 'bút chì']],
    ['Dải ruy băng đỏ ngắn hơn dải ruy băng xanh. Dải nào dài hơn?', 'dải ruy băng xanh', ['dải ruy băng đỏ', 'dải ruy băng xanh']],
    ['Nam cao hơn An. Bạn nào thấp hơn?', 'An', ['Nam', 'An']],
    ['Sợi dây A dài hơn sợi dây B. Có thể nói sợi dây B ngắn hơn sợi dây A. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Hai chiếc bút đặt cùng điểm đầu, đầu bút nào vươn xa hơn thì bút đó dài hơn. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Thước dài hơn bút chì. Vật nào dài hơn?', 'thước', ['thước', 'bút chì']]
].forEach(([q, answer, choices, type = 'multiple_choice'], index) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b25',
        lo: 'So sánh trực tiếp và gián tiếp độ dài của hai vật',
        difficulty: index < 3 ? 'easy' : 'medium'
    });
});

[
    ['Đơn vị xăng-ti-mét được viết tắt là gì?', 'cm', ['cm', 'kg', 'giờ', 'lít']],
    ['Muốn đo độ dài chiếc bút theo xăng-ti-mét, em nên dùng dụng cụ nào?', 'thước có vạch chia xăng-ti-mét', ['thước có vạch chia xăng-ti-mét', 'đồng hồ', 'cân', 'lịch']],
    ['Khi đo bằng gang tay, cần đặt các gang tay nối tiếp nhau, không để khoảng trống. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Kết quả đo bằng gang tay của hai bạn luôn giống nhau dù gang tay khác nhau. Đúng hay sai?', 'Sai', ['Đúng', 'Sai'], 'true_false'],
    ['Một chiếc bút dài 12 cm. Số đo độ dài của chiếc bút là bao nhiêu?', '12 cm', ['12 cm', '12 giờ', '12 ngày', '12 kg']],
    ['Một cục tẩy dài 4 cm. Đơn vị của số đo này là gì?', 'xăng-ti-mét', ['xăng-ti-mét', 'giờ', 'ngày', 'chục']],
    ['Đoạn dây A dài 18 cm, đoạn dây B dài 13 cm. Đoạn dây nào dài hơn?', 'đoạn dây A', ['đoạn dây A', 'đoạn dây B']],
    ['Quyển sách dài 25 cm, hộp bút dài 20 cm. Hộp bút ngắn hơn quyển sách bao nhiêu xăng-ti-mét?', '5 cm', ['3 cm', '4 cm', '5 cm', '6 cm']]
].forEach(([q, answer, choices, type = 'multiple_choice'], index) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b26',
        lo: 'Nhận biết đơn vị xăng-ti-mét và đo độ dài bằng đơn vị phù hợp',
        difficulty: index < 4 ? 'easy' : 'medium'
    });
});

[
    ['Số đo nào phù hợp nhất với chiều dài một chiếc bút mực?', '12 cm', ['2 cm', '12 cm', '35 cm', '80 cm']],
    ['Số đo nào phù hợp nhất với chiều dài một cục tẩy?', '4 cm', ['4 cm', '20 cm', '40 cm', '90 cm']],
    ['Số đo nào phù hợp nhất với chiều dài một chiếc bút chì?', '20 cm', ['3 cm', '8 cm', '20 cm', '70 cm']],
    ['Số đo nào phù hợp nhất với chiều dài một hộp bút?', '25 cm', ['5 cm', '12 cm', '25 cm', '90 cm']],
    ['Trước khi dùng thước, em có thể đoán gần đúng độ dài của vật. Việc đó gọi là gì?', 'ước lượng', ['ước lượng', 'xem giờ', 'đếm ngày', 'so sánh số']],
    ['Sau khi ước lượng, em nên làm gì để biết số đo chính xác hơn?', 'dùng thước để đo', ['dùng thước để đo', 'xem đồng hồ', 'đếm bằng mắt', 'đổi vật khác']]
].forEach(([q, answer, choices], index) => {
    add({
        q,
        a: answer,
        c: choices,
        lesson: 'b27',
        lo: 'Ước lượng và lựa chọn số đo độ dài phù hợp với đồ vật quen thuộc',
        difficulty: index < 4 ? 'medium' : 'easy'
    });
});

[
    ['Bút chì dài 18 cm, bút sáp dài 9 cm. Bút chì dài hơn bút sáp bao nhiêu xăng-ti-mét?', '9 cm', ['7 cm', '8 cm', '9 cm', '10 cm']],
    ['Thước A dài 30 cm, thước B dài 20 cm. Thước B ngắn hơn thước A 10 cm. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Vật A dài 16 cm và vật B dài 16 cm. Hai vật dài bằng nhau. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Sợi dây dài 24 cm, cắt đi 4 cm. Phần còn lại dài bao nhiêu?', '20 cm', ['18 cm', '19 cm', '20 cm', '21 cm']]
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b28',
        lo: 'Vận dụng so sánh và tính toán đơn giản với độ dài',
        difficulty: 'medium'
    });
});

// 8. Phép cộng, phép trừ không nhớ trong phạm vi 100.
const semesterTwoAdditionOneDigit = [
    [11, 3], [20, 5], [32, 4], [41, 5], [53, 6], [60, 7], [72, 3], [84, 5],
    [90, 8], [14, 2], [23, 6], [35, 4], [46, 3], [51, 8], [67, 2], [80, 9]
];
semesterTwoAdditionOneDigit.forEach(([left, right], index) => {
    const isFillBlank = index % 4 === 0;
    add({
        q: `Tính trong phạm vi 100: ${left} + ${right} = ${isFillBlank ? '___' : '?'}`,
        a: left + right,
        type: isFillBlank ? 'fill_blank' : 'multiple_choice',
        lesson: 'b29',
        lo: 'Cộng số có hai chữ số với số có một chữ số không nhớ',
        difficulty: index < 8 ? 'easy' : 'medium'
    });
});

const semesterTwoAdditionTwoDigits = [
    [11, 22], [20, 34], [32, 15], [41, 28], [53, 24], [60, 29],
    [72, 16], [14, 25], [23, 46], [35, 44], [46, 32], [51, 18],
    [67, 12], [80, 10], [24, 30], [12, 56], [43, 25], [70, 20]
];
semesterTwoAdditionTwoDigits.forEach(([left, right], index) => {
    const isFillBlank = index % 3 === 1;
    add({
        q: `Đặt tính rồi tính: ${left} + ${right} = ${isFillBlank ? '___' : '?'}`,
        a: left + right,
        type: isFillBlank ? 'fill_blank' : 'multiple_choice',
        lesson: 'b30',
        lo: 'Cộng hai số có hai chữ số không nhớ',
        difficulty: index < 6 ? 'easy' : 'medium'
    });
});

const semesterTwoSubtractionOneDigit = [
    [16, 5], [20, 0], [34, 4], [47, 6], [58, 7], [60, 0], [72, 2], [85, 4],
    [99, 8], [13, 1], [26, 5], [39, 7], [44, 3], [57, 5], [68, 6], [91, 1]
];
semesterTwoSubtractionOneDigit.forEach(([left, right], index) => {
    const isFillBlank = index % 4 === 2;
    add({
        q: `Tính trong phạm vi 100: ${left} − ${right} = ${isFillBlank ? '___' : '?'}`,
        a: left - right,
        type: isFillBlank ? 'fill_blank' : 'multiple_choice',
        lesson: 'b31',
        lo: 'Trừ số có hai chữ số cho số có một chữ số không nhớ',
        difficulty: index < 8 ? 'easy' : 'medium'
    });
});

const semesterTwoSubtractionTwoDigits = [
    [76, 32], [52, 20], [57, 34], [68, 41], [72, 52], [95, 71],
    [60, 30], [88, 26], [49, 17], [73, 21], [84, 42], [66, 55],
    [97, 64], [54, 12], [90, 40], [38, 16], [75, 24], [63, 31]
];
semesterTwoSubtractionTwoDigits.forEach(([left, right], index) => {
    const isFillBlank = index % 3 === 0;
    add({
        q: `Đặt tính rồi tính: ${left} − ${right} = ${isFillBlank ? '___' : '?'}`,
        a: left - right,
        type: isFillBlank ? 'fill_blank' : 'multiple_choice',
        lesson: 'b32',
        lo: 'Trừ hai số có hai chữ số không nhớ',
        difficulty: index < 6 ? 'easy' : 'medium'
    });
});

[
    ['Tính nhẩm: 20 + 30 = ?', 50],
    ['Tính nhẩm: 70 − 20 = ?', 50],
    ['Tính nhẩm: 40 + 10 = ?', 50],
    ['Tính nhẩm: 90 − 40 = ?', 50],
    ['Lan có 24 nhãn vở, mẹ mua thêm 15 nhãn vở. Lan có tất cả bao nhiêu nhãn vở?', 39],
    ['Thư viện lớp có 53 quyển truyện, được tặng thêm 24 quyển. Thư viện có tất cả bao nhiêu quyển?', 77],
    ['Rổ có 68 quả, lấy ra 21 quả. Rổ còn lại bao nhiêu quả?', 47],
    ['Đội văn nghệ có 36 bạn, thêm 3 bạn tham gia. Đội có tất cả bao nhiêu bạn?', 39],
    ['Cửa hàng có 85 chiếc bút, đã bán 4 chiếc. Cửa hàng còn bao nhiêu chiếc bút?', 81],
    ['Hai lớp trồng được 42 cây và 35 cây. Cả hai lớp trồng được bao nhiêu cây?', 77]
].forEach(([q, answer], index) => {
    add({
        q,
        a: answer,
        lesson: 'b33',
        lo: index < 4
            ? 'Tính nhẩm với các số tròn chục trong phạm vi 100'
            : 'Giải bài toán một bước bằng phép cộng hoặc phép trừ không nhớ',
        difficulty: index < 4 ? 'easy' : 'medium'
    });
});

// 9. Thời gian, giờ và lịch.
[1, 3, 6, 8, 10, 12].forEach((hour, index) => {
    const hourChoices = [hour, hour === 12 ? 1 : hour + 1, hour <= 2 ? hour + 2 : hour - 1, hour <= 3 ? hour + 3 : hour - 2];
    add({
        q: `Kim phút chỉ số 12 và kim giờ chỉ số ${hour}. Đồng hồ chỉ mấy giờ?`,
        a: `${hour} giờ`,
        c: rotate(hourChoices.map((value) => `${value} giờ`), index % 4),
        lesson: 'b34',
        lo: 'Đọc giờ đúng trên đồng hồ kim'
    });
});

[
    ['Khi đồng hồ chỉ giờ đúng, kim phút chỉ vào số 12. Đúng hay sai?', 'Đúng'],
    ['Lúc 6 giờ đúng, kim giờ chỉ số 6 và kim phút chỉ số 12. Đúng hay sai?', 'Đúng']
].forEach(([q, answer]) => {
    add({
        q,
        a: answer,
        c: ['Đúng', 'Sai'],
        type: 'true_false',
        lesson: 'b34',
        lo: 'Nhận biết vị trí kim giờ và kim phút khi đồng hồ chỉ giờ đúng'
    });
});

[
    ['Một tuần lễ có bao nhiêu ngày?', '7 ngày', ['5 ngày', '6 ngày', '7 ngày', '8 ngày']],
    ['Ngày ngay sau thứ Hai là ngày nào?', 'thứ Ba', ['thứ Hai', 'thứ Ba', 'thứ Tư', 'Chủ nhật']],
    ['Ngày ngay trước thứ Tư là ngày nào?', 'thứ Ba', ['thứ Hai', 'thứ Ba', 'thứ Năm', 'thứ Sáu']],
    ['Ngày ngay sau thứ Sáu là ngày nào?', 'thứ Bảy', ['thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật']],
    ['Ngày ngay trước Chủ nhật là ngày nào?', 'thứ Bảy', ['thứ Sáu', 'thứ Bảy', 'thứ Hai', 'thứ Ba']],
    ['Nếu hôm nay là thứ Ba thì ngày mai là ngày nào?', 'thứ Tư', ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm']],
    ['Nếu hôm nay là Chủ nhật thì ngày mai là ngày nào?', 'thứ Hai', ['thứ Hai', 'thứ Bảy', 'Chủ nhật', 'thứ Sáu']]
].forEach(([q, answer, choices], index) => {
    add({
        q,
        a: answer,
        c: choices,
        lesson: 'b35',
        lo: 'Nhận biết tên và thứ tự các ngày trong tuần',
        difficulty: index < 5 ? 'easy' : 'medium'
    });
});

[
    ['Biết thứ Ba là ngày 22. Thứ Tư liền sau là ngày bao nhiêu?', 'ngày 23', ['ngày 21', 'ngày 22', 'ngày 23', 'ngày 24']],
    ['Biết thứ Ba là ngày 22. Thứ Hai liền trước là ngày bao nhiêu?', 'ngày 21', ['ngày 20', 'ngày 21', 'ngày 22', 'ngày 23']],
    ['Tờ lịch ghi ngày 7, thứ Hai. Ngày 8 là thứ mấy?', 'thứ Ba', ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm']],
    ['Tờ lịch ghi ngày 7, thứ Hai. Ngày 9 là thứ mấy?', 'thứ Tư', ['thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu']],
    ['Ngày 24 là thứ Tư. Ngày 25 là thứ mấy?', 'thứ Năm', ['thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu']],
    ['Trên tờ lịch, số lớn ở giữa thường cho biết điều gì?', 'ngày trong tháng', ['ngày trong tháng', 'giờ', 'độ dài', 'số chục']],
    ['Muốn biết hôm nay là ngày nào và thứ mấy, em nên xem gì?', 'lịch', ['lịch', 'thước', 'cân', 'hộp bút']]
].forEach(([q, answer, choices], index) => {
    add({
        q,
        a: answer,
        c: choices,
        lesson: 'b36',
        lo: 'Đọc ngày, thứ và xác định ngày liền trước, liền sau trên lịch',
        difficulty: index < 2 ? 'medium' : 'easy'
    });
});

[
    ['Kim phút chỉ số 12, kim giờ chỉ số 9. Đồng hồ chỉ 9 giờ. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Nếu hôm nay là thứ Năm thì hai ngày sau là ngày nào?', 'thứ Bảy', ['thứ Sáu', 'thứ Bảy', 'Chủ nhật', 'thứ Hai']],
    ['Ngày 14 là thứ Hai. Ngày 15 là thứ Ba. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Đồng hồ chỉ 7 giờ đúng thì kim phút phải chỉ số nào?', 'số 12', ['số 6', 'số 7', 'số 11', 'số 12']]
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b37',
        lo: 'Củng cố xem giờ đúng và xác định ngày trong tuần',
        difficulty: 'medium'
    });
});

// 10. Ôn tập cuối năm.
[
    ['Sắp xếp các số 8, 3, 10, 6 từ bé đến lớn.', '3, 6, 8, 10', ['3, 6, 8, 10', '10, 8, 6, 3', '3, 8, 6, 10', '6, 3, 8, 10']],
    ['Có 9 viên bi, cho bạn 4 viên rồi được tặng thêm 2 viên. Cuối cùng có bao nhiêu viên bi?', '7', ['5', '6', '7', '8']],
    ['Số 7 lớn hơn 5 và bé hơn 9. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Điền số thích hợp: 10 − ___ = 3.', '7', ['5', '6', '7', '8'], 'fill_blank']
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b38',
        lo: 'Ôn tập số và phép tính trong phạm vi 10',
        difficulty: 'medium'
    });
});

[
    ['Số 35 gồm mấy chục và mấy đơn vị?', '3 chục và 5 đơn vị', ['3 chục và 5 đơn vị', '5 chục và 3 đơn vị', '3 chục và 0 đơn vị', '5 chục và 0 đơn vị']],
    ['Số bốn mươi tư được viết là số nào?', '44', ['40', '44', '54', '64']],
    ['Trong các số 61, 16, 60, 66, số nào lớn nhất?', '66', ['16', '60', '61', '66']],
    ['Điền số thích hợp: 54 + ___ = 58.', '4', ['2', '3', '4', '5'], 'fill_blank'],
    ['Điền số thích hợp: 76 − ___ = 70.', '6', ['4', '5', '6', '7'], 'fill_blank'],
    ['Phép tính 42 + 35 có kết quả bằng 77. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Phép tính 89 − 24 có kết quả bằng 65. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Một hộp có 32 bút xanh và 16 bút đỏ. Hộp có tất cả bao nhiêu chiếc bút?', '48', ['46', '47', '48', '49']]
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b39',
        lo: 'Ôn tập số và phép tính không nhớ trong phạm vi 100',
        difficulty: 'medium'
    });
});

[
    ['Mặt đồng hồ hình tròn thuộc loại hình phẳng nào?', 'hình tròn', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật']],
    ['Viên xúc xắc thường có dạng khối nào?', 'khối lập phương', ['khối lập phương', 'khối hộp chữ nhật', 'hình vuông', 'hình tròn']],
    ['Hộp bánh dài thường có dạng khối nào?', 'khối hộp chữ nhật', ['khối lập phương', 'khối hộp chữ nhật', 'hình tam giác', 'hình tròn']],
    ['Đoạn dây dài 28 cm, cắt đi 6 cm. Đoạn dây còn lại dài bao nhiêu?', '22 cm', ['20 cm', '21 cm', '22 cm', '23 cm']],
    ['Hình tam giác có ba góc. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false'],
    ['Khi đo bằng thước xăng-ti-mét, một đầu vật cần đặt tại vạch số 0. Đúng hay sai?', 'Đúng', ['Đúng', 'Sai'], 'true_false']
].forEach(([q, answer, choices, type = 'multiple_choice']) => {
    add({
        q,
        a: answer,
        c: choices,
        type,
        lesson: 'b40',
        lo: 'Ôn tập hình phẳng, hình khối và đo độ dài',
        difficulty: 'medium'
    });
});

[
    ['Sắp xếp các số 48, 25, 42, 74 từ bé đến lớn.', '25, 42, 48, 74', ['25, 42, 48, 74', '74, 48, 42, 25', '25, 48, 42, 74', '42, 25, 48, 74']],
    ['Đặt tính rồi tính: 42 + 56 = ?', '98', ['88', '96', '98', '100']],
    ['Đặt tính rồi tính: 69 − 63 = ?', '6', ['4', '5', '6', '7']],
    ['Kim phút chỉ số 12, kim giờ chỉ số 4. Đồng hồ chỉ mấy giờ?', '4 giờ', ['3 giờ', '4 giờ', '5 giờ', '12 giờ']]
].forEach(([q, answer, choices]) => {
    add({
        q,
        a: answer,
        c: choices,
        lesson: 'b41',
        lo: 'Ôn tập tổng hợp số, phép tính và xem giờ',
        difficulty: 'medium'
    });
});

if (semesterTwoStartIndex !== 200 || questions.length - semesterTwoStartIndex !== 200) {
    throw new Error(`Unexpected question count: semester I=${semesterTwoStartIndex}, semester II=${questions.length - semesterTwoStartIndex}`);
}

const normalizedQuestions = new Set();
for (const [index, question] of questions.entries()) {
    const normalized = question.q.normalize('NFC').toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
    if (normalizedQuestions.has(normalized)) throw new Error(`Duplicate question at index ${index}: ${question.q}`);
    normalizedQuestions.add(normalized);
    if (!question.c.includes(question.a)) throw new Error(`Answer missing from choices at index ${index}`);
    if (new Set(question.c).size !== question.c.length) throw new Error(`Duplicate choice at index ${index}`);
    if (!question.lo || !question.sourceRef || !question.sourcePage) throw new Error(`Missing curriculum metadata at index ${index}`);
}

fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(questions, null, 2)}\n`, 'utf8');

const summary = questions.reduce((result, question) => {
    const lesson = question.lo.split(' – ')[0];
    result.byType[question.type] = (result.byType[question.type] || 0) + 1;
    result.byDifficulty[question.difficulty] = (result.byDifficulty[question.difficulty] || 0) + 1;
    result.byLesson[lesson] = (result.byLesson[lesson] || 0) + 1;
    return result;
}, { total: questions.length, byType: {}, byDifficulty: {}, byLesson: {} });

console.log(JSON.stringify(summary, null, 2));
