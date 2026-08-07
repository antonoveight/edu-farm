const gameAssets = {
    eco: {
        name: "Đảo Sinh Thái", styleClass: "theme-eco",
        seeds: {
            s1: { id: "s1", name: "Cải Ngọt", emoji: "🥬", color: "#10b981", reward: 20, price: 0 },
            s2: { id: "s2", name: "Cà Tomato", emoji: "🍅", color: "#f43f5e", reward: 55, price: 0 },
            s3: { id: "s3", name: "Dưa Hấu", emoji: "🍉", color: "#22c55e", reward: 120, price: 0 },
            s4: { id: "s4", name: "Dâu Tây", emoji: "🍓", color: "#ef4444", reward: 150, price: 50 },
            s5: { id: "s5", name: "Hướng Dương", emoji: "🌻", color: "#eab308", reward: 200, price: 80 },
            s6: { id: "s6", name: "Bí Ngô", emoji: "🎃", color: "#f97316", reward: 280, price: 120 },
            s7: { id: "s7", name: "Ngô Trắng", emoji: "🌽", color: "#fef08a", reward: 350, price: 150 },
            s8: { id: "s8", name: "Cà Rốt Đỏ", emoji: "🥕", color: "#f97316", reward: 450, price: 200 },
            s9: { id: "s9", name: "Cây Táo", emoji: "🍎", color: "#dc2626", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Táo Vàng", emoji: "🍏", color: "#84cc16", reward: 1000, price: 500 },
            s11:{ id: "s11",name: "Kho Báu Cổ Thụ", emoji: "🌳", color: "#fbbf24", reward: 2500, price: 0, growSpeed: 0.5 },
            s12:{ id: "s12",name: "Xương Rồng Hoang", emoji: "🌵", color: "#84cc16", reward: 1500, price: 0, growSpeed: 1.2, shopHidden: true },
            s13:{ id: "s13",name: "Tre Vàng", emoji: "🎋", color: "#eab308", reward: 1800, price: 0, growSpeed: 0.8, shopHidden: true }
        },
        decorations: [
            { id: "d_eco_1", name: "Hàng Rào Gỗ", emoji: "🪵", price: 50 },
            { id: "d_eco_2", name: "Bù Nhìn Rơm", emoji: "🌾", price: 150 },
            { id: "d_eco_3", name: "Cối Xay Gió", emoji: "🏡", price: 300 }
        ]
    },
    cyber: {
        name: "Trạm Công Nghệ", styleClass: "theme-cyber",
        seeds: {
            s1: { id: "s1", name: "Pin Mini", emoji: "🔋", color: "#06b6d4", reward: 20, price: 0 },
            s2: { id: "s2", name: "Led Module", emoji: "💡", color: "#38bdf8", reward: 55, price: 0 },
            s3: { id: "s3", name: "Chip AI", emoji: "🌌", color: "#a855f7", reward: 120, price: 0 },
            s4: { id: "s4", name: "Lõi Năng Lượng", emoji: "⚡", color: "#eab308", reward: 150, price: 50 },
            s5: { id: "s5", name: "Ăng-ten", emoji: "📡", color: "#94a3b8", reward: 200, price: 80 },
            s6: { id: "s6", name: "Đĩa Than", emoji: "💿", color: "#cbd5e1", reward: 280, price: 120 },
            s7: { id: "s7", name: "Bo Mạch", emoji: "🖲️", color: "#22c55e", reward: 350, price: 150 },
            s8: { id: "s8", name: "Laser", emoji: "🔫", color: "#ef4444", reward: 450, price: 200 },
            s9: { id: "s9", name: "CPU Lõi Kép", emoji: "💻", color: "#64748b", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Tinh Thể Ánh Sáng", emoji: "💠", color: "#0ea5e9", reward: 1000, price: 500 },
            s11:{ id: "s11",name: "Lõi Lượng Tử", emoji: "💎", color: "#0ea5e9", reward: 2500, price: 0, growSpeed: 0.5 },
            s12:{ id: "s12",name: "Nano Bot", emoji: "🤖", color: "#38bdf8", reward: 1500, price: 0, growSpeed: 1.2, shopHidden: true },
            s13:{ id: "s13",name: "Vi Sinh Học", emoji: "🔬", color: "#a78bfa", reward: 1800, price: 0, growSpeed: 0.8, shopHidden: true }
        },
        decorations: [
            { id: "d_cyb_1", name: "Hàng Rào Laser", emoji: "⚡", price: 50 },
            { id: "d_cyb_2", name: "Trạm Thu Tín Hiệu", emoji: "📡", price: 150 },
            { id: "d_cyb_3", name: "Hologram", emoji: "💽", price: 300 }
        ]
    },
    magic: {
        name: "Khu Rừng Phép Thuật", styleClass: "theme-magic",
        seeds: {
            s1: { id: "s1", name: "Hoa Tiên", emoji: "🌸", color: "#f43f5e", reward: 20, price: 0 },
            s2: { id: "s2", name: "Nấm Sáng", emoji: "🍄", color: "#fbbf24", reward: 55, price: 0 },
            s3: { id: "s3", name: "Tim Thần", emoji: "🔮", color: "#d946ef", reward: 120, price: 0 },
            s4: { id: "s4", name: "Lá Nguyện Ước", emoji: "🍀", color: "#22c55e", reward: 150, price: 50 },
            s5: { id: "s5", name: "Mắt Phép", emoji: "🧿", color: "#3b82f6", reward: 200, price: 80 },
            s6: { id: "s6", name: "Mặt Trăng", emoji: "🌙", color: "#fef08a", reward: 280, price: 120 },
            s7: { id: "s7", name: "Sao Chổi", emoji: "☄️", color: "#f97316", reward: 350, price: 150 },
            s8: { id: "s8", name: "Vương Miện", emoji: "👑", color: "#eab308", reward: 450, price: 200 },
            s9: { id: "s9", name: "Trượng Thần", emoji: "🪄", color: "#a855f7", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Rồng Lửa", emoji: "🐉", color: "#ef4444", reward: 1000, price: 500 },
            s11:{ id: "s11",name: "Hạt Không Gian", emoji: "🌌", color: "#d946ef", reward: 2500, price: 0, growSpeed: 0.5 },
            s12:{ id: "s12",name: "Bướm Pha Lê", emoji: "🦋", color: "#e879f9", reward: 1500, price: 0, growSpeed: 1.2, shopHidden: true },
            s13:{ id: "s13",name: "Cầu Vồng Thần", emoji: "🌈", color: "#818cf8", reward: 1800, price: 0, growSpeed: 0.8, shopHidden: true }
        },
        decorations: [
            { id: "d_mag_1", name: "Hàng Rào Pha Lê", emoji: "💎", price: 50 },
            { id: "d_mag_2", name: "Đèn Lồng Ma Thuật", emoji: "🏮", price: 150 },
            { id: "d_mag_3", name: "Cổng Không Gian", emoji: "🌌", price: 300 }
        ]
    }
};

window.getSeedConfig = function() {
    let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    return gameAssets[w].seeds;
};

function getEffectiveGrowSpeed(seedData) {
    let baseSpeed = (seedData && seedData.growSpeed) ? seedData.growSpeed : 2;
    let speed = baseSpeed;
    
    if (typeof gameState !== 'undefined' && gameState) {
        if (gameState.weather === "rainy") speed = baseSpeed * 1.5;
        if (gameState.weather === "acid_storm") speed = 0;
        
        if (gameState.town && gameState.town.library && gameState.town.library.level > 0 && speed > 0) {
            let level = Math.min(5, gameState.town.library.level);
            let speedMultiplier = 1 / (1 - (level * 0.05));
            speed *= speedMultiplier;
        }
    }
    return speed;
}
window.getEffectiveGrowSpeed = getEffectiveGrowSpeed;

function getSeedConfig() {
    return window.getSeedConfig();
}

        // CẤU HÌNH NHÂN VẬT TRỢ LÝ ĐỒNG HÀNH CHO TỪNG THẾ GIỚI
        const companionsConfig = {
            eco: {
                name: "Cô Tiên Xanh 🧚‍♀️",
                avatar: "🧚‍♀️",
                borderColor: "#10b981",
                textColor: "text-emerald-400",
                dialogues: {
                    welcome: "Chào bé! Hãy chọn hạt giống và gieo xuống đất nhé! 🌱",
                    dry: "Cây bị khát rồi! Bé chọn Bình Nước để tưới nhé! 💧",
                    pest: "Có sâu phá hoại! Nhấn vào để tiêu diệt sâu nhé! 🐛",
                    locked: "Tích đủ xu và giải đố để mở khóa ô đất nhé! 🔓",
                    acid_storm: "Mưa Axit tới! Giải bài tập ngay để tạo Lá Chắn! ⛈️",
                    egg: "Giải đố liên tục để trứng thần kỳ mau nở nhé! 🥚",
                    boss: "Boss xuất hiện! Giải toán thật nhanh để tấn công! ⚔️",
                    map: "Khám phá bản đồ và giải đố để mở vùng đất mới! 🗺️",
                    tab_farm: "Chào bé! Hãy chăm sóc cây trồng của mình nhé! 🌿",
                    tab_market: "Đây là Chợ! Bé mua hạt giống hoặc bán nông sản tại đây! 🛒",
                    tab_pet: "Ấp trứng mỗi ngày để thú cưng ra đời nhé! Giải nhiều bài tập hơn! 🥚",
                    tab_arena: "Đấu Trường Boss! Trả lời đúng để gây sát thương! Cố lên bé! ⚔️",
                    tab_daily: "Nhiệm vụ hàng ngày giúp bé kiếm thêm xu và hạt giống! 📋",
                    tab_town: "Thị Trấn của bé! Nâng cấp các tòa nhà để mở thêm tính năng! 🏘️",
                    tab_map: "Bản Đồ Học Tập! Giải đố để mở khóa vùng đất mới nhé! 🗺️"
                }
            },
            cyber: {
                name: "Robo Chip 🤖",
                avatar: "🤖",
                borderColor: "#06b6d4",
                textColor: "text-cyan-400",
                dialogues: {
                    welcome: "Hệ thống sẵn sàng! Chọn hạt giống để gieo trồng! 🔋",
                    dry: "Độ ẩm thấp! Chọn Bình Nước để tưới ngay! 💧",
                    pest: "Phát hiện mã độc! Nhấn vào sâu để diệt virus! 🐛",
                    locked: "Giải đố và dùng xu để mở cổng liên kết nhé! 🔓",
                    acid_storm: "Mã axit xâm nhập! Hãy giải toán lập Lá Chắn! ⛈️",
                    egg: "Nạp tri thức để sinh vật robot tiến hóa nhé! 🥚",
                    boss: "Chế độ bạo kích! Tính toán nhanh để diệt Boss! ⚔️",
                    map: "Scan bản đồ để phát hiện vùng dữ liệu mới! 🗺️",
                    tab_farm: "Hệ thống farm đang chạy! Kiểm tra cây trồng nào! 🌿",
                    tab_market: "Truy cập chợ data! Mua/bán tài nguyên để mở rộng farm nhé! 🛒",
                    tab_pet: "Đơn vị robot đang ấp! Giải toán để tăng tiến trình ủ trứng! 🥚",
                    tab_arena: "Chế độ chiến đấu! Trả lời đúng để gây damage tối đa! ⚔️",
                    tab_daily: "Nhiệm vụ hệ thống! Hoàn thành để nhận phần thưởng! 📋",
                    tab_town: "Khu trung tâm! Nâng cấp module để mở tính năng mới! 🏘️",
                    tab_map: "Bản đồ kết nối! Giải đố để mở khóa vùng server mới nhé! 🗺️"
                }
            },
            magic: {
                name: "Bé Phù Thủy 🧙‍♀️",
                avatar: "🧙‍♀️",
                borderColor: "#d946ef",
                textColor: "text-fuchsia-400",
                dialogues: {
                    welcome: "Chào hoàng tử, công chúa! Chọn hạt gieo phép nhé! 🌸",
                    dry: "Cạn linh lực! Bé tưới nước thiêng cho cây đi! 💧",
                    pest: "Yêu quái quấy phá! Nhấp vào để tung ma pháp diệt! 🐛",
                    locked: "Giải ma thuật cổ xưa để khai hoang đất nhé! 🔓",
                    acid_storm: "Bão hắc ám tới! Niệm chú Lá Chắn ngay! ⛈️",
                    egg: "Trứng rồng đang tích tụ ma pháp để nở đấy! 🥚",
                    boss: "Đại chiến nổ ra! Giải toán triệu hồi sấm sét! ⚔️",
                    map: "Bản đồ phép thuật chờ được khám phá! 🗺️",
                    tab_farm: "Vườn phép thuật! Chăm sóc cây để thu hoạch pháp lực nhé! 🌸",
                    tab_market: "Chợ huyền bí! Trao đổi nguyên liệu để tăng sức mạnh nhé! 🛒",
                    tab_pet: "Trứng rồng thiêng! Giải đố để trứng tích đủ phép nở ra nhé! 🥚",
                    tab_arena: "Đấu trường ma pháp! Triệu hồi sức mạnh qua tri thức! ⚔️",
                    tab_daily: "Nhiệm vụ huyền thuật! Hoàn thành để nhận pháp lực! 📋",
                    tab_town: "Thành phố phù thủy! Nâng cấp tòa tháp để mở phép mới! 🏘️",
                    tab_map: "Bản đồ bí ẩn! Giải câu đố cổ để khai phá vùng đất mới! 🗺️"
                }
            }
        };

        /* TRẠNG THÁI TOÀN CỤC & CẤU HÌNH BACKEND */
        window.GAME_API_BASE = window.GAME_API_BASE || "";
        let selectedGrade = null;
        let selectedWorld = null;
        let selectedTool = null; // s1, s2, s3, hoặc water
        let activeTab = "farm";
        let activeTask = null; // Khai báo toàn cục để tránh lỗi ReferenceError
        let QUIZ_BANK = {};

        // Pool câu hỏi riêng theo từng chế độ — phân tầng để AI backend có thể điền vào sau này
        const SESSION_POOL_LIMIT = 20; // Mỗi mode giữ tối đa 20 câu gần nhất
        let sessionQuestionPools = {
            farm:  [],
            boss:  [],
            pet:   [],
            map:   [],
            daily: [],
            default: []
        };
        let _currentQMode = 'default'; // Mode đang được dùng để track pool
        // Giữ recentQuestionsQueue để tương thích ngược
        let recentQuestionsQueue = [];
        const QUESTION_HISTORY_LIMIT = 15;

        // Thêm câu hỏi vào lịch sử, có hỗ trợ mode riêng
        function addToQuestionHistory(questionKey, mode) {
            const m = (mode && sessionQuestionPools[mode]) ? mode : 'default';
            const pool = sessionQuestionPools[m];
            if (!pool.includes(questionKey)) pool.push(questionKey);
            if (pool.length > SESSION_POOL_LIMIT) pool.shift();
            // Giữ tương thích với code cũ
            if (!recentQuestionsQueue.includes(questionKey)) recentQuestionsQueue.push(questionKey);
            if (recentQuestionsQueue.length > QUESTION_HISTORY_LIMIT) recentQuestionsQueue.shift();
        }

        // Kiểm tra câu hỏi đã xuất hiện trong mode này chưa
        function isRecentQuestion(questionKey, mode) {
            const m = (mode && sessionQuestionPools[mode]) ? mode : 'default';
            return sessionQuestionPools[m].includes(questionKey);
        }

        // Trộn ngẫu nhiên mảng (Fisher-Yates shuffle)
        function shuffleArray(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        // Đối tượng lưu giữ dữ liệu của phiên chơi hiện hành (được nâng cấp các biến của Edu-Farm v2.2)
        let gameState = {

            coins: 100,
            level: 1,
            xp: 0,
            inventory: {
                s1: 3, s2: 1, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0,
                harvested_s1: 0, harvested_s2: 0, harvested_s3: 0, harvested_s4: 0, harvested_s5: 0, harvested_s6: 0, harvested_s7: 0, harvested_s8: 0, harvested_s9: 0, harvested_s10: 0,
                decorations: [],
                // Đồ trang trí đã mua
                decorations: []
            },
            plots: [
                { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                { status: "locked", cost: 100 },
                { status: "locked", cost: 250 },
                { status: "locked", cost: 500 }
            ],
            // Tiến trình ấp trứng thú cưng
            eggProgress: 0,
            eggHatched: false,
            unlockedPets: [], // list of pet ids
            // Tiến trình Bản đồ học tập
            mapProgress: { eco: 1, cyber: 1, magic: 1 },
            activePet: null,
            weather: "sunny" // sunny, rainy, acid_storm
        };

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playChime(freq, type = 'sine', duration = 0.1) {
            try {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch (e) {}
        }

        /* HÀM TRỰC QUAN HÓA CẢNH BÁO TRỢ LÝ */
        function triggerAssistantSpeech(dialogueType) {
            if (!selectedWorld) return;
            const comp = companionsConfig[selectedWorld];
            const box = document.getElementById("assistant-box");
            const avatar = document.getElementById("assistant-avatar");
            const name = document.getElementById("assistant-name");
            const text = document.getElementById("assistant-speech");

            // Thiết lập phong cách hiển thị theo chế độ chơi
            box.style.borderColor = comp.borderColor;
            name.innerText = comp.name;
            name.className = `text-xs font-black uppercase tracking-wider ${comp.textColor}`;
            avatar.innerText = comp.avatar;
            text.innerText = comp.dialogues[dialogueType] || "Hãy cố gắng lên nhé bé yêu!";

            // Tạo hiệu ứng nhảy nhẹ khi trợ lý nói
            box.classList.remove("scale-100");
            box.classList.add("scale-105", "translate-y-[-5px]");
            setTimeout(() => {
                box.classList.remove("translate-y-[-5px]");
                box.classList.add("scale-100");
            }, 500);
        }

        /* HÀM BẬT/TẮT CHẾ ĐỘ HƯỚNG DẪN */
        function toggleGuideMode() {
            gameState.guideEnabled = !gameState.guideEnabled;
            saveDataForMode();
            updateGuideButtonUI();
            
            // Âm thanh báo hiệu
            playChime(gameState.guideEnabled ? 800 : 300, 'sine', 0.25);
            
            // Cập nhật ngay vị trí trợ lý
            updateGuide();
        }

        function updateGuideButtonUI() {
            const dot = document.getElementById("toggle-guide-dot");
            const text = document.getElementById("toggle-guide-text");
            const btn = document.getElementById("btn-toggle-guide");
            if (!dot || !text || !btn) return;

            if (gameState.guideEnabled) {
                dot.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse";
                text.innerText = "Trợ Lý: BẬT";
                btn.style.borderColor = "rgba(16, 185, 129, 0.3)";
            } else {
                dot.className = "w-2.5 h-2.5 rounded-full bg-slate-500";
                text.innerText = "Trợ Lý: TẮT";
                btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }
        }

        /* HÀM BAY ĐẾN PHẦN TỬ MỤC TIÊU */
        function flyAssistantTo(element, speechText) {
            const box = document.getElementById("assistant-box");
            if (!box || !element) return;

            const container = document.getElementById("screen-game");
            const containerRect = container.getBoundingClientRect();
            const elemRect = element.getBoundingClientRect();

            // Tính toán tỉ lệ scale thực tế để khử sai lệch tọa độ
            let scale = 1;
            const gameContainer = document.getElementById("game-container");
            if (gameContainer && gameContainer.style.transform) {
                const match = gameContainer.style.transform.match(/scale\(([^)]+)\)/);
                if (match) scale = parseFloat(match[1]);
            }
            if (!scale || isNaN(scale)) scale = 1;

            // Quy đổi kích thước thực tế sau khi chia cho tỉ lệ scale
            const spaceLeft = (elemRect.left - containerRect.left) / scale;
            const spaceRight = (containerRect.right - elemRect.right) / scale;
            const spaceAbove = (elemRect.top - containerRect.top) / scale;
            const elemWidth = elemRect.width / scale;
            const elemHeight = elemRect.height / scale;
            const containerWidth = containerRect.width / scale;
            const containerHeight = containerRect.height / scale;

            // Thiết lập màu sắc viền/nền theo thế giới nếu chưa có
            const comp = companionsConfig[selectedWorld];
            if (comp) {
                document.getElementById("assistant-bubble").style.borderColor = comp.borderColor;
                document.getElementById("assistant-name").innerText = comp.name;
                document.getElementById("assistant-name").className = `block text-[10px] font-black uppercase tracking-wider ${comp.textColor} mb-0.5`;
                document.getElementById("assistant-avatar").innerText = comp.avatar;
            }

            box.style.bottom = "auto";
            box.style.right = "auto";

            const boxWidth = 200; 
            const boxHeight = 110; // Chiều cao ước tính bao gồm bong bóng + avatar + khoảng cách

            let left, top;
            let placement = "above"; // Mặc định

            const minSpaceAboveNeeded = 65 + boxHeight + 15; // 190px
            // Nếu phần tử thuộc Sidebar (bên phải), hoặc không đủ khoảng trống phía trên
            if (spaceLeft > containerWidth - 320) {
                placement = "left"; // Để trợ lý nằm bên trái phần tử sidebar
            } else if (spaceAbove < minSpaceAboveNeeded) {
                placement = spaceRight > spaceLeft ? "right" : "left";
            } else {
                placement = "above";
            }

            if (placement === "right") {
                left = (elemRect.right - containerRect.left) / scale + 15;
                top = spaceAbove + (elemHeight / 2) - (boxHeight / 2);
            } else if (placement === "left") {
                left = spaceLeft - boxWidth - 15;
                top = spaceAbove + (elemHeight / 2) - (boxHeight / 2);
            } else {
                left = spaceLeft + (elemWidth / 2) - (boxWidth / 2);
                top = spaceAbove - boxHeight - 15; 
            }

            // Giới hạn để trợ lý không bay ra ngoài màn hình game
            left = Math.max(15, Math.min(containerWidth - boxWidth - 15, left));
            top = Math.max(65, Math.min(containerHeight - boxHeight - 15, top));

            box.style.left = `${left}px`;
            box.style.top = `${top}px`;

            const textNode = document.getElementById("assistant-speech");
            if (textNode) {
                textNode.innerText = speechText;
            }

            // Hiệu ứng bong bóng
            const bubble = document.getElementById("assistant-bubble");
            if (bubble) {
                bubble.classList.remove("scale-100");
                bubble.classList.add("scale-105");
                setTimeout(() => {
                    bubble.classList.remove("scale-105");
                    bubble.classList.add("scale-100");
                }, 400);
            }
        }

        /* HÀM PHỤC HỒI VỊ TRÍ MẶC ĐỊNH */
        function resetAssistantPosition() {
            const box = document.getElementById("assistant-box");
            if (!box) return;
            box.style.bottom = "auto";
            box.style.right = "auto";
            box.style.left = "20px";
            box.style.top = "510px"; // 640px (chiều cao game) - 110px (boxHeight) - 20px (margin)
        }

        /* HÀM ĐIỀU KHIỂN ĐIỂM CHỈ & HIGHLIGHT */
        let currentHighlightedElement = null;

        function clearHighlight() {
            if (currentHighlightedElement) {
                currentHighlightedElement.classList.remove("guide-highlight");
                currentHighlightedElement = null;
            }
            const pointer = document.getElementById("guide-pointer");
            if (pointer) {
                pointer.className = "hidden";
            }
        }

        function highlightTarget(element) {
            clearHighlight();
            if (!element) return;

            // Tự động cuộn phần tử vào vùng nhìn thấy của cha (như sidebar) nếu bị che khuất
            const scrollParent = element.closest('.sidebar') || element.closest('.workspace-left-container');
            if (scrollParent) {
                const parentRect = scrollParent.getBoundingClientRect();
                const elemRect = element.getBoundingClientRect();
                const isOutOfView = (elemRect.top < parentRect.top - 5 || elemRect.bottom > parentRect.bottom + 5);
                if (isOutOfView) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }

            element.classList.add("guide-highlight");
            currentHighlightedElement = element;

            const pointer = document.getElementById("guide-pointer");
            const container = document.getElementById("screen-game");
            if (pointer && container) {
                const containerRect = container.getBoundingClientRect();
                const elemRect = element.getBoundingClientRect();

                // Tính toán tỉ lệ scale thực tế để khử sai lệch tọa độ
                let scale = 1;
                const gameContainer = document.getElementById("game-container");
                if (gameContainer && gameContainer.style.transform) {
                    const match = gameContainer.style.transform.match(/scale\(([^)]+)\)/);
                    if (match) scale = parseFloat(match[1]);
                }
                if (!scale || isNaN(scale)) scale = 1;

                // Quy đổi kích thước sau khi chia cho tỉ lệ scale
                const spaceLeft = (elemRect.left - containerRect.left) / scale;
                const spaceRight = (containerRect.right - elemRect.right) / scale;
                const spaceAbove = (elemRect.top - containerRect.top) / scale;
                const elemWidth = elemRect.width / scale;
                const elemHeight = elemRect.height / scale;
                const containerWidth = containerRect.width / scale;
                const containerHeight = containerRect.height / scale;

                const pointerWidth = 24; 
                const pointerHeight = 24;
                const boxHeight = 110;
                let placement = "above";

                const minSpaceAboveNeeded = 65 + boxHeight + 15; // 190px
                if (spaceLeft > containerWidth - 320) {
                    placement = "left";
                } else if (spaceAbove < minSpaceAboveNeeded) {
                    placement = spaceRight > spaceLeft ? "right" : "left";
                } else {
                    placement = "above";
                }

                let left, top;
                let pointerEmoji = "👇";
                let bounceClass = "pointer-bounce-vertical";

                if (placement === "right") {
                    left = (elemRect.right - containerRect.left) / scale + 5;
                    top = spaceAbove + (elemHeight / 2) - 12;
                    pointerEmoji = "👈";
                    bounceClass = "pointer-bounce-horizontal-left";
                } else if (placement === "left") {
                    left = spaceLeft - pointerWidth - 5;
                    top = spaceAbove + (elemHeight / 2) - 12;
                    pointerEmoji = "👉";
                    bounceClass = "pointer-bounce-horizontal-right";
                } else {
                    left = spaceLeft + (elemWidth / 2) - (pointerWidth / 2);
                    top = spaceAbove - 28; 
                    pointerEmoji = "👇";
                    bounceClass = "pointer-bounce-vertical";
                }

                left = Math.max(5, Math.min(containerWidth - pointerWidth - 5, left));
                top = Math.max(60, Math.min(containerHeight - pointerHeight - 10, top));

                pointer.style.left = `${left}px`;
                pointer.style.top = `${top}px`;
                pointer.innerHTML = pointerEmoji;
                pointer.className = bounceClass;
                pointer.classList.remove("hidden");
            }
        }

        /* HÀM ĐIỀU PHỐI HƯỚNG DẪN */
        let currentGuideState = null;
        function updateGuide() {
            if (!selectedWorld) return;
            const box = document.getElementById("assistant-box");
            if (!box) return;

            // Màn hình game đang ẩn — không làm gì
            if (document.getElementById("screen-game").classList.contains("screen-hidden")) return;

            // TRƯỜNG HỢP 1: Trợ lý TẮT → thu nhỏ góc dưới phải, vẫn hiển thị
            if (!gameState.guideEnabled) {
                clearHighlight();
                box.classList.add("assistant-tucked");
                box.style.display = "flex";
                box.style.zIndex = "9999";
                if (currentGuideState !== "guide_off") {
                    currentGuideState = "guide_off";
                    if (gameState.weather === "acid_storm") {
                        triggerAssistantSpeech("acid_storm");
                    } else {
                        const pestPlot = gameState.plots.find(p => p.status === "planted" && p.pest);
                        if (pestPlot) {
                            triggerAssistantSpeech("pest");
                        } else {
                            const dryPlot = gameState.plots.find(p => p.status === "planted" && !p.water);
                            if (dryPlot) {
                                triggerAssistantSpeech("dry");
                            } else if (gameState.eggProgress > 0) {
                                triggerAssistantSpeech("egg");
                            } else {
                                triggerAssistantSpeech("welcome");
                            }
                        }
                    }
                }
                return;
            }

            // TRƯỜNG HỢP 2: BẬT, nhưng không ở tab farm → clear highlight, giữ nguyên
            if (activeTab !== "farm") {
                clearHighlight();
                box.classList.remove("assistant-tucked");
                box.style.display = "flex";
                box.style.zIndex = "9999";
                currentGuideState = null;
                return;
            }

            // TRƯỜNG HỢP 3: BẬT, đang ở tab FARM → logic hướng dẫn đầy đủ
            box.classList.remove("assistant-tucked");
            box.style.display = "flex";
            box.style.zIndex = "9999";

            const comp = companionsConfig[selectedWorld];
            let targetElement = null;
            let speechText = "";
            let guideId = "";

            // 1. Ưu tiên cao nhất: Có sâu hại trên các ô đất
            const pestIndex = gameState.plots.findIndex(p => p.status === "planted" && p.pest);
            if (pestIndex !== -1) {
                guideId = `pest_${pestIndex}`;
                speechText = "Click vào ô có sâu để diệt sâu nhé! 🐛";
                targetElement = document.getElementById(`plot-card-${pestIndex}`);
            }
            // 2. Ưu tiên 2: Cây bị khô cằn cần tưới nước
            else {
                const dryIndex = gameState.plots.findIndex(p => p.status === "planted" && !p.water);
                if (dryIndex !== -1) {
                    if (gameState.inventory.water > 0) {
                        if (selectedTool === "water") {
                            guideId = `water_soil_${dryIndex}`;
                            speechText = "Click vào ô đất khô để tưới nước nhé! 💧";
                            targetElement = document.getElementById(`plot-card-${dryIndex}`);
                        } else {
                            guideId = `water_tool_${dryIndex}`;
                            speechText = "Bé chọn Bình Nước ở túi đồ nhé! 💧";
                            targetElement = document.getElementById("inv-card-water");
                        }
                    } else {
                        // Hướng dẫn làm nhiệm vụ lấy nước
                        guideId = "water_task";
                        speechText = "Hết nước rồi! Làm nhiệm vụ để lấy thêm nước nhé! 💧";
                        targetElement = document.getElementById("task-btn-water");
                    }
                }
                // 3. Ưu tiên 3: Có cây chín cần thu hoạch
                else {
                    const ripeIndex = gameState.plots.findIndex(p => p.status === "planted" && p.prog >= 100);
                    if (ripeIndex !== -1) {
                        guideId = `harvest_${ripeIndex}`;
                        speechText = "Click vào cây chín để thu hoạch nhé! 🌾";
                        targetElement = document.getElementById(`plot-card-${ripeIndex}`);
                    }
                    // 4. Ưu tiên 4: Có ô đất trống để gieo hạt
                    else {
                        const emptyIndex = gameState.plots.findIndex(p => p.status === "empty");
                        if (emptyIndex !== -1) {
                            const hasSeeds = (gameState.inventory.s1 > 0) || (gameState.inventory.s2 > 0) || (gameState.inventory.s3 > 0);
                            if (hasSeeds) {
                                if (selectedTool && selectedTool.startsWith("s") && gameState.inventory[selectedTool] > 0) {
                                    guideId = `plant_soil_${emptyIndex}`;
                                    speechText = "Click vào ô đất trống để gieo hạt nhé! 🌱";
                                    targetElement = document.getElementById(`plot-card-${emptyIndex}`);
                                } else {
                                    guideId = `plant_seed_${emptyIndex}`;
                                    speechText = "Bé chọn hạt giống ở túi đồ nhé! 🌱";
                                    const firstSeedId = gameState.inventory.s1 > 0 ? "s1" : (gameState.inventory.s2 > 0 ? "s2" : "s3");
                                    targetElement = document.getElementById(`inv-card-${firstSeedId}`);
                                }
                            } else {
                                // Hướng dẫn làm nhiệm vụ lấy hạt giống s1
                                guideId = "seed_task";
                                speechText = "Hết hạt rồi! Làm nhiệm vụ lấy hạt giống nhé! 🌱";
                                targetElement = document.getElementById("task-btn-s1");
                            }
                        }
                    }
                }
            }

            if (targetElement) {
                highlightTarget(targetElement);
                if (currentGuideState !== guideId) {
                    currentGuideState = guideId;
                    flyAssistantTo(targetElement, speechText);
                }
            } else {
                clearHighlight();
                if (currentGuideState !== "default") {
                    currentGuideState = "default";
                    resetAssistantPosition();
                    if (gameState.eggProgress > 0) {
                        triggerAssistantSpeech("egg");
                    } else {
                        triggerAssistantSpeech("welcome");
                    }
                }
            }
        }

        function onAssistantClicked() {
            if (!selectedWorld) return;
            playChime(600, 'sine', 0.1);

            // Khi click trợ lý: nói lời hướng dẫn phù hợp tab đang mở
            if (activeTab !== "farm") {
                triggerAssistantSpeech("tab_" + activeTab);
                return;
            }

            // Tab farm: ưu tiên các tình huống quan trọng nhất
            if (gameState.weather === "acid_storm") {
                triggerAssistantSpeech("acid_storm");
                return;
            }
            const pestPlot = gameState.plots.find(p => p.status === "planted" && p.pest);
            if (pestPlot) {
                triggerAssistantSpeech("pest");
                return;
            }
            const dryPlot = gameState.plots.find(p => p.status === "planted" && !p.water);
            if (dryPlot) {
                triggerAssistantSpeech("dry");
                return;
            }
            if (gameState.eggProgress > 0) {
                triggerAssistantSpeech("egg");
            } else {
                triggerAssistantSpeech("welcome");
            }
        }

        /* 1. ĐIỀU PHỐI MÀN HÌNH KHỞI ĐẦU */
        function selectGrade(g) {
            selectedGrade = g;
            document.querySelectorAll(".btn-grade").forEach(b => b.classList.remove("active"));
            document.querySelector(`.btn-grade[data-grade="${g}"]`).classList.add("active");
            playChime(440);
            validateWelcomeScreen();
        }

        function selectWorld(w) {
            selectedWorld = w;
            document.querySelectorAll(".btn-world").forEach(b => b.classList.remove("active"));
            document.querySelector(`.btn-world[data-world="${w}"]`).classList.add("active");
            playChime(554);
            validateWelcomeScreen();
        }

        function validateWelcomeScreen() {
            const btnPlay = document.getElementById("btn-play");
            if (selectedGrade && selectedWorld) {
                btnPlay.removeAttribute("disabled");
            } else {
                btnPlay.setAttribute("disabled", "true");
            }
        }

        /* 2. CHUYỂN CẢNH & KHỞI CHẠY GAME */
        async function startGame() { updateMarketPrices(); 
            if (!selectedGrade || !selectedWorld) return;

            // Đổi Theme Class Body và cập nhật tên hiển thị NGAY LẬP TỨC
            document.body.className = gameAssets[selectedWorld].styleClass;
            document.getElementById("display-world-name").innerText = gameAssets[selectedWorld].name;
            document.getElementById("display-grade-name").innerText = `Học sinh Lớp ${selectedGrade}`;
            
            // SỬA LỖI FOUC: cập nhật CSS variable để ghi đè !important display rules
            document.documentElement.style.setProperty('--fouc-welcome', 'none');
            document.documentElement.style.setProperty('--fouc-game', 'flex');

            // Xóa class opacity ẩn (screen-hidden dùng opacity:0)
            document.getElementById("screen-welcome").classList.add("screen-hidden");
            document.getElementById("screen-game").classList.remove("screen-hidden");
            playChime(659, 'triangle', 0.3);


            // Tải câu hỏi động từ API Next.js
            try {
                const res = await fetch(`${window.GAME_API_BASE}/api/questions?grade=${selectedGrade}`);
                const data = await res.json();
                QUIZ_BANK[`g${selectedGrade}_viet`] = data.viet || [];
                QUIZ_BANK[`g${selectedGrade}_science`] = data.science || [];
                QUIZ_BANK[`g${selectedGrade}_tech`] = data.tech || [];
            } catch (e) {
                console.error("Lỗi tải câu hỏi từ API:", e);
            }

            // Khởi tạo giao diện với bắt lỗi chi tiết
            try {
                loadDataForMode();
                selectedTool = null;
                activeTab = 'farm';
                switchTab('farm');
                updateHeaderStats();
                renderPlots();
                renderInventory();
                renderTasks();
                updateWeatherUI();
                drawDecorations();
                renderHatchingEgg();
                renderPetsList();
                initDailyQuests();
                loadBossSchedule();
                updateGuideButtonUI();
                updateGuide();
            } catch(initErr) {
                console.error("LỖI KHỞI TẠO GAME:", initErr);
                // Hiện lỗi ra debug overlay
                const dbg = document.getElementById('debug-error-overlay');
                const msg = document.getElementById('debug-error-msg');
                if (dbg && msg) {
                    dbg.style.display = 'block';
                    msg.innerHTML += 'startGame init error: ' + initErr.message + ' @ ' + (initErr.stack || '').split('\n')[1] + '<br>';
                }
            }

            // Kích hoạt chào mừng của trợ lý tương ứng chế độ
            setTimeout(() => {
                if (!gameState.guideEnabled) {
                    triggerAssistantSpeech("welcome");
                }
            }, 1000);
        }


        // Tạo khóa lưu trữ tương ứng với từng tổ hợp (Lớp + Chế độ)
        function getStorageKey() {
            return `edufarm_v2_G${selectedGrade}_W${selectedWorld}`;
        }

        function saveDataForMode() {
            if (selectedGrade && selectedWorld) {
                localStorage.setItem(getStorageKey(), JSON.stringify(gameState));
            }
        }

        // Cải tiến siêu mượt: Sửa lỗi xung đột cấu trúc dữ liệu lưu trữ từ các bản trước
        function loadDataForMode() {
            const saved = localStorage.getItem(getStorageKey());
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed && typeof parsed === 'object') {
                        gameState = parsed;
                    } else {
                        resetGameStateToDefault();
                        return;
                    }
                } catch (e) {
                    resetGameStateToDefault();
                    return;
                }
            } else {
                resetGameStateToDefault();
                return;
            }

            // Tiến hành sửa đổi (Migration) các thuộc tính để tương thích hoàn toàn v2.2
            if (typeof gameState.coins !== 'number') gameState.coins = 100;
            if (typeof gameState.level !== 'number') gameState.level = 1;
            if (typeof gameState.xp !== 'number') gameState.xp = 0;
            if (!gameState.shownAlerts || typeof gameState.shownAlerts !== 'object') {
                gameState.shownAlerts = {};
            }

            if (!gameState.inventory || typeof gameState.inventory !== 'object') {
                gameState.inventory = { 
                    s1: 3, 
                    s2: 1, 
                    s3: 0, 
                    water: 5,
                    harvested_s1: 0,
                    harvested_s2: 0,
                    harvested_s3: 0,
                    decorations: []
                };
            }
            for (let i = 1; i <= 11; i++) {
                if (gameState.inventory['s' + i] === undefined) gameState.inventory['s' + i] = (i === 1 ? 3 : (i === 2 ? 1 : 0));
                if (gameState.inventory['harvested_s' + i] === undefined) gameState.inventory['harvested_s' + i] = 0;
            }
            if (gameState.inventory.mapKey === undefined) gameState.inventory.mapKey = 0;
            if (gameState.mapUnlocked === undefined) gameState.mapUnlocked = false;
            if (gameState.inventory.water === undefined) gameState.inventory.water = 5;
            if (!Array.isArray(gameState.inventory.decorations)) gameState.inventory.decorations = [];

            if (!Array.isArray(gameState.plots) || gameState.plots.length < 6) {
                gameState.plots = [
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "locked", cost: 100 },
                    { status: "locked", cost: 250 },
                    { status: "locked", cost: 500 },
                    { status: "locked", cost: 750 },
                    { status: "locked", cost: 1000 },
                    { status: "locked", cost: 1500 },
                    { status: "locked", cost: 2000 }
                ];
            } else if (gameState.plots.length < 10) {
                // Nâng cấp từ bản cũ (6 ô) lên 10 ô không mất dữ liệu cũ
                const costs = [100, 250, 500, 750, 1000, 1500, 2000];
                while (gameState.plots.length < 10) {
                    const i = gameState.plots.length;
                    const cost = costs[i - 3] || 2000;
                    gameState.plots.push({ status: "locked", cost });
                }
            } else {
                // Sửa lỗi các ô đất bị thiếu thuộc tính từ bản v1.0
                const lockedCosts = [100, 250, 500, 750, 1000, 1500, 2000];
                gameState.plots = gameState.plots.map((plot, i) => {
                    if (!plot || typeof plot !== 'object') {
                        return i < 3
                            ? { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 }
                            : { status: "locked", cost: lockedCosts[i - 3] || 2000 };
                    }
                    if (plot.status === undefined) plot.status = "empty";
                    if (plot.prog === undefined) plot.prog = 0;
                    if (plot.seed === undefined) plot.seed = null;
                    if (plot.water === undefined) plot.water = true;
                    if (plot.pest === undefined) plot.pest = false;
                    if (plot.errorCount === undefined) plot.errorCount = 0;
                    return plot;
                });
            }

            if (gameState.eggProgress === undefined) gameState.eggProgress = 0;
            if (!Array.isArray(gameState.unlockedPets)) gameState.unlockedPets = [];
            if (gameState.activePet === undefined) gameState.activePet = null;
            if (gameState.weather === undefined) gameState.weather = "sunny";
            if (gameState.guideEnabled === undefined) gameState.guideEnabled = true;
            if (gameState.mapProgress === undefined) gameState.mapProgress = { eco: 1, cyber: 1, magic: 1 };
        }

        function resetGameStateToDefault() {
            gameState = {
                coins: 100,
                level: 1,
                xp: 0,
                inventory: { 
                    s1: 3, 
                    s2: 1, 
                    s3: 0, 
                    water: 5,
                    mapKey: 0,
                    harvested_s1: 0,
                    harvested_s2: 0,
                    harvested_s3: 0,
                    decorations: []
                },
                mapUnlocked: false,
                plots: [
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "locked", cost: 100 },
                    { status: "locked", cost: 250 },
                    { status: "locked", cost: 500 },
                    { status: "locked", cost: 750 },
                    { status: "locked", cost: 1000 },
                    { status: "locked", cost: 1500 },
                    { status: "locked", cost: 2000 }
                ],
                eggProgress: 0,
                eggHatched: false,
                unlockedPets: [],
                mapProgress: { eco: 1, cyber: 1, magic: 1 },
                activePet: null,
                weather: "sunny",
                guideEnabled: true,
                shownAlerts: {}
            };
        }

        function switchTab(tabId) {
            activeTab = tabId;
            if (typeof dqOnTabVisit === 'function') dqOnTabVisit(tabId); // Daily Quest: all_tabs_3
            document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
            document.getElementById(`tab-${tabId}`).classList.add("active");

            // Ẩn toàn bộ vùng left workspace
            document.getElementById("tab-farm-content").classList.add("hidden");
            document.getElementById("tab-market-content").classList.add("hidden");
            document.getElementById("tab-pet-content").classList.add("hidden");
            document.getElementById("tab-arena-content").classList.add("hidden");
    const tdc = document.getElementById("tab-daily-content");
    if(tdc) tdc.classList.add("hidden");
    const tmc = document.getElementById("tab-map-content");
    if(tmc) tmc.classList.add("hidden");
    const ttc = document.getElementById("tab-town-content");
    if(ttc) ttc.classList.add("hidden");

            // Hiển thị vùng được chọn
            document.getElementById(`tab-${tabId}-content`).classList.remove("hidden");
            
            // Ẩn/Hiện sidebar phải
            const rightSidebar = document.getElementById("right-sidebar");
            if (rightSidebar) {
                if (tabId === "farm") {
                    rightSidebar.style.display = "flex";
                } else {
                    rightSidebar.style.display = "none";
                }
            }

            playChime(500);

            if (tabId === "market") {
                updateMarketUI();
            } else if (tabId === "pet") {
                renderHatchingEgg();
                renderPetsList();
            } else if (tabId === "daily") {
                document.getElementById("tab-daily").classList.add("active");
                document.getElementById("tab-daily-content").classList.remove("hidden");
                document.getElementById("tab-daily-content").classList.add("flex");
            } else if (tabId === "arena") {
                // Trợ lý hiển thị ở arena (không ẩn nữa)
            } else if (tabId === "map") {
                renderMap();
            } else if (tabId === "town") {
                renderTown();
            } else if (tabId === "farm") {
                renderPlots();
            }

            // Cập nhật lời thoại trợ lý theo tab (trước updateGuide)
            updateAssistantForTab(tabId);

            // Đồng bộ lại Trợ lý hướng dẫn farm
            updateGuide();
        }

        /* HÀM CẬP NHẬT TRỢ LÝ THEO TAB */
        function updateAssistantForTab(tabId) {
            if (!selectedWorld) return;
            const box = document.getElementById("assistant-box");
            if (!box) return;

            // Luôn hiển thị và đặt z-index cao nhất
            box.style.display = "flex";
            box.style.zIndex = "9999";

            // Cập nhật tên/avatar nhân vật theo world
            const comp = companionsConfig[selectedWorld];
            if (comp) {
                const avatar = document.getElementById("assistant-avatar");
                const nameEl = document.getElementById("assistant-name");
                if (avatar) avatar.innerText = comp.avatar;
                if (nameEl) {
                    nameEl.innerText = comp.name;
                    nameEl.className = `block text-[10px] font-black uppercase tracking-wider ${comp.textColor} mb-0.5`;
                }
            }

            // Nếu guide TẮT: thu nhỏ về góc, không nói lời thoại tab
            if (!gameState.guideEnabled) {
                box.classList.add("assistant-tucked");
                return;
            }

            // Guide BẬT: hiển thị đầy đủ
            box.classList.remove("assistant-tucked");

            // Tab farm: updateGuide() sẽ xử lý chi tiết (bay tới target, highlight)
            if (tabId === "farm") return;

            // Arena: đặt góc dưới phải để không che các nút boss
            if (tabId === "arena") {
                box.style.left = "auto";
                box.style.right = "16px";
                box.style.bottom = "100px";
                box.style.top = "auto";
            } else {
                // Các tab khác: vị trí mặc định bên trái
                resetAssistantPosition();
            }

            // Nói lời thoại phù hợp tab
            triggerAssistantSpeech("tab_" + tabId);
        }


        function renderPlots() {
            const container = document.getElementById("grid-container");
            if (!container) return;
            container.innerHTML = "";

            gameState.plots.forEach((plot, index) => {
                const wrapper = document.createElement("div");
                wrapper.className = "plot-wrapper";

                // Thẻ ô đất
                const card = document.createElement("div");
                card.className = `plot-card ${plot.status === 'locked' ? 'locked' : ''}`;
                card.id = `plot-card-${index}`;
                card.onclick = () => handlePlotInteraction(index);

                // Overlay Biểu Tượng Thông Báo Nổi
                let overlayContent = "";
                if (plot.status === "planted") {
                    if (plot.prog >= 100) {
                        overlayContent += `<div class="status-bubble harvest"><i class="fa-solid fa-star"></i></div>`;
                    } else {
                        if (!plot.water) {
                            overlayContent += `<div class="status-bubble water"><i class="fa-solid fa-droplet"></i></div>`;
                        }
                        if (plot.pest) {
                            overlayContent += `<div class="status-bubble pest"><i class="fa-solid fa-bug"></i></div>`;
                        }
                    }
                }
                
                let overlay = document.createElement("div");
                overlay.className = "plot-status-overlay";
                overlay.innerHTML = overlayContent;
                card.appendChild(overlay);

                // Vẽ Cây Trồng hoặc Trạng Thái Đất sử dụng SVG
                const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgNode.setAttribute("viewBox", "0 0 140 105");
                svgNode.setAttribute("class", "plot-svg");
                svgNode.innerHTML = buildPlotSVG(plot);
                card.appendChild(svgNode);

                wrapper.appendChild(card);

                // Thanh Trạng Thái Phía Dưới
                const infoPanel = document.createElement("div");
                infoPanel.className = "plot-info-panel";

                let progressWidth = 0;
                let textLabel = "Đất Trống";

                if (plot.status === "locked") {
                    textLabel = `Mở: ${plot.cost}🪙`;
                } else if (plot.status === "planted") {
                    progressWidth = plot.prog;
                    const seedInfo = gameAssets[selectedWorld].seeds[plot.seed];
                    const seedName = seedInfo ? seedInfo.name : "Mầm";
                    
                    let speed = getEffectiveGrowSpeed(seedInfo);
                    
                    let remainingSecs = 0;
                    if (speed > 0) {
                        remainingSecs = Math.ceil((100 - plot.prog) / speed);
                    } else {
                        remainingSecs = Math.ceil((100 - plot.prog) / 2);
                    }
                    
                    if (plot.prog >= 100) {
                        textLabel = `${seedName} Chín! 🎉`;
                    } else {
                        let statusText = "";
                        if (plot.pest) {
                            statusText = "CÓ SÂU! 🐛 ";
                        } else if (!plot.water) {
                            statusText = "KHÔ CẰN! 🏜️ ";
                        }
                        textLabel = `${statusText}${seedName} (${remainingSecs}s)`;
                    }
                } else if (plot.status === "withered") {
                    textLabel = "CÂY CHẾT HÉO 🥀";
                }

                infoPanel.innerHTML = `
                    <div class="plot-bar-outer">
                        <div class="plot-bar-inner" style="width: ${progressWidth}%"></div>
                    </div>
                    <div class="plot-label">
                        <span>${textLabel}</span>
                        <span>${plot.status === 'planted' ? Math.round(plot.prog) + '%' : ''}</span>
                    </div>
                `;

                wrapper.appendChild(infoPanel);
                container.appendChild(wrapper);
            });
        }

        function handlePlotInteraction(index) {
            const plot = gameState.plots[index];

            // 1. Ô đất đang bị khóa
            if (plot.status === "locked") {
                if (gameState.coins >= plot.cost) {
                    triggerTaskFlow("unlock", index);
                } else {
                    playChime(150, 'sawtooth', 0.15);
                    triggerAssistantSpeech("locked");
                    showToast(`❌ Bé cần có đủ ${plot.cost} xu vàng để thực hiện thử thách mở đất này.`);
                }
                return;
            }

            // 2. Cây đã chết héo
            if (plot.status === "withered") {
                plot.status = "empty";
                plot.seed = null;
                plot.prog = 0;
                plot.pest = false;
                plot.errorCount = 0;
                playChime(350, 'sine', 0.2);
                saveDataForMode();
                renderPlots();
                return;
            }

            // 3. Có côn trùng sâu hại hoành hành
            if (plot.status === "planted" && plot.pest) {
                triggerTaskFlow("pest", index);
                return;
            }

            // 4. Thu hoạch nông sản khi chín (Thay đổi Edu-Farm v2.2: Gửi vào kho nông sản)
            if (plot.status === "planted" && plot.prog >= 100) {
                collectCropToInventory(index);
                return;
            }

            // 5. Chăm sóc tưới nước cằn cỗi
            if (plot.status === "planted" && !plot.water) {
                if (selectedTool === "water" && gameState.inventory.water > 0) {
                    plot.water = true;
                    gameState.inventory.water--;
                    dqOnWater(index); // Daily Quest: tuoi nuoc
                    playChime(880, 'sine', 0.15);
                    saveDataForMode();
                    renderPlots();
                    renderInventory();
                    updateGuide();
                } else {
                    playChime(220, 'square', 0.25);
                    triggerAssistantSpeech("dry");
                    showToast("💧 Ô đất đã cạn nước! Bé hãy chọn Bình Nước trong túi đồ để tưới ẩm ngay.");
                }
                return;
            }

            // 6. Gieo hạt giống mới vào đất
            if (plot.status === "empty") {
                if (selectedTool && selectedTool.startsWith("s")) {
                    if (gameState.inventory[selectedTool] > 0) {
                        gameState.inventory[selectedTool]--;
                        plot.status = "planted";
                        plot.seed = selectedTool;
                        plot.prog = 0;
                        plot.water = true;
                        plot.pest = false;
                        plot.errorCount = 0;
                        dqOnPlant(index); // Daily Quest: gieo hat
                        playChime(440, 'triangle', 0.2);
                        saveDataForMode();
                        renderPlots();
                        renderInventory();
                        updateGuide();
                    }
                } else {
                    showToast("🌱 Bé hãy chọn 1 loại hạt giống từ túi đồ bên phải để gieo hạt nhé!");
                }
            }
        }

        // Thu hoạch nông sản và cộng vào Kho nông sản ảo
        function collectCropToInventory(index) {
            const plot = gameState.plots[index];
            const seedType = plot.seed;
            if (!seedType) return;

            gameState.inventory['harvested_' + seedType] = (gameState.inventory['harvested_' + seedType] || 0) + 1;
            
            let baseDropRate = 0.3;
            if (gameState.town && gameState.town.lab && gameState.town.lab.level > 0) {
                baseDropRate += (gameState.town.lab.level * 0.05);
            }
            if (Math.random() < baseDropRate) {
                gameState.inventory.mapKey = (gameState.inventory.mapKey || 0) + 1;
                showToast("🔑 Wow! Bé nhặt được 1 Chìa Khóa Bản Đồ!", 3000, "success");
            }
            
            gameState.xp += 15;
            if (gameState.xp >= gameState.level * 80) {
                gameState.xp = 0;
                gameState.level++;
                playChime(1200, 'sine', 0.4);
                alertBox(`Chúc mừng bé thăng lên Cấp ${gameState.level}! 🎉`);
            } else {
                playChime(987, 'sine', 0.25);
            }

            plot.status = "empty";
            plot.seed = null;
            plot.prog = 0;
            plot.errorCount = 0;
            
            saveDataForMode();
            updateHeaderStats();
            renderPlots();
            updateGuide();
            
            dqOnHarvest(index);

            if (!gameState.shownAlerts.harvest) {
                alertBox("Thu hoạch thành công! Nông sản đã được lưu vào Kho để bé bán đấu giá tại Chợ!");
                gameState.shownAlerts.harvest = true;
                saveDataForMode();
            } else {
                showToast("🌾 Đã thu hoạch nông sản vào kho!");
            }
        }

        function renderInventory() {
            const container = document.getElementById("inv-grid-container");
            if (!container) return;
            container.innerHTML = "";

            const w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
            const seeds = gameAssets[w].seeds;

            const items = [
                { id: "s1", name: seeds.s1.name, emoji: seeds.s1.emoji, desc: "Hạt giống Dễ" },
                { id: "s2", name: seeds.s2.name, emoji: seeds.s2.emoji, desc: "Hạt giống Vừa" },
                { id: "s3", name: seeds.s3.name, emoji: seeds.s3.emoji, desc: "Hạt giống Khó" }
            ];

            for (let i = 4; i <= 11; i++) {
                let seedId = 's' + i;
                let count = gameState.inventory[seedId] || 0;
                if (count > 0 && seeds[seedId]) {
                    items.push({
                        id: seedId,
                        name: seeds[seedId].name,
                        emoji: seeds[seedId].emoji,
                        desc: i === 11 ? "Hạt kho báu hiếm" : "Hạt đặc biệt"
                    });
                }
            }

            items.push({ id: "water", name: "Bình Nước", emoji: "💧", desc: "Giữ ẩm đất" });

            items.forEach(it => {
                const card = document.createElement("div");
                card.className = `inv-card ${selectedTool === it.id ? 'active' : ''}`;
                card.id = `inv-card-${it.id}`;
                card.onclick = () => selectTool(it.id);

                card.innerHTML = `
                    <div class="inv-qty">${gameState.inventory[it.id] || 0}</div>
                    <div class="inv-icon">${it.emoji}</div>
                    <div class="inv-name">${it.name}</div>
                    <div style="font-size: 10px; opacity: 0.5;">${it.desc}</div>
                `;

                container.appendChild(card);
            });
        }

        function selectTool(id) {
            if (selectedTool === id) {
                selectedTool = null;
            } else {
                selectedTool = id;
            }
            playChime(600);
            renderInventory();
            updateGuide();
        }

        function renderTasks() {
            const container = document.getElementById("task-list-container");
            if (!container) return;
            container.innerHTML = "";

            const tasks = [
                { id: "s1", name: `Lấy ${gameAssets[selectedWorld].seeds.s1.name}`, reward: "+1 Hạt", level: "DỄ" },
                { id: "s2", name: `Lấy ${gameAssets[selectedWorld].seeds.s2.name}`, reward: "+1 Hạt", level: "VỪA" },
                { id: "s3", name: `Lấy ${gameAssets[selectedWorld].seeds.s3.name}`, reward: "+1 Hạt", level: "KHÓ" },
                { id: "water", name: "Lấy Nước tưới", reward: "+3 Bình Nước", level: "DỄ" }
            ];

            tasks.forEach(t => {
                const btn = document.createElement("button");
                btn.className = "task-btn";
                btn.id = `task-btn-${t.id}`;
                btn.onclick = () => triggerTaskFlow("farm", t.id);

                btn.innerHTML = `
                    <div class="task-meta">
                        <h4>${t.name}</h4>
                        <span>Độ khó: ${t.level}</span>
                    </div>
                    <div class="task-reward">${t.reward}</div>
                `;

                container.appendChild(btn);
            });
        }



        function updateHeaderStats() {
            document.getElementById("stat-coins").innerText = Math.floor(gameState.coins || 0);
            document.getElementById("stat-level").innerText = `LV ${gameState.level}`;
        }


