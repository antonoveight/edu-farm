const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

if (!js.includes('trackGlobalStat("crops_harvested")')) {
    js = js.replace(/function dqOnHarvest\(plotIdx\)\s*\{/, 'function dqOnHarvest(plotIdx) {\n    trackGlobalStat("crops_harvested");');
}

fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('Harvest tracking injected');
