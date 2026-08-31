/**
 * MOUSE MASTERY ENGINE
 * Động cơ xử lý 15 bài huấn luyện chuột đa cấp độ (Dễ / Vừa / Khó)
 * Tích hợp ràng buộc di chuyển con ong, định vị hiệu ứng chuẩn xác, âm thanh Web Audio & thưởng Nông Trại
 */

window.MouseEngine = (function() {
    let state = {
        levelIndex: 0,
        currentFilter: 'all', // 'all', 'easy', 'medium', 'hard'
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
    function playOffroadWarn() { playTone(220, 'sawtooth', 0.06, 0.03); }
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

    // Render danh sách bài học và bộ lọc Dễ / Vừa / Khó
    function renderLevelPickerList() {
        const modalContainer = document.getElementById("mouse-levels-list-container");
        if (!modalContainer) return;

        const levels = window.MOUSE_DATA.levels;
        const diffLabels = window.MOUSE_DATA.difficultyLabels;

        const filtered = levels.map((lvl, originalIdx) => ({ lvl, originalIdx })).filter(item => {
            if (state.currentFilter === 'all') return true;
            return item.lvl.difficulty === state.currentFilter;
        });

        modalContainer.innerHTML = `
            <div class="mouse-diff-filter-bar">
                <button class="mouse-diff-filter-btn ${state.currentFilter === 'all' ? 'active' : ''}" onclick="MouseEngine.setFilter('all')">
                    🌟 Tất Cả (${levels.length})
                </button>
                <button class="mouse-diff-filter-btn ${state.currentFilter === 'easy' ? 'active' : ''}" onclick="MouseEngine.setFilter('easy')">
                    🌱 Dễ (${levels.filter(l => l.difficulty === 'easy').length})
                </button>
                <button class="mouse-diff-filter-btn ${state.currentFilter === 'medium' ? 'active' : ''}" onclick="MouseEngine.setFilter('medium')">
                    🌿 Vừa (${levels.filter(l => l.difficulty === 'medium').length})
                </button>
                <button class="mouse-diff-filter-btn ${state.currentFilter === 'hard' ? 'active' : ''}" onclick="MouseEngine.setFilter('hard')">
                    🔥 Khó (${levels.filter(l => l.difficulty === 'hard').length})
                </button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; max-height: 55vh; overflow-y: auto; padding-right: 4px;">
                ${filtered.map(({ lvl, originalIdx }) => {
                    const diff = diffLabels[lvl.difficulty];
                    const isCurrent = (originalIdx === state.levelIndex);
                    return `
                        <div class="mouse-level-row-item" style="${isCurrent ? 'border-color: #38bdf8; background: #273549;' : ''}" onclick="MouseEngine.selectLevelFromModal(${originalIdx})">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(56,189,248,0.15); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                    ${lvl.theme === 'single_click' ? '<i class="fa-solid fa-arrow-pointer"></i>' :
                                      lvl.theme === 'double_click' ? '<i class="fa-solid fa-hand-pointer"></i>' :
                                      lvl.theme === 'right_click' ? '<i class="fa-solid fa-computer-mouse"></i>' :
                                      lvl.theme === 'drag_drop' ? '<i class="fa-solid fa-arrows-up-down-left-right"></i>' : '<i class="fa-solid fa-route"></i>'}
                                </div>
                                <div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-weight: 800; font-size: 14.5px; color: #f1f5f9;">${lvl.title}</span>
                                        <span style="font-size: 11px; font-weight: 800; padding: 1px 7px; border-radius: 6px; color: ${diff.color}; background: ${diff.bg};">
                                            ${diff.icon} ${diff.name}
                                        </span>
                                    </div>
                                    <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">${lvl.desc}</div>
                                </div>
                            </div>
                            <div style="font-size: 13px; font-weight: 800; color: #fbbf24;">
                                +${lvl.rewardCoins} 🪙
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function setFilter(filter) {
        state.currentFilter = filter;
        renderLevelPickerList();
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
        const lvl = window.MOUSE_DATA.levels[levelIdx];
        if (!lvl) return;

        state.score = 0;
        state.completedCount = 0;
        state.missCount = 0;
        state.totalClicks = 0;
        state.timeLeft = lvl.timeLimit || 30;
        state.isRunning = true;
        state.activeEntities = [];

        // Cập nhật giao diện Tiêu đề & Hướng dẫn
        const titleEl = document.getElementById("mouse-level-title");
        const instEl = document.getElementById("mouse-instruction-text");
        const diffLabels = window.MOUSE_DATA.difficultyLabels;
        const diff = diffLabels[lvl.difficulty];

        if (titleEl) {
            titleEl.innerHTML = `${lvl.title} <span style="font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px; color: ${diff.color}; background: ${diff.bg}; margin-left: 6px;">${diff.icon} ${diff.name}</span>`;
        }
        if (instEl) instEl.innerText = lvl.instruction;

        updateHUD();
        clearArena();

        const arena = document.getElementById("mouse-playground-arena");
        if (arena) {
            arena.oncontextmenu = (e) => {
                e.preventDefault();
                if (lvl.theme === 'right_click') {
                    handleArenaRightClick(e);
                }
                return false;
            };
        }

        if (lvl.theme === 'single_click' || lvl.theme === 'double_click' || lvl.theme === 'right_click') {
            startSpawningMode(lvl);
        } else if (lvl.theme === 'drag_drop') {
            startDragDropMode(lvl);
        } else if (lvl.theme === 'hover_tracking') {
            startHoverTrackingMode(lvl);
        }

        state.startTime = Date.now();
        state.timerInterval = setInterval(() => {
            if (!state.isRunning) return;
            state.timeLeft--;
            updateHUD();
            if (state.timeLeft <= 0) {
                finishGame(state.completedCount >= Math.floor(lvl.targetCount * 0.7));
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
        const lvl = window.MOUSE_DATA.levels[state.levelIndex];
        const scoreEl = document.getElementById("mouse-hud-score");
        const progressEl = document.getElementById("mouse-hud-progress");
        const accEl = document.getElementById("mouse-hud-accuracy");
        const timerEl = document.getElementById("mouse-hud-timer");

        if (scoreEl) scoreEl.innerText = state.score;
        if (progressEl && lvl) progressEl.innerText = `${state.completedCount}/${lvl.targetCount}`;
        
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

    // ================= CHẾ ĐỘ 1, 2, 3: CLICK MODES =================
    function startSpawningMode(lvl) {
        spawnClickEntity(lvl);
        state.spawnInterval = setInterval(() => {
            if (state.activeEntities.length < 5) {
                spawnClickEntity(lvl);
            }
        }, lvl.spawnSpeed || 1400);
    }

    function spawnClickEntity(lvl) {
        if (!state.isRunning) return;
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const item = lvl.items[Math.floor(Math.random() * lvl.items.length)];
        const left = 10 + Math.random() * 80;
        const top = 15 + Math.random() * 70;
        const size = lvl.itemSize || 64;

        const el = document.createElement("div");
        el.className = "mouse-target-entity";
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;

        el.innerHTML = `
            <div class="mouse-target-bubble" style="width: ${size}px; height: ${size}px; font-size: ${Math.round(size * 0.5)}px;">
                ${item.icon}
            </div>
            <div class="mouse-target-label">${item.name}</div>
        `;

        if (lvl.theme === 'single_click') {
            el.onclick = (e) => {
                e.stopPropagation();
                handleEntityHit(el, item, `+${item.points} ⭐`);
            };
        } else if (lvl.theme === 'double_click') {
            el.ondblclick = (e) => {
                e.stopPropagation();
                el.querySelector('.mouse-target-bubble').innerText = item.crackedIcon || "🎁";
                handleEntityHit(el, item, `MỞ THÀNH CÔNG! +${item.points} ⭐`);
            };
        } else if (lvl.theme === 'right_click') {
            el.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                el.querySelector('.mouse-target-bubble').innerText = item.curedIcon || "🌟";
                handleEntityHit(el, item, `TƯỚI CÂY! +${item.points} ⭐`);
            };
        }

        arena.appendChild(el);
        state.activeEntities.push(el);

        setTimeout(() => {
            if (el.parentNode) {
                el.remove();
                state.activeEntities = state.activeEntities.filter(x => x !== el);
            }
        }, lvl.stayDuration || 4000);
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
        }, 180);

        updateHUD();

        const lvl = window.MOUSE_DATA.levels[state.levelIndex];
        if (state.completedCount >= lvl.targetCount) {
            finishGame(true);
        }
    }

    function handleArenaRightClick(e) {
        state.totalClicks++;
        updateHUD();
    }

    // ================= CHẾ ĐỘ 4: DRAG & DROP MODE =================
    function startDragDropMode(lvl) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const basketsContainer = document.createElement("div");
        basketsContainer.className = "drag-baskets-container";

        lvl.baskets.forEach(basket => {
            const bEl = document.createElement("div");
            bEl.className = "drag-basket-slot";
            bEl.dataset.acceptType = basket.acceptType;
            bEl.style.borderColor = basket.borderColor || basket.color;
            bEl.style.color = basket.color;
            bEl.style.boxShadow = `0 4px 15px ${basket.color}22`;
            bEl.innerHTML = `
                <div class="drag-basket-icon">${basket.icon}</div>
                <div class="drag-basket-title">${basket.label}</div>
                <div class="drag-basket-tag">${basket.tag || 'Thả vào đây'}</div>
            `;
            basketsContainer.appendChild(bEl);
        });
        arena.appendChild(basketsContainer);

        spawnDragProduce(lvl);
        state.spawnInterval = setInterval(() => {
            if (state.activeEntities.length < 4) {
                spawnDragProduce(lvl);
            }
        }, 1800);
    }

    function spawnDragProduce(lvl) {
        if (!state.isRunning) return;
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const item = lvl.items[Math.floor(Math.random() * lvl.items.length)];
        const left = 15 + Math.random() * 70;
        const top = 15 + Math.random() * 32;

        const pEl = document.createElement("div");
        pEl.className = "draggable-produce";
        pEl.style.left = `${left}%`;
        pEl.style.top = `${top}%`;
        pEl.style.borderColor = item.colorTag || '#38bdf8';
        pEl.style.boxShadow = `0 4px 15px ${item.colorTag}66`;
        pEl.dataset.type = item.type;
        pEl.innerHTML = item.icon;

        setupDragEvents(pEl);

        arena.appendChild(pEl);
        state.activeEntities.push(pEl);
    }

    function setupDragEvents(el) {
        let isDragging = false;

        el.onmousedown = function(e) {
            if (e.button !== 0) return;
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

                let dropped = false;
                document.querySelectorAll(".drag-basket-slot").forEach(basket => {
                    basket.classList.remove("basket-hover");
                    const bRect = basket.getBoundingClientRect();
                    if (upEvent.clientX >= bRect.left && upEvent.clientX <= bRect.right &&
                        upEvent.clientY >= bRect.top && upEvent.clientY <= bRect.bottom) {
                        dropped = true;
                        if (basket.dataset.acceptType === el.dataset.type) {
                            playDropSuccess();
                            state.score += 15;
                            state.completedCount++;
                            
                            // Tính toán vị trí pop-up chuẩn xác bên trong arena
                            const arenaRect = arena.getBoundingClientRect();
                            const popX = (bRect.left + bRect.right) / 2 - arenaRect.left;
                            const popY = bRect.top - arenaRect.top - 15;
                            showPopEffect(popX, popY, "+15 ⭐ ĐÚNG GIỎ!");

                            el.remove();
                            state.activeEntities = state.activeEntities.filter(x => x !== el);
                            updateHUD();

                            const lvl = window.MOUSE_DATA.levels[state.levelIndex];
                            if (state.completedCount >= lvl.targetCount) {
                                finishGame(true);
                            }
                        } else {
                            playError();
                            const arenaRect = arena.getBoundingClientRect();
                            const popX = upEvent.clientX - arenaRect.left;
                            const popY = upEvent.clientY - arenaRect.top - 20;
                            showPopEffect(popX, popY, "❌ Sai Giỏ!");
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
    // Hàm hình học: Tìm khoảng cách từ điểm p đến đoạn thẳng (v, w) và toạ độ chiếu gần nhất
    function distToSegment(p, v, w) {
        function sqr(x) { return x * x; }
        function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y); }
        const l2 = dist2(v, w);
        if (l2 === 0) return { dist: Math.hypot(p.x - v.x, p.y - v.y), closest: v };
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        const closest = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
        return { dist: Math.hypot(p.x - closest.x, p.y - closest.y), closest };
    }

    function startHoverTrackingMode(lvl) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const canvas = document.createElement("canvas");
        canvas.className = "maze-canvas-overlay";
        canvas.width = arena.clientWidth || 800;
        canvas.height = arena.clientHeight || 480;
        arena.appendChild(canvas);

        const warnEl = document.createElement("div");
        warnEl.className = "bee-offroad-warning";
        warnEl.innerText = "⚠️ RÊ CHUỘT VÀO LUỐNG HOA!";
        arena.appendChild(warnEl);

        const ctx = canvas.getContext("2d");
        const pathPoints = lvl.pathPoints;
        const roadWidth = lvl.roadWidth || 60;
        const roadRadius = roadWidth / 2;

        let beeEl = document.createElement("div");
        beeEl.className = "bee-cursor-follower";
        beeEl.innerText = "🐝";
        beeEl.style.left = `${pathPoints[0].x}px`;
        beeEl.style.top = `${pathPoints[0].y}px`;
        arena.appendChild(beeEl);

        function drawMaze() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Vẽ dải cỏ / viền ngoài của đường hoa
            ctx.beginPath();
            ctx.strokeStyle = "rgba(22, 101, 52, 0.4)";
            ctx.lineWidth = roadWidth + 24;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
            for (let i = 1; i < pathPoints.length; i++) ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
            ctx.stroke();

            // Vẽ lòng luống hoa rực rỡ
            ctx.beginPath();
            ctx.strokeStyle = "rgba(74, 222, 128, 0.55)";
            ctx.lineWidth = roadWidth;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
            for (let i = 1; i < pathPoints.length; i++) ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
            ctx.stroke();

            // Vẽ các trạm hoa mật
            pathPoints.forEach((p, idx) => {
                ctx.font = "26px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(p.icon || "🌸", p.x, p.y);
            });
        }

        drawMaze();

        let currentCheckpoint = 0;
        let lastWarnTime = 0;

        canvas.onmousemove = function(e) {
            if (!state.isRunning) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Tìm đoạn thẳng đường đi gần con trỏ chuột nhất
            let minDistance = 9999;
            let nearestProjectedPoint = { x: pathPoints[0].x, y: pathPoints[0].y };

            for (let i = 0; i < pathPoints.length - 1; i++) {
                const res = distToSegment({ x: mouseX, y: mouseY }, pathPoints[i], pathPoints[i + 1]);
                if (res.dist < minDistance) {
                    minDistance = res.dist;
                    nearestProjectedPoint = res.closest;
                }
            }

            // RÀNG BUỘC CON ONG LUÔN NẰM TRONG ĐƯỜNG ĐI
            if (minDistance <= roadRadius) {
                // Chuột nằm trong lòng đường hoa
                beeEl.style.left = `${mouseX}px`;
                beeEl.style.top = `${mouseY}px`;
                warnEl.style.display = "none";

                // Kiểm tra chạm checkpoint trạm mật tiếp theo
                const targetPoint = pathPoints[currentCheckpoint + 1];
                if (targetPoint) {
                    const distToTarget = Math.hypot(mouseX - targetPoint.x, mouseY - targetPoint.y);
                    if (distToTarget < Math.max(30, roadRadius)) {
                        currentCheckpoint++;
                        playSuccess();
                        state.score += 20;
                        showPopEffect(targetPoint.x, targetPoint.y, "✨ LẤY MẬT!");
                        updateHUD();

                        if (currentCheckpoint >= pathPoints.length - 1) {
                            state.completedCount++;
                            updateHUD();
                            if (state.completedCount >= lvl.targetCount) {
                                finishGame(true);
                            } else {
                                currentCheckpoint = 0;
                                showPopEffect(canvas.width / 2, canvas.height / 2, "🎉 XONG CHẶNG! TIẾP TỤC NÀO!");
                            }
                        }
                    }
                }
            } else {
                // Chuột bay lệch ra ngoài luống hoa ➔ Giữ con ong ở mép đường chiếu
                beeEl.style.left = `${nearestProjectedPoint.x}px`;
                beeEl.style.top = `${nearestProjectedPoint.y}px`;
                warnEl.style.display = "block";

                const now = Date.now();
                if (now - lastWarnTime > 800) {
                    playOffroadWarn();
                    lastWarnTime = now;
                }
            }
        };
    }

    // Hiển thị hiệu ứng pop-up chữ nổi chuẩn xác bên trong arena
    function showPopEffect(x, y, text) {
        const arena = document.getElementById("mouse-playground-arena");
        if (!arena) return;

        const pop = document.createElement("div");
        pop.className = "mouse-pop-fx";
        pop.style.left = `${Math.max(40, Math.min(arena.clientWidth - 40, x))}px`;
        pop.style.top = `${Math.max(30, Math.min(arena.clientHeight - 30, y))}px`;
        pop.style.color = "#fbbf24";
        pop.innerText = text;
        arena.appendChild(pop);
        setTimeout(() => pop.remove(), 600);
    }

    function finishGame(won) {
        stopGame();
        const lvl = window.MOUSE_DATA.levels[state.levelIndex];

        if (won) {
            playVictory();
            const reward = lvl.rewardCoins || 20;
            const xp = lvl.rewardXp || 40;
            giveFarmReward(reward, xp);

            showResultModal(3, reward);
            if (typeof showFloatingToast === 'function') {
                showFloatingToast(`🏆 Chúc mừng bé đã làm chủ bài tập ${lvl.title}! Nhận +${reward} 🪙 và +${xp} XP!`);
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

        const nextIdx = (state.levelIndex + 1) % window.MOUSE_DATA.levels.length;
        loadLevel(nextIdx);
    }

    return {
        init: init,
        openLevelModal: openLevelModal,
        closeLevelModal: closeLevelModal,
        selectLevelFromModal: selectLevelFromModal,
        setFilter: setFilter,
        loadLevel: loadLevel,
        retry: retryCurrentLevel,
        next: nextLevel
    };
})();