let currentMarketPrices = {};
function updateMarketPrices() {
    let seeds = getSeedConfig();
    for(let i=1; i<=10; i++) {
        if (seeds['s'+i]) {
            currentMarketPrices['s'+i] = seeds['s'+i].reward;
        }
    }
}



        function updateMarketUI() {
            renderMarket();

            // Vẽ biểu đồ cột động
            const chartContainer = document.getElementById("market-chart-bars");
            if (!chartContainer) return;
            chartContainer.innerHTML = "";

            const w = selectedWorld || (gameState && gameState.world) || 'eco';
            const seeds = gameAssets[w].seeds;
            const crops = [
                { id: "s1", name: seeds.s1.name, price: currentMarketPrices.s1 || seeds.s1.reward, maxPrice: Math.floor(seeds.s1.reward * 1.5) },
                { id: "s2", name: seeds.s2.name, price: currentMarketPrices.s2 || seeds.s2.reward, maxPrice: Math.floor(seeds.s2.reward * 1.5) },
                { id: "s3", name: seeds.s3.name, price: currentMarketPrices.s3 || seeds.s3.reward, maxPrice: Math.floor(seeds.s3.reward * 1.5) }
            ];

            // Add premium crops to the chart if purchased or harvested
            for (let i = 4; i <= 10; i++) {
                const seedId = 's' + i;
                if ((gameState.inventory[seedId] || 0) > 0 || (gameState.inventory['harvested_' + seedId] || 0) > 0) {
                    crops.push({
                        id: seedId,
                        name: seeds[seedId].name,
                        price: currentMarketPrices[seedId] || seeds[seedId].reward,
                        maxPrice: Math.floor(seeds[seedId].reward * 1.5)
                    });
                }
            }

            crops.forEach(crop => {
                const seedInfo = gameAssets[selectedWorld].seeds[crop.id];
                const heightPercentage = Math.min(130, Math.max(30, (crop.price / crop.maxPrice) * 130));
                const cropColor = seedInfo.color || "#10b981";
                const cropEmoji = seedInfo.emoji || "🌾";
                
                const barItem = document.createElement("div");
                barItem.className = "chart-bar-item flex flex-col items-center justify-end h-[180px] w-[80px]";
                barItem.innerHTML = `
                    <div class="text-[13px] font-black text-yellow-400 mb-1.5 flex items-center gap-0.5 filter drop-shadow">
                        <span>${crop.price}</span><span class="text-[10px]">🪙</span>
                    </div>
                    <div class="chart-bar-pillar" style="height: ${heightPercentage}px; width: 44px; background: linear-gradient(to top, ${cropColor}cc, ${cropColor}); border-radius: 12px 12px 6px 6px; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.25); border: 2px solid rgba(255,255,255,0.15);">
                        <span style="font-size: 20px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); pointer-events: none;">${cropEmoji}</span>
                    </div>
                    <span class="text-[12px] font-extrabold mt-2 text-slate-200 truncate max-w-[75px]">${crop.name}</span>
                `;
                chartContainer.appendChild(barItem);
            });
        }

        function adjustSellQty(seedId, delta) {
            const input = document.getElementById(`sell-qty-${seedId}`);
            if (!input) return;
            const harvestedKey = `harvested_${seedId}`;
            const stock = gameState.inventory[harvestedKey] || 0;
            
            let val = parseInt(input.value) || 1;
            val += delta;
            val = Math.max(1, Math.min(stock === 0 ? 1 : stock, val));
            input.value = val;
        }

        function setSellMax(seedId) {
            const input = document.getElementById(`sell-qty-${seedId}`);
            if (!input) return;
            const harvestedKey = `harvested_${seedId}`;
            const stock = gameState.inventory[harvestedKey] || 0;
            input.value = Math.max(1, stock);
        }

        function validateSellQty(seedId) {
            const input = document.getElementById(`sell-qty-${seedId}`);
            if (!input) return;
            const harvestedKey = `harvested_${seedId}`;
            const stock = gameState.inventory[harvestedKey] || 0;
            
            let val = parseInt(input.value) || 1;
            val = Math.max(1, Math.min(stock === 0 ? 1 : stock, val));
            input.value = val;
        }

        function sellCrop(seedId) {
            const harvestedKey = `harvested_${seedId}`;
            const stock = gameState.inventory[harvestedKey] || 0;
            
            const qtyInput = document.getElementById(`sell-qty-${seedId}`);
            let qtyToSell = qtyInput ? parseInt(qtyInput.value) : stock;
            if (isNaN(qtyToSell) || qtyToSell < 1) qtyToSell = 1;

            if (stock >= qtyToSell && qtyToSell > 0) {
                let sellValue = qtyToSell * currentMarketPrices[seedId];
                if (gameState.town && gameState.town.observatory && gameState.town.observatory.level > 0) {
                    sellValue = Math.floor(sellValue * (1 + (gameState.town.observatory.level * 0.1)));
                }
                gameState.coins += sellValue;
                gameState.inventory[harvestedKey] -= qtyToSell;
                dqOnSell(sellValue, seedId); // Daily Quest: ban nong san + market quests

                playChime(1000, 'sine', 0.3);
                saveDataForMode();
                updateHeaderStats();
                updateMarketUI();
                
                showToast(`💰 Bé đã bán ${qtyToSell} nông sản và nhận được ${sellValue} xu vàng!`);
            } else {
                playChime(150, 'sawtooth', 0.15);
                if (stock > 0) {
                    showToast("❌ Số lượng bán vượt quá số lượng bé có trong kho.");
                } else {
                    showToast("❌ Nông sản này hiện không còn trong kho của bé để bán.");
                }
            }
        }

        // Sự kiện biến động giá sau mỗi 45 giây
        function triggerMarketFluctuation() {
            let seeds = getSeedConfig();
            for(let i=1; i<=10; i++) {
                let seedId = 's'+i;
                if (seeds[seedId]) {
                    let reward = seeds[seedId].reward;
                    let min = Math.floor(reward * 0.6);
                    let max = Math.floor(reward * 1.4);
                    currentMarketPrices[seedId] = Math.floor(Math.random() * (max - min + 1)) + min;
                }
            }

            if (activeTab === "market") {
                updateMarketUI();
            }
        }

        function buyDecoration(decorId, price) {
            if (gameState.coins >= price) {
                if (gameState.inventory.decorations.includes(decorId)) {
                    showToast("⚠️ Bé đã mua đồ trang trí này rồi!");
                    return;
                }
                gameState.coins -= price;
                gameState.inventory.decorations.push(decorId);
                
                playChime(800, 'triangle', 0.35);
                saveDataForMode();
                updateHeaderStats();
                drawDecorations();
                showToast("✨ Mua đồ trang trí thành công!");
            } else {
                playChime(150, 'sawtooth', 0.15);
                showToast(`❌ Bé cần có đủ ${price} xu vàng để mua vật phẩm này.`);
            }
        }

        function drawDecorations() {
            const container = document.getElementById("decoration-layer-container");
            if (!container) return;
            container.innerHTML = "";

            const decors = gameState.inventory.decorations || [];

            if (decors.includes("decor_fence")) {
                // Hàng rào gỗ bao quanh grid trang trại
                container.innerHTML += `
                    <div style="position: absolute; top: 10px; bottom: 10px; left: 10px; right: 10px; border: 4px ridge #d97706; border-radius: 30px; opacity: 0.3; pointer-events: none;"></div>
                `;
            }
            if (decors.includes("decor_scarecrow")) {
                // Bù nhìn rơm ở góc trái
                container.innerHTML += `
                    <div style="position: absolute; bottom: 20px; left: 20px; font-size: 40px; pointer-events: none;">🌾</div>
                `;
            }
            if (decors.includes("decor_fountain")) {
                // Đài nước ở góc phải
                container.innerHTML += `
                    <div style="position: absolute; top: 20px; right: 20px; font-size: 40px; pointer-events: none; animation: bounce 1.5s infinite alternate;">⛲</div>
                `;
            }
            if (decors.includes("decor_windmill")) {
                // Cối xay gió ở góc trái trên
                container.innerHTML += `
                    <div style="position: absolute; top: 20px; left: 20px; font-size: 40px; pointer-events: none; display: inline-block; animation: spin-slow 10s linear infinite;">🎡</div>
                `;
            }
            if (decors.includes("decor_antenna")) {
                // Cột phát sóng ở góc phải dưới
                container.innerHTML += `
                    <div class="animate-pulse" style="position: absolute; bottom: 20px; right: 20px; font-size: 40px; pointer-events: none;">📡</div>
                `;
            }
            if (decors.includes("decor_lamp")) {
                // Đèn phép thuật ở giữa bên trái
                container.innerHTML += `
                    <div style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); font-size: 35px; pointer-events: none; filter: drop-shadow(0 0 8px #fbbf24);">🏮</div>
                `;
            }
            if (decors.includes("decor_sunflower")) {
                // Hoa hướng dương ở giữa bên phải
                container.innerHTML += `
                    <div style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); font-size: 35px; pointer-events: none; animation: bounce 2s infinite alternate;">🌻</div>
                `;
            }
            if (decors.includes("decor_drone")) {
                // Drone tuần tra ở góc trên giữa trái
                container.innerHTML += `
                    <div style="position: absolute; top: 70px; left: 160px; font-size: 30px; pointer-events: none; animation: bounce 1.2s infinite alternate;">🛸</div>
                `;
            }
            if (decors.includes("decor_magictree")) {
                // Cây phép thuật ở góc dưới giữa phải
                container.innerHTML += `
                    <div style="position: absolute; bottom: 60px; right: 160px; font-size: 45px; pointer-events: none;">🌳</div>
                `;
            }
        }

        function updateWeatherUI() {
            const badge = document.getElementById("display-weather");
            if (!badge) return;

            if (gameState.weather === "sunny") {
                badge.innerHTML = `<i class="fa-solid fa-sun text-yellow-400"></i> &nbsp;<span id="weather-text">Nắng ấm</span>`;
                badge.style.color = "#facc15";
            } else if (gameState.weather === "rainy") {
                badge.innerHTML = `<i class="fa-solid fa-cloud-showers-water text-sky-400 animate-bounce"></i> &nbsp;<span id="weather-text">Mưa Rào</span>`;
                badge.style.color = "#38bdf8";
            } else if (gameState.weather === "acid_storm") {
                badge.innerHTML = `<i class="fa-solid fa-biohazard text-red-500 animate-pulse"></i> &nbsp;<span id="weather-text">Mưa Axit!</span>`;
                badge.style.color = "#f87171";
            }
        }

        // Tự động thay đổi thời tiết ngẫu nhiên sau mỗi 60 giây
        function rotateWeather() {
            const rand = Math.random();
            if (rand < 0.6) {
                gameState.weather = "sunny";
            } else if (rand < 0.85) {
                gameState.weather = "rainy";
                // Mưa rào: tự động làm ẩm toàn bộ ô đất đang trồng
                gameState.plots.forEach(p => {
                    if (p.status === "planted") p.water = true;
                });
                renderPlots();
                
                if (!gameState.shownAlerts.rain) {
                    alertBox("Trời đổ cơn mưa rào! Toàn bộ thửa ruộng đã được làm ẩm mát mẻ. Cây trồng tăng tốc 1.5x!");
                    gameState.shownAlerts.rain = true;
                } else {
                    showToast("🌧️ Trời đổ mưa rào, đất được tưới mát!");
                }
            } else {
                gameState.weather = "acid_storm";
                // Thiên tai mưa axit nguy hiểm
                triggerAssistantSpeech("acid_storm");
                
                if (!gameState.shownAlerts.acid_storm) {
                    alertBox("CẢNH BÁO: Đám mây axit tràn qua trang trại! Bé hãy kích hoạt ngay LÁ CHẮN bảo vệ bằng cách giải bài tập!");
                    gameState.shownAlerts.acid_storm = true;
                } else {
                    showToast("⚠️ CẢNH BÁO: Mưa axit tràn qua! Mau kích hoạt lá chắn bảo vệ!");
                }
                triggerTaskFlow("disaster", "environment");
            }
            updateWeatherUI();
            saveDataForMode();
        }

        const petsDatabase = {
            p1: { id: "p1", name: "Rùa Eco", emoji: "🐢", skill: "Tự động tưới nước ngẫu nhiên", desc: "Eco Guardian" },
            p2: { id: "p2", name: "Robo Poodle", emoji: "🐩", skill: "Tăng 15% xu khi thu hoạch", desc: "Cyber Companion" },
            p3: { id: "p3", name: "Mèo Tiên", emoji: "🐱", skill: "Miễn trừ 50% bão axit", desc: "Magic Sprite" }
        };

        function renderHatchingEgg() {
            const svg = document.getElementById("egg-svg-render");
            if (!svg) return;
            // Biểu diễn trứng lấp lánh nở động theo eggProgress
            const progress = gameState.eggProgress || 0;
            const percentage = (progress / 5) * 100;

            const progressFill = document.getElementById("egg-hatch-progress");
            if (progressFill) progressFill.style.width = `${percentage}%`;
            
            const progressText = document.getElementById("egg-progress-text");
            if (progressText) progressText.innerText = `Năng lượng: ${progress}/5 (Giải đúng ${5 - progress} câu nữa để nở)`;

            // Vẽ trứng SVG
            let eggColor = "#a855f7";
            if (progress >= 3) eggColor = "#f43f5e";

            svg.innerHTML = `
                <defs>
                    <radialGradient id="eggGrad" cx="50%" cy="40%" r="50%">
                        <stop offset="0%" stop-color="#fdf4ff"/>
                        <stop offset="70%" stop-color="${eggColor}"/>
                        <stop offset="100%" stop-color="#1e1b4b"/>
                    </radialGradient>
                </defs>
                <ellipse cx="50" cy="65" rx="35" ry="45" fill="url(#eggGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
                ${progress > 0 ? `<path d="M 30,65 L 50,55 L 70,65 L 50,75 Z" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3"/>` : ""}
                ${progress >= 3 ? `<path d="M 15,65 Q 50,75 85,65 M 15,55 Q 50,45 85,55" fill="none" stroke="#fff" stroke-width="2"/>` : ""}
                <text x="50" y="115" fill="#a78bfa" font-size="11" font-weight="900" text-anchor="middle">ẤP NỞ: ${percentage.toFixed(0)}%</text>
            `;
        }

        function renderPetsList() {
            const grid = document.getElementById("pets-unlocked-grid");
            if (!grid) return;
            grid.innerHTML = "";

            Object.values(petsDatabase).forEach(pet => {
                const isUnlocked = gameState.unlockedPets.includes(pet.id);
                const isActive = gameState.activePet === pet.id;

                const card = document.createElement("div");
                card.className = `pet-item-card ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;
                if (isUnlocked) {
                    card.onclick = () => activatePet(pet.id);
                }

                card.innerHTML = `
                    ${isActive ? `<span class="pet-active-badge">ĐỒNG HÀNH</span>` : ""}
                    <div class="text-4xl mb-2">${pet.emoji}</div>
                    <div class="text-xs font-black">${pet.name}</div>
                    <div class="text-[10px] opacity-60 mt-1">${pet.skill}</div>
                `;

                grid.appendChild(card);
            });
        }

        function activatePet(petId) {
            if (gameState.activePet === petId) {
                gameState.activePet = null;
            } else {
                gameState.activePet = petId;
            }
            playChime(900, 'triangle', 0.2);
            saveDataForMode();
            renderPetsList();
        }

        // Tăng tiến độ ấp trứng khi giải đúng bài tập
        function progressEgg() {
            if (gameState.eggProgress === undefined) gameState.eggProgress = 0;
            if (gameState.unlockedPets === undefined) gameState.unlockedPets = [];

            gameState.eggProgress++;
            if (typeof dqOnEggProgress === 'function') dqOnEggProgress(); // DQ: pet_progress_2
            if (typeof dqOnPetAnswer === 'function') dqOnPetAnswer();     // DQ: pet_answer_5
            if (gameState.eggProgress >= 5) {
                gameState.eggProgress = 0;
                
                // Mở khóa ngẫu nhiên một bé thú mới chưa sở hữu
                const allIds = Object.keys(petsDatabase);
                const lockedIds = allIds.filter(id => !gameState.unlockedPets.includes(id));

                if (lockedIds.length > 0) {
                    const unlockedId = lockedIds[Math.floor(Math.random() * lockedIds.length)];
                    gameState.unlockedPets.push(unlockedId);
                    playChime(1500, 'sine', 0.5);
                    alertBox(`TRỨNG ĐÃ NỞ! Bé đã nhận được Trợ thủ cực kỳ đáng yêu: **${petsDatabase[unlockedId].name}**! 🎉`);
                } else {
                    gameState.coins += 100;
                    alertBox("Trứng đã nở! Vì bé đã có đủ tất cả thú cưng nên nhận thưởng thêm 100🪙 xu vàng!");
                }
            }
            saveDataForMode();
            if (activeTab === "pet") {
                renderHatchingEgg();
                renderPetsList();
            }
        }

        let bossState = {
            active: false,
            hp: 100,
            timer: 60,
            stage: 1,
            correctAnswer: null,
            timerInterval: null
        };

        function startBossBattle() {
            playSoundChimeForBoss();
            bossState.active = true;
            bossState.hp = 100;
            bossState.timer = 60;
            bossState.stage = 1;
            if (typeof dqOnBossStart === 'function') dqOnBossStart(); // Daily Quest hook

            // Thiết lập activeTask
            let targetCount = Math.floor(Math.random() * 4) + 3; // Random 3 to 6 questions
            activeTask = {
                type: "boss",
                subject: "boss",
                correctCount: 0,
                target: targetCount,
                errors: 0,
                timeLeft: 60,
                correctAnswer: null,
                questionText: ""
            };

            // Setup giao diện Boss trong modal-task
            const modal = document.getElementById("modal-task");
            const modalTitle = document.getElementById("task-modal-title");
            const bossArena = document.getElementById("boss-arena-container");
            const closeBtn = document.getElementById("modal-task-close");
            const heartsContainer = document.getElementById("quest-hearts-container");
            
            modal.classList.add("active");
            modal.classList.add("boss-mode");
            modalTitle.style.display = "none"; // Ẩn tiêu đề cũ
            closeBtn.style.display = "none"; // Khóa thoát
            bossArena.style.display = "block";
            heartsContainer.style.display = "none"; // Không dùng tim

            // Xác định Boss theo thế giới
            const bossIcon = document.getElementById("boss-sprite-icon");
            const bossName = document.getElementById("boss-name-text");
            if (selectedWorld === 'eco') {
                bossIcon.innerHTML = '<i class="fa-solid fa-bug"></i>';
                bossIcon.style.color = '#84cc16';
                bossIcon.style.textShadow = '0 0 20px rgba(132, 204, 22, 0.6)';
                bossName.innerText = "Sâu Róm Đột Biến";
                bossName.style.color = '#bef264';
            } else if (selectedWorld === 'magic') {
                bossIcon.innerHTML = '<i class="fa-solid fa-dragon"></i>';
                bossIcon.style.color = '#a855f7';
                bossIcon.style.textShadow = '0 0 20px rgba(168, 85, 247, 0.6)';
                bossName.innerText = "Rồng Hắc Ám";
                bossName.style.color = '#d8b4fe';
            } else if (selectedWorld === 'cyber') {
                bossIcon.innerHTML = '<i class="fa-solid fa-robot"></i>';
                bossIcon.style.color = '#06b6d4';
                bossIcon.style.textShadow = '0 0 20px rgba(6, 182, 212, 0.6)';
                bossName.innerText = "Siêu Virus";
                bossName.style.color = '#67e8f9';
            } else {
                bossIcon.innerHTML = '<i class="fa-solid fa-ghost"></i>';
                bossIcon.style.color = '#f43f5e';
                bossIcon.style.textShadow = '0 0 20px rgba(225,29,72,0.6)';
                bossName.innerText = "Quái Vật Ẩn Danh";
                bossName.style.color = '#fecdd3';
            }

            updateBossHud();
            generateCurriculumQuestion('boss');

            bossState.timerInterval = setInterval(() => {
                bossState.timer--;
                document.getElementById("boss-timer").innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${bossState.timer}s`;

                if (bossState.timer <= 0) {
                    endBossBattle(false);
                }
            }, 1000);
        }

        function updateBossHud() {
            document.getElementById("boss-hp-text").innerText = `${bossState.hp}/100`;
            document.getElementById("boss-stage-text").innerText = bossState.stage;
            document.getElementById("boss-hp-bar-fill").style.width = `${bossState.hp}%`;
        }

        function playSoundChimeForBoss() {
            playChime(150, 'sawtooth', 0.5);
            setTimeout(() => playChime(250, 'sawtooth', 0.5), 150);
        }

        function playBossHitAnimation(damage) {
            const bossSprite = document.getElementById("boss-sprite-icon");
            const bossArena = document.getElementById("boss-arena-container");

            if (bossSprite) {
                bossSprite.style.transform = "";
                bossSprite.style.filter = "";
                bossSprite.classList.add("boss-hit-anim");
                setTimeout(() => {
                    bossSprite.classList.remove("boss-hit-anim");
                }, 500);
            }

            if (bossArena) {
                const dmgText = document.createElement("div");
                dmgText.className = "damage-popup";
                dmgText.innerText = `-${damage}`;
                bossArena.appendChild(dmgText);
                
                setTimeout(() => {
                    if (bossArena.contains(dmgText)) {
                        bossArena.removeChild(dmgText);
                    }
                }, 1000);
            }
        }

        function hitBoss() {
            playChime(900, 'triangle', 0.25);
            bossState.hp -= 20;
            bossState.stage++;
            updateBossHud();
            if (typeof dqOnBossAttack === 'function') dqOnBossAttack(true); // Daily Quest hook
            
            playBossHitAnimation(20);

            const modal = document.getElementById("modal-task").querySelector(".modal-card");
            modal.classList.add("boss-damage-shake");
            setTimeout(() => modal.classList.remove("boss-damage-shake"), 300);

            if (bossState.hp <= 0) {
                endBossBattle(true);
            } else {
                generateCurriculumQuestion('boss');
            }
        }

        function bossPenalty() {
            playChime(120, 'sawtooth', 0.4);
            bossState.timer = Math.max(0, bossState.timer - 5);
            if (typeof dqOnBossPenalty === 'function') dqOnBossPenalty(); // Daily Quest hook
            const timerEl = document.getElementById("boss-timer");
            timerEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${bossState.timer}s`;
            
            timerEl.classList.remove("timer-penalty-anim");
            void timerEl.offsetWidth;
            timerEl.classList.add("timer-penalty-anim");

            const modal = document.getElementById("modal-task").querySelector(".modal-card");
            modal.style.boxShadow = "0 10px 50px rgba(239, 68, 68, 0.8)";
            setTimeout(() => {
                modal.style.boxShadow = "0 10px 40px rgba(225, 29, 72, 0.4)";
            }, 300);
        }

        function endBossBattle(isVictory) {
            clearInterval(bossState.timerInterval);
            
            const modal = document.getElementById("modal-task");
            const modalTitle = document.getElementById("task-modal-title");
            const bossArena = document.getElementById("boss-arena-container");
            const closeBtn = document.getElementById("modal-task-close");
            const heartsContainer = document.getElementById("quest-hearts-container");

            modal.classList.remove("active");
            modal.classList.remove("boss-mode");
            modalTitle.style.display = "block";
            closeBtn.style.display = "block";
            bossArena.style.display = "none";
            heartsContainer.style.display = "flex";

            bossState.active = false;
            activeTask = null;

            if (isVictory) {
                gameState.coins += 150;
                dqOnBossWin();
                gameState.inventory.water += 5;
                addXPArena(100);
                saveDataForMode();
                updateHeaderStats();
                renderInventory();

                // Tạo modal chiến thắng Boss hoành tráng
                const victoryOverlay = document.createElement("div");
                victoryOverlay.className = "modal-overlay active alert-box-overlay";
                victoryOverlay.style.zIndex = "200";
                victoryOverlay.innerHTML = `
                    <div class="modal-card" style="max-width: 420px; background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border: 2px solid #fbbf24; box-shadow: 0 0 40px rgba(251,191,36,0.4), 0 0 80px rgba(251,191,36,0.15); text-align: center; overflow: hidden; position: relative;">
                        <!-- Particle effects -->
                        <div style="position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;overflow:hidden;">
                            ${Array.from({length: 20}).map((_, i) => `
                                <div style="position:absolute;width:8px;height:8px;background:${['#fbbf24','#34d399','#60a5fa','#f87171','#a78bfa'][i%5]};border-radius:50%;
                                    left:${Math.random()*100}%;top:${Math.random()*100}%;
                                    animation:victoryParticle${i%3} ${1.5 + Math.random()}s ease-out infinite;opacity:0.8;"></div>
                            `).join('')}
                        </div>
                        <style>
                            @keyframes victoryParticle0 { 0%{transform:translateY(0) scale(1);opacity:0.8} 100%{transform:translateY(-60px) scale(0);opacity:0} }
                            @keyframes victoryParticle1 { 0%{transform:translateY(0) rotate(0deg);opacity:0.8} 100%{transform:translateY(-80px) rotate(180deg);opacity:0} }
                            @keyframes victoryParticle2 { 0%{transform:translate(0,0) scale(1);opacity:0.8} 100%{transform:translate(20px,-50px) scale(0.2);opacity:0} }
                            @keyframes bossVictoryPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
                            @keyframes bossVictoryGlow { 0%,100%{text-shadow: 0 0 20px rgba(251,191,36,0.5)} 50%{text-shadow: 0 0 40px rgba(251,191,36,1), 0 0 80px rgba(251,191,36,0.5)} }
                        </style>
                        <!-- Trophy Icon -->
                        <div style="font-size:80px; animation:bossVictoryPulse 1.5s ease-in-out infinite; margin: 20px 0 10px; filter: drop-shadow(0 0 20px rgba(251,191,36,0.8));">🏆</div>
                        <!-- Title -->
                        <h2 style="font-size:24px;font-weight:900;color:#fbbf24;animation:bossVictoryGlow 2s ease-in-out infinite;margin-bottom:6px;letter-spacing:1px;">CHIẾN THẮNG VANG DỘI!</h2>
                        <p style="color:#94a3b8;font-size:13px;margin-bottom:20px;">Bé đã đánh bại <b style='color:#f87171'>Sâu Róm Khổng Lồ</b> và bảo vệ điền trang!</p>
                        <!-- Reward breakdown -->
                        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(251,191,36,0.2);border-radius:16px;padding:16px;margin:0 10px 20px;display:flex;justify-content:space-around;gap:12px;">
                            <div style="text-align:center;">
                                <div style="font-size:32px;margin-bottom:4px;">🪙</div>
                                <div style="font-size:22px;font-weight:900;color:#fbbf24;">+150</div>
                                <div style="font-size:11px;color:#94a3b8;">xu vàng</div>
                            </div>
                            <div style="text-align:center;">
                                <div style="font-size:32px;margin-bottom:4px;">💧</div>
                                <div style="font-size:22px;font-weight:900;color:#60a5fa;">+5</div>
                                <div style="font-size:11px;color:#94a3b8;">bình nước</div>
                            </div>
                            <div style="text-align:center;">
                                <div style="font-size:32px;margin-bottom:4px;">⭐</div>
                                <div style="font-size:22px;font-weight:900;color:#a78bfa;">+100</div>
                                <div style="font-size:11px;color:#94a3b8;">điểm kinh nghiệm</div>
                            </div>
                        </div>
                        <!-- Close button -->
                        <button onclick="this.closest('.modal-overlay').remove()" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1a2e;font-weight:900;font-size:16px;padding:14px 40px;border:none;border-radius:14px;cursor:pointer;width:calc(100% - 20px);margin:0 10px 20px;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(251,191,36,0.4);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                            ✅ BÉ ĐÃ HIỂU!
                        </button>
                    </div>
                `;
                document.getElementById("game-container").appendChild(victoryOverlay);
            } else {
                alertBox("⏰ Thử thách đã hết giờ! Bé hãy ôn luyện thêm rồi thử thách lại lần sau nhé! 💪");
            }
        }

        function addXPArena(amt) {
            gameState.xp += amt;
            if (gameState.xp >= gameState.level * 80) {
                gameState.xp = 0;
                gameState.level++;
            }
        }

        function triggerTaskFlow(type, targetId) {
            activeTask = {
                type: type,
                targetId: targetId,
                errors: 0,
                correctAnswer: null,
                questionText: ""
            };

            generateCurriculumQuestion('farm');

            document.getElementById("task-modal-title").innerText = 
                type === "pest" ? "Tiêu Diệt Sâu Phá Hoại 🐛" :
                type === "unlock" ? "Mở Khóa Đất Mới 🌾" : 
                type === "disaster" ? "LÁ CHẮN BÃO AXIT 🛡️" : "Nhập Tri Thức Đổi Vật Phẩm 📚";
            
            document.getElementById("modal-task").classList.add("active");
            renderQuestHearts();
        }


        // ===== NPC QUEST CONTEXT HELPERS =====

        function showNpcBanner(ctx) {
            const banner = document.getElementById('quest-npc-banner');
            if (!banner) return;
            if (!ctx || (activeTask && activeTask.type === "boss")) { banner.style.display = 'none'; return; }

            const iconEl = document.getElementById('npc-icon-wrap');
            const nameEl = document.getElementById('npc-name-label');
            const storyEl = document.getElementById('npc-story-text');
            const taskEl = document.getElementById('npc-task-text');

            if (iconEl) iconEl.textContent = ctx.npc_icon || '🎭';
            if (nameEl) nameEl.textContent = ctx.npc || 'Người Hướng Dẫn';
            if (storyEl) storyEl.textContent = ctx.story || '';
            if (taskEl) taskEl.textContent = ctx.task || '';

            banner.style.display = 'flex';
        }

        function hideNpcBanner() {
            const banner = document.getElementById('quest-npc-banner');
            if (banner) banner.style.display = 'none';
        }

        function showNpcSuccess(ctx) {
            const popup = document.getElementById('quest-npc-success');
            if (!popup || !ctx) return;
            const iconEl = document.getElementById('npc-success-icon');
            const textEl = document.getElementById('npc-success-text');
            if (iconEl) iconEl.textContent = ctx.npc_icon || '🎉';
            if (textEl) textEl.textContent = ctx.success || 'Bé trả lời đúng rồi! Tuyệt vời!';
            const panel = document.getElementById('quest-answer-panel');
            if (panel) panel.style.opacity = '0.4';
            popup.style.display = 'block';
            playChime(988, 'triangle', 0.15);
        }

        function hideNpcSuccess() {
            const popup = document.getElementById('quest-npc-success');
            if (popup) popup.style.display = 'none';
            const panel = document.getElementById('quest-answer-panel');
            if (panel) panel.style.opacity = '';
        }

        function renderQuestHearts() {
            const container = document.getElementById("quest-hearts-container");
            if (!container) return;
            container.innerHTML = "";
            const MAX_ERRORS = 3;
            const remainingHearts = MAX_ERRORS - (activeTask ? activeTask.errors : 0);
            for (let i = 1; i <= MAX_ERRORS; i++) {
                if (i <= remainingHearts) {
                    container.innerHTML += `<i class="fa-solid fa-heart" style="color: #ef4444; margin: 0 3px; font-size: 1.1em;"></i>`;
                } else {
                    container.innerHTML += `<i class="fa-regular fa-heart" style="color: rgba(255,255,255,0.2); margin: 0 3px; font-size: 1.1em;"></i>`;
                }
            }
        }

        function updateBossUI(currentHp, stage) {
            const bossArena = document.getElementById("boss-arena-container");
            if (!bossArena) return;
            
            bossArena.style.display = "block";
            const hpText = document.getElementById("boss-hp-text");
            const hpBar = document.getElementById("boss-hp-bar-fill");
            const stageText = document.getElementById("boss-stage-text");
            const bossName = document.getElementById("boss-name-text");
            const bossIcon = document.getElementById("boss-sprite-icon");

            const world = selectedWorld || "eco";
            const bossData = {
                eco: { name: "Sâu Róm Đột Biến 🐛", icon: '<i class="fa-solid fa-bug"></i>' },
                cyber: { name: "Robot Virus Mega 🤖", icon: '<i class="fa-solid fa-robot"></i>' },
                magic: { name: "Rồng Hắc Ám Cổ Đại 🐉", icon: '<i class="fa-solid fa-dragon"></i>' }
            }[world] || { name: "Sâu Róm Đột Biến 🐛", icon: '<i class="fa-solid fa-bug"></i>' };

            if (bossName) bossName.innerText = bossData.name;
            if (bossIcon) bossIcon.innerHTML = bossData.icon;
            if (stageText) stageText.innerText = stage || 1;
            if (hpText) hpText.innerText = `${Math.max(0, currentHp)}/100`;
            if (hpBar) {
                const pct = Math.max(0, Math.min(100, currentHp));
                hpBar.style.width = pct + "%";
                if (pct < 30) {
                    hpBar.style.background = "linear-gradient(90deg, #dc2626, #ef4444)";
                } else if (pct < 60) {
                    hpBar.style.background = "linear-gradient(90deg, #eab308, #f59e0b)";
                } else {
                    hpBar.style.background = "linear-gradient(90deg, #e11d48, #f43f5e)";
                }
            }
        }

        function triggerBossHitAnimation() {
            const bossIcon = document.getElementById("boss-sprite-icon");
            if (bossIcon) {
                bossIcon.style.transform = "scale(1.3) rotate(-12deg)";
                bossIcon.style.filter = "brightness(1.5) drop-shadow(0 0 25px #ef4444)";
                setTimeout(() => {
                    bossIcon.style.transform = "scale(1) rotate(0deg)";
                    bossIcon.style.filter = "none";
                }, 400);
            }
        }

        function closeTaskModal() {
            document.getElementById("modal-task").classList.remove("active");
            if (activeTask) {
                if (activeTask.timerInterval) {
                    clearInterval(activeTask.timerInterval);
                }
                if (activeTask.cleanup) {
                    activeTask.cleanup();
                }
            }
            hideNpcBanner();
            hideNpcSuccess();
            const bossArena = document.getElementById("boss-arena-container");
            if (bossArena) bossArena.style.display = "none";
            const hintContainer = document.getElementById("quest-hint-container");
            if (hintContainer) hintContainer.style.display = "none";
            const expContainer = document.getElementById("quest-explanation-container");
            if (expContainer) expContainer.style.display = "none";
            const answerPanel = document.getElementById("quest-answer-panel");
            if (answerPanel) answerPanel.style.display = "block";

            const questLayout = document.querySelector(".quest-layout");
            if (questLayout) questLayout.style.display = "";
            const qText = document.getElementById("quest-text");
            if (qText) qText.style.display = "";
            const qBadge = document.getElementById("quest-lo-badge");
            if (qBadge) qBadge.style.display = "";
            const qHearts = document.getElementById("quest-hearts-container");
            if (qHearts) qHearts.style.display = "";
            activeTask = null;
        }

        function verifyChoiceAnswer(userAnswer) {
            if (String(userAnswer).trim().toLowerCase() === String(activeTask.correctAnswer).trim().toLowerCase()) {
                playChime(784, 'triangle', 0.2);
                if (typeof dqOnStreakResult === 'function') dqOnStreakResult(true);

                // Tiến trình ấp thú cưng
                if (typeof progressEgg === 'function') progressEgg();
                
                // Daily Quest: trả lời đúng
                const taskSubject = activeTask ? activeTask.subject : null;
                if (typeof dqOnCorrectAnswer === 'function') dqOnCorrectAnswer(taskSubject);
                
                // Perfect quest (không sai lần nào)
                if (activeTask && activeTask.errors === 0) {
                    if (typeof dqOnPerfectQuest === 'function') dqOnPerfectQuest();
                }
                
                if (activeTask.type === "pest") {
                    const plot = gameState.plots[activeTask.targetId];
                    if (plot) {
                        plot.pest = false;
                        plot.errorCount = 0;
                    }
                    if (typeof dqOnPestClear === 'function') dqOnPestClear();
                    showToast("Bé đã tiêu diệt sâu thành công!", 2500);
                } else if (activeTask.type === "unlock") {
                    const idx = activeTask.targetId;
                    if (gameState.plots[idx]) gameState.plots[idx].status = "empty";
                    showToast("Đã mở khóa ô đất mới!", 2500);
                } else if (activeTask.type === "disaster") {
                    gameState.weather = "sunny";
                    updateWeatherUI();
                    showToast("Lá chắn kích hoạt! Đã bảo vệ nông trại thành công!", 3000);
                } else if (activeTask.type === "farm") {
                    const rewardItem = activeTask.targetId;
                    if (rewardItem === "water") {
                        gameState.inventory.water += 3;
                        showToast("Được cộng 3 bình nước!", 2500);
                    } else if (rewardItem && rewardItem.startsWith("s")) {
                        gameState.inventory[rewardItem] = (gameState.inventory[rewardItem] || 0) + 1;
                        const sData = (typeof getSeedConfig === 'function' && getSeedConfig()) ? getSeedConfig()[rewardItem] : null;
                        showToast(`Nhận được 1 hạt giống ${sData ? sData.name : ''}!`, 2500);
                    }
                }
                
                saveDataForMode();
                updateHeaderStats();
                renderPlots();
                renderInventory();

                activeTask.isFailed = false;

                hideNpcBanner();
                const questLayout = document.querySelector(".quest-layout");
                if (questLayout) questLayout.style.display = "none";

                const ctx = activeTask ? activeTask.ctx : null;
                const icon = (ctx && ctx.npc_icon) ? ctx.npc_icon : "👩‍🏫";
                const msg = (ctx && ctx.success) ? ctx.success : "Bé đã trả lời rất xuất sắc!";
                const exp = (activeTask && activeTask.explanation) ? activeTask.explanation : "";

                // Kiểm tra xem có giải thích thực tế hữu ích từ ngân hàng câu hỏi hay không
                let hasRealExplanation = false;
                if (exp && exp.trim() !== "") {
                    const cleanExp = exp.trim().toLowerCase();
                    // Loại bỏ các câu giải thích mặc định tự sinh
                    if (!cleanExp.startsWith("đáp án đúng là") && !cleanExp.includes("đáp án đúng là:")) {
                        hasRealExplanation = true;
                    }
                }

                if (hasRealExplanation) {
                    const expContainer = document.getElementById("quest-explanation-container");
                    if (expContainer) {
                        expContainer.className = "w-full max-w-md mx-auto my-4";
                        expContainer.innerHTML = `
                            <div class="text-center p-6 bg-slate-800/95 rounded-2xl border-2 border-emerald-500/50 shadow-2xl">
                                <div class="text-6xl mb-3 animate-bounce">${icon}</div>
                                <h3 class="text-2xl text-emerald-400 font-black mb-2 tracking-wide">CHÍNH XÁC! 🎉</h3>
                                <p class="text-white text-base mb-4 leading-relaxed font-semibold">${msg}</p>
                                <div class="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700 mb-5 text-left text-xs text-slate-300">💡 <b>Ghi nhớ kiến thức:</b> ${exp}</div>
                                <button class="btn-primary w-full py-3 font-bold text-base flex items-center justify-center gap-2 shadow-lg" onclick="continueAfterExplanation()">
                                    TIẾP TỤC <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        `;
                        expContainer.style.display = "block";
                    } else {
                        continueAfterExplanation();
                    }
                } else {
                    // Không có giải thích thực tế -> bỏ qua bước trung gian này để đỡ mất 1 thao tác click của bé
                    continueAfterExplanation();
                }
            } else {
                handleQuestError();
            }
        }
        window.verifyChoiceAnswer = verifyChoiceAnswer;
        function verifyQuestAnswer(userAnswer) { return verifyChoiceAnswer(userAnswer); }
        window.verifyQuestAnswer = verifyQuestAnswer;
        
        function handleQuestError() {
            if (activeTask && (activeTask.type === "map" || activeTask.type === "boss")) {
                handleMapQuestFailure();
                return;
            }
            if (activeTask && (activeTask.type === "map" || activeTask.type === "boss")) {
                handleMapQuestFailure();
                return;
            }
            if (activeTask.type === "boss") {
                bossPenalty();
                return;
            }

            activeTask.errors++;
            playChime(150, 'sawtooth', 0.3);
            if (typeof dqOnStreakResult === 'function') dqOnStreakResult(false); // Daily Quest: sai - reset streak
            
            // Reset tiến trình ấp trứng
            if (typeof gameState !== 'undefined') {
                gameState.eggProgress = 0;
                if (typeof renderHatchingEgg === 'function') renderHatchingEgg();
            }

            renderQuestHearts();

            // Hiển thị gợi ý dựa vào số lần sai (chỉ lần 1, 2 — lần 3 sẽ thất bại ngay)
            const hintContainer = document.getElementById("quest-hint-container");
            const hintText = document.getElementById("hint-text");
            const hintLevelText = document.getElementById("hint-level-text");
            if (activeTask.hints && activeTask.errors <= 2) {
                if (hintLevelText) hintLevelText.innerText = activeTask.errors;
                if (hintText) hintText.innerText = activeTask.hints[activeTask.errors - 1];
                if (hintContainer) hintContainer.style.display = "block";
            }

            // NPC phản hồi khi sai (toast nhỏ, không chặn UI)
            const errCtx = activeTask ? activeTask.ctx : null;
            if (errCtx && errCtx.fail) {
                showToast((errCtx.npc_icon || '❗') + ' ' + errCtx.fail, 2200);
            }

            if (activeTask.errors >= 3) {
                const expContainer = document.getElementById("quest-explanation-container");
                const expText = document.getElementById("explanation-text");
                const answerPanel = document.getElementById("quest-answer-panel");
                if (answerPanel) answerPanel.style.display = "none";
                if (hintContainer) hintContainer.style.display = "none";

                activeTask.isFailed = true;
                
                if (expContainer && expText && activeTask.explanation) {
                    expText.innerHTML = `<strong>💔 Hết tim rồi! Bé đã trả lời sai 3 lần.</strong><br><br>` + activeTask.explanation;
                    expContainer.style.display = "block";
                } else {
                    continueAfterExplanation();
                }
            }
        }

        function continueAfterExplanation() {
            if (activeTask.isFailed) {
                if (activeTask.type === "pest") {
                    const plot = gameState.plots[activeTask.targetId];
                    plot.status = "withered";
                    plot.seed = null;
                    plot.prog = 0;
                    plot.pest = false;
                    plot.errorCount = 0;
                } else if (activeTask.type === "disaster") {
                    // Thất bại bão axit -> Tất cả cây đang phát triển bị giảm tiến độ hoặc chết
                    gameState.plots.forEach(p => {
                        if (p.status === "planted" && p.prog < 100) {
                            p.status = "withered";
                            p.seed = null;
                            p.prog = 0;
                        }
                    });
                    gameState.weather = "sunny";
                    updateWeatherUI();
                    alertBox("Thảm họa axit tràn qua! Do không thể dựng lá chắn kịp thời, toàn bộ cây non đã bị chết héo.");
                }
                
                if (activeTask.type !== "disaster") {
                    alertBox("💔 Bé đã sai 3 lần liên tiếp. Cố gắng hơn ở lần sau nhé!");
                }
                saveDataForMode();
                renderPlots();
                closeTaskModal();
                updateGuide();
            } else {
                closeTaskModal();
                updateGuide();
            }
        }
        window.continueAfterExplanation = continueAfterExplanation;

        function buildPlotSVG(plot) {
            let svgStr = "";
            
            // 1. Vẽ mô đất hoặc cổng liên kết tương ứng với từng Thế Giới
            if (selectedWorld === "eco") {
                // Đất nông nghiệp hoạt hình
                const mainSoil = plot.water ? "#3E2723" : "#7A431D";
                const topSoil = plot.water ? "#4E342E" : "#8B4F24";
                svgStr += `<ellipse cx="70" cy="84" rx="55" ry="16" fill="${mainSoil}"/>`;
                svgStr += `<ellipse cx="70" cy="81" rx="50" ry="12" fill="${topSoil}"/>`;
                // Cụm cỏ xanh sinh thái
                svgStr += `
                    <path d="M22 80 Q18 68 26 72 Q20 78 22 80 Z" fill="#22c55e"/>
                    <path d="M118 80 Q122 68 114 72 Q120 78 118 80 Z" fill="#22c55e"/>
                `;
            } else if (selectedWorld === "cyber") {
                // Đế vi mạch hoặc cổng sạc pin công nghệ tương ứng
                const glowColor = plot.water ? "#06b6d4" : "#475569";
                const borderGlow = plot.water ? "#22d3ee" : "#334155";
                svgStr += `<rect x="18" y="70" width="104" height="20" rx="6" fill="#1e293b" stroke="${glowColor}" stroke-width="2.5"/>`;
                svgStr += `<rect x="24" y="74" width="92" height="12" rx="4" fill="#0f172a"/>`;
                // Đèn LED chỉ thị năng lượng
                svgStr += `
                    <circle cx="34" cy="80" r="2" fill="${borderGlow}"/>
                    <circle cx="106" cy="80" r="2" fill="${borderGlow}"/>
                    <path d="M10 80 H18 M122 80 H130" stroke="${glowColor}" stroke-width="2" stroke-linecap="round"/>
                `;
            } else {
                // Bệ ngọc/Đất ma thuật lấp lánh bụi tinh vân
                const mainMag = plot.water ? "#4a044e" : "#2e1065";
                const topMag = plot.water ? "#701a75" : "#4c1d95";
                const starColor = plot.water ? "#fdf4ff" : "#a21caf";
                svgStr += `<ellipse cx="70" cy="84" rx="55" ry="16" fill="${mainMag}"/>`;
                svgStr += `<ellipse cx="70" cy="81" rx="50" ry="12" fill="${topMag}"/>`;
                // Tinh thể sao lấp lánh bay lên
                svgStr += `
                    <polygon points="26,73 28,76 31,77 28,78 26,81 24,78 21,77 24,76" fill="${starColor}"/>
                    <polygon points="114,73 116,76 119,77 116,78 114,81 112,78 109,77 112,76" fill="${starColor}"/>
                `;
            }

            if (plot.status === "locked") {
                // 2. Ô đất bị khóa: Khóa vàng hoạt hình cực xinh xắn
                svgStr += `
                    <!-- Còng khóa vàng -->
                    <path d="M60 48 V36 C60 28 80 28 80 36 V48" fill="none" stroke="#fbbf24" stroke-width="4.5" stroke-linecap="round"/>
                    <!-- Thân khóa -->
                    <rect x="52" y="44" width="36" height="26" rx="6" fill="#d97706" stroke="#fbbf24" stroke-width="2.5"/>
                    <!-- Lỗ khóa -->
                    <circle cx="70" cy="54" r="3" fill="#3e2723"/>
                    <polygon points="69,54 71,54 72,62 68,62" fill="#3e2723"/>
                `;
            } else if (plot.status === "withered") {
                // 3. Cây héo: Khuôn mặt đáng thương buồn bã
                svgStr += `
                    <!-- Thân héo rủ -->
                    <path d="M70 80 Q62 60 48 52" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
                    <!-- Lá rủ -->
                    <path d="M61 67 Q48 70 44 65" fill="#475569"/>
                    <path d="M52 55 Q40 50 36 54" fill="#475569"/>
                    <!-- Bông hoa héo rủ -->
                    <circle cx="48" cy="52" r="8" fill="#334155" stroke="#475569" stroke-width="1.5"/>
                    <!-- Mặt buồn (mắt nhắm, miệng méo) -->
                    <path d="M44 50 Q46 52 46 50 M52 50 Q50 52 50 50" fill="none" stroke="#94a3b8" stroke-width="1" stroke-linecap="round"/>
                    <path d="M46 54 Q48 52 50 54" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
                `;
            } else if (plot.status === "planted") {
                const prog = plot.prog;

                if (prog < 35) {
                    // 4. Mầm non bé bỏng (Sprout): Bé mầm có đôi mắt tròn xòe dễ thương, vẽ phù hợp theo từng thế giới
                    if (selectedWorld === "cyber") {
                        // Mầm công nghệ dạng sợi cáp phát quang xanh
                        svgStr += `
                            <path d="M70 80 V58" fill="none" stroke="#06b6d4" stroke-width="4.5" stroke-linecap="round"/>
                            <circle cx="70" cy="58" r="3" fill="#22d3ee"/>
                            <path d="M70 65 Q58 60 62 56" fill="none" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
                            <path d="M70 65 Q82 60 78 56" fill="none" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
                        `;
                    } else if (selectedWorld === "magic") {
                        // Mầm phép thuật dạng chồi tím rực rỡ
                        svgStr += `
                            <path d="M70 80 Q70 65 72 58" fill="none" stroke="#d946ef" stroke-width="4.5" stroke-linecap="round"/>
                            <path d="M72 58 Q55 52 58 56 Z" fill="#f472b6"/>
                            <path d="M72 58 Q85 52 82 56 Z" fill="#f472b6"/>
                            <circle cx="68" cy="65" r="1.5" fill="#fff"/>
                            <circle cx="74" cy="65" r="1.5" fill="#fff"/>
                        `;
                    } else {
                        // Mầm xanh hữu cơ cơ bản
                        svgStr += `
                            <path d="M70 80 Q70 65 72 58" fill="none" stroke="#22c55e" stroke-width="4.5" stroke-linecap="round"/>
                            <path d="M72 58 Q55 52 58 56 Z" fill="#4ade80"/>
                            <path d="M72 58 Q85 52 82 56 Z" fill="#4ade80"/>
                            <circle cx="68" cy="65" r="1.5" fill="#000"/>
                            <circle cx="74" cy="65" r="1.5" fill="#000"/>
                            <path d="M70 67 Q71 68 72 67" fill="none" stroke="#000" stroke-width="0.8" stroke-linecap="round"/>
                        `;
                    }
                } else if (prog < 75) {
                    // 5. Cây đang lớn (Growing): Đang lớn dần theo đặc trưng từng thế giới
                    if (selectedWorld === "cyber") {
                        // Cây công nghệ lớn trung hạn
                        svgStr += `
                            <path d="M70 80 V48" fill="none" stroke="#0891b2" stroke-width="5" stroke-linecap="round"/>
                            <path d="M70 64 H52 V58" fill="none" stroke="#0891b2" stroke-width="3" stroke-linecap="round"/>
                            <path d="M70 56 H88 V50" fill="none" stroke="#0891b2" stroke-width="3" stroke-linecap="round"/>
                            <rect x="46" y="52" width="12" height="12" rx="2" fill="#22d3ee"/>
                            <rect x="82" y="44" width="12" height="12" rx="2" fill="#22d3ee"/>
                        `;
                    } else if (selectedWorld === "magic") {
                        // Cây ma thuật lớn trung hạn
                        svgStr += `
                            <path d="M70 80 Q68 55 72 45" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
                            <path d="M70 65 Q50 55 48 58" fill="none" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>
                            <path d="M48 58 Q42 46 54 48 Z" fill="#d946ef"/>
                            <path d="M70 58 Q88 48 90 52" fill="none" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>
                            <path d="M90 52 Q98 42 86 44 Z" fill="#d946ef"/>
                            <circle cx="72" cy="40" r="7" fill="#f472b6"/>
                        `;
                    } else {
                        // Cây trồng hữu cơ lớn trung hạn
                        svgStr += `
                            <path d="M70 80 Q68 55 72 45" fill="none" stroke="#15803d" stroke-width="5" stroke-linecap="round"/>
                            <path d="M70 65 Q50 55 48 58" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
                            <path d="M48 58 Q42 46 54 48 Z" fill="#22c55e"/>
                            <path d="M70 58 Q88 48 90 52" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
                            <path d="M90 52 Q98 42 86 44 Z" fill="#22c55e"/>
                            <circle cx="72" cy="40" r="6" fill="#fb7185"/>
                            <circle cx="72" cy="40" r="3" fill="#fecdd3"/>
                            <circle cx="68" cy="53" r="2" fill="#000"/>
                            <circle cx="76" cy="53" r="2" fill="#000"/>
                            <circle cx="65" cy="55" r="1.2" fill="#f43f5e" opacity="0.6"/>
                            <circle cx="79" cy="55" r="1.2" fill="#f43f5e" opacity="0.6"/>
                            <path d="M71 56 Q72 58 73 56" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round"/>
                        `;
                    }
                } else {
                    // 6. Cây chín muồi (Mature): Biến đổi hoạt hình rực rỡ theo từng thế giới
                    if (selectedWorld === "eco") {
                        // --- ĐẢO SINH THÁI ---
                        if (plot.seed === "s1") {
                            // Cải Ngọt (🥬) béo tròn đáng yêu
                            svgStr += `
                                <path d="M55 75 C45 60 55 35 70 30 C85 35 95 60 85 75 Z" fill="#86efac"/>
                                <path d="M60 75 C52 65 60 42 70 38 C80 42 88 65 80 75 Z" fill="#4ade80"/>
                                <path d="M65 75 C60 70 65 50 70 47 C75 50 80 70 75 75 Z" fill="#22c55e"/>
                                <path d="M70 78 V55" fill="none" stroke="#f0fdf4" stroke-width="3" stroke-linecap="round"/>
                                <path d="M70 78 Q64 68 62 60" fill="none" stroke="#f0fdf4" stroke-width="2" stroke-linecap="round"/>
                                <path d="M70 78 Q76 68 78 60" fill="none" stroke="#f0fdf4" stroke-width="2" stroke-linecap="round"/>
                                <!-- Mặt cute bé cải ngọt -->
                                <circle cx="65" cy="55" r="2.5" fill="#0f172a"/>
                                <circle cx="75" cy="55" r="2.5" fill="#0f172a"/>
                                <circle cx="61" cy="58" r="2" fill="#fb7185" opacity="0.6"/>
                                <circle cx="79" cy="58" r="2" fill="#fb7185" opacity="0.6"/>
                                <path d="M68 59 Q70 61 72 59" fill="none" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round"/>
                            `;
                        } else if (plot.seed === "s2") {
                            // Cà Tomato (🍅) đỏ mọng má hồng cực yêu
                            svgStr += `
                                <path d="M70 80 Q68 50 70 30" fill="none" stroke="#15803d" stroke-width="6" stroke-linecap="round"/>
                                <circle cx="70" cy="50" r="22" fill="#ef4444"/>
                                <ellipse cx="64" cy="40" rx="6" ry="3" fill="#ff8585" opacity="0.6"/>
                                <!-- Núm quả cà chua -->
                                <path d="M70 28 L70 20" fill="none" stroke="#15803d" stroke-width="3"/>
                                <path d="M70 28 Q78 24 82 28 C74 30 70 28 70 28 Z" fill="#22c55e"/>
                                <path d="M70 28 Q62 24 58 28 C66 30 70 28 70 28 Z" fill="#22c55e"/>
                                <!-- Mặt đáng yêu bé cà chua -->
                                <circle cx="63" cy="48" r="2.5" fill="#fff"/>
                                <circle cx="77" cy="48" r="2.5" fill="#fff"/>
                                <circle cx="63" cy="48" r="1.5" fill="#000"/>
                                <circle cx="77" cy="48" r="1.5" fill="#000"/>
                                <circle cx="58" cy="52" r="2.5" fill="#f43f5e"/>
                                <circle cx="82" cy="52" r="2.5" fill="#f43f5e"/>
                                <path d="M67 52 Q70 56 73 52" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/>
                            `;
                        } else {
                            // Dưa Hấu (🍉) tròn sọc dưa ngộ nghĩnh
                            svgStr += `
                                <path d="M70 80 Q68 50 70 30" fill="none" stroke="#15803d" stroke-width="6" stroke-linecap="round"/>
                                <ellipse cx="70" cy="50" rx="26" ry="22" fill="#22c55e"/>
                                <path d="M52 38 Q65 42 62 70" fill="none" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/>
                                <path d="M70 28 Q73 50 70 72" fill="none" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/>
                                <path d="M88 38 Q75 42 78 70" fill="none" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/>
                                <path d="M70 28 Q75 18 80 20" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round"/>
                                <!-- Khuôn mặt bé dưa hấu -->
                                <circle cx="61" cy="46" r="3" fill="#000"/>
                                <circle cx="60" cy="45" r="1" fill="#fff"/>
                                <circle cx="79" cy="46" r="3" fill="#000"/>
                                <circle cx="78" cy="45" r="1" fill="#fff"/>
                                <circle cx="56" cy="51" r="2" fill="#ff4d4d"/>
                                <circle cx="84" cy="51" r="2" fill="#ff4d4d"/>
                                <path d="M67 52 Q70 57 73 52" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round"/>
                            `;
                        }
                    } else if (selectedWorld === "cyber") {
                        // --- TRẠM CÔNG NGHỆ (CYBER) ---
                        if (plot.seed === "s1") {
                            // Pin Mini (🔋) năng lượng số cute
                            svgStr += `
                                <rect x="52" y="28" width="36" height="42" rx="6" fill="#0f172a" stroke="#06b6d4" stroke-width="3"/>
                                <rect x="62" y="22" width="16" height="6" rx="2" fill="#06b6d4"/>
                                <rect x="58" y="34" width="24" height="8" rx="2" fill="#22d3ee"/>
                                <rect x="58" y="44" width="24" height="8" rx="2" fill="#06b6d4"/>
                                <rect x="58" y="54" width="24" height="8" rx="2" fill="#0891b2" opacity="0.5"/>
                                <!-- Mắt điện tử kiểu ^_^ -->
                                <path d="M60 40 L64 36 L60 32" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M80 40 L76 36 L80 32" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <!-- Tia lửa điện nhỏ -->
                                <path d="M44 40 L40 42" stroke="#22d3ee" stroke-width="2" stroke-linecap="round"/>
                                <path d="M96 40 L100 42" stroke="#22d3ee" stroke-width="2" stroke-linecap="round"/>
                            `;
                        } else if (plot.seed === "s2") {
                            // Led Module (💡) phát sáng huyền ảo
                            svgStr += `
                                <circle cx="70" cy="45" r="22" fill="#38bdf8" opacity="0.15"/>
                                <path d="M70 23 C58 23 52 32 52 45 C52 53 58 56 60 62 L80 62 C82 56 88 53 88 45 C88 32 82 23 70 23 Z" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2.5"/>
                                <rect x="62" y="62" width="16" height="6" fill="#64748b"/>
                                <rect x="65" y="68" width="10" height="4" fill="#475569"/>
                                <path d="M64 45 L68 38 L72 38 L76 45" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                                <!-- Mắt cười ngủ -->
                                <path d="M60 48 Q64 44 64 48" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M76 48 Q76 44 80 48" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                            `;
                        } else {
                            // Chip AI (🌌) vi mạch lấp lánh neon
                            svgStr += `
                                <path d="M70 20 V80 M30 50 H110" stroke="#a855f7" stroke-width="1.5" opacity="0.4"/>
                                <rect x="46" y="28" width="48" height="44" rx="6" fill="#1e1b4b" stroke="#a855f7" stroke-width="3"/>
                                <rect x="52" y="22" width="6" height="6" fill="#a855f7"/><rect x="66" y="22" width="6" height="6" fill="#a855f7"/><rect x="80" y="22" width="6" height="6" fill="#a855f7"/>
                                <rect x="52" y="72" width="6" height="6" fill="#a855f7"/><rect x="66" y="72" width="6" height="6" fill="#a855f7"/><rect x="80" y="72" width="6" height="6" fill="#a855f7"/>
                                <circle cx="70" cy="50" r="12" fill="#c084fc" opacity="0.3"/>
                                <rect x="64" y="44" width="12" height="12" rx="2" fill="#d8b4fe"/>
                                <!-- Mặt chip mini -->
                                <circle cx="67" cy="49" r="1" fill="#1e1b4b"/>
                                <circle cx="73" cy="49" r="1" fill="#1e1b4b"/>
                                <path d="M69 51 Q70 52 71 51" fill="none" stroke="#1e1b4b" stroke-width="0.8" stroke-linecap="round"/>
                            `;
                        }
                    } else if (selectedWorld === "magic") {
                        // --- KHU RỪNG PHÉP THUẬT (MAGIC) ---
                        if (plot.seed === "s1") {
                            // Hoa Tiên (🌸) lung linh phấn hồng có cánh tiên
                            svgStr += `
                                <path d="M70 42 C50 20 40 45 70 50 Z" fill="#fbcfe8" opacity="0.5"/>
                                <path d="M70 42 C90 20 100 45 70 50 Z" fill="#fbcfe8" opacity="0.5"/>
                                <circle cx="70" cy="30" r="12" fill="#f43f5e" opacity="0.85"/>
                                <circle cx="52" cy="45" r="12" fill="#f43f5e" opacity="0.85"/>
                                <circle cx="88" cy="45" r="12" fill="#f43f5e" opacity="0.85"/>
                                <circle cx="58" cy="62" r="12" fill="#f43f5e" opacity="0.85"/>
                                <circle cx="82" cy="62" r="12" fill="#f43f5e" opacity="0.85"/>
                                <circle cx="70" cy="48" r="10" fill="#fbbf24"/>
                                <!-- Mặt cute nhắm mắt ngủ -->
                                <circle cx="66" cy="46" r="1.5" fill="#000"/>
                                <circle cx="74" cy="46" r="1.5" fill="#000"/>
                                <path d="M69 49 Q70 50 71 49" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round"/>
                                <polygon points="45,25 47,29 51,30 47,31 45,35 43,31 39,30 43,29" fill="#fff"/>
                            `;
                        } else if (plot.seed === "s2") {
                            // Nấm Sáng (🍄) xinh xắn ngộ nghĩnh
                            svgStr += `
                                <path d="M70 80 C62 80 60 55 60 55 H80 C80 55 78 80 70 80 Z" fill="#fef08a"/>
                                <path d="M42 55 C42 30 98 30 98 55 C90 58 50 58 42 55 Z" fill="#ef4444"/>
                                <circle cx="54" cy="42" r="4.5" fill="#fff"/>
                                <circle cx="70" cy="36" r="5" fill="#fff"/>
                                <circle cx="86" cy="42" r="4.5" fill="#fff"/>
                                <!-- Mặt cười đáng yêu thân nấm -->
                                <circle cx="66" cy="62" r="1.8" fill="#000"/>
                                <circle cx="74" cy="62" r="1.8" fill="#000"/>
                                <circle cx="63" cy="64" r="1" fill="#f43f5e"/>
                                <circle cx="77" cy="64" r="1" fill="#f43f5e"/>
                                <path d="M68 66 Q70 68 72 66" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round"/>
                            `;
                        } else {
                            // Tim Thần (🔮) trái tim pha lê ma thuật lấp lánh
                            svgStr += `
                                <circle cx="70" cy="46" r="26" fill="#d946ef" opacity="0.12"/>
                                <path d="M52 75 L88 75 L80 65 L60 65 Z" fill="#475569" stroke="#64748b" stroke-width="2"/>
                                <path d="M70 60 L60 48 C52 40 64 30 70 40 C76 30 88 40 80 48 Z" fill="#d946ef" stroke="#f472b6" stroke-width="2.5"/>
                                <path d="M70 43 L76 43 L70 54 Z" fill="#fdf4ff" opacity="0.6"/>
                                <circle cx="66" cy="46" r="1.5" fill="#fff"/>
                                <circle cx="74" cy="46" r="1.5" fill="#fff"/>
                                <path d="M68 49 Q70 51 72 49" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
                            `;
                        }
                    }
                }

                if (plot.pest) {
                    // 7. Sâu hại: Chú sâu xanh wiggling mũm mĩm cười ngốc nghếch
                    svgStr += `
                        <circle cx="44" cy="48" r="4.5" fill="#a3e635" stroke="#4d7c0f" stroke-width="1"/>
                        <circle cx="51" cy="45" r="5" fill="#84cc16" stroke="#4d7c0f" stroke-width="1"/>
                        <circle cx="58" cy="48" r="4.5" fill="#65a30d" stroke="#4d7c0f" stroke-width="1"/>
                        <circle cx="64" cy="44" r="4.5" fill="#4d7c0f" stroke="#3f6212" stroke-width="1"/>
                        <circle cx="64" cy="43" r="1" fill="#fff"/>
                        <circle cx="66" cy="43" r="1" fill="#fff"/>
                        <circle cx="64" cy="43" r="0.5" fill="#000"/>
                        <circle cx="66" cy="43" r="0.5" fill="#000"/>
                        <path d="M64 45 Q65 46 66 45" fill="none" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
                        <path d="M63 40 Q61 37 59 38" fill="none" stroke="#4d7c0f" stroke-width="1"/>
                        <path d="M65 40 Q67 37 69 38" fill="none" stroke="#4d7c0f" stroke-width="1"/>
                    `;
                }
            }

            return svgStr;
        }


        // =====================================================
        // HE THONG NHIEM VU HANG NGAY (DAILY QUEST SYSTEM)
        // =====================================================

        // Pool 12 loại nhiệm vụ
        const DAILY_QUEST_POOL = [
            // --- Nhóm CHÍNH XÁC ---
            {
                id: 'streak_3', icon: '⚡', title: 'Chuỗi Thần Sấm',
                desc: 'Trả lời đúng 3 câu liên tiếp không sai',
                difficulty: 'medium', target: 3, group: 'accuracy',
                reward: { coins: 70, xp: 15 }
            },
            {
                id: 'streak_5', icon: '🌟', title: 'Siêu Sao Tri Thức',
                desc: 'Trả lời đúng 5 câu liên tiếp không sai',
                difficulty: 'hard', target: 5, group: 'accuracy',
                reward: { coins: 120, xp: 30, seeds: 1 }
            },
            {
                id: 'no_error', icon: '✨', title: 'Hoàn Hảo Tuyệt Đối',
                desc: 'Hoàn thành 1 bài tập không mất tim nào',
                difficulty: 'hard', target: 1, group: 'accuracy',
                reward: { coins: 100, xp: 25 }
            },
            // --- Nhóm TỐC ĐỘ ---
            {
                id: 'speed_3in30', icon: '⏱', title: 'Thần Tốc',
                desc: 'Trả lời đúng 3 câu trong vòng 30 giây',
                difficulty: 'hard', target: 3, group: 'speed',
                reward: { coins: 120, xp: 20 }
            },
            {
                id: 'answer_10', icon: '📚', title: 'Học Trò Chăm Chỉ',
                desc: 'Trả lời đúng tổng cộng 10 câu hỏi',
                difficulty: 'easy', target: 10, group: 'speed',
                reward: { coins: 40 }
            },
            // --- Nhóm NÔNG TRẠI ---
            {
                id: 'harvest_4', icon: '🌾', title: 'Mùa Bội Thu',
                desc: 'Thu hoạch 4 ô đất trong ngày',
                difficulty: 'medium', target: 4, group: 'farm',
                reward: { coins: 70, xp: 10 }
            },
            {
                id: 'harvest_2', icon: '🌿', title: 'Nông Dân Nhỏ',
                desc: 'Thu hoạch 2 ô đất trong ngày',
                difficulty: 'easy', target: 2, group: 'farm',
                reward: { coins: 40 }
            },
            {
                id: 'water_5', icon: '💧', title: 'Nông Dân Tận Tâm',
                desc: 'Tưới nước cho cây 5 lần',
                difficulty: 'easy', target: 5, group: 'farm',
                reward: { coins: 40 }
            },
            {
                id: 'sell_150', icon: '🏪', title: 'Thương Nhân Nhỏ',
                desc: 'Bán nông sản thu được 150 xu trong ngày',
                difficulty: 'medium', target: 150, group: 'farm',
                reward: { coins: 80, xp: 15 }
            },
            // --- Nhóm COMBO / THÁCH THỨC ---
            {
                id: 'combo_cycle', icon: '🔄', title: 'Hoàn Hảo Chu Kỳ',
                desc: 'Gieo → Tưới → Thu hoạch hoàn chỉnh 1 ô đất',
                difficulty: 'medium', target: 1, group: 'combo',
                reward: { coins: 80, xp: 20 }
            },
            {
                id: 'multi_subject', icon: '📖', title: 'Đa Tài Đa Năng',
                desc: 'Hoàn thành bài tập thuộc 2 môn khác nhau',
                difficulty: 'medium', target: 2, group: 'combo',
                reward: { coins: 70, xp: 15 }
            },
            {
                id: 'boss_win', icon: '🗡', title: 'Diệt Trùm',
                desc: 'Chiến thắng trận Đấu Trường Boss',
                difficulty: 'hard', target: 1, group: 'combo',
                reward: { coins: 130, xp: 35, seeds: 1 }
            },
            // --- Nhóm ARENA (liên kết đấu trường) ---
            {
                id: 'arena_attack_3', icon: '⚔️', title: 'Chiến Binh Can Trường',
                desc: 'Tấn công Boss 3 lần (đúng hoặc sai)',
                difficulty: 'easy', target: 3, group: 'arena',
                reward: { coins: 60, xp: 15 }
            },
            {
                id: 'arena_win_2', icon: '🏆', title: 'Vô Địch Đấu Trường',
                desc: 'Chiến thắng Boss 2 lần trong ngày',
                difficulty: 'hard', target: 2, group: 'arena',
                reward: { coins: 200, xp: 50, seeds: 1 }
            },
            {
                id: 'arena_nohit', icon: '🛡️', title: 'Chiến Biệt Động',
                desc: 'Thắng Boss mà không bị phạt giờ lần nào',
                difficulty: 'hard', target: 1, group: 'arena',
                reward: { coins: 180, xp: 45 }
            },
            // --- Nhóm PET (ấp trứng) ---
            {
                id: 'pet_progress_2', icon: '🥚', title: 'Bảo Vệ Trứng',
                desc: 'Làm tiến độ ấp trứng tăng ít nhất 2 bước',
                difficulty: 'easy', target: 2, group: 'pet',
                reward: { coins: 50, xp: 10 }
            },
            {
                id: 'pet_answer_5', icon: '🐾', title: 'Tâm Hồn Thú Cưng',
                desc: 'Trả lời đúng 5 câu khi ấp trứng',
                difficulty: 'medium', target: 5, group: 'pet',
                reward: { coins: 80, xp: 20 }
            },
            // --- Nhóm MARKET (chợ & cửa hàng) ---
            {
                id: 'market_sell_3types', icon: '💰', title: 'Cửa Hàng Đa Dạng',
                desc: 'Bán ít nhất 3 loại nông sản khác nhau',
                difficulty: 'medium', target: 3, group: 'market',
                reward: { coins: 90, xp: 20 }
            },
            {
                id: 'market_earn_300', icon: '💳', title: 'Thương Nhân Tài Ba',
                desc: 'Kiếm 300 xu từ bán hàng trong ngày',
                difficulty: 'hard', target: 300, group: 'market',
                reward: { coins: 150, xp: 30 }
            },
            // --- Nhóm CHALLENGE (thách thức đặc biệt) ---
            {
                id: 'all_tabs_3', icon: '🧭', title: 'Nhà Thám Hiểm',
                desc: 'Ghé thăm 3 khu vực khác nhau trong ngày',
                difficulty: 'easy', target: 3, group: 'challenge',
                reward: { coins: 60, xp: 10 }
            },
            {
                id: 'perfect_boss', icon: '💫', title: 'Chiến Thần Bất Bại',
                desc: 'Thắng Boss mà không trả lời sai câu nào',
                difficulty: 'hard', target: 1, group: 'challenge',
                reward: { coins: 220, xp: 60, seeds: 2 }
            }
        ];

        // State nội bộ daily quest
        let dqState = null;
        let dqStreakCount = 0;        // đếm streak liên tiếp
        let dqSpeedStart = null;      // timestamp bắt đầu đếm speed
        let dqSpeedCount = 0;         // số câu đúng trong cửa sổ 30s
        let dqSubjectsDone = new Set(); // các môn đã làm xong
        let dqComboCurrent = null;    // 'planted'|'watered'|null - track cycle
        let dqComboPlotIdx = -1;      // ô đất đang theo dõi combo

        function getDailyKey() {
            return 'edufarm_daily_' + selectedGrade + '_' + selectedWorld;
        }

        function getTodayStr() {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
        }

        function pickDailyQuests() {
            const farmPool   = DAILY_QUEST_POOL.filter(q => q.group === 'farm');
            const learnPool  = DAILY_QUEST_POOL.filter(q => q.group === 'accuracy' || q.group === 'speed');
            const arenaPool  = DAILY_QUEST_POOL.filter(q => q.group === 'arena');

            const shuffled = arr => arr.slice().sort(() => Math.random() - 0.5);

            const picked = [];
            const usedIds = new Set();

            // 1 farm bắt buộc
            const farmQ = shuffled(farmPool)[0];
            picked.push(farmQ); usedIds.add(farmQ.id);

            // 1 học tập bắt buộc
            const learnQ = shuffled(learnPool)[0];
            picked.push(learnQ); usedIds.add(learnQ.id);

            // 1 arena bắt buộc (tăng tương tác đấu trường)
            const arenaQ = shuffled(arenaPool)[0];
            if (arenaQ) { picked.push(arenaQ); usedIds.add(arenaQ.id); }

            // 4 còn lại random từ toàn pool (không trùng)
            const rest = shuffled(DAILY_QUEST_POOL.filter(q => !usedIds.has(q.id)));
            for (let i = 0; i < 4 && i < rest.length; i++) {
                picked.push(rest[i]);
                usedIds.add(rest[i].id);
            }

            return picked.slice(0, 7);
        }

        function initDailyQuests() {
            const key = getDailyKey();
            const today = getTodayStr();
            let saved = null;
            try { saved = JSON.parse(localStorage.getItem(key)); } catch(e) {}

            if (saved && saved.date === today) {
                dqState = saved;
            } else {
                // Ngày mới → sinh 5 nhiệm vụ mới
                const picked = pickDailyQuests();
                dqState = {
                    date: today,
                    quests: picked.map(q => ({
                        id: q.id,
                        progress: 0,
                        done: false,
                        claimed: false,
                        failed: false,
                        // speed extra
                        speedWindowStart: null,
                        speedCount: 0
                    }))
                };
                localStorage.setItem(key, JSON.stringify(dqState));
            }

            dqStreakCount = 0;
            dqSpeedStart = null;
            dqSpeedCount = 0;
            dqSubjectsDone = new Set();
            dqComboCurrent = null;
            dqComboPlotIdx = -1;

            renderDailyQuests();
            startDailyResetTimer();
        }

        function saveDailyQuests() {
            try { localStorage.setItem(getDailyKey(), JSON.stringify(dqState)); } catch(e) {}
        }

        function getQuestDef(id) {
            return DAILY_QUEST_POOL.find(q => q.id === id);
        }

        function renderDailyQuests() {
            const container = document.getElementById('daily-quest-list');
            if (!container || !dqState) return;
            container.innerHTML = '';

            dqState.quests.forEach((qs, idx) => {
                const def = getQuestDef(qs.id);
                if (!def) return;
                const pct = Math.min(100, Math.round((qs.progress / def.target) * 100));
                const isDone = qs.done;
                const isClaimed = qs.claimed;
                const isFailed = qs.failed;

                let cardClass = 'dq-card';
                if (isClaimed) cardClass += ' claimed';
                else if (isDone) cardClass += ' done';
                else if (isFailed) cardClass += ' failed';

                let footerRight = '';
                if (isClaimed) {
                    footerRight = '<span class="dq-claimed-tag">✅ Đã nhận</span>';
                } else if (isDone) {
                    footerRight = '<button class="dq-claim-btn" onclick="claimDailyReward(' + idx + ')">NHẬN THƯỞNG</button>';
                } else if (isFailed) {
                    footerRight = '<span class="dq-failed-tag">❌ Thất bại</span>';
                }

                // Build reward string
                const r = def.reward;
                let rewardStr = '';
                if (r.coins)  rewardStr += '<span class="dq-reward-tag">+' + r.coins + ' 🪙</span>';
                if (r.xp)     rewardStr += '<span class="dq-reward-tag">+' + r.xp + ' XP</span>';
                if (r.seeds)  rewardStr += '<span class="dq-reward-tag">+' + r.seeds + ' 🌱</span>';

                const countTxt = qs.id === 'sell_150'
                    ? qs.progress + '/' + def.target + '🪙'
                    : qs.progress + '/' + def.target;

                container.innerHTML += '<div class="' + cardClass + '">' +
                    '<div class="dq-top">' +
                    '<span class="dq-icon">' + def.icon + '</span>' +
                    '<div class="dq-info">' +
                    '<div class="dq-title">' + def.title + '</div>' +
                    '<div class="dq-desc">' + def.desc + '</div>' +
                    '</div>' +
                    '<span class="dq-badge ' + def.difficulty + '">' + (def.difficulty === 'easy' ? 'Dễ' : def.difficulty === 'medium' ? 'TB' : 'Khó') + '</span>' +
                    '</div>' +
                    '<div class="dq-prog-wrap">' +
                    '<div class="dq-bar-outer"><div class="dq-bar-inner" style="width:' + pct + '%"></div></div>' +
                    '<span class="dq-count">' + countTxt + '</span>' +
                    '</div>' +
                    '<div class="dq-footer">' +
                    '<div class="dq-reward">' + rewardStr + '</div>' +
                    footerRight +
                    '</div>' +
                    '</div>';
            });
        }

        function claimDailyReward(idx) {
            if (!dqState) return;
            const qs = dqState.quests[idx];
            if (!qs || !qs.done || qs.claimed) return;
            const def = getQuestDef(qs.id);
            if (!def) return;

            qs.claimed = true;
            const r = def.reward;
            if (r.coins) gameState.coins += r.coins;
            if (r.xp)    { gameState.xp += r.xp; }
            if (r.seeds) { gameState.inventory.s1 = (gameState.inventory.s1 || 0) + r.seeds; }

            saveDailyQuests();
            saveDataForMode();
            updateHeaderStats();
            renderInventory();
            renderDailyQuests();

            const iconMap = { coins: '🪙', xp: '⭐', seeds: '🌱' };
            let rewardMsg = 'Hoàn thành nhiệm vụ: ' + def.title + '! Nhận được';
            if (r.coins) rewardMsg += ' +' + r.coins + '🪙';
            if (r.xp)    rewardMsg += ' +' + r.xp + 'XP';
            if (r.seeds) rewardMsg += ' +' + r.seeds + '🌱';
            showToast('🎉 ' + rewardMsg);
            playChime(987, 'sine', 0.3);
        }

        // ---- TRACKER FUNCTIONS ----
        // Gọi khi đúng câu hỏi
        function dqOnCorrectAnswer(subject) {
            if (!dqState) return;
            const now = Date.now();

            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed || qs.failed) return;
                const id = qs.id;

                if (id === 'streak_3' || id === 'streak_5') {
                    // Handled by dqOnStreakUpdate
                } else if (id === 'answer_10') {
                    advanceDQ(idx, 1);
                } else if (id === 'speed_3in30') {
                    // managed in dqOnStreakUpdate below
                } else if (id === 'multi_subject' && subject) {
                    dqSubjectsDone.add(subject);
                    const q = dqState.quests[idx];
                    q.progress = dqSubjectsDone.size;
                    if (q.progress >= getQuestDef(id).target) markDQDone(idx);
                    else renderDailyQuests();
                }
            });
        }

        // Gọi sau mỗi câu đúng/sai để update streak & speed
        function dqOnStreakResult(isCorrect) {
            if (!dqState) return;
            const now = Date.now();

            if (isCorrect) {
        trackGlobalStat("math_correct");
        trackGlobalStat("coins_earned", 10);
                dqStreakCount++;
                // Speed: đếm trong 30 giây
                if (!dqSpeedStart) { dqSpeedStart = now; dqSpeedCount = 0; }
                if (now - dqSpeedStart <= 30000) {
                    dqSpeedCount++;
                } else {
                    // Reset window
                    dqSpeedStart = now;
                    dqSpeedCount = 1;
                }
            } else {
                // Sai → reset streak
                dqStreakCount = 0;
                dqSpeedStart = null;
                dqSpeedCount = 0;
            }

            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed || qs.failed) return;
                const id = qs.id;
                if ((id === 'streak_3' || id === 'streak_5') && isCorrect) {
                    const def = getQuestDef(id);
                    qs.progress = dqStreakCount;
                    if (dqStreakCount >= def.target) markDQDone(idx);
                    else renderDailyQuests();
                } else if (id === 'speed_3in30' && isCorrect) {
                    if (dqSpeedCount >= 3 && (now - dqSpeedStart) <= 30000) {
                        markDQDone(idx);
                    } else {
                        qs.progress = dqSpeedCount;
                        renderDailyQuests();
                    }
                }
            });
            saveDailyQuests();
        }

        // Gọi khi hoàn thành 1 quest không mất tim
        function dqOnPerfectQuest() {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed || qs.id !== 'no_error') return;
                advanceDQ(idx, 1);
            });
        }

        // Gọi khi thu hoạch 1 ô đất
        function dqOnHarvest(plotIdx) {
    trackGlobalStat("crops_harvested");
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                const id = qs.id;
                if (id === 'harvest_4' || id === 'harvest_2') advanceDQ(idx, 1);
                if (id === 'combo_cycle' && dqComboCurrent === 'watered' && dqComboPlotIdx === plotIdx) {
                    advanceDQ(idx, 1);
                    dqComboCurrent = null; dqComboPlotIdx = -1;
                }
            });
        }

        // Gọi khi tưới nước 1 ô đất
        function dqOnWater(plotIdx) {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                const id = qs.id;
                if (id === 'water_5') advanceDQ(idx, 1);
                if (id === 'combo_cycle' && dqComboCurrent === 'planted' && dqComboPlotIdx === plotIdx) {
                    dqComboCurrent = 'watered';
                    renderDailyQuests();
                }
            });
        }

        // Gọi khi gieo hạt 1 ô đất
        function dqOnPlant(plotIdx) {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'combo_cycle' && !dqComboCurrent) {
                    dqComboCurrent = 'planted';
                    dqComboPlotIdx = plotIdx;
                    renderDailyQuests();
                }
            });
        }

        // Gọi khi bán nông sản
        // amount = số xu bán được, cropType = loại cây (string, tùy chọn)
        function dqOnSell(amount, cropType) {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                const id = qs.id;
                if (id === 'sell_150') advanceDQ(idx, amount);
                if (id === 'market_earn_300') advanceDQ(idx, amount);
                if (id === 'market_sell_3types' && cropType) {
                    if (!qs.soldTypes) qs.soldTypes = [];
                    if (!qs.soldTypes.includes(cropType)) qs.soldTypes.push(cropType);
                    const def = getQuestDef('market_sell_3types');
                    if (def) {
                        qs.progress = qs.soldTypes.length;
                        if (qs.progress >= def.target) markDQDone(idx);
                        else { renderDailyQuests(); saveDailyQuests(); }
                    }
                }
            });
        }

        // Gọi khi thắng Boss
        function dqOnBossWin() {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                const id = qs.id;
                if (id === 'boss_win') advanceDQ(idx, 1);
                if (id === 'arena_win_2') advanceDQ(idx, 1);
                if (id === 'arena_nohit' && qs.bossNoPenalty !== false) advanceDQ(idx, 1);
                if (id === 'perfect_boss' && qs.bossNoError !== false) advanceDQ(idx, 1);
            });
        }

        // Gọi khi tấn công Boss (câu đúng hoặc sai)
        function dqOnBossAttack(isCorrect) {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'arena_attack_3') advanceDQ(idx, 1);
                if (!isCorrect) qs.bossNoError = false;
            });
        }

        // Gọi khi bị phạt giờ trong Boss
        function dqOnBossPenalty() {
            if (!dqState) return;
            dqState.quests.forEach(qs => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'arena_nohit') qs.bossNoPenalty = false;
            });
        }

        // Gọi khi bắt đầu một trận Boss mới
        function dqOnBossStart() {
            if (!dqState) return;
            dqState.quests.forEach(qs => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'arena_nohit') qs.bossNoPenalty = true;
                if (qs.id === 'perfect_boss') qs.bossNoError = true;
            });
        }

        // Gọi khi trả lời đúng trong chế độ ấp trứng
        function dqOnPetAnswer() {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'pet_answer_5') advanceDQ(idx, 1);
            });
        }

        // Gọi khi tiến độ ấp trứng tăng
        function dqOnEggProgress() {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'pet_progress_2') advanceDQ(idx, 1);
            });
        }

        // Gọi khi người dùng ghé thăm một tab mới
        const _dqVisitedTabs = new Set();
        function dqOnTabVisit(tabId) {
            if (!dqState || !tabId) return;
            _dqVisitedTabs.add(tabId);
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed) return;
                if (qs.id === 'all_tabs_3') {
                    const def = getQuestDef('all_tabs_3');
                    if (!def) return;
                    qs.progress = Math.min(def.target, _dqVisitedTabs.size);
                    if (qs.progress >= def.target) markDQDone(idx);
                    else { renderDailyQuests(); saveDailyQuests(); }
                }
            });
        }

        function advanceDQ(idx, amount) {
            const qs = dqState.quests[idx];
            const def = getQuestDef(qs.id);
            if (!def) return;
            qs.progress = Math.min(def.target, (qs.progress || 0) + amount);
            if (qs.progress >= def.target) markDQDone(idx);
            else renderDailyQuests();
            saveDailyQuests();
        }

        function markDQDone(idx) {
            const qs = dqState.quests[idx];
            if (qs.done) return;
            qs.done = true;
            const def = getQuestDef(qs.id);
            saveDailyQuests();
            renderDailyQuests();
            showToast('🎯 Nhiệm vụ hoàn thành: ' + def.title + '! Bấm NHẬN THƯỞNG để lấy quà!');
            playChime(880, 'triangle', 0.3);
        }

        // Countdown đến 00:00 reset
        function startDailyResetTimer() {
            function updateTimer() {
                const el = document.getElementById('dq-reset-timer');
                if (!el) return;
                const now = new Date();
                const midnight = new Date(now);
                midnight.setHours(24,0,0,0);
                const diff = midnight - now;
                const h = Math.floor(diff/3600000);
                const m = Math.floor((diff%3600000)/60000);
                el.textContent = 'Reset: ' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
            }
            updateTimer();
            setInterval(updateTimer, 60000);
        }

        window.claimDailyReward = claimDailyReward;
        // =====================================================

        function startRealtimeGameLoop() {
            // Thay đổi thời tiết sau mỗi 60s
            setInterval(() => {
                if (document.getElementById("screen-game").classList.contains("screen-hidden")) return;
                if (gameState.weather === "sunny" || gameState.weather === "rainy") {
                    if (gameState.activePet === "p3" && Math.random() < 0.5) {
                        // Miễn bão axit
                    } else {
                        rotateWeather();
                    }
                }
            }, 60000);

            // Biến động giá thị trường sau mỗi 45s
            setInterval(() => {
                if (document.getElementById("screen-game").classList.contains("screen-hidden")) return;
                triggerMarketFluctuation();
            }, 45000);

            // Kỹ năng trợ lý Rùa: Tự động tưới nước
            setInterval(() => {
                if (document.getElementById("screen-game").classList.contains("screen-hidden")) return;
                if (gameState.activePet === "p1") {
                    const dryPlots = gameState.plots.filter(p => p.status === "planted" && !p.water);
                    if (dryPlots.length > 0) {
                        dryPlots[0].water = true;
                        renderPlots();
                        playChime(800, 'sine', 0.2);
                        showToast("🐢 Bạn Rùa Eco đã giúp tưới nước cho 1 ô đất của bé!");
                    }
                }
            }, 30000);

            // Tiến trình phát triển cây trồng mỗi giây
            setInterval(() => {
                if (document.getElementById("screen-game").classList.contains("screen-hidden")) return;

                let hasChanged = false;

                gameState.plots.forEach((p) => {
                    if (p.status === "planted" && p.prog < 100) {
                        let seedConfig = getSeedConfig();
                        let seedData = seedConfig[p.seed];
                        let speed = getEffectiveGrowSpeed(seedData);

                        if (p.water && !p.pest && speed > 0) {
                            p.prog = Math.min(100, p.prog + speed);
                            hasChanged = true;
                        }

                        if (Math.random() < 0.008) {
                            p.water = false;
                            hasChanged = true;
                            if (activeTab === "farm") triggerAssistantSpeech("dry");
                        }

                        if (Math.random() < 0.008) {
                            p.pest = true;
                            hasChanged = true;
                            if (activeTab === "farm") triggerAssistantSpeech("pest");
                        }
                    }
                });

                if (hasChanged) {
                    saveDataForMode();
                }

                // Luôn render lại để countdown timer cập nhật mỗi giây
                if (activeTab === "farm") {
                    renderPlots();
                }

                // Cập nhật hướng dẫn trợ lý mỗi giây (giúp cập nhật tọa độ hoặc trạng thái mới)
                updateGuide();
            }, 1000);
        }

        function showExitConfirmModal() {
            document.getElementById("modal-confirm-exit").classList.add("active");
        }

        function closeExitConfirmModal() {
            document.getElementById("modal-confirm-exit").classList.remove("active");
        }

        function exitToWelcome() {
            closeExitConfirmModal();
            
            // Nếu đang chạy trong iframe (Next.js), chuyển hướng trang cha về trang chủ
            if (window.self !== window.top) {
                try {
                    window.top.location.href = "/";
                    return;
                } catch (e) {
                    console.error("Failed to redirect parent window:", e);
                }
            }

            // Đặt lại các biến CSS FOUC để hiển thị màn hình chào mừng bình thường
            document.documentElement.style.setProperty('--fouc-welcome', 'flex');
            document.documentElement.style.setProperty('--fouc-game', 'none');

            document.getElementById("screen-game").classList.add("screen-hidden");
            document.getElementById("screen-welcome").classList.remove("screen-hidden");
            selectedGrade = null;
            selectedWorld = null;
            document.querySelectorAll(".btn-grade, .btn-world").forEach(b => b.classList.remove("active"));
            validateWelcomeScreen();
        }

        function showResetConfirmModal() {
            document.getElementById("modal-confirm-reset").classList.add("active");
        }

        function closeResetConfirmModal() {
            document.getElementById("modal-confirm-reset").classList.remove("active");
        }

        function resetModeData() {
            resetGameStateToDefault();
            saveDataForMode();
            closeResetConfirmModal();
            updateHeaderStats();
            renderPlots();
            renderInventory();
            playChime(300, 'sine', 0.4);
            if (activeTab === "market") updateMarketUI();
            else if (activeTab === "pet") { renderHatchingEgg(); renderPetsList(); }
        }

        function showToast(text, duration = 2500) {
            const container = document.getElementById("game-container");
            if (!container) return;

            let toastContainer = document.getElementById("toast-container");
            if (!toastContainer) {
                toastContainer = document.createElement("div");
                toastContainer.id = "toast-container";
                toastContainer.style.position = "absolute";
                toastContainer.style.bottom = "85px";
                toastContainer.style.left = "50%";
                toastContainer.style.transform = "translateX(-50%)";
                toastContainer.style.zIndex = "300";
                toastContainer.style.display = "flex";
                toastContainer.style.flexDirection = "column";
                toastContainer.style.gap = "8px";
                toastContainer.style.pointerEvents = "none";
                container.appendChild(toastContainer);
            }

            const toast = document.createElement("div");
            toast.style.background = "rgba(15, 23, 42, 0.95)";
            toast.style.border = "1.5px solid #10b981";
            toast.style.borderRadius = "12px";
            toast.style.padding = "8px 16px";
            toast.style.color = "#f8fafc";
            toast.style.fontSize = "12px";
            toast.style.fontWeight = "bold";
            toast.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)";
            toast.style.display = "flex";
            toast.style.alignItems = "center";
            toast.style.gap = "8px";
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            toast.style.transition = "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
            
            toast.innerHTML = `<span style="font-size:14px;">🌟</span> <span>${text}</span>`;
            
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = "1";
                toast.style.transform = "translateY(0)";
            }, 10);

            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transform = "translateY(-10px)";
                setTimeout(() => {
                    toast.remove();
                    if (toastContainer.children.length === 0) {
                        toastContainer.remove();
                    }
                }, 300);
            }, duration);
        }

        function alertBox(text) {
            const overlay = document.createElement("div");
            overlay.className = "modal-overlay active alert-box-overlay";
            overlay.style.zIndex = "200";

            overlay.innerHTML = `
                <div class="modal-card" style="max-width: 400px; text-align: center;">
                    <div class="modal-header">
                        <h3 class="modal-title" style="color: #10b981;">Edu-Farm</h3>
                    </div>
                    <div style="font-size: 15px; font-weight: 700; margin: 15px 0;">${text}</div>
                    <button class="btn-confirm-yes" style="background: var(--primary-color); width: 100%;" onclick="this.closest('.modal-overlay').remove()">BÉ ĐÃ HIỂU</button>
                </div>
            `;
            document.getElementById("game-container").appendChild(overlay);
        }

        function closeAlertBox() {
            const overlays = document.querySelectorAll(".alert-box-overlay");
            overlays.forEach(el => el.remove());
        }
        window.closeAlertBox = closeAlertBox;

        async function initGameOnLoad() {
            // Tự động kiểm tra tham số URL nếu có (nhập từ Iframe Next.js)
            const urlParams = new URLSearchParams(window.location.search);
            const urlGrade = urlParams.get('grade');
            const urlWorld = urlParams.get('world');
            if (urlGrade && urlWorld) {
                selectedGrade = parseInt(urlGrade);
                selectedWorld = urlWorld;
                // Đảm bảo screen-game hiển thị ngay lập tức (xóa class hidden trước)
                const sg = document.getElementById('screen-game');
                const sw = document.getElementById('screen-welcome');
                if (sg) sg.classList.remove('screen-hidden');
                if (sw) sw.classList.add('screen-hidden');
                await startGame();
            }

            startRealtimeGameLoop();
        }

        if (document.readyState === "complete" || document.readyState === "interactive") {
            initGameOnLoad();
        } else {
            window.addEventListener("load", initGameOnLoad);
        }

        // Bind functions to window scope for inline HTML handlers
        window.selectGrade = selectGrade;
        window.selectWorld = selectWorld;
        window.startGame = startGame;
        window.toggleGuideMode = toggleGuideMode;
        window.switchTab = switchTab;
        window.onAssistantClicked = onAssistantClicked;
        window.closeTaskModal = closeTaskModal;
        window.closeExitConfirmModal = closeExitConfirmModal;
        window.exitToWelcome = exitToWelcome;
        window.closeResetConfirmModal = closeResetConfirmModal;
        window.resetModeData = resetModeData;
        window.showExitConfirmModal = showExitConfirmModal;
        window.showResetConfirmModal = showResetConfirmModal;
        window.verifyChoiceAnswer = verifyChoiceAnswer;
        window.handleMathKeyDown = handleMathKeyDown;
        window.handleTypingInput = handleTypingInput;
        window.sellCrop = sellCrop;
        window.adjustSellQty = adjustSellQty;
        window.setSellMax = setSellMax;
        window.validateSellQty = validateSellQty;
        window.buyDecoration = buyDecoration;
        window.startBossBattle = startBossBattle;
        window.unlockMap = unlockMap;

