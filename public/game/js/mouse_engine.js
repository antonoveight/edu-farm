/**
 * MOUSE MASTERY ENGINE
 * Động cơ xử lý 5 kỹ năng chuột: Click đơn, Click đúp, Click phải, Drag & Drop, Hover Tracking
 * Tích hợp hệ thống tính điểm, âm thanh Web Audio và trao thưởng Nông Trại EduFarm
 */

window.MouseEngine = (function() {
    let state = {
        levelIndex: 0,
        score: 0,
        completedCount: 0,
        missCount: 0,
        totalClicks: 0,
        startTime: null,
        timerInterval: null,
        spawnInterval: null,
        timeLeft: 30,
        isRunning: false,
        activeEntities: [],
        draggedItem: null
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

    function playPop() { playTone(650, 'triangle', 0.06, 0.05); }
    function playSuccess() { playTone(880, 'sine', 0.08, 0.05); }
    function playDropSuccess() { playTone(920, 'triangle', 0.1, 0.06); }
    function playError() { playTone(160, 'sawtooth', 0.12, 0.06); }
    function playVictory() {
        [523, 659, 784, 1046].forEach((f, i) => {
            setTimeout(() => playTone(f, 'triangle', 0.25, 0.08), i * 110);
        });
    }

    function init() {
        renderLevelPickerList();
        setupArenaGlobalListeners();
        loadLevel(0);
    }

    function renderLevelPickerList() {
        const modalContainer = document.getElementById("mouse-levels-list-container");
        if (!modalContainer) return;

        const cats = window.MOUSE_DATA.categories;
        modalContainer.innerHTML = cats.map((cat, cIdx) => `
            <div style="background: #1e293b; border-radius: 16px; padding: 16px; border: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;"
                 class="mouse-level-row-item"
                 onclick="MouseEngine.selectLevelFromModal(${cIdx})">
                <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(56,189,248,0.15); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        <i class="${cat.icon}"></i>
                    </div>
                    <div>
                        <div style="font-weight: 800; font-size: 15px; color: #f1f5f9;">${cat.title}</div>
                        <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">${cat.desc}</div>
                    </div>
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #fbbf24;">
                    +${cat.rewardCoins} 🪙
                </div>
            </div>
        `).join('');
    }

    function openLevelModal() {
        renderLevelPickerList();
        const modal = document.getElementById("modal-mouse-level-picker");
        if (modal) modal.style.display = "flex";
    }

    function closeLevelModal() {
        const modal = document.getElementById("modal-mouse-level-picker");
        if (modal) modal.style.display = "none";
    }

    function selectLevelFromModal(levelIdx) {
        closeLevelModal();
        loadLevel(levelIdx);
    }

    function loadLevel(levelIdx) {
        stopGame();
        state.levelIndex = levelIdx;
        const cat = window.MOUSE_DATA.categories[levelIdx];
        if (!cat) return;

        state.score = 0;
        state.completedCount = 0;
        state.missCount = 0;
        state.totalClicks = 0;
        state.timeLeft = cat.timeLimit || 30;
        state.isRunning = true;
        state.activeEntities = [];

        // Cập nhật giao diện Tiêu đề & Hướng dẫn
        const titleEl = document.getElementById("mouse-level-title");
        const instEl = document.getElementById("mouse-instruction-text");
        if (titleEl) titleEl.innerText = cat.title;
        if (instEl) instEl.innerText = cat.instruction;

        updateHUD();
        clearArena();

        // Chặn contextmenu trên sân chơi
        const arena = document.getElementById("mouse-playground-arena");
        if (arena) {
            arena.oncontextmenu = (e) => {
                e.preventDefault();
                if (cat.theme === 'right_click') {
                    handleArenaRightClick(e);
                }
                return false;
            };
        }

        // Bắt đầu chế độ tương ứng
        if (cat.theme === 'single_click' || cat.theme === 'double_click' || cat.theme === 'right_click') {
            startSpawningMode(cat);
        } else if (cat.theme === 'drag_drop') {
            startDragDropMode(cat);
        } else if (cat.theme === 'hover_tracking') {
            startHoverTrackingMode(cat);
        }

        // Đồng hồ đếm ngược
        state.startTime = Date.now();
        state.timerInterval = setInterval(() => {
            if (!state.isRunning) return;
            state.timeLeft--;
            updateHUD();
            if (state.timeLeft <= 0) {
                finishGame(state.completedCount >= Math.floor(cat.targetCount * 0.7));
            }
        }, 1000);
    }

    function stopGame() {
        state.isRunning = false;
        if (state.timerInterval) clearInterval(state.timerInterval);
        if (state.spawnInterval) clearInterval(state.spawnInterval);
        clearArena();
    }

    function clearArena() {
        const arena = document.getElementById("mouse-playground-arena");
        if (arena) arena.innerHTML = "";
        state.activeEntities = [];
    }

    function updateHUD() {
        const cat = window.MOUSE_DATA.categories[state.levelIndex];
        const scoreEl = document.getElementById("mouse-hud-score");
        const progressEl = document.getElementById("mouse-hud-progress");
        const accEl = document.getElementById("mouse-hud-accuracy");
        const timerEl = document.getElementById("mouse-hud-timer");

        if (scoreEl) scoreEl.innerText = state.score;
        if (progressEl && cat) progressEl.innerText = `${state.completedCount}/${cat.targetCount}`;
        
        let acc = 100;
        if (state.totalClicks > 0) {
            acc = Math.max(0, Math.min(100, Math.round((state.completedCount / state.totalClicks) * 100)));
        }
        if (accEl) accEl.innerText = `${acc}%`;

        if (timerEl) {
            const m = String(Math.floor(state.timeLeft / 60)).padStart(2, '0');
            const s = String(state.timeLeft % 60).padStart(2, '0');
            timerEl.innerText = `${m}:${s}`;
        }
    }

    function setupArenaGlobalListeners() {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        arena.addEventListener("click", function(e) {
            if (!state.isRunning) return;
            state.totalClicks++;
            updateHUD();
        });
    }

    // ================= CHẾ ĐỘ 1, 2, 3: SPAWNING CLICK MODES =================
    function startSpawningMode(cat) {
        spawnClickEntity(cat);
        state.spawnInterval = setInterval(() => {
            if (state.activeEntities.length < 5) {
                spawnClickEntity(cat);
            }
        }, 1200);
    }

    function spawnClickEntity(cat) {
        if (!state.isRunning) return;
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const item = cat.items[Math.floor(Math.random() * cat.items.length)];
        const left = 10 + Math.random() * 80;
        const top = 15 + Math.random() * 70;

        const el = document.createElement("div");
        el.className = "mouse-target-entity";
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;

        el.innerHTML = `
            <div class="mouse-target-bubble">${item.icon}</div>
            <div class="mouse-target-label">${item.name}</div>
        `;

        if (cat.theme === 'single_click') {
            el.onclick = (e) => {
                e.stopPropagation();
                handleEntityHit(el, item, `+${item.points} ⭐`);
            };
        } else if (cat.theme === 'double_click') {
            el.ondblclick = (e) => {
                e.stopPropagation();
                el.querySelector('.mouse-target-bubble').innerText = item.crackedIcon || "🎁";
                handleEntityHit(el, item, `MỞ THÀNH CÔNG! +${item.points} ⭐`);
            };
        } else if (cat.theme === 'right_click') {
            el.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                el.querySelector('.mouse-target-bubble').innerText = item.curedIcon || "🌟";
                handleEntityHit(el, item, `TƯỚI CÂY! +${item.points} ⭐`);
            };
        }

        arena.appendChild(el);
        state.activeEntities.push(el);

        // Tự động biến mất sau 4 giây nếu bé chưa bấm kịp
        setTimeout(() => {
            if (el.parentNode) {
                el.remove();
                state.activeEntities = state.activeEntities.filter(x => x !== el);
            }
        }, 4000);
    }

    function handleEntityHit(el, item, popText) {
        if (!state.isRunning) return;
        playPop();
        state.score += item.points || 10;
        state.completedCount++;
        showPopEffect(el.offsetLeft, el.offsetTop, popText);

        setTimeout(() => {
            if (el.parentNode) el.remove();
            state.activeEntities = state.activeEntities.filter(x => x !== el);
        }, 200);

        updateHUD();

        const cat = window.MOUSE_DATA.categories[state.levelIndex];
        if (state.completedCount >= cat.targetCount) {
            finishGame(true);
        }
    }

    function handleArenaRightClick(e) {
        // Click phải ra ngoài khoảng trống (miss)
        state.totalClicks++;
        updateHUD();
    }

    // ================= CHẾ ĐỘ 4: DRAG & DROP MODE =================
    function startDragDropMode(cat) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        // Tạo các giỏ đựng ở dưới
        const basketsContainer = document.createElement("div");
        basketsContainer.className = "drag-baskets-container";

        cat.baskets.forEach(basket => {
            const bEl = document.createElement("div");
            bEl.className = "drag-basket-slot";
            bEl.dataset.acceptType = basket.acceptType;
            bEl.style.borderColor = basket.color;
            bEl.style.color = basket.color;
            bEl.innerHTML = `
                <div class="drag-basket-icon">${basket.icon}</div>
                <div class="drag-basket-title">${basket.label}</div>
            `;
            basketsContainer.appendChild(bEl);
        });
        arena.appendChild(basketsContainer);

        spawnDragProduce(cat);
        state.spawnInterval = setInterval(() => {
            if (state.activeEntities.length < 4) {
                spawnDragProduce(cat);
            }
        }, 2000);
    }

    function spawnDragProduce(cat) {
        if (!state.isRunning) return;
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const item = cat.items[Math.floor(Math.random() * cat.items.length)];
        const left = 15 + Math.random() * 70;
        const top = 15 + Math.random() * 35;

        const pEl = document.createElement("div");
        pEl.className = "draggable-produce";
        pEl.style.left = `${left}%`;
        pEl.style.top = `${top}%`;
        pEl.dataset.type = item.type;
        pEl.innerHTML = item.icon;

        setupDragEvents(pEl);

        arena.appendChild(pEl);
        state.activeEntities.push(pEl);
    }

    function setupDragEvents(el) {
        let isDragging = false;
        let startX, startY;

        el.onmousedown = function(e) {
            if (e.button !== 0) return; // Chỉ nhận chuột trái
            e.preventDefault();
            isDragging = true;
            state.draggedItem = el;

            const arena = document.getElementById("mouse-playground-arena");
            const rect = arena.getBoundingClientRect();

            function onMouseMove(moveEvent) {
                if (!isDragging) return;
                const x = moveEvent.clientX - rect.left;
                const y = moveEvent.clientY - rect.top;
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;

                // Kiểm tra hover vào giỏ
                document.querySelectorAll(".drag-basket-slot").forEach(basket => {
                    const bRect = basket.getBoundingClientRect();
                    if (moveEvent.clientX >= bRect.left && moveEvent.clientX <= bRect.right &&
                        moveEvent.clientY >= bRect.top && moveEvent.clientY <= bRect.bottom) {
                        basket.classList.add("basket-hover");
                    } else {
                        basket.classList.remove("basket-hover");
                    }
                });
            }

            function onMouseUp(upEvent) {
                if (!isDragging) return;
                isDragging = false;
                state.draggedItem = null;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);

                // Kiểm tra thả vào giỏ
                let dropped = false;
                document.querySelectorAll(".drag-basket-slot").forEach(basket => {
                    basket.classList.remove("basket-hover");
                    const bRect = basket.getBoundingClientRect();
                    if (upEvent.clientX >= bRect.left && upEvent.clientX <= bRect.right &&
                        upEvent.clientY >= bRect.top && upEvent.clientY <= bRect.bottom) {
                        dropped = true;
                        if (basket.dataset.acceptType === el.dataset.type) {
                            // Đúng giỏ!
                            playDropSuccess();
                            state.score += 15;
                            state.completedCount++;
                            showPopEffect(basket.offsetLeft + 100, basket.offsetTop, "+15 ⭐ ĐÚNG GIỎ!");
                            el.remove();
                            state.activeEntities = state.activeEntities.filter(x => x !== el);
                            updateHUD();

                            const cat = window.MOUSE_DATA.categories[state.levelIndex];
                            if (state.completedCount >= cat.targetCount) {
                                finishGame(true);
                            }
                        } else {
                            // Sai giỏ
                            playError();
                            showPopEffect(el.offsetLeft, el.offsetTop, "❌ Sai Giỏ!");
                            // Bay về vị trí ban đầu
                            el.style.top = "25%";
                        }
                    }
                });

                if (!dropped) {
                    el.style.top = "25%";
                }
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };
    }

    // ================= CHẾ ĐỘ 5: HOVER & TRACKING (ĐƯỜNG BAY CỦA ONG) =================
    function startHoverTrackingMode(cat) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const canvas = document.createElement("canvas");
        canvas.className = "maze-canvas-overlay";
        canvas.width = arena.clientWidth || 800;
        canvas.height = arena.clientHeight || 480;
        arena.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        const pathPoints = [
            { x: 80, y: 240 },
            { x: 240, y: 100 },
            { x: 420, y: 380 },
            { x: 600, y: 140 },
            { x: 740, y: 240 }
        ];

        let beeEl = document.createElement("div");
        beeEl.className = "bee-cursor-follower";
        beeEl.innerText = "🐝";
        beeEl.style.left = `${pathPoints[0].x}px`;
        beeEl.style.top = `${pathPoints[0].y}px`;
        arena.appendChild(beeEl);

        function drawMaze() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Vẽ dải luống hoa đường đi
            ctx.beginPath();
            ctx.strokeStyle = "rgba(74, 222, 128, 0.4)";
            ctx.lineWidth = 60;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
            for (let i = 1; i < pathPoints.length; i++) {
                ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
            }
            ctx.stroke();

            // Vẽ hoa mật dẫn đường
            pathPoints.forEach((p, idx) => {
                ctx.font = "24px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                if (idx === 0) ctx.fillText("🌸", p.x, p.y);
                else if (idx === pathPoints.length - 1) ctx.fillText("🍯", p.x, p.y);
                else ctx.fillText("🌻", p.x, p.y);
            });
        }

        drawMaze();

        let currentCheckpoint = 0;

        canvas.onmousemove = function(e) {
            if (!state.isRunning) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            beeEl.style.left = `${mouseX}px`;
            beeEl.style.top = `${mouseY}px`;

            // Kiểm tra chạm checkpoint tiếp theo
            const targetPoint = pathPoints[currentCheckpoint + 1];
            if (targetPoint) {
                const dist = Math.hypot(mouseX - targetPoint.x, mouseY - targetPoint.y);
                if (dist < 35) {
                    currentCheckpoint++;
                    playSuccess();
                    state.score += 20;
                    showPopEffect(targetPoint.x, targetPoint.y, "✨ LẤY MẬT!");
                    updateHUD();

                    if (currentCheckpoint >= pathPoints.length - 1) {
                        state.completedCount++;
                        updateHUD();
                        if (state.completedCount >= cat.targetCount) {
                            finishGame(true);
                        } else {
                            currentCheckpoint = 0;
                            showPopEffect(canvas.width / 2, canvas.height / 2, "🎉 XONG CHẶNG! TIẾP TỤC NÀO!");
                        }
                    }
                }
            }
        };
    }

    function showPopEffect(x, y, text) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const pop = document.createElement("div");
        pop.className = "mouse-pop-fx";
        pop.style.left = `${x}px`;
        pop.style.top = `${y}px`;
        pop.style.color = "#fbbf24";
        pop.innerText = text;
        arena.appendChild(pop);
        setTimeout(() => pop.remove(), 600);
    }

    function finishGame(won) {
        stopGame();
        const cat = window.MOUSE_DATA.categories[state.levelIndex];

        if (won) {
            playVictory();
            const reward = cat.rewardCoins || 20;
            const xp = cat.rewardXp || 40;
            giveFarmReward(reward, xp);

            showResultModal(3, reward);
            if (typeof showFloatingToast === 'function') {
                showFloatingToast(`🏆 Chúc mừng bé đã làm chủ kỹ năng ${cat.skillName}! Nhận +${reward} 🪙 và +${xp} XP!`);
            }
        } else {
            showResultModal(1, 5);
        }
    }

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
            console.error("Lỗi cộng thưởng:", e);
        }
    }

    function showResultModal(stars, reward) {
        const modal = document.getElementById("modal-mouse-result");
        if (!modal) return;

        const starDisplay = "⭐".repeat(stars) + "☆".repeat(3 - stars);
        document.getElementById("mouse-res-stars").innerText = starDisplay;
        document.getElementById("mouse-res-score").innerText = `${state.score} Điểm`;
        document.getElementById("mouse-res-coins").innerHTML = `<span>🪙</span> +${reward} Vàng Nông Trại`;

        modal.style.display = "flex";
    }

    function retryCurrentLevel() {
        const modal = document.getElementById("modal-mouse-result");
        if (modal) modal.style.display = "none";
        loadLevel(state.levelIndex);
    }

    function nextLevel() {
        const modal = document.getElementById("modal-mouse-result");
        if (modal) modal.style.display = "none";

        const nextIdx = (state.levelIndex + 1) % window.MOUSE_DATA.categories.length;
        loadLevel(nextIdx);
    }

    return {
        init: init,
        openLevelModal: openLevelModal,
        closeLevelModal: closeLevelModal,
        selectLevelFromModal: selectLevelFromModal,
        loadLevel: loadLevel,
        retry: retryCurrentLevel,
        next: nextLevel
    };
})();
