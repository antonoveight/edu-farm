import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'toanvui_admin_session';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_FAILURES = 5;
const LOGIN_ATTEMPTS_KEY = Symbol.for('toanvui.admin-login-attempts');

function getAdminConfig() {
    const isProduction = process.env.NODE_ENV === 'production';
    const username = process.env.ADMIN_USERNAME || (isProduction ? '' : 'admin');
    const password = process.env.ADMIN_PASSWORD || (isProduction ? '' : 'admin123');
    const sessionSecret = process.env.ADMIN_SESSION_SECRET
        || (isProduction ? '' : 'local-development-session-secret-change-me');

    const hasCredentials = Boolean(username && password && sessionSecret);
    const secureEnoughForProduction = password.length >= 12 && sessionSecret.length >= 32;
    return {
        username,
        password,
        sessionSecret,
        configured: hasCredentials && (!isProduction || secureEnoughForProduction)
    };
}

function safeEqual(left, right) {
    const leftHash = crypto.createHash('sha256').update(String(left)).digest();
    const rightHash = crypto.createHash('sha256').update(String(right)).digest();
    return crypto.timingSafeEqual(leftHash, rightHash);
}

function signPayload(payload, secret) {
    return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function isAdminConfigured() {
    return getAdminConfig().configured;
}

export function authenticateAdmin(username, password) {
    const config = getAdminConfig();
    if (!config.configured) return false;
    return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function createAdminSessionToken(username) {
    const config = getAdminConfig();
    if (!config.configured) throw new Error('Admin authentication is not configured');

    const issuedAt = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(JSON.stringify({
        username,
        issuedAt,
        expiresAt: issuedAt + SESSION_DURATION_SECONDS
    })).toString('base64url');
    return `${payload}.${signPayload(payload, config.sessionSecret)}`;
}

export function verifyAdminSessionToken(token) {
    const config = getAdminConfig();
    if (!config.configured || typeof token !== 'string') return null;
    const [payload, signature, ...extra] = token.split('.');
    if (!payload || !signature || extra.length) return null;
    if (!safeEqual(signature, signPayload(payload, config.sessionSecret))) return null;

    try {
        const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (
            session.username !== config.username
            || !Number.isInteger(session.expiresAt)
            || session.expiresAt <= Math.floor(Date.now() / 1000)
        ) {
            return null;
        }
        return session;
    } catch {
        return null;
    }
}

export function getAdminSessionFromRequest(request) {
    return verifyAdminSessionToken(request.cookies?.get(ADMIN_COOKIE_NAME)?.value);
}

export function getAdminCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: SESSION_DURATION_SECONDS,
        priority: 'high'
    };
}

export function isSameOriginRequest(request) {
    const origin = request.headers.get('origin');
    if (!origin) return true;

    try {
        const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
        const requestHost = forwardedHost || request.headers.get('host') || new URL(request.url).host;
        return new URL(origin).host === requestHost;
    } catch {
        return false;
    }
}

function getLoginAttemptKey(request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';
}

function getLoginAttempts() {
    if (!globalThis[LOGIN_ATTEMPTS_KEY]) globalThis[LOGIN_ATTEMPTS_KEY] = new Map();
    return globalThis[LOGIN_ATTEMPTS_KEY];
}

export function getAdminLoginRetryAfter(request) {
    const attempts = getLoginAttempts();
    const key = getLoginAttemptKey(request);
    const entry = attempts.get(key);
    if (!entry) return 0;
    const elapsed = Date.now() - entry.startedAt;
    if (elapsed >= LOGIN_WINDOW_MS) {
        attempts.delete(key);
        return 0;
    }
    if (entry.failures < MAX_LOGIN_FAILURES) return 0;
    return Math.max(1, Math.ceil((LOGIN_WINDOW_MS - elapsed) / 1000));
}

export function recordAdminLoginFailure(request) {
    const attempts = getLoginAttempts();
    const key = getLoginAttemptKey(request);
    const current = attempts.get(key);
    if (!current || Date.now() - current.startedAt >= LOGIN_WINDOW_MS) {
        attempts.set(key, { failures: 1, startedAt: Date.now() });
        return;
    }
    current.failures += 1;
}

export function clearAdminLoginFailures(request) {
    getLoginAttempts().delete(getLoginAttemptKey(request));
}
