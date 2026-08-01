import fs from 'fs';
import path from 'path';

export async function POST(request) {
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

    const log = [];

    grades.forEach(g => {
        const textbookDir = path.join(process.cwd(), 'textbooks', `grade${g}`);
        const dataDir = path.join(process.cwd(), 'src', 'data', `grade${g}`);
        
        fs.mkdirSync(textbookDir, { recursive: true });
        fs.mkdirSync(dataDir, { recursive: true });

        Object.entries(subjectFilesMap).forEach(([subject, fileName]) => {
            const textFilePath = path.join(textbookDir, fileName);
            const jsonFilePath = path.join(dataDir, `${subject}.json`);

            const parsedQuestions = parseTextbookFile(textFilePath);
            if (parsedQuestions) {
                fs.writeFileSync(jsonFilePath, JSON.stringify(parsedQuestions, null, 2), 'utf8');
                log.push(`Compiled Grade ${g} ${subject.toUpperCase()}: ${parsedQuestions.length} questions.`);
            }
        });
    });

    return Response.json({ success: true, log });
}
