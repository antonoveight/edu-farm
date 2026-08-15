import questionStore from '../../../../lib/question-store.cjs';
import { adminApiError, authorizeAdminRequest } from '../../../../lib/admin-api.js';

export async function GET(request) {
    const denied = authorizeAdminRequest(request);
    if (denied) return denied;

    try {
        return Response.json(questionStore.getMetadataSnapshot());
    } catch (error) {
        return adminApiError(error, 'Admin question metadata loading failed');
    }
}
