const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const statsLogic = `
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
`;

if (!js.includes('trackGlobalStat(')) {
    js += statsLogic;

    // Hook into harvest (finding where state changes to harvested_ or where status="ready")
    // Easiest is to hook into the global checkAnswer or similar. Let's find checkMathAnswer or verifyChoiceAnswer
    js = js.replace(/function verifyChoiceAnswer\(.*?\)\s*\{[\s\S]*?if\s*\(isCorrect\)\s*\{/g, match => match + '\n        trackGlobalStat("math_correct");\n        trackGlobalStat("coins_earned", 10);');
    js = js.replace(/function verifyChoiceAnswer\(.*?\)\s*\{[\s\S]*?else\s*\{/g, match => match + '\n        trackGlobalStat("math_wrong");');

    // Hook into boss victory
    js = js.replace(/function endBossBattle\(isWin\)\s*\{[\s\S]*?if\s*\(isWin\)\s*\{/g, match => match + '\n        trackGlobalStat("boss_wins");\n        trackGlobalStat("coins_earned", 50);');

    // Hook into harvest
    js = js.replace(/gameState\.plots\[pIndex\]\.status = "empty";/g, match => match + '\n    trackGlobalStat("crops_harvested");\n    trackGlobalStat("coins_earned", 5);');

    fs.writeFileSync('public/game/js/main.js', js, 'utf8');
    console.log('Stats tracking injected into main.js');
} else {
    console.log('Stats tracking already injected');
}
