import questionStore from '../../../lib/question-store.cjs';
import {
    RequestValidationError,
    parseGrade
} from '../../../lib/request-validation.js';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const grade = parseGrade(searchParams.get('grade'));
        return Response.json(questionStore.getPublicQuestionBank(grade));
    } catch (error) {
        if (error instanceof RequestValidationError) {
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error('Question loading failed', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
