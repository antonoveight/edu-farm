const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GRADE_DIR = path.join(ROOT, 'src', 'data', 'grade1');

const BOOKS = {
    english: {
        name: 'SGK Tiếng Anh 1 – Global Success',
        file: 'sgk-tieng-anh-lop-1-thong-nhat-tu-nam-2026_107202616.pdf'
    },
    viet1: {
        name: 'SGK Tiếng Việt 1, Tập một – Kết nối tri thức với cuộc sống',
        file: 'sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-1_107202616.pdf'
    },
    viet2: {
        name: 'SGK Tiếng Việt 1, Tập hai – Kết nối tri thức với cuộc sống',
        file: 'sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-2_107202616.pdf'
    },
    science: {
        name: 'SGK Tự nhiên và Xã hội 1 – Kết nối tri thức với cuộc sống',
        file: 'sgk-tu-nhien-va-xa-hoi-lop-1-thong-nhat-tu-nam-2026_107202616.pdf'
    }
};

function rotate(values, amount) {
    const offset = amount % values.length;
    return [...values.slice(offset), ...values.slice(0, offset)];
}

function createBank(subject) {
    const questions = [];

    function add({
        q,
        a,
        c = [],
        type = 'multiple_choice',
        lo,
        difficulty = 'easy',
        book,
        page,
        lesson,
        sentence,
        words,
        explanation,
        hints
    }) {
        const answer = String(a).normalize('NFC').trim();
        let choices = c.map((choice) => String(choice).normalize('NFC').trim());
        if (['multiple_choice', 'fill_blank', 'true_false'].includes(type)) {
            choices = [...new Set([answer, ...choices])];
            if (type === 'true_false') choices = ['Đúng', 'Sai'];
            if (choices.length < 2) throw new Error(`Not enough choices: ${q}`);
            choices = rotate(choices, questions.length % choices.length);
        }

        const item = {
            q: q.normalize('NFC').trim(),
            a: answer,
            c: choices,
            type,
            ...(sentence ? { sentence: sentence.normalize('NFC').trim() } : {}),
            ...(words ? { words } : {}),
            lo: `${lesson} – ${lo}`,
            difficulty,
            status: 'published',
            sourceType: 'book',
            sourceRef: `${book.name} (${book.file}) – ${lesson}`,
            sourcePage: page,
            explanation: explanation || `Đáp án đúng là “${answer}”.`,
            hints: hints || []
        };
        questions.push(item);
    }

    return { subject, questions, add };
}

function writeBank(fileName, bank) {
    const normalized = bank.map((item) => ({ ...item, q: item.q.normalize('NFC') }));
    const prompts = normalized.map(({ q }) => q.toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim());
    if (new Set(prompts).size !== prompts.length) {
        const duplicates = prompts.filter((prompt, index) => prompts.indexOf(prompt) !== index);
        throw new Error(`${fileName} contains duplicate prompts: ${[...new Set(duplicates)].join(' | ')}`);
    }
    fs.writeFileSync(
        path.join(GRADE_DIR, fileName),
        `${JSON.stringify(normalized, null, 2)}\n`,
        'utf8'
    );
    console.log(`${fileName}: ${normalized.length} questions`);
}

function buildEnglishBank() {
    const { questions, add } = createBank('english');
    const distractorWords = ['ball', 'cake', 'apple', 'desk', 'fish', 'pen', 'garden', 'hair', 'clock', 'mango', 'bus', 'lake', 'banana', 'tiger', 'face', 'water'];
    const units = [
        { unit: 1, title: 'In the school playground', phonics: 'Bb', page: 6, words: [['ball', 'quả bóng'], ['bike', 'xe đạp'], ['book', 'quyển sách']], pattern: 'Hi, I’m Bill.', fill: ['Hi, ___ Bill.', 'I’m', ['I have', 'This is', 'Bye']] },
        { unit: 2, title: 'In the dining room', phonics: 'Cc', page: 9, words: [['cake', 'bánh ngọt'], ['car', 'ô tô'], ['cat', 'con mèo'], ['cup', 'cái cốc']], pattern: 'I have a car.', fill: ['I ___ a car.', 'have', ['am', 'see', 'like']] },
        { unit: 3, title: 'At the street market', phonics: 'Aa', page: 14, words: [['apple', 'quả táo'], ['bag', 'cái túi'], ['can', 'cái lon'], ['hat', 'cái mũ']], pattern: 'This is my bag.', fill: ['This is my ___.', 'bag', ['bike', 'book', 'bell']] },
        { unit: 4, title: 'In the bedroom', phonics: 'Dd', page: 17, words: [['desk', 'cái bàn'], ['dog', 'con chó'], ['door', 'cánh cửa'], ['duck', 'con vịt']], pattern: 'This is a dog.', fill: ['This is a ___.', 'dog', ['goat', 'cat', 'fish']] },
        { unit: 5, title: 'At the fish and chip shop', phonics: 'Ii', page: 23, words: [['chicken', 'thịt gà'], ['chips', 'khoai tây chiên'], ['fish', 'cá'], ['milk', 'sữa']], pattern: 'I like milk.', fill: ['I ___ milk.', 'like', ['have', 'see', 'touch']] },
        { unit: 6, title: 'In the classroom', phonics: 'Ee', page: 26, words: [['bell', 'cái chuông'], ['pen', 'bút mực'], ['pencil', 'bút chì'], ['red', 'màu đỏ']], pattern: 'It’s a red pen.', fill: ['It’s a ___ pen.', 'red', ['blue', 'green', 'black']] },
        { unit: 7, title: 'In the garden', phonics: 'Gg', page: 31, words: [['garden', 'khu vườn'], ['gate', 'cổng'], ['girl', 'bé gái'], ['goat', 'con dê']], pattern: 'There’s a garden.', fill: ['There’s a ___.', 'garden', ['classroom', 'bedroom', 'shop']] },
        { unit: 8, title: 'In the park', phonics: 'Hh', page: 34, words: [['hair', 'tóc'], ['hand', 'bàn tay'], ['head', 'đầu'], ['horse', 'con ngựa']], pattern: 'Touch your hair.', fill: ['Touch your ___.', 'hair', ['car', 'cake', 'book']] },
        { unit: 9, title: 'In the shop', phonics: 'Oo', page: 40, words: [['clocks', 'những chiếc đồng hồ'], ['locks', 'những ổ khoá'], ['mops', 'những cây lau nhà'], ['pots', 'những cái nồi']], pattern: 'How many clocks? Two.', fill: ['How many clocks? ___.', 'Two', ['Red', 'Milk', 'Run']] },
        { unit: 10, title: 'At the zoo', phonics: 'Mm', page: 43, words: [['mango', 'quả xoài'], ['monkey', 'con khỉ'], ['mother', 'mẹ'], ['mouse', 'con chuột']], pattern: 'That’s a monkey.', fill: ['That’s a ___.', 'monkey', ['tiger', 'goat', 'duck']] },
        { unit: 11, title: 'At the bus stop', phonics: 'Uu', page: 48, words: [['bus', 'xe buýt'], ['run', 'chạy'], ['sun', 'mặt trời'], ['truck', 'xe tải']], pattern: 'She’s running. He’s running.', fill: ['She’s ___.', 'running', ['washing', 'sleeping', 'eating']] },
        { unit: 12, title: 'At the lake', phonics: 'Ll', page: 51, words: [['lake', 'hồ nước'], ['leaf', 'chiếc lá'], ['lemons', 'những quả chanh']], pattern: 'Look at the lemons.', fill: ['Look at the ___.', 'lemons', ['books', 'clocks', 'nuts']] },
        { unit: 13, title: 'In the school canteen', phonics: 'Nn', page: 57, words: [['bananas', 'những quả chuối'], ['noodles', 'mì'], ['nuts', 'các loại hạt']], pattern: 'She’s having noodles.', fill: ['She’s having ___.', 'noodles', ['water', 'milk', 'cake']] },
        { unit: 14, title: 'In the toy shop', phonics: 'Tt', page: 60, words: [['teddy bear', 'gấu bông'], ['tiger', 'con hổ'], ['top', 'con quay'], ['turtle', 'con rùa']], pattern: 'I can see a tiger.', fill: ['I can see a ___.', 'tiger', ['mouse', 'duck', 'goat']] },
        { unit: 15, title: 'At the football match', phonics: 'Ff', page: 65, words: [['face', 'khuôn mặt'], ['father', 'bố'], ['foot', 'bàn chân'], ['football', 'bóng đá']], pattern: 'Point to your hand.', fill: ['Point to your ___.', 'hand', ['car', 'milk', 'garden']] },
        { unit: 16, title: 'At home', phonics: 'Ww', page: 68, words: [['wash', 'rửa'], ['water', 'nước'], ['window', 'cửa sổ']], pattern: 'How many windows can you see? I can see six.', fill: ['I can see ___ windows.', 'six', ['red', 'run', 'milk']] }
    ];

    for (const spec of units) {
        const lesson = `Unit ${spec.unit}: ${spec.title}`;
        const unitWords = spec.words.map(([word]) => word);
        add({
            q: `Chữ cái nào sau đây xuất hiện trong bài học (${spec.title})?`,
            a: spec.phonics,
            c: [spec.phonics, ...units.filter((unit) => unit.unit !== spec.unit).slice(spec.unit % 5, spec.unit % 5 + 3).map((unit) => unit.phonics)],
            lo: `Nhận biết âm và chữ ${spec.phonics}`,
            book: BOOKS.english,
            page: spec.page,
            lesson,
            explanation: `Book map của Unit ${spec.unit} xác định nội dung phonics là ${spec.phonics}.`
        });

        for (const [word, meaning] of spec.words) {
            const otherWords = [...unitWords.filter((item) => item !== word), ...distractorWords.filter((item) => !unitWords.includes(item))];
            add({
                q: `Từ tiếng Anh nào có nghĩa là “${meaning}”?`,
                a: word,
                c: [word, ...otherWords.slice(0, 3)],
                lo: `Nhận biết từ vựng ${word}`,
                book: BOOKS.english,
                page: spec.page,
                lesson,
                explanation: `Trong Unit ${spec.unit}, “${word}” được minh hoạ với nghĩa “${meaning}”.`,
                hints: [`Từ cần tìm thuộc nhóm từ vựng của Unit ${spec.unit}.`]
            });
        }

        add({
            q: `Hoàn thành câu sau: ${spec.fill[0]}`,
            a: spec.fill[1],
            c: spec.fill[2],
            type: 'fill_blank',
            sentence: spec.fill[0],
            lo: `Sử dụng mẫu câu “${spec.pattern}”`,
            difficulty: 'medium',
            book: BOOKS.english,
            page: spec.page,
            lesson,
            explanation: `Mẫu câu trọng tâm của Unit ${spec.unit} là “${spec.pattern}”.`
        });

        add({
            q: `Bé hãy gõ lại từ tiếng Anh “${spec.words[0][0]}”:`,
            a: spec.words[0][0],
            c: [],
            type: 'typing',
            lo: `Nhìn và gõ đúng từ ${spec.words[0][0]}`,
            difficulty: 'medium',
            book: BOOKS.english,
            page: spec.page,
            lesson
        });

        add({
            q: `Mẫu câu tiếng Anh nào dùng trong chủ đề “${spec.title}”?`,
            a: spec.pattern,
            c: [spec.pattern, ...units.filter((unit) => unit.unit !== spec.unit).slice((spec.unit + 3) % 8, (spec.unit + 3) % 8 + 3).map((unit) => unit.pattern)],
            lo: `Nhận biết mẫu câu giao tiếp của Unit ${spec.unit}`,
            difficulty: 'medium',
            book: BOOKS.english,
            page: spec.page,
            lesson
        });
    }

    return questions;
}