// Lắng nghe sự kiện cuộn để cập nhật vị trí trợ lý
document.addEventListener("DOMContentLoaded", () => {
    const workspace = document.querySelector(".game-workspace");
    if (workspace) workspace.addEventListener("scroll", () => { 
        if (gameState.guideEnabled) {
            const box = document.getElementById("assistant-box");
            if(box) {
                box.style.transition = "none";
                updateGuide();
                clearTimeout(box.scrollTimeout);
                box.scrollTimeout = setTimeout(() => {
                    box.style.transition = "top 0.7s cubic-bezier(0.25, 1, 0.5, 1), left 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
                }, 100);
            }
        } 
    });

    // Lắng nghe cuộn bên trong sidebar (nhiệm vụ & kho đồ)
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.addEventListener("scroll", () => {
        if (gameState.guideEnabled) {
            const box = document.getElementById("assistant-box");
            if (box) {
                box.style.transition = "none";
                updateGuide();
                clearTimeout(box.scrollTimeout);
                box.scrollTimeout = setTimeout(() => {
                    box.style.transition = "top 0.7s cubic-bezier(0.25, 1, 0.5, 1), left 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
                }, 100);
            }
        }
    });

    // Lắng nghe cuộn bên trong khu vực đất trồng (workspace trái)
    const leftContainer = document.querySelector(".workspace-left-container");
    if (leftContainer) leftContainer.addEventListener("scroll", () => {
        if (gameState.guideEnabled) {
            const box = document.getElementById("assistant-box");
            if (box) {
                box.style.transition = "none";
                updateGuide();
                clearTimeout(box.scrollTimeout);
                box.scrollTimeout = setTimeout(() => {
                    box.style.transition = "top 0.7s cubic-bezier(0.25, 1, 0.5, 1), left 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
                }, 100);
            }
        }
    });

    window.addEventListener("scroll", () => { if (gameState.guideEnabled) updateGuide(); });
});


