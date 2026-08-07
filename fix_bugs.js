const fs = require('fs');
let code = fs.readFileSync('public/game/js/main.js', 'utf8');

// ===== FIX 1: Insert new qType blocks BEFORE the final else {} (multiple_choice default) =====
// Uses CRLF line endings
const FILL_BLANK_ELSE = "panel.appendChild(grid);\r\n    } else {";
const fillBlankElseIdx = code.indexOf(FILL_BLANK_ELSE, 260000);
console.log('fill_blank+else at:', fillBlankElseIdx);

if (fillBlankElseIdx !== -1) {
    const insertionPoint = fillBlankElseIdx + "panel.appendChild(grid);\r\n".length;
    
    const newBlocks = `    } else if (qType === 'true_false') {
        qTypeLabel.innerText = 'D\u1ea1ng: \u0110\u00fang / Sai';
        qTypeLabel.style.color = '#10b981';
        activeTask.correctAnswer = ans;
        
        let html = '<div class="tf-container" style="display: flex; gap: 20px; justify-content: center; padding: 20px;">';
        html += '<button class="tf-btn btn-true" onclick="submitCurrentAnswer(\\'\\u0110\u00fang\\', this)">\u0110\u00daNG \u2713</button>';
        html += '<button class="tf-btn btn-false" onclick="submitCurrentAnswer(\\'Sai\\', this)">SAI \u2717</button>';
        html += '</div>';
        panel.innerHTML = html;
        
    } else if (qType === 'find_error') {
        qTypeLabel.innerText = 'D\u1ea1ng: T\u00ecm l\u1ed7i sai';
        qTypeLabel.style.color = '#f59e0b';
        qText.style.display = 'none';
        activeTask.correctAnswer = ans;
        
        let html = '<div class="find-error-container">';
        html += '<div class="fe-instruction" style="font-weight:600; margin-bottom: 12px; color: #4b5563;">H\u00e3y b\u1ea5m v\u00e0o t\u1eeb b\u1ecb sai trong c\u00e2u d\u01b0\u1edbi \u0111\u00e2y:</div>';
        html += '<div class="fe-sentence" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 10px;">';
        var feWords = candidate ? (candidate.words || question.split(' ')) : question.split(' ');
        feWords.forEach(function(w) {
            html += '<button class="fe-word" onclick="submitCurrentAnswer(\\'' + w.replace(/'/g, "\\\\'") + '\\', this)">' + w + '</button>';
        });
        html += '</div></div>';
        panel.innerHTML = html;
        
    } else if (qType === 'categorize') {
        qTypeLabel.innerText = 'D\u1ea1ng: Ph\u00e2n lo\u1ea1i';
        qTypeLabel.style.color = '#8b5cf6';
        qText.style.display = 'none';
        activeTask.correctAnswer = ans;
        
        var cats = candidate ? (candidate.c || []) : [];
        if (!cats || cats.length < 2) cats = options.filter(function(v, i, a) { return a.indexOf(v) === i; }).slice(0, 2);
        
        let html = '<div class="categorize-container" style="text-align: center;">';
        html += '<div class="cat-item-to-sort" style="font-size: 24px; font-weight: bold; margin-bottom: 20px; padding: 15px; background: #f3f4f6; border-radius: 12px; display: inline-block; color: #111827; border: 2px dashed #9ca3af;">' + question + '</div>';
        html += '<div class="cat-buckets" style="display: flex; justify-content: space-around; gap: 15px;">';
        var bucketIcons = ['\uD83D\uDCE6', '\uD83D\uDDC2\uFE0F'];
        cats.slice(0, 2).forEach(function(cat, catIdx) {
            html += '<button class="cat-bucket" onclick="submitCurrentAnswer(\\'' + cat.replace(/'/g, "\\\\'") + '\\', this)">';
            html += '<div style="font-size: 30px; margin-bottom: 8px;">' + (bucketIcons[catIdx] || '\uD83D\uDCE6') + '</div>';
            html += '<div style="font-weight: bold; color: #374151;">' + cat + '</div>';
            html += '</button>';
        });
        html += '</div></div>';
        panel.innerHTML = html;
        
`;
    code = code.substring(0, insertionPoint) + newBlocks + code.substring(insertionPoint);
    console.log('New blocks inserted at:', insertionPoint);
} else {
    console.log('ERROR: Could not find insertion point');
}

// ===== FIX 2: Fix dummy placeholder options =====
const DUMMY_PAD = '    while (options.length < 4) {\r\n        let dummy = "L';
const dummyIdx = code.indexOf(DUMMY_PAD);
console.log('Dummy pad at:', dummyIdx);

if (dummyIdx !== -1) {
    const dummyEnd = code.indexOf('return options.slice(0, 4);', dummyIdx);
    if (dummyEnd !== -1) {
        const replacement = `    // Only pad with numeric variations; skip placeholder text
    let padTries = 0;
    while (options.length < 4 && padTries < 50) {
        padTries++;
        const base = options[0] || '';
        if (!isNaN(parseFloat(base)) && !base.includes('/')) {
            const delta = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            const fake = String(Math.max(0, Math.round(parseFloat(base) + delta)));
            if (!options.includes(fake)) options.push(fake);
        } else {
            break;
        }
    }
    return options.slice(0, 4);`;
        code = code.substring(0, dummyIdx) + replacement + code.substring(dummyEnd + 27);
        console.log('Fixed dummy options');
    }
}

fs.writeFileSync('public/game/js/main.js', code, 'utf8');
console.log('Done');
