import { expect, test } from 'vitest';
import { GET } from '../src/app/api/health/route.js';

test('GET /api/health returns a deterministic 200 response', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
});
