const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Replace inside renderMarket
const targetLine = "let decor = gameAssets[gameState.world].decorations;";
const replacementLine = `let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    let decor = gameAssets[w].decorations;`;

if (js.includes(targetLine)) {
    js = js.replace(targetLine, replacementLine);
    fs.writeFileSync('public/game/js/main.js', js);
    console.log('Successfully fixed renderMarket world resolution.');
} else {
    console.log('Target line not found in main.js');
}
