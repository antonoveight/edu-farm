import { NextResponse } from 'next/server';
import {
    ADMIN_COOKIE_NAME,
    getAdminCookieOptions,
    isSameOriginRequest
} from '../../../../../lib/admin-auth.js';

export async function POST(request) {
    if (!isSameOriginRequest(request)) {
        return NextResponse.json({ error: 'Nguồn yêu cầu không hợp lệ' }, { status: 403 });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, '', {
        ...getAdminCookieOptions(),
        maxAge: 0
    });
    return response;
}
