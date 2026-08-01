const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

console.log('Math Correct hooked:', js.includes('trackGlobalStat("math_correct")'));
console.log('Math Wrong hooked:', js.includes('trackGlobalStat("math_wrong")'));
console.log('Boss hooked:', js.includes('trackGlobalStat("boss_wins")'));
console.log('Harvest hooked:', js.includes('trackGlobalStat("crops_harvested")'));

// Manual injection for verifyChoiceAnswer
if (!js.includes('trackGlobalStat("math_correct")')) {
    js = js.replace(/function verifyChoiceAnswer\(isCorrect\)\s*\{/g, 
        `function verifyChoiceAnswer(isCorrect) {
    if(isCorrect) {
        trackGlobalStat("math_correct");
        trackGlobalStat("coins_earned", 10);
    } else {
        trackGlobalStat("math_wrong");
    }`);
}

// Boss injection
if (!js.includes('trackGlobalStat("boss_wins")')) {
    js = js.replace(/function endBossBattle\(isWin\)\s*\{/, 
        `function endBossBattle(isWin) {
    if(isWin) {
        trackGlobalStat("boss_wins");
        trackGlobalStat("coins_earned", 50);
    }`);
}

fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('Verification finished');