// ==========================================
// BOSS SCHEDULE LOGIC (PHASE 4)
// ==========================================
let bossSchedule = { start: '19:30', end: '20:30' };

function loadBossSchedule() {
    const saved = localStorage.getItem('edufarm_boss_schedule');
    if (saved) {
        try {
            bossSchedule = JSON.parse(saved);
        } catch(e) {}
    }
}

function checkBossTimeWindow() {
    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();
    const currentTotal = currentH * 60 + currentM;

    const [startH, startM] = bossSchedule.start.split(':').map(Number);
    const startTotal = startH * 60 + startM;
    
    const [endH, endM] = bossSchedule.end.split(':').map(Number);
    const endTotal = endH * 60 + endM;

    const btn = document.getElementById("btn-boss-start");
    const status = document.getElementById("boss-time-status");
    if (!btn || !status) return;

    // Check if within window
    // Assumes start < end for simple daily ranges (no overnight for kids)
    if (currentTotal >= startTotal && currentTotal <= endTotal) {
        btn.removeAttribute("disabled");
        btn.classList.remove("opacity-50", "cursor-not-allowed", "grayscale");
        btn.innerHTML = 'KHỞI TRANH ĐẤU TRƯỜNG <i class="fa-solid fa-bolt ml-1"></i>';
        status.innerHTML = '<span class="text-emerald-400">Boss đang tàn phá! Hãy tiêu diệt ngay!</span>';
    } else {
        btn.setAttribute("disabled", "true");
        btn.classList.add("opacity-50", "cursor-not-allowed", "grayscale");
        btn.innerHTML = 'ĐANG KHÓA <i class="fa-solid fa-lock ml-1"></i>';
        status.innerHTML = `<span class="text-rose-400">Boss đang ngủ... Tỉnh dậy lúc ${bossSchedule.start} - ${bossSchedule.end}</span>`;
    }
}

