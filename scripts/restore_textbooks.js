import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('EduFarm-CoCoTien.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Use regex to locate the QUIZ_BANK block
const startIdx = htmlContent.indexOf('const QUIZ_BANK = {');
if (startIdx === -1) {
    console.error('Could not find QUIZ_BANK declaration in HTML');
    process.exit(1);
}

// Find matching closing brace for QUIZ_BANK
let openBraces = 0;
let endIdx = -1;
for (let i = startIdx; i < htmlContent.length; i++) {
    if (htmlContent[i] === '{') {
        openBraces++;
    } else if (htmlContent[i] === '}') {
        openBraces--;
        if (openBraces === 0) {
            endIdx = i;
            break;
        }
    }
}

if (endIdx === -1) {
    console.error('Could not find closing brace for QUIZ_BANK in HTML');
    process.exit(1);
}

const quizBankString = htmlContent.substring(startIdx, endIdx + 1);

// Generate template script to run evaluation and write .txt files
const tempScriptPath = 'scripts/temp_restore.js';
const evalCode = `
import fs from 'fs';
import path from 'path';

${quizBankString}

const grades = [2, 3, 4, 5];
const subjectFilesMap = {
    'viet': 'vietnamese.txt',
    'science': 'science.txt',
    'tech': 'tech.txt'
};

grades.forEach(g => {
    const dir = path.join('textbooks', 'grade' + g);
    fs.mkdirSync(dir, { recursive: true });
    
    Object.entries(subjectFilesMap).forEach(([subject, fileName]) => {
        const key = 'g' + g + '_' + subject;
        const questions = QUIZ_BANK[key];
        if (questions && questions.length > 0) {
            let txtContent = '';
            questions.forEach(q => {
                const correctAnswer = q.aKey || q.a;
                txtContent += 'Q: ' + q.q + '\\n';
                txtContent += 'A: ' + correctAnswer + '\\n';
                txtContent += 'C: ' + q.c.join(', ') + '\\n\\n';
            });
            fs.writeFileSync(path.join(dir, fileName), txtContent.trim(), 'utf8');
            console.log('Restored textbook file:', path.join(dir, fileName));
        }
    });
});
`;

fs.writeFileSync(tempScriptPath, evalCode, 'utf8');
console.log('Temp restore script written. Running evaluation...');
