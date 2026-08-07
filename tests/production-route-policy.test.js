import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const fsSpies = vi.hoisted(() => ({
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    readFileSync: vi.fn(),
    readdirSync: vi.fn(),
    writeFileSync: vi.fn()
}));

vi.mock('fs', () => ({ default: fsSpies }));

import { GET as compilePdf } from '../src/app/api/compile-pdf/route.js';
import { POST as compileTextbooks } from '../src/app/api/compile/route.js';
import { isCompilerDisabled } from '../src/lib/production-route-policy.js';

describe('isCompilerDisabled', () => {
    test.each([
        ['production', true],
        ['development', false],
        ['test', false],
        ['', false],
        [undefined, false]
    ])('maps %j to %s', (nodeEnv, expected) => {
        expect(isCompilerDisabled(nodeEnv)).toBe(expected);
    });
});

describe('compile PDF request validation', () => {
    beforeEach(() => {
        vi.stubEnv('NODE_ENV', 'development');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
        vi.resetAllMocks();
    });

    test.each([
        '../science',
        '..%2fscience',
        '%2e%2e%2fscience',
        'science/other'
    ])('rejects subject traversal %s before filesystem access', async (subject) => {
        const request = new Request(
            `http://localhost/api/compile-pdf?grade=1&subject=${encodeURIComponent(subject)}`
        );
        const response = await compilePdf(request);

        expect(response.status).toBe(400);
        for (const operation of Object.values(fsSpies)) {
            expect(operation).not.toHaveBeenCalled();
        }
    });

    test('returns a generic 500 when PDF loading fails unexpectedly', async () => {
        fsSpies.existsSync.mockImplementation(() => {
            throw new Error('/private/pdf/path');
        });
        vi.spyOn(console, 'error').mockImplementation(() => {});
        const request = new Request(
            'http://localhost/api/compile-pdf?grade=1&subject=science'
        );

        const response = await compilePdf(request);

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });

    test('returns a generic 500 when textbook compilation fails unexpectedly', async () => {
        fsSpies.mkdirSync.mockImplementation(() => {
            throw new Error('/private/textbook/path');
        });
        vi.spyOn(console, 'error').mockImplementation(() => {});

        const response = await compileTextbooks();

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });
});

describe('production compiler policy', () => {
    beforeEach(() => {
        vi.stubEnv('NODE_ENV', 'production');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
        vi.resetAllMocks();
    });

    test.each([
        ['POST /api/compile', () => compileTextbooks()],
        ['GET /api/compile-pdf', () => compilePdf()]
    ])('%s returns a fixed 404 before filesystem access', async (_name, callRoute) => {
        const response = await callRoute();

        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({ error: 'Not Found' });
        for (const operation of Object.values(fsSpies)) {
            expect(operation).not.toHaveBeenCalled();
        }
    });
});