function openBossConfig() {
    document.getElementById('modal-boss-config').classList.remove('hidden');
    document.getElementById('modal-boss-config').classList.add('flex');
    document.getElementById('boss-pin-section').classList.remove('hidden');
    document.getElementById('boss-schedule-section').classList.add('hidden');
    document.getElementById('boss-pin-input').value = '';
    document.getElementById('boss-pin-error').classList.add('hidden');
}

function closeBossConfig() {
    document.getElementById('modal-boss-config').classList.add('hidden');
    document.getElementById('modal-boss-config').classList.remove('flex');
}

function verifyParentPin() {
    const pin = document.getElementById('boss-pin-input').value;
    if (pin === '123456') {
        document.getElementById('boss-pin-section').classList.add('hidden');
        document.getElementById('boss-schedule-section').classList.remove('hidden');
        document.getElementById('boss-start-time').value = bossSchedule.start;
        document.getElementById('boss-end-time').value = bossSchedule.end;
    } else {
        document.getElementById('boss-pin-error').classList.remove('hidden');
    }
}

function saveBossSchedule() {
    const start = document.getElementById('boss-start-time').value;
    const end = document.getElementById('boss-end-time').value;
    if (start && end) {
        bossSchedule = { start, end };
        localStorage.setItem('edufarm_boss_schedule', JSON.stringify(bossSchedule));
        checkBossTimeWindow(); // Update UI immediately
        closeBossConfig();
    }
}

