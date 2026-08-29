import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '../../../lib/admin-auth.js';
import QuestionManager from './question-manager.js';

export const metadata = {
    title: 'Ngân hàng câu hỏi | Edu-Farm'
};

export default async function AdminQuestionsPage() {
    const cookieStore = await cookies();
    const session = verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    if (!session) redirect('/admin/login');

    return <QuestionManager username={session.username} />;
}
