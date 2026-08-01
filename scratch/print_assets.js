const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const startIdx = js.indexOf('const gameAssets = {');
const endIdx = js.indexOf('const companionsConfig = {');
const decl = js.substring(startIdx, endIdx);

fs.writeFileSync('scratch/assets.txt', decl);
console.log('Written scratch/assets.txt of length:', decl.length);
