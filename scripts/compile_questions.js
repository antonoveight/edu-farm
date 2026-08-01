import fs from 'fs';
import path from 'path';

const grades = [1, 2, 3, 4, 5];
const subjectFilesMap = {
    'viet': 'vietnamese.txt',
    'science': 'science.txt',
    'tech': 'tech.txt'
};

function parseTextbookFile(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const blocks = content.split(/\n\s*\n|\n\s*---\s*\n/);
    const questions = [];

    for (const block of blocks) {
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
            // If choices are not provided or don't include the correct answer, make sure correct answer is there
            if (c.length === 0) {
                c = [a];
            } else if (!c.includes(a)) {
                c.unshift(a);
            }
            questions.push({ q, a, c });
        }
    }

    return questions.length > 0 ? questions : null;
}

grades.forEach(g => {
    const textbookDir = path.join('textbooks', 'grade' + g);
    const dataDir = path.join('src', 'data', 'grade' + g);
    
    // Create directories if they do not exist
    fs.mkdirSync(textbookDir, { recursive: true });
    fs.mkdirSync(dataDir, { recursive: true });

    Object.entries(subjectFilesMap).forEach(([subject, fileName]) => {
        const textFilePath = path.join(textbookDir, fileName);
        const jsonFilePath = path.join(dataDir, subject + '.json');

        const parsedQuestions = parseTextbookFile(textFilePath);
        if (parsedQuestions) {
            fs.writeFileSync(jsonFilePath, JSON.stringify(parsedQuestions, null, 2), 'utf8');
            console.log(`Successfully compiled: ${textFilePath} -> ${jsonFilePath} (${parsedQuestions.length} questions)`);
        } else {
            // Create a placeholder template .txt file for the user if it doesn't exist
            if (!fs.existsSync(textFilePath)) {
                const sampleContent = 
`Q: Câu hỏi mẫu ${subject.toUpperCase()} Lớp ${g}?
A: ĐÁP ÁN ĐÚNG
C: ĐÁP ÁN ĐÚNG, ĐÁP ÁN SAI 1, ĐÁP ÁN SAI 2, ĐÁP ÁN SAI 3

Q: Câu hỏi mẫu thứ hai?
A: ĐÚNG
C: ĐÚNG, SAI 1, SAI 2
`;
                fs.writeFileSync(textFilePath, sampleContent, 'utf8');
                console.log(`Created template outline file: ${textFilePath}`);
            }
        }
    });
});

console.log('All textbook questions compiled!');
