import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
    authenticateAdmin,
    createAdminSessionToken,
    getAdminCookieOptions,
    isSameOriginRequest,
    verifyAdminSessionToken
} from '../src/lib/admin-auth.js';

describe('admin authentication', () => {
    beforeEach(() => {
        vi.stubEnv('NODE_ENV', 'test');
        vi.stubEnv('ADMIN_USERNAME', 'manager');
        vi.stubEnv('ADMIN_PASSWORD', 'correct horse battery staple');
        vi.stubEnv('ADMIN_SESSION_SECRET', 'a-test-secret-that-is-long-and-random-enough');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.useRealTimers();
    });

    test('authenticates configured credentials and signs a session', () => {
        expect(authenticateAdmin('manager', 'correct horse battery staple')).toBe(true);
        expect(authenticateAdmin('manager', 'wrong')).toBe(false);

        const token = createAdminSessionToken('manager');
        expect(verifyAdminSessionToken(token)).toMatchObject({ username: 'manager' });
        expect(verifyAdminSessionToken(`${token}tampered`)).toBeNull();
    });

    test('rejects an expired session', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
        const token = createAdminSessionToken('manager');
        vi.setSystemTime(new Date('2026-01-01T09:00:00Z'));
        expect(verifyAdminSessionToken(token)).toBeNull();
    });

    test('uses a cookie path that covers both pages and admin APIs', () => {
        expect(getAdminCookieOptions()).toMatchObject({
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });
    });

    test('rejects cross-origin mutations', () => {
        expect(isSameOriginRequest(new Request('https://example.com/api/admin/questions', {
            headers: { origin: 'https://example.com', host: 'example.com' }
        }))).toBe(true);
        expect(isSameOriginRequest(new Request('https://example.com/api/admin/questions', {
            headers: { origin: 'https://attacker.example', host: 'example.com' }
        }))).toBe(false);
        expect(isSameOriginRequest(new Request('http://internal:3000/api/admin/questions', {
            headers: {
                origin: 'https://toanvui.tinhocsaoviet.com',
                host: 'internal:3000',
                'x-forwarded-host': 'toanvui.tinhocsaoviet.com'
            }
        }))).toBe(true);
    });
});
