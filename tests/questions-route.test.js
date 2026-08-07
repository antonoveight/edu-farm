import fs from 'fs';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { GET } from '../src/app/api/questions/route.js';

const requestForGrade = (grade) =>
    new Request(`http://localhost/api/questions?grade=${encodeURIComponent(grade)}`);

describe('GET /api/questions', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('loads the canonical grade-one question subjects', async () => {
        const response = await GET(requestForGrade('1'));
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(Object.keys(body)).toEqual(['viet', 'science', 'tech']);
        expect(body.viet.length).toBeGreaterThan(0);
        expect(body.science.length).toBeGreaterThan(0);
        expect(body.tech.length).toBeGreaterThan(0);
    });

    test('merges the immediately previous grade into grades above one', async () => {
        const gradeOne = await (await GET(requestForGrade('1'))).json();
        const gradeTwo = await (await GET(requestForGrade('2'))).json();

        expect(gradeTwo.viet.length).toBeGreaterThan(gradeOne.viet.length);
        expect(gradeTwo.science.length).toBeGreaterThan(gradeOne.science.length);
        expect(gradeTwo.tech.length).toBeGreaterThan(gradeOne.tech.length);
    });

    test.each(['', '0', '6', '01', '1.5', '../1'])('rejects grade %j', async (grade) => {
        const response = await GET(requestForGrade(grade));

        expect(response.status).toBe(400);
    });

    test('returns a generic 500 when question loading fails unexpectedly', async () => {
        vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error('/private/server/path');
        });

        const response = await GET(requestForGrade('1'));

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });
});