function buildScienceBank() {
    const { questions, add } = createBank('science');
    const lessons = [
        { n: 1, title: 'Kể về gia đình', page: 6, facts: [
            ['Những người cùng chung sống và yêu thương nhau tạo thành gì?', 'gia đình', ['lớp học', 'khu phố', 'đội bóng']],
            ['Việc nào thể hiện sự quan tâm giữa các thành viên gia đình?', 'Hỏi thăm và giúp đỡ nhau', ['Tranh giành đồ dùng', 'Không nói chuyện với nhau', 'Vứt đồ bừa bãi']],
            ['Khi giới thiệu gia đình, em nên nói điều gì?', 'Tên và mối quan hệ của từng người', ['Giá tiền đồ dùng', 'Biển số xe', 'Mật khẩu điện thoại']],
            ['Mọi người trong gia đình cần đối xử với nhau như thế nào?', 'Yêu thương và chia sẻ', ['Lạnh nhạt', 'Giành phần hơn', 'Không quan tâm']]
        ]},
        { n: 2, title: 'Ngôi nhà của em', page: 10, facts: [
            ['Ngôi nhà là nơi để gia đình làm gì?', 'Sinh sống và sum họp', ['Chỉ để đồ chơi', 'Chỉ để xe', 'Chỉ để bán hàng']],
            ['Phòng nào thường là nơi cả nhà cùng trò chuyện?', 'Phòng khách', ['Phòng tắm', 'Nhà kho', 'Ban công']],
            ['Việc nào giúp ngôi nhà sạch đẹp?', 'Quét dọn và sắp xếp đồ gọn gàng', ['Vẽ bẩn lên tường', 'Vứt rác xuống sàn', 'Để đồ chắn lối đi']],
            ['Nhà ở nông thôn và thành phố có thể như thế nào?', 'Có hình dạng và cách xây dựng khác nhau', ['Luôn giống hệt nhau', 'Đều không có cửa', 'Đều chỉ có một phòng']]
        ]},
        { n: 3, title: 'Đồ dùng trong nhà', page: 14, facts: [
            ['Đồ dùng nào thường dùng để nấu cơm?', 'Nồi cơm điện', ['Quạt điện', 'Ti vi', 'Đồng hồ']],
            ['Đồ dùng nào giúp bảo quản thức ăn lạnh?', 'Tủ lạnh', ['Bàn học', 'Giá sách', 'Chổi']],
            ['Sau khi dùng đồ vật trong nhà, em nên làm gì?', 'Đặt lại đúng chỗ', ['Để giữa lối đi', 'Ném xuống sàn', 'Giấu đi']],
            ['Đồ dùng trong nhà cần được sử dụng như thế nào?', 'Đúng công dụng và cẩn thận', ['Tuỳ ý tháo lắp', 'Dùng làm đồ chơi', 'Làm rơi nhiều lần']]
        ]},
        { n: 4, title: 'An toàn khi sử dụng đồ dùng trong nhà', page: 18, facts: [
            ['Em có được chạm tay ướt vào ổ điện không?', 'Không', ['Có', 'Chỉ khi ở một mình', 'Chỉ vào ban đêm']],
            ['Khi thấy dây điện bị hở, em cần làm gì?', 'Báo ngay cho người lớn', ['Tự nối lại', 'Sờ thử', 'Đổ nước vào']],
            ['Dao và kéo cần được sử dụng khi nào?', 'Khi có người lớn hướng dẫn', ['Khi đang chạy', 'Khi đùa nghịch', 'Khi ở một mình']],
            ['Để tránh bị bỏng, em không nên làm gì?', 'Tự ý chạm vào đồ đang nóng', ['Đứng xa bếp', 'Nhờ người lớn giúp', 'Dùng đồ bảo vệ']]
        ]},
        { n: 5, title: 'Ôn tập chủ đề Gia đình', page: 22, facts: [
            ['Việc nào vừa giúp gia đình vừa phù hợp với học sinh lớp 1?', 'Xếp đồ chơi gọn gàng', ['Sửa ổ điện', 'Dùng dao lớn', 'Leo lên mái nhà']],
            ['Khi có người lạ gọi cửa lúc ở nhà một mình, em nên làm gì?', 'Không mở cửa và gọi người lớn', ['Mở cửa ngay', 'Đi theo người lạ', 'Cho biết em ở một mình']],
            ['Đâu là nơi sum họp của các thành viên?', 'Ngôi nhà', ['Lòng đường', 'Công trường', 'Bến xe']],
            ['Hành động nào giữ an toàn trong nhà?', 'Đi lại cẩn thận và cất đồ đúng chỗ', ['Chạy trên nền ướt', 'Chơi gần bếp lửa', 'Nghịch ổ điện']]
        ]},
        { n: 6, title: 'Lớp học của em', page: 24, facts: [
            ['Ai là người hướng dẫn học sinh học tập ở lớp?', 'Thầy giáo hoặc cô giáo', ['Bác tài xế', 'Người bán hàng', 'Thợ xây']],
            ['Đồ dùng nào thường có trong lớp học?', 'Bảng và bàn ghế', ['Bếp ga', 'Giường ngủ', 'Bồn tắm']],
            ['Để lớp học sạch đẹp, học sinh cần làm gì?', 'Giữ vệ sinh và sắp xếp đồ dùng', ['Vứt giấy xuống sàn', 'Vẽ lên bàn', 'Bẻ đồ dùng']],
            ['Khi bạn phát biểu, em nên làm gì?', 'Lắng nghe', ['Nói chen', 'Chạy ra ngoài', 'Gây ồn']]
        ]},
        { n: 7, title: 'Cùng khám phá trường học', page: 30, facts: [
            ['Nơi nào trong trường dùng để đọc và mượn sách?', 'Thư viện', ['Nhà bếp', 'Bãi xe', 'Cổng trường']],
            ['Nơi học sinh tập thể dục và vui chơi thường là đâu?', 'Sân trường', ['Phòng y tế', 'Văn phòng', 'Nhà kho']],
            ['Khi tham quan trường, em cần làm gì?', 'Đi theo hướng dẫn và giữ trật tự', ['Tự ý tách nhóm', 'Chạy vào nơi nguy hiểm', 'La hét']],
            ['Phòng y tế của trường có công dụng gì?', 'Chăm sóc sức khoẻ ban đầu', ['Nấu ăn', 'Bán sách', 'Cất xe']]
        ]},
        { n: 8, title: 'Cùng vui ở trường', page: 36, facts: [
            ['Hoạt động nào phù hợp trong giờ ra chơi?', 'Chơi trò chơi an toàn cùng bạn', ['Xô đẩy trên cầu thang', 'Leo qua lan can', 'Ném đá']],
            ['Khi chơi cùng bạn, em cần làm gì?', 'Tuân thủ luật chơi và đoàn kết', ['Gian lận', 'Tranh giành', 'Chế giễu bạn']],
            ['Nếu bạn bị ngã trong sân trường, em nên làm gì?', 'Đỡ bạn và báo người lớn', ['Bỏ đi', 'Cười bạn', 'Giấu sự việc']],
            ['Hoạt động chung ở trường giúp học sinh thế nào?', 'Vui vẻ và gắn bó hơn', ['Dễ gây gổ hơn', 'Không cần hợp tác', 'Không cần lắng nghe']]
        ]},
        { n: 9, title: 'Ôn tập chủ đề Trường học', page: 40, facts: [
            ['Khi lên xuống cầu thang ở trường, em cần làm gì?', 'Đi theo hàng và không xô đẩy', ['Chạy thật nhanh', 'Trượt trên tay vịn', 'Chen lấn']],
            ['Ai cùng học tập với em trong lớp?', 'Các bạn học sinh', ['Khách du lịch', 'Người bán hàng', 'Hành khách']],
            ['Việc nào thể hiện yêu trường lớp?', 'Giữ gìn bàn ghế và cây xanh', ['Bẻ cành cây', 'Vẽ bẩn lên tường', 'Làm hỏng sách']],
            ['Khi nghe trống báo vào lớp, em cần làm gì?', 'Nhanh chóng xếp hàng vào lớp', ['Tiếp tục chạy chơi', 'Ra khỏi trường', 'Trốn sau cây']]
        ]},
        { n: 10, title: 'Cùng khám phá quang cảnh xung quanh', page: 42, facts: [
            ['Quang cảnh nơi em sống có thể gồm những gì?', 'Nhà cửa, đường sá và cây cối', ['Chỉ có đồ chơi', 'Chỉ có sách vở', 'Chỉ có quần áo']],
            ['Đâu là cảnh vật tự nhiên?', 'Cây và dòng sông', ['Cầu và đường', 'Nhà và chợ', 'Xe và cột điện']],
            ['Đâu là công trình do con người xây dựng?', 'Con đường', ['Ngọn núi', 'Dòng sông', 'Cây rừng']],
            ['Để nơi ở sạch đẹp, mọi người cần làm gì?', 'Bỏ rác đúng nơi và bảo vệ cây xanh', ['Vứt rác xuống sông', 'Bẻ cây', 'Viết bẩn lên tường']]
        ]},
        { n: 11, title: 'Con người nơi em sống', page: 46, facts: [
            ['Người nông dân thường làm công việc gì?', 'Trồng trọt và chăn nuôi', ['Lái máy bay', 'Khám bệnh', 'Dạy học']],
            ['Người bán hàng làm việc chủ yếu ở đâu?', 'Cửa hàng hoặc chợ', ['Trên đồng ruộng', 'Trong buồng lái', 'Ở trạm vũ trụ']],
            ['Mỗi nghề nghiệp trong cộng đồng có ý nghĩa thế nào?', 'Đều góp phần phục vụ cuộc sống', ['Chỉ một nghề là cần thiết', 'Không liên quan đến nhau', 'Đều giống nhau']],
            ['Khi giao tiếp với người xung quanh, em nên làm gì?', 'Lễ phép và thân thiện', ['Nói trống không', 'Chế giễu', 'Gây ồn']]
        ]},
        { n: 12, title: 'Vui đón Tết', page: 50, facts: [
            ['Tết cổ truyền là dịp gia đình thường làm gì?', 'Sum họp và chúc nhau điều tốt đẹp', ['Không gặp nhau', 'Vứt bỏ đồ dùng', 'Đóng cửa cả ngày']],
            ['Hoa nào thường được nhắc đến trong ngày Tết ở miền Bắc?', 'Hoa đào', ['Hoa sen', 'Hoa phượng', 'Hoa súng']],
            ['Khi nhận lời chúc Tết, em nên làm gì?', 'Cảm ơn và chúc lại lễ phép', ['Im lặng bỏ đi', 'Đòi quà', 'Nói trống không']],
            ['Việc nào giúp đón Tết an toàn?', 'Thực hiện theo hướng dẫn của người lớn', ['Tự đốt pháo', 'Chơi gần bếp lửa', 'Chạy ra lòng đường']]
        ]},
        { n: 13, title: 'An toàn trên đường', page: 54, facts: [
            ['Người đi bộ nên đi ở đâu khi đường có vỉa hè?', 'Trên vỉa hè', ['Giữa lòng đường', 'Sát xe đang chạy', 'Trên dải phân cách']],
            ['Khi qua đường, trẻ em nên làm gì?', 'Đi cùng người lớn và quan sát xe', ['Chạy qua bất ngờ', 'Vừa đi vừa chơi', 'Qua ở chỗ khuất']],
            ['Ngồi trên xe máy, em cần đội gì?', 'Mũ bảo hiểm đúng cách', ['Mũ len', 'Mũ giấy', 'Mũ đồ chơi']],
            ['Đèn đỏ dành cho người và xe tham gia giao thông báo hiệu gì?', 'Dừng lại', ['Đi nhanh', 'Rẽ tự do', 'Bấm còi']]
        ]},
        { n: 14, title: 'Ôn tập chủ đề Cộng đồng địa phương', page: 58, facts: [
            ['Công việc nào giúp giữ đường phố sạch?', 'Thu gom rác đúng nơi', ['Xả rác', 'Đổ nước bẩn ra đường', 'Bẻ cây']],
            ['Khi đến nơi công cộng, em cần làm gì?', 'Giữ trật tự và vệ sinh', ['La hét', 'Chen lấn', 'Vẽ bẩn']],
            ['Biển báo và đèn giao thông giúp ích gì?', 'Hướng dẫn đi lại an toàn', ['Trang trí đường', 'Che nắng', 'Phát nhạc']],
            ['Việc nào thể hiện tôn trọng người lao động?', 'Chào hỏi và giữ gìn thành quả lao động', ['Chê bai nghề nghiệp', 'Làm hỏng đồ công cộng', 'Gây cản trở']]
        ]},
        { n: 15, title: 'Cây xung quanh em', page: 60, facts: [
            ['Cây thường có những bộ phận chính nào?', 'Rễ, thân, lá, hoa và quả', ['Đầu, mình và chân', 'Cánh, mỏ và đuôi', 'Bàn, ghế và tủ']],
            ['Bộ phận nào giúp cây hút nước từ đất?', 'Rễ', ['Hoa', 'Quả', 'Lá']],
            ['Cây có thể sống ở đâu?', 'Trên cạn hoặc dưới nước', ['Chỉ trong nhà', 'Chỉ trên mái', 'Chỉ trong hộp']],
            ['Lợi ích nào của cây xanh là đúng?', 'Cho bóng mát và làm không khí trong lành', ['Làm đường trơn', 'Gây tiếng còi', 'Làm hỏng sách']]
        ]},
        { n: 16, title: 'Chăm sóc và bảo vệ cây trồng', page: 66, facts: [
            ['Việc nào giúp cây trồng phát triển?', 'Tưới nước vừa đủ', ['Bẻ cành', 'Giẫm lên cây', 'Nhổ cây']],
            ['Vì sao cần làm cỏ quanh gốc cây?', 'Để cây có đủ chất dinh dưỡng và không gian sống', ['Để đất khô hơn', 'Để bẻ rễ cây', 'Để cây mất lá']],
            ['Hành động nào bảo vệ cây?', 'Không hái hoa và bẻ cành', ['Khắc tên lên thân cây', 'Giẫm lên bồn cây', 'Vặt lá']],
            ['Khi thấy cây bị sâu bệnh, em nên làm gì?', 'Báo người lớn để chăm sóc đúng cách', ['Tự dùng hoá chất', 'Đốt cây', 'Bỏ mặc']]
        ]},
        { n: 17, title: 'Con vật quanh em', page: 70, facts: [
            ['Con vật thường có những bộ phận nào?', 'Đầu, mình và cơ quan di chuyển', ['Rễ, thân và lá', 'Bàn, ghế và tủ', 'Mây, mưa và nắng']],
            ['Con cá di chuyển chủ yếu bằng gì?', 'Vây và đuôi', ['Cánh', 'Chân có móng', 'Rễ']],
            ['Con chim di chuyển trên không chủ yếu bằng gì?', 'Cánh', ['Vây', 'Rễ', 'Lá']],
            ['Con vật có thể sống ở đâu?', 'Nhiều môi trường khác nhau', ['Chỉ trong nhà', 'Chỉ trên cây', 'Chỉ dưới nước']]
        ]},
        { n: 18, title: 'Chăm sóc và bảo vệ vật nuôi', page: 76, facts: [
            ['Vật nuôi cần được cung cấp gì?', 'Thức ăn, nước uống và nơi ở phù hợp', ['Chỉ đồ chơi', 'Chỉ ánh đèn', 'Không cần gì']],
            ['Khi vật nuôi bị ốm, em nên làm gì?', 'Báo người lớn hoặc bác sĩ thú y', ['Tự cho thuốc lạ', 'Xua đuổi', 'Bỏ đói']],
            ['Việc nào thể hiện yêu quý vật nuôi?', 'Chăm sóc nhẹ nhàng và giữ vệ sinh', ['Đánh đập', 'Trêu chọc', 'Kéo đuôi']],
            ['Sau khi tiếp xúc với vật nuôi, em cần làm gì?', 'Rửa tay sạch', ['Dụi mắt ngay', 'Cầm thức ăn ngay', 'Không cần làm gì']]
        ]},
        { n: 19, title: 'Ôn tập chủ đề Thực vật và động vật', page: 80, facts: [
            ['Điểm khác nhau cơ bản giữa cây và con vật là gì?', 'Cây có rễ, thân, lá; con vật có cơ quan di chuyển', ['Cả hai đều có bánh xe', 'Cả hai đều có bàn ghế', 'Không có điểm khác']],
            ['Việc nào cùng bảo vệ cả cây và con vật?', 'Giữ môi trường sống sạch', ['Phá tổ', 'Bẻ cành', 'Xả rác']],
            ['Cây và con vật đều cần gì để sống?', 'Nước và môi trường phù hợp', ['Đồ chơi điện tử', 'Bút chì', 'Ti vi']],
            ['Không nên làm gì với sinh vật quanh em?', 'Phá hoại nơi sống của chúng', ['Quan sát nhẹ nhàng', 'Chăm sóc đúng cách', 'Giữ vệ sinh môi trường']]
        ]},
        { n: 20, title: 'Cơ thể em', page: 82, facts: [
            ['Cơ thể người gồm ba phần chính nào?', 'Đầu, mình và các chi', ['Rễ, thân và lá', 'Cánh, mỏ và đuôi', 'Bàn, ghế và tủ']],
            ['Tay và chân thuộc phần nào của cơ thể?', 'Các chi', ['Đầu', 'Tóc', 'Mắt']],
            ['Bộ phận nào giúp em cầm nắm?', 'Bàn tay', ['Bàn chân', 'Tai', 'Mũi']],
            ['Để cơ thể sạch sẽ, em cần làm gì?', 'Tắm rửa và thay quần áo sạch', ['Mặc đồ bẩn', 'Không rửa tay', 'Ít đánh răng']]
        ]},
        { n: 21, title: 'Các giác quan của cơ thể', page: 88, facts: [
            ['Mắt giúp em nhận biết điều gì?', 'Hình dạng và màu sắc', ['Mùi', 'Vị', 'Âm thanh']],
            ['Tai giúp em làm gì?', 'Nghe âm thanh', ['Nhìn màu sắc', 'Nếm thức ăn', 'Ngửi mùi']],
            ['Mũi giúp em nhận biết gì?', 'Mùi', ['Âm thanh', 'Màu sắc', 'Độ dài']],
            ['Lưỡi giúp em nhận biết gì?', 'Vị của thức ăn', ['Tiếng động', 'Ánh sáng', 'Hình dạng']]
        ]},
        { n: 22, title: 'Ăn, uống hằng ngày', page: 94, facts: [
            ['Vì sao cần ăn đủ bữa?', 'Để cơ thể có năng lượng và phát triển', ['Để không cần ngủ', 'Để không cần vận động', 'Để thức khuya']],
            ['Nước uống hằng ngày cần như thế nào?', 'Sạch và an toàn', ['Có màu lạ', 'Lấy ở bất cứ vũng nào', 'Để lâu không đậy']],
            ['Trước khi ăn, em cần làm gì?', 'Rửa tay sạch', ['Chơi với đất', 'Dụi mắt', 'Cầm rác']],
            ['Nhóm thức ăn nào nên được dùng đa dạng?', 'Nhiều loại thực phẩm phù hợp', ['Chỉ bánh kẹo', 'Chỉ nước ngọt', 'Chỉ đồ chiên']]
        ]},
        { n: 23, title: 'Vận động và nghỉ ngơi', page: 98, facts: [
            ['Vận động hằng ngày giúp cơ thể thế nào?', 'Khoẻ mạnh và nhanh nhẹn', ['Mệt mãi', 'Không cần ngủ', 'Không cần ăn']],
            ['Học sinh lớp 1 cần ngủ như thế nào?', 'Đủ giấc và đúng giờ', ['Thức thật khuya', 'Ngủ rất ít', 'Vừa ngủ vừa xem màn hình']],
            ['Sau thời gian học tập, em nên làm gì?', 'Nghỉ ngơi và vận động phù hợp', ['Ngồi lì thật lâu', 'Bỏ bữa', 'Thức đêm']],
            ['Tư thế ngồi học đúng là gì?', 'Lưng thẳng, khoảng cách phù hợp', ['Nằm sát vở', 'Cúi gập người', 'Ngồi lệch lâu']]
        ]},
        { n: 24, title: 'Tự bảo vệ mình', page: 102, facts: [
            ['Khi người lạ rủ đi, em cần làm gì?', 'Từ chối và báo người lớn tin cậy', ['Đi theo ngay', 'Giữ bí mật', 'Cho biết địa chỉ nhà']],
            ['Nếu bị lạc, em nên tìm ai giúp đỡ?', 'Công an, bảo vệ hoặc người lớn tin cậy', ['Người lạ rủ đi', 'Tự chạy ra đường', 'Trốn ở nơi vắng']],
            ['Khi cảm thấy không an toàn, em cần làm gì?', 'Nói “không”, rời đi và kể với người lớn', ['Im lặng chịu đựng', 'Giữ bí mật', 'Đi theo']],
            ['Thông tin nào không nên tuỳ ý nói cho người lạ?', 'Địa chỉ nhà và số điện thoại người thân', ['Tên môn học', 'Màu em thích', 'Tên trò chơi']]
        ]},
        { n: 25, title: 'Ôn tập chủ đề Con người và sức khoẻ', page: 106, facts: [
            ['Thói quen nào tốt cho sức khoẻ?', 'Ăn đủ chất, vận động và ngủ đủ', ['Bỏ bữa', 'Thức khuya', 'Không vận động']],
            ['Để bảo vệ mắt, em nên làm gì?', 'Đọc nơi đủ sáng và giữ khoảng cách', ['Đọc trong bóng tối', 'Đưa sách sát mắt', 'Nhìn màn hình liên tục']],
            ['Để bảo vệ tai, em không nên làm gì?', 'Nghe âm thanh quá lớn', ['Giữ tai sạch', 'Tránh vật nhọn', 'Báo người lớn khi đau']],
            ['Khi bị đau hoặc mệt, em nên làm gì?', 'Báo cho người lớn', ['Tự uống thuốc lạ', 'Giấu đi', 'Tiếp tục hoạt động mạnh']]
        ]},
        { n: 26, title: 'Cùng khám phá bầu trời', page: 108, facts: [
            ['Ban ngày, vật nào thường chiếu sáng bầu trời?', 'Mặt Trời', ['Mặt Trăng', 'Đèn pin', 'Ngọn nến']],
            ['Ban đêm trời quang, em có thể nhìn thấy gì?', 'Mặt Trăng và các ngôi sao', ['Cầu vồng mọi lúc', 'Mặt Trời ở giữa trời', 'Đèn giao thông']],
            ['Mây có thể có hình dạng như thế nào?', 'Nhiều hình dạng khác nhau', ['Chỉ hình vuông', 'Luôn đứng yên', 'Luôn màu đen']],
            ['Không nên nhìn trực tiếp vào vật nào?', 'Mặt Trời', ['Quyển sách', 'Cây xanh', 'Bàn học']]
        ]},
        { n: 27, title: 'Thời tiết luôn thay đổi', page: 114, facts: [
            ['Dấu hiệu nào cho biết trời mưa?', 'Có mây đen và hạt mưa rơi', ['Nắng chói chang', 'Trời quang không mây', 'Đường khô']],
            ['Khi trời nắng gắt, em nên làm gì?', 'Đội mũ và tránh nắng lâu', ['Đứng ngoài nắng thật lâu', 'Không uống nước', 'Mặc áo ướt']],
            ['Khi trời lạnh, em nên mặc gì?', 'Quần áo đủ ấm', ['Áo thật mỏng', 'Đồ bơi', 'Quần áo ướt']],
            ['Vì sao cần theo dõi dự báo thời tiết?', 'Để chuẩn bị trang phục và hoạt động phù hợp', ['Để thời tiết không đổi', 'Để không cần ra ngoài', 'Để đo chiều cao']]
        ]},
        { n: 28, title: 'Ôn tập chủ đề Trái Đất và bầu trời', page: 120, facts: [
            ['Thời tiết có đặc điểm gì?', 'Có thể thay đổi theo thời gian', ['Luôn giống nhau', 'Chỉ có nắng', 'Không ảnh hưởng sinh hoạt']],
            ['Trang phục nên được chọn dựa vào điều gì?', 'Điều kiện thời tiết', ['Màu bàn học', 'Số trang sách', 'Tên đường']],
            ['Khi có giông sét, em nên làm gì?', 'Trú ở nơi an toàn và nghe người lớn hướng dẫn', ['Đứng dưới cây cao', 'Chơi ngoài đồng', 'Cầm vật kim loại ngoài trời']],
            ['Mặt Trời, Mặt Trăng và sao được quan sát ở đâu?', 'Trên bầu trời', ['Dưới lòng đất', 'Trong tủ lạnh', 'Trong cặp sách']]
        ]}
    ];

    for (const spec of lessons) {
        const lesson = `Bài ${spec.n}: ${spec.title}`;
        for (const [q, answer, distractors] of spec.facts) {
            add({
                q,
                a: answer,
                c: distractors,
                lo: `Nhận biết và vận dụng kiến thức trọng tâm của ${lesson}`,
                difficulty: spec.n % 4 === 0 ? 'medium' : 'easy',
                book: BOOKS.science,
                page: spec.page,
                lesson,
                explanation: `Theo ${lesson}, ${answer.charAt(0).toLocaleLowerCase('vi')}${answer.slice(1)}.`
            });
        }
    }

    return questions;
}

