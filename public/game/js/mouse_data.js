/**
 * MOUSE MASTERY DATA
 * Dữ liệu 5 Cấp độ Huấn Luyện Chuột Máy Tính Nông Trại (EduFarm Mouse Academy)
 * Thiết kế sư phạm trực quan dành cho học sinh Tiểu học
 */

window.MOUSE_DATA = {
    categories: [
        {
            id: "mouse_single_click",
            title: "Cấp 1: Nhấp Chuột Trái (Single Click)",
            icon: "fa-solid fa-arrow-pointer",
            skillName: "Click Chuột Trái",
            theme: "single_click",
            desc: "Bắt sâu bọ và nhổ cỏ dại phá hoại mùa màng",
            instruction: "Bé hãy dùng chuột trái nhấp nhanh và chuẩn xác vào các chú sâu bọ, cỏ dại xuất hiện trên luống đất nhé!",
            targetCount: 15,
            timeLimit: 30, // Giây
            rewardCoins: 20,
            rewardXp: 40,
            items: [
                { id: "pest_worm", icon: "🐛", name: "Sâu xanh", points: 10 },
                { id: "pest_beetle", icon: "🪲", name: "Bọ dừa", points: 10 },
                { id: "pest_grass", icon: "🌿", name: "Cỏ dại", points: 10 },
                { id: "pest_snail", icon: "🐌", name: "Ốc sên", points: 15 }
            ]
        },
        {
            id: "mouse_double_click",
            title: "Cấp 2: Nhấp Đúp Chuột (Double Click)",
            icon: "fa-solid fa-hand-pointer",
            skillName: "Nhấp Đúp (Click 2 Lần)",
            theme: "double_click",
            desc: "Đập vỏ trứng thần kỳ và mở rương báu nông trại",
            instruction: "Bé hãy nhấp đúp (nhấp chuột trái 2 lần thật nhanh) vào các quả trứng thần hoặc rương báu để mở quà!",
            targetCount: 12,
            timeLimit: 30,
            rewardCoins: 25,
            rewardXp: 50,
            items: [
                { id: "egg_magic", icon: "🥚", name: "Trứng ma thuật", points: 15, crackedIcon: "🐣" },
                { id: "chest_gold", icon: "📦", name: "Rương gỗ", points: 20, crackedIcon: "🎁" },
                { id: "pumpkin_magic", icon: "🎃", name: "Bí ngô khổng lồ", points: 15, crackedIcon: "✨" }
            ]
        },
        {
            id: "mouse_right_click",
            title: "Cấp 3: Nhấp Chuột Phải (Right Click)",
            icon: "fa-solid fa-computer-mouse",
            skillName: "Click Chuột Phải",
            theme: "right_click",
            desc: "Bón phân dinh dưỡng & tưới nước đặc biệt cho cây",
            instruction: "Bé hãy nhấp chuột phải vào những cây đang phát tín hiệu để tưới dinh dưỡng cho cây mau lớn!",
            targetCount: 12,
            timeLimit: 30,
            rewardCoins: 30,
            rewardXp: 60,
            items: [
                { id: "plant_dry", icon: "🥀", name: "Cây thiếu nước", points: 15, curedIcon: "🌹" },
                { id: "sprout_grow", icon: "🌱", name: "Mầm cần phân bón", points: 15, curedIcon: "🌳" },
                { id: "flower_boost", icon: "🌻", name: "Hoa hướng dương", points: 20, curedIcon: "🌟" }
            ]
        },
        {
            id: "mouse_drag_drop",
            title: "Cấp 4: Kéo & Thả (Drag and Drop)",
            icon: "fa-solid fa-arrows-up-down-left-right",
            skillName: "Kéo Thả Đối Tượng",
            theme: "drag_drop",
            desc: "Thu hoạch và phân loại củ quả vào đúng giỏ màu",
            instruction: "Bé hãy giữ chuột trái để kéo từng loại nông sản và thả vào đúng chiếc giỏ cùng loại nhé!",
            targetCount: 10,
            timeLimit: 40,
            rewardCoins: 35,
            rewardXp: 70,
            baskets: [
                { id: "basket_red", color: "#ef4444", label: "Giỏ Đỏ", acceptType: "red", icon: "🧺" },
                { id: "basket_orange", color: "#f97316", label: "Giỏ Cam", acceptType: "orange", icon: "🧺" },
                { id: "basket_green", color: "#22c55e", label: "Giỏ Xanh", acceptType: "green", icon: "🧺" }
            ],
            items: [
                { id: "fruit_tomato", icon: "🍅", type: "red", name: "Cà chua" },
                { id: "fruit_apple", icon: "🍎", type: "red", name: "Táo đỏ" },
                { id: "fruit_strawberry", icon: "🍓", type: "red", name: "Dâu tây" },
                { id: "fruit_carrot", icon: "🥕", type: "orange", name: "Cà rốt" },
                { id: "fruit_orange", icon: "🍊", type: "orange", name: "Quả cam" },
                { id: "fruit_cabbage", icon: "🥦", type: "green", name: "Bông cải" },
                { id: "fruit_watermelon", icon: "🍉", type: "green", name: "Dưa hấu" }
            ]
        },
        {
            id: "mouse_hover_tracking",
            title: "Cấp 5: Rê Chuột Dẫn Đường (Mouse Hover & Tracking)",
            icon: "fa-solid fa-route",
            skillName: "Rê Chuột Chính Xác",
            theme: "hover_tracking",
            desc: "Dẫn đường chú Ong chăm chỉ bay qua luống hoa về tổ",
            instruction: "Bé hãy di chuyển con trỏ chuột thật khéo léo để dẫn chú Ong bay dọc lối đi, lấy mật hoa và tránh chạm vào hàng rào gai!",
            targetCount: 3, // 3 chặng mê cung hoa
            rewardCoins: 40,
            rewardXp: 80
        }
    ]
};
