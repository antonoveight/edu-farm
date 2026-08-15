import { NextResponse } from 'next/server';
import {
    ADMIN_COOKIE_NAME,
    authenticateAdmin,
    clearAdminLoginFailures,
    createAdminSessionToken,
    getAdminLoginRetryAfter,
    getAdminCookieOptions,
    isAdminConfigured,
    isSameOriginRequest,
    recordAdminLoginFailure
} from '../../../../../lib/admin-auth.js';

export async function POST(request) {
    if (!isSameOriginRequest(request)) {
        return NextResponse.json({ error: 'Nguồn yêu cầu không hợp lệ' }, { status: 403 });
    }
    if (!isAdminConfigured()) {
        return NextResponse.json({
            error: 'Tài khoản quản trị chưa được cấu hình trên máy chủ'
        }, { status: 503 });
    }
    const retryAfter = getAdminLoginRetryAfter(request);
    if (retryAfter) {
        return NextResponse.json({
            error: 'Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau.'
        }, {
            status: 429,
            headers: { 'Retry-After': String(retryAfter) }
        });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Dữ liệu đăng nhập không hợp lệ' }, { status: 400 });
    }
    const username = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!authenticateAdmin(username, password)) {
        recordAdminLoginFailure(request);
        return NextResponse.json({ error: 'Tài khoản hoặc mật khẩu không đúng' }, { status: 401 });
    }

    clearAdminLoginFailures(request);
    const response = NextResponse.json({ ok: true, username });
    response.cookies.set(
        ADMIN_COOKIE_NAME,
        createAdminSessionToken(username),
        getAdminCookieOptions()
    );
    return response;
}
