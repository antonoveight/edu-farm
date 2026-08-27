/**
 * TYPING ACADEMY ENGINE
 * Xử lý sự kiện bàn phím, phân tích Telex/VNI, tính WPM/Accuracy và điều phối giao diện
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
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playTone(freq, type = 'sine', duration = 0.08, vol = 0.06) {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(vol, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    function playClick() { playTone(600, 'triangle', 0.04, 0.04); }
    function playCorrect() { playTone(880, 'sine', 0.06, 0.05); }
    function playError() { playTone(180, 'sawtooth', 0.12, 0.08); }
    function playVictory() {
        [523, 659, 784, 1046].forEach((f, i) => {
            setTimeout(() => playTone(f, 'triangle', 0.25, 0.1), i * 120);
        });
    }

    // Khởi tạo giao diện
    function init() {
        renderCategories();
        renderKeyboard();
        setupEventListeners();
        loadLesson(0, 0);
    }

    // Render danh mục bài học
    function renderCategories() {
        const listEl = document.getElementById("typing-cat-list");
        if (!listEl) return;

        const cats = window.TYPING_DATA.categories;
        listEl.innerHTML = cats.map((cat, idx) => `
            <div class="typing-cat-card ${idx === state.catIndex ? 'active' : ''}" onclick="TypingEngine.selectCategory(${idx})">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: 800; font-size: 14px; color: #38bdf8;">
                        <i class="${cat.icon}" style="margin-right: 6px;"></i> ${cat.title}
                    </span>
                    <span style="font-size: 12px; font-weight: 800; color: #fbbf24; background: rgba(251, 191, 36, 0.15); padding: 2px 8px; border-radius: 6px;">
                        +${cat.rewardCoins} 🪙
                    </span>
                </div>
                <p style="font-size: 12px; color: #94a3b8; margin: 0 0 10px 0; line-height: 1.4;">${cat.desc}</p>
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                    ${cat.lessons.map((les, lIdx) => `
                        <button class="ime-btn ${idx === state.catIndex && lIdx === state.lessonIndex ? 'active' : ''}" 
                                style="font-size: 11px; padding: 4px 8px;" 
                                onclick="event.stopPropagation(); TypingEngine.loadLesson(${idx}, ${lIdx})">
                            Bài ${lIdx + 1}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Render bàn phím ảo
    function renderKeyboard() {
        const kbEl = document.getElementById("virtual-keyboard");
        if (!kbEl) return;

        const rows = [
            [
                { k: "`", l: "~" }, { k: "1", l: "!" }, { k: "2", l: "@" }, { k: "3", l: "#" }, { k: "4", l: "$" },
                { k: "5", l: "%" }, { k: "6", l: "^" }, { k: "7", l: "&" }, { k: "8", l: "*" }, { k: "9", l: "(" },
                { k: "0", l: ")" }, { k: "-", l: "_" }, { k: "=", l: "+" }, { k: "Backspace", label: "⌫ Xóa", cls: "kb-key-wide" }
            ],
            [
                { k: "Tab", label: "Tab", cls: "kb-key-wide" },
                { k: "q" }, { k: "w" }, { k: "e" }, { k: "r" }, { k: "t" }, { k: "y" }, { k: "u" }, { k: "i" }, { k: "o" }, { k: "p" },
                { k: "[" }, { k: "]" }, { k: "\\" }
            ],
            [
                { k: "CapsLock", label: "Caps", cls: "kb-key-wide" },
                { k: "a" }, { k: "s" }, { k: "d" }, { k: "f" }, { k: "g" }, { k: "h" }, { k: "j" }, { k: "k" }, { k: "l" },
                { k: ";" }, { k: "'" }, { k: "Enter", label: "↵ Enter", cls: "kb-key-wider" }
            ],
            [
                { k: "Shift", label: "⇧ Shift", cls: "kb-key-wider" },
                { k: "z" }, { k: "x" }, { k: "c" }, { k: "v" }, { k: "b" }, { k: "n" }, { k: "m" },
                { k: "," }, { k: "." }, { k: "/" }, { k: "Shift", label: "⇧ Shift", cls: "kb-key-wider" }
            ],
            [
                { k: " ", label: "Space (Dấu Cách)", cls: "kb-key-space" }
            ]
        ];

        kbEl.innerHTML = rows.map(row => `
            <div class="kb-row">
                ${row.map(item => {
                    const keyVal = item.k.toLowerCase();
                    const fingerInfo = getFingerForKey(keyVal);
                    const colorStyle = fingerInfo ? `border-bottom: 3px solid ${fingerInfo.color};` : '';
                    return `
                        <div class="kb-key ${item.cls || ''}" data-key="${keyVal}" style="${colorStyle}">
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

        document.getElementById("typing-lesson-title").innerText = `${cats[catIdx].title} – ${cats[catIdx].lessons[lesIdx].name}`;
        
        renderCategories();
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
            const displayChar = char === ' ' ? ' ' : char;
            let cls = "char-pending";

            if (i < state.currentIndex) {
                cls = state.charStates[i] === 'correct' ? 'char-correct' : 'char-wrong';
            } else if (i === state.currentIndex) {
                cls = "char-current";
            }

            html += `<span class="${cls}">${displayChar}</span>`;
        }
        displayEl.innerHTML = html;
    }

    // Highlight phím tiếp theo và ngón tay trên mô hình
    function highlightGuide() {
        // Xóa highlight cũ trên bàn phím
        document.querySelectorAll(".kb-key").forEach(k => k.classList.remove("key-target"));
        // Xóa active cũ trên bàn tay
        document.querySelectorAll(".finger-indicator").forEach(f => f.classList.remove("active"));

        if (state.currentIndex >= state.targetText.length) return;

        const nextChar = state.targetText[state.currentIndex];
        let keyToHighlight = nextChar.toLowerCase();

        // Xử lý phím đặc biệt
        if (nextChar === ' ') keyToHighlight = ' ';

        // Tìm phím ảo tương ứng
        const keyEl = document.querySelector(`.kb-key[data-key="${keyToHighlight}"]`);
        if (keyEl) {
            keyEl.classList.add("key-target");
        }

        // Highlight ngón tay
        const finger = getFingerForKey(keyToHighlight);
        if (finger) {
            const fingerEl = document.getElementById(`finger-${finger.id}`);
            if (fingerEl) {
                fingerEl.classList.add("active");
                const hintText = document.getElementById("typing-finger-hint");
                if (hintText) {
                    hintText.innerHTML = `Sử dụng: <b style="color: ${finger.color}">${finger.name}</b> để nhấn phím <b style="color: #fef08a">[ ${nextChar === ' ' ? 'Dấu Cách (Space)' : nextChar} ]</b>`;
                }
            }
        }
    }

    // Xử lý sự kiện nhấn phím
    function setupEventListeners() {
        window.addEventListener("keydown", function(e) {
            const screenTyping = document.getElementById("screen-typing");
            if (!screenTyping || screenTyping.style.display !== "flex") return;

            // Bỏ qua các phím điều khiển hệ thống
            if (e.key === "Tab" || e.key === "Alt" || e.key === "Control" || e.key === "Meta" || e.key === "CapsLock") {
                if (e.key === "Tab") e.preventDefault();
                return;
            }

            // Hiệu ứng bấm phím ảo
            const pressedKey = e.key.toLowerCase();
            const keyEl = document.querySelector(`.kb-key[data-key="${pressedKey === ' ' ? ' ' : pressedKey}"]`);
            if (keyEl) {
                keyEl.classList.add("key-pressed");
                setTimeout(() => keyEl.classList.remove("key-pressed"), 120);
            }

            // Bắt đầu tính giờ từ phím đầu tiên
            if (!state.startTime && !state.completed) {
                state.startTime = Date.now();
                state.timerInterval = setInterval(updateTimerAndWPM, 500);
            }

            if (state.completed) return;

            // Xử lý phím Backspace
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

            // Chỉ nhận ký tự có độ dài 1 (bao gồm cả ký tự tiếng Việt có dấu từ IME)
            if (e.key.length === 1) {
                e.preventDefault();
                handleCharacterInput(e.key);
            }
        });
    }

    // Xử lý ký tự người dùng gõ
    function handleCharacterInput(char) {
        const expectedChar = state.targetText[state.currentIndex];
        state.totalTyped++;

        if (char === expectedChar) {
            // Gõ đúng
            state.charStates[state.currentIndex] = 'correct';
            state.streak++;
            if (state.streak > state.maxStreak) state.maxStreak = state.streak;
            playCorrect();
        } else {
            // Gõ sai
            state.charStates[state.currentIndex] = 'wrong';
            state.errorCount++;
            state.streak = 0;
            playError();
        }

        state.currentIndex++;
        renderText();
        updateHUD();
        highlightGuide();

        // Kiểm tra hoàn thành bài
        if (state.currentIndex >= state.targetText.length) {
            finishLesson();
        }
    }

    // Cập nhật Timer và tính toán WPM
    function updateTimerAndWPM() {
        if (!state.startTime) return;
        const elapsedSeconds = Math.max(1, Math.floor((Date.now() - state.startTime) / 1000));
        const minutes = elapsedSeconds / 60;
        
        // Công thức tính WPM tiêu chuẩn: (Ký tự đúng / 5) / Phút
        const correctChars = state.charStates.filter(s => s === 'correct').length;
        state.wpm = Math.round((correctChars / 5) / minutes) || 0;
        
        // Độ chính xác
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

        // Tặng vàng nông trại
        giveFarmReward(reward);

        // Hiển thị Modal kết quả
        showResultModal(stars, reward);
    }

    // Tặng thưởng vàng vào gameState của game Edu-Farm
    function giveFarmReward(coins) {
        if (coins <= 0) return;
        try {
            if (typeof gameState !== 'undefined' && gameState) {
                gameState.coins = (gameState.coins || 0) + coins;
                gameState.xp = (gameState.xp || 0) + coins * 2;
                if (typeof saveDataForMode === 'function') saveDataForMode();
                if (typeof updateHeaderStats === 'function') updateHeaderStats();
            }
        } catch (e) {
            console.error("Lỗi khi cộng thưởng vàng:", e);
        }
    }

    // Hiển thị Modal tổng kết bài gõ
    function showResultModal(stars, reward) {
        const modal = document.getElementById("modal-typing-result");
        if (!modal) return;

        const starDisplay = "⭐".repeat(stars) + "☆".repeat(3 - stars);
        document.getElementById("typing-res-stars").innerText = starDisplay;
        document.getElementById("typing-res-wpm").innerText = `${state.wpm} WPM`;
        document.getElementById("typing-res-acc").innerText = `${state.accuracy}%`;
        document.getElementById("typing-res-streak").innerText = state.maxStreak;
        document.getElementById("typing-res-coins").innerText = `+${reward} Vàng Nông Trại`;

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
        const hintBadge = document.getElementById("typing-ime-badge");
        if (hintBadge) {
            hintBadge.innerText = mode.toUpperCase();
        }
    }

    return {
        init: init,
        selectCategory: function(idx) { loadLesson(idx, 0); },
        loadLesson: loadLesson,
        retry: retryCurrentLesson,
        next: nextLesson,
        setImeMode: setImeMode
    };
})();
