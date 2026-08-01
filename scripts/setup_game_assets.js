import fs from 'fs';
import path from 'path';

// Create target directories
fs.mkdirSync('public/game/css', { recursive: true });
fs.mkdirSync('public/game/js', { recursive: true });
fs.mkdirSync('src/data', { recursive: true });

// 1. Copy index.html with corrected stylesheet and script links
let indexHtml = fs.readFileSync('backup/index.html', 'utf8');
indexHtml = indexHtml.replace('href="/src/css/style.css"', 'href="./css/style.css"');
indexHtml = indexHtml.replace('src="/src/main.js"', 'src="./js/main.js"');
fs.writeFileSync('public/game/index.html', indexHtml, 'utf8');
console.log('Copied public/game/index.html');

// 2. Copy style.css
fs.copyFileSync('backup/src/css/style.css', 'public/game/css/style.css');
console.log('Copied public/game/css/style.css');

// 3. Process main.js (remove imports, make startGame async and fetch questions)
let mainJs = fs.readFileSync('backup/src/main.js', 'utf8');

// Remove imports at the top
mainJs = mainJs.replace(/import\s+\w+\s+from\s+['\x22]\.\/data\/grade\d\/\w+\.json['\x22];\s*/g, '');

// Replace const QUIZ_BANK = { ... } with let QUIZ_BANK = {};
const quizBankStart = mainJs.indexOf('const QUIZ_BANK = {');
let braces = 0;
let quizBankEnd = -1;
for (let i = quizBankStart; i < mainJs.length; i++) {
    if (mainJs[i] === '{') braces++;
    else if (mainJs[i] === '}') {
        braces--;
        if (braces === 0) {
            quizBankEnd = i;
            break;
        }
    }
}

if (quizBankStart !== -1 && quizBankEnd !== -1) {
    mainJs = mainJs.substring(0, quizBankStart) + 'let QUIZ_BANK = {};' + mainJs.substring(quizBankEnd + 1);
    console.log('Replaced static QUIZ_BANK with dynamic let QUIZ_BANK');
}

// Modify startGame() function to fetch questions
const startGameIndex = mainJs.indexOf('function startGame() {');
if (startGameIndex !== -1) {
    const replacement = `async function startGame() {
            if (!selectedGrade || !selectedWorld) return;

            // Tải câu hỏi động từ API Next.js
            try {
                const res = await fetch(\`/api/questions?grade=\${selectedGrade}\`);
                const data = await res.json();
                QUIZ_BANK[\`g\${selectedGrade}_viet\`] = data.viet || [];
                QUIZ_BANK[\`g\${selectedGrade}_science\`] = data.science || [];
                QUIZ_BANK[\`g\${selectedGrade}_tech\`] = data.tech || [];
            } catch (e) {
                console.error("Lỗi tải câu hỏi từ API:", e);
            }
`;
    // Replace "function startGame() {\n            if (!selectedGrade || !selectedWorld) return;" with replacement
    mainJs = mainJs.replace('function startGame() {\n            if (!selectedGrade || !selectedWorld) return;', replacement);
    console.log('Modified startGame to load questions asynchronously');
}

fs.writeFileSync('public/game/js/main.js', mainJs, 'utf8');
console.log('Written public/game/js/main.js');

// 4. Move data/ folder from backup/src/data to src/data
copyFolderRecursiveSync('backup/src/data', 'src/data');
console.log('Restored data folder to src/data');

function copyFolderRecursiveSync(source, target) {
    let files = [];
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(file => {
            const curSource = path.join(source, file);
            const curTarget = path.join(target, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                fs.mkdirSync(curTarget, { recursive: true });
                copyFolderRecursiveSync(curSource, curTarget);
            } else {
                fs.copyFileSync(curSource, curTarget);
            }
        });
    }
}
