const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const DQ_JS = `
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
            // Đảm bảo ít nhất 1 farm + 1 học tập
            const farmPool   = DAILY_QUEST_POOL.filter(q => q.group === 'farm');
            const learnPool  = DAILY_QUEST_POOL.filter(q => q.group === 'accuracy' || q.group === 'speed');
            const otherPool  = DAILY_QUEST_POOL.filter(q => q.group === 'combo');

            const shuffled = arr => arr.slice().sort(() => Math.random() - 0.5);

            const picked = [];
            const usedIds = new Set();

            // 1 farm bắt buộc
            const farmQ = shuffled(farmPool)[0];
            picked.push(farmQ); usedIds.add(farmQ.id);

            // 1 học tập bắt buộc
            const learnQ = shuffled(learnPool)[0];
            picked.push(learnQ); usedIds.add(learnQ.id);

            // 3 còn lại random từ toàn pool
            const rest = shuffled(DAILY_QUEST_POOL.filter(q => !usedIds.has(q.id)));
            for (let i = 0; i < 3 && i < rest.length; i++) {
                picked.push(rest[i]);
                usedIds.add(rest[i].id);
            }

            return picked.slice(0, 5);
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
        function dqOnSell(amount) {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed || qs.id !== 'sell_150') return;
                advanceDQ(idx, amount);
            });
        }

        // Gọi khi thắng Boss
        function dqOnBossWin() {
            if (!dqState) return;
            dqState.quests.forEach((qs, idx) => {
                if (qs.done || qs.claimed || qs.id !== 'boss_win') return;
                advanceDQ(idx, 1);
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
`;

// Insert right before startRealtimeGameLoop
const marker = '        function startRealtimeGameLoop() {';
const idx = js.indexOf(marker);
if (idx === -1) { console.error('startRealtimeGameLoop not found'); process.exit(1); }
js = js.slice(0, idx) + DQ_JS + '\n' + js.slice(idx);
fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('OK: daily quest JS inserted at char', idx);
