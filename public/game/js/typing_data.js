/**
 * TYPING ACADEMY DATA
 * Ngân hàng bài tập luyện gõ 10 ngón chuẩn hóa & Bản đồ phân công ngón tay cho học sinh
 * Tích hợp bài tập lũy tiến và dữ liệu Mini-game Ôn tập Nông Trại
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
            rewardCoins: 10,
            miniGame: {
                title: "Thu Hoạch Nông Sản Hàng Cơ Sở",
                theme: "farm_drop",
                keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
                items: [
                    { icon: "🍎", name: "Táo đỏ" },
                    { icon: "🍅", name: "Cà chua" },
                    { icon: "🍓", name: "Dâu tây" },
                    { icon: "🥕", name: "Cà rốt" }
                ],
                targetCount: 20,
                speed: 3.5, // Giây rơi từ đỉnh xuống đất
                rewardCoins: 25,
                rewardXp: 50
            },
            lessons: [
                {
                    id: "h1",
                    name: "Hai ngón trỏ F và J",
                    text: "f j f j ff jj fj jf ff jj f f j j fj jf fjj fff jjj fjf jfj f j ff jj fj"
                },
                {
                    id: "h2",
                    name: "Ngón giữa D và K",
                    text: "d k d k dd kk dk kd f d j k fj dk df jk fd jk dd kk fkd jdf d k dk kd"
                },
                {
                    id: "h3",
                    name: "Ngón áp út S và L",
                    text: "s l s l ss ll sl ls as df jk l; sad lad sal fas las fads slad ss ll sl"
                },
                {
                    id: "h4",
                    name: "Ngón út A và Dấu chấm phẩy ;",
                    text: "a ; a ; aa ;; a; ;a as df jk l; all fall dad ask flash glad lad; ask; all;"
                },
                {
                    id: "h5",
                    name: "Mở rộng ngón trỏ G và H",
                    text: "g h g h gg hh gh hg fg hj gh asdf gh jkl; half flag glad dash hall gash"
                },
                {
                    id: "h6",
                    name: "Tổng hợp từ ghép Hàng Cơ Sở",
                    text: "dad sad fad lad had ask flash glad hall fall flag half dash莎 asdf jkl; gh"
                }
            ]
        },
        {
            id: "cat_top_row",
            title: "Cấp 2: Hàng Phím Trên (Top Row)",
            icon: "fa-solid fa-arrow-up",
            desc: "Vươn các ngón tay lên hàng trên Q-W-E-R-T Y-U-I-O-P",
            rewardCoins: 12,
            miniGame: {
                title: "Cơn Mưa Hạt Giống Hàng Trên",
                theme: "farm_drop",
                keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                items: [
                    { icon: "🌽", name: "Bắp ngô" },
                    { icon: "🍇", name: "Chùm nho" },
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
        {
            id: "cat_bottom_row",
            title: "Cấp 3: Hàng Phím Dưới (Bottom Row)",
            icon: "fa-solid fa-arrow-down",
            desc: "Kéo ngón tay xuống hàng dưới Z-X-C-V-B N-M-,-.-/",
            rewardCoins: 15,
            miniGame: {
                title: "Bảo Vệ Củ Quả Hàng Dưới",
                theme: "farm_drop",
                keys: ["z", "x", "c", "v", "b", "n", "m", ",", "."],
                items: [
                    { icon: "🥔", name: "Khoai tây" },
                    { icon: "🧅", name: "Củ hành" },
                    { icon: "🥜", name: "Củ lạc" },
                    { icon: "🍠", name: "Khoai lang" }
                ],
                targetCount: 24,
                speed: 3.0,
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
        {
            id: "cat_numbers",
            title: "Cấp 4: Hàng Phím Số & Ký Tự",
            icon: "fa-solid fa-hashtag",
            desc: "Luyện hàng phím số 1-9, 0 và các phép tính toán học cơ bản",
            rewardCoins: 18,
            miniGame: {
                title: "Đếm Nông Sản Thần Tốc",
                theme: "farm_drop",
                keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-"],
                items: [
                    { icon: "🌻", name: "Hoa hướng dương" },
                    { icon: "🌾", name: "Bông lúa" },
                    { icon: "🍄", name: "Nấm tươi" },
                    { icon: "🥚", name: "Trứng gà" }
                ],
                targetCount: 25,
                speed: 2.8,
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
        {
            id: "cat_viet_words",
            title: "Cấp 5: Tiếng Việt Có Dấu (Telex / VNI)",
            icon: "fa-solid fa-feather-pointed",
            desc: "Rèn luyện gõ dấu thanh sắc huyền hỏi ngã nặng và các nguyên âm tiếng Việt",
            rewardCoins: 20,
            miniGame: {
                title: "Thu Hoạch Vườn Tiếng Việt",
                theme: "farm_drop",
                keys: ["a", "e", "o", "u", "i", "s", "f", "r", "x", "j", "w", "d"],
                items: [
                    { icon: "🌸", name: "Hoa sen" },
                    { icon: "🍊", name: "Quả cam" },
                    { icon: "🥥", name: "Trái dừa" },
                    { icon: "🍍", name: "Quả dứa" }
                ],
                targetCount: 25,
                speed: 2.8,
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
        {
            id: "cat_sentences",
            title: "Cấp 6: Ca Dao, Tục Ngữ & Đoạn Văn SGK",
            icon: "fa-solid fa-book-open",
            desc: "Nâng cao tốc độ và độ chính xác với các câu ca dao và bài học hay",
            rewardCoins: 25,
            miniGame: {
                title: "Thử Thách Nông Dân Xuất Sắc",
                theme: "farm_drop",
                keys: ["a", "b", "c", "d", "e", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y"],
                items: [
                    { icon: "🏆", name: "Cúp Vàng" },
                    { icon: "👑", name: "Vương Miện" },
                    { icon: "💎", name: "Kim Cương" },
                    { icon: "🌟", name: "Ngôi Sao" }
                ],
                targetCount: 30,
                speed: 2.5,
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
