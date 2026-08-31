import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const dataDirectory = path.resolve(import.meta.dirname, '../src/data/grade1');
const loadBank = (subject) => JSON.parse(
    fs.readFileSync(path.join(dataDirectory, `${subject}.json`), 'utf8')
);

const english = loadBank('english');
const science = loadBank('science');
const viet = loadBank('viet');

const FILES = {
    english: 'sgk-tieng-anh-lop-1-thong-nhat-tu-nam-2026_107202616.pdf',
    science: 'sgk-tu-nhien-va-xa-hoi-lop-1-thong-nhat-tu-nam-2026_107202616.pdf',
    viet1: 'sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-1_107202616.pdf',
    viet2: 'sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-2_107202616.pdf'
};

function expectValidBookQuestions(bank, sourceFiles) {
    const normalizedPrompts = new Set();

    for (const question of bank) {
        expect(question.q.trim()).not.toBe('');
        expect(question.a.trim()).not.toBe('');
        expect(question.lo.trim()).not.toBe('');
        expect(question.status).toBe('published');
        expect(question.sourceType).toBe('book');
        expect(sourceFiles.some((file) => question.sourceRef.includes(file))).toBe(true);
        expect(Number.isInteger(question.sourcePage)).toBe(true);
        expect(question.sourcePage).toBeGreaterThan(0);
        expect(question.explanation.trim()).not.toBe('');
        expect(question.hints).toBeInstanceOf(Array);

        if (['multiple_choice', 'fill_blank', 'true_false'].includes(question.type)) {
            expect(question.c).toContain(question.a);
            expect(new Set(question.c).size).toBe(question.c.length);
            expect(question.c.length).toBeGreaterThanOrEqual(2);
        }
        if (question.type === 'typing') expect(question.c).toEqual([]);

        const normalized = question.q.normalize('NFC').toLocaleLowerCase('vi')
            .replace(/\s+/g, ' ').trim();
        expect(normalizedPrompts.has(normalized)).toBe(false);
        normalizedPrompts.add(normalized);
    }
}

describe('Grade 1 textbook-authored banks', () => {
    test('have complete metadata, valid choices and unique prompts', () => {
        expect(english).toHaveLength(124);
        expect(science).toHaveLength(112);
        expect(viet).toHaveLength(338);

        expectValidBookQuestions(english, [FILES.english]);
        expectValidBookQuestions(science, [FILES.science]);
        expectValidBookQuestions(viet, [FILES.viet1, FILES.viet2]);
    });

    test('covers all 16 English units from the book map', () => {
        for (let unit = 1; unit <= 16; unit += 1) {
            const questions = english.filter(({ sourceRef }) =>
                sourceRef.includes(`– Unit ${unit}:`)
            );
            expect(questions.length).toBeGreaterThanOrEqual(7);
            expect(questions.length).toBeLessThanOrEqual(8);
        }
        expect(Math.min(...english.map(({ sourcePage }) => sourcePage))).toBe(6);
        expect(Math.max(...english.map(({ sourcePage }) => sourcePage))).toBe(68);
    });

    test('covers all 28 Natural and Social Science lessons evenly', () => {
        for (let lesson = 1; lesson <= 28; lesson += 1) {
            expect(science.filter(({ sourceRef }) =>
                sourceRef.includes(`– Bài ${lesson}:`)
            )).toHaveLength(4);
        }
        expect(Math.min(...science.map(({ sourcePage }) => sourcePage))).toBe(6);
        expect(Math.max(...science.map(({ sourcePage }) => sourcePage))).toBe(120);
    });

    test('covers all 80 volume-one lessons and all 45 volume-two readings', () => {
        const volumeOne = viet.filter(({ sourceRef }) => sourceRef.includes(FILES.viet1));
        const volumeTwo = viet.filter(({ sourceRef }) => sourceRef.includes(FILES.viet2));

        expect(volumeOne).toHaveLength(248);
        expect(volumeTwo).toHaveLength(90);
        for (let lesson = 1; lesson <= 80; lesson += 1) {
            expect(volumeOne.some(({ sourceRef }) =>
                sourceRef.includes(`– Bài ${lesson}:`)
            )).toBe(true);
        }

        const readingRefs = new Set(volumeTwo.map(({ sourceRef }) => sourceRef));
        expect(readingRefs.size).toBe(45);
        for (const sourceRef of readingRefs) {
            expect(volumeTwo.filter((question) => question.sourceRef === sourceRef)).toHaveLength(2);
        }
        for (let theme = 1; theme <= 8; theme += 1) {
            expect(volumeTwo.some(({ sourceRef }) =>
                sourceRef.includes(`– Chủ điểm ${theme} –`)
            )).toBe(true);
        }
    });

    test('keeps checked textbook details in their canonical lessons', () => {
        expect(viet).toContainEqual(expect.objectContaining({
            q: 'Tiếng nào dưới đây chứa vần “ia”?',
            a: 'tia',
            sourcePage: 58
        }));
        expect(viet).toContainEqual(expect.objectContaining({
            q: 'Vinh làm thế nào để lấy quả bưởi dưới hố?',
            a: 'Đổ nước đầy hố để quả bưởi nổi lên',
            sourcePage: 144
        }));
        expect(english).toContainEqual(expect.objectContaining({
            q: 'Hoàn thành mẫu câu của Unit 2: I ___ a car.',
            a: 'have',
            sourcePage: 9
        }));
        expect(science).toContainEqual(expect.objectContaining({
            q: 'Khi thấy dây điện bị hở, em cần làm gì?',
            a: 'Báo ngay cho người lớn',
            sourcePage: 18
        }));
    });
});