window.openBossConfig = openBossConfig; window.closeBossConfig = closeBossConfig; window.verifyParentPin = verifyParentPin; window.saveBossSchedule = saveBossSchedule;
// ==========================================
// GLOBAL STATS TRACKING (PHASE 5)
// ==========================================
function trackGlobalStat(key, amount = 1) {
    let stats = {
        math_correct: 0,
        math_wrong: 0,
        crops_harvested: 0,
        boss_wins: 0,
        coins_earned: 0
    };
    const saved = localStorage.getItem('edufarm_global_stats');
    if (saved) {
        try {
            stats = { ...stats, ...JSON.parse(saved) };
        } catch(e) {}
    }
    stats[key] += amount;
    localStorage.setItem('edufarm_global_stats', JSON.stringify(stats));
}

function renderMarket() {
    let marketEl = document.getElementById('market-items');
    if (!marketEl) return;
    let seeds = getSeedConfig();
    let currentPrices = {};
    for(let i=1; i<=10; i++) currentPrices['s'+i] = currentMarketPrices['s'+i] || seeds['s'+i].reward;
    
    let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    let decor = gameAssets[w].decorations;

    let html = `
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-cart-shopping text-emerald-500"></i> BÁN NÔNG SẢN
            </h3>
            <div class="shop-items-grid">`;
            
    for(let i=1; i<=10; i++) {
        let seedId = 's'+i;
        let harvestedCount = gameState.inventory['harvested_'+seedId] || 0;
        if (harvestedCount > 0 || i <= 3) {
            html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">${currentPrices[seedId]}🪙 / cái</span>
                <span class="text-[10px] opacity-75">Kho: ${harvestedCount}</span>
                <button class="btn-shop-sell mt-2 w-full" onclick="sellCrop('${seedId}')" ${harvestedCount <= 0 ? 'disabled' : ''}>Bán Hết</button>
            </div>`;
        }
    }
    
    html += `</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-seedling text-amber-500"></i> MUA HẠT GIỐNG ĐẶC BIỆT
            </h3>
            <div class="shop-items-grid">`;
            
    for(let i=4; i<=10; i++) {
        let seedId = 's'+i;
        let seedCount = gameState.inventory[seedId] || 0;
        html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: ${seeds[seedId].price}🪙</span>
                <span class="text-[10px] opacity-75">Bé có: ${seedCount}</span>
                <button class="btn-shop-buy mt-2 w-full" onclick="buySeed('${seedId}')" ${gameState.coins < seeds[seedId].price ? 'disabled' : ''}>Mua Hạt</button>
            </div>`;
    }
    
    html += `</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-hammer text-blue-500"></i> VẬT PHẨM TRANG TRÍ
            </h3>
            <div class="shop-items-grid">`;
            
    decor.forEach(item => {
        let hasItem = gameState.inventory.decorations && gameState.inventory.decorations.includes(item.id);
        html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${item.emoji}</span>
                <span class="text-xs font-bold">${item.name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: ${item.price}🪙</span>
                <button class="btn-shop-buy mt-2 w-full" onclick="buyDecoration('${item.id}', ${item.price})" ${hasItem ? 'disabled' : (gameState.coins < item.price ? 'disabled' : '')}>
                    ${hasItem ? 'Đã Sở Hữu' : 'Mua'}
                </button>
            </div>`;
    });
    
    html += `</div></div>`;
    
    marketEl.innerHTML = html;
}
window.buySeed = function(seedId) {
    let seeds = getSeedConfig();
    let price = seeds[seedId].price;
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.inventory[seedId] = (gameState.inventory[seedId] || 0) + 1;
        saveDataForMode();
        updateHeaderStats();
        playChime(600, 'triangle', 0.25);
        showToast('Đã mua 1 hạt giống ' + seeds[seedId].name, 'success');
        updateMarketUI();
        renderInventory();
    } else {
        playChime(150, 'sawtooth', 0.15);
        showToast('Không đủ xu!', 'error');
    }
};

window.buyDecor = function(id, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        if (!gameState.inventory.decorations) gameState.inventory.decorations = [];
        gameState.inventory.decorations.push(id);
        updateUI();
        playSound('coin');
        showToast('Đã mua trang trí', 'success');
        renderMarket();
        renderFarmDecor(); // You can implement this to show decor on farm
    } else {
        showToast('Không đủ xu!', 'error');
    }
};


// ==========================================
// TOWN FUNCTIONS (THỊ TRẤN)  
// ==========================================

const TOWN_BUILDINGS = {
    library: {
        id: 'library',
        name: 'Thư Viện Tri Thức',
        icon: '<i class="fa-solid fa-book-open"></i>',
        basePrice: 5000,
        maxLevel: 5,
        getBuffText: (level) => level === 0 ? "Chưa có hiệu ứng" : `Giảm <strong>${level * 5}%</strong> thời gian chờ cây lớn`,
        getNextBuffText: (level) => level >= 5 ? "Tối đa" : `Cấp ${level + 1}: Giảm ${(level + 1) * 5}%`
    },
    lab: {
        id: 'lab',
        name: 'Phòng Thí Nghiệm',
        icon: '<i class="fa-solid fa-flask"></i>',
        basePrice: 8000,
        maxLevel: 5,
        getBuffText: (level) => level === 0 ? "Chưa có hiệu ứng" : `Tăng <strong>${level * 5}%</strong> tỉ lệ rớt Chìa Khóa`,
        getNextBuffText: (level) => level >= 5 ? "Tối đa" : `Cấp ${level + 1}: Tăng ${(level + 1) * 5}%`
    },
    observatory: {
        id: 'observatory',
        name: 'Đài Quan Sát',
        icon: '<i class="fa-solid fa-tower-observation"></i>',
        basePrice: 10000,
        maxLevel: 5,
        getBuffText: (level) => level === 0 ? "Chưa có hiệu ứng" : `Tăng <strong>${level * 10}%</strong> lượng Vàng thu hoạch`,
        getNextBuffText: (level) => level >= 5 ? "Tối đa" : `Cấp ${level + 1}: Tăng ${(level + 1) * 10}%`
    }
};

function renderTown() {
    const grid = document.getElementById('town-buildings-grid');
    if (!grid) return;

    if (!gameState.town) {
        gameState.town = {
            library: { level: 0 },
            lab: { level: 0 },
            observatory: { level: 0 }
        };
    }

    let html = '';

    for (const [key, bData] of Object.entries(TOWN_BUILDINGS)) {
        const currentLevel = gameState.town[key]?.level || 0;
        const upgradeCost = bData.basePrice * Math.pow(2, currentLevel);
        const isMaxLevel = currentLevel >= bData.maxLevel;
        const canAfford = gameState.coins >= upgradeCost;

        html += `
            <div class="building-card">
                <div class="building-header">
                    <div class="building-icon">${bData.icon}</div>
                    <div class="building-info">
                        <h3>${bData.name}</h3>
                        <div class="building-level">Cấp ${currentLevel} / ${bData.maxLevel}</div>
                    </div>
                </div>
                <div class="building-buff">
                    ${bData.getBuffText(currentLevel)}
                    ${!isMaxLevel ? `<div class="building-next-buff"><i class="fa-solid fa-arrow-up"></i> ${bData.getNextBuffText(currentLevel)}</div>` : ''}
                </div>
                ${isMaxLevel ?
                    `<div class="building-maxed"><i class="fa-solid fa-star"></i> Đã đạt cấp tối đa!</div>` :
                    `<button class="building-upgrade-btn" onclick="upgradeBuilding('${key}')" ${!canAfford ? 'disabled' : ''}>
                        <i class="fa-solid fa-hammer"></i> Nâng cấp
                        <span class="cost"><i class="fa-solid fa-coins" style="color: #fbbf24;"></i> ${upgradeCost.toLocaleString('vi-VN')}</span>
                    </button>`
                }
            </div>
        `;
    }

    grid.innerHTML = html;
}

function upgradeBuilding(buildingId) {
    if (!gameState.town) {
        gameState.town = { library: { level: 0 }, lab: { level: 0 }, observatory: { level: 0 } };
    }
    const bData = TOWN_BUILDINGS[buildingId];
    if (!bData) return;
    const currentLevel = gameState.town[buildingId]?.level || 0;
    if (currentLevel >= bData.maxLevel) return;
    const upgradeCost = bData.basePrice * Math.pow(2, currentLevel);

    if (gameState.coins >= upgradeCost) {
        gameState.coins -= upgradeCost;
        gameState.town[buildingId].level = currentLevel + 1;
        saveDataForMode();
        updateHeaderStats();
        renderTown();
        playChime(600, 'triangle', 0.25);
        showToast(`${bData.name} đã lên Cấp ${currentLevel + 1}! 🎉`, 3000);
    } else {
        alertBox("Bé chưa đủ Vàng để nâng cấp công trình này. Hãy thu hoạch thêm nông sản nhé!");
    }
}
window.renderTown = renderTown;
window.upgradeBuilding = upgradeBuilding;


/* ================= BẢN ĐỒ TIẾN TRÌNH ================= */
var mapConfigs = {
    eco: [
        { id: 1, type: "math", icon: "fa-calculator", name: "Toán Học" },
        { id: 2, type: "science", icon: "fa-leaf", name: "Khoa Học" },
        { id: 3, type: "viet", icon: "fa-book", name: "Tiếng Việt" },
        { id: 4, type: "tech", icon: "fa-desktop", name: "Tin Học" },
        { id: 5, type: "treasure", icon: "fa-chest", name: "Rương Báu" }
    ],
    cyber: [
        { id: 1, type: "tech", icon: "fa-microchip", name: "Tin Học" },
        { id: 2, type: "math", icon: "fa-superscript", name: "Toán Học" },
        { id: 3, type: "science", icon: "fa-atom", name: "Khoa Học" },
        { id: 4, type: "viet", icon: "fa-pen", name: "Tiếng Việt" },
        { id: 5, type: "treasure", icon: "fa-chest", name: "Rương Báu" }
    ],
    magic: [
        { id: 1, type: "viet", icon: "fa-feather", name: "Ngôn Từ" },
        { id: 2, type: "tech", icon: "fa-bolt", name: "Phép Thuật" },
        { id: 3, type: "math", icon: "fa-shapes", name: "Hình Học" },
        { id: 4, type: "science", icon: "fa-flask", name: "Giả Kim" },
        { id: 5, type: "treasure", icon: "fa-chest", name: "Rương Báu" }
    ]
};

function renderMap() {
    const container = document.getElementById("map-path-container");
    if (!container) return;
    
    if (!gameState.mapProgress) {
        gameState.mapProgress = { eco: 1, cyber: 1, magic: 1 };
    }
    
    const worldKey = selectedWorld || "eco";
    const nodesData = mapConfigs[worldKey];
    const currentProgress = gameState.mapProgress[worldKey] || 1;
    
    let html = '';
    
    if (!gameState.mapUnlocked) {
        let keys = (gameState.inventory && gameState.inventory.mapKey) ? gameState.inventory.mapKey : 0;
        html += `
            <div class="map-lock-overlay">
                <i class="fa-solid fa-lock text-6xl text-amber-500 mb-4 animate-bounce" style="filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.6));"></i>
                <h3 class="text-2xl text-white font-black mb-2 tracking-wider">HÀNH TRÌNH ĐANG BỊ KHÓA</h3>
                <p class="text-slate-300 mb-2 text-center max-w-sm leading-relaxed text-sm">Hãy khám phá bí ẩn của bản đồ bằng cách sử dụng <b class="text-amber-400">1 Chìa Khóa Bản Đồ</b>.</p>
                <div class="bg-slate-800/80 px-4 py-2 rounded-xl border border-amber-500/30 text-amber-300 font-bold mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-key text-yellow-300"></i> Bé đang có: ${keys} Chìa khóa bản đồ
                </div>
                <button class="btn-primary flex items-center gap-2 text-lg px-6 py-3 font-bold shadow-lg" onclick="unlockMap()">
                    <i class="fa-solid fa-key text-yellow-300 animate-pulse"></i> DÙNG 1 CHÌA KHÓA 🔑
                </button>
            </div>
        `;
    }
    
    nodesData.forEach((node, index) => {
        let stateClass = "";
        let clickAction = "";
        
        if (node.id < currentProgress) {
            stateClass = "node-completed";
            if (gameState.mapUnlocked) clickAction = `onclick="startMapQuest(${node.id}, '${node.type}')"`;
        } else if (node.id === currentProgress) {
            stateClass = "node-current";
            if (gameState.mapUnlocked) clickAction = `onclick="startMapQuest(${node.id}, '${node.type}')"`;
        } else {
            stateClass = "node-locked";
        }
        
        const isBoss = node.type === "boss" ? "node-boss" : "";
        const isTreasure = node.type === "treasure" ? "node-treasure" : "";
        
        let avatarHtml = "";
        if (node.id === currentProgress && gameState.mapUnlocked) {
            avatarHtml = `<div class="avatar-indicator"><i class="fa-solid fa-location-dot"></i></div>`;
        }
        
        html += `
            <div class="map-node ${stateClass} ${isBoss} ${isTreasure}" ${clickAction}>
                ${avatarHtml}
                <i class="fa-solid ${node.icon}"></i>
                <div class="node-title">${node.name}</div>
                ${node.id < currentProgress ? '<div class="absolute -bottom-2 text-emerald-400 text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>' : ''}
                ${stateClass === 'node-locked' ? '<div class="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-full"><i class="fa-solid fa-lock text-slate-400"></i></div>' : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function unlockMap() {
    let keys = (gameState.inventory && gameState.inventory.mapKey) ? gameState.inventory.mapKey : 0;
    if (keys >= 1) {
        gameState.inventory.mapKey = keys - 1;
        gameState.mapUnlocked = true;
        const worldKey = selectedWorld || "eco";
        gameState.mapProgress[worldKey] = 1; // reset progress
        saveDataForMode();
        renderInventory();
        renderMap();
        showToast("Bản đồ đã mở! Hãy bắt đầu chinh phục nhé!", 3000, "success");
    } else {
        alertBox(`
            <div class="text-center">
                <span class="text-amber-400 text-2xl font-black block mb-3">🔑 BÉ CHƯA CÓ CHÌA KHÓA!</span>
                <div class="bg-slate-800/80 p-3 rounded-xl border border-amber-500/20 mb-4 text-center">
                    <p class="text-slate-300 text-sm">Bé đang có: <b class="text-red-400">0</b> Chìa Khóa Bản Đồ</p>
                </div>
                <p class="text-slate-300 text-sm leading-relaxed mb-4">
                    Bé cần ít nhất <b>1 Chìa Khóa Bản Đồ</b> để mở khóa hành trình thám hiểm này.
                </p>
                <p class="text-xs text-slate-400 leading-relaxed italic mb-4">
                    💡 <b>Mẹo nhỏ:</b> Bé hãy quay lại <b>Nông Trại</b>, chăm chỉ gieo hạt, tưới nước và thu hoạch nông sản để tìm chìa khóa rơi ngẫu nhiên nhé!
                </p>
                <button class="btn-secondary w-full py-3 font-bold text-base flex items-center justify-center gap-2" onclick="closeAlertBox(); switchTab('farm');">
                    <i class="fa-solid fa-wheat-awn"></i> VỀ NÔNG TRẠI TÌM CHÌA KHÓA
                </button>
            </div>
        `);
    }
}


// ─── RƯƠNG KHO BÁU: Pool hạt giống hiếm theo world ─────────────────────────
const TREASURE_SEED_POOL = {
    eco:   ['s11', 's12', 's13'],
    cyber: ['s11', 's12', 's13'],
    magic: ['s11', 's12', 's13']
};

function openTreasureChest() {
    const worldKey = (activeTask && activeTask.worldKey) || selectedWorld || 'eco';
    const seeds = getSeedConfig();
    const pool = TREASURE_SEED_POOL[worldKey] || ['s11'];

    // Random 1–3 hạt từ pool, mỗi hạt 1–2 cái
    const numTypes = Math.floor(Math.random() * 3) + 1; // 1, 2, hoặc 3 loại hạt
    const pickedIds = shuffleArray([...pool]).slice(0, numTypes);
    const rewards = pickedIds.map(seedId => ({
        seedId,
        qty: Math.floor(Math.random() * 2) + 1,
        name: seeds[seedId] ? seeds[seedId].name : seedId,
        emoji: seeds[seedId] ? seeds[seedId].emoji : '🌱'
    }));

    // Cộng vào inventory
    if (!gameState.inventory) gameState.inventory = {};
    rewards.forEach(r => {
        gameState.inventory[r.seedId] = (gameState.inventory[r.seedId] || 0) + r.qty;
    });

    // Reset bản đồ: khóa lại, quay về chặng 1
    gameState.mapUnlocked = false;
    if (!gameState.mapProgress) gameState.mapProgress = { eco: 1, cyber: 1, magic: 1 };
    gameState.mapProgress[worldKey] = 1;

    saveDataForMode();
    updateHeaderStats();
    renderInventory();
    closeTaskModal();

    showTreasureReward(rewards);
}
window.openTreasureChest = openTreasureChest;

function showTreasureReward(rewards) {
    playChime(1047, 'sine', 0.4);
    setTimeout(() => playChime(1319, 'sine', 0.35), 200);
    setTimeout(() => playChime(1568, 'sine', 0.3), 400);

    const seedListHtml = rewards.map(r =>
        `<div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.08);
            border-radius:12px;padding:10px 16px;margin-bottom:8px;border:1px solid rgba(251,191,36,0.3);">
            <span style="font-size:2rem;">${r.emoji}</span>
            <div style="text-align:left;">
                <div style="font-weight:bold;color:#fde68a;font-size:1rem;">${r.name}</div>
                <div style="color:#94a3b8;font-size:0.8rem;">x${r.qty} hạt giống — <span style="color:#f59e0b;">Độc quyền rương báu!</span></div>
            </div>
        </div>`
    ).join('');

    alertBox(`
        <div style="text-align:center;">
            <div style="font-size:3rem;margin-bottom:8px;animation:bounce 0.8s infinite;">🪙</div>
            <h2 style="font-size:1.6rem;font-weight:900;color:#fbbf24;margin-bottom:4px;
                text-shadow:0 0 20px rgba(251,191,36,0.8);">MỞ RƯƠNG THÀNH CÔNG!</h2>
            <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:16px;">
                Bé đã nhận được <b style="color:#f59e0b;">${rewards.length} loại hạt giống đặc biệt</b>
                không có trong cửa hàng!
            </p>
            <div style="max-width:280px;margin:0 auto 16px;">
                ${seedListHtml}
            </div>
            <p style="color:#64748b;font-size:0.78rem;">
                🔒 Bản đồ đã được khóa lại. Dùng chìa khóa để khám phá lần sau!
            </p>
        </div>
    `);

    // Render lại bản đồ sau khi đóng popup (delay nhỏ để popup hiện trước)
    setTimeout(() => renderMap(), 300);
}
window.showTreasureReward = showTreasureReward;

function startMapQuest(nodeId, subject) {
    const isTreasure = (subject === 'treasure');
    const isBossMap  = (subject === 'boss');
    // Rương: 5 câu hỏi tổng hợp; boss map: 3-6 câu; chặng thường: 3 câu
    const targetCount = isTreasure ? 5 : isBossMap ? (Math.floor(Math.random() * 4) + 3) : 3;

    activeTask = {
        type: isTreasure ? 'treasure' : isBossMap ? 'boss' : 'map',
        worldKey: selectedWorld || 'eco',
        nodeId,
        subject,
        correctCount: 0,
        target: targetCount,
        errors: 0,
        timeLeft: isBossMap ? 60 : null,
        // Xáo trộn danh sách môn học cho rương mỗi lần mới
        treasureSubjects: isTreasure ? shuffleArray(['math', 'viet', 'science', 'tech', 'math']) : null
    };

    // Xoá lịch sử câu hỏi để đảm bảo luôn mới khi bắt đầu rương
    if (isTreasure) {
        recentQuestionsQueue = [];
        sessionQuestionPools.map = [];   // Reset pool map khi vào rương mới
    }

    document.getElementById('modal-task').classList.add('active');
    const imgCont = document.getElementById('quest-image-container');
    const bossArena = document.getElementById('boss-arena-container');

    if (isTreasure) {
        if (bossArena) bossArena.style.display = 'none';
        if (imgCont) {
            imgCont.innerHTML = `
                <div style="font-size:5rem;animation:bounce 1s infinite;filter:drop-shadow(0 0 20px rgba(251,191,36,0.8));">🪙</div>
                <div style="font-size:0.9rem;color:#fbbf24;font-weight:bold;margin-top:4px;">RƯƠNG KHO BÁU</div>
            `;
            imgCont.style.display = 'block';
        }
        document.getElementById('quest-text').innerText =
            `Trả lời đúng ${targetCount} câu hỏi tổng hợp để mở rương!`;
        document.getElementById('quest-type-label').innerText = `🪙 RƯƠNG KHO BÁU BÍ ẨN`;
    } else if (isBossMap) {
        document.getElementById('quest-text').innerText =
            `ĐẠI CHIẾN BOSS! Hoàn thành ${targetCount} câu để hạ gục!`;
        document.getElementById('quest-type-label').innerText = `ĐẤU TRƯỜNG BOSS`;
        updateBossUI(100, 1);
        if (imgCont) imgCont.style.display = 'none';
    } else {
        if (bossArena) bossArena.style.display = 'none';
        if (imgCont) {
            imgCont.innerHTML = `<div class="text-6xl text-sky-400 mb-4 animate-bounce"><i class="fa-solid fa-route"></i></div>`;
            imgCont.style.display = 'block';
        }
        document.getElementById('quest-text').innerText =
            `Chặng ${nodeId}: Hãy trả lời đúng 3 câu để hoàn thành!`;
        document.getElementById('quest-type-label').innerText =
            `Bản Đồ Học Tập - ${subject.toUpperCase()}`;
    }

    document.getElementById('quest-answer-panel').style.display = 'none';
    document.getElementById('quest-hint-container').style.display = 'none';
    document.getElementById('quest-explanation-container').style.display = 'none';

    const oldBtn = document.getElementById('btn-quest-submit');
    if (oldBtn) oldBtn.style.display = 'none';

    const existingStartBtn = document.getElementById('btn-map-quest-start');
    if (existingStartBtn) existingStartBtn.remove();

    const startBtn = document.createElement('button');
    startBtn.id = 'btn-map-quest-start';
    startBtn.className = 'btn-submit w-full mt-4';
    if (isTreasure) {
        startBtn.style.cssText = 'background:linear-gradient(135deg,#f59e0b,#d97706);padding:12px 24px;border-radius:12px;color:#fff;font-weight:bold;font-size:1.05rem;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(245,158,11,0.5);';
        startBtn.innerHTML = '🪙 THÁM HIỂM RƯƠNG BÁU';
    } else if (isBossMap) {
        startBtn.style.cssText = 'background:#dc2626;padding:10px 20px;border-radius:8px;color:#fff;font-weight:bold;border:none;cursor:pointer;';
        startBtn.innerText = '⚔️ MỞ KHO BÁU';
    } else {
        startBtn.style.cssText = 'background:#0ea5e9;padding:10px 20px;border-radius:8px;color:#fff;font-weight:bold;border:none;cursor:pointer;';
        startBtn.innerText = 'BẮT ĐẦU CHẶNG HỌC TẬP';
    }

    startBtn.onclick = function() {
        startBtn.remove();
        if (isBossMap) {
            activeTask.timerInterval = setInterval(() => {
                if (!activeTask) return;
                activeTask.timeLeft--;
                const timerEl = document.getElementById('boss-timer');
                if (timerEl) timerEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${activeTask.timeLeft}s`;
                if (activeTask.timeLeft <= 0) {
                    clearInterval(activeTask.timerInterval);
                    alertBox('Đại chiến Boss đã hết giờ! Bé hãy quay lại nông trại luyện tập thêm rồi thử lại nhé!');
                    closeTaskModal();
                }
            }, 1000);
        }
        // Rương: lấy môn học theo thứ tự đã shuffle sẵn
        const nextSubject = isTreasure
            ? (activeTask.treasureSubjects[activeTask.correctCount] || 'math')
            : subject;
        generateSpecificSubjectQuestion(nextSubject);
    };
    document.getElementById('quest-answer-panel').insertAdjacentElement('afterend', startBtn);
}



function buildMathQuestion(grade) {
    // Random giữa 3 dạng bài: cơ bản (40%), ngữ cảnh (35%), điền số (25%)
    const r = Math.random();
    let result = null;
    if (r < 0.40) {
        result = _buildBasicMathQuestion(grade);
    } else if (r < 0.75) {
        result = buildContextMathQuestion(grade);
    } else {
        result = buildFillInMathQuestion(grade);
    }
    // Fallback nếu sinh không được
    return result || _buildBasicMathQuestion(grade);
}

// Dạng phép tính cơ bản (gốc) — dùng nội bộ
function _buildBasicMathQuestion(grade) {
    let attempts = 0;
    while (attempts < 30) {
        attempts++;
        let q, ans, key;
        if (grade === 1) {
            const a = Math.floor(Math.random() * 8) + 1;
            const b = Math.floor(Math.random() * (10 - a)) + 1;
            const isPlus = Math.random() < 0.5;
            ans = isPlus ? (a + b) : a;
            q = isPlus ? `${a} + ${b} = ?` : `${a + b} - ${b} = ?`;
        } else if (grade === 2) {
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 30) + 5;
            const isPlus = Math.random() < 0.5;
            ans = isPlus ? (a + b) : (a - b);
            if (ans < 0) continue;
            q = `${a} ${isPlus ? '+' : '-'} ${b} = ?`;
        } else if (grade === 3) {
            const a = Math.floor(Math.random() * 9) + 2;
            const b = Math.floor(Math.random() * 9) + 2;
            const r = Math.random();
            if (r < 0.33) {
                ans = a * b;
                q = `${a} x ${b} = ?`;
            } else if (r < 0.66) {
                ans = a;
                q = `${a * b} ÷ ${b} = ?`;
            } else {
                const a2 = Math.floor(Math.random() * 900) + 100;
                const b2 = Math.floor(Math.random() * 900) + 100;
                ans = a2 + b2;
                q = `${a2} + ${b2} = ?`;
            }
        } else if (grade === 4) {
            const r = Math.random();
            if (r < 0.25) {
                const a = (Math.floor(Math.random() * 100) + 10) * 10;
                const b = (Math.floor(Math.random() * 50) + 5) * 10;
                ans = a + b;
                q = `${a} + ${b} = ?`;
            } else if (r < 0.5) {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * 9) + 2;
                ans = a * b;
                q = `${a} x ${b} = ?`;
            } else if (r < 0.75) {
                const b = Math.floor(Math.random() * 9) + 2;
                const ansNum = Math.floor(Math.random() * 900) + 100;
                ans = ansNum;
                q = `${ansNum * b} ÷ ${b} = ?`;
            } else {
                // Fractions
                const tu = Math.floor(Math.random() * 5) + 1;
                const mau = Math.floor(Math.random() * 5) + 2;
                ans = tu + "/" + mau;
                q = `1 x ${tu}/${mau} = ?`;
            }
        } else {
            // Grade 5: Decimals, Percentages
            const r = Math.random();
            if (r < 0.33) {
                const a = parseFloat((Math.random() * 10 + 1).toFixed(2));
                const b = parseFloat((Math.random() * 10 + 1).toFixed(2));
                ans = parseFloat((a + b).toFixed(2));
                q = `${a} + ${b} = ?`;
            } else if (r < 0.66) {
                const a = parseFloat((Math.random() * 10 + 1).toFixed(1));
                const b = parseFloat((Math.random() * 10 + 1).toFixed(1));
                ans = parseFloat((Math.max(a, b) - Math.min(a, b)).toFixed(1));
                q = `${Math.max(a, b).toFixed(1)} - ${Math.min(a, b).toFixed(1)} = ?`;
            } else {
                const a = (Math.floor(Math.random() * 9) + 1) * 10;
                ans = (a / 100) * 100;
                q = `${a}% của 100 bằng bao nhiêu?`;
            }
        }
        
        key = 'basic|' + q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            const ansStr = String(ans);
            return { q, ans: ansStr, key };
        }
    }
    return null;
}

function buildContextMathQuestion(grade) {
    const g = Math.min(5, Math.max(1, grade));
    const templates = {
        1: [
            () => { const a = Math.floor(Math.random()*5)+1; const b = Math.floor(Math.random()*4)+1; return { q: `Bé có ${a} quả táo, hái thêm ${b} quả. Bé có tất cả bao nhiêu quả?`, ans: a+b }; },
            () => { const r = Math.floor(Math.random()*3)+2; const c = Math.floor(Math.random()*3)+2; return { q: `Vườn có ${r} hàng, mỗi hàng ${c} cây. Có tất cả bao nhiêu cây?`, ans: r*c }; },
        ],
        2: [
            () => { const a = Math.floor(Math.random()*40)+20; const b = Math.floor(Math.random()*15)+5; return { q: `Kho có ${a} kg phân bón, dùng ${b} kg. Còn lại bao nhiêu kg?`, ans: a-b }; },
            () => { const c = Math.floor(Math.random()*4)+2; const each = Math.floor(Math.random()*7)+3; return { q: `Mỗi cây cho ${each} trái, bé có ${c} cây. Thu được bao nhiêu trái?`, ans: c*each }; },
        ],
        3: [
            () => { const a = Math.floor(Math.random()*6)+3; const b = Math.floor(Math.random()*6)+3; return { q: `Bé trồng ${a} luống, mỗi luống ${b} hàng. Có bao nhiêu hàng cây?`, ans: a*b }; },
            () => { const a = Math.floor(Math.random()*7)+2; const b = Math.floor(Math.random()*7)+2; return { q: `${a*b} hạt giống chia đều cho ${b} túi. Mỗi túi bao nhiêu hạt?`, ans: a }; },
            () => { const canh = Math.floor(Math.random()*10)+5; return { q: `Sân trường hình vuông có cạnh ${canh}m. Chu vi sân là bao nhiêu m?`, ans: canh*4 }; }
        ],
        4: [
            () => { const a = (Math.floor(Math.random()*10)+5)*100; const b = (Math.floor(Math.random()*7)+2)*100; return { q: `Thu ${a} đồng, chi ${b} đồng mua phân. Còn lại bao nhiêu đồng?`, ans: a-b }; },
            () => { const d = Math.floor(Math.random()*10)+5; const r = Math.floor(Math.random()*5)+3; return { q: `Mảnh vườn hình chữ nhật dài ${d}m, rộng ${r}m. Diện tích là bao nhiêu m2?`, ans: d*r }; }
        ],
        5: [
            () => { const a = parseFloat((Math.random()*4+1.5).toFixed(1)); const b = parseFloat((Math.random()*2+0.5).toFixed(1)); const r = parseFloat((a-b).toFixed(1)); if(r<0) return null; return { q: `Bình có ${a} lít, tưới hết ${b} lít. Còn lại bao nhiêu lít?`, ans: r }; },
            () => { const v = Math.floor(Math.random()*40)+20; const t = Math.floor(Math.random()*3)+2; return { q: `Ô tô đi với vận tốc ${v} km/h. Sau ${t} giờ đi được bao nhiêu km?`, ans: v*t }; }
        ],
    };
    let attempts = 0;
    while (attempts < 25) {
        attempts++;
        const pool = templates[g] || templates[3];
        const item = pool[Math.floor(Math.random() * pool.length)]();
        if (!item) continue;
        if (item.ans < 0 || isNaN(item.ans)) continue;
        const key = 'ctx|' + item.q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            return { q: item.q, ans: String(item.ans), key };
        }
    }
    return null;
}

function buildFillInMathQuestion(grade) {
    let attempts = 0;
    while (attempts < 25) {
        attempts++;
        let q, ans;
        if (grade <= 2) {
            const ans_ = Math.floor(Math.random()*7)+1;
            const b = Math.floor(Math.random()*6)+1;
            const total = ans_ + b;
            if (Math.random() < 0.5) {
                q = `? + ${b} = ${total}`;
            } else {
                q = `${total} - ? = ${b}`;
            }
            ans = ans_;
        } else if (grade === 3) {
            const a = Math.floor(Math.random()*7)+2;
            const b = Math.floor(Math.random()*7)+2;
            if (Math.random() < 0.5) {
                q = `? × ${b} = ${a*b}`;
                ans = a;
            } else {
                q = `${a*b} ÷ ? = ${a}`;
                ans = b;
            }
        } else if (grade === 4) {
            const a = (Math.floor(Math.random()*9)+2)*10;
            const b = (Math.floor(Math.random()*6)+1)*10;
            if (Math.random() < 0.5) {
                q = `? + ${b} = ${a+b}`;
            } else {
                q = `${a+b} - ? = ${b}`;
            }
            ans = a;
        } else {
            const a = parseFloat((Math.random()*4+1).toFixed(1));
            const b = parseFloat((Math.random()*3+0.5).toFixed(1));
            const total = parseFloat((a+b).toFixed(1));
            q = `? + ${b} = ${total}`;
            ans = a;
        }
        const key = 'fill|' + q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            return { q, ans: String(ans), key };
        }
    }
    return null;
}


function pickQuizQuestion(bankKey) {
    const bank = (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK) ? QUIZ_BANK[bankKey] : null;
    if (!bank || bank.length === 0) return null;
    const shuffled = shuffleArray([...bank]);
    for (let i = 0; i < Math.min(shuffled.length, 5); i++) {
        const candidate = shuffled[i];
        const key = bankKey + '|' + candidate.q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            return candidate;
        }
    }
    const fallback = shuffled[0];
    addToQuestionHistory(bankKey + '|' + fallback.q, _currentQMode);
    return fallback;
}

function generateGenericHints(candidate) {
    const ans = candidate ? String(candidate.a || candidate.ans || '') : '';
    return {
        hints: [
            `Đáp án có ${ans.length} ký tự.`,
            `Đáp án bắt đầu bằng "${ans.charAt(0)}".`,
            `Đáp án đúng là: "${ans}".`
        ],
        explanation: `Đáp án đúng là: ${ans}.`
    };
}

function generateFarmTaskQuestion() {
    const grade = typeof selectedGrade !== 'undefined' ? parseInt(selectedGrade) : 1;
    const panel = document.getElementById("quest-answer-panel");
    const qText = document.getElementById("quest-text");
    const qTypeLabel = document.getElementById("quest-type-label");
    if (!panel || !qText || !qTypeLabel) return;

    // Reset UI display
    const questLayout = document.querySelector(".quest-layout");
    if (questLayout) questLayout.style.display = "";
    qText.style.display = "";
    panel.innerHTML = "";
    panel.style.display = 'block';

    document.getElementById("quest-hint-container").style.display = "none";
    document.getElementById("quest-explanation-container").style.display = "none";
    if (activeTask) activeTask.errors = 0;

    // Generate Farm Math Question
    const mathQ = buildMathQuestion(grade);
    let question = mathQ ? mathQ.q : "5 + 3 = ?";
    let ans = mathQ ? String(mathQ.ans) : "8";

    // Title based on farm activity
    let taskTitle = "Bài Tập Nông Trại 🌾";
    if (activeTask) {
        if (activeTask.type === "pest") taskTitle = "Tiêu Diệt Sâu Phá Hoại 🐛";
        else if (activeTask.type === "unlock") taskTitle = "Mở Khóa Đất Mới 🌾";
        else if (activeTask.type === "disaster") taskTitle = "Lá Chắn Bão Axit 🛡️";
        else if (activeTask.type === "farm") {
            if (activeTask.targetId === "water") taskTitle = "Lấy Nước Tưới Đất 💧";
            else if (activeTask.targetId && activeTask.targetId.startsWith("s")) {
                const sData = getSeedConfig()[activeTask.targetId];
                taskTitle = `Lấy Hạt Giống ${sData ? sData.name : ''} 🌱`;
            }
        }
    }

    qTypeLabel.innerText = taskTitle;
    qText.innerText = `Phép tính Nông Trại: ${question}`;
    activeTask.correctAnswer = ans;
    activeTask.questionText = question;
    activeTask.explanation = `Đáp án đúng là: ${ans}`;

    // GENERATE THE OLD INPUT FORMAT
    panel.innerHTML = `
        <div style="text-align: center; margin-top: 10px;">
            <input type="number" id="math-answer-input" onkeydown="handleMathKeyDown(event)" placeholder="Nhập đáp án..." style="padding: 10px 15px; font-size: 24px; text-align: center; border: 2px solid #3182ce; border-radius: 12px; width: 200px; color: #1e3a8a; font-weight: bold; margin-bottom: 15px; background: rgba(255,255,255,0.9);" autocomplete="off">
            <br>
            <button class="btn-submit" onclick="verifyChoiceAnswer(document.getElementById('math-answer-input').value.trim())" style="padding: 10px 30px; font-size: 16px; border-radius: 12px; background: #3182ce; color: white; border: none; font-weight: bold; cursor: pointer;">Đồng ý</button>
        </div>
    `;

    setTimeout(() => {
        const input = document.getElementById("math-answer-input");
        if (input) input.focus();
    }, 100);

    const submitBtn = document.getElementById("btn-quest-submit");
    if (submitBtn) submitBtn.style.display = "none";
}

function generateCurriculumQuestion(mode) {
    _currentQMode = mode || (activeTask && activeTask.mode) || 'default';
    const subjects = ['math', 'viet', 'science', 'tech'];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    generateSpecificSubjectQuestion(subject, _currentQMode);
}

function submitCurrentAnswer(val, btnElement) {
    if (!activeTask) return;
    const isMapTask = (activeTask.type === "map" || activeTask.type === "boss" || activeTask.subject === "boss");
    if (isMapTask) {
        checkMapMultipleChoice(val, btnElement);
    } else {
        verifyChoiceAnswer(val);
    }
}
window.submitCurrentAnswer = submitCurrentAnswer;

function handleMathKeyDown(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('math-answer-input');
        if (input && input.value.trim() !== '') {
            submitCurrentAnswer(input.value.trim(), input);
        }
    }
}
window.handleMathKeyDown = handleMathKeyDown;

// Bản đồ ngón tay hỗ trợ gõ phím
const FINGER_MAP = {
    'L5': ['`', '1', 'q', 'a', 'z', 'shift', 'ctrl'],
    'L4': ['2', 'w', 's', 'x'],
    'L3': ['3', 'e', 'd', 'c'],
    'L2': ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
    'L1': [' '],
    'R1': [' '],
    'R2': ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
    'R3': ['8', 'i', 'k', ','],
    'R4': ['9', 'o', 'l', '.'],
    'R5': ['0', '-', '=', 'p', '[', ']', ';', "'", '\\', '/', 'enter', 'backspace']
};

// Chuẩn hóa ký tự tiếng Việt có dấu về phím QWERTY gốc
function getBaseChar(char) {
    if (!char) return '';
    const map = {
        'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a', 'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o', 'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u', 'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd'
    };
    const c = char.toLowerCase();
    return map[c] || c;
}

// Lấy ngón tay tương ứng với ký tự
function getFingerForChar(char) {
    if (!char) return null;
    const base = getBaseChar(char);
    for (const [finger, chars] of Object.entries(FINGER_MAP)) {
        if (chars.includes(base)) {
            return finger;
        }
    }
    return null;
}

// Cập nhật trạng thái highlight bàn phím ảo và ngón tay
function updateTypingGuide() {
    if (!activeTask) return;
    const input = document.getElementById("math-answer-input");
    if (!input) return;
    const typed = input.value || '';
    const target = activeTask.correctAnswer || '';
    
    // Tìm ký tự tiếp theo cần gõ
    let nextChar = '';
    if (typed.length < target.length) {
        nextChar = target[typed.length];
    }
    
    // Reset toàn bộ highlight trước đó
    document.querySelectorAll('.virtual-keyboard-wrapper .kb-key').forEach(el => {
        el.classList.remove('highlight');
    });
    document.querySelectorAll('.finger-path').forEach(el => {
        el.classList.remove('highlight-finger');
    });
    
    if (nextChar) {
        const base = getBaseChar(nextChar);
        // Highlight phím tương ứng
        const keyId = base === ' ' ? 'key-space' : `key-${base.toLowerCase()}`;
        const keyEl = document.getElementById(keyId);
        if (keyEl) {
            keyEl.classList.add('highlight');
        }
        
        // Highlight ngón tay tương ứng
        const finger = getFingerForChar(nextChar);
        if (finger) {
            const fingerEl = document.getElementById(`finger-${finger}`);
            if (fingerEl) {
                fingerEl.classList.add('highlight-finger');
            }
        }
    }
}
window.updateTypingGuide = updateTypingGuide;

function handleTypingInput(e) {
    if (!activeTask) return;
    const input = e.target;
    const typed = input.value;
    const target = activeTask.correctAnswer || '';
    
    // Cập nhật hướng dẫn phím/ngón tay tương ứng theo ký tự tiếp theo
    if (typeof updateTypingGuide === 'function') {
        updateTypingGuide();
    }

    const feedbackBox = document.getElementById('typing-feedback-box');
    if (feedbackBox) {
        feedbackBox.innerHTML = target.split('').map((ch, i) => {
            if (i < typed.length) {
                return typed[i].toLowerCase() === ch.toLowerCase()
                    ? `<span class="typed-correct">${ch}</span>`
                    : `<span class="typed-incorrect">${ch}</span>`;
            }
            return `<span class="typed-untyped">${ch}</span>`;
        }).join('');
    }
    if (typed.trim().toLowerCase() === target.trim().toLowerCase()) {
        submitCurrentAnswer(typed.trim(), input);
    }
}
window.handleTypingInput = handleTypingInput;

function generateRealisticOptions(candidate, ans, normSubject) {
    let options = [String(ans)];
    
    if (candidate && candidate.c && Array.isArray(candidate.c) && candidate.c.length >= 2) {
        options = candidate.c.map(x => String(x));
    } else if (candidate && candidate.fakes && Array.isArray(candidate.fakes)) {
        options = [String(ans), ...candidate.fakes.map(x => String(x))];
    } else {
        let lowerAns = String(ans).toLowerCase();
        if (lowerAns.includes('ctrl') || lowerAns.includes('shift') || lowerAns.includes('alt') || lowerAns.includes('enter') || lowerAns.includes('space')) {
            const shortcuts = ['ctrl+c', 'ctrl+v', 'ctrl+x', 'ctrl+z', 'ctrl+s', 'ctrl+p', 'ctrl+f', 'ctrl+n', 'ctrl+a', 'shift+tab', 'alt+f4'];
            for (let sc of shuffleArray(shortcuts)) {
                if (options.length >= 4) break;
                if (!options.includes(sc)) options.push(sc);
            }
        } else if (normSubject === 'tech') {
            const techFakes = ['Bàn phím', 'Con chuột', 'Màn hình', 'Loa máy tính', 'Ổ đĩa cứng', 'USB', 'Bàn di chuột', 'Tai nghe'];
            for (let tf of shuffleArray(techFakes)) {
                if (options.length >= 4) break;
                if (!options.includes(tf)) options.push(tf);
            }
        } else if (normSubject === 'viet') {
            const vietFakes = ['Đọc sách', 'Viết bài', 'Lắng nghe', 'Phát biểu', 'Chăm chỉ', 'Dũng cảm'];
            for (let vf of shuffleArray(vietFakes)) {
                if (options.length >= 4) break;
                if (!options.includes(vf)) options.push(vf);
            }
        } else if (normSubject === 'science') {
            const sciFakes = ['Ánh sáng mặt trời', 'Nước ngọt', 'Không khí', 'Đất phù sa', 'Lá cây', 'Rễ cây'];
            for (let sf of shuffleArray(sciFakes)) {
                if (options.length >= 4) break;
                if (!options.includes(sf)) options.push(sf);
            }
        }
    }
    
    while (options.length < 4) {
        let dummy = "Lựa chọn " + (options.length + 1);
        if (!options.includes(dummy)) options.push(dummy);
    }
    return options.slice(0, 4);
}
window.generateRealisticOptions = generateRealisticOptions;

function generateSpecificSubjectQuestion(subject, mode) {
    const _qMode = mode || (activeTask && activeTask.mode) || 'default';
    const baseGrade = typeof selectedGrade !== 'undefined' ? parseInt(selectedGrade) : 1;
    // Rương kho báu: tăng độ khó thêm 1 cấp (tối đa 5)
    const grade = (activeTask && activeTask.type === 'treasure')
        ? Math.min(5, baseGrade + 1)
        : baseGrade;
    const panel = document.getElementById("quest-answer-panel");
    const qText = document.getElementById("quest-text");
    const qTypeLabel = document.getElementById("quest-type-label");
    if (!panel || !qText || !qTypeLabel) return;
    
    // Reset display properties for new question
    const questLayout = document.querySelector(".quest-layout");
    if (questLayout) questLayout.style.display = "";
    qText.style.display = "";
    qText.style.color = "";
    qText.style.fontSize = "";
    qText.style.fontWeight = "";
    qTypeLabel.style.color = "";
    
    const closeBtn = document.getElementById("modal-task-close");
    if (closeBtn) closeBtn.style.color = "";

    const questContainer = document.querySelector(".quest-container");
    if (questContainer) {
        questContainer.style.background = "";
        questContainer.style.border = "";
        questContainer.style.boxShadow = "";
        questContainer.style.color = "";
    }

    panel.innerHTML = "";
    panel.style.display = 'block';
    
    document.getElementById("quest-hint-container").style.display = "none";
    document.getElementById("quest-explanation-container").style.display = "none";
    if (activeTask) activeTask.errors = 0;

    if (activeTask && activeTask.cleanup) {
        activeTask.cleanup();
        activeTask.cleanup = null;
    }

    let normSubject = subject;
    if (subject === 'viet' || subject === 'vietnamese' || subject === 'language') normSubject = 'viet';
    else if (subject === 'tech' || subject === 'it' || subject === 'magic') normSubject = 'tech';
    else if (subject === 'science' || subject === 'alchemy' || subject === 'geometry') normSubject = 'science';
    else if (subject === 'math') normSubject = 'math';
    else if (subject === 'boss') {
        const pool = ['math', 'viet', 'science', 'tech'];
        normSubject = pool[Math.floor(Math.random() * pool.length)];
    }

    let question = "";
    let ans = "";
    let options = [];
    let labelPrefix = "";
    let candidate = null;

    if (normSubject === 'math') {
        labelPrefix = `Toán Học Lớp ${grade}`;
        const mathQ = buildMathQuestion(grade);
        if (mathQ) {
            question = mathQ.q;
            ans = String(mathQ.ans);
            options = [ans];
            const numAns = parseFloat(ans);
            // Xác định xem đáp án có dạng thập phân không để sinh fake options nhất quán
            const isDecimalAns = ans.includes('.');
            let tries = 0;
            while (options.length < 4 && tries < 50) {
                tries++;
                // Biên độ sai lệch: nhỏ hơn với thập phân để hợp lý
                const spread = isDecimalAns ? 0.1 * (Math.floor(Math.random() * 5) + 1) : (Math.floor(Math.random() * 5) + 1);
                let fake = numAns + spread * (Math.random() < 0.5 ? 1 : -1);
                if (isDecimalAns) {
                    fake = parseFloat(fake.toFixed(1));
                    if (fake <= 0) continue;
                    const fakeStr = fake.toFixed(1);
                    if (!options.includes(fakeStr)) options.push(fakeStr);
                } else {
                    fake = Math.round(fake);
                    if (fake < 0) continue;
                    const fakeStr = String(fake);
                    if (!options.includes(fakeStr)) options.push(fakeStr);
                }
            }

        }
    } else {
        const bankKey = `g${grade}_${normSubject}`;
        const subjectNames = { viet: `Tiếng Việt Lớp ${grade}`, science: `Khoa Học Lớp ${grade}`, tech: `Tin Học Lớp ${grade}` };
        labelPrefix = subjectNames[normSubject] || `Môn Lớp ${grade}`;

        candidate = pickQuizQuestion(bankKey);
        if (candidate) {
            question = candidate.q || candidate.sentence || "Câu hỏi thám hiểm:";
            ans = String(candidate.a || (candidate.c ? candidate.c[0] : "Đáp án đúng"));
            options = generateRealisticOptions(candidate, ans, normSubject);
        } else {
            const fallbackBank = {
                viet: [
                    { q: "Từ nào viết đúng chính tả?", a: "Sáng sớm", fakes: ["Xáng xớm", "Sáng xớm", "Xáng sớm"] },
                    { q: "Từ nào chỉ hoạt động của học sinh?", a: "Đọc sách", fakes: ["Bàn học", "Xanh tươi", "Đẹp đẽ"] },
                    { q: "Từ trái nghĩa với 'Trung thực' là gì?", a: "Gian dối", fakes: ["Hiền lành", "Cần cù", "Dũng cảm"] }
                ],
                science: [
                    { q: "Cây xanh cần gì nhất để quang hợp?", a: "Ánh sáng mặt trời", fakes: ["Bóng tối", "Nước ngọt", "Gió mạnh"] },
                    { q: "Cơ quan nào giúp con người hô hấp?", a: "Phổi", fakes: ["Dạ dày", "Tim", "Thận"] },
                    { q: "Chất nào tồn tại ở thể khí trong không khí?", a: "Oxy", fakes: ["Sắt", "Nước đá", "Cát"] }
                ],
                tech: [
                    { q: "Bé hãy nhấn tổ hợp phím để CHỌN TẤT CẢ (Select All):", a: "ctrl+a", fakes: ["ctrl+c", "ctrl+v", "ctrl+z"] },
                    { q: "Thiết bị nào dùng để nhập văn bản vào máy tính?", a: "Bàn phím", fakes: ["Màn hình", "Loa", "Máy in"] },
                    { q: "Nút bấm nào trên chuột dùng để chọn đối tượng?", a: "Nút chuột trái", fakes: ["Nút chuột phải", "Con lăn", "Nút nguồn"] }
                ]
            };
            const list = fallbackBank[normSubject] || fallbackBank.viet;
            const item = list[Math.floor(Math.random() * list.length)];
            question = item.q;
            ans = String(item.a);
            options = [ans, ...item.fakes.map(x => String(x))];
        }
    }

    if (!question) {
        question = "Phép tính: 5 + 3 = ?";
        ans = "8";
        options = ["8", "7", "9", "6"];
    }

    const isMapTask   = activeTask && (activeTask.type === 'map' || activeTask.type === 'boss' || activeTask.type === 'treasure');
    const isBossTask  = subject === 'boss' || (activeTask && (activeTask.subject === 'boss' || activeTask.type === 'boss'));
    const isTreasureTask = activeTask && activeTask.type === 'treasure';

    const modalCard = document.getElementById('modal-task').querySelector('.modal-card');
    if (isTreasureTask) {
        // Rương: UI màu vàng lung linh
        const bossArena = document.getElementById('boss-arena-container');
        if (bossArena) bossArena.style.display = 'none';
        const cCount = (activeTask && activeTask.correctCount) || 0;
        const tCount = (activeTask && activeTask.target) || 5;
        qTypeLabel.innerHTML = `🪙 RƯƠNG BÁU - ${labelPrefix} (${cCount + 1}/${tCount})`;
        if (modalCard) {
            modalCard.style.background = '';
            modalCard.style.border = '2px solid #f59e0b';
            modalCard.style.boxShadow = '0 0 25px rgba(245,158,11,0.35)';
        }
    } else if (isBossTask) {
        const cCount = (activeTask && activeTask.correctCount) ? activeTask.correctCount : 0;
        const tCount = (activeTask && activeTask.target) ? activeTask.target : 5;
        const damagePerQ = 100 / tCount;
        const currentHp = Math.max(0, Math.round(100 - (cCount * damagePerQ)));
        updateBossUI(currentHp, Math.min(tCount, cCount + 1));
        qTypeLabel.innerText = `ĐẤU TRƯỜNG BOSS - ${labelPrefix} (Đợt ${cCount + 1}/${tCount})`;
        const imgCont = document.getElementById("quest-image-container");
        if (imgCont) imgCont.style.display = "none";
        
        if (modalCard) {
            modalCard.style.background = "";
            modalCard.style.border = "2px solid #e11d48";
            modalCard.style.boxShadow = "0 0 20px rgba(225,29,72,0.3)";
        }
    } else {
        const bossArena = document.getElementById("boss-arena-container");
        if (bossArena) bossArena.style.display = "none";
        if (isMapTask) {
            const cCount = (activeTask && activeTask.correctCount) ? activeTask.correctCount : 0;
            const tCount = (activeTask && activeTask.target) ? activeTask.target : 1;
            qTypeLabel.innerText = `Chặng ${subject.toUpperCase()} - ${labelPrefix} (${cCount + 1}/${tCount})`;
            if (modalCard) {
                modalCard.style.background = "";
                modalCard.style.border = "";
                modalCard.style.boxShadow = "";
            }
        } else {
            const farmTaskTitle = activeTask && activeTask.type === "pest" ? "Tiêu Diệt Sâu" :
                                  activeTask && activeTask.type === "unlock" ? "Mở Khóa Đất" :
                                  activeTask && activeTask.type === "disaster" ? "Lá Chắn Bão" : "Nhiệm Vụ Nông Trại";
            qTypeLabel.innerHTML = `<i class="fa-solid fa-leaf text-green-500 mr-2"></i> ${farmTaskTitle} - ${labelPrefix}`;
            
            const questContainer = document.querySelector(".quest-container");
            const closeBtn = document.getElementById("modal-task-close");
            
            if (modalCard) {
                modalCard.style.setProperty("background", "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)", "important");
                modalCard.style.setProperty("border", "4px solid #22c55e", "important");
                modalCard.style.setProperty("box-shadow", "0 12px 28px rgba(34, 197, 94, 0.35)", "important");
                modalCard.style.setProperty("color", "#1e293b", "important");
            }
            if (questContainer) {
                questContainer.style.setProperty("background", "#ffffff", "important");
                questContainer.style.setProperty("border", "3px solid #bbf7d0", "important");
                questContainer.style.setProperty("box-shadow", "inset 0 2px 8px rgba(0,0,0,0.05)", "important");
                questContainer.style.setProperty("color", "#1e293b", "important");
            }
            if (closeBtn) {
                closeBtn.style.setProperty("color", "#166534", "important");
            }
            qText.style.setProperty("color", "#15803d", "important");
            qText.style.setProperty("font-size", "28px", "important");
            qText.style.setProperty("font-weight", "900", "important");
            qTypeLabel.style.setProperty("color", "#166534", "important");
        }
    }

    activeTask.correctAnswer = ans;
    activeTask.questionText = question;
    
    // Set context for NPC & Learning Objective
    const loBadge = document.getElementById("quest-lo-badge");
    const loText = document.getElementById("quest-lo-text");
    if (loBadge && loText) {
        if (candidate && candidate.lo) {
            loText.innerText = candidate.lo;
            loBadge.style.display = "block";
        } else {
            loBadge.style.display = "none";
        }
    }

    if (candidate) {
        activeTask.ctx = candidate.ctx || (typeof getQuestContext === 'function' ? getQuestContext(`g${grade}_${normSubject}`) : null);
        activeTask.explanation = candidate.educore ? candidate.educore.explanation : `Đáp án đúng là "${ans}".`;
    }
    
    if (!options.includes(ans)) options[0] = ans;
    options = shuffleArray(options);

    // Auto-detect question type if not explicitly set
    let qType = candidate ? (candidate.type || '') : '';
    if (!qType) {
        if (normSubject === 'math') {
            qType = Math.random() < 0.5 ? 'math_input' : 'multiple_choice';
        } else {
            let lowerQ = question.toLowerCase();
            let lowerAns = ans.toLowerCase();
            if (question.includes('___') || question.includes('...')) {
                qType = 'fill_blank';
            } else if (lowerAns.includes('ctrl') || lowerAns.includes('shift') || lowerAns.includes('alt')) {
                qType = 'shortcut';
            } else if (lowerQ.includes('sắp xếp') || lowerQ.includes('ghép câu') || (candidate && candidate.words)) {
                qType = 'reorder';
            } else {
                qType = 'multiple_choice';
            }
        }
    }

    // Anti-repeat: Tránh cùng loại bài liên tiếp ở chế độ Nông Trại
    const isFarmTask = activeTask && !isMapTask && !isBossTask;
    if (isFarmTask && qType === 'multiple_choice' && activeTask.lastQType === 'multiple_choice') {
        if (normSubject === 'math') {
            qType = 'math_input';
        }
    }
    if (activeTask) activeTask.lastQType = qType;

    // Hiển thị câu hỏi phù hợp với từng kiểu bài
    if (qType === 'fill_blank' && candidate && candidate.sentence) {
        // Hiển thị câu văn có dấu ___ nổi bật
        qText.innerHTML = candidate.sentence.replace(/___/g,
            `<span style="color:#f59e0b;font-weight:900;font-size:1.3em;border-bottom:3px solid #f59e0b;padding:0 4px;">___</span>`);
    } else if (qType === 'typing' && candidate) {
        // Hiển thị từ mục tiêu to, rõ ràng để bé nhìn và gõ lại
        qText.innerHTML = `<span style="font-size:0.75em;color:#64748b;font-weight:600;">Gõ lại từ sau:</span><br>
            <span style="font-size:1.4em;font-weight:900;color:#0f172a;letter-spacing:2px;background:#fef3c7;padding:4px 16px;border-radius:10px;display:inline-block;margin-top:4px;">${ans.toUpperCase()}</span>`;
    } else {
        qText.innerText = question;
    }

    if (qType === 'math_input') {
        panel.innerHTML = `
            <div style="text-align: center; margin-top: 10px;">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 8px;">Bé hãy nhẩm tính và nhập kết quả:</div>
                <input type="number" id="math-answer-input" onkeydown="handleMathKeyDown(event)" placeholder="?" style="padding: 10px 15px; font-size: 26px; text-align: center; border: 3px solid #3b82f6; border-radius: 14px; width: 180px; color: #1e3a8a; font-weight: 900; background: #ffffff; box-shadow: 0 4px 12px rgba(59,130,246,0.2);" autocomplete="off">
                <br>
                <button class="btn-submit" onclick="submitCurrentAnswer(document.getElementById('math-answer-input').value.trim(), this)" style="margin-top: 14px; padding: 10px 32px; font-size: 16px; border-radius: 12px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(37,99,235,0.3);">Đồng ý <i class="fa-solid fa-check ml-1"></i></button>
            </div>
        `;
        setTimeout(() => {
            const input = document.getElementById("math-answer-input");
            if (input) input.focus();
        }, 100);
    } else if (qType === 'typing') {
        const untypedColor = isMapTask ? '#94a3b8' : '#475569';
        const guideColor = isMapTask ? '#94a3b8' : '#475569';
        const bgBox = isMapTask ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)';
        const borderBox = isMapTask ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        
        // Giao diện bàn phím ảo QWERTY gọn gàng cho bé
        let keyboardHTML = '<div class="virtual-keyboard-wrapper" style="margin: 12px auto 6px auto; width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.35); padding: 8px; border-radius: 12px; border: 1.5px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; gap: 4px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);">';
        
        // Row 1
        keyboardHTML += '<div style="display: flex; gap: 3px; justify-content: center;">';
        ['Q','W','E','R','T','Y','U','I','O','P'].forEach(k => {
            keyboardHTML += `<span id="key-${k.toLowerCase()}" class="kb-key" style="flex: 1; min-width: 22px; max-width: 34px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.05); color: #fff; cursor: default; transition: all 0.15s; line-height: 30px; text-transform: uppercase;">${k}</span>`;
        });
        keyboardHTML += '</div>';

        // Row 2
        keyboardHTML += '<div style="display: flex; gap: 3px; justify-content: center;">';
        ['A','S','D','F','G','H','J','K','L'].forEach(k => {
            keyboardHTML += `<span id="key-${k.toLowerCase()}" class="kb-key" style="flex: 1; min-width: 22px; max-width: 34px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.05); color: #fff; cursor: default; transition: all 0.15s; line-height: 30px; text-transform: uppercase;">${k}</span>`;
        });
        keyboardHTML += '</div>';

        // Row 3
        keyboardHTML += '<div style="display: flex; gap: 3px; justify-content: center;">';
        ['Z','X','C','V','B','N','M'].forEach(k => {
            keyboardHTML += `<span id="key-${k.toLowerCase()}" class="kb-key" style="flex: 1; min-width: 22px; max-width: 34px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.05); color: #fff; cursor: default; transition: all 0.15s; line-height: 30px; text-transform: uppercase;">${k}</span>`;
        });
        keyboardHTML += '</div>';

        // Row 4
        keyboardHTML += '<div style="display: flex; gap: 3px; justify-content: center;">';
        keyboardHTML += '<span id="key-space" class="kb-key" style="width: 160px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.4); cursor: default; transition: all 0.15s; line-height: 28px; text-transform: uppercase;">Space</span>';
        keyboardHTML += '</div></div>';

        panel.innerHTML = `
            <div style="text-align: center; margin-top: 10px; display: flex; flex-direction: column; align-items: center;">
                <div style="font-size: 14px; color: ${guideColor}; margin-bottom: 8px; font-weight: bold;">Bé hãy gõ lại chính xác từ bên dưới:</div>
                <div id="typing-feedback-box" class="typing-target-box" style="font-size: 30px; font-weight: 900; margin-bottom: 12px; letter-spacing: 3px; color: #10b981; background: ${bgBox}; padding: 8px 20px; border-radius: 14px; display: inline-block; border: 2px solid ${borderBox};"></div>
                <br>
                <input type="text" id="math-answer-input" oninput="handleTypingInput(event)" onkeydown="handleMathKeyDown(event)" placeholder="Gõ tại đây..." style="padding: 10px 16px; font-size: 20px; text-align: center; border: 3px solid #10b981; border-radius: 14px; width: 90%; max-width: 320px; color: #064e3b; font-weight: bold; background: #ffffff; box-shadow: 0 4px 12px rgba(16,185,129,0.2);" autocomplete="off">
                
                <!-- HƯỚNG DẪN BÀN PHÍM ẢO VÀ NGÓN TAY -->
                <div class="typing-guide-container" style="display: flex; flex-direction: column; align-items: center; width: 100%; margin-top: 8px; gap: 8px;">
                    ${keyboardHTML}
                    
                    <div style="margin-top: 2px;">
                        <svg width="220" height="90" viewBox="0 0 220 90" style="display: block; margin: 0 auto;">
                          <!-- Left Hand -->
                          <g class="hand left-hand" transform="translate(5, 2)">
                            <!-- Palm -->
                            <path class="hand-palm-path" d="M30,75 C20,75 15,55 15,40 C15,30 22,30 28,33 C28,20 35,20 38,25 C38,15 45,15 48,20 C48,17 55,17 57,23 C62,30 65,50 60,70 Z" />
                            <!-- Fingers circles -->
                            <circle id="finger-L5" class="finger-path" cx="16" cy="35" r="5" />
                            <circle id="finger-L4" class="finger-path" cx="28" cy="20" r="5.5" />
                            <circle id="finger-L3" class="finger-path" cx="42" cy="14" r="6" />
                            <circle id="finger-L2" class="finger-path" cx="56" cy="20" r="5.5" />
                            <circle id="finger-L1" class="finger-path" cx="68" cy="45" r="6.5" />
                            <text x="38" y="86" class="hand-label">TAY TRÁI</text>
                          </g>
                          <!-- Right Hand -->
                          <g class="hand right-hand" transform="translate(115, 2)">
                            <!-- Palm -->
                            <path class="hand-palm-path" d="M70,75 C80,75 85,55 85,40 C85,30 78,30 72,33 C72,20 65,20 62,25 C62,15 55,15 52,20 C52,17 45,17 43,23 C38,30 35,50 40,70 Z" />
                            <!-- Fingers circles -->
                            <circle id="finger-R1" class="finger-path" cx="32" cy="45" r="6.5" />
                            <circle id="finger-R2" class="finger-path" cx="44" cy="20" r="5.5" />
                            <circle id="finger-R3" class="finger-path" cx="58" cy="14" r="6" />
                            <circle id="finger-R4" class="finger-path" cx="72" cy="20" r="5.5" />
                            <circle id="finger-R5" class="finger-path" cx="84" cy="35" r="5" />
                            <text x="62" y="86" class="hand-label">TAY PHẢI</text>
                          </g>
                        </svg>
                    </div>
                </div>

                <button class="btn-submit" onclick="submitCurrentAnswer(document.getElementById('math-answer-input').value.trim(), this)" style="margin-top: 12px; padding: 10px 40px; font-size: 16px; border-radius: 14px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; font-weight: bold; cursor: pointer; box-shadow: 0 4px 12px rgba(16,185,129,0.35);">Đồng ý <i class="fa-solid fa-check ml-1"></i></button>
            </div>
        `;
        setTimeout(() => {
            const input = document.getElementById("math-answer-input");
            if (input) {
                input.focus();
                const feedbackBox = document.getElementById('typing-feedback-box');
                if (feedbackBox) {
                    const target = activeTask.correctAnswer || '';
                    feedbackBox.innerHTML = target.split('').map(ch => `<span class="typed-untyped" style="color: ${untypedColor} !important; opacity: 0.65;">${ch}</span>`).join('');
                }
                // Gọi updateTypingGuide để highlight ký tự đầu tiên ngay khi mở
                if (typeof updateTypingGuide === 'function') {
                    updateTypingGuide();
                }
            }
        }, 100);
    } else if (qType === 'reorder') {
        let wordList = (candidate && candidate.words) ? [...candidate.words] : ans.split(/\s+/);
        wordList = shuffleArray(wordList);
        let selectedWords = [];

        panel.innerHTML = `
            <div style="text-align: center; margin-top: 10px;">
                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Chạm vào từng từ theo đúng thứ tự để ghép câu:</div>
                <div id="reorder-answer-area" style="min-height: 48px; padding: 8px 12px; background: rgba(15,23,42,0.6); border: 2px dashed rgba(148,163,184,0.4); border-radius: 12px; margin-bottom: 14px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center;">
                    <span style="font-size: 13px; color: #64748b; font-style: italic;">Chạm vào các từ bên dưới...</span>
                </div>
                <div id="reorder-words-pool" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 14px;"></div>
                <button class="btn-submit" id="btn-reorder-submit" style="padding: 10px 32px; font-size: 16px; border-radius: 12px; background: linear-gradient(135deg, #a855f7, #7e22ce); color: white; border: none; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(168,85,247,0.3);">Đồng ý <i class="fa-solid fa-check ml-1"></i></button>
            </div>
        `;

        const poolEl = document.getElementById("reorder-words-pool");
        const ansAreaEl = document.getElementById("reorder-answer-area");

        function renderReorderState() {
            ansAreaEl.innerHTML = "";
            if (selectedWords.length === 0) {
                ansAreaEl.innerHTML = `<span style="font-size: 13px; color: #64748b; font-style: italic;">Chạm vào các từ bên dưới...</span>`;
            } else if (qType === 'true_false') {
        qTypeLabel.innerText = 'Dạng: Đúng / Sai';
        qTypeLabel.style.color = '#10b981';
        
        let html = '<div class="tf-container" style="display: flex; gap: 20px; justify-content: center; padding: 20px;">';
        html += '<button class="tf-btn btn-true" onclick="submitCurrentAnswer(\'Đúng\', this)">ĐÚNG</button>';
        html += '<button class="tf-btn btn-false" onclick="submitCurrentAnswer(\'Sai\', this)">SAI</button>';
        html += '</div>';
        panel.innerHTML = html;
        
    } else if (qType === 'find_error') {
        qTypeLabel.innerText = 'Dạng: Tìm lỗi sai';
        qTypeLabel.style.color = '#f59e0b';
        qText.style.display = 'none';
        
        let html = '<div class="find-error-container">';
        html += '<div class="fe-instruction" style="font-weight:600; margin-bottom: 12px; color: #4b5563;">Hãy bấm vào từ bị sai trong câu dưới đây:</div>';
        html += '<div class="fe-sentence" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 10px;">';
        const words = candidate.words || question.split(' ');
        words.forEach(w => {
            html += '<button class="fe-word" onclick="submitCurrentAnswer(\'' + w.replace(/'/g, "\\'") + '\', this)">' + w + '</button>';
        });
        html += '</div></div>';
        panel.innerHTML = html;
        
    } else if (qType === 'categorize') {
        qTypeLabel.innerText = 'Dạng: Phân loại';
        qTypeLabel.style.color = '#8b5cf6';
        qText.style.display = 'none';
        
        let html = '<div class="categorize-container" style="text-align: center;">';
        html += '<div class="cat-item-to-sort">' + question + '</div>';
        html += '<div class="cat-buckets" style="display: flex; justify-content: space-around; gap: 15px;">';
        
        let categories = options.length >= 2 ? options : (candidate.c || []);
        categories.slice(0, 2).forEach(cat => {
            html += '<button class="cat-bucket" onclick="submitCurrentAnswer(\'' + cat.replace(/'/g, "\\'") + '\', this)">';
            html += '<div class="cat-bucket-icon" style="font-size: 30px; margin-bottom: 8px;">🛒</div>';
            html += '<div class="cat-bucket-name" style="font-weight: bold; color: #374151;">' + cat + '</div>';
            html += '</button>';
        });
        
        html += '</div></div>';
        panel.innerHTML = html;
        
    } else {
                selectedWords.forEach((word, idx) => {
                    const chip = document.createElement("button");
                    chip.style.cssText = "padding: 6px 14px; background: #a855f7; color: white; font-weight: bold; border-radius: 20px; font-size: 14px; border: none; cursor: pointer;";
                    chip.innerText = word + " ✕";
                    chip.onclick = () => {
                        selectedWords.splice(idx, 1);
                        renderReorderState();
                    };
                    ansAreaEl.appendChild(chip);
                });
            }

            poolEl.innerHTML = "";
            wordList.forEach((word, idx) => {
                const countInAns = selectedWords.filter(w => w === word).length;
                const countInList = wordList.filter(w => w === word).length;
                if (countInAns < countInList) {
                    const chip = document.createElement("button");
                    chip.style.cssText = "padding: 8px 16px; background: #334155; color: #f8fafc; font-weight: bold; border-radius: 12px; font-size: 15px; border: 1px solid #475569; cursor: pointer; transition: all 0.2s;";
                    chip.innerText = word;
                    chip.onclick = () => {
                        selectedWords.push(word);
                        renderReorderState();
                    };
                    poolEl.appendChild(chip);
                }
            });
        }

        renderReorderState();

        document.getElementById("btn-reorder-submit").onclick = () => {
            const constructed = selectedWords.join(" ");
            if (isMapTask) {
                checkMapMultipleChoice(constructed, document.getElementById("btn-reorder-submit"));
            } else {
                verifyChoiceAnswer(constructed);
            }
        };
    } else if (qType === 'matching') {
        const pairs = (candidate && candidate.pairs) ? candidate.pairs : [];
        if (pairs.length === 0) {
            // Fallback if missing pairs
            verifyChoiceAnswer(ans);
            return;
        }
        
        let leftItems = shuffleArray(pairs.map(p => p.left));
        let rightItems = shuffleArray(pairs.map(p => p.right));
        let selectedLeft = null;
        let matchedCount = 0;
        
        panel.innerHTML = `
            <div style="text-align: center; margin-top: 10px;">
                <div style="font-size: 14px; color: #94a3b8; margin-bottom: 12px; font-style: italic;">Chạm vào một mục bên trái, sau đó chạm vào mục tương ứng bên phải để ghép cặp:</div>
                <div style="display: flex; justify-content: center; gap: 20px; align-items: stretch;">
                    <div id="match-left-col" style="display: flex; flex-direction: column; gap: 10px;"></div>
                    <div id="match-right-col" style="display: flex; flex-direction: column; gap: 10px;"></div>
                </div>
            </div>
        `;
        
        const leftCol = document.getElementById("match-left-col");
        const rightCol = document.getElementById("match-right-col");
        
        const cardStyle = "min-width: 130px; padding: 12px 8px; background: #334155; border: 2px solid #475569; border-radius: 12px; color: #f8fafc; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
        
        leftItems.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "btn-mc-option";
            btn.style.cssText = cardStyle;
            btn.innerText = item;
            btn.onclick = () => {
                if (btn.disabled) return;
                // Deselect others
                Array.from(leftCol.children).forEach(b => {
                    if (!b.disabled) { b.style.borderColor = "#475569"; b.style.background = "#334155"; }
                });
                selectedLeft = item;
                btn.style.borderColor = "#3b82f6";
                btn.style.background = "#1e3a8a";
            };
            leftCol.appendChild(btn);
        });
        
        rightItems.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "btn-mc-option";
            btn.style.cssText = cardStyle;
            btn.innerText = item;
            btn.onclick = () => {
                if (btn.disabled || !selectedLeft) return;
                
                const isMatch = pairs.some(p => p.left === selectedLeft && p.right === item);
                if (isMatch) {
                    btn.style.borderColor = "#10b981";
                    btn.style.background = "#064e3b";
                    btn.disabled = true;
                    
                    const lBtn = Array.from(leftCol.children).find(b => b.innerText === selectedLeft);
                    if (lBtn) {
                        lBtn.style.borderColor = "#10b981";
                        lBtn.style.background = "#064e3b";
                        lBtn.disabled = true;
                    }
                    selectedLeft = null;
                    matchedCount++;
                    if (matchedCount === pairs.length) {
                        setTimeout(() => {
                            if (isMapTask) checkMapMultipleChoice(ans, btn);
                            else verifyChoiceAnswer(ans);
                        }, 500);
                    }
                } else {
                    const originalBg = btn.style.background;
                    const originalBorder = btn.style.borderColor;
                    btn.style.borderColor = "#e11d48";
                    btn.style.background = "#881337";
                    setTimeout(() => {
                        btn.style.borderColor = originalBorder;
                        btn.style.background = originalBg;
                    }, 500);
                }
            };
            rightCol.appendChild(btn);
        });
    } else if (qType === 'shortcut') {
        const grid = document.createElement("div");
        grid.className = "mc-grid";
        
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "btn-mc-option";
            btn.innerHTML = `<i class="fa-solid fa-keyboard mr-2 text-cyan-400"></i><code style="font-family: monospace; font-weight: 800; font-size: 16px; letter-spacing: 1px;">${opt}</code>`;
            btn.onclick = function() {
                if (isMapTask) {
                    checkMapMultipleChoice(opt, btn);
                } else {
                    verifyChoiceAnswer(opt);
                }
            };
            grid.appendChild(btn);
        });
        
        panel.appendChild(grid);
    } else if (qType === 'fill_blank') {
        const grid = document.createElement("div");
        grid.className = "mc-grid";
        
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "btn-mc-option";
            btn.innerHTML = `<span style="font-weight: 900; color: #ffffff; font-size: 17px; text-shadow: 0 1px 3px rgba(0,0,0,0.4);">${opt}</span>`;

            btn.onclick = function() {
                if (isMapTask) {
                    checkMapMultipleChoice(opt, btn);
                } else {
                    verifyChoiceAnswer(opt);
                }
            };
            grid.appendChild(btn);
        });
        
        panel.appendChild(grid);
    } else {
        const grid = document.createElement("div");
        grid.className = "mc-grid";
        
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "btn-mc-option";
            btn.innerText = opt;
            btn.onclick = function() {
                if (isMapTask) {
                    checkMapMultipleChoice(opt, btn);
                } else {
                    verifyChoiceAnswer(opt);
                }
            };
            grid.appendChild(btn);
        });
        
        panel.appendChild(grid);
    }
    
    const submitBtn = document.getElementById("btn-quest-submit");
    if (submitBtn) submitBtn.style.display = "none";
}

window.checkMapMultipleChoice = function(selectedAnswer, btnElement) { return checkMapMultipleChoice(selectedAnswer, btnElement); };

function handleMapQuestFailure() {
    closeTaskModal();
    gameState.mapUnlocked = false; // Trả về màn hình khóa bản đồ ngay lập tức
    saveDataForMode();
    renderMap();
    renderInventory();
    
    let keys = (gameState.inventory && gameState.inventory.mapKey) ? gameState.inventory.mapKey : 0;
    
    let popupContent = `
        <div class="text-center p-3">
            <div class="text-6xl text-rose-500 mb-3 animate-bounce">❌</div>
            <h2 class="text-2xl font-black text-rose-400 mb-2 tracking-wide">THỬ THÁCH THẤT BẠI!</h2>
            <p class="text-white text-sm mb-4 leading-relaxed">
                Ôi không! Bé đã trả lời chưa chính xác. Chuyến thám hiểm chặng này đã dừng lại và <b class="text-amber-400">Bản Đồ đã bị khóa lại</b>!
            </p>
    `;
    
    if (keys > 0) {
        popupContent += `
            <div class="bg-slate-800/80 p-3 rounded-lg border border-amber-500/40 mb-4 text-left">
                <p class="text-amber-300 font-bold text-sm flex items-center gap-2">
                    <i class="fa-solid fa-key text-yellow-300"></i> Bé còn ${keys} Chìa Khóa Bản Đồ!
                </p>
                <p class="text-xs text-slate-300 mt-1">Bé có thể dùng ngay 1 Chìa Khóa để mở lại bản đồ và bắt đầu lại thử thách nhé.</p>
            </div>
            <button class="btn-primary w-full py-3 font-bold text-base flex items-center justify-center gap-2" onclick="closeAlertBox(); unlockMap();">
                <i class="fa-solid fa-key"></i> DÙNG 1 CHÌA KHÓA ĐỂ THỬ LẠI
            </button>
        `;
    } else {
        popupContent += `
            <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 mb-4 text-left">
                <p class="text-slate-300 font-bold text-sm flex items-center gap-2">
                    <i class="fa-solid fa-circle-exclamation text-amber-400"></i> Bé hiện chưa có Chìa Khóa Bản Đồ!
                </p>
                <p class="text-xs text-slate-300 mt-1">
                    Hãy quay về <b>Nông Trại</b>, chăm chỉ gieo hạt, tưới nước và thu hoạch nông sản để tìm chìa khóa rơi ngẫu nhiên nhé!
                </p>
            </div>
            <button class="btn-secondary w-full py-3 font-bold text-base flex items-center justify-center gap-2" onclick="closeAlertBox(); switchTab('farm');">
                <i class="fa-solid fa-wheat-awn"></i> VỀ NÔNG TRẠI TÌM CHÌA KHÓA
            </button>
        `;
    }
    
    popupContent += `</div>`;
    alertBox(popupContent);
}
window.handleMapQuestFailure = handleMapQuestFailure;

window.checkMapMultipleChoice = checkMapMultipleChoice;
function checkMapMultipleChoice(selectedAnswer, btnElement) {
    if (!activeTask) return;
    const isBoss     = (activeTask.subject === 'boss' || activeTask.type === 'boss');
    const isTreasure = (activeTask.type === 'treasure');

    if (String(selectedAnswer).trim().toLowerCase() === String(activeTask.correctAnswer).trim().toLowerCase()) {
        if (btnElement && btnElement.classList) btnElement.classList.add('correct');
        playChime(784, 'triangle', 0.2);
        if (typeof dqOnStreakResult === 'function') dqOnStreakResult(true);

        // Tiến trình ấp thú cưng
        if (typeof progressEgg === 'function') progressEgg();
        
        // Daily Quest: trả lời đúng
        const taskSubject = activeTask ? activeTask.subject : null;
        if (typeof dqOnCorrectAnswer === 'function') dqOnCorrectAnswer(taskSubject);
        
        // Perfect quest (không sai lần nào)
        if (activeTask && (activeTask.errors === undefined || activeTask.errors === 0)) {
            if (typeof dqOnPerfectQuest === 'function') dqOnPerfectQuest();
        }

        if (btnElement && btnElement.parentElement) {
            const btns = btnElement.parentElement.querySelectorAll('.btn-mc-option, button');
            btns.forEach(b => b.disabled = true);
        }

        activeTask.correctCount = (activeTask.correctCount || 0) + 1;

        if (isTreasure) {
            // ── Rương kho báu: đúng ──────────────────────────────────
            const remaining = activeTask.target - activeTask.correctCount;
            if (remaining > 0) {
                showToast(`✨ CHÍNH XÁC! Còn ${remaining} câu nữa để mở rương!`, 1800, 'success');
                setTimeout(() => {
                    if (!activeTask) return;
                    // Lấy môn học tiếp theo trong danh sách đã shuffle
                    const nextSubject = activeTask.treasureSubjects[activeTask.correctCount] || 'math';
                    generateSpecificSubjectQuestion(nextSubject);
                }, 1000);
            } else {
                // Hoàn thành! Mở rương
                showToast('🪙 XUẤT SẮC! Bé đã mở được rương kho báu!', 2500, 'success');
                setTimeout(() => openTreasureChest(), 1000);
            }

        } else if (isBoss) {
            let damagePerQ = 100 / (activeTask.target || 5);
            let currentHp = Math.max(0, Math.round(100 - (activeTask.correctCount * damagePerQ)));

            // Hiệu ứng rung boss & popup số máu bị trừ (-HP)
            playBossHitAnimation(Math.round(damagePerQ));

            // Hiệu ứng rung màn hình nhiệm vụ (modal card)
            const modal = document.getElementById("modal-task")?.querySelector(".modal-card");
            if (modal) {
                modal.classList.add("boss-damage-shake");
                setTimeout(() => modal.classList.remove("boss-damage-shake"), 300);
            }

            playChime(180, 'sawtooth', 0.3);

            const isArenaBoss = (typeof bossState !== 'undefined' && bossState && bossState.active);
            if (isArenaBoss) {
                bossState.hp = currentHp;
                bossState.stage = activeTask.correctCount + 1;
                updateBossHud();
            } else {
                updateBossUI(currentHp, Math.min(activeTask.target || 5, activeTask.correctCount + 1));
            }

            showToast(`⚔️ ĐÁNH TRÚNG BOSS! Boss bị trừ ${Math.round(damagePerQ)} HP (Còn ${currentHp}/100 HP)!`, 2200, 'success');

            if (activeTask.correctCount < activeTask.target && currentHp > 0) {
                const _subject = activeTask.subject;
                setTimeout(() => {
                    if (!activeTask) return;
                    generateSpecificSubjectQuestion(_subject);
                }, 1100);
            } else {
                if (isArenaBoss) {
                    endBossBattle(true);
                } else {
                    if (activeTask.timerInterval) clearInterval(activeTask.timerInterval);
                    gameState.inventory.s11 = (gameState.inventory.s11 || 0) + 1;
                    gameState.coins += 300;
                    gameState.xp += 200;
                    saveDataForMode();
                    updateHeaderStats();
                    renderInventory();
                    closeTaskModal();
                }
            }
        } else {
            // ── Chặng thông thường ────────────────────────────────────
            if (activeTask.correctCount < activeTask.target) {
                showToast(`Chính xác! Cố lên, còn ${activeTask.target - activeTask.correctCount} câu nữa!`, 2000, 'success');
                setTimeout(() => {
                    generateSpecificSubjectQuestion(activeTask.subject);
                }, 1000);
            } else {
                if (!gameState.mapProgress) gameState.mapProgress = { eco: 1, cyber: 1, magic: 1 };
                const current = gameState.mapProgress[activeTask.worldKey] || 1;
                if (activeTask.nodeId === current) {
                    gameState.mapProgress[activeTask.worldKey] = current + 1;
                }
                showToast(`Tuyệt vời! Bé đã vượt qua chặng ${activeTask.nodeId}!`, 3000, 'success');
                saveDataForMode();
                closeTaskModal();
                renderMap();
            }
        }
    } else {
        // ── Trả lời sai ──────────────────────────────────────────────
        if (btnElement && btnElement.classList) btnElement.classList.add('wrong');
        playChime(150, 'sawtooth', 0.4);
        if (typeof dqOnStreakResult === 'function') dqOnStreakResult(false);
        
        // Reset tiến trình ấp trứng
        if (typeof gameState !== 'undefined') {
            gameState.eggProgress = 0;
            if (typeof renderHatchingEgg === 'function') renderHatchingEgg();
        }

        if (btnElement && btnElement.parentElement) {
            const btns = btnElement.parentElement.querySelectorAll('.btn-mc-option, button');
            btns.forEach(b => b.disabled = true);
        }

        if (isTreasure) {
            // Sai trong rương → reset về 0, xáo trộn lại câu hỏi
            const oldCount = activeTask.correctCount;
            activeTask.correctCount = 0;
            activeTask.treasureSubjects = shuffleArray(['math', 'viet', 'science', 'tech', 'math']);
            recentQuestionsQueue = []; // Xóa lịch sử để câu hỏi luôn mới
            sessionQuestionPools.map = []; // Reset pool map trong treasure
            showToast(`❌ Trả lời sai! Phải làm lại từ đầu (đã ${oldCount} câu)`, 2500, 'error');
            setTimeout(() => {
                if (!activeTask) return;
                generateSpecificSubjectQuestion(activeTask.treasureSubjects[0]);
            }, 1200);

        } else if (isBoss) {
            const isArenaBoss = (typeof bossState !== 'undefined' && bossState && bossState.active);
            if (isArenaBoss) {
                bossState.timer = Math.max(0, bossState.timer - 10);
            } else {
                if (typeof activeTask.timeLeft === 'number') {
                    activeTask.timeLeft = Math.max(0, activeTask.timeLeft - 10);
                }
            }
            const timerEl = document.getElementById('boss-timer');
            if (timerEl) {
                const currentSec = isArenaBoss ? bossState.timer : activeTask.timeLeft;
                timerEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${currentSec}s`;
                timerEl.style.color = '#dc2626';
                timerEl.style.transform = 'scale(1.25)';
                setTimeout(() => { timerEl.style.transform = 'scale(1)'; }, 350);
            }
            showToast('⚠️ TRẢ LỜI CHƯA ĐÚNG! Bị trừ 10 giây thời gian!', 2500, 'error');
            setTimeout(() => {
                generateSpecificSubjectQuestion(activeTask.subject);
            }, 1000);
        } else {
            setTimeout(() => {
                handleMapQuestFailure();
            }, 600);
        }
    }
}


function playSound(type) {
    if (type === 'coin') {
        playChime(987, 'sine', 0.2);
    } else if (type === 'error') {
        playChime(150, 'sawtooth', 0.4);
    } else if (type === 'success') {
        playChime(784, 'triangle', 0.2);
    } else {
        playChime(440, 'sine', 0.2);
    }
}
window.playSound = playSound;

// ─── Expose all functions needed by inline onclick handlers ───────────────────
// (file uses type="module" so functions are not auto-global)
window.startMapQuest          = startMapQuest;
window.unlockMap              = unlockMap;
window.closeAlertBox          = closeAlertBox;
window.claimDailyReward       = claimDailyReward;
window.sellCrop               = sellCrop;
window.buySeed                = buySeed;
window.buyDecoration          = buyDecoration;
window.upgradeBuilding        = upgradeBuilding;
window.verifyChoiceAnswer     = verifyChoiceAnswer;
window.submitCurrentAnswer    = submitCurrentAnswer;
window.continueAfterExplanation = continueAfterExplanation;
window.handleTypingInput      = handleTypingInput;
window.handleMathKeyDown      = handleMathKeyDown;
window.updateTypingGuide      = updateTypingGuide;
window.openTreasureChest      = openTreasureChest;
window.showTreasureReward     = showTreasureReward;

