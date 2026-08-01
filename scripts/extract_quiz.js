import fs from 'fs';
import path from 'path';

const mainPath = path.resolve('src/main.js');
const code = fs.readFileSync(mainPath, 'utf8');

// Use regex to locate the QUIZ_BANK block
const startIdx = code.indexOf('const QUIZ_BANK = {');
if (startIdx === -1) {
    console.error('Could not find QUIZ_BANK declaration');
    process.exit(1);
}

// Find matching closing brace for QUIZ_BANK
let openBraces = 0;
let endIdx = -1;
for (let i = startIdx; i < code.length; i++) {
    if (code[i] === '{') {
        openBraces++;
    } else if (code[i] === '}') {
        openBraces--;
        if (openBraces === 0) {
            endIdx = i;
            break;
        }
    }
}

if (endIdx === -1) {
    console.error('Could not find closing brace for QUIZ_BANK');
    process.exit(1);
}

const quizBankString = code.substring(startIdx, endIdx + 1);

// We can extract each grade's subjects using basic parsing or evaluating a clean substring.
// Let's create a JS file that exports QUIZ_BANK, run it, and write the JSONs.
const tempScriptPath = 'scripts/temp_eval.js';
const evalCode = `
import fs from 'fs';
import path from 'path';

${quizBankString}

const grades = [2, 3, 4, 5];
const subjects = ['viet', 'science', 'tech'];

grades.forEach(g => {
    const dir = path.join('src', 'data', 'grade' + g);
    fs.mkdirSync(dir, { recursive: true });
    
    subjects.forEach(sub => {
        const key = 'g' + g + '_' + sub;
        if (QUIZ_BANK[key]) {
            fs.writeFileSync(
                path.join(dir, sub + '.json'), 
                JSON.stringify(QUIZ_BANK[key], null, 2), 
                'utf8'
            );
            console.log('Wrote', path.join(dir, sub + '.json'));
        }
    });
});
`;

fs.writeFileSync(tempScriptPath, evalCode, 'utf8');
console.log('Temp eval script written. Running it...');
