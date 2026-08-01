const fs = require('fs');
const path = require('path');

for (let g = 1; g <= 5; g++) {
    const dir = path.join('textbooks', 'grade' + g);
    ['science.txt', 'tech.txt', 'vietnamese.txt'].forEach(file => {
        const p = path.join(dir, file);
        if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, 'utf8').trim();
            const qs = content.split(/\n\r?\n/).length;
            console.log('Grade ' + g + ' - ' + file + ': ' + qs + ' questions (' + content.length + ' chars)');
        } else {
            console.log('Grade ' + g + ' - ' + file + ' does not exist!');
        }
    });
}
