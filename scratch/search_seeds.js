const fs = require('fs');
const js = fs.readFileSync('public/game/js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, i) => {
    if(l.includes('s1:') || l.includes('s2:') || l.includes('s3:') || l.includes('seedType')) {
        console.log((i+1) + ': ' + l.trim());
    }
});
