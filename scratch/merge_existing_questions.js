const fs = require('fs');
const path = require('path');

function parseTextbookFile(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const blocks = content.split(/\n\s*\n|\n\s*---\s*\n/);
    const questions = [];

    for (let block of blocks) {
        if (!block.trim()) continue;
        const lines = block.split('\n');
        let q = '';
        let a = '';
        let c = [];

        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('Q:')) {
                q = line.substring(2).trim();
            } else if (line.startsWith('A:')) {
                a = line.substring(2).trim();
            } else if (line.startsWith('C:')) {
                c = line.substring(2).split(',').map(item => item.trim());
            }
        }

        if (q && a) {
            if (c.length === 0) {
                c = [a];
            } else if (!c.includes(a)) {
                c.unshift(a);
            }
            questions.push({ q, a, c });
        }
    }
    return questions;
}

const subjectMap = {
    'viet': 'vietnamese.txt',
    'science': 'science.txt',
    'tech': 'tech.txt'
};

for (let g = 1; g <= 5; g++) {
    const dataDir = path.join('src', 'data', 'grade' + g);
    const textbookDir = path.join('textbooks', 'grade' + g);

    Object.entries(subjectMap).forEach(([subKey, txtFileName]) => {
        const jsonPath = path.join(dataDir, subKey + '.json');
        const txtPath = path.join(textbookDir, txtFileName);

        let merged = [];
        const seenQuestions = new Set();

        // 1. Read existing json
        if (fs.existsSync(jsonPath)) {
            try {
                const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                jsonContent.forEach(q => {
                    if (q && q.q && q.a) {
                        const normQ = q.q.trim().toLowerCase();
                        if (!seenQuestions.has(normQ)) {
                            seenQuestions.add(normQ);
                            const choices = q.c || [q.a];
                            merged.push({ q: q.q, a: q.a, c: choices });
                        }
                    }
                });
            } catch (e) {
                console.error('Error parsing JSON for ' + jsonPath, e);
            }
        }

        // 2. Read existing txt
        if (fs.existsSync(txtPath)) {
            const txtQuestions = parseTextbookFile(txtPath);
            txtQuestions.forEach(q => {
                const normQ = q.q.trim().toLowerCase();
                if (!seenQuestions.has(normQ)) {
                    seenQuestions.add(normQ);
                    merged.push(q);
                }
            });
        }

        // 3. Write merged back to txt
        let txtOutput = '';
        merged.forEach(q => {
            txtOutput += 'Q: ' + q.q + '\n';
            txtOutput += 'A: ' + q.a + '\n';
            txtOutput += 'C: ' + q.c.join(', ') + '\n\n';
        });

        fs.writeFileSync(txtPath, txtOutput.trim() + '\n', 'utf8');
        console.log('Merged Grade ' + g + ' - ' + txtFileName + ': ' + merged.length + ' questions.');
    });
}
