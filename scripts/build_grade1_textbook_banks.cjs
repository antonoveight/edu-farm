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
        [1, 'Tôi là học sinh lớp 1', 4, ['Nam học lớp nào?', 'lớp 1A', ['lớp 2A', 'lớp 3A', 'lớp 5A']], ['Bây giờ Nam đã biết làm những gì?', 'Đọc truyện tranh và làm toán', ['Chỉ tô màu', 'Chỉ chơi bóng', 'Lái xe và nấu ăn']]],
        [1, 'Đôi tai xấu xí', 8, ['Vì sao thỏ buồn?', 'Vì bị bạn bè chê đôi tai dài và to', ['Vì không có cà rốt', 'Vì trời mưa', 'Vì bị đau chân']], ['Nhờ đâu cả nhóm tìm được đường về?', 'Nhờ đôi tai thính của thỏ nghe tiếng bố gọi', ['Nhờ nhìn thấy cầu vồng', 'Nhờ gặp bác gấu', 'Nhờ chiếc thuyền']]],
        [1, 'Bạn của gió', 12, ['Khi nhớ bạn, gió làm gì?', 'Gõ cửa, đẩy sóng và thổi căng buồm', ['Nằm ngủ', 'Trốn trong hang', 'Đốt lửa']], ['Khi gió đi vắng, điều gì xảy ra?', 'Lá lặng im, chim không giũ cánh và buồm không ra khơi', ['Sóng lớn hơn', 'Cây chạy đi', 'Trời có tuyết']]],
        [1, 'Giải thưởng tình bạn', 14, ['Khi hoẵng bị ngã, nai làm gì?', 'Dừng lại đỡ hoẵng đứng dậy', ['Chạy nhanh về đích', 'Cười bạn', 'Bỏ cuộc thi']], ['Vì sao nai và hoẵng được trao giải thưởng?', 'Vì tình bạn và biết giúp đỡ nhau', ['Vì về đích đầu tiên', 'Vì chạy một mình', 'Vì có áo đẹp']]],
        [1, 'Sinh nhật của voi con', 18, ['Những ai đến mừng sinh nhật voi con?', 'Thỏ trắng, gấu đen, khỉ vàng, sóc nâu và vẹt', ['Chỉ có hổ', 'Cá và tôm', 'Không có ai']], ['Voi con làm gì để cảm ơn các bạn?', 'Huơ vòi mấy vòng', ['Ngủ tiếp', 'Chạy ra khỏi nhà', 'Giấu quà']]],
        [2, 'Nụ hôn trên bàn tay', 24, ['Mẹ dặn Nam làm gì khi lo lắng?', 'Áp bàn tay có nụ hôn của mẹ lên má', ['Chạy về nhà', 'Giấu bàn tay', 'Không vào lớp']], ['Sau khi chào mẹ, Nam làm gì?', 'Tung tăng bước vào lớp', ['Ngồi khóc ở cổng', 'Đi về nhà', 'Chạy ra công viên']]],
        [2, 'Làm anh', 28, ['Khi em bé khóc hoặc ngã, người anh nên làm gì?', 'Dỗ dành và nâng em dịu dàng', ['Trêu em', 'Bỏ đi chơi', 'Giành đồ chơi']], ['Vì sao làm anh tuy khó mà vui?', 'Vì yêu em bé', ['Vì được nhiều quà', 'Vì không cần nhường em', 'Vì không phải giúp ai']]],
        [2, 'Cả nhà đi chơi núi', 30, ['Mẹ chuẩn bị gì cho chuyến đi núi?', 'Quần áo, thức ăn, nước uống và thuốc chống côn trùng', ['Chỉ đồ chơi', 'Chỉ sách vở', 'Không chuẩn bị gì']], ['Ở đoạn đường dốc và khúc khuỷu, bố làm gì?', 'Cõng Đức', ['Quay về nhà', 'Đi xe đạp', 'Để Đức ở lại']]],
        [2, 'Quạt cho bà ngủ', 34, ['Vì sao bạn nhỏ bảo chích choè đừng hót?', 'Vì bà đang ốm và cần ngủ', ['Vì chim hót dở', 'Vì trời mưa', 'Vì bạn muốn đi chơi']], ['Bạn nhỏ làm gì khi bà ngủ?', 'Quạt đều cho bà', ['Bật nhạc lớn', 'Chạy nhảy', 'Gọi bà dậy']]],
        [2, 'Bữa cơm gia đình', 36, ['Ngày Gia đình Việt Nam là ngày nào?', '28 tháng 6', ['1 tháng 1', '1 tháng 6', '20 tháng 11']], ['Gia đình Chi chuẩn bị bữa cơm như thế nào?', 'Mỗi người cùng làm một việc để giúp mẹ', ['Chỉ mẹ làm mọi việc', 'Cả nhà đi vắng', 'Không ai dọn dẹp']]],
        [2, 'Ngôi nhà', 40, ['Trước ngõ nhà bạn nhỏ có hoa gì?', 'Hoa xoan', ['Hoa sen', 'Hoa phượng', 'Hoa súng']], ['Bạn nhỏ yêu ngôi nhà như yêu điều gì?', 'Yêu đất nước', ['Yêu đồ chơi', 'Yêu bánh kẹo', 'Yêu chiếc xe']]],
        [3, 'Tôi đi học', 44, ['Ai dẫn bạn nhỏ đến trường trong ngày đầu đi học?', 'Mẹ', ['Bố', 'Anh trai', 'Bạn cùng lớp']], ['Vì sao cảnh vật quen thuộc bỗng thấy lạ?', 'Vì lòng bạn nhỏ đang có sự thay đổi lớn: hôm nay đi học', ['Vì con đường mới xây', 'Vì trời tối', 'Vì bạn quên đường']]],
        [3, 'Đi học', 48, ['Vì sao hôm nay bạn nhỏ đi học một mình?', 'Vì mẹ lên nương', ['Vì trường đóng cửa', 'Vì bạn không có mẹ', 'Vì trời mưa']], ['Trường của bạn nhỏ có đặc điểm gì?', 'Be bé, nằm lặng giữa rừng cây', ['Rất lớn giữa thành phố', 'Ở trên biển', 'Ở trong hang']]],
        [3, 'Hoa yêu thương', 50, ['Bức tranh của Hà có hình gì?', 'Bông hoa bốn cánh', ['Con thuyền', 'Ngôi nhà', 'Cầu vồng']], ['Giữa nhuỵ hoa trong tranh là ai?', 'Cô giáo đang cười tươi', ['Bạn Hà', 'Bác bảo vệ', 'Một chú mèo']]],
        [3, 'Cây bàng và lớp học', 54, ['Tán lá bàng được so sánh với gì?', 'Một chiếc ô xanh mướt', ['Một chiếc thuyền', 'Một quả bóng', 'Một ngọn núi']], ['Thứ Hai, cây bàng vui vì điều gì?', 'Lớp học lại tưng bừng và có các bạn', ['Trời mưa lớn', 'Sân trường vắng', 'Không có tiếng cô']]],
        [3, 'Bác trống trường', 56, ['Hằng ngày, trống trường giúp học sinh việc gì?', 'Ra vào lớp đúng giờ', ['Nấu bữa trưa', 'Tưới cây', 'Chở học sinh']], ['Ngày khai trường, tiếng trống báo hiệu điều gì?', 'Một năm học mới', ['Kì nghỉ hè bắt đầu', 'Trời sắp mưa', 'Đến giờ ngủ']]],
        [3, 'Giờ ra chơi', 60, ['Những trò chơi nào được nhắc trong bài?', 'Nhảy dây và đá cầu', ['Bơi và chèo thuyền', 'Cờ vua và câu cá', 'Trượt tuyết và leo núi']], ['Khi giờ chơi chấm dứt, các bạn làm gì?', 'Xếp hàng nhanh vào lớp', ['Tiếp tục chơi', 'Đi về nhà', 'Chạy ra cổng']]],
        [4, 'Rửa tay trước khi ăn', 64, ['Vi trùng từ tay đi vào cơ thể bằng cách nào?', 'Theo thức ăn đi vào cơ thể', ['Theo tiếng nói', 'Theo ánh sáng', 'Theo quần áo sạch']], ['Cần rửa tay thế nào để phòng bệnh?', 'Rửa bằng xà phòng với nước sạch', ['Chỉ lau vào áo', 'Rửa bằng nước bẩn', 'Không cần rửa']]],
        [4, 'Lời chào đi trước', 68, ['Lời chào được so sánh với những gì?', 'Bông hoa, cơn gió mát và bàn tay', ['Cơn mưa và hòn đá', 'Chiếc xe và con đường', 'Quyển vở và bút chì']], ['Bài thơ nhắc bạn mang theo điều gì khi đi đâu?', 'Lời chào', ['Đồ chơi', 'Bánh kẹo', 'Chiếc gối']]],
        [4, 'Khi mẹ vắng nhà', 70, ['Dê mẹ dặn đàn dê con khi nào mới được mở cửa?', 'Khi nghe đúng tiếng mẹ', ['Khi bất cứ ai gọi', 'Khi sói giả giọng', 'Khi trời tối']], ['Đàn dê con làm gì khi sói giả giọng mẹ?', 'Không mở cửa', ['Mở cửa ngay', 'Đi theo sói', 'Rời khỏi nhà']]],
        [4, 'Nếu không may bị lạc', 74, ['Bố cho Nam và em đi chơi ở đâu?', 'Công viên', ['Bãi biển', 'Nhà ga', 'Thư viện']], ['Nhờ lời bố dặn, Nam tìm lại gia đình bằng cách nào?', 'Đi theo biển chỉ lối ra cổng có lá cờ lớn', ['Đi theo người lạ', 'Chạy sâu vào công viên', 'Ngồi im ở chỗ vắng']]],
        [4, 'Đèn giao thông', 78, ['Đèn giao thông có mấy màu?', 'Ba màu: đỏ, vàng, xanh', ['Hai màu', 'Bốn màu', 'Một màu']], ['Đèn vàng báo hiệu điều gì?', 'Đi chậm lại trước khi dừng hẳn', ['Đi thật nhanh', 'Được đi tự do', 'Quay đầu ngay']]],
        [5, 'Kiến và chim bồ câu', 84, ['Bồ câu cứu kiến bằng cách nào?', 'Thả một chiếc lá xuống nước cho kiến bám vào', ['Đẩy kiến xuống sâu hơn', 'Gọi thợ săn', 'Bay đi']], ['Kiến cứu bồ câu bằng cách nào?', 'Cắn chân người thợ săn', ['Giấu chiếc lá', 'Kêu bồ câu ngủ', 'Bẻ cành cây']]],
        [5, 'Câu chuyện của rễ', 88, ['Nhờ có rễ, hoa, quả và lá như thế nào?', 'Hoa nở đẹp, quả trĩu cành và lá biếc xanh', ['Đều khô héo', 'Đều rơi ngay', 'Không thay đổi']], ['Đức tính đáng quý của rễ là gì?', 'Khiêm nhường, lặng lẽ làm đẹp cho đời', ['Hay khoe khoang', 'Lười biếng', 'Nóng nảy']]],
        [5, 'Câu hỏi của sói', 90, ['Vì sao sói lúc nào cũng buồn bực?', 'Vì hay gây gổ nên không có bạn bè', ['Vì không biết leo cây', 'Vì trời mưa', 'Vì không có thức ăn']], ['Vì sao sóc luôn vui vẻ?', 'Vì có nhiều bạn tốt', ['Vì luôn ngủ', 'Vì làm sói sợ', 'Vì ở một mình']]],
        [5, 'Chú bé chăn cừu', 94, ['Vì sao các bác nông dân không đến cứu khi sói xuất hiện thật?', 'Vì chú bé đã nhiều lần nói dối', ['Vì không nghe thấy', 'Vì đang ngủ', 'Vì không có sói']], ['Bài học chính của câu chuyện là gì?', 'Không nên nói dối vì sẽ mất lòng tin', ['Nên trêu người khác', 'Nên kêu cứu giả', 'Không cần giúp ai']]],
        [5, 'Tiếng vọng của núi', 98, ['Tiếng từ vách núi đáp lại gấu con là hiện tượng gì?', 'Tiếng vọng', ['Tiếng mưa', 'Tiếng chuông', 'Tiếng nhạc']], ['Sau khi nói “Tôi yêu bạn” với núi, gấu con cảm thấy thế nào?', 'Bật cười vui vẻ', ['Tủi thân hơn', 'Sợ hãi', 'Tức giận']]],
        [6, 'Loài chim của biển cả', 104, ['Ngoài bay xa, hải âu còn có khả năng gì?', 'Bơi rất giỏi nhờ chân có màng', ['Đào hang', 'Leo cây bằng tay', 'Chạy dưới đất rất lâu']], ['Vì sao hải âu được gọi là loài chim báo bão?', 'Khi sắp có bão, chúng bay thành đàn tìm nơi trú ẩn', ['Vì chúng tạo ra bão', 'Vì lông đổi màu đỏ', 'Vì chúng không biết bay']]],
        [6, 'Bảy sắc cầu vồng', 108, ['Cầu vồng thường xuất hiện khi nào?', 'Khi vừa mưa lại có nắng', ['Giữa đêm không trăng', 'Khi trời hoàn toàn khô', 'Trong phòng kín']], ['Bảy màu cầu vồng theo bài thơ là gì?', 'Đỏ, cam, vàng, lục, lam, chàm, tím', ['Đỏ, đen, trắng', 'Cam, nâu, xám', 'Chỉ xanh và đỏ']]],
        [6, 'Chúa tể rừng xanh', 110, ['Hổ ăn gì và sống ở đâu?', 'Ăn thịt và sống trong rừng', ['Ăn cỏ và sống dưới nước', 'Ăn hạt và sống trong nhà', 'Ăn lá và sống trên trời']], ['Đặc điểm nào giúp hổ săn mồi?', 'Răng và vuốt sắc, chân khoẻ, di chuyển nhanh', ['Cánh rộng', 'Vây dài', 'Mai cứng']]],
        [6, 'Cuộc thi tài năng rừng xanh', 114, ['Chim công biểu diễn tiết mục gì?', 'Điệu múa tuyệt đẹp', ['Khoét tổ', 'Đu cây', 'Bắt chước tiếng']], ['Voọc xám làm mọi người trầm trồ với tiết mục gì?', 'Đu cây điêu luyện', ['Hót ngao ngao', 'Múa xoè đuôi', 'Khoét tổ']]],
        [6, 'Cây liễu dẻo dai', 118, ['Vì sao cây liễu không dễ bị gió làm gãy?', 'Thân dẻo dai, cành mềm mại chuyển động theo gió', ['Thân bằng sắt', 'Cây trốn dưới đất', 'Không có cành']], ['Vì sao liễu là loài cây dễ trồng?', 'Cắm cành xuống đất có thể mọc thành cây non', ['Không cần đất', 'Chỉ sống trong nước', 'Không cần ánh sáng']]],
        [7, 'Tia nắng đi đâu?', 124, ['Buổi sáng, bé thấy tia nắng ở đâu?', 'Trong lòng tay, trên bàn học và trên tán cây', ['Dưới đáy biển', 'Trong tủ kín', 'Dưới lòng đất']], ['Theo bé, buổi tối tia nắng ngủ ở đâu?', 'Ở nhà nắng', ['Trong cặp sách', 'Dưới ao', 'Trên xe buýt']]],
        [7, 'Trong giấc mơ buổi sáng', 126, ['Trong giấc mơ, ông mặt trời làm gì?', 'Mang túi hoa nắng rải khắp nơi', ['Mang mưa đá', 'Đi ngủ', 'Trốn sau núi']], ['Ai gọi bạn nhỏ dậy học bài?', 'Chú gà trống', ['Chú mèo', 'Con cá', 'Bác gấu']]],
        [7, 'Ngày mới bắt đầu', 128, ['Buổi sáng, điều gì đánh thức mọi vật?', 'Những tia nắng', ['Tiếng mưa đá', 'Bóng tối', 'Tuyết rơi']], ['Sau khi thức dậy, bé làm gì?', 'Chuẩn bị đến trường', ['Đi ngủ tiếp', 'Ra sông bơi', 'Trốn trong nhà']]],
        [7, 'Hỏi mẹ', 132, ['Bạn nhỏ hỏi mẹ về những gì?', 'Gió, màu trời, trăng rằm và chú Cuội', ['Chỉ đồ chơi', 'Chỉ bài toán', 'Chỉ món ăn']], ['Theo bạn nhỏ, vì sao phi công bay lên thăm Cuội?', 'Vì Cuội buồn', ['Vì Cuội gọi mưa', 'Vì phi công lạc đường', 'Vì trên đó có trường học']]],
        [7, 'Những cánh cò', 134, ['Ngày trước, cò kiếm ăn ở đâu?', 'Ở ao, hồ và đầm', ['Trong nhà máy', 'Trên đường cao tốc', 'Trong lớp học']], ['Điều gì khiến đàn cò rời đi?', 'Mất nơi kiếm ăn và tiếng ồn làm chúng sợ', ['Có quá nhiều cây', 'Trời luôn mát', 'Được cho thêm thức ăn']]],
        [7, 'Buổi trưa hè', 138, ['Những con vật nào được nhắc đến trong bài thơ?', 'Trâu, bò và bướm', ['Hổ, báo và voi', 'Cá, tôm và cua', 'Gấu và sói']], ['Từ ngữ nào cho thấy buổi trưa hè yên tĩnh?', 'Lim dim, nằm im, êm ả', ['Ồn ào, náo nhiệt', 'Vun vút, dõng dạc', 'Tíu tít, rộn ràng']]],
        [7, 'Hoa phượng', 140, ['Những hình ảnh nào cho thấy hoa phượng nở nhiều?', 'Rừng rực trên cành, cả dãy phố và một trời hoa đỏ', ['Chỉ một nụ nhỏ', 'Không có bông nào', 'Chỉ có lá xanh']], ['Hoa phượng trong bài được trồng ở đâu?', 'Trên dãy phố', ['Dưới biển', 'Trong hang', 'Trên đỉnh núi tuyết']]],
        [8, 'Cậu bé thông minh', 144, ['Vinh làm thế nào để lấy quả bưởi dưới hố?', 'Đổ nước đầy hố để quả bưởi nổi lên', ['Nhảy xuống hố', 'Bỏ quả bưởi lại', 'Đào hố sâu hơn']], ['Cậu bé Vinh sau này trở thành ai?', 'Nhà toán học Lương Thế Vinh', ['Một thuỷ thủ', 'Một đầu bếp', 'Một nhạc sĩ']]],
        [8, 'Lính cứu hoả', 148, ['Lính cứu hoả dập đám cháy bằng cách nào?', 'Dùng vòi phun nước', ['Dùng giấy', 'Dùng quạt', 'Dùng cát đồ chơi']], ['Công việc cứu hoả có đặc điểm gì?', 'Nguy hiểm và cần sự dũng cảm', ['Rất nhàn và không nguy hiểm', 'Chỉ làm trong lớp học', 'Không cần dụng cụ']]],
        [8, 'Lớn lên bạn làm gì?', 152, ['Bạn nhỏ muốn làm thuỷ thủ để làm gì?', 'Lái tàu vượt sóng và qua đại dương', ['Trồng lúa', 'Nấu bánh', 'Dạy học']], ['Bạn nhỏ muốn làm đầu bếp để làm gì?', 'Làm bánh đẹp và nấu món mì ngon', ['Lái tàu', 'Gieo hạt', 'Chữa cháy']]],
        [8, 'Ruộng bậc thang ở Sa Pa', 154, ['Vào mùa lúa chín, ruộng bậc thang Sa Pa có màu gì?', 'Màu vàng trải dài', ['Màu tím', 'Màu đen', 'Màu trắng']], ['Ai tạo nên những khu ruộng bậc thang?', 'Người Mông, Dao, Hà Nhì sống ở Sa Pa', ['Khách du lịch', 'Thuỷ thủ', 'Lính cứu hoả']]],
        [8, 'Nhớ ơn', 156, ['Bài đồng dao nhắc chúng ta nhớ ơn ai?', 'Những người làm ra thức ăn và giúp đỡ cuộc sống', ['Chỉ người bán đồ chơi', 'Không cần nhớ ai', 'Chỉ người nổi tiếng']], ['Việc nào thể hiện lòng biết ơn?', 'Trân trọng thành quả và nói lời cảm ơn', ['Lãng phí thức ăn', 'Chê bai người lao động', 'Làm hỏng đồ vật']]],
        [8, 'Du lịch biển Việt Nam', 158, ['Những bãi biển nổi tiếng trong bài thuộc các nơi nào?', 'Thanh Hoá, Đà Nẵng và Khánh Hoà', ['Sa Pa, Hà Giang và Lào Cai', 'Hà Nội và Bắc Ninh', 'Chỉ ở nước ngoài']], ['Vì sao hình dạng đồi cát ở Mũi Né luôn thay đổi?', 'Vì cát bay', ['Vì có tuyết', 'Vì cây mọc nhanh', 'Vì người xây nhà']]]
    ];

    for (const [theme, title, page, ...facts] of readings) {
        const lesson = `Chủ điểm ${theme} – ${title}`;
        for (const [q, answer, distractors] of facts) {
            add({
                q,
                a: answer,
                c: distractors,
                lo: `Đọc hiểu và tìm chi tiết trong bài “${title}”`,
                difficulty: 'medium',
                book: BOOKS.viet2,
                page,
                lesson,
                explanation: `Chi tiết này được nêu trong bài đọc “${title}”.`,
                hints: ['Nhớ lại nhân vật, sự việc hoặc hình ảnh chính của bài đọc.']
            });
        }
    }

    return questions;
}

fs.mkdirSync(GRADE_DIR, { recursive: true });
writeBank('english.json', buildEnglishBank());
writeBank('science.json', buildScienceBank());
writeBank('viet.json', buildVietnameseBank());
