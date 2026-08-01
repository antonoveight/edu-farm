const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// The error was that getSeedConfig is not defined but it was used in global scope!
// Let's add getSeedConfig globally.
const func = `
window.getSeedConfig = function() {
    let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    return gameAssets[w].seeds;
};
function getSeedConfig() {
    return window.getSeedConfig();
}
`;

// Only add if not already there
if (!js.includes('function getSeedConfig()')) {
    js = js.replace(/(const gameAssets = \{[\s\S]*?\};\n)/, '\$1' + func);
}

// But wait, there is also:
// let seeds = getSeedConfig();
// let currentMarketPrices = {};
// at the root level! At the root level, selectedWorld might not be set.
// It's better to NOT have currentMarketPrices in global scope, or at least initialize it safely.
js = js.replace(/let seeds = getSeedConfig\(\);\nlet currentMarketPrices = \{\};\nfor\(let i=1; i<=10; i\+\+\) \{\n    currentMarketPrices\['s'\+i\] = seeds\['s'\+i\]\.reward;\n\}/, `
let currentMarketPrices = {};
function updateMarketPrices() {
    let seeds = getSeedConfig();
    for(let i=1; i<=10; i++) {
        if (seeds['s'+i]) {
            currentMarketPrices['s'+i] = seeds['s'+i].reward;
        }
    }
}
`);

// Then we need to call updateMarketPrices() in startGame() or init()
js = js.replace(/function startGame\(\) \{/, 'function startGame() { updateMarketPrices(); ');

fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('Fixed main.js');
