const fs = require('fs');
const code = fs.readFileSync('public/game/js/main.js', 'utf8');

const fillBlankQTypeIdx = code.indexOf("} else if (qType === 'fill_blank') {");
console.log('fill_blank block at:', fillBlankQTypeIdx);
console.log(code.substring(fillBlankQTypeIdx, fillBlankQTypeIdx + 800));
