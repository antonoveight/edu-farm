const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// ---- Hook 1: collectCropToInventory - dqOnHarvest ----
js = js.replace(
    "            if (!gameState.shownAlerts.harvest) {",
    "            // Daily Quest: thu hoach\n            dqOnHarvest(index);\n\n            if (!gameState.shownAlerts.harvest) {"
);

// ---- Hook 2: watering plot (line ~933) - dqOnWater ----
// After: plot.water = true; gameState.inventory.water--;
js = js.replace(
    "                    plot.water = true;\n                    gameState.inventory.water--;\n                    playChime(880, 'sine', 0.15);",
    "                    plot.water = true;\n                    gameState.inventory.water--;\n                    dqOnWater(index); // Daily Quest: tuoi nuoc\n                    playChime(880, 'sine', 0.15);"
);

// ---- Hook 3: plant seed - dqOnPlant ----
// After: plot.water = true; plot.pest = false; plot.errorCount = 0;
js = js.replace(
    "                        plot.water = true;\n                        plot.pest = false;\n                        plot.errorCount = 0;\n                        playChime(440, 'triangle', 0.2);",
    "                        plot.water = true;\n                        plot.pest = false;\n                        plot.errorCount = 0;\n                        dqOnPlant(index); // Daily Quest: gieo hat\n                        playChime(440, 'triangle', 0.2);"
);

// ---- Hook 4: verifyChoiceAnswer - correct path - dqOnCorrectAnswer + dqOnStreakResult ----
js = js.replace(
    "                // Tiến trình ấp thú cưng\n                progressEgg();",
    "                // Tiến trình ấp thú cưng\n                progressEgg();\n\n                // Daily Quest: tra loi dung\n                const taskSubject = activeTask ? activeTask.subject : null;\n                dqOnCorrectAnswer(taskSubject);\n                dqOnStreakResult(true);\n                // Perfect quest (errors = 0)\n                if (activeTask && activeTask.errors === 0) dqOnPerfectQuest();"
);

// ---- Hook 5: handleQuestError - dqOnStreakResult(false) ----
js = js.replace(
    "        function handleQuestError() {\n            activeTask.errors++;\n            playChime(150, 'sawtooth', 0.3);\n            renderQuestHearts();",
    "        function handleQuestError() {\n            activeTask.errors++;\n            playChime(150, 'sawtooth', 0.3);\n            dqOnStreakResult(false); // Daily Quest: sai - reset streak\n            renderQuestHearts();"
);

// ---- Hook 6: sellCrop - dqOnSell ----
js = js.replace(
    "                gameState.coins += sellValue;\n                gameState.inventory[harvestedKey] -= qtyToSell;\n\n                playChime(1000, 'sine', 0.3);",
    "                gameState.coins += sellValue;\n                gameState.inventory[harvestedKey] -= qtyToSell;\n                dqOnSell(sellValue); // Daily Quest: ban nong san\n\n                playChime(1000, 'sine', 0.3);"
);

// ---- Hook 7: boss win - dqOnBossWin ----
// Find line with 'gameState.coins += 150' in verifyBossAnswer
js = js.replace(
    "                gameState.coins += 150;",
    "                gameState.coins += 150;\n                dqOnBossWin(); // Daily Quest: thang Boss"
);

// ---- Hook 8: initGameOnLoad - call initDailyQuests ----
// Find the rendering sequence after start button
const initIdx = js.indexOf('async function initGameOnLoad()');
const renderIdx = js.indexOf('renderPlots();', initIdx);
if (renderIdx > -1) {
    const nearBlock = js.slice(renderIdx, renderIdx + 200);
    const updHdr = nearBlock.indexOf('updateHeaderStats();');
    if (updHdr > -1) {
        const absPos = renderIdx + updHdr + 'updateHeaderStats();'.length;
        js = js.slice(0, absPos) + '\n                initDailyQuests(); // Daily Quest: khoi tao' + js.slice(absPos);
    }
}

fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('OK: all hooks inserted');

// Verify syntax
const { execSync } = require('child_process');
try {
    execSync('node --check public/game/js/main.js', { stdio: 'pipe' });
    console.log('Syntax OK');
} catch(e) {
    console.error('Syntax ERROR:', e.stderr.toString());
}
