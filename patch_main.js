const fs = require('fs');

const mainJsPath = 'public/game/js/main.js';
let code = fs.readFileSync(mainJsPath, 'utf8');

// 1. Math Replacement
// We'll replace _buildBasicMathQuestion and buildContextMathQuestion
const mathStartStr = 'function _buildBasicMathQuestion(grade) {';
const mathEndStr = 'function buildFillInMathQuestion(grade) {';

const mathStartIdx = code.indexOf(mathStartStr);
const mathEndIdx = code.indexOf(mathEndStr);

if (mathStartIdx !== -1 && mathEndIdx !== -1) {
    const newMathCode = `function _buildBasicMathQuestion(grade) {
    let attempts = 0;
    while (attempts < 30) {
        attempts++;
        let q, ans, key;
        if (grade === 1) {
            const a = Math.floor(Math.random() * 8) + 1;
            const b = Math.floor(Math.random() * (10 - a)) + 1;
            const isPlus = Math.random() < 0.5;
            ans = isPlus ? (a + b) : a;
            q = isPlus ? \`\${a} + \${b} = ?\` : \`\${a + b} - \${b} = ?\`;
        } else if (grade === 2) {
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 30) + 5;
            const isPlus = Math.random() < 0.5;
            ans = isPlus ? (a + b) : (a - b);
            if (ans < 0) continue;
            q = \`\${a} \${isPlus ? '+' : '-'} \${b} = ?\`;
        } else if (grade === 3) {
            const a = Math.floor(Math.random() * 9) + 2;
            const b = Math.floor(Math.random() * 9) + 2;
            const r = Math.random();
            if (r < 0.33) {
                ans = a * b;
                q = \`\${a} x \${b} = ?\`;
            } else if (r < 0.66) {
                ans = a;
                q = \`\${a * b} ÷ \${b} = ?\`;
            } else {
                const a2 = Math.floor(Math.random() * 900) + 100;
                const b2 = Math.floor(Math.random() * 900) + 100;
                ans = a2 + b2;
                q = \`\${a2} + \${b2} = ?\`;
            }
        } else if (grade === 4) {
            const r = Math.random();
            if (r < 0.25) {
                const a = (Math.floor(Math.random() * 100) + 10) * 10;
                const b = (Math.floor(Math.random() * 50) + 5) * 10;
                ans = a + b;
                q = \`\${a} + \${b} = ?\`;
            } else if (r < 0.5) {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * 9) + 2;
                ans = a * b;
                q = \`\${a} x \${b} = ?\`;
            } else if (r < 0.75) {
                const b = Math.floor(Math.random() * 9) + 2;
                const ansNum = Math.floor(Math.random() * 900) + 100;
                ans = ansNum;
                q = \`\${ansNum * b} ÷ \${b} = ?\`;
            } else {
                // Fractions
                const tu = Math.floor(Math.random() * 5) + 1;
                const mau = Math.floor(Math.random() * 5) + 2;
                ans = tu + "/" + mau;
                q = \`1 x \${tu}/\${mau} = ?\`;
            }
        } else {
            // Grade 5: Decimals, Percentages
            const r = Math.random();
            if (r < 0.33) {
                const a = parseFloat((Math.random() * 10 + 1).toFixed(2));
                const b = parseFloat((Math.random() * 10 + 1).toFixed(2));
                ans = parseFloat((a + b).toFixed(2));
                q = \`\${a} + \${b} = ?\`;
            } else if (r < 0.66) {
                const a = parseFloat((Math.random() * 10 + 1).toFixed(1));
                const b = parseFloat((Math.random() * 10 + 1).toFixed(1));
                ans = parseFloat((Math.max(a, b) - Math.min(a, b)).toFixed(1));
                q = \`\${Math.max(a, b).toFixed(1)} - \${Math.min(a, b).toFixed(1)} = ?\`;
            } else {
                const a = (Math.floor(Math.random() * 9) + 1) * 10;
                ans = (a / 100) * 100;
                q = \`\${a}% của 100 bằng bao nhiêu?\`;
            }
        }
        
        key = 'basic|' + q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            const ansStr = String(ans);
            return { q, ans: ansStr, key };
        }
    }
    return null;
}

function buildContextMathQuestion(grade) {
    const g = Math.min(5, Math.max(1, grade));
    const templates = {
        1: [
            () => { const a = Math.floor(Math.random()*5)+1; const b = Math.floor(Math.random()*4)+1; return { q: \`Bé có \${a} quả táo, hái thêm \${b} quả. Bé có tất cả bao nhiêu quả?\`, ans: a+b }; },
            () => { const r = Math.floor(Math.random()*3)+2; const c = Math.floor(Math.random()*3)+2; return { q: \`Vườn có \${r} hàng, mỗi hàng \${c} cây. Có tất cả bao nhiêu cây?\`, ans: r*c }; },
        ],
        2: [
            () => { const a = Math.floor(Math.random()*40)+20; const b = Math.floor(Math.random()*15)+5; return { q: \`Kho có \${a} kg phân bón, dùng \${b} kg. Còn lại bao nhiêu kg?\`, ans: a-b }; },
            () => { const c = Math.floor(Math.random()*4)+2; const each = Math.floor(Math.random()*7)+3; return { q: \`Mỗi cây cho \${each} trái, bé có \${c} cây. Thu được bao nhiêu trái?\`, ans: c*each }; },
        ],
        3: [
            () => { const a = Math.floor(Math.random()*6)+3; const b = Math.floor(Math.random()*6)+3; return { q: \`Bé trồng \${a} luống, mỗi luống \${b} hàng. Có bao nhiêu hàng cây?\`, ans: a*b }; },
            () => { const a = Math.floor(Math.random()*7)+2; const b = Math.floor(Math.random()*7)+2; return { q: \`\${a*b} hạt giống chia đều cho \${b} túi. Mỗi túi bao nhiêu hạt?\`, ans: a }; },
            () => { const canh = Math.floor(Math.random()*10)+5; return { q: \`Sân trường hình vuông có cạnh \${canh}m. Chu vi sân là bao nhiêu m?\`, ans: canh*4 }; }
        ],
        4: [
            () => { const a = (Math.floor(Math.random()*10)+5)*100; const b = (Math.floor(Math.random()*7)+2)*100; return { q: \`Thu \${a} đồng, chi \${b} đồng mua phân. Còn lại bao nhiêu đồng?\`, ans: a-b }; },
            () => { const d = Math.floor(Math.random()*10)+5; const r = Math.floor(Math.random()*5)+3; return { q: \`Mảnh vườn hình chữ nhật dài \${d}m, rộng \${r}m. Diện tích là bao nhiêu m2?\`, ans: d*r }; }
        ],
        5: [
            () => { const a = parseFloat((Math.random()*4+1.5).toFixed(1)); const b = parseFloat((Math.random()*2+0.5).toFixed(1)); const r = parseFloat((a-b).toFixed(1)); if(r<0) return null; return { q: \`Bình có \${a} lít, tưới hết \${b} lít. Còn lại bao nhiêu lít?\`, ans: r }; },
            () => { const v = Math.floor(Math.random()*40)+20; const t = Math.floor(Math.random()*3)+2; return { q: \`Ô tô đi với vận tốc \${v} km/h. Sau \${t} giờ đi được bao nhiêu km?\`, ans: v*t }; }
        ],
    };
    let attempts = 0;
    while (attempts < 25) {
        attempts++;
        const pool = templates[g] || templates[3];
        const item = pool[Math.floor(Math.random() * pool.length)]();
        if (!item) continue;
        if (item.ans < 0 || isNaN(item.ans)) continue;
        const key = 'ctx|' + item.q;
        if (!isRecentQuestion(key, _currentQMode)) {
            addToQuestionHistory(key, _currentQMode);
            return { q: item.q, ans: String(item.ans), key };
        }
    }
    return null;
}

`;
    code = code.substring(0, mathStartIdx) + newMathCode + code.substring(mathEndIdx);
}

