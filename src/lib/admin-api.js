import { getAdminSessionFromRequest, isSameOriginRequest } from './admin-auth.js';
import { QuestionValidationError } from './admin-question-validation.js';

export function unauthorizedResponse() {
    return Response.json({ error: 'Phiên quản trị không hợp lệ hoặc đã hết hạn' }, { status: 401 });
}

export function forbiddenOriginResponse() {
    return Response.json({ error: 'Nguồn yêu cầu không hợp lệ' }, { status: 403 });
}

export function authorizeAdminRequest(request, { mutation = false } = {}) {
    if (!getAdminSessionFromRequest(request)) return unauthorizedResponse();
    if (mutation && !isSameOriginRequest(request)) return forbiddenOriginResponse();
    return null;
}

export async function readJsonBody(request) {
    try {
        return await request.json();
    } catch {
        throw new QuestionValidationError('Dữ liệu JSON không hợp lệ');
    }
}

export function adminApiError(error, context) {
    if (error instanceof QuestionValidationError) {
        return Response.json({ error: error.message }, { status: 400 });
    }
    if (error.code?.startsWith('SQLITE_CONSTRAINT')) {
        return Response.json({ error: 'Câu hỏi này đã tồn tại trong ngân hàng' }, { status: 409 });
    }
    console.error(context, error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
}
