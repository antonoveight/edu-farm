import fs from 'fs';
import path from 'path';
import {
    compilerDisabledResponse,
    isCompilerDisabled
} from '../../../lib/production-route-policy.js';

const GRADES = Object.freeze([1, 2, 3, 4, 5]);
const SUBJECT_FILES = Object.freeze({
    viet: 'vietnamese.txt',
    science: 'science.txt',
    tech: 'tech.txt'
});

function parseQuestionBlock(block) {
    const fields = Object.fromEntries(block.split('\n').map((line) => {
        const separatorIndex = line.indexOf(':');
        return separatorIndex === -1
            ? ['', '']
            : [line.slice(0, separatorIndex).trim(), line.slice(separatorIndex + 1).trim()];
    }));

    if (!fields.Q || !fields.A) {
        return [];
    }

    const choices = fields.C
        ? fields.C.split(',').map((choice) => choice.trim())
        : [];
    const completeChoices = choices.includes(fields.A)
        ? choices
        : [fields.A, ...choices];

    return [{ q: fields.Q, a: fields.A, c: completeChoices }];
}

function parseTextbookFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }

    return fs.readFileSync(filePath, 'utf8')
        .split(/\n\s*\n|\n\s*---\s*\n/)
        .flatMap(parseQuestionBlock);
}

function compileGrade(grade) {
    const textbookDirectory = path.join(process.cwd(), 'textbooks', `grade${grade}`);
    const dataDirectory = path.join(process.cwd(), 'src', 'data', `grade${grade}`);

    fs.mkdirSync(textbookDirectory, { recursive: true });
    fs.mkdirSync(dataDirectory, { recursive: true });

    return Object.entries(SUBJECT_FILES).flatMap(([subject, fileName]) => {
        const questions = parseTextbookFile(path.join(textbookDirectory, fileName));
        if (questions.length === 0) {
            return [];
        }

        fs.writeFileSync(
            path.join(dataDirectory, `${subject}.json`),
            JSON.stringify(questions, null, 2),
            'utf8'
        );
        return [`Compiled Grade ${grade} ${subject.toUpperCase()}: ${questions.length} questions.`];
    });
}

export async function POST() {
    if (isCompilerDisabled(process.env.NODE_ENV)) {
        return compilerDisabledResponse();
    }

    try {
        return Response.json({ success: true, log: GRADES.flatMap(compileGrade) });
    } catch (error) {
        console.error('Textbook compilation failed', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
