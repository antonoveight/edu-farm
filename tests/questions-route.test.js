import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { GET } from '../src/app/api/questions/route.js';
import questionStore from '../src/lib/question-store.cjs';

const requestForGrade = (grade) =>
    new Request(`http://localhost/api/questions?grade=${encodeURIComponent(grade)}`);

describe('GET /api/questions', () => {
    beforeEach(() => {
        vi.stubEnv('QUESTION_DB_PATH', ':memory:');
        questionStore.closeDatabaseForTests();
    });

    afterEach(() => {
        questionStore.closeDatabaseForTests();
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    test('loads the canonical grade-one question subjects', async () => {
        const response = await GET(requestForGrade('1'));
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(Object.keys(body)).toEqual([
            'math', 'viet', 'english', 'science', 'tech', 'ethics', 'experience',
            'music', 'art', 'physical'
        ]);
        expect(body.math).toHaveLength(400);
        expect(body.viet).toHaveLength(338);
        expect(body.english).toHaveLength(124);
        expect(body.science).toHaveLength(112);
        expect(body.tech).toHaveLength(31);
    });

    test('merges the immediately previous grade into grades above one', async () => {
        const gradeOne = await (await GET(requestForGrade('1'))).json();
        const gradeTwo = await (await GET(requestForGrade('2'))).json();

        expect(gradeTwo.viet.length).toBeGreaterThan(gradeOne.viet.length);
        expect(gradeTwo.science.length).toBeGreaterThan(gradeOne.science.length);
        expect(gradeTwo.tech.length).toBeGreaterThan(gradeOne.tech.length);
        expect(gradeTwo.math.length).toBeGreaterThan(gradeOne.math.length);
        expect(gradeTwo.english).toHaveLength(gradeOne.english.length);
        expect(gradeTwo.ethics).toHaveLength(20);
        expect(gradeTwo.experience).toHaveLength(20);
        expect(gradeTwo.music).toHaveLength(20);
        expect(gradeTwo.art).toHaveLength(20);
        expect(gradeTwo.physical).toHaveLength(20);
    });

    test('preserves interaction data required by game question types', async () => {
        const body = await (await GET(requestForGrade('1'))).json();
        const matching = body.tech.find((question) => question.type === 'matching');

        expect(matching).toBeDefined();
        expect(matching.pairs).toBeInstanceOf(Array);
        expect(matching.pairs.length).toBeGreaterThan(1);
    });

    test.each(['', '0', '6', '01', '1.5', '../1'])('rejects grade %j', async (grade) => {
        const response = await GET(requestForGrade(grade));

        expect(response.status).toBe(400);
    });

    test('returns a generic 500 when question loading fails unexpectedly', async () => {
        vi.spyOn(questionStore, 'getPublicQuestionBank').mockImplementation(() => {
            throw new Error('/private/server/path');
        });

        const response = await GET(requestForGrade('1'));

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });
});
