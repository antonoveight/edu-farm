import fs from 'fs';
import path from 'path';
import {
    RequestValidationError,
    parseGrade
} from '../../../lib/request-validation.js';

const SUBJECTS = Object.freeze(['viet', 'science', 'tech']);

function loadGradeData(grade) {
    const dataDirectory = path.join(process.cwd(), 'src', 'data', `grade${grade}`);

    return Object.fromEntries(SUBJECTS.map((subject) => {
        const filePath = path.join(dataDirectory, `${subject}.json`);
        const questions = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
            : [];

        return [subject, questions];
    }));
}

function mergeGradeData(currentData, previousData) {
    return Object.fromEntries(SUBJECTS.map((subject) => [
        subject,
        [...currentData[subject], ...previousData[subject]]
    ]));
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const grade = parseGrade(searchParams.get('grade'));
        const currentData = loadGradeData(grade);
        const responseData = grade === 1
            ? currentData
            : mergeGradeData(currentData, loadGradeData(grade - 1));

        return Response.json(responseData);
    } catch (error) {
        if (error instanceof RequestValidationError) {
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error('Question loading failed', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
