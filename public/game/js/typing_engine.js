/**
 * TYPING ACADEMY ENGINE
 * Xử lý sự kiện bàn phím, phân tích Telex/VNI, tính WPM/Accuracy và điều phối giao diện
 * Tích hợp Mini-Game Ôn tập Nông Trại ("Farm Drop Harvest") sau mỗi hàng phím
 */

window.TypingEngine = (function() {
    let state = {
        active: false,
        catIndex: 0,
        lessonIndex: 0,
        targetText: "",
        currentIndex: 0,
        charStates: [], // 'correct', 'wrong', 'pending'
        startTime: null,
        timerInterval: null,
        wpm: 0,
        accuracy: 100,
        streak: 0,
        maxStreak: 0,
        totalTyped: 0,
        errorCount: 0,
        imeMode: 'telex', // 'telex' hoặc 'vni'
        completed: false
    };

    // Web Audio Sound FX
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.08, vol = 0.06) {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    function playClick() { playTone(550, 'triangle', 0.04, 0.04); }
    function playCorrect() { playTone(800, 'sine', 0.05, 0.04); }
    function playError() { playTone(180, 'sawtooth', 0.1, 0.06); }
    function playHarvestPop() { playTone(950, 'sine', 0.08, 0.08); }
    function playVictory() {
        [523, 659, 784, 1046].forEach((f, i) => {
            setTimeout(() => playTone(f, 'triangle', 0.25, 0.08), i * 110);
        });
    }

    let isListenerAttached = false;

    // Khởi tạo giao diện
    function init() {
        renderKeyboard();
        renderLessonModalList();
        setupEventListeners();
        loadLesson(0, 0);
    }

    // Render danh sách bài học trong Modal Chọn Bài
    function renderLessonModalList() {
        const modalContainer = document.getElementById("lesson-modal-categories");
        if (!modalContainer) return;

        const cats = window.TYPING_DATA.categories;
        modalContainer.innerHTML = cats.map((cat, cIdx) => `
            <div style="background: #1e293b; border-radius: 16px; padding: 16px; border: 1px solid rgba(255,255,255,0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-weight: 800; font-size: 15px; color: #38bdf8;">
                        <i class="${cat.icon}" style="margin-right: 8px;"></i> ${cat.title}
                    </span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${cat.miniGame ? `
                            <button class="lesson-picker-btn" style="background: linear-gradient(135deg, #16a34a, #15803d); border-color: #4ade80; padding: 6px 12px; font-size: 12px; color: #ffffff;" onclick="TypingEngine.startMiniGame(${cIdx})">
                                🎮 Ôn Tập Nông Trại
                            </button>
                        ` : ''}
                        <span style="font-size: 12px; font-weight: 800; color: #fbbf24;">
                            +${cat.rewardCoins} 🪙
                        </span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${cat.lessons.map((les, lIdx) => {
                        const isCurrent = (cIdx === state.catIndex && lIdx === state.lessonIndex && !TypingFarmGame.isActive());
                        return `
                            <button class="lesson-picker-btn" 
                                    style="padding: 8px 14px; font-size: 13px; ${isCurrent ? 'background: #0284c7; border-color: #38bdf8;' : ''}"
                                    onclick="TypingEngine.selectLessonFromModal(${cIdx}, ${lIdx})">
                                ${les.name}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }

    function openLessonModal() {
        renderLessonModalList();
        const modal = document.getElementById("modal-lesson-picker");
        if (modal) modal.style.display = "flex";
    }

    function closeLessonModal() {
        const modal = document.getElementById("modal-lesson-picker");
        if (modal) modal.style.display = "none";
    }

    function selectLessonFromModal(catIdx, lesIdx) {
        closeLessonModal();
        TypingFarmGame.stop();
        loadLesson(catIdx, lesIdx);
    }

    // Render bàn phím ảo sạch sẽ
    function renderKeyboard() {
        const kbEl = document.getElementById("virtual-keyboard");
        if (!kbEl) return;

        const rows = [
            [
                { k: "`", l: "~" }, { k: "1", l: "!" }, { k: "2", l: "@" }, { k: "3", l: "#" }, { k: "4", l: "$" },
                { k: "5", l: "%" }, { k: "6", l: "^" }, { k: "7", l: "&" }, { k: "8", l: "*" }, { k: "9", l: "(" },
                { k: "0", l: ")" }, { k: "-", l: "_" }, { k: "=", l: "+" }, { k: "Backspace", label: "⌫ Xóa", cls: "kb-clean-wide" }
            ],
            [
                { k: "Tab", label: "Tab", cls: "kb-clean-wide" },
                { k: "q" }, { k: "w" }, { k: "e" }, { k: "r" }, { k: "t" }, { k: "y" }, { k: "u" }, { k: "i" }, { k: "o" }, { k: "p" },
                { k: "[" }, { k: "]" }, { k: "\\" }
            ],
            [
                { k: "CapsLock", label: "Caps", cls: "kb-clean-wide" },
                { k: "a" }, { k: "s" }, { k: "d" }, { k: "f" }, { k: "g" }, { k: "h" }, { k: "j" }, { k: "k" }, { k: "l" },
                { k: ";" }, { k: "'" }, { k: "Enter", label: "↵ Enter", cls: "kb-clean-wider" }
            ],
            [
                { k: "Shift", label: "⇧ Shift", cls: "kb-clean-wider" },
                { k: "z" }, { k: "x" }, { k: "c" }, { k: "v" }, { k: "b" }, { k: "n" }, { k: "m" },
                { k: "," }, { k: "." }, { k: "/" }, { k: "Shift", label: "⇧ Shift", cls: "kb-clean-wider" }
            ],
            [
                { k: " ", label: "SPACE (DẤU CÁCH)", cls: "kb-clean-space" }
            ]
        ];

        kbEl.innerHTML = rows.map(row => `
            <div class="kb-clean-row">
                ${row.map(item => {
                    const keyVal = item.k.toLowerCase();
                    return `
                        <div class="kb-clean-key ${item.cls || ''}" data-key="${keyVal}">
                            ${item.label || item.k.toUpperCase()}
                        </div>
                    `;
                }).join('')}
            </div>
        `).join('');
    }

    // Tra cứu ngón tay phụ trách phím
    function getFingerForKey(key) {
        const k = key.toLowerCase();
        const fMap = window.TYPING_DATA.fingerMap;
        for (let fName in fMap) {
            if (fMap[fName].keys.includes(k)) {
                return { id: fName, ...fMap[fName] };
            }
        }
        if (k === ' ') return { id: 'thumb', ...fMap.thumb };
        return null;
    }

    // Nạp bài học
    function loadLesson(catIdx, lesIdx) {
        const cats = window.TYPING_DATA.categories;
        if (!cats[catIdx] || !cats[catIdx].lessons[lesIdx]) return;

        state.catIndex = catIdx;
        state.lessonIndex = lesIdx;
        state.targetText = cats[catIdx].lessons[lesIdx].text;
        state.currentIndex = 0;
        state.charStates = new Array(state.targetText.length).fill('pending');
        state.startTime = null;
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.wpm = 0;
        state.accuracy = 100;
        state.streak = 0;
        state.maxStreak = 0;
        state.totalTyped = 0;
        state.errorCount = 0;
        state.completed = false;

        const titleEl = document.getElementById("typing-lesson-title");
        if (titleEl) {
            titleEl.innerText = `${cats[catIdx].lessons[lesIdx].name}`;
        }
        
        renderText();
        updateHUD();
        highlightGuide();
    }

    // Render chuỗi văn bản cần gõ
    function renderText() {
        const displayEl = document.getElementById("typing-text-display");
        if (!displayEl) return;

        let html = "";
        for (let i = 0; i < state.targetText.length; i++) {
            const char = state.targetText[i];
            const displayChar = char === ' ' ? '&nbsp;' : char;
            let cls = "char-pending";

            if (i < state.currentIndex) {
                cls = state.charStates[i] === 'correct' ? 'char-correct' : 'char-wrong';
            } else if (i === state.currentIndex) {
                cls = "char-current";
            }

            html += `<span class="${cls}">${displayChar}</span>`;
        }
        displayEl.innerHTML = html;

        // Cập nhật thanh tiến độ
        const fillEl = document.getElementById("lesson-progress-fill");
        if (fillEl) {
            const percent = (state.currentIndex / state.targetText.length) * 100;
            fillEl.style.width = `${percent}%`;
        }
    }

    // Highlight phím tiếp theo và ngón tay trên mô hình SVG
    function highlightGuide() {
        document.querySelectorAll(".kb-clean-key").forEach(k => k.classList.remove("key-target"));
        document.querySelectorAll(".svg-finger").forEach(f => f.classList.remove("active"));

        if (state.currentIndex >= state.targetText.length) return;

        const nextChar = state.targetText[state.currentIndex];
        let keyToHighlight = nextChar.toLowerCase();

        if (nextChar === ' ') keyToHighlight = ' ';

        const keyEl = document.querySelector(`.kb-clean-key[data-key="${keyToHighlight}"]`);
        if (keyEl) {
            keyEl.classList.add("key-target");
        }

        const finger = getFingerForKey(keyToHighlight);
        if (finger) {
            if (finger.id === 'thumb') {
                const thumbLeft = document.getElementById("svg-finger-thumb-left");
                const thumbRight = document.getElementById("svg-finger-thumb-right");
                if (thumbLeft) thumbLeft.classList.add("active");
                if (thumbRight) thumbRight.classList.add("active");
            } else {
                const svgFinger = document.getElementById(`svg-finger-${finger.id}`);
                if (svgFinger) {
                    svgFinger.classList.add("active");
                }
            }

            const hintText = document.getElementById("typing-finger-hint");
            if (hintText) {
                hintText.innerHTML = `Sử dụng <b style="color: #38bdf8">${finger.name}</b> để nhấn phím <b style="color: #fbbf24; font-size: 18px;">[ ${nextChar === ' ' ? 'Dấu Cách (Space)' : nextChar} ]</b>`;
            }
        }
    }

    // Xử lý sự kiện nhấn phím
    function setupEventListeners() {
        if (isListenerAttached) return;
        isListenerAttached = true;

        window.addEventListener("keydown", function(e) {
            const screenTyping = document.getElementById("screen-typing");
            if (!screenTyping || screenTyping.style.display !== "flex") return;

            // Nếu đang chơi Mini-game, chuyển event cho mini-game xử lý
            if (TypingFarmGame.isActive()) {
                if (e.key === "Backspace") {
                    e.preventDefault();
                    TypingFarmGame.handleBackspace();
                    return;
                }
                if (e.key === " ") {
                    e.preventDefault();
                    TypingFarmGame.handleKey(" ");
                    return;
                }
                if (e.key.length === 1) {
                    TypingFarmGame.handleKey(e.key);
                }
                return;
            }

            if (e.repeat) return;

            if (e.key === "Tab" || e.key === "Alt" || e.key === "Control" || e.key === "Meta" || e.key === "CapsLock" || e.isComposing) {
                if (e.key === "Tab") e.preventDefault();
                return;
            }

            const pressedKey = e.key.toLowerCase();
            const keyEl = document.querySelector(`.kb-clean-key[data-key="${pressedKey === ' ' ? ' ' : pressedKey}"]`);
            if (keyEl) {
                keyEl.classList.add("key-pressed");
                setTimeout(() => keyEl.classList.remove("key-pressed"), 100);
            }

            if (!state.startTime && !state.completed) {
                state.startTime = Date.now();
                state.timerInterval = setInterval(updateTimerAndWPM, 500);
            }

            if (state.completed) return;

            if (e.key === "Backspace") {
                e.preventDefault();
                if (state.currentIndex > 0) {
                    state.currentIndex--;
                    state.charStates[state.currentIndex] = 'pending';
                    renderText();
                    highlightGuide();
                }
                return;
            }

            if (e.key.length === 1) {
                e.preventDefault();
                handleCharacterInput(e.key);
            }
        });
    }

    // Xử lý ký tự gõ
    function handleCharacterInput(char) {
        const expectedChar = state.targetText[state.currentIndex];
        state.totalTyped++;

        if (char === expectedChar) {
            state.charStates[state.currentIndex] = 'correct';
            state.streak++;
            if (state.streak > state.maxStreak) state.maxStreak = state.streak;
            playCorrect();
        } else {
            state.charStates[state.currentIndex] = 'wrong';
            state.errorCount++;
            state.streak = 0;
            playError();
        }

        state.currentIndex++;
        renderText();
        updateHUD();
        highlightGuide();

        if (state.currentIndex >= state.targetText.length) {
            finishLesson();
        }
    }

    // Cập nhật Timer và tính toán WPM
    function updateTimerAndWPM() {
        if (!state.startTime) return;
        const elapsedSeconds = Math.max(1, Math.floor((Date.now() - state.startTime) / 1000));
        const minutes = elapsedSeconds / 60;
        
        const correctChars = state.charStates.filter(s => s === 'correct').length;
        state.wpm = Math.round((correctChars / 5) / minutes) || 0;
        state.accuracy = state.totalTyped > 0 ? Math.round((correctChars / state.totalTyped) * 100) : 100;

        updateHUD(elapsedSeconds);
    }

    // Cập nhật giao diện chỉ số HUD
    function updateHUD(seconds = 0) {
        const wpmEl = document.getElementById("hud-wpm");
        const accEl = document.getElementById("hud-accuracy");
        const streakEl = document.getElementById("hud-streak");
        const timerEl = document.getElementById("hud-timer");

        if (wpmEl) wpmEl.innerText = state.wpm;
        if (accEl) accEl.innerText = `${state.accuracy}%`;
        if (streakEl) streakEl.innerText = `🔥 ${state.streak}`;
        if (timerEl) {
            const m = String(Math.floor(seconds / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            timerEl.innerText = `${m}:${s}`;
        }
    }

    // Hoàn thành bài luyện gõ
    function finishLesson() {
        state.completed = true;
        if (state.timerInterval) clearInterval(state.timerInterval);
        playVictory();

        const cat = window.TYPING_DATA.categories[state.catIndex];
        let reward = 0;
        let stars = 1;

        if (state.accuracy >= 95) {
            stars = 3;
            reward = cat.rewardCoins;
        } else if (state.accuracy >= 85) {
            stars = 2;
            reward = Math.max(5, Math.round(cat.rewardCoins * 0.7));
        } else {
            stars = 1;
            reward = 3;
        }

        giveFarmReward(reward);

        const isLastLesson = (state.lessonIndex === cat.lessons.length - 1);
        showResultModal(stars, reward, isLastLesson);
    }

    // Tặng thưởng vàng vào gameState
    function giveFarmReward(coins, xp = 0) {
        if (coins <= 0 && xp <= 0) return;
        try {
            if (typeof gameState !== 'undefined' && gameState) {
                gameState.coins = (gameState.coins || 0) + coins;
                gameState.xp = (gameState.xp || 0) + (xp || coins * 2);
                if (typeof saveDataForMode === 'function') saveDataForMode();
                if (typeof updateHeaderStats === 'function') updateHeaderStats();
            }
        } catch (e) {
            console.error("Lỗi khi cộng thưởng:", e);
        }
    }

    // Hiển thị Modal tổng kết bài gõ
    function showResultModal(stars, reward, isLastLesson = false) {
        const modal = document.getElementById("modal-typing-result");
        if (!modal) return;

        const starDisplay = "⭐".repeat(stars) + "☆".repeat(3 - stars);
        document.getElementById("typing-res-stars").innerText = starDisplay;
        document.getElementById("typing-res-wpm").innerText = `${state.wpm} WPM`;
        document.getElementById("typing-res-acc").innerText = `${state.accuracy}%`;
        document.getElementById("typing-res-coins").innerHTML = `<span>🪙</span> +${reward} Vàng Nông Trại`;

        const nextBtn = modal.querySelector(".btn-modal-next");
        if (nextBtn) {
            if (isLastLesson) {
                nextBtn.innerHTML = `🎮 Ôn Tập Nông Trại <i class="fa-solid fa-gamepad"></i>`;
                nextBtn.onclick = function() {
                    modal.style.display = "none";
                    TypingFarmGame.start(state.catIndex);
                };
            } else {
                nextBtn.innerHTML = `Bài Tiếp Theo <i class="fa-solid fa-arrow-right"></i>`;
                nextBtn.onclick = function() {
                    modal.style.display = "none";
                    nextLesson();
                };
            }
        }

        modal.style.display = "flex";
    }

    function retryCurrentLesson() {
        const modal = document.getElementById("modal-typing-result");
        if (modal) modal.style.display = "none";
        loadLesson(state.catIndex, state.lessonIndex);
    }

    function nextLesson() {
        const modal = document.getElementById("modal-typing-result");
        if (modal) modal.style.display = "none";
        
        const cat = window.TYPING_DATA.categories[state.catIndex];
        if (state.lessonIndex + 1 < cat.lessons.length) {
            loadLesson(state.catIndex, state.lessonIndex + 1);
        } else if (state.catIndex + 1 < window.TYPING_DATA.categories.length) {
            loadLesson(state.catIndex + 1, 0);
        } else {
            loadLesson(0, 0);
        }
    }

    function setImeMode(mode) {
        state.imeMode = mode;
        document.querySelectorAll(".ime-btn-select").forEach(b => {
            b.classList.toggle("active", b.dataset.ime === mode);
        });
    }

    // Hàm loại bỏ dấu tiếng Việt để so khớp linh hoạt
    function removeVietnameseDiacritics(str) {
        if (!str) return "";
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    }

    // ================= 6 MINI GAMES NÔNG TRẠI ĐỘC ĐÁO CHO 6 CẤP ĐỘ =================
    const TypingFarmGame = (function() {
        let isRunning = false;
        let catIndex = 0;
        let score = 0;
        let caughtCount = 0;
        let lives = 3;
        let activeEntities = [];
        let spawnTimer = null;
        let animFrame = null;
        let lastTime = 0;

        // Trạng thái riêng cho Cấp 5 (Pest Defense - Từ vựng) và Cấp 6 (Tractor Rush - Ca dao)
        let currentPhrase = "";
        let currentPhraseTyped = "";
        let tractorPosPercent = 5;

        function start(catIdx = 0) {
            catIndex = catIdx;
            const cat = window.TYPING_DATA.categories[catIndex];
            if (!cat || !cat.miniGame) return;

            isRunning = true;
            score = 0;
            caughtCount = 0;
            lives = 3;
            activeEntities = [];
            currentPhrase = "";
            currentPhraseTyped = "";
            tractorPosPercent = 5;

            const modal = document.getElementById("modal-typing-minigame");
            if (modal) modal.style.display = "flex";

            const titleEl = document.getElementById("minigame-header-title");
            if (titleEl) titleEl.innerHTML = `🌾 ${cat.miniGame.title}`;

            updateGameHUD();
            setupArenaLayout(cat.miniGame);

            lastTime = performance.now();
            const theme = cat.miniGame.theme;

            if (theme === 'farm_drop' || theme === 'balloon_rise' || theme === 'truck_loading' || theme === 'pest_defense') {
                spawnEntity();
                spawnTimer = setInterval(spawnEntity, 1800);
                animFrame = requestAnimationFrame(gameLoop);
            } else if (theme === 'whack_mole') {
                spawnMole();
                spawnTimer = setInterval(spawnMole, 1600);
            } else if (theme === 'tractor_rush') {
                startNextTractorPhrase();
            }
        }

        function stop() {
            isRunning = false;
            if (spawnTimer) clearInterval(spawnTimer);
            if (animFrame) cancelAnimationFrame(animFrame);
            clearField();
            const modal = document.getElementById("modal-typing-minigame");
            if (modal) modal.style.display = "none";
        }

        function clearField() {
            const field = document.getElementById("minigame-playfield-arena");
            if (field) field.innerHTML = "";
            activeEntities = [];
        }

        function setupArenaLayout(cfg) {
            const field = document.getElementById("minigame-playfield-arena");
            if (!field) return;
            field.innerHTML = "";
            activeEntities = [];

            const theme = cfg.theme;
            if (theme === 'farm_drop') {
                field.innerHTML = `<div class="minigame-ground">${cfg.groundText || '🧺 HỨNG NÔNG SẢN VÀO GIỎ'}</div>`;
            } else if (theme === 'balloon_rise') {
                field.innerHTML = `<div class="minigame-ground" style="background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%); border-color: #38bdf8;">${cfg.groundText || '🎈 BẮN NỔ BÓNG BAY LÊN TRỜI'}</div>`;
            } else if (theme === 'whack_mole') {
                const grid = document.createElement("div");
                grid.className = "mole-burrow-grid";
                for (let i = 0; i < 6; i++) {
                    const hole = document.createElement("div");
                    hole.className = "mole-burrow-hole";
                    hole.id = `mole-hole-${i}`;
                    grid.appendChild(hole);
                }
                field.appendChild(grid);
                field.innerHTML += `<div class="minigame-ground" style="background: linear-gradient(180deg, #78350f 0%, #451a03 100%); border-color: #d97706;">${cfg.groundText || '🕳️ ĐẬP CHUỘT CHŨI ĐÀO KHOAI'}</div>`;
            } else if (theme === 'truck_loading') {
                field.innerHTML = `
                    <div class="truck-conveyor-belt"></div>
                    <div class="truck-target-bay">🚚</div>
                    <div class="minigame-ground">${cfg.groundText || '🚚 XẾP HÀNG LÊN XE TẢI'}</div>
                `;
            } else if (theme === 'pest_defense') {
                field.innerHTML = `<div class="minigame-ground" style="background: linear-gradient(180deg, #15803d 0%, #166534 100%); border-color: #4ade80;">${cfg.groundText || '🐛 GÕ TỪ TIẾNG VIỆT ĐỂ XỊT NƯỚC'}</div>`;
            } else if (theme === 'tractor_rush') {
                field.innerHTML = `
                    <div class="tractor-rush-field">
                        <div class="tractor-phrase-card" id="tractor-phrase-display">Chuẩn bị xuất phát...</div>
                        <div class="tractor-track-lane">
                            <div class="tractor-avatar" id="tractor-racer-car">🚜</div>
                        </div>
                    </div>
                    <div class="minigame-ground">${cfg.groundText || '🚜 ĐUA XE MÁY CÀY VỀ ĐÍCH'}</div>
                `;
            }
        }

        // ================= SPAWN CHO CÁC CHỦ ĐỀ =================
        function spawnEntity() {
            if (!isRunning) return;
            const cat = window.TYPING_DATA.categories[catIndex];
            const cfg = cat.miniGame;
            const field = document.getElementById("minigame-playfield-arena");
            if (!field) return;

            const theme = cfg.theme;

            if (theme === 'farm_drop') {
                // 1. Củ quả rơi từ trên xuống
                const randomKey = cfg.keys[Math.floor(Math.random() * cfg.keys.length)];
                const randomItem = cfg.items[Math.floor(Math.random() * cfg.items.length)];
                const leftPercent = 10 + Math.random() * 80;

                const el = document.createElement("div");
                el.className = "falling-fruit";
                el.style.left = `${leftPercent}%`;
                el.style.top = `-60px`;
                el.innerHTML = `
                    <div class="falling-fruit-bubble">${randomItem.icon}</div>
                    <div class="falling-fruit-key">${randomKey}</div>
                `;
                field.appendChild(el);
                activeEntities.push({
                    type: 'drop',
                    key: randomKey.toLowerCase(),
                    el: el,
                    pos: -60,
                    speed: 1.3 + Math.random() * 0.5
                });
            } else if (theme === 'balloon_rise') {
                // 2. Bóng bay khinh khí cầu bay từ dưới lên
                const randomKey = cfg.keys[Math.floor(Math.random() * cfg.keys.length)];
                const randomItem = cfg.items[Math.floor(Math.random() * cfg.items.length)];
                const leftPercent = 10 + Math.random() * 80;

                const el = document.createElement("div");
                el.className = "rising-balloon";
                el.style.left = `${leftPercent}%`;
                el.style.bottom = `-80px`;
                el.innerHTML = `
                    <div class="rising-balloon-bubble">${randomItem.icon}</div>
                    <div class="rising-balloon-key">${randomKey}</div>
                `;
                field.appendChild(el);
                activeEntities.push({
                    type: 'rise',
                    key: randomKey.toLowerCase(),
                    el: el,
                    pos: -80,
                    speed: 1.3 + Math.random() * 0.5
                });
            } else if (theme === 'truck_loading') {
                // 4. Thùng hàng xe tải chạy ngang
                const randomKey = cfg.keys[Math.floor(Math.random() * cfg.keys.length)];
                const randomItem = cfg.items[Math.floor(Math.random() * cfg.items.length)];

                const el = document.createElement("div");
                el.className = "crate-item-moving";
                el.style.left = `-70px`;
                el.innerHTML = `
                    <div class="crate-box">${randomItem.icon}</div>
                    <div class="crate-key-badge">${randomKey}</div>
                `;
                field.appendChild(el);
                activeEntities.push({
                    type: 'truck_crate',
                    key: randomKey.toLowerCase(),
                    el: el,
                    pos: -70,
                    speed: 1.4 + Math.random() * 0.6
                });
            } else if (theme === 'pest_defense') {
                // 5. Sâu bọ bò ngang mang từ Tiếng Việt
                const wordObj = cfg.words[Math.floor(Math.random() * cfg.words.length)];
                const topPercent = 15 + Math.random() * 55;
                const rawWord = wordObj.word.toLowerCase();
                const rawNoTone = removeVietnameseDiacritics(rawWord);

                const el = document.createElement("div");
                el.className = "pest-crawler";
                el.style.right = `-120px`;
                el.style.top = `${topPercent}%`;
                el.innerHTML = `
                    <div class="pest-crawler-icon">${wordObj.icon || '🐛'}</div>
                    <div class="pest-word-target">${wordObj.word}</div>
                `;
                field.appendChild(el);
                activeEntities.push({
                    type: 'pest',
                    word: rawWord,
                    rawNoTone: rawNoTone,
                    typed: "",
                    el: el,
                    pos: -120,
                    speed: 1.1 + Math.random() * 0.4
                });
            }
        }

        function spawnMole() {
            if (!isRunning) return;
            const cat = window.TYPING_DATA.categories[catIndex];
            const cfg = cat.miniGame;
            const randomHoleIdx = Math.floor(Math.random() * 6);
            const holeEl = document.getElementById(`mole-hole-${randomHoleIdx}`);
            if (!holeEl || holeEl.querySelector('.mole-entity-popup')) return;

            const randomKey = cfg.keys[Math.floor(Math.random() * cfg.keys.length)];
            const randomItem = cfg.items[Math.floor(Math.random() * cfg.items.length)];

            const moleEl = document.createElement("div");
            moleEl.className = "mole-entity-popup";
            moleEl.innerHTML = `
                <div class="mole-icon">${randomItem.icon}</div>
                <div class="mole-key-badge">${randomKey}</div>
            `;
            holeEl.appendChild(moleEl);

            const entity = {
                type: 'mole',
                key: randomKey.toLowerCase(),
                el: moleEl,
                hole: holeEl
            };
            activeEntities.push(entity);

            setTimeout(() => {
                if (moleEl.parentNode) {
                    moleEl.remove();
                    activeEntities = activeEntities.filter(x => x !== entity);
                    lives--;
                    playError();
                    updateGameHUD();
                    if (lives <= 0) endGame(false);
                }
            }, cfg.stayDuration || 2600);
        }

        function startNextTractorPhrase() {
            if (!isRunning) return;
            const cat = window.TYPING_DATA.categories[catIndex];
            const cfg = cat.miniGame;
            currentPhrase = cfg.phrases[caughtCount % cfg.phrases.length];
            currentPhraseTyped = "";
            tractorPosPercent = 5 + (caughtCount / cfg.targetCount) * 80;

            renderTractorCard();
        }

        function renderTractorCard() {
            const card = document.getElementById("tractor-phrase-display");
            const avatar = document.getElementById("tractor-racer-car");
            if (!card || !currentPhrase) return;

            let html = "";
            for (let i = 0; i < currentPhrase.length; i++) {
                if (i < currentPhraseTyped.length) {
                    html += `<span style="color: #4ade80; background: rgba(74, 222, 128, 0.2); border-radius: 4px;">${currentPhrase[i]}</span>`;
                } else if (i === currentPhraseTyped.length) {
                    html += `<span style="color: #ffffff; background: #0284c7; border-radius: 4px; padding: 0 2px;">${currentPhrase[i]}</span>`;
                } else {
                    html += `<span style="color: #94a3b8;">${currentPhrase[i]}</span>`;
                }
            }
            card.innerHTML = html;

            if (avatar) {
                const subProgress = currentPhrase.length > 0 ? (currentPhraseTyped.length / currentPhrase.length) * 15 : 0;
                avatar.style.left = `${Math.min(88, tractorPosPercent + subProgress)}%`;
            }
        }

        // ================= GAME LOOP ĐỘNG LỰC =================
        function gameLoop(time) {
            if (!isRunning) return;
            const delta = (time - lastTime) / 16;
            lastTime = time;

            const field = document.getElementById("minigame-playfield-arena");
            const groundY = field ? field.clientHeight - 70 : 450;
            const arenaWidth = field ? field.clientWidth : 800;

            for (let i = activeEntities.length - 1; i >= 0; i--) {
                const item = activeEntities[i];

                if (item.type === 'drop') {
                    item.pos += item.speed * delta;
                    item.el.style.top = `${item.pos}px`;
                    if (item.pos >= groundY) {
                        item.el.remove();
                        activeEntities.splice(i, 1);
                        handleMiss();
                    }
                } else if (item.type === 'rise') {
                    item.pos += item.speed * delta;
                    item.el.style.bottom = `${item.pos}px`;
                    if (item.pos >= groundY) {
                        item.el.remove();
                        activeEntities.splice(i, 1);
                        handleMiss();
                    }
                } else if (item.type === 'truck_crate') {
                    item.pos += item.speed * delta * 1.3;
                    item.el.style.left = `${item.pos}px`;
                    if (item.pos >= arenaWidth - 170) {
                        item.el.remove();
                        activeEntities.splice(i, 1);
                        handleMiss();
                    }
                } else if (item.type === 'pest') {
                    item.pos += item.speed * delta;
                    item.el.style.right = `${item.pos}px`;
                    if (item.pos >= arenaWidth - 80) {
                        item.el.remove();
                        activeEntities.splice(i, 1);
                        handleMiss();
                    }
                }
            }

            animFrame = requestAnimationFrame(gameLoop);
        }

        function handleMiss() {
            lives--;
            playError();
            updateGameHUD();
            if (lives <= 0) endGame(false);
        }

        function handleBackspace() {
            if (!isRunning) return;
            const cat = window.TYPING_DATA.categories[catIndex];
            const cfg = cat.miniGame;
            const theme = cfg.theme;

            if (theme === 'tractor_rush') {
                if (currentPhraseTyped.length > 0) {
                    currentPhraseTyped = currentPhraseTyped.slice(0, -1);
                    renderTractorCard();
                }
            } else if (theme === 'pest_defense') {
                for (let ent of activeEntities) {
                    if (ent.type === 'pest' && ent.typed.length > 0) {
                        ent.typed = ent.typed.slice(0, -1);
                        const wordEl = ent.el.querySelector('.pest-word-target');
                        if (wordEl) {
                            wordEl.innerHTML = `<span style="color:#4ade80;background:#15803d;padding:0 2px;border-radius:3px;">${ent.typed}</span>${ent.word.substring(ent.typed.length)}`;
                        }
                    }
                }
            }
        }

        // ================= XỬ LÝ PHÍM BẤM THÔNG MINH =================
        function handleKey(char) {
            if (!isRunning) return;
            const cat = window.TYPING_DATA.categories[catIndex];
            const cfg = cat.miniGame;
            const theme = cfg.theme;
            const k = char.toLowerCase();
            const kNoTone = removeVietnameseDiacritics(k);

            if (theme === 'tractor_rush') {
                // Chế độ đua xe máy cày (so khớp từng ký tự của câu tiếng Việt linh hoạt)
                const expectedChar = currentPhrase[currentPhraseTyped.length];
                if (!expectedChar) return;

                const expLow = expectedChar.toLowerCase();
                const expNoTone = removeVietnameseDiacritics(expLow);

                const isMatch = (char === expectedChar) || 
                                (k === expLow) || 
                                (kNoTone === expNoTone) ||
                                (char === ' ' && expectedChar === ' ');

                if (isMatch) {
                    currentPhraseTyped += expectedChar;
                    playTone(550 + currentPhraseTyped.length * 15, 'sine', 0.05, 0.05);
                    renderTractorCard();

                    if (currentPhraseTyped.length >= currentPhrase.length) {
                        caughtCount++;
                        score += 25;
                        playHarvestPop();
                        showSplat(300, 200, "💨 NITRO TURBO!");
                        updateGameHUD();

                        if (caughtCount >= cfg.targetCount) {
                            endGame(true);
                        } else {
                            setTimeout(startNextTractorPhrase, 350);
                        }
                    }
                } else {
                    playError();
                }
                return;
            }

            if (theme === 'pest_defense') {
                // Chế độ trừ sâu: So khớp từ vựng tiếng Việt linh hoạt (cả có dấu lẫn không dấu/Telex)
                let matchedEntity = null;

                for (let ent of activeEntities) {
                    if (ent.type === 'pest') {
                        const targetWord = ent.word;
                        const targetNoTone = ent.rawNoTone;
                        const curTyped = ent.typed;
                        const nextIndex = curTyped.length;

                        const expectedCharWithTone = targetWord[nextIndex];
                        const expectedCharNoTone = targetNoTone[nextIndex];

                        if (expectedCharWithTone && (k === expectedCharWithTone || k === expectedCharNoTone || kNoTone === expectedCharNoTone)) {
                            matchedEntity = ent;
                            break;
                        }
                    }
                }

                if (matchedEntity) {
                    matchedEntity.typed += matchedEntity.word[matchedEntity.typed.length];
                    playTone(720 + matchedEntity.typed.length * 40, 'triangle', 0.05, 0.05);

                    const wordEl = matchedEntity.el.querySelector('.pest-word-target');
                    if (wordEl) {
                        wordEl.innerHTML = `<span style="color:#ffffff;background:#15803d;padding:0 2px;border-radius:3px;">${matchedEntity.typed}</span>${matchedEntity.word.substring(matchedEntity.typed.length)}`;
                    }

                    if (matchedEntity.typed.length >= matchedEntity.word.length) {
                        // Diệt sâu thành công!
                        score += 15;
                        caughtCount++;
                        playHarvestPop();
                        showSplat(matchedEntity.el.offsetLeft, matchedEntity.el.offsetTop, "💦 XỊT NƯỚC!");
                        matchedEntity.el.remove();
                        activeEntities = activeEntities.filter(x => x !== matchedEntity);
                        updateGameHUD();

                        if (caughtCount >= cfg.targetCount) endGame(true);
                    }
                } else {
                    playClick();
                }
                return;
            }

            // Chế độ Farm Drop, Balloon Rise, Whack Mole, Truck Loading
            let targetIdx = -1;
            for (let i = 0; i < activeEntities.length; i++) {
                if (activeEntities[i].key === k || activeEntities[i].key === kNoTone) {
                    targetIdx = i;
                    break;
                }
            }

            if (targetIdx !== -1) {
                const item = activeEntities[targetIdx];
                score += 10;
                caughtCount++;
                playHarvestPop();

                const splatX = item.el.offsetLeft || 300;
                const splatY = item.el.offsetTop || 200;
                showSplat(splatX, splatY, `+10 ⭐`);

                item.el.remove();
                activeEntities.splice(targetIdx, 1);
                updateGameHUD();

                if (caughtCount >= cfg.targetCount) {
                    endGame(true);
                }
            } else {
                playClick();
            }
        }

        function showSplat(x, y, text) {
            const field = document.getElementById("minigame-playfield-arena");
            if (!field) return;
            const splat = document.createElement("div");
            splat.className = "fruit-splat";
            splat.style.left = `${Math.max(40, Math.min(field.clientWidth - 40, x))}px`;
            splat.style.top = `${Math.max(30, Math.min(field.clientHeight - 40, y))}px`;
            splat.style.color = "#fbbf24";
            splat.innerText = text;
            field.appendChild(splat);
            setTimeout(() => splat.remove(), 600);
        }

        function updateGameHUD() {
            const scoreEl = document.getElementById("minigame-hud-score");
            const livesEl = document.getElementById("minigame-hud-lives");
            const progressEl = document.getElementById("minigame-hud-progress");
            const cat = window.TYPING_DATA.categories[catIndex];

            if (scoreEl) scoreEl.innerText = `⭐ ${score}`;
            if (livesEl) livesEl.innerText = `❤️`.repeat(Math.max(0, lives)) + `🖤`.repeat(Math.max(0, 3 - lives));
            if (progressEl && cat && cat.miniGame) {
                progressEl.innerText = `🎯 ${caughtCount}/${cat.miniGame.targetCount}`;
            }
        }

        function endGame(won) {
            stop();
            const cat = window.TYPING_DATA.categories[catIndex];
            if (won) {
                playVictory();
                const coins = cat.miniGame.rewardCoins || 30;
                const xp = cat.miniGame.rewardXp || 60;
                giveFarmReward(coins, xp);

                if (typeof showFloatingToast === 'function') {
                    showFloatingToast(`🎉 XUẤT SẮC! Hoàn thành ôn tập ${cat.title}! Nhận +${coins} 🪙 và +${xp} XP!`);
                }
                showResultModal(3, coins);
            } else {
                if (typeof showFloatingToast === 'function') {
                    showFloatingToast(`💔 Tiếc quá, thử lại nhé bé ơi! Cố gắng gõ nhanh hơn nhé!`);
                }
            }
        }

        return {
            start: start,
            stop: stop,
            isActive: () => isRunning,
            handleKey: handleKey,
            handleBackspace: handleBackspace
        };
    })();

    return {
        init: init,
        openLessonModal: openLessonModal,
        closeLessonModal: closeLessonModal,
        selectLessonFromModal: selectLessonFromModal,
        loadLesson: loadLesson,
        retry: retryCurrentLesson,
        next: nextLesson,
        setImeMode: setImeMode,
        startMiniGame: (catIdx) => {
            closeLessonModal();
            TypingFarmGame.start(catIdx);
        },
        farmGame: TypingFarmGame
    };
})();
