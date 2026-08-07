const fs = require('fs');
let content = fs.readFileSync('public/game/js/main.js', 'utf8');
const search = /    \} else \{\r?\n\s+\/\/ ❌ Trả lời sai ❌\r?\n\s+if \(btnElement && btnElement\.classList\) btnElement\.classList\.add\('wrong'\);\r?\n\s+playChime\(150, 'sawtooth', 0\.4\);/;
const replace = '    } else {\\n        // ❌ Trả lời sai ❌\\n        if (btnElement && btnElement.classList) btnElement.classList.add(\'wrong\');\\n        playChime(150, \'sawtooth\', 0.4);\\n        if (typeof dqOnStreakResult === \'function\') dqOnStreakResult(false);\\n        \\n        // Reset tiến trình ấp trứng\\n        if (typeof gameState !== \'undefined\') {\\n            gameState.eggProgress = 0;\\n            if (typeof renderHatchingEgg === \'function\') renderHatchingEgg();\\n        }';
content = content.replace(search, replace);
fs.writeFileSync('public/game/js/main.js', content, 'utf8');