// 2. UI Replacement inside generateSpecificSubjectQuestion
// We look for: `} else { // multiple_choice` inside the qType rendering block.
// Let's find just `} else {` right after `reorder` block
const insertTargetStr = '} else {';
// We should find the index of '} else {' after 'reorder'
const reorderStr = "qType === 'reorder'";
const reorderIdx = code.indexOf(reorderStr);
if (reorderIdx !== -1) {
    const insertIdx = code.indexOf('} else {', reorderIdx);

    if (insertIdx !== -1) {
        const newUIBlock = `} else if (qType === 'true_false') {
        qTypeLabel.innerText = 'Dạng: Đúng / Sai';
        qTypeLabel.style.color = '#10b981';
        
        let html = '<div class="tf-container" style="display: flex; gap: 20px; justify-content: center; padding: 20px;">';
        html += '<button class="tf-btn btn-true" onclick="submitCurrentAnswer(\\'Đúng\\', this)">ĐÚNG</button>';
        html += '<button class="tf-btn btn-false" onclick="submitCurrentAnswer(\\'Sai\\', this)">SAI</button>';
        html += '</div>';
        panel.innerHTML = html;
        
    } else if (qType === 'find_error') {
        qTypeLabel.innerText = 'Dạng: Tìm lỗi sai';
        qTypeLabel.style.color = '#f59e0b';
        qText.style.display = 'none';
        
        let html = '<div class="find-error-container">';
        html += '<div class="fe-instruction" style="font-weight:600; margin-bottom: 12px; color: #4b5563;">Hãy bấm vào từ bị sai trong câu dưới đây:</div>';
        html += '<div class="fe-sentence" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 10px;">';
        const words = candidate.words || question.split(' ');
        words.forEach(w => {
            html += '<button class="fe-word" onclick="submitCurrentAnswer(\\'' + w.replace(/'/g, "\\\\'") + '\\', this)">' + w + '</button>';
        });
        html += '</div></div>';
        panel.innerHTML = html;
        
    } else if (qType === 'categorize') {
        qTypeLabel.innerText = 'Dạng: Phân loại';
        qTypeLabel.style.color = '#8b5cf6';
        qText.style.display = 'none';
        
        let html = '<div class="categorize-container" style="text-align: center;">';
        html += '<div class="cat-item-to-sort">' + question + '</div>';
        html += '<div class="cat-buckets" style="display: flex; justify-content: space-around; gap: 15px;">';
        
        let categories = options.length >= 2 ? options : (candidate.c || []);
        categories.slice(0, 2).forEach(cat => {
            html += '<button class="cat-bucket" onclick="submitCurrentAnswer(\\'' + cat.replace(/'/g, "\\\\'") + '\\', this)">';
            html += '<div class="cat-bucket-icon" style="font-size: 30px; margin-bottom: 8px;">🛒</div>';
            html += '<div class="cat-bucket-name" style="font-weight: bold; color: #374151;">' + cat + '</div>';
            html += '</button>';
        });
        
        html += '</div></div>';
        panel.innerHTML = html;
        
    `;
        code = code.substring(0, insertIdx) + newUIBlock + code.substring(insertIdx);
    } else {
        console.log("Could not find insertion target for UI");
    }
}

fs.writeFileSync(mainJsPath, code, 'utf8');
console.log('Main.js updated successfully');
