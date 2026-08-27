/**
 * TYPING ACADEMY ENGINE
 * Xử lý sự kiện bàn phím, phân tích Telex/VNI, tính WPM/Accuracy và điều phối giao diện
 * Thiết kế tối giản, to rõ theo phong cách Typing.com
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

    function playClick() { playTone(550, 'triangle', 0.04, 0.04); }
    function playCorrect() { playTone(800, 'sine', 0.05, 0.04); }
    function playError() { playTone(180, 'sawtooth', 0.1, 0.06); }
    function playVictory() {
        [523, 659, 784, 1046].forEach((f, i) => {
            setTimeout(() => playTone(f, 'triangle', 0.25, 0.08), i * 110);
        });
    }

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
            <div style="background: #1e293b; border-radius: 16px; padding: 16px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-weight: 800; font-size: 15px; color: #38bdf8;">
                        <i class="${cat.icon}" style="margin-right: 8px;"></i> ${cat.title}
                    </span>
                    <span style="font-size: 12px; font-weight: 800; color: #fbbf24;">
                        +${cat.rewardCoins} 🪙
                    </span>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${cat.lessons.map((les, lIdx) => {
                        const isCurrent = (cIdx === state.catIndex && lIdx === state.lessonIndex);
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
        // Xóa highlight cũ trên bàn phím
        document.querySelectorAll(".kb-clean-key").forEach(k => k.classList.remove("key-target"));
        // Xóa active cũ trên các ngón tay SVG
        document.querySelectorAll(".svg-finger").forEach(f => f.classList.remove("active"));

        if (state.currentIndex >= state.targetText.length) return;

        const nextChar = state.targetText[state.currentIndex];
        let keyToHighlight = nextChar.toLowerCase();

        // Xử lý phím đặc biệt
        if (nextChar === ' ') keyToHighlight = ' ';

        // Tìm phím ảo tương ứng
        const keyEl = document.querySelector(`.kb-clean-key[data-key="${keyToHighlight}"]`);
        if (keyEl) {
            keyEl.classList.add("key-target");
        }

        // Highlight ngón tay SVG trực quan
        const finger = getFingerForKey(keyToHighlight);
        if (finger) {
            if (finger.id === 'thumb') {
                // Ngón cái
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
            const keyEl = document.querySelector(`.kb-clean-key[data-key="${pressedKey === ' ' ? ' ' : pressedKey}"]`);
            if (keyEl) {
                keyEl.classList.add("key-pressed");
                setTimeout(() => keyEl.classList.remove("key-pressed"), 100);
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

            // Nhận ký tự độ dài 1
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

        giveFarmReward(reward);
        showResultModal(stars, reward);
    }

    // Tặng thưởng vàng vào gameState của Edu-Farm
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
    }

    return {
        init: init,
        openLessonModal: openLessonModal,
        closeLessonModal: closeLessonModal,
        selectLessonFromModal: selectLessonFromModal,
        loadLesson: loadLesson,
        retry: retryCurrentLesson,
        next: nextLesson,
        setImeMode: setImeMode
    };
})();
