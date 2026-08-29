import questionStore from '../../../../../lib/question-store.cjs';
import { adminApiError, authorizeAdminRequest } from '../../../../../lib/admin-api.js';

export async function POST(request) {
    const denied = authorizeAdminRequest(request, { mutation: true });
    if (denied) return denied;

    try {
        return Response.json({
            sync: questionStore.syncLegacyQuestions(),
            metadata: questionStore.getMetadataSnapshot()
        });
    } catch (error) {
        return adminApiError(error, 'Legacy question synchronization failed');
    }
}
