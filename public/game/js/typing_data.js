/**
 * TYPING ACADEMY DATA
 * Ngân hàng bài tập luyện gõ 10 ngón chuẩn hóa & Bản đồ phân công ngón tay cho học sinh
 * Tích hợp 6 Mini-game Nông Trại Độc Đáo cho 6 Cấp Độ Luyện Gõ
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

    // Danh sách 6 cấp độ luyện gõ & 6 Mini-game Nông Trại tương ứng
    categories: [
        // ================= CẤP 1: HÀNG CƠ SỞ (HOME ROW) =================
        {
            id: "cat_home_row",
            title: "Cấp 1: Hàng Phím Cơ Sở (Home Row)",
            icon: "fa-solid fa-hand-point-up",
            desc: "Làm quen vị trí 2 ngón trỏ F và J cùng hàng phím cơ sở A-S-D-F J-K-L-;",
            rewardCoins: 10,
            miniGame: {
                title: "Thu Hoạch Nông Sản Rơi",
                theme: "farm_drop",
                groundText: "🧺 HỨNG NÔNG SẢN VÀO GIỎ BẰNG CÁCH GÕ ĐÚNG PHÍM",
                keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
                items: [
                    { icon: "🍎", name: "Táo đỏ" },
                    { icon: "🍅", name: "Cà chua" },
                    { icon: "🍓", name: "Dâu tây" },
                    { icon: "🥕", name: "Cà rốt" }
                ],
                targetCount: 20,
                speed: 3.5,
                rewardCoins: 25,
                rewardXp: 50
            },
            lessons: [
                {
                    id: "h1",
                    name: "2 Phím mốc quan trọng: F và J",
                    text: "f j fj jf ff jj fff jjj fjf jfj ffj jjf fjj jff fjfj jfjf fj fj jf jf f f j j"
                },
                {
                    id: "h2",
                    name: "Ngón giữa: D và K",
                    text: "d k dk kd dd kk df jk fd kj fdk jkd dkk kdd dfjk jkfd d k d k dk kd dkfd jkdf"
                },
                {
                    id: "h3",
                    name: "Ngón áp út: S và L",
                    text: "s l sl ls ss ll sd lk ds kl asdf jkl; slad laks fall lass flask lads glad slat"
                },
                {
                    id: "h4",
                    name: "Ngón út: A và Chấm phẩy ;",
                    text: "a ; a; ;a aa ;; as l; sa ;l asdf ;lkj fall glad salad asks flask flak shall"
                },
                {
                    id: "h5",
                    name: "Ngón trỏ vươn ngang: G và H",
                    text: "g h gh hg fg jh gf hj fgjh hjgf glad half hash flag flash dash half gash gala"
                },
                {
                    id: "h6",
                    name: "Tổng hợp từ có nghĩa hàng Cơ sở",
                    text: "a lad had a salad; all lads had flags; dad glad as a flash; fall as a leaf"
                }
            ]
        },

        // ================= CẤP 2: HÀNG TRÊN (TOP ROW) =================
        {
            id: "cat_top_row",
            title: "Cấp 2: Hàng Phím Trên (Top Row)",
            icon: "fa-solid fa-arrow-up",
            desc: "Vươn ngón tay lên hàng phím trên Q-W-E-R-T Y-U-I-O-P",
            rewardCoins: 12,
            miniGame: {
                title: "Bắn Bóng Bay Mây Trời Nông Trại",
                theme: "balloon_rise",
                groundText: "🎈 GÕ PHÍM ĐỂ BẮN NỔ BÓNG BAY TRƯỚC KHI BAY LÊN TRỜI MÂY",
                keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                items: [
                    { icon: "🍇", name: "Chùm nho" },
                    { icon: "🌽", name: "Bắp ngô" },
                    { icon: "🥦", name: "Bông cải" },
                    { icon: "🍉", name: "Dưa hấu" }
                ],
                targetCount: 22,
                speed: 3.2,
                rewardCoins: 30,
                rewardXp: 60
            },
            lessons: [
                {
                    id: "t1",
                    name: "Ngón trỏ vươn R, T, Y, U",
                    text: "r t y u ru ty fr ju gt hy fry try rug tug yurt jury rut hut fur guy tree turn"
                },
                {
                    id: "t2",
                    name: "Ngón giữa E và I",
                    text: "e i ee ii de ki ed ik edik die tie lie red kid fit hit sit ride hide tide fire"
                },
                {
                    id: "t3",
                    name: "Ngón áp út W và O",
                    text: "w o ww oo sw lo ws ol swlo row cow how tow low flow slow wolf owl work food"
                },
                {
                    id: "t4",
                    name: "Ngón út Q và P",
                    text: "q p qq pp aq ;p qa p; qap quit play trip jump plum part pool quiz drop stop"
                },
                {
                    id: "t5",
                    name: "Ghép từ hàng Cơ sở & Hàng Trên",
                    text: "the red jar toy pig cup hat sun dog cat water tree plant seed fruit sweet"
                }
            ]
        },

        // ================= CẤP 3: HÀNG DƯỚI (BOTTOM ROW) =================
        {
            id: "cat_bottom_row",
            title: "Cấp 3: Hàng Phím Dưới (Bottom Row)",
            icon: "fa-solid fa-arrow-down",
            desc: "Kéo ngón tay xuống hàng dưới Z-X-C-V-B N-M-,-.-/",
            rewardCoins: 15,
            miniGame: {
                title: "Đào Khoai & Đập Chuột Chũi",
                theme: "whack_mole",
                groundText: "🕳️ GÕ PHÍM ĐỂ ĐẬP CHUỘT CHŨI & THU HOẠCH KHOAI DƯỚI HANG",
                keys: ["z", "x", "c", "v", "b", "n", "m", ",", "."],
                items: [
                    { icon: "🥔", name: "Khoai tây" },
                    { icon: "🦔", name: "Chuột chũi" },
                    { icon: "🥜", name: "Củ lạc" },
                    { icon: "🍠", name: "Khoai lang" }
                ],
                targetCount: 20,
                stayDuration: 2600,
                rewardCoins: 35,
                rewardXp: 70
            },
            lessons: [
                {
                    id: "b1",
                    name: "Ngón trỏ dưới V, B, N, M",
                    text: "v b n m vb nm fv gb jm hn van ban man men mob rob farm bean vine oven norm"
                },
                {
                    id: "b2",
                    name: "Ngón giữa C và Dấu phẩy ,",
                    text: "c , cc ,, dc k, cd ,k dck, cat cup cow, ice car, rock cap, clean cool club,"
                },
                {
                    id: "b3",
                    name: "Ngón áp út X và Dấu chấm .",
                    text: "x . xx .. sx l. xs .l sxl. box fox six. mix wax tax. next text flex. fix box."
                },
                {
                    id: "b4",
                    name: "Ngón út Z và Gạch chéo /",
                    text: "z / zz // az ;/ za /; az;/ zoo zap zip zero zone lazy maze zoom quiz size/mix"
                },
                {
                    id: "b5",
                    name: "Luyện toàn bộ bảng chữ cái (Pangram)",
                    text: "the quick brown fox jumps over the lazy dog. pack my box with five dozen jugs."
                }
            ]
        },

        // ================= CẤP 4: HÀNG SỐ & KÝ TỰ =================
        {
            id: "cat_numbers",
            title: "Cấp 4: Hàng Phím Số & Ký Tự",
            icon: "fa-solid fa-hashtag",
            desc: "Luyện hàng phím số 1-9, 0 và các phép tính toán học cơ bản",
            rewardCoins: 18,
            miniGame: {
                title: "Xếp Thùng Hàng Xe Tải Nông Sản",
                theme: "truck_loading",
                groundText: "🚚 GÕ ĐÚNG SỐ ĐỂ ĐÓNG THÙNG NÔNG SẢN LÊN XE TẢI",
                keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-"],
                items: [
                    { icon: "🌾", name: "Bao lúa" },
                    { icon: "🌻", name: "Bao hạt" },
                    { icon: "🍄", name: "Hộp nấm" },
                    { icon: "🥚", name: "Khay trứng" }
                ],
                targetCount: 22,
                speed: 3.0,
                rewardCoins: 40,
                rewardXp: 80
            },
            lessons: [
                {
                    id: "n1",
                    name: "Các số tay trái 1, 2, 3, 4, 5",
                    text: "1 2 3 4 5 12 34 51 23 45 11 22 33 44 55 135 245 123 451 543 21 14 25 31"
                },
                {
                    id: "n2",
                    name: "Các số tay phải 6, 7, 8, 9, 0",
                    text: "6 7 8 9 0 67 89 06 78 90 66 77 88 99 00 680 790 678 890 098 76 69 70 86"
                },
                {
                    id: "n3",
                    name: "Phép toán cộng trừ nông trại",
                    text: "1 + 2 = 3; 4 + 5 = 9; 10 - 3 = 7; 8 + 2 = 10; 15 - 5 = 10; 6 + 4 = 10; 9 - 4 = 5"
                },
                {
                    id: "n4",
                    name: "Số lượng nông sản và điểm số",
                    text: "lop 1, lop 2, lop 3, lop 4, lop 5; 10 diem 10; 100 cay lua; 50 trai tao; 24 gio"
                }
            ]
        },

        // ================= CẤP 5: TIẾNG VIỆT DẤU THANH (TELEX / VNI) =================
        {
            id: "cat_viet_words",
            title: "Cấp 5: Tiếng Việt Có Dấu (Telex / VNI)",
            icon: "fa-solid fa-feather-pointed",
            desc: "Rèn luyện gõ dấu thanh sắc huyền hỏi ngã nặng và các nguyên âm tiếng Việt",
            rewardCoins: 20,
            miniGame: {
                title: "Bảo Vệ Vườn Rau Khỏi Đàn Sâu Bọ",
                theme: "pest_defense",
                groundText: "🐛 GÕ ĐÚNG TỪ TIẾNG VIỆT ĐỂ PHUN NƯỚC TRỪ SÂU BẢO VỆ VƯỜN",
                words: [
                    { word: "cây", icon: "🌱" },
                    { word: "lá", icon: "🍃" },
                    { word: "hoa", icon: "🌸" },
                    { word: "quả", icon: "🍎" },
                    { word: "rau", icon: "🥦" },
                    { word: "bắp", icon: "🌽" },
                    { word: "nước", icon: "💧" },
                    { word: "đất", icon: "🟫" },
                    { word: "lúa", icon: "🌾" },
                    { word: "cà", icon: "🍅" },
                    { word: "cam", icon: "🍊" },
                    { word: "sen", icon: "🪷" }
                ],
                targetCount: 15,
                speed: 3.4,
                rewardCoins: 45,
                rewardXp: 90
            },
            lessons: [
                {
                    id: "v1",
                    name: "Dấu thanh cơ bản: Sắc và Huyền",
                    text: "bé má lá cá cà gà nhà bà lá cờ chú cá lá mía chú bò mùa lúa chú mèo vàng"
                },
                {
                    id: "v2",
                    name: "Dấu thanh: Hỏi, Ngã và Nặng",
                    text: "cỏ khỉ rùa thỏ gỗ sữa bạn mẹ vịt vẹt con vịt quả bưởi giọt nước hạt gạo ngọc"
                },
                {
                    id: "v3",
                    name: "Nguyên âm: Â, Ă, Ê, Ô, Ơ, Ư, Đ",
                    text: "cây nấm trăng tròn con bê cô giáo lá mơ quả dưa quả đu đủ đường làng đất đỏ"
                },
                {
                    id: "v4",
                    name: "Từ vựng Nông Trại Vui Vẻ",
                    text: "nông trại cây xanh hạt giống quả cà chua dưa hấu dâu tây bắp ngô củ cà rốt vườn rau"
                },
                {
                    id: "v5",
                    name: "Từ ghép Gia Đình & Trường Học",
                    text: "ông bà cha mẹ thầy cô bạn bè sách vở bút chì lớp học yêu thương kính trọng lễ phép"
                }
            ]
        },

        // ================= CẤP 6: CA DAO & ĐOẠN VĂN SIÊU TỐC =================
        {
            id: "cat_sentences",
            title: "Cấp 6: Ca Dao, Tục Ngữ & Đoạn Văn SGK",
            icon: "fa-solid fa-book-open",
            desc: "Nâng cao tốc độ và độ chính xác với các câu ca dao và bài học hay",
            rewardCoins: 25,
            miniGame: {
                title: "Đua Xe Máy Cày Gặt Lúa Bội Thu",
                theme: "tractor_rush",
                groundText: "🚜 GÕ NHANH CÂU CA DAO ĐỂ TĂNG TỐC NITRO MÁY CÀY VỀ ĐÍCH",
                phrases: [
                    "Cày đồng đang buổi ban trưa",
                    "Mồ hôi thánh thót như mưa ruộng cày",
                    "Ai ơi bưng bát cơm đầy",
                    "Dẻo thơm một hạt đắng cay muôn phần",
                    "Học thầy không tày học bạn",
                    "Có công mài sắt có ngày nên kim",
                    "Đi một ngày đàng học một sàng khôn",
                    "Việt Nam đất nước ta ơi",
                    "Mênh mông biển lúa đâu trời đẹp hơn"
                ],
                targetCount: 6,
                rewardCoins: 50,
                rewardXp: 100
            },
            lessons: [
                {
                    id: "s1",
                    name: "Ca dao về đức tính chăm chỉ",
                    text: "Cày đồng đang buổi ban trưa, mồ hôi thánh thót như mưa ruộng cày. Ai ơi bưng bát cơm đầy, dẻo thơm một hạt đắng cay muôn phần."
                },
                {
                    id: "s2",
                    name: "Tục ngữ về tinh thần học tập",
                    text: "Học thầy không tày học bạn. Có công mài sắt, có ngày nên kim. Đi một ngày đàng, học một sàng khôn."
                },
                {
                    id: "s3",
                    name: "Bác Nông Dân và Mảnh Vườn",
                    text: "Mỗi ngày thức dậy sớm, bác nông dân ra đồng gieo từng hạt giống nhỏ, chăm sóc tưới nước mát lành để vườn cây luôn tốt tươi."
                },
                {
                    id: "s4",
                    name: "Đầm Sen Tươi Đẹp Quê Hương",
                    text: "Trong đầm gì đẹp bằng sen, lá xanh bông trắng lại chen nhị vàng. Nhị vàng bông trắng lá xanh, gần bùn mà chẳng hôi tanh mùi bùn."
                },
                {
                    id: "s5",
                    name: "Tình Yêu Đất Nước Việt Nam",
                    text: "Việt Nam đất nước ta ơi, mênh mông biển lúa đâu trời đẹp hơn. Cánh cò bay lả dập dờn, mây mờ che đỉnh Trường Sơn sớm chiều."
                }
            ]
        }
    ]
};