function normalizeVietnameseUnit(value) {
    const toneGroups = [
        ['a', 'àáảãạ'], ['ă', 'ằắẳẵặ'], ['â', 'ầấẩẫậ'],
        ['e', 'èéẻẽẹ'], ['ê', 'ềếểễệ'], ['i', 'ìíỉĩị'],
        ['o', 'òóỏõọ'], ['ô', 'ồốổỗộ'], ['ơ', 'ờớởỡợ'],
        ['u', 'ùúủũụ'], ['ư', 'ừứửữự'], ['y', 'ỳýỷỹỵ']
    ];
    let normalized = value.toLocaleLowerCase('vi');
    for (const [base, variants] of toneGroups) {
        normalized = normalized.replace(new RegExp(`[${variants}]`, 'g'), base);
    }
    return normalized;
}

function buildVietnameseBank() {
    const { questions, add } = createBank('viet');
    const phonics = [
        { n: 1, title: 'A a', page: 14, mode: 'initial', examples: [['a', 'áo']] },
        { n: 2, title: 'B b và dấu huyền', page: 16, mode: 'initial', examples: [['b', 'bà']] },
        { n: 3, title: 'C c và dấu sắc', page: 18, mode: 'initial', examples: [['c', 'cá']] },
        { n: 4, title: 'E e, Ê ê', page: 20, mode: 'initial', examples: [['e', 'em'], ['ê', 'ếch']] },
        { n: 5, title: 'Ôn tập và kể chuyện', page: 22, review: 'a, b, c, e, ê và các dấu thanh đã học', sample: 'bé' },
        { n: 6, title: 'O o và dấu hỏi', page: 24, mode: 'initial', examples: [['o', 'ong']] },
        { n: 7, title: 'Ô ô và dấu nặng', page: 26, mode: 'initial', examples: [['ô', 'ô']] },
        { n: 8, title: 'D d, Đ đ', page: 28, mode: 'initial', examples: [['d', 'dê'], ['đ', 'đò']] },
        { n: 9, title: 'Ơ ơ và dấu ngã', page: 30, mode: 'initial', examples: [['ơ', 'ớt']] },
        { n: 10, title: 'Ôn tập và kể chuyện', page: 32, review: 'o, ô, ơ, d, đ và các dấu thanh đã học', sample: 'đỏ' },
        { n: 11, title: 'I i, K k', page: 34, mode: 'initial', examples: [['i', 'in'], ['k', 'kẻ']] },
        { n: 12, title: 'H h, L l', page: 36, mode: 'initial', examples: [['h', 'hè'], ['l', 'lá']] },
        { n: 13, title: 'U u, Ư ư', page: 38, mode: 'initial', examples: [['u', 'ủ'], ['ư', 'ừ']] },
        { n: 14, title: 'Ch ch, Kh kh', page: 40, mode: 'initial', examples: [['ch', 'chim'], ['kh', 'khế']] },
        { n: 15, title: 'Ôn tập và kể chuyện', page: 42, review: 'i, k, h, l, u, ư, ch, kh', sample: 'chú khỉ' },
        { n: 16, title: 'M m, N n', page: 44, mode: 'initial', examples: [['m', 'mẹ'], ['n', 'na']] },
        { n: 17, title: 'G g, Gi gi', page: 46, mode: 'initial', examples: [['g', 'gà'], ['gi', 'giỏ']] },
        { n: 18, title: 'Gh gh, Nh nh', page: 48, mode: 'initial', examples: [['gh', 'ghế'], ['nh', 'nhà']] },
        { n: 19, title: 'Ng ng, Ngh ngh', page: 50, mode: 'initial', examples: [['ng', 'ngõ'], ['ngh', 'nghé']] },
        { n: 20, title: 'Ôn tập và kể chuyện', page: 52, review: 'm, n, g, gi, gh, nh, ng, ngh', sample: 'nghỉ hè' },
        { n: 21, title: 'R r, S s', page: 54, mode: 'initial', examples: [['r', 'rổ'], ['s', 'sẻ']] },
        { n: 22, title: 'T t, Tr tr', page: 56, mode: 'initial', examples: [['t', 'táo'], ['tr', 'trâu']] },
        { n: 23, title: 'Th th, ia', page: 58, mode: 'initial', exampleModes: { ia: 'rime' }, examples: [['th', 'thỏ'], ['ia', 'tia']] },
        { n: 24, title: 'ua, ưa', page: 60, mode: 'rime', examples: [['ua', 'cua'], ['ưa', 'dưa']] },
        { n: 25, title: 'Ôn tập và kể chuyện', page: 62, review: 'r, s, t, tr, th, ia, ua, ưa', sample: 'con thỏ' },
        { n: 26, title: 'Ph ph, Qu qu', page: 64, mode: 'initial', examples: [['ph', 'phố'], ['qu', 'quà']] },
        { n: 27, title: 'V v, X x', page: 66, mode: 'initial', examples: [['v', 'voi'], ['x', 'xe']] },
        { n: 28, title: 'Y y', page: 68, mode: 'initial', examples: [['y', 'y tá']] },
        { n: 29, title: 'Luyện tập chính tả', page: 70, review: 'các chữ ghi âm dễ lẫn đã học', sample: 'quả táo' },
        { n: 30, title: 'Ôn tập và kể chuyện', page: 72, review: 'ph, qu, v, x, y và chính tả', sample: 'y tá' },
        { n: 31, title: 'an, ăn, ân', page: 74, mode: 'rime', examples: [['an', 'bàn'], ['ăn', 'khăn'], ['ân', 'cân']] },
        { n: 32, title: 'on, ôn, ơn', page: 76, mode: 'rime', examples: [['on', 'con'], ['ôn', 'ôn bài'], ['ơn', 'sơn']] },
        { n: 33, title: 'en, ên, in, un', page: 78, mode: 'rime', examples: [['en', 'sen'], ['ên', 'tên'], ['in', 'pin'], ['un', 'vun']] },
        { n: 34, title: 'am, ăm, âm', page: 80, mode: 'rime', examples: [['am', 'cam'], ['ăm', 'tăm'], ['âm', 'mâm']] },
        { n: 35, title: 'Ôn tập và kể chuyện', page: 82, review: 'an, ăn, ân, on, ôn, ơn, en, ên, in, un, am, ăm, âm', sample: 'mâm cơm' },
        { n: 36, title: 'om, ôm, ơm', page: 84, mode: 'rime', examples: [['om', 'lom khom'], ['ôm', 'ôm'], ['ơm', 'cơm']] },
        { n: 37, title: 'em, êm, im, um', page: 86, mode: 'rime', examples: [['em', 'kem'], ['êm', 'êm'], ['im', 'chim'], ['um', 'chùm']] },
        { n: 38, title: 'ai, ay, ây', page: 88, mode: 'rime', examples: [['ai', 'mai'], ['ay', 'tay'], ['ây', 'cây']] },
        { n: 39, title: 'oi, ôi, ơi', page: 90, mode: 'rime', examples: [['oi', 'voi'], ['ôi', 'ổi'], ['ơi', 'chơi']] },
        { n: 40, title: 'Ôn tập và kể chuyện', page: 92, review: 'om, ôm, ơm, em, êm, im, um, ai, ay, ây, oi, ôi, ơi', sample: 'chùm ổi' },
        { n: 41, title: 'ui, ưi', page: 94, mode: 'rime', examples: [['ui', 'túi'], ['ưi', 'gửi']] },
        { n: 42, title: 'ao, eo', page: 96, mode: 'rime', examples: [['ao', 'sao'], ['eo', 'mèo']] },
        { n: 43, title: 'au, âu, êu', page: 98, mode: 'rime', examples: [['au', 'rau'], ['âu', 'trâu'], ['êu', 'kêu']] },
        { n: 44, title: 'iu, ưu', page: 100, mode: 'rime', examples: [['iu', 'dịu'], ['ưu', 'bưu thiếp']] },
        { n: 45, title: 'Ôn tập và kể chuyện', page: 102, review: 'ui, ưi, ao, eo, au, âu, êu, iu, ưu', sample: 'con mèo' },
        { n: 46, title: 'ac, ăc, âc', page: 104, mode: 'rime', examples: [['ac', 'bác'], ['ăc', 'mắc'], ['âc', 'gấc']] },
        { n: 47, title: 'oc, ôc, uc, ưc', page: 106, mode: 'rime', examples: [['oc', 'học'], ['ôc', 'ốc'], ['uc', 'cúc'], ['ưc', 'mực']] },
        { n: 48, title: 'at, ăt, ât', page: 108, mode: 'rime', examples: [['at', 'hát'], ['ăt', 'mắt'], ['ât', 'đất']] },
        { n: 49, title: 'ot, ôt, ơt', page: 110, mode: 'rime', examples: [['ot', 'ngọt'], ['ôt', 'tốt'], ['ơt', 'vợt']] },
        { n: 50, title: 'Ôn tập và kể chuyện', page: 112, review: 'ac, ăc, âc, oc, ôc, uc, ưc, at, ăt, ât, ot, ôt, ơt', sample: 'quả gấc' },
        { n: 51, title: 'et, êt, it', page: 114, mode: 'rime', examples: [['et', 'nét'], ['êt', 'Tết'], ['it', 'mít']] },
        { n: 52, title: 'ut, ưt', page: 116, mode: 'rime', examples: [['ut', 'bút'], ['ưt', 'mứt']] },
        { n: 53, title: 'ap, ăp, âp', page: 118, mode: 'rime', examples: [['ap', 'đạp'], ['ăp', 'bắp'], ['âp', 'tập']] },
        { n: 54, title: 'op, ôp, ơp', page: 120, mode: 'rime', examples: [['op', 'họp'], ['ôp', 'hộp'], ['ơp', 'lớp']] },
        { n: 55, title: 'Ôn tập và kể chuyện', page: 122, review: 'et, êt, it, ut, ưt, ap, ăp, âp, op, ôp, ơp', sample: 'hộp mứt' },
        { n: 56, title: 'ep, êp, ip, up', page: 124, mode: 'rime', examples: [['ep', 'dép'], ['êp', 'bếp'], ['ip', 'nhịp'], ['up', 'búp']] },
        { n: 57, title: 'anh, ênh, inh', page: 126, mode: 'rime', examples: [['anh', 'chanh'], ['ênh', 'bệnh'], ['inh', 'kính']] },
        { n: 58, title: 'ach, êch, ich', page: 128, mode: 'rime', examples: [['ach', 'sách'], ['êch', 'ếch'], ['ich', 'lịch']] },
        { n: 59, title: 'ang, ăng, âng', page: 130, mode: 'rime', examples: [['ang', 'làng'], ['ăng', 'trăng'], ['âng', 'tầng']] },
        { n: 60, title: 'Ôn tập và kể chuyện', page: 132, review: 'ep, êp, ip, up, anh, ênh, inh, ach, êch, ich, ang, ăng, âng', sample: 'trăng sáng' },
        { n: 61, title: 'ong, ông, ung, ưng', page: 134, mode: 'rime', examples: [['ong', 'ong'], ['ông', 'sông'], ['ung', 'nhung'], ['ưng', 'trứng']] },
        { n: 62, title: 'iêc, iên, iêp', page: 136, mode: 'rime', examples: [['iêc', 'xiếc'], ['iên', 'biển'], ['iêp', 'thiệp']] },
        { n: 63, title: 'iêng, iêm, yên', page: 138, mode: 'rime', examples: [['iêng', 'tiếng'], ['iêm', 'điểm'], ['yên', 'yên']] },
        { n: 64, title: 'iêt, iêu, yêu', page: 140, mode: 'rime', examples: [['iêt', 'viết'], ['iêu', 'diều'], ['yêu', 'yêu']] },
        { n: 65, title: 'Ôn tập và kể chuyện', page: 142, review: 'ong, ông, ung, ưng, iêc, iên, iêp, iêng, iêm, yên, iêt, iêu, yêu', sample: 'yêu biển' },
        { n: 66, title: 'uôi, uôm', page: 144, mode: 'rime', examples: [['uôi', 'chuối'], ['uôm', 'buồm']] },
        { n: 67, title: 'uôc, uôt', page: 146, mode: 'rime', examples: [['uôc', 'thuốc'], ['uôt', 'chuột']] },
        { n: 68, title: 'uôn, uông', page: 148, mode: 'rime', examples: [['uôn', 'cuốn'], ['uông', 'chuông']] },
        { n: 69, title: 'ươi, ươu', page: 150, mode: 'rime', examples: [['ươi', 'tươi'], ['ươu', 'hươu']] },
        { n: 70, title: 'Ôn tập và kể chuyện', page: 152, review: 'uôi, uôm, uôc, uôt, uôn, uông, ươi, ươu', sample: 'quả chuối' },
        { n: 71, title: 'ươc, ươt', page: 154, mode: 'rime', examples: [['ươc', 'nước'], ['ươt', 'trượt']] },
        { n: 72, title: 'ươm, ươp', page: 156, mode: 'rime', examples: [['ươm', 'bướm'], ['ươp', 'mướp']] },
        { n: 73, title: 'ươn, ương', page: 158, mode: 'rime', examples: [['ươn', 'lươn'], ['ương', 'trường']] },
        { n: 74, title: 'oa, oe', page: 160, mode: 'rime', examples: [['oa', 'hoa'], ['oe', 'xoè']] },
        { n: 75, title: 'Ôn tập và kể chuyện', page: 162, review: 'ươc, ươt, ươm, ươp, ươn, ương, oa, oe', sample: 'hoa mướp' },
        { n: 76, title: 'oan, oăn, oat, oăt', page: 164, mode: 'rime', examples: [['oan', 'ngoan'], ['oăn', 'xoăn'], ['oat', 'hoạt'], ['oăt', 'choắt']] },
        { n: 77, title: 'oai, uê, uy', page: 166, mode: 'rime', examples: [['oai', 'xoài'], ['uê', 'quê'], ['uy', 'huy']] },
        { n: 78, title: 'uân, uât', page: 168, mode: 'rime', examples: [['uân', 'xuân'], ['uât', 'luật']] },
        { n: 79, title: 'uyên, uyêt', page: 170, mode: 'rime', examples: [['uyên', 'thuyền'], ['uyêt', 'tuyết']] },
        { n: 80, title: 'Ôn tập và kể chuyện', page: 172, review: 'oan, oăn, oat, oăt, oai, uê, uy, uân, uât, uyên, uyêt', sample: 'thuyền buồm' }
    ];

    const allExamples = phonics.flatMap((lesson) => lesson.examples || []).map(([, word]) => word);
    for (const spec of phonics) {
        const lesson = `Bài ${spec.n}: ${spec.title}`;
        if (spec.review) {
            add({
                q: `Nhóm âm vần nào dưới đây xuất hiện trong bài học (${spec.review})?`,
                a: spec.review,
                c: [spec.review, 'chỉ các chữ số', 'chỉ phép cộng', 'chỉ hình học'],
                lo: `Củng cố ${spec.review}`,
                book: BOOKS.viet1,
                page: spec.page,
                lesson,
                explanation: `Mục lục xác định ${lesson} là bài ôn tập các nội dung: ${spec.review}.`
            });
            add({
                q: `Bé hãy gõ lại từ ngữ “${spec.sample}”:`,
                a: spec.sample,
                c: [],
                type: 'typing',
                lo: 'Đọc và gõ đúng tiếng, từ đã học',
                difficulty: 'medium',
                book: BOOKS.viet1,
                page: spec.page,
                lesson
            });
            continue;
        }

        for (const [unit, word] of spec.examples) {
            const unitMode = spec.exampleModes?.[unit] || spec.mode;
            const normalizedUnit = normalizeVietnameseUnit(unit);
            const candidates = allExamples.filter((candidate) => {
                if (candidate === word) return false;
                const normalizedCandidate = normalizeVietnameseUnit(candidate);
                return unitMode === 'initial'
                    ? !normalizedCandidate.startsWith(normalizedUnit)
                    : !normalizedCandidate.includes(normalizedUnit);
            });
            add({
                q: unitMode === 'initial'
                    ? `Tiếng nào dưới đây bắt đầu bằng âm “${unit}”?`
                    : `Tiếng nào dưới đây chứa vần “${unit}”?`,
                a: word,
                c: [word, ...candidates.slice((spec.n + unit.length) % 20, (spec.n + unit.length) % 20 + 3)],
                lo: unitMode === 'initial' ? `Nhận biết chữ/âm ${unit}` : `Nhận biết vần ${unit}`,
                book: BOOKS.viet1,
                page: spec.page,
                lesson,
                explanation: `Tiếng “${word}” ${unitMode === 'initial' ? 'bắt đầu bằng' : 'chứa vần'} “${unit}”.`
            });
        }
        add({
            q: `Bé hãy gõ lại tiếng “${spec.examples[0][1]}” (chứa âm/vần ${spec.examples[0][0]}):`,
            a: spec.examples[0][1],
            c: [],
            type: 'typing',
            lo: `Đọc và gõ đúng tiếng có ${spec.examples[0][0]}`,
            difficulty: 'medium',
            book: BOOKS.viet1,
            page: spec.page,
            lesson
        });
    }

    const readings = [
        [1, 'Tôi là học sinh lớp 1', 4, ['Khi đã là học sinh lớp 1, bé học thêm được kỹ năng quan trọng nào?', 'Biết đọc sách và làm toán', ['Lái xe ô tô', 'Nấu ăn một mình', 'Chơi điện tử suốt ngày']], ['Để trở thành học sinh lớp 1 chăm ngoan, em nên làm gì?', 'Đi học đúng giờ và chú ý nghe cô giảng', ['Nói chuyện riêng trong lớp', 'Đi học muộn', 'Không làm bài tập']]],
        [1, 'Đôi tai xấu xí', 8, ['Bài học từ câu chuyện "Đôi tai xấu xí" của bạn Thỏ là gì?', 'Mỗi đặc điểm trên cơ thể đều có ích và đáng quý', ['Nên chê bai ngoại hình của bạn bè', 'Đôi tai dài là hoàn toàn vô dụng', 'Không cần lắng nghe bố mẹ']], ['Đôi tai của bạn Thỏ trong câu chuyện có tác dụng đặc biệt gì?', 'Nghe rất thính để nhận biết âm thanh từ xa', ['Dùng để ngửi thức ăn', 'Dùng để nhìn trong bóng tối', 'Dùng để cầm nắm đồ vật']]],
        [1, 'Bạn của gió', 12, ['Trong tự nhiên, ngọn gió mang lại lợi ích gì cho con người và thuyền buồm?', 'Thổi mát và đẩy buồm ra khơi', ['Làm thuyền chìm xuống đáy', 'Làm tắt ánh nắng mặt trời', 'Đốt cháy cây cối']], ['Đọc câu: "Gió nâng cánh diều bay lượn trên bầu trời." Từ nào chỉ sự vật bay trên cao nhờ gió?', 'cánh diều', ['ngọn núi', 'con đường', 'hòn đá']]],
        [1, 'Giải thưởng tình bạn', 14, ['Khi thấy bạn mình bị ngã trong lúc thi chạy hoặc vui chơi, em nên làm gì?', 'Dừng lại đỡ bạn đứng dậy', ['Cười nhạo bạn', 'Bỏ mặc bạn để chạy về đích', 'Trách mắng bạn']], ['Câu chuyện "Giải thưởng tình bạn" khuyên chúng ta điều gì?', 'Biết yêu thương và giúp đỡ bạn bè khi gặp khó khăn', ['Chỉ lo cho bản thân mình', 'Không bao giờ nhường bạn', 'Tranh giành phần thưởng bằng mọi cách']]],
        [1, 'Sinh nhật của voi con', 18, ['Khi được bạn bè đến chúc mừng và tặng quà sinh nhật như voi con, bé nên làm gì?', 'Nói lời cảm ơn chân thành với các bạn', ['Giành lấy quà rồi bỏ chạy', 'Chê bai quà của các bạn', 'Khóc nhè không nhận']], ['Trong các bạn đến mừng sinh nhật voi con, loài vật nào nổi tiếng leo trèo nhanh nhẹn trên cành cây?', 'Khỉ vàng', ['Cá chép', 'Rùa đá', 'Cua biển']]],
        [2, 'Nụ hôn trên bàn tay', 24, ['Khi lần đầu đến trường còn bỡ ngỡ hoặc lo lắng, em nên làm gì?', 'Nhớ lời dặn yêu thương của bố mẹ để tự tin bước vào lớp', ['Ngồi khóc ở cổng trường', 'Bỏ chạy về nhà', 'Không chịu vào lớp học']], ['Tình cảm của bố mẹ dành cho con cái trong bài đọc được thể hiện qua điều gì?', 'Sự quan tâm, vỗ về và yêu thương ấm áp', ['Sự thờ ơ, không để ý', 'Sự tức giận, quát mắng', 'Sự bỏ mặc con một mình']]],
        [2, 'Làm anh', 28, ['Theo bài thơ "Làm anh", người làm anh chị trong nhà nên đối xử với em nhỏ như thế nào?', 'Nhường nhịn và dỗ dành em dịu dàng', ['Tranh giành đồ chơi với em', 'Quát mắng và trêu chọc em', 'Bỏ mặc em khi em khóc']], ['Tại sao làm anh chị chăm sóc em nhỏ tuy vất vả nhưng lại rất vui?', 'Vì xuất phát từ tình yêu thương em bé', ['Vì được nhiều đồ chơi hơn', 'Vì không phải học bài', 'Vì được đi chơi cả ngày']]],
        [2, 'Cả nhà đi chơi núi', 30, ['Khi cùng gia đình đi dã ngoại hoặc leo núi, chúng ta cần chuẩn bị những gì?', 'Nước uống, thức ăn nhẹ và đồ bảo hộ an toàn', ['Chỉ mang đồ chơi điện tử', 'Chỉ mang bánh kẹo ngọt', 'Không cần chuẩn bị gì']], ['Khi đi dã ngoại ở nơi đồi núi, để đảm bảo an toàn em cần chú ý điều gì?', 'Đi sát cạnh người lớn và nghe theo lời bố mẹ', ['Tự ý chạy một mình vào bụi rậm', 'Trèo lên mỏm đá chênh vênh', 'Tách xa khỏi gia đình']]],
        [2, 'Quạt cho bà ngủ', 34, ['Bài thơ "Quạt cho bà ngủ" thể hiện tình cảm gì của bạn nhỏ đối với bà?', 'Lòng hiếu thảo và sự chăm sóc ân cần dành cho bà', ['Sự lười biếng, không muốn học bài', 'Sự thờ ơ với người thân', 'Thích trêu chọc chim chích choè']], ['Khi người thân trong gia đình bị ốm hoặc cần nghỉ ngơi, em nên làm gì?', 'Giữ im lặng và hỏi thăm, chăm sóc nhẹ nhàng', ['Bật nhạc thật to và chạy nhảy nô đùa', 'La hét gọi người thân dậy', 'Không quan tâm gì']]],
        [2, 'Bữa cơm gia đình', 36, ['Ngày Gia đình Việt Nam hằng năm là ngày nào?', '28 tháng 6', ['1 tháng 1', '1 tháng 6', '20 tháng 11']], ['Để bữa cơm gia đình thêm ấm cúng và vui vẻ, các thành viên nên làm gì?', 'Mỗi người cùng giúp một tay chuẩn bị và dọn dẹp', ['Chỉ để một mình mẹ làm hết', 'Vừa ăn vừa xem điện thoại một mình', 'Bỏ bữa không ăn cùng gia đình']]],
        [2, 'Ngôi nhà', 40, ['Trong bài thơ "Ngôi nhà", tình yêu ngôi nhà của bạn nhỏ được gắn liền với tình cảm lớn lao nào?', 'Tình yêu quê hương, đất nước', ['Tình yêu bánh kẹo', 'Tình yêu trò chơi điện tử', 'Tình yêu xe đồ chơi']], ['Để giữ gìn ngôi nhà của mình luôn sạch sẽ và gọn gàng, em nên làm gì?', 'Thường xuyên quét dọn và sắp xếp đồ đạc ngăn nắp', ['Vứt rác bừa bãi ra sàn nhà', 'Vẽ bậy lên tường phòng', 'Bày đồ chơi khắp nơi không dọn']]],
        [3, 'Tôi đi học', 44, ['Trong bài "Tôi đi học", vì sao con đường quen thuộc hằng ngày bỗng trở nên mới lạ?', 'Vì hôm nay bạn nhỏ lần đầu tiên được mẹ đưa đến trường', ['Vì con đường mới được mở rộng', 'Vì trời đổ cơn mưa to', 'Vì bạn nhỏ bị lạc đường']], ['Trong ngày đầu tiên đi học, tâm trạng chung của các bạn nhỏ là gì?', 'Bỡ ngỡ, hồi hộp nhưng đầy háo hức', ['Buồn bã và tức giận', 'Hoàn toàn không quan tâm', 'Chỉ muốn đi ngủ tiếp']]],
        [3, 'Đi học', 48, ['Trong bài thơ "Đi học", hình ảnh thiên nhiên nào che mát cho bạn nhỏ trên đường đến trường?', 'Cây cọ xoè búp che như chiếc ô', ['Tấm bạt nhựa lớn', 'Đám mây đen dày', 'Cơn mưa rào']], ['Bài thơ "Đi học" ca ngợi điều gì ở các bạn nhỏ vùng cao?', 'Tinh thần chăm chỉ và yêu thích đến trường học chữ', ['Thói quen trốn học đi chơi', 'Sở thích đi săn thú rừng', 'Lười biếng không làm bài']]],
        [3, 'Hoa yêu thương', 50, ['Bức tranh bông hoa trong bài "Hoa yêu thương" thể hiện tình cảm gì của học sinh?', 'Lòng biết ơn và kính trọng cô giáo kính yêu', ['Muốn khoe tài vẽ tranh đẹp', 'Muốn đòi phần thưởng lớn', 'Sợ bị cô giáo phạt']], ['Để bày tỏ lòng biết ơn đối với thầy cô giáo, việc làm thiết thực nhất của học sinh là gì?', 'Chăm ngoan, lễ phép và cố gắng học tốt', ['Chỉ tặng quà đắt tiền', 'Nói chuyện riêng trong giờ học', 'Không làm bài tập về nhà']]],
        [3, 'Cây bàng và lớp học', 54, ['Cây bàng trên sân trường mang lại lợi ích gì cho các bạn học sinh?', 'Tỏa bóng mát che nắng cho các bạn vui chơi', ['Cho quả ngọt ăn mỗi ngày', 'Dùng để đốt lửa sưởi ấm', 'Làm tối cả sân trường']], ['Đọc câu: "Tán lá bàng như một chiếc ô xanh xoè rộng." Hình ảnh chiếc ô xanh được so sánh với bộ phận nào?', 'Tán lá bàng', ['Gốc cây bàng', 'Rễ cây dưới đất', 'Bàn ghế lớp học']]],
        [3, 'Bác trống trường', 56, ['Tiếng trống trường hằng ngày có vai trò quan trọng gì đối với thầy cô và học sinh?', 'Báo hiệu giờ vào lớp, giờ ra chơi và tan học đúng giờ', ['Phát bài hát ru ngủ', 'Báo hiệu trời sắp mưa bão', 'Kêu gọi đi mua đồ ăn']], ['Tiếng trống rộn rã trong ngày khai giảng báo hiệu điều gì?', 'Một năm học mới chính thức bắt đầu', ['Kỳ nghỉ hè đã đến', 'Đến giờ đi ngủ trưa', 'Trường học chuẩn bị đóng cửa']]],
        [3, 'Giờ ra chơi', 60, ['Trong giờ ra chơi ở trường học, các bạn nên tham gia các hoạt động như thế nào?', 'Chơi những trò chơi lành mạnh, an toàn và đoàn kết', ['Đánh nhau và xô đẩy bạn bè', 'Trèo cây cao nguy hiểm', 'Chạy ra ngoài cổng trường']], ['Khi tiếng trống hoặc chuông báo hết giờ ra chơi vang lên, học sinh cần làm gì?', 'Nhanh chóng xếp hàng ngay ngắn và trật tự vào lớp', ['Tiếp tục chơi đùa ngoài sân', 'Chạy ùa vào lớp gây ồn ào', 'Trốn đi chơi tiếp']]],
        [4, 'Rửa tay trước khi ăn', 64, ['Vì sao chúng ta luôn phải rửa tay sạch sẽ trước khi ăn cơm?', 'Để ngăn vi khuẩn xâm nhập vào cơ thể gây bệnh', ['Để làm bàn tay có mùi thơm thôi', 'Để làm tay mát hơn', 'Không cần rửa cũng được']], ['Cách rửa tay đúng chuẩn vệ sinh và phòng tránh dịch bệnh là gì?', 'Rửa kỹ bằng xà phòng dưới vòi nước sạch', ['Chỉ lau nhẹ vào vạt áo', 'Rửa qua bằng nước bẩn', 'Chỉ ngửi tay xem có mùi không']]],
        [4, 'Lời chào đi trước', 68, ['Bài thơ "Lời chào đi trước" khuyên các bạn nhỏ hình thành thói quen tốt nào?', 'Biết chào hỏi lễ phép khi gặp mọi người', ['Nói trống không với người lớn', 'Im lặng và quay mặt đi chỗ khác', 'Chỉ chào khi được cho quà']], ['Khi đến trường gặp thầy cô hay về nhà gặp ông bà bố mẹ, hành động đẹp đầu tiên là gì?', 'Khoanh tay chào hỏi lễ phép', ['Chạy thẳng vào nhà không nói gì', 'Hét to đòi đồ chơi', 'Quay lưng đi chỗ khác']]],
        [4, 'Khi mẹ vắng nhà', 70, ['Câu chuyện "Khi mẹ vắng nhà" dạy cho các bạn nhỏ bài học an toàn quan trọng nào?', 'Tuyệt đối không mở cửa cho người lạ khi ở nhà một mình', ['Mở cửa ngay cho bất kỳ ai gõ cửa', 'Đi theo người lạ ra ngoài đường', 'Mời người lạ vào nhà chơi']], ['Đàn dê con trong câu chuyện được khen ngợi vì đức tính gì?', 'Ngoan ngoãn nghe lời mẹ và luôn có ý thức cảnh giác', ['Dại dột nghe lời chó sói', 'Hay cãi lời mẹ dặn', 'Thích trốn ra ngoài chơi']]],
        [4, 'Nếu không may bị lạc', 74, ['Khi không may bị lạc ở nơi đông người như siêu thị hay công viên, em nên làm gì?', 'Đứng yên chỗ dễ nhìn hoặc nhờ bảo vệ, công an giúp đỡ', ['Khóc nhè và chạy lung tung', 'Đi theo người lạ cho quà bánh', 'Trốn vào góc tối vắng vẻ']], ['Để phòng tránh bị lạc và dễ tìm người thân, trẻ nhỏ cần ghi nhớ điều gì?', 'Ghi nhớ số điện thoại của bố mẹ và địa chỉ nhà mình', ['Tên các nhân vật hoạt hình', 'Số điểm trò chơi điện tử', 'Không cần nhớ điều gì']]],
        [4, 'Đèn giao thông', 78, ['Cột đèn tín hiệu giao thông gồm có những màu nào?', 'Đỏ, vàng và xanh lá cây', ['Đỏ, tím và xanh dương', 'Vàng, hồng và trắng', 'Đen, nâu và cam']], ['Khi tham gia giao thông, người đi đường phải làm gì khi thấy tín hiệu đèn đỏ?', 'Dừng lại trước vạch quy định', ['Đi thật nhanh qua ngã tư', 'Bấm còi to rồi vượt lên', 'Quay đầu xe bỏ chạy']]],
        [5, 'Kiến và chim bồ câu', 84, ['Ý nghĩa tốt đẹp của câu chuyện "Kiến và chim bồ câu" là gì?', 'Biết giúp đỡ nhau khi hoạn nạn và luôn ghi nhớ ơn nghĩa', ['Chỉ nên chơi với kẻ mạnh hơn mình', 'Không bao giờ cứu giúp ai', 'Lừa dối bạn bè để có lợi']], ['Trong câu chuyện, bạn Kiến đã làm gì để cứu bạn Bồ Câu khỏi người thợ săn?', 'Cắn vào chân người thợ săn làm chệch mũi tên', ['Bay lên bầu trời che mắt thợ săn', 'Ném đá vào người thợ săn', 'Kêu to làm thợ săn giật mình']]],
        [5, 'Câu chuyện của rễ', 88, ['Bộ phận rễ cây có nhiệm vụ tự nhiên quan trọng nào đối với sự sống của cây?', 'Hút nước và chất dinh dưỡng trong đất để nuôi cây', ['Hứng ánh nắng mặt trời trên cao', 'Thụ phấn để kết thành quả ngọt', 'Bảo vệ các loài chim làm tổ']], ['Phẩm chất của bộ rễ trong câu chuyện nhắc nhở chúng ta điều gì?', 'Đức tính khiêm tốn, chăm chỉ cống hiến thầm lặng cho đời', ['Thói quen khoe khoang và kiêu ngạo', 'Lười biếng không chịu làm việc', 'Tranh công của người khác']]],
        [5, 'Câu hỏi của sói', 90, ['Theo câu chuyện "Câu hỏi của sói", điều gì giúp chúng ta luôn cảm thấy vui tươi và yêu đời?', 'Có tấm lòng nhân hậu, hòa đồng và được bạn bè yêu quý', ['Hay gây gổ và bắt nạt người khác', 'Sống ích kỷ một mình', 'Tranh giành đồ của bạn']], ['Vì sao nhân vật Chó Sói trong câu chuyện lúc nào cũng cảm thấy buồn bực, cô đơn?', 'Vì tính tình hung dữ, hay gây gổ nên không ai dám kết bạn', ['Vì không biết trèo cây', 'Vì thời tiết quá lạnh', 'Vì không có thức ăn ngon']]],
        [5, 'Chú bé chăn cừu', 94, ['Bài học quý giá nhất từ câu chuyện "Chú bé chăn cừu" là gì?', 'Phải luôn trung thực, không được nói dối làm mất lòng tin', ['Nên nói dối để trêu đùa cho vui', 'Không nên đi chăn cừu ngoài đồng', 'Không bao giờ được nhờ người khác giúp']], ['Hậu quả mà chú bé chăn cừu phải gánh chịu do thói quen nói dối là gì?', 'Khi gặp nguy hiểm thật sự thì không còn ai tin để giúp đỡ', ['Được mọi người thưởng thêm nhiều quà', 'Được các bác khen ngợi là thông minh', 'Không có hậu quả gì xảy ra']]],
        [5, 'Tiếng vọng của núi', 98, ['Câu chuyện "Tiếng vọng của núi" gửi gắm thông điệp ứng xử nào trong cuộc sống?', 'Khi trao đi yêu thương và lời nói tốt đẹp, em sẽ nhận lại sự yêu thương', ['Muốn người khác quý thì phải quát thật to', 'Nên nói những lời chê bai khó nghe', 'Không nên trò chuyện với ai']], ['Hiện tượng âm thanh dội lại khi ta nói to trước vách núi hoặc trong hang động gọi là gì?', 'Tiếng vọng của âm thanh', ['Tiếng sấm sét', 'Tiếng mưa rơi', 'Tiếng gió rít']]],
        [6, 'Loài chim của biển cả', 104, ['Loài chim hải âu có đặc điểm cơ thể đặc biệt nào giúp chúng bơi lội giỏi trên biển?', 'Chân có màng bơi như chân vịt', ['Có bộ móng vuốt sắc nhọn', 'Có cánh ngắn và dày', 'Có đuôi xoè tròn như công']], ['Vì sao chim hải âu thường được gọi là loài chim báo bão của biển cả?', 'Vì trước khi bão đến, chúng bay thành đàn tìm nơi trú ẩn', ['Vì chim hải âu tạo ra sóng gió', 'Vì lông của chúng đổi sang màu đen', 'Vì chúng kêu gào suốt đêm']]],
        [6, 'Bảy sắc cầu vồng', 108, ['Hiện tượng cầu vồng trên bầu trời thường xuất hiện trong điều kiện thời tiết nào?', 'Khi trời vừa tạnh mưa và có ánh nắng chiếu qua hạt nước', ['Vào ban đêm không có trăng sao', 'Khi trời có sương mù dày đặc giữa trưa', 'Khi trời mùa đông có tuyết rơi']], ['Cầu vồng trên bầu trời gồm có bao nhiêu màu sắc chính?', '7 màu sắc', ['3 màu sắc', '5 màu sắc', '10 màu sắc']]],
        [6, 'Chúa tể rừng xanh', 110, ['Con hổ thường được mệnh danh là gì trong thế giới loài vật?', 'Chúa tể rừng xanh (Chúa sơn lâm)', ['Vua của các loài chim', 'Bạn nhỏ của nhà nông', 'Thần của biển cả']], ['Đặc điểm tự nhiên nổi bật nào giúp hổ săn mồi hiệu quả trong rừng?', 'Răng và móng vuốt sắc nhọn, bước đi êm và chạy nhanh', ['Bộ lông màu trắng tinh khôi', 'Đôi cánh rộng biết bay lượn', 'Chiếc mỏ dài và nhọn']]],
        [6, 'Cuộc thi tài năng rừng xanh', 114, ['Trong thế giới loài vật, chim công nổi tiếng với vẻ đẹp đặc trưng nào?', 'Bộ lông đuôi sặc sỡ xoè rộng như chiếc quạt hoa', ['Khả năng bơi lội dưới nước sâu', 'Chiếc mỏ cứng dùng để đục gỗ', 'Tiếng gầm rú vang dội núi rừng']], ['Ý nghĩa của câu chuyện "Cuộc thi tài năng rừng xanh" là gì?', 'Mỗi loài vật, mỗi con người đều có thế mạnh và tài năng riêng', ['Chỉ ai múa đẹp mới có tài năng', 'Không nên tham gia thi thố', 'Ai cũng phải có tài giống hệt nhau']]],
        [6, 'Cây liễu dẻo dai', 118, ['Nhờ đặc tính nào mà cây liễu đứng vững trước gió to bão lớn mà không bị gãy đổ?', 'Cành mềm dẻo và uyển chuyển nương theo chiều gió', ['Thân cây bằng kim loại cứng', 'Lá cây rụng hết vào mùa hè', 'Cây trốn sâu dưới lòng đất']], ['Cây liễu rủ thường được trồng nhiều ở đâu để tạo cảnh quan xanh mát, thơ mộng?', 'Ven bờ hồ, bờ sông và công viên', ['Trên đỉnh núi tuyết lạnh', 'Giữa sa mạc khô cằn', 'Dưới đáy biển sâu']]],
        [7, 'Tia nắng đi đâu?', 124, ['Ánh nắng mặt trời buổi sáng sớm mang lại lợi ích tuyệt vời nào cho sức khỏe?', 'Cung cấp vitamin D giúp xương chắc khỏe và sảng khoái', ['Làm đen da và gây bỏng rát', 'Gây buồn ngủ suốt cả ngày', 'Làm hỏng thị lực của mắt']], ['Mặt trời mọc vào buổi nào và ở hướng nào?', 'Mọc vào buổi sáng ở hướng Đông', ['Mọc vào buổi tối ở hướng Tây', 'Mọc vào nửa đêm ở hướng Bắc', 'Mọc vào buổi trưa ở hướng Nam']]],
        [7, 'Trong giấc mơ buổi sáng', 126, ['Vào mỗi buổi sáng sớm ở làng quê, con vật nào thường cất tiếng gáy vang báo hiệu ngày mới?', 'Chú gà trống', ['Chú mèo mướp', 'Con cá vàng', 'Chú cún con']], ['Thói quen buổi sáng nào giúp học sinh luôn khỏe mạnh và tỉnh táo trước khi đến lớp?', 'Thức dậy sớm tập thể dục, vệ sinh cá nhân và ăn sáng đầy đủ', ['Ngủ nướng đến sát giờ rồi nhịn ăn sáng', 'Nằm trên giường xem điện thoại', 'Chạy vội vàng không rửa mặt']]],
        [7, 'Ngày mới bắt đầu', 128, ['Để bắt đầu một ngày mới tràn đầy năng lượng, việc đầu tiên bé nên làm sau khi thức dậy là gì?', 'Gấp chăn gối gọn gàng và đánh răng, rửa mặt sạch sẽ', ['Chơi điện tử ngay trên giường', 'Khóc nhè đòi bố mẹ bế', 'Để nguyên chăn gối bừa bãi rồi đi chơi']], ['Đọc câu: "Bình minh thức giấc, chim hót líu lo trên cành." Từ "bình minh" chỉ khoảng thời gian nào?', 'Lúc sáng sớm khi mặt trời vừa mọc', ['Buổi trưa nắng gắt', 'Buổi chiều hoàng hôn', 'Lúc nửa đêm thanh vắng']]],
        [7, 'Hỏi mẹ', 132, ['Hình ảnh chú Cuội ngồi dưới gốc cây đa thường gắn liền với sự vật nào trên bầu trời đêm?', 'Mặt trăng tròn vào đêm rằm', ['Ngôi sao băng bay qua', 'Đám mây đen kịt', 'Ánh mặt trời ban trưa']], ['Khi tò mò muốn khám phá và hiểu biết thêm về thế giới xung quanh, các bạn nhỏ nên làm gì?', 'Hăng hái học hỏi và lễ phép hỏi han ông bà, cha mẹ, thầy cô', ['Giấu kín không nói với ai', 'Tự làm những thí nghiệm nguy hiểm', 'Không cần quan tâm tìm hiểu']]],
        [7, 'Những cánh cò', 134, ['Hình ảnh con cò chăm chỉ kiếm ăn bên ruộng đồng là biểu tượng quen thuộc của nơi nào?', 'Làng quê thanh bình của Việt Nam', ['Khu đô thị cao tầng hiện đại', 'Nhà máy công nghiệp sầm uất', 'Đáy đại dương sâu thẳm']], ['Để các loài chim muông và đàn cò có nơi sinh sống bình yên, con người cần làm gì?', 'Bảo vệ môi trường tự nhiên trong lành và không săn bắt trái phép', ['Phá huỷ ao hồ và đốn chặt rừng cây', 'Bắn súng cao su xua đuổi chim', 'Xả rác thải bừa bãi xuống nguồn nước']]],
        [7, 'Buổi trưa hè', 138, ['Vào mùa hè oi ả ở làng quê, âm thanh tự nhiên nào thường cất lên râm ran khắp các vòm cây?', 'Tiếng ve sầu kêu hè', ['Tiếng ếch kêu mùa đông', 'Tiếng sấm sét mùa xuân', 'Tiếng chim hót trong gió tuyết']], ['Từ nào dưới đây gợi tả sự yên tĩnh, thanh bình của cảnh vật vào buổi trưa hè?', 'êm ả', ['náo nhiệt', 'ồn ào', 'ầm ĩ']]],
        [7, 'Hoa phượng', 140, ['Hoa phượng vĩ nở đỏ rực trên sân trường là dấu hiệu báo hiệu mùa nào trong năm đã đến?', 'Mùa hè', ['Mùa đông', 'Mùa xuân', 'Mùa thu']], ['Vì sao hoa phượng vĩ còn được các bạn học trò thân thương gọi là "Hoa học trò"?', 'Vì hoa nở rộ vào dịp kết thúc năm học và gắn liền với trường lớp', ['Vì hoa nở vào dịp Tết Nguyên đán', 'Vì cánh hoa dùng để làm mực viết', 'Vì chỉ có học sinh mới được trồng hoa']]],
        [8, 'Cậu bé thông minh', 144, ['Vinh làm thế nào để lấy quả bưởi dưới hố?', 'Đổ nước đầy hố để quả bưởi nổi lên', ['Nhảy xuống hố nguy hiểm', 'Bỏ quả bưởi lại', 'Dùng đất đá lấp đầy hố']], ['Cậu bé thông minh trong câu chuyện sau này lớn lên trở thành danh nhân kiệt xuất nào?', 'Trạng Lường (Nhà toán học Lương Thế Vinh)', ['Nhà bác học Lê Quý Đôn', 'Thầy giáo Chu Văn An', 'Trạng Trình Nguyễn Bỉnh Khiêm']]],
        [8, 'Lính cứu hoả', 148, ['Công việc của những người lính cứu hoả có đặc điểm và ý nghĩa như thế nào?', 'Rất dũng cảm, sẵn sàng đối mặt nguy hiểm để dập lửa cứu người', ['Rất nhàn hạ và không có nguy hiểm gì', 'Chỉ làm việc trong phòng máy lạnh', 'Chỉ lái xe đi dạo phố']], ['Khi phát hiện có đám cháy khẩn cấp xảy ra, số điện thoại tổng đài cứu hỏa cần gọi ngay là số nào?', 'Số 114', ['Số 113', 'Số 115', 'Số 112']]],
        [8, 'Lớn lên bạn làm gì?', 152, ['Ước mơ trở thành bác sĩ trong tương lai thể hiện mong muốn tốt đẹp nào?', 'Khám chữa bệnh và bảo vệ sức khỏe cho mọi người', ['Để được dùng thuốc tuỳ ý', 'Để bắt nạt bệnh nhân', 'Chỉ để kiếm thật nhiều tiền']], ['Để sau này lớn lên thực hiện được những ước mơ nghề nghiệp cao đẹp, ngay từ bây giờ em cần làm gì?', 'Chăm chỉ học tập, rèn luyện thân thể và giữ đạo đức tốt', ['Suốt ngày chơi trò chơi điện tử', 'Chỉ ngồi chờ lớn lên tự làm được', 'Lười biếng không cần đến trường']]],
        [8, 'Ruộng bậc thang ở Sa Pa', 154, ['Vì sao người dân vùng cao Tây Bắc lại làm những thửa ruộng uốn lượn theo sườn núi gọi là ruộng bậc thang?', 'Để giữ nước và đất canh tác trồng lúa trên sườn đồi dốc', ['Để làm đường đua xe ô tô', 'Để nước chảy trôi hết đất màu', 'Chỉ để ngắm cảnh chụp ảnh']], ['Vào mùa lúa chín rộ, những thửa ruộng bậc thang tuyệt đẹp ở Sa Pa khoác lên mình màu sắc nào?', 'Màu vàng óng ả trải dài bát ngát', ['Màu tím biếc', 'Màu đen sẫm', 'Màu xanh da trời']]],
        [8, 'Nhớ ơn', 156, ['Câu tục ngữ "Ăn quả nhớ kẻ trồng cây" khuyên dạy chúng ta đạo lý sống nào?', 'Lòng biết ơn sâu sắc đối với những người đã tạo ra thành quả cho ta hưởng', ['Chỉ biết hưởng thụ mà không cần cảm ơn', 'Hái quả xong phá bỏ cây đi', 'Không cần nhớ ai giúp đỡ mình']], ['Hành động nào dưới đây thể hiện lòng biết ơn của học sinh đối với cha mẹ và thầy cô?', 'Ngoan ngoãn, lễ phép và chăm chỉ học hành thành người tốt', ['Vòi vĩnh đồ chơi đắt tiền', 'Cãi lời người lớn', 'Lười biếng không làm bài tập']]],
        [8, 'Du lịch biển Việt Nam', 158, ['Nước Việt Nam ta có bờ biển dài với nhiều bãi biển đẹp. Khi đi tắm biển, hành động nào giúp bảo vệ môi trường biển?', 'Không xả rác bừa bãi ra bãi cát và mặt biển', ['Vứt túi ni lông và vỏ chai xuống nước', 'Bẻ san hô dưới biển mang về', 'Chôn rác xuống bãi cát']], ['Để đảm bảo an toàn tuyệt đối khi đi tắm biển cùng gia đình, em cần lưu ý điều gì?', 'Luôn mặc áo phao và tắm ở vùng an toàn dưới sự giám sát của người lớn', ['Tự bơi ra thật xa vùng nước sâu', 'Không cần người lớn đi cùng', 'Nhảy xuống biển khi có sóng to gió lớn']]]
    ];

    for (const [theme, title, page, ...facts] of readings) {
        const lesson = `Chủ điểm ${theme} – ${title}`;
        for (const [q, answer, distractors] of facts) {
            add({
                q,
                a: answer,
                c: distractors,
                lo: `Đọc hiểu và rút ra bài học từ bài “${title}”`,
                difficulty: 'medium',
                book: BOOKS.viet2,
                page,
                lesson,
                explanation: `Kiến thức và bài học này được khai thác từ bài đọc “${title}”.`,
                hints: ['Nhớ lại nhân vật, sự việc và ý nghĩa chính của bài đọc.']
            });
        }
    }

    return questions;
}

fs.mkdirSync(GRADE_DIR, { recursive: true });
writeBank('english.json', buildEnglishBank());
writeBank('science.json', buildScienceBank());
writeBank('viet.json', buildVietnameseBank());
