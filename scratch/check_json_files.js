const fs = require('fs');
const path = require('path');

for (let g = 1; g <= 5; g++) {
    const dir = path.join('src', 'data', 'grade' + g);
    ['science.json', 'tech.json', 'viet.json'].forEach(file => {
        const p = path.join(dir, file);
        if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, 'utf8').trim();
            const json = JSON.parse(content);
            console.log('Grade ' + g + ' - ' + file + ': ' + json.length + ' questions');
        } else {
            console.log('Grade ' + g + ' - ' + file + ' does not exist!');
        }
    });
}
