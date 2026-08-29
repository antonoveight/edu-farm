import questionStore from '../../../../lib/question-store.cjs';
import {
    adminApiError,
    authorizeAdminRequest,
    readJsonBody
} from '../../../../lib/admin-api.js';
import {
    parseQuestionFilters,
    parseQuestionInput
} from '../../../../lib/admin-question-validation.js';

export async function GET(request) {
    const denied = authorizeAdminRequest(request);
    if (denied) return denied;

    try {
        const filters = parseQuestionFilters(new URL(request.url).searchParams);
        return Response.json(questionStore.listQuestions(filters));
    } catch (error) {
        return adminApiError(error, 'Admin question listing failed');
    }
}

export async function POST(request) {
    const denied = authorizeAdminRequest(request, { mutation: true });
    if (denied) return denied;

    try {
        const question = parseQuestionInput(await readJsonBody(request));
        return Response.json({ item: questionStore.createQuestion(question) }, { status: 201 });
    } catch (error) {
        return adminApiError(error, 'Admin question creation failed');
    }
}
