/**
 * MOUSE MASTERY DATA
 * Ngân hàng bài tập Huấn Luyện Chuột Máy Tính Nông Trại (EduFarm Mouse Academy)
 * Phân chia đầy đủ 3 cấp độ Dễ / Vừa / Khó cho cả 5 kỹ năng chuột
 */

window.MOUSE_DATA = {
    difficultyLabels: {
        easy: { name: "Dễ", icon: "🌱", color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
        medium: { name: "Vừa", icon: "🌿", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
        hard: { name: "Khó", icon: "🔥", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" }
    },

    levels: [
        // ================= KỸ NĂNG 1: CLICK CHUỘT TRÁI =================
        {
            id: "click_easy",
            skillId: "single_click",
            difficulty: "easy",
            title: "Bắt Sâu Bọ Luống Cải",
            skillName: "Click Chuột Trái",
            theme: "single_click",
            desc: "Luyện nhấp chuột trái với các chú sâu bọ to, di chuyển chậm",
            instruction: "Bé hãy nhấp chuột trái vào những chú sâu xanh to trên luống rau để bắt chúng nhé!",
            targetCount: 10,
            timeLimit: 35,
            itemSize: 72,
            spawnSpeed: 1600,
            stayDuration: 5000,
            rewardCoins: 15,
            rewardXp: 30,
            items: [
                { id: "worm", icon: "🐛", name: "Sâu xanh", points: 10 },
                { id: "snail", icon: "🐌", name: "Ốc sên", points: 10 }
            ]
        },
        {
            id: "click_med",
            skillId: "single_click",
            difficulty: "medium",
            title: "Nhổ Cỏ & Bắt Bọ Dừa",
            skillName: "Click Chuột Trái",
            theme: "single_click",
            desc: "Mục tiêu kích thước vừa, xuất hiện nhanh hơn trên vườn rau",
            instruction: "Bé hãy nhấp chuột trái nhanh tay để nhổ cỏ dại và bắt bọ cánh cứng phá hoại!",
            targetCount: 15,
            timeLimit: 30,
            itemSize: 60,
            spawnSpeed: 1200,
            stayDuration: 3500,
            rewardCoins: 25,
            rewardXp: 50,
            items: [
                { id: "worm", icon: "🐛", name: "Sâu xanh", points: 10 },
                { id: "beetle", icon: "🪲", name: "Bọ dừa", points: 12 },
                { id: "grass", icon: "🌿", name: "Cỏ dại", points: 10 }
            ]
        },
        {
            id: "click_hard",
            skillId: "single_click",
            difficulty: "hard",
            title: "Bắt Chuột Đồng Phá Lúa",
            skillName: "Click Chuột Trái",
            theme: "single_click",
            desc: "Thử thách phản xạ nhanh với các mục tiêu nhỏ và lướt nhanh",
            instruction: "Bé hãy tập trung cao độ và click thật nhanh vào lũ chuột đồng và châu chấu!",
            targetCount: 20,
            timeLimit: 25,
            itemSize: 50,
            spawnSpeed: 900,
            stayDuration: 2500,
            rewardCoins: 35,
            rewardXp: 70,
            items: [
                { id: "mouse", icon: "🐭", name: "Chuột đồng", points: 15 },
                { id: "locust", icon: "🦗", name: "Châu chấu", points: 15 },
                { id: "beetle", icon: "🪲", name: "Bọ hung", points: 12 }
            ]
        },

        // ================= KỸ NĂNG 2: NHẤP ĐÚP CHUỘT (DOUBLE CLICK) =================
        {
            id: "dblclick_easy",
            skillId: "double_click",
            difficulty: "easy",
            title: "Ấp Trứng Khủng Long",
            skillName: "Nhấp Đúp (Click 2 Lần)",
            theme: "double_click",
            desc: "Nhấp đúp chuột 2 lần nhanh vào quả trứng khổng lồ để ấp nở",
            instruction: "Bé hãy nhấp đúp chuột trái (click 2 lần thật nhanh) để đập vỡ vỏ trứng nhé!",
            targetCount: 8,
            timeLimit: 35,
            itemSize: 74,
            spawnSpeed: 1800,
            stayDuration: 6000,
            rewardCoins: 20,
            rewardXp: 40,
            items: [
                { id: "egg", icon: "🥚", name: "Trứng thần", points: 15, crackedIcon: "🐣" }
            ]
        },
        {
            id: "dblclick_med",
            skillId: "double_click",
            difficulty: "medium",
            title: "Mở Rương Báu & Bí Ngô",
            skillName: "Nhấp Đúp (Click 2 Lần)",
            theme: "double_click",
            desc: "Nhấp đúp mở các rương kho báu và quả bí ngô ma thuật",
            instruction: "Bé hãy nhấp đúp 2 lần nhanh tay vào rương gỗ và quả bí ngô để thu thập quà!",
            targetCount: 12,
            timeLimit: 30,
            itemSize: 62,
            spawnSpeed: 1300,
            stayDuration: 4000,
            rewardCoins: 30,
            rewardXp: 60,
            items: [
                { id: "chest", icon: "📦", name: "Rương báu", points: 15, crackedIcon: "🎁" },
                { id: "pumpkin", icon: "🎃", name: "Bí ngô vàng", points: 20, crackedIcon: "✨" }
            ]
        },
        {
            id: "dblclick_hard",
            skillId: "double_click",
            difficulty: "hard",
            title: "Mở Hộp Quà Ma Thuật",
            skillName: "Nhấp Đúp (Click 2 Lần)",
            theme: "double_click",
            desc: "Thử thách nhấp đúp siêu tốc với các hộp quà biến mất nhanh",
            instruction: "Nhấp đúp cực nhanh để mở các hộp quà trước khi chúng tan biến!",
            targetCount: 16,
            timeLimit: 25,
            itemSize: 52,
            spawnSpeed: 1000,
            stayDuration: 2800,
            rewardCoins: 40,
            rewardXp: 80,
            items: [
                { id: "gift", icon: "🎁", name: "Hộp quà", points: 20, crackedIcon: "💎" },
                { id: "crystal", icon: "🔮", name: "Quả cầu pha lê", points: 25, crackedIcon: "🌟" }
            ]
        },

        // ================= KỸ NĂNG 3: NHẤP CHUỘT PHẢI (RIGHT CLICK) =================
        {
            id: "rightclick_easy",
            skillId: "right_click",
            difficulty: "easy",
            title: "Tưới Nước Cho Cây Non",
            skillName: "Click Chuột Phải",
            theme: "right_click",
            desc: "Làm quen với nút chuột phải để tưới nước hồi sinh cho cây",
            instruction: "Bé hãy nhấp CHUỘT PHẢI vào những bông hoa héo để tưới nước giúp hoa nở rộ!",
            targetCount: 8,
            timeLimit: 35,
            itemSize: 72,
            spawnSpeed: 1800,
            stayDuration: 6000,
            rewardCoins: 20,
            rewardXp: 40,
            items: [
                { id: "flower", icon: "🥀", name: "Cần tưới nước", points: 15, curedIcon: "🌹" }
            ]
        },
        {
            id: "rightclick_med",
            skillId: "right_click",
            difficulty: "medium",
            title: "Bón Phân Hoa Hướng Dương",
            skillName: "Click Chuột Phải",
            theme: "right_click",
            desc: "Nhấp chuột phải bón phân dinh dưỡng cho mầm cây và hoa",
            instruction: "Bé hãy nhấp CHUỘT PHẢI chuẩn xác vào mầm cây để bón phân dinh dưỡng nhé!",
            targetCount: 12,
            timeLimit: 30,
            itemSize: 62,
            spawnSpeed: 1300,
            stayDuration: 4000,
            rewardCoins: 30,
            rewardXp: 60,
            items: [
                { id: "sprout", icon: "🌱", name: "Mầm cây", points: 15, curedIcon: "🌳" },
                { id: "sunflower", icon: "🌻", name: "Hướng dương", points: 20, curedIcon: "🌟" }
            ]
        },
        {
            id: "rightclick_hard",
            skillId: "right_click",
            difficulty: "hard",
            title: "Cứu Vườn Cây Bội Thu",
            skillName: "Click Chuột Phải",
            theme: "right_click",
            desc: "Phản xạ chuột phải nhanh chóng cứu toàn bộ mảnh vườn nông trại",
            instruction: "Bé hãy nhấp chuột phải thật nhanh và không nhầm lẫn chuột trái nhé!",
            targetCount: 16,
            timeLimit: 25,
            itemSize: 52,
            spawnSpeed: 950,
            stayDuration: 2800,
            rewardCoins: 40,
            rewardXp: 80,
            items: [
                { id: "tree", icon: "🌾", name: "Lúa chín", points: 15, curedIcon: "🍞" },
                { id: "tomato", icon: "🥀", name: "Cà chua héo", points: 20, curedIcon: "🍅" },
                { id: "sprout", icon: "🌱", name: "Mầm ngọc", points: 20, curedIcon: "🌲" }
            ]
        },

        // ================= KỸ NĂNG 4: KÉO & THẢ (DRAG AND DROP) =================
        {
            id: "drag_easy",
            skillId: "drag_drop",
            difficulty: "easy",
            title: "Phân Loại 2 Giỏ (Đỏ & Xanh)",
            skillName: "Kéo Thả Đối Tượng",
            theme: "drag_drop",
            desc: "Kéo thả phân loại 2 nhóm màu sắc cơ bản Đỏ và Xanh lá",
            instruction: "Bé hãy giữ chuột trái kéo củ quả thả vào đúng Giỏ Đỏ hoặc Giỏ Xanh nhé!",
            targetCount: 8,
            timeLimit: 40,
            rewardCoins: 25,
            rewardXp: 50,
            baskets: [
                { id: "basket_red", color: "#ef4444", borderColor: "#f87171", label: "Giỏ Đỏ (Red)", acceptType: "red", icon: "🧺", tag: "🍅 Quả Đỏ" },
                { id: "basket_green", color: "#22c55e", borderColor: "#4ade80", label: "Giỏ Xanh (Green)", acceptType: "green", icon: "🧺", tag: "🥦 Rau Xanh" }
            ],
            items: [
                { id: "tomato", icon: "🍅", type: "red", name: "Cà chua", colorTag: "#ef4444" },
                { id: "apple", icon: "🍎", type: "red", name: "Táo đỏ", colorTag: "#ef4444" },
                { id: "cabbage", icon: "🥦", type: "green", name: "Bông cải", colorTag: "#22c55e" },
                { id: "cucumber", icon: "🥒", type: "green", name: "Dưa leo", colorTag: "#22c55e" }
            ]
        },
        {
            id: "drag_med",
            skillId: "drag_drop",
            difficulty: "medium",
            title: "Phân Loại 3 Giỏ (Đỏ, Vàng, Xanh)",
            skillName: "Kéo Thả Đối Tượng",
            theme: "drag_drop",
            desc: "Phân loại 3 nhóm màu Đỏ, Vàng/Cam và Xanh lá",
            instruction: "Bé hãy kéo từng loại nông sản vào đúng chiếc giỏ cùng màu!",
            targetCount: 12,
            timeLimit: 35,
            rewardCoins: 35,
            rewardXp: 70,
            baskets: [
                { id: "basket_red", color: "#ef4444", borderColor: "#f87171", label: "Giỏ Đỏ", acceptType: "red", icon: "🧺", tag: "🍓 Quả Đỏ" },
                { id: "basket_yellow", color: "#f59e0b", borderColor: "#fbbf24", label: "Giỏ Vàng/Cam", acceptType: "yellow", icon: "🧺", tag: "🥕 Củ Vàng/Cam" },
                { id: "basket_green", color: "#22c55e", borderColor: "#4ade80", label: "Giỏ Xanh", acceptType: "green", icon: "🧺", tag: "🍉 Quả Xanh" }
            ],
            items: [
                { id: "strawberry", icon: "🍓", type: "red", name: "Dâu tây", colorTag: "#ef4444" },
                { id: "tomato", icon: "🍅", type: "red", name: "Cà chua", colorTag: "#ef4444" },
                { id: "carrot", icon: "🥕", type: "yellow", name: "Cà rốt", colorTag: "#f59e0b" },
                { id: "corn", icon: "🌽", type: "yellow", name: "Bắp ngô", colorTag: "#f59e0b" },
                { id: "orange", icon: "🍊", type: "yellow", name: "Quả cam", colorTag: "#f59e0b" },
                { id: "cabbage", icon: "🥦", type: "green", name: "Bông cải", colorTag: "#22c55e" },
                { id: "watermelon", icon: "🍉", type: "green", name: "Dưa hấu", colorTag: "#22c55e" }
            ]
        },
        {
            id: "drag_hard",
            skillId: "drag_drop",
            difficulty: "hard",
            title: "Đại Tiệc Phân Loại 4 Giỏ Siêu Tốc",
            skillName: "Kéo Thả Đối Tượng",
            theme: "drag_drop",
            desc: "Thử thách kéo thả phân loại 4 giỏ màu: Đỏ, Vàng, Xanh, Tím",
            instruction: "Bé hãy giữ chuột và phân loại nhanh 4 giỏ: Đỏ, Vàng, Xanh và Tím!",
            targetCount: 16,
            timeLimit: 35,
            rewardCoins: 45,
            rewardXp: 90,
            baskets: [
                { id: "basket_red", color: "#ef4444", borderColor: "#f87171", label: "Giỏ Đỏ", acceptType: "red", icon: "🧺", tag: "🍎 Màu Đỏ" },
                { id: "basket_yellow", color: "#eab308", borderColor: "#fde047", label: "Giỏ Vàng", acceptType: "yellow", icon: "🧺", tag: "🍌 Màu Vàng" },
                { id: "basket_green", color: "#22c55e", borderColor: "#4ade80", label: "Giỏ Xanh", acceptType: "green", icon: "🧺", tag: "🥑 Màu Xanh" },
                { id: "basket_purple", color: "#a855f7", borderColor: "#c084fc", label: "Giỏ Tím", acceptType: "purple", icon: "🧺", tag: "🍇 Màu Tím" }
            ],
            items: [
                { id: "apple", icon: "🍎", type: "red", name: "Táo đỏ", colorTag: "#ef4444" },
                { id: "banana", icon: "🍌", type: "yellow", name: "Quả chuối", colorTag: "#eab308" },
                { id: "corn", icon: "🌽", type: "yellow", name: "Bắp ngô", colorTag: "#eab308" },
                { id: "avocado", icon: "🥑", type: "green", name: "Quả bơ", colorTag: "#22c55e" },
                { id: "grape", icon: "🍇", type: "purple", name: "Chùm nho", colorTag: "#a855f7" },
                { id: "eggplant", icon: "🍆", type: "purple", name: "Cà tím", colorTag: "#a855f7" }
            ]
        },

        // ================= KỸ NĂNG 5: RÊ CHUỘT DẪN ĐƯỜNG CONG (CURVED HOVER & TRACKING) =================
        {
            id: "hover_easy",
            skillId: "hover_tracking",
            difficulty: "easy",
            title: "Đường Cong Luống Hoa Mùa Xuân",
            skillName: "Rê Chuột Đường Cong",
            theme: "hover_tracking",
            desc: "Đường cong chữ S rộng rãi uốn lượn nhẹ, nhấn giữ chuột dắt chú Ong lấy mật",
            instruction: "Bé hãy NHẤP VÀ GIỮ CHUỘT TRÁI vào chú Ong, rê dọc đường cong để lấy mật hoa về tổ nhé!",
            targetCount: 3,
            timeLimit: 45,
            roadWidth: 85,
            rewardCoins: 25,
            rewardXp: 50,
            pathPoints: [
                { x: 80, y: 240, icon: "🌸", label: "Xuất phát" },
                { x: 260, y: 120, icon: "🌻", label: "Hoa hướng dương" },
                { x: 480, y: 360, icon: "🌺", label: "Hoa dâm bụt" },
                { x: 680, y: 150, icon: "🌼", label: "Hoa cúc" },
                { x: 860, y: 240, icon: "🍯", label: "Tổ ong" }
            ]
        },
        {
            id: "hover_med",
            skillId: "hover_tracking",
            difficulty: "medium",
            title: "Đường Cong Sóng Lượn Đồi Hoa",
            skillName: "Rê Chuột Đường Cong",
            theme: "hover_tracking",
            desc: "Đường cong lượn sóng 3 nhịp hình sin uốn khúc mềm mại, rèn luyện sự khéo léo",
            instruction: "Nhấn giữ chuột vào chú Ong và rê khéo léo qua các khúc cua sóng lượn để thu thập mật!",
            targetCount: 3,
            timeLimit: 40,
            roadWidth: 60,
            rewardCoins: 35,
            rewardXp: 70,
            pathPoints: [
                { x: 70, y: 360, icon: "🌸", label: "Xuất phát" },
                { x: 220, y: 110, icon: "🌻", label: "Hoa vàng" },
                { x: 380, y: 370, icon: "🌺", label: "Hoa hồng" },
                { x: 540, y: 100, icon: "🌷", label: "Hoa tulip" },
                { x: 700, y: 360, icon: "🌼", label: "Hoa cúc" },
                { x: 860, y: 160, icon: "🍯", label: "Tổ ong" }
            ]
        },
        {
            id: "hover_hard",
            skillId: "hover_tracking",
            difficulty: "hard",
            title: "Mê Cung Xoắn Ốc Uốn Lượn Thần Kỳ",
            skillName: "Rê Chuột Đường Cong",
            theme: "hover_tracking",
            desc: "Đường cong xoắn lượn vòng cung liên tục với độ rộng hẹp, thử thách độ chính xác cao",
            instruction: "Tập trung cao độ giữ chuột dắt chú Ong lượn qua các vòng cung hẹp mà không chạm gai!",
            targetCount: 3,
            timeLimit: 35,
            roadWidth: 46,
            rewardCoins: 50,
            rewardXp: 100,
            pathPoints: [
                { x: 70, y: 390, icon: "🌸", label: "Xuất phát" },
                { x: 150, y: 130, icon: "🌻", label: "Trạm 1" },
                { x: 340, y: 90, icon: "🌺", label: "Trạm 2" },
                { x: 420, y: 370, icon: "🌷", label: "Trạm 3" },
                { x: 600, y: 390, icon: "🌼", label: "Trạm 4" },
                { x: 720, y: 120, icon: "🌹", label: "Trạm 5" },
                { x: 860, y: 220, icon: "🍯", label: "Tổ ong" }
            ]
        }
    ]
};
