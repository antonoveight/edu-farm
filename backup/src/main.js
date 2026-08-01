import g1_viet from './data/grade1/viet.json';
import g1_science from './data/grade1/science.json';
import g1_tech from './data/grade1/tech.json';

import g2_viet from './data/grade2/viet.json';
import g2_science from './data/grade2/science.json';
import g2_tech from './data/grade2/tech.json';

import g3_viet from './data/grade3/viet.json';
import g3_science from './data/grade3/science.json';
import g3_tech from './data/grade3/tech.json';

import g4_viet from './data/grade4/viet.json';
import g4_science from './data/grade4/science.json';
import g4_tech from './data/grade4/tech.json';

import g5_viet from './data/grade5/viet.json';
import g5_science from './data/grade5/science.json';
import g5_tech from './data/grade5/tech.json';

const gameAssets = {
            eco: {
                name: "Đảo Sinh Thái",
                styleClass: "theme-eco",
                seeds: {
                    s1: { id: "s1", name: "Cải Ngọt", emoji: "🥬", color: "#10b981", reward: 20 },
                    s2: { id: "s2", name: "Cà Tomato", emoji: "🍅", color: "#f43f5e", reward: 55 },
                    s3: { id: "s3", name: "Dưa Hấu", emoji: "🍉", color: "#22c55e", reward: 120 }
                }
            },
            cyber: {
                name: "Trạm Công Nghệ",
                styleClass: "theme-cyber",
                seeds: {
                    s1: { id: "s1", name: "Pin Mini", emoji: "🔋", color: "#06b6d4", reward: 20 },
                    s2: { id: "s2", name: "Led Module", emoji: "💡", color: "#38bdf8", reward: 55 },
                    s3: { id: "s3", name: "Chip AI", emoji: "🌌", color: "#a855f7", reward: 120 }
                }
            },
            magic: {
                name: "Khu Rừng Phép Thuật",
                styleClass: "theme-magic",
                seeds: {
                    s1: { id: "s1", name: "Hoa Tiên", emoji: "🌸", color: "#f43f5e", reward: 20 },
                    s2: { id: "s2", name: "Nấm Sáng", emoji: "🍄", color: "#fbbf24", reward: 55 },
                    s3: { id: "s3", name: "Tim Thần", emoji: "🔮", color: "#d946ef", reward: 120 }
                }
            }
        };

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
                    boss: "Boss xuất hiện! Giải toán thật nhanh để tấn công! ⚔️"
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
                    boss: "Chế độ bạo kích! Tính toán nhanh để diệt Boss! ⚔️"
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
                    acid_storm: "Bão hắc hắc ám tới! Niệm chú Lá Chắn ngay! ⛈️",
                    egg: "Trứng rồng đang tích tụ ma pháp để nở đấy! 🥚",
                    boss: "Đại chiến nổ ra! Giải toán triệu hồi sấm sét! ⚔️"
                }
            }
        };

        /* TRẠNG THÁI TOÀN CỤC */
        let selectedGrade = null;
        let selectedWorld = null;
        let selectedTool = null; // s1, s2, s3, hoặc water
        let activeTab = "farm";
        let activeTask = null; // Khai báo toàn cục để tránh lỗi ReferenceError

        // Hàng đợi lịch sử câu hỏi để ngăn lặp lại (lưu tối đa 15 câu gần nhất)
        let recentQuestionsQueue = [];
        const QUESTION_HISTORY_LIMIT = 15;

        // Thêm câu hỏi vào lịch sử
        function addToQuestionHistory(questionKey) {
            if (!recentQuestionsQueue.includes(questionKey)) {
                recentQuestionsQueue.push(questionKey);
            }
            if (recentQuestionsQueue.length > QUESTION_HISTORY_LIMIT) {
                recentQuestionsQueue.shift();
            }
        }

        // Kiểm tra câu hỏi đã được hỏi gần đây chưa
        function isRecentQuestion(questionKey) {
            return recentQuestionsQueue.includes(questionKey);
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
                s1: 3,
                s2: 1,
                s3: 0,
                water: 5,
                // Các nông sản đã thu hoạch (lưu vào kho để chờ bán)
                harvested_s1: 0,
                harvested_s2: 0,
                harvested_s3: 0,
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
            unlockedPets: [], // list of pet ids
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

            const spaceLeft = elemRect.left - containerRect.left;
            const spaceRight = containerRect.right - elemRect.right;
            const spaceAbove = elemRect.top - containerRect.top;

            let left, top;
            let placement = "above"; // Mặc định

            const minSpaceAboveNeeded = 65 + boxHeight + 15; // 190px
            // Nếu phần tử thuộc Sidebar (bên phải), hoặc không đủ khoảng trống phía trên
            if (spaceLeft > containerRect.width - 320) {
                placement = "left"; // Để trợ lý nằm bên trái phần tử sidebar
            } else if (spaceAbove < minSpaceAboveNeeded) {
                placement = spaceRight > spaceLeft ? "right" : "left";
            } else {
                placement = "above";
            }

            if (placement === "right") {
                left = elemRect.right - containerRect.left + 15;
                top = elemRect.top - containerRect.top + (elemRect.height / 2) - (boxHeight / 2);
            } else if (placement === "left") {
                left = elemRect.left - containerRect.left - boxWidth - 15;
                top = elemRect.top - containerRect.top + (elemRect.height / 2) - (boxHeight / 2);
            } else {
                left = elemRect.left - containerRect.left + (elemRect.width / 2) - (boxWidth / 2);
                top = elemRect.top - containerRect.top - boxHeight - 15; 
            }

            // Giới hạn để trợ lý không bay ra ngoài màn hình game
            left = Math.max(15, Math.min(containerRect.width - boxWidth - 15, left));
            top = Math.max(65, Math.min(containerRect.height - boxHeight - 15, top));

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

            element.classList.add("guide-highlight");
            currentHighlightedElement = element;

            const pointer = document.getElementById("guide-pointer");
            const container = document.getElementById("screen-game");
            if (pointer && container) {
                const containerRect = container.getBoundingClientRect();
                const elemRect = element.getBoundingClientRect();

                const pointerWidth = 24; 
                const pointerHeight = 24;

                const spaceLeft = elemRect.left - containerRect.left;
                const spaceRight = containerRect.right - elemRect.right;
                const spaceAbove = elemRect.top - containerRect.top;

                const boxHeight = 110;
                let placement = "above";

                const minSpaceAboveNeeded = 65 + boxHeight + 15; // 190px
                if (spaceLeft > containerRect.width - 320) {
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
                    left = elemRect.right - containerRect.left + 5;
                    top = elemRect.top - containerRect.top + (elemRect.height / 2) - 12;
                    pointerEmoji = "👈";
                    bounceClass = "pointer-bounce-horizontal-left";
                } else if (placement === "left") {
                    left = elemRect.left - containerRect.left - pointerWidth - 5;
                    top = elemRect.top - containerRect.top + (elemRect.height / 2) - 12;
                    pointerEmoji = "👉";
                    bounceClass = "pointer-bounce-horizontal-right";
                } else {
                    left = elemRect.left - containerRect.left + (elemRect.width / 2) - (pointerWidth / 2);
                    top = elemRect.top - containerRect.top - 28; 
                    pointerEmoji = "👇";
                    bounceClass = "pointer-bounce-vertical";
                }

                left = Math.max(5, Math.min(containerRect.width - pointerWidth - 5, left));
                top = Math.max(60, Math.min(containerRect.height - pointerHeight - 10, top));

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

            // Nếu tắt hướng dẫn, hoặc đang ẩn màn hình game, hoặc không ở tab nông trại
            if (!gameState.guideEnabled || document.getElementById("screen-game").classList.contains("screen-hidden") || activeTab !== "farm") {
                resetAssistantPosition();
                clearHighlight();
                if (currentGuideState !== "disabled") {
                    currentGuideState = "disabled";
                    // Quay về hiển thị hội thoại cơ bản
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

            // Bất kể bật hay tắt hướng dẫn, click vào vẫn hiển thị nhắc nhở
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
        function startGame() {
            if (!selectedGrade || !selectedWorld) return;

            // Đổi Theme Class Body
            document.body.className = gameAssets[selectedWorld].styleClass;

            // Thiết lập tên hiển thị
            document.getElementById("display-world-name").innerText = gameAssets[selectedWorld].name;
            document.getElementById("display-grade-name").innerText = `Học sinh Lớp ${selectedGrade}`;

            // Nạp dữ liệu lưu trữ cực kỳ an toàn
            loadDataForMode();

            // Chuyển màn hình
            document.getElementById("screen-welcome").classList.add("screen-hidden");
            document.getElementById("screen-game").classList.remove("screen-hidden");
            playChime(659, 'triangle', 0.3);

            // Cập nhật giao diện
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

            // Đồng bộ trạng thái Trợ lý Hướng dẫn
            updateGuideButtonUI();
            updateGuide();

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
            if (gameState.inventory.s1 === undefined) gameState.inventory.s1 = 3;
            if (gameState.inventory.s2 === undefined) gameState.inventory.s2 = 1;
            if (gameState.inventory.s3 === undefined) gameState.inventory.s3 = 0;
            if (gameState.inventory.water === undefined) gameState.inventory.water = 5;
            if (gameState.inventory.harvested_s1 === undefined) gameState.inventory.harvested_s1 = 0;
            if (gameState.inventory.harvested_s2 === undefined) gameState.inventory.harvested_s2 = 0;
            if (gameState.inventory.harvested_s3 === undefined) gameState.inventory.harvested_s3 = 0;
            if (!Array.isArray(gameState.inventory.decorations)) gameState.inventory.decorations = [];

            if (!Array.isArray(gameState.plots) || gameState.plots.length !== 6) {
                gameState.plots = [
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 },
                    { status: "locked", cost: 100 },
                    { status: "locked", cost: 250 },
                    { status: "locked", cost: 500 }
                ];
            } else {
                // Sửa lỗi các ô đất bị thiếu thuộc tính từ bản v1.0
                gameState.plots = gameState.plots.map((plot, i) => {
                    if (!plot || typeof plot !== 'object') {
                        return i < 3 
                            ? { status: "empty", prog: 0, seed: null, water: true, pest: false, errorCount: 0 }
                            : { status: "locked", cost: i === 3 ? 100 : (i === 4 ? 250 : 500) };
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
                    harvested_s1: 0,
                    harvested_s2: 0,
                    harvested_s3: 0,
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
                eggProgress: 0,
                unlockedPets: [],
                activePet: null,
                weather: "sunny",
                guideEnabled: true,
                shownAlerts: {}
            };
        }

        function switchTab(tabId) {
            activeTab = tabId;
            document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
            document.getElementById(`tab-${tabId}`).classList.add("active");

            // Ẩn toàn bộ vùng left workspace
            document.getElementById("tab-farm-content").classList.add("hidden");
            document.getElementById("tab-market-content").classList.add("hidden");
            document.getElementById("tab-pet-content").classList.add("hidden");
            document.getElementById("tab-arena-content").classList.add("hidden");

            // Hiển thị vùng được chọn
            document.getElementById(`tab-${tabId}-content`).classList.remove("hidden");
            playChime(500);

            if (tabId === "market") {
                updateMarketUI();
            } else if (tabId === "pet") {
                renderHatchingEgg();
                renderPetsList();
                triggerAssistantSpeech("egg");
            } else if (tabId === "arena") {
                triggerAssistantSpeech("boss");
            } else if (tabId === "farm") {
                renderPlots();
            }

            // Đồng bộ lại Trợ lý hướng dẫn
            updateGuide();
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
                    
                    if (plot.prog >= 100) {
                        textLabel = `${seedName} Chín! 🎉`;
                    } else if (plot.pest) {
                        textLabel = "CÓ SÂU PHÁ BẢO! 🐛";
                    } else if (!plot.water) {
                        textLabel = "KHÔ CẰN! 🏜️";
                    } else {
                        // Tính đếm ngược dựa theo tốc độ thời tiết
                        let speed = 2;
                        if (gameState.weather === "rainy") speed = 3;
                        const remainingSecs = Math.ceil((100 - plot.prog) / speed);
                        textLabel = `${seedName} (${remainingSecs}s)`;
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
                        <span>${plot.status === 'planted' ? plot.prog + '%' : ''}</span>
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

            // Thêm vào kho nông sản thu hoạch ảo
            if (seedType === "s1") gameState.inventory.harvested_s1++;
            else if (seedType === "s2") gameState.inventory.harvested_s2++;
            else if (seedType === "s3") gameState.inventory.harvested_s3++;
            
            // Tăng XP và lên cấp độ
            gameState.xp += 15;
            if (gameState.xp >= gameState.level * 80) {
                gameState.xp = 0;
                gameState.level++;
                playChime(1200, 'sine', 0.4);
                alertBox(`Chúc mừng bé thăng lên Cấp ${gameState.level}! 🎉`);
            } else {
                playChime(987, 'sine', 0.25);
            }

            // Hoàn nguyên trạng thái đất trống
            plot.status = "empty";
            plot.seed = null;
            plot.prog = 0;
            plot.errorCount = 0;
            
            saveDataForMode();
            updateHeaderStats();
            renderPlots();
            updateGuide();
            
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

            const items = [
                { id: "s1", name: gameAssets[selectedWorld].seeds.s1.name, emoji: gameAssets[selectedWorld].seeds.s1.emoji, desc: "Hạt giống Dễ" },
                { id: "s2", name: gameAssets[selectedWorld].seeds.s2.name, emoji: gameAssets[selectedWorld].seeds.s2.emoji, desc: "Hạt giống Vừa" },
                { id: "s3", name: gameAssets[selectedWorld].seeds.s3.name, emoji: gameAssets[selectedWorld].seeds.s3.emoji, desc: "Hạt giống Khó" },
                { id: "water", name: "Bình Nước", emoji: "💧", desc: "Giữ ẩm đất" }
            ];

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
            document.getElementById("stat-coins").innerText = gameState.coins;
            document.getElementById("stat-level").innerText = `LV ${gameState.level}`;
        }

        let currentMarketPrices = { s1: 15, s2: 40, s3: 90 };

        function updateMarketUI() {
            // Hiển thị số lượng nông sản lưu trong kho
            document.getElementById("crop-label-s1").innerText = gameAssets[selectedWorld].seeds.s1.name;
            document.getElementById("crop-label-s2").innerText = gameAssets[selectedWorld].seeds.s2.name;
            document.getElementById("crop-label-s3").innerText = gameAssets[selectedWorld].seeds.s3.name;

            const stockS1 = gameState.inventory.harvested_s1 || 0;
            const stockS2 = gameState.inventory.harvested_s2 || 0;
            const stockS3 = gameState.inventory.harvested_s3 || 0;

            document.getElementById("crop-qty-s1").innerText = stockS1;
            document.getElementById("crop-qty-s2").innerText = stockS2;
            document.getElementById("crop-qty-s3").innerText = stockS3;

            // Đồng bộ bộ chọn số lượng bán
            const inputS1 = document.getElementById("sell-qty-s1");
            const inputS2 = document.getElementById("sell-qty-s2");
            const inputS3 = document.getElementById("sell-qty-s3");

            if (inputS1) {
                inputS1.max = stockS1 || 1;
                if (parseInt(inputS1.value) > stockS1) inputS1.value = Math.max(1, stockS1);
            }
            if (inputS2) {
                inputS2.max = stockS2 || 1;
                if (parseInt(inputS2.value) > stockS2) inputS2.value = Math.max(1, stockS2);
            }
            if (inputS3) {
                inputS3.max = stockS3 || 1;
                if (parseInt(inputS3.value) > stockS3) inputS3.value = Math.max(1, stockS3);
            }

            // Vẽ biểu đồ cột động
            const chartContainer = document.getElementById("market-chart-bars");
            if (!chartContainer) return;
            chartContainer.innerHTML = "";

            const crops = [
                { id: "s1", name: gameAssets[selectedWorld].seeds.s1.name, price: currentMarketPrices.s1, maxPrice: 30 },
                { id: "s2", name: gameAssets[selectedWorld].seeds.s2.name, price: currentMarketPrices.s2, maxPrice: 80 },
                { id: "s3", name: gameAssets[selectedWorld].seeds.s3.name, price: currentMarketPrices.s3, maxPrice: 180 }
            ];

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
                const sellValue = qtyToSell * currentMarketPrices[seedId];
                gameState.coins += sellValue;
                gameState.inventory[harvestedKey] -= qtyToSell;

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
            currentMarketPrices.s1 = Math.floor(Math.random() * 20) + 10;   // 10 -> 30
            currentMarketPrices.s2 = Math.floor(Math.random() * 50) + 30;   // 30 -> 80
            currentMarketPrices.s3 = Math.floor(Math.random() * 100) + 80;  // 80 -> 180

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

            document.getElementById("overlay-boss-battle").classList.remove("hidden");
            generateBossQuest();

            bossState.timerInterval = setInterval(() => {
                bossState.timer--;
                document.getElementById("boss-timer").innerText = `Thời gian: ${bossState.timer}s`;

                if (bossState.timer <= 0) {
                    endBossBattle(false);
                }
            }, 1000);
        }

        function playSoundChimeForBoss() {
            playChime(150, 'sawtooth', 0.5);
            setTimeout(() => playChime(250, 'sawtooth', 0.5), 150);
        }

        function generateBossQuest() {
            const num1 = Math.floor(Math.random() * 9) + 2; // 2 -> 10
            const num2 = Math.floor(Math.random() * 8) + 2; // 2 -> 9
            
            bossState.correctAnswer = num1 * num2;
            document.getElementById("boss-quest-text").innerText = `Tấn công boss bằng sức mạnh phép nhân: ${num1} x ${num2} = ?`;
            document.getElementById("boss-hp-text").innerText = `${bossState.hp}/100`;
            document.getElementById("boss-stage-text").innerText = bossState.stage;
            document.getElementById("boss-hp-bar-fill").style.width = `${bossState.hp}%`;
            document.getElementById("boss-math-input").value = "";
            document.getElementById("boss-math-input").focus();
        }

        function handleBossMathKeyDown(event) {
            if (event.key === "Enter") {
                verifyBossAnswer();
            }
        }

        function verifyBossAnswer() {
            const input = document.getElementById("boss-math-input");
            if (!input) return;

            const val = parseInt(input.value);
            if (val === bossState.correctAnswer) {
                playChime(900, 'triangle', 0.25);
                // Trả lời đúng -> Tấn công boss
                bossState.hp -= 20;
                bossState.stage++;
                if (bossState.hp <= 0) {
                    endBossBattle(true);
                } else {
                    generateBossQuest();
                }
            } else {
                // Trả lời sai -> Phạt trừ thời gian
                playChime(120, 'sawtooth', 0.4);
                bossState.timer = Math.max(0, bossState.timer - 5);
                input.value = "";
                input.focus();
            }
        }

        function endBossBattle(isVictory) {
            clearInterval(bossState.timerInterval);
            document.getElementById("overlay-boss-battle").classList.add("hidden");
            bossState.active = false;

            if (isVictory) {
                // Thưởng chiến thắng boss tuần
                gameState.coins += 150;
                gameState.inventory.water += 5;
                addXPArena(100);
                saveDataForMode();
                updateHeaderStats();
                renderInventory();
                alertBox("Bé đã đánh bại Sâu Róm Khổng Lồ và bảo vệ thành công điền trang! Thưởng nóng: +150🪙 xu vàng & 5 bình nước! 🏆");
            } else {
                alertBox("Thử thách bạo liệt đã hết giờ! Bé hãy ôn luyện kỹ phép nhân rồi thử thách lại lần sau nhé!");
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
            // Khởi tạo nhiệm vụ tri thức
            activeTask = {
                type: type,      // "farm", "pest", "unlock", "disaster"
                targetId: targetId, // s1, s2, s3, water hoặc chỉ mục của ô đất
                errors: 0,
                correctAnswer: null,
                questionText: ""
            };

            generateCurriculumQuestion();

            document.getElementById("task-modal-title").innerText = 
                type === "pest" ? "Tiêu Diệt Sâu Phá Hoại 🐛" :
                type === "unlock" ? "Mở Khóa Đất Mới 🌾" : 
                type === "disaster" ? "LÁ CHẮN BÃO AXIT 🛡️" : "Nhập Tri Thức Đổi Vật Phẩm 📚";
            
            document.getElementById("modal-task").classList.add("active");
            renderQuestHearts();
        }

        // BỔ SUNG LẠI HÀM VẼ TRÁI TIM SINH MỆNH (ĐÃ BỊ THIẾU Ở BẢN TRƯỚC)
        function renderQuestHearts() {
            const container = document.getElementById("quest-hearts-container");
            if (!container) return;
            container.innerHTML = "";
            const remainingHearts = 5 - (activeTask ? activeTask.errors : 0);
            for (let i = 1; i <= 5; i++) {
                if (i <= remainingHearts) {
                    container.innerHTML += `<i class="fa-solid fa-heart" style="color: #ef4444; margin: 0 2px;"></i>`;
                } else {
                    container.innerHTML += `<i class="fa-regular fa-heart" style="color: rgba(255,255,255,0.15); margin: 0 2px;"></i>`;
                }
            }
        }

        function closeTaskModal() {
            document.getElementById("modal-task").classList.remove("active");
            activeTask = null;
        }

        // ======================================================================
        // ENGINE SINH BÀI TẬP THEO CHƯƠNG TRÌNH BỘ GIÁO DỤC VIỆT NAM
        // Sinh ngẫu nhiên theo 4 môn học/lớp, có lọc trùng lặp lịch sử
        // ======================================================================

        // --- Kho bài tập trắc nghiệm tĩnh (câu hỏi được xáo trộn lựa chọn) ---
        const QUIZ_BANK = {
            g1_viet, g1_science, g1_tech,
            g2_viet, g2_science, g2_tech,
            g3_viet, g3_science, g3_tech,
            g4_viet, g4_science, g4_tech,
            g5_viet, g5_science, g5_tech
        };

        // Chọn câu hỏi ngẫu nhiên từ kho, tránh lặp lại gần đây
        function pickQuizQuestion(bankKey) {
            const bank = QUIZ_BANK[bankKey];
            if (!bank || bank.length === 0) return null;
            const shuffled = shuffleArray(bank);
            for (let i = 0; i < shuffled.length; i++) {
                const candidate = shuffled[i];
                const key = bankKey + '|' + candidate.q;
                if (!isRecentQuestion(key)) {
                    addToQuestionHistory(key);
                    return candidate;
                }
            }
            // Nếu tất cả đã hỏi, reset queue một phần và lấy câu đầu
            const fallback = shuffled[0];
            const key = bankKey + '|' + fallback.q;
            addToQuestionHistory(key);
            return fallback;
        }

        // Tạo câu hỏi toán có nhớ để tránh lặp
        function buildMathQuestion(grade) {
            let attempts = 0;
            let result = null;
            while (attempts < 30) {
                attempts++;
                let q, ans, key, label, inputStep = '1';

                if (grade === 1) {
                    const a = Math.floor(Math.random() * 8) + 1; // 1 to 8
                    const b = Math.floor(Math.random() * (10 - a)) + 1; // a + b <= 10
                    const isPlus = Math.random() < 0.5;
                    ans = isPlus ? (a + b) : a;
                    q = isPlus ? `${a} + ${b} = ?` : `${a + b} - ${b} = ?`;
                    label = 'Toán Lớp 1 - Cộng Trừ Trong Phạm Vi 10';
                    key = 'math|' + q;

                } else if (grade === 2) {
                    const a = Math.floor(Math.random() * 50) + 10;
                    const b = Math.floor(Math.random() * 30) + 5;
                    const isPlus = Math.random() < 0.5;
                    ans = isPlus ? (a + b) : (a - b);
                    if (ans < 0) continue;
                    q = `${a} ${isPlus ? '+' : '-'} ${b} = ?`;
                    label = 'Toán Lớp 2 - Cộng Trừ Có Nhớ';
                    key = 'math|' + q;

                } else if (grade === 3) {
                    const a = Math.floor(Math.random() * 9) + 2;   // số chia 2-10
                    const b = Math.floor(Math.random() * 9) + 1;   // thương 1-9
                    const isMul = Math.random() < 0.5;
                    if (isMul) {
                        ans = a * b;
                        q = `${a} × ${b} = ?`;
                        label = 'Toán Lớp 3 - Phép Nhân Bảng';
                    } else {
                        // Phép chia: (a*b) : a = b  ->  đáp án đúng là b (thương)
                        ans = b;
                        q = `${a * b} : ${a} = ?`;
                        label = 'Toán Lớp 3 - Phép Chia Bảng';
                    }
                    key = 'math|' + q;

                } else if (grade === 4) {
                    const subtype = Math.floor(Math.random() * 3);
                    if (subtype === 0) {
                        // Trung bình cộng
                        const a = Math.floor(Math.random() * 60) + 20;
                        const diff = (Math.floor(Math.random() * 8) + 1) * 2;
                        const b = a + diff;
                        ans = (a + b) / 2;
                        q = `Trung bình cộng của ${a} và ${b}?`;
                        label = 'Toán Lớp 4 - Trung Bình Cộng';
                    } else if (subtype === 1) {
                        // Cộng trừ tròn nghìn
                        const a = (Math.floor(Math.random() * 8) + 1) * 1000;
                        const b = (Math.floor(Math.random() * 7) + 1) * 1000;
                        const isPlus = Math.random() < 0.5;
                        ans = isPlus ? (a + b) : Math.abs(a - b);
                        q = isPlus ? `${a} + ${b} = ?` : `${Math.max(a,b)} - ${Math.min(a,b)} = ?`;
                        label = 'Toán Lớp 4 - Cộng Trừ Tròn Nghìn';
                    } else {
                        // Phân số cùng mẫu số (chỉ nhập tử số)
                        const mau = Math.floor(Math.random() * 6) + 3; // mẫu 3-8
                        const tu1 = Math.floor(Math.random() * (mau - 1)) + 1;
                        const tu2 = Math.floor(Math.random() * (mau - tu1)) + 1;
                        const isPlus = Math.random() < 0.5;
                        ans = isPlus ? (tu1 + tu2) : Math.abs(tu1 - tu2);
                        q = isPlus
                            ? `${tu1}/${mau} + ${tu2}/${mau} = ?/${mau} (Nhập tử số)`
                            : `${Math.max(tu1,tu2)}/${mau} - ${Math.min(tu1,tu2)}/${mau} = ?/${mau} (Nhập tử số)`;
                        label = 'Toán Lớp 4 - Phân Số Cùng Mẫu';
                    }
                    key = 'math|' + q;

                } else { // grade === 5
                    const subtype = Math.floor(Math.random() * 3);
                    if (subtype === 0) {
                        // Thập phân
                        const a = Math.round((Math.random() * 6 + 1) * 10) / 10;
                        const b = Math.round((Math.random() * 5 + 1) * 10) / 10;
                        const isPlus = Math.random() < 0.5;
                        ans = isPlus
                            ? parseFloat((a + b).toFixed(1))
                            : parseFloat((a + b - b).toFixed(1)); // giảm b
                        q = isPlus ? `${a} + ${b} = ?` : `${parseFloat((a+b).toFixed(1))} - ${b} = ?`;
                        label = 'Toán Lớp 5 - Số Thập Phân';
                        inputStep = '0.1';
                    } else if (subtype === 1) {
                        // Tỷ số phần trăm
                        const bases = [20, 40, 60, 80, 100, 120, 150, 200];
                        const base = bases[Math.floor(Math.random() * bases.length)];
                        const pct = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
                        ans = (base * pct) / 100;
                        q = `${pct}% của ${base} là bao nhiêu?`;
                        label = 'Toán Lớp 5 - Tỷ Số Phần Trăm';
                    } else {
                        // Diện tích hình tam giác: S = (đáy × chiều cao) / 2
                        const day = (Math.floor(Math.random() * 8) + 2) * 2; // chẵn
                        const cao = Math.floor(Math.random() * 8) + 2;
                        ans = (day * cao) / 2;
                        q = `Diện tích tam giác có đáy ${day}cm, chiều cao ${cao}cm là?`;
                        label = 'Toán Lớp 5 - Diện Tích Tam Giác';
                    }
                    key = 'math|' + q;
                }

                if (!isRecentQuestion(key)) {
                    addToQuestionHistory(key);
                    result = { q, ans, label, inputStep };
                    break;
                }
            }
            // fallback nếu vòng lặp không tìm được câu mới
            if (!result && grade === 2) {
                const a = 57, b = 28;
                result = { q: `${a} + ${b} = ?`, ans: a + b, label: 'Toán Lớp 2 - Cộng Trừ Có Nhớ', inputStep: '1' };
            }
            return result;
        }

        // Render trắc nghiệm với lựa chọn được xáo trộn
        function renderChoicePanel(panel, candidate) {
            const correctKey = candidate.aKey || candidate.a;
            const choices = shuffleArray(candidate.c);
            let html = `<div class="multiple-choices">`;
            choices.forEach(ch => {
                html += `<button class="choice-btn" onclick="verifyChoiceAnswer('${ch.replace(/'/g, "\\'")}')">` + ch + `</button>`;
            });
            html += `</div>`;
            panel.innerHTML = html;
            activeTask.correctAnswer = correctKey;
        }

        function generateCurriculumQuestion() {
            const grade = parseInt(selectedGrade);
            const panel = document.getElementById("quest-answer-panel");
            const qText = document.getElementById("quest-text");
            const qTypeLabel = document.getElementById("quest-type-label");
            if (!panel || !qText || !qTypeLabel) return;
            panel.innerHTML = "";

            // 4 môn học cho mỗi lớp
            const subjects = ['math', 'viet', 'science', 'tech'];
            const subject = subjects[Math.floor(Math.random() * subjects.length)];

            // --- MÔN TOÁN (sinh ngẫu nhiên số, tránh trùng) ---
            if (subject === 'math') {
                const mathQ = buildMathQuestion(grade);
                if (!mathQ) { generateCurriculumQuestion(); return; }
                qTypeLabel.innerText = mathQ.label;
                qText.innerText = mathQ.q;
                activeTask.correctAnswer = mathQ.ans;
                activeTask.questionText = mathQ.q;
                panel.innerHTML = `
                    <div class="math-input-wrapper">
                        <input type="number" step="${mathQ.inputStep}" id="math-input" class="math-input"
                            placeholder="Nhập đáp số" autofocus onkeydown="handleMathKeyDown(event)">
                        <button class="btn-submit" onclick="verifyQuestAnswer()">NỘP</button>
                    </div>
                `;
                return;
            }

            // --- MÔN TIẾNG VIỆT ---
            if (subject === 'viet') {
                const bankKey = `g${grade}_viet`;
                const candidate = pickQuizQuestion(bankKey);
                if (!candidate) { generateCurriculumQuestion(); return; }
                const correctAnswer = candidate.aKey || candidate.a;
                qTypeLabel.innerText = `Tiếng Việt Lớp ${grade}`;
                qText.innerText = candidate.q;
                activeTask.questionText = candidate.q;
                renderChoicePanel(panel, candidate);
                return;
            }

            // --- MÔN KHOA HỌC / TỰ NHIÊN XÃ HỘI ---
            if (subject === 'science') {
                const bankKey = `g${grade}_science`;
                const candidate = pickQuizQuestion(bankKey);
                if (!candidate) { generateCurriculumQuestion(); return; }
                const labelMap = { 2: 'Tự Nhiên & Xã Hội Lớp 2', 3: 'Tự Nhiên & Xã Hội Lớp 3', 4: 'Khoa Học Lớp 4', 5: 'Khoa Học Lớp 5' };
                qTypeLabel.innerText = labelMap[grade] || `Khoa Học Lớp ${grade}`;
                qText.innerText = candidate.q;
                activeTask.questionText = candidate.q;
                renderChoicePanel(panel, candidate);
                return;
            }

            // --- MÔN TIN HỌC / CÔNG NGHỆ ---
            if (subject === 'tech') {
                if (grade === 2) {
                    // Lớp 2: kết hợp luyện gõ và trắc nghiệm tin học
                    if (Math.random() < 0.4) {
                        // Luyện gõ phím cơ sở
                        const typingWords = ["asdf", "jkl", "fdsa", "dfjk", "asdfg", "hjkl", "asdfjkl"];
                        const chosenStr = typingWords[Math.floor(Math.random() * typingWords.length)];
                        const key = 'typing|' + chosenStr;
                        addToQuestionHistory(key);
                        qTypeLabel.innerText = 'Tin Học Lớp 2 - Luyện Gõ Phím';
                        qText.innerHTML = `Gõ đúng chuỗi: <span style="font-family: monospace; color: #a855f7; font-size:1.1em;">${chosenStr}</span>`;
                        activeTask.correctAnswer = chosenStr;
                        activeTask.questionText = chosenStr;
                        panel.innerHTML = `
                            <div class="typing-target-box" id="typing-feedback-box">${chosenStr}</div>
                            <input type="text" id="typing-input" class="math-input" placeholder="Bắt đầu gõ ở đây..."
                                oninput="handleTypingInput(event)" autofocus style="font-family: monospace;">
                            <div class="virtual-keyboard" id="kb-layout"></div>
                        `;
                        renderVirtualKeyboard(chosenStr);
                        return;
                    }
                    // Ngẫu nhiên dùng ngân hàng trắc nghiệm
                    const candidate = pickQuizQuestion('g2_tech');
                    if (!candidate) { generateCurriculumQuestion(); return; }
                    qTypeLabel.innerText = 'Tin Học Lớp 2';
                    qText.innerText = candidate.q;
                    activeTask.questionText = candidate.q;
                    renderChoicePanel(panel, candidate);
                } else {
                    const bankKey = `g${grade}_tech`;
                    const candidate = pickQuizQuestion(bankKey);
                    if (!candidate) { generateCurriculumQuestion(); return; }
                    const labelMap = { 3: 'Tin Học Lớp 3', 4: 'Tin Học Lớp 4', 5: 'Công Nghệ & An Toàn Mạng Lớp 5' };
                    qTypeLabel.innerText = labelMap[grade] || `Tin Học Lớp ${grade}`;
                    qText.innerText = candidate.q;
                    activeTask.questionText = candidate.q;
                    renderChoicePanel(panel, candidate);
                }
            }
        }

        function handleMathKeyDown(event) {
            if (event.key === "Enter") {
                verifyQuestAnswer();
            }
        }

        function renderVirtualKeyboard(targetStr) {
            const container = document.getElementById("kb-layout");
            if (!container) return;
            container.innerHTML = "";
            const sampleKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
            
            sampleKeys.forEach(k => {
                const keyNode = document.createElement("div");
                keyNode.className = "kb-key";
                keyNode.id = `vkey-${k}`;
                keyNode.innerText = k;
                container.appendChild(keyNode);
            });

            if (targetStr.length > 0) {
                const firstChar = targetStr.charAt(0);
                const firstKeyNode = document.getElementById(`vkey-${firstChar}`);
                if (firstKeyNode) firstKeyNode.classList.add("highlight");
            }
        }

        function handleTypingInput(event) {
            const typedVal = event.target.value.toLowerCase();
            const target = activeTask.correctAnswer;
            const box = document.getElementById("typing-feedback-box");
            if (!box) return;

            let formattedText = "";
            let allCorrect = true;

            for (let i = 0; i < target.length; i++) {
                if (i < typedVal.length) {
                    if (typedVal.charAt(i) === target.charAt(i)) {
                        formattedText += `<span class="typed-correct">${target.charAt(i)}</span>`;
                    } else {
                        formattedText += `<span class="typed-incorrect">${target.charAt(i)}</span>`;
                        allCorrect = false;
                    }
                } else {
                    formattedText += `<span>${target.charAt(i)}</span>`;
                }
            }

            box.innerHTML = formattedText;

            document.querySelectorAll(".kb-key").forEach(k => k.classList.remove("highlight"));
            if (typedVal.length < target.length) {
                const nextChar = target.charAt(typedVal.length);
                const nextKeyNode = document.getElementById(`vkey-${nextChar}`);
                if (nextKeyNode) nextKeyNode.classList.add("highlight");
            }

            if (typedVal.length >= target.length) {
                const finalVal = typedVal.slice(0, target.length);
                if (finalVal === target) {
                    verifyChoiceAnswer(target);
                } else {
                    handleQuestError();
                    event.target.value = "";
                    box.innerHTML = target;
                    renderVirtualKeyboard(target);
                }
            }
        }

        function verifyQuestAnswer() {
            const mathInput = document.getElementById("math-input");
            if (!mathInput) return;

            const userVal = parseFloat(mathInput.value);
            if (!isNaN(userVal) && Math.abs(userVal - activeTask.correctAnswer) < 0.01) {
                verifyChoiceAnswer(activeTask.correctAnswer);
            } else {
                handleQuestError();
                mathInput.value = "";
                mathInput.focus();
            }
        }

        function verifyChoiceAnswer(answerValue) {
            if (String(answerValue).toUpperCase() === String(activeTask.correctAnswer).toUpperCase()) {
                playChime(784, 'triangle', 0.2);
                
                if (activeTask.type === "farm") {
                    if (activeTask.targetId === "water") {
                        gameState.inventory.water += 3;
                    } else {
                        gameState.inventory[activeTask.targetId] += 1;
                    }
                } else if (activeTask.type === "pest") {
                    const p = gameState.plots[activeTask.targetId];
                    p.pest = false;
                    p.errorCount = 0;
                } else if (activeTask.type === "unlock") {
                    const p = gameState.plots[activeTask.targetId];
                    p.status = "empty";
                    gameState.coins -= p.cost;
                } else if (activeTask.type === "disaster") {
                    // Giải cứu thành công bão axit
                    gameState.weather = "sunny";
                    updateWeatherUI();
                    showToast("🛡️ Lá chắn bảo vệ đã kích hoạt thành công!");
                }

                // Tiến trình ấp thú cưng
                progressEgg();

                saveDataForMode();
                updateHeaderStats();
                renderPlots();
                renderInventory();
                closeTaskModal();
                updateGuide();
            } else {
                handleQuestError();
            }
        }

        function handleQuestError() {
            activeTask.errors++;
            playChime(150, 'sawtooth', 0.3);
            renderQuestHearts();

            if (activeTask.errors >= 5) {
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
                
                alertBox("Bé đã gõ sai quá 5 lần. Thử thách này tạm thời thất bại!");
                saveDataForMode();
                renderPlots();
                closeTaskModal();
                updateGuide();
            }
        }

        function buildPlotSVG(plot) {
            let svgStr = "";
            const soilColor = plot.water ? "#451a03" : "#78350f";
            svgStr += `<ellipse cx="70" cy="80" rx="60" ry="20" fill="${soilColor}" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>`;

            if (plot.status === "locked") {
                svgStr += `
                    <circle cx="70" cy="55" r="18" fill="rgba(15, 23, 42, 0.9)" stroke="#ef4444" stroke-width="2"/>
                    <path d="M64 52 V46 A6 6 0 0 1 76 46 V52" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
                    <rect x="61" y="52" width="18" height="13" rx="3" fill="#ef4444"/>
                    <circle cx="70" cy="58" r="2" fill="#000"/>
                `;
            } else if (plot.status === "withered") {
                svgStr += `
                    <path d="M70 80 Q65 60 55 50" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
                    <path d="M55 50 Q48 52 45 48" fill="none" stroke="#64748b" stroke-width="2"/>
                    <path d="M62 65 Q50 67 48 62" fill="none" stroke="#64748b" stroke-width="2"/>
                `;
            } else if (plot.status === "planted") {
                const prog = plot.prog;

                if (prog < 35) {
                    svgStr += `
                        <path d="M70 80 Q70 65 70 58" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                        <path d="M70 58 Q78 52 82 55" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                        <path d="M70 58 Q62 52 58 55" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                    `;
                } else if (prog < 75) {
                    svgStr += `
                        <path d="M70 80 Q68 55 72 40" fill="none" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/>
                        <path d="M70 60 Q85 50 90 53" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                        <path d="M69 50 Q50 42 45 45" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                        <path d="M90 53 C95 45 85 40 85 45 Z" fill="#4ade80"/>
                        <path d="M45 45 C40 37 50 32 50 37 Z" fill="#4ade80"/>
                    `;
                } else {
                    svgStr += `
                        <path d="M70 80 Q68 50 70 30" fill="none" stroke="#15803d" stroke-width="6" stroke-linecap="round"/>
                        <circle cx="70" cy="30" r="22" fill="#166534" opacity="0.9"/>
                        <circle cx="55" cy="35" r="15" fill="#15803d" opacity="0.85"/>
                        <circle cx="85" cy="35" r="15" fill="#15803d" opacity="0.85"/>
                        <circle cx="70" cy="22" r="18" fill="#22c55e" opacity="0.9"/>
                    `;

                    if (selectedWorld === "eco") {
                        if (plot.seed === "s1") {
                            svgStr += `
                                <circle cx="60" cy="28" r="4" fill="#fbbf24"/>
                                <circle cx="80" cy="28" r="4" fill="#fbbf24"/>
                                <circle cx="70" cy="38" r="5" fill="#fbbf24"/>
                            `;
                        } else if (plot.seed === "s2") {
                            svgStr += `
                                <circle cx="58" cy="35" r="7" fill="#f43f5e"/>
                                <circle cx="82" cy="35" r="7" fill="#f43f5e"/>
                                <circle cx="72" cy="45" r="8" fill="#f43f5e"/>
                            `;
                        } else {
                            svgStr += `
                                <ellipse cx="70" cy="40" r="14" ry="11" fill="#10b981"/>
                                <path d="M60 40 Q70 32 80 40" fill="none" stroke="#047857" stroke-width="2"/>
                                <path d="M58 43 Q70 35 82 43" fill="none" stroke="#047857" stroke-width="2"/>
                            `;
                        }
                    } else if (selectedWorld === "cyber") {
                        if (plot.seed === "s1") {
                            svgStr += `<rect x="64" y="25" width="12" height="18" rx="2" fill="#06b6d4" stroke="#fff" stroke-width="1"/>`;
                        } else if (plot.seed === "s2") {
                            svgStr += `
                                <circle cx="70" cy="32" r="8" fill="#a855f7" opacity="0.8"/>
                                <path d="M67 40 L73 40" stroke="#fff" stroke-width="2"/>
                            `;
                        } else {
                            svgStr += `
                                <rect x="58" y="25" width="24" height="24" rx="4" fill="#1e1b4b" stroke="#06b6d4" stroke-width="2"/>
                                <circle cx="70" cy="37" r="5" fill="#06b6d4"/>
                            `;
                        }
                    } else if (selectedWorld === "magic") {
                        if (plot.seed === "s1") {
                            svgStr += `
                                <circle cx="70" cy="32" r="10" fill="#f43f5e" opacity="0.6"/>
                                <circle cx="70" cy="32" r="4" fill="#fbbf24"/>
                            `;
                        } else if (plot.seed === "s2") {
                            svgStr += `
                                <path d="M65 44 C65 30 75 30 75 44" fill="#fbbf24"/>
                                <rect x="68" y="44" width="4" height="10" fill="#fff"/>
                            `;
                        } else {
                            svgStr += `
                                <path d="M70 45 L62 37 C58 32 66 26 70 33 C74 26 82 32 78 37 Z" fill="#d946ef"/>
                            `;
                        }
                    }
                }

                if (plot.pest) {
                    svgStr += `
                        <path d="M52 50 Q56 46 60 50 Q64 54 68 50" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="49" cy="50" r="3.5" fill="#16a34a"/>
                        <circle cx="48" cy="49" r="0.8" fill="#fff"/>
                    `;
                }
            }

            return svgStr;
        }

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
                        let speed = 2;
                        if (gameState.weather === "rainy") speed = 3;
                        if (gameState.weather === "acid_storm") speed = 0;

                        if (p.water && !p.pest && speed > 0) {
                            p.prog = Math.min(100, p.prog + speed);
                            hasChanged = true;
                        }

                        if (Math.random() < 0.03) {
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
            overlay.className = "modal-overlay active";
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

        function resizeGame() {
            const container = document.getElementById("game-container");
            if (!container) return;

            const baseWidth = 1024;
            const baseHeight = 640;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const scaleX = windowWidth / baseWidth;
            const scaleY = windowHeight / baseHeight;
            const scale = Math.min(scaleX, scaleY);

            container.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        window.onload = function() {
            startRealtimeGameLoop();
            resizeGame();
        };

        window.addEventListener("resize", resizeGame);
        window.addEventListener("orientationchange", () => {
            setTimeout(resizeGame, 200);
        });

        // Bind functions to window scope for inline HTML handlers
        window.selectGrade = selectGrade;
        window.selectWorld = selectWorld;
        window.startGame = startGame;
        window.toggleGuideMode = toggleGuideMode;
        window.switchTab = switchTab;
        window.onAssistantClicked = onAssistantClicked;
        window.closeTaskModal = closeTaskModal;
        window.handleBossMathKeyDown = handleBossMathKeyDown;
        window.verifyBossAnswer = verifyBossAnswer;
        window.closeExitConfirmModal = closeExitConfirmModal;
        window.exitToWelcome = exitToWelcome;
        window.closeResetConfirmModal = closeResetConfirmModal;
        window.resetModeData = resetModeData;
        window.showExitConfirmModal = showExitConfirmModal;
        window.showResetConfirmModal = showResetConfirmModal;
        window.verifyChoiceAnswer = verifyChoiceAnswer;
        window.verifyQuestAnswer = verifyQuestAnswer;
        window.handleMathKeyDown = handleMathKeyDown;
        window.handleTypingInput = handleTypingInput;