const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

global.window = {};

const startIdx = js.indexOf('const gameAssets = {');
const endIdx = js.indexOf('const companionsConfig = {');
const decl = js.substring(startIdx, endIdx);

eval(decl);
console.log('gameAssets keys:', Object.keys(gameAssets));
console.log('gameAssets.cyber:', gameAssets.cyber ? 'defined' : 'undefined');
console.log('gameAssets.magic:', gameAssets.magic ? 'defined' : 'undefined');
if (gameAssets.cyber) {
    console.log('cyber keys:', Object.keys(gameAssets.cyber));
}
