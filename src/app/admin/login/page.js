import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '../../../lib/admin-auth.js';
import AdminLoginForm from './admin-login-form.js';

export const metadata = {
    title: 'Đăng nhập quản trị | Edu-Farm'
};

export default async function AdminLoginPage() {
    const cookieStore = await cookies();
    const session = verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    if (session) redirect('/admin/questions');

    return <AdminLoginForm />;
}
