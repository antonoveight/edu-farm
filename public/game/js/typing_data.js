/**
 * TYPING ACADEMY DATA
 * Ngân hàng bài tập luyện gõ 10 ngón & Bản đồ phân công ngón tay chuẩn cho học sinh
 */

window.TYPING_DATA = {
    // Bản đồ phân công ngón tay & màu sắc đại diện
    fingerMap: {
        left_pinky: {
            name: "Ngón Út Trái",
            hand: "left",
            color: "#ec4899", // Hồng
            keys: ["`", "1", "q", "a", "z", "tab", "capslock", "shift", "control"]
        },
        left_ring: {
            name: "Ngón Áp Út Trái",
            hand: "left",
            color: "#f97316", // Cam
            keys: ["2", "w", "s", "x"]
        },
        left_middle: {
            name: "Ngón Giữa Trái",
            hand: "left",
            color: "#eab308", // Vàng
            keys: ["3", "e", "d", "c"]
        },
        left_index: {
            name: "Ngón Trỏ Trái",
            hand: "left",
            color: "#22c55e", // Xanh lá
            keys: ["4", "5", "r", "t", "f", "g", "v", "b"]
        },
        thumb: {
            name: "Ngón Cái (Cả 2 tay)",
            hand: "both",
            color: "#06b6d4", // Cyan
            keys: [" "]
        },
        right_index: {
            name: "Ngón Trỏ Phải",
            hand: "right",
            color: "#3b82f6", // Xanh dương
            keys: ["6", "7", "y", "u", "h", "j", "n", "m"]
        },
        right_middle: {
            name: "Ngón Giữa Phải",
            hand: "right",
            color: "#8b5cf6", // Tím
            keys: ["8", "i", "k", ","]
        },
        right_ring: {
            name: "Ngón Áp Út Phải",
            hand: "right",
            color: "#d946ef", // Hồng cánh sen
            keys: ["9", "o", "l", "."]
        },
        right_pinky: {
            name: "Ngón Út Phải",
            hand: "right",
            color: "#f43f5e", // Đỏ hồng
            keys: ["0", "-", "=", "p", "[", "]", ";", "'", "/", "\\", "enter", "backspace"]
        }
    },

    // Bảng quy tắc gõ Tiếng Việt
    telexGuide: {
        tones: { "s": "Dấu Sắc (á)", "f": "Dấu Huyền (à)", "r": "Dấu Hỏi (ả)", "x": "Dấu Ngã (ã)", "j": "Dấu Nặng (ạ)", "z": "Xóa dấu" },
        vowels: { "aa": "â", "aw": "ă", "ee": "ê", "oo": "ô", "ow": "ơ", "uw": "ư", "dd": "đ" }
    },
    vniGuide: {
        tones: { "1": "Dấu Sắc (á)", "2": "Dấu Huyền (à)", "3": "Dấu Hỏi (ả)", "4": "Dấu Ngã (ã)", "5": "Dấu Nặng (ạ)" },
        vowels: { "6": "Nón (â, ê, ô)", "7": "Móc (ơ, ư)", "8": "Trăng (ă)", "9": "Gạch (đ)" }
    },

    // Danh sách các cấp độ & bài học
    categories: [
        {
            id: "cat_home_row",
            title: "Cấp 1: Hàng Phím Cơ Sở (Home Row)",
            icon: "fa-solid fa-hand-point-up",
            desc: "Làm quen vị trí 2 ngón trỏ F và J cùng hàng phím cơ sở A-S-D-F J-K-L-;",
            rewardCoins: 5,
            lessons: [
                { id: "h1", name: "Hai ngón trỏ F và J", text: "f j ff jj fj jf f j ff jj fj jf" },
                { id: "h2", name: "Ngón giữa D và K", text: "d k dd kk dk kd f d j k fj dk" },
                { id: "h3", name: "Ngón áp út S và L", text: "s l ss ll sl ls as df jk l;" },
                { id: "h4", name: "Ngón út A và Chấm phẩy ;", text: "a ; aa ;; a; ;a as df jk l;" },
                { id: "h5", name: "Mở rộng ngón trỏ G và H", text: "g h gg hh gh hg fg hj asdf gh jkl;" },
                { id: "h6", name: "Tổng hợp hàng cơ sở", text: "asdf jkl; asdf gh jkl; a s d f g h j k l ;" }
            ]
        },
        {
            id: "cat_top_row",
            title: "Cấp 2: Hàng Phím Trên (Top Row)",
            icon: "fa-solid fa-arrow-up",
            desc: "Vươn các ngón tay lên hàng trên Q-W-E-R-T Y-U-I-O-P",
            rewardCoins: 8,
            lessons: [
                { id: "t1", name: "Ngón trỏ vươn R, T, Y, U", text: "r t y u ru ty fr ju gt hy" },
                { id: "t2", name: "Ngón giữa E và I", text: "e i ee ii de ki ed ik edik" },
                { id: "t3", name: "Ngón áp út W và O", text: "w o ww oo sw lo ws ol swlo" },
                { id: "t4", name: "Ngón út Q và P", text: "q p qq pp aq ;p qa p; qap" },
                { id: "t5", name: "Ghép từ đơn giản không dấu", text: "the red jar toy pig cup hat sun dog cat" }
            ]
        },
        {
            id: "cat_bottom_row",
            title: "Cấp 3: Hàng Phím Dưới (Bottom Row)",
            icon: "fa-solid fa-arrow-down",
            desc: "Kéo ngón tay xuống hàng dưới Z-X-C-V-B N-M-,-.-/",
            rewardCoins: 8,
            lessons: [
                { id: "b1", name: "Ngón trỏ dưới V, B, N, M", text: "v b n m vb nm fv gb jm hn" },
                { id: "b2", name: "Ngón giữa C và Dấu phẩy ,", text: "c , cc ,, dc k, cd ,k dck," },
                { id: "b3", name: "Ngón áp út X và Dấu chấm .", text: "x . xx .. sx l. xs .l sxl." },
                { id: "b4", name: "Ngón út Z và Gạch chéo /", text: "z / zz // az ;/ za /; az;/" },
                { id: "b5", name: "Luyện toàn bộ bảng chữ cái", text: "pack my box with five dozen liquor jugs" }
            ]
        },
        {
            id: "cat_numbers",
            title: "Cấp 4: Hàng Phím Số & Ký Tự",
            icon: "fa-solid fa-hashtag",
            desc: "Luyện hàng phím số 1-9, 0 và các phép tính cộng trừ cơ bản",
            rewardCoins: 10,
            lessons: [
                { id: "n1", name: "Các số tay trái 1, 2, 3, 4, 5", text: "1 2 3 4 5 12 34 51 23 45" },
                { id: "n2", name: "Các số tay phải 6, 7, 8, 9, 0", text: "6 7 8 9 0 67 89 06 78 90" },
                { id: "n3", name: "Phép toán cộng trừ vui", text: "1 + 2 = 3; 4 + 5 = 9; 10 - 3 = 7; 8 + 2 = 10" },
                { id: "n4", name: "Số và chữ kết hợp", text: "lop 1, lop 2, lop 3, lop 4, lop 5; 10 diem 10" }
            ]
        },
        {
            id: "cat_viet_words",
            title: "Cấp 5: Tiếng Việt Có Dấu (Telex / VNI)",
            icon: "fa-solid fa-feather-pointed",
            desc: "Rèn luyện gõ dấu thanh sắc huyền hỏi ngã nặng và các nguyên âm đặc biệt",
            rewardCoins: 12,
            lessons: [
                { id: "v1", name: "Dấu thanh cơ bản: Sắc, Huyền", text: "bé má lá cá cà gà nhà bà lá cờ chú cá lá mía" },
                { id: "v2", name: "Dấu thanh: Hỏi, Ngã, Nặng", text: "cỏ khỉ rùa thỏ gỗ sữa bạn mẹ vịt vẹt con vịt quả bưởi" },
                { id: "v3", name: "Nguyên âm: Â, Ă, Ê, Ô, Ơ, Ư, Đ", text: "cây nấm trăng tròn con bê cô giáo lá mơ quả dưa quả đu đủ" },
                { id: "v4", name: "Từ ngữ Nông Trại Vui Vẻ", text: "nông trại cây xanh hạt giống quả cà chua dưa hấu dâu tây bắp ngô củ cà rốt" },
                { id: "v5", name: "Từ ghép gia đình và trường lớp", text: "ông bà cha mẹ thầy cô bạn bè sách vở bút chì lớp học yêu thương" }
            ]
        },
        {
            id: "cat_sentences",
            title: "Cấp 6: Ca Dao, Tục Ngữ & Đoạn Văn SGK",
            icon: "fa-solid fa-book-open",
            desc: "Nâng cao tốc độ và độ chính xác với các bài học hay trong SGK Tiểu học",
            rewardCoins: 15,
            lessons: [
                { id: "s1", name: "Ca dao về chăm chỉ", text: "Cày đồng đang buổi ban trưa, mồ hôi thánh thót như mưa ruộng cày." },
                { id: "s2", name: "Tục ngữ về học tập", text: "Học thầy không tày học bạn. Có công mài sắt, có ngày nên kim." },
                { id: "s3", name: "Bác Nông Dân và Mảnh Vườn", text: "Mỗi ngày thức dậy, bác nông dân gieo hạt giống, tưới nước mát lành để vườn cây xanh tốt." },
                { id: "s4", name: "Đầm Sen Tươi Đẹp", text: "Trong đầm gì đẹp bằng sen, lá xanh bông trắng lại chen nhị vàng." },
                { id: "s5", name: "Tình Yêu Quê Hương", text: "Việt Nam đất nước ta ơi, mênh mông biển lúa đâu trời đẹp hơn." }
            ]
        }
    ]
};
