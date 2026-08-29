import questionStore from '../../../../../lib/question-store.cjs';
import {
    adminApiError,
    authorizeAdminRequest,
    readJsonBody
} from '../../../../../lib/admin-api.js';
import {
    parseQuestionId,
    parseQuestionInput
} from '../../../../../lib/admin-question-validation.js';

export async function GET(request, context) {
    const denied = authorizeAdminRequest(request);
    if (denied) return denied;

    try {
        const { id: rawId } = await context.params;
        const item = questionStore.getQuestion(parseQuestionId(rawId));
        if (!item) return Response.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
        return Response.json({ item });
    } catch (error) {
        return adminApiError(error, 'Admin question loading failed');
    }
}

export async function PUT(request, context) {
    const denied = authorizeAdminRequest(request, { mutation: true });
    if (denied) return denied;

    try {
        const { id: rawId } = await context.params;
        const id = parseQuestionId(rawId);
        const question = parseQuestionInput(await readJsonBody(request));
        const item = questionStore.updateQuestion(id, question);
        if (!item) return Response.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
        return Response.json({ item });
    } catch (error) {
        return adminApiError(error, 'Admin question update failed');
    }
}

export async function DELETE(request, context) {
    const denied = authorizeAdminRequest(request, { mutation: true });
    if (denied) return denied;

    try {
        const { id: rawId } = await context.params;
        const deleted = questionStore.deleteQuestion(parseQuestionId(rawId));
        if (!deleted) return Response.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
        return Response.json({ ok: true });
    } catch (error) {
        return adminApiError(error, 'Admin question deletion failed');
    }
}
