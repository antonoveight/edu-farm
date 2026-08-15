import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const projectRoot = path.resolve(import.meta.dirname, '..');
const bank = JSON.parse(fs.readFileSync(
    path.join(projectRoot, 'src/data/grade1/math.json'),
    'utf8'
));

const normalizedQuestion = (question) => question
    .normalize('NFC')
    .toLocaleLowerCase('vi')
    .replace(/\s+/g, ' ')
    .trim();

describe('standardized Grade 1 mathematics bank', () => {
    test('contains 400 approved, book-sourced questions with complete metadata', () => {
        expect(bank).toHaveLength(400);

        for (const question of bank) {
            expect(question.status).toBe('published');
            expect(question.sourceType).toBe('book');
            expect(question.sourceRef).toMatch(/SGK Toán 1, Tập (?:một|hai)/);
            expect(question.sourcePage).toBeGreaterThanOrEqual(4);
            expect(question.sourcePage).toBeLessThanOrEqual(112);
            expect(question.lo).toMatch(/^Bài (?:[1-9]|[1-3]\d|4[01]):/);
            expect(['easy', 'medium']).toContain(question.difficulty);
            expect(['multiple_choice', 'fill_blank', 'true_false']).toContain(question.type);
        }
    });

    test('contains 200 questions from each book and preserves its page range', () => {
        const semesterOne = bank.filter(({ sourceRef }) => sourceRef.includes('Tập một'));
        const semesterTwo = bank.filter(({ sourceRef }) => sourceRef.includes('Tập hai'));

        expect(semesterOne).toHaveLength(200);
        expect(semesterTwo).toHaveLength(200);
        expect(semesterOne.every(({ sourcePage }) => sourcePage >= 8 && sourcePage <= 112)).toBe(true);
        expect(semesterTwo.every(({ sourcePage }) => sourcePage >= 4 && sourcePage <= 104)).toBe(true);
        expect(semesterOne.every(({ sourceRef }) => sourceRef.includes('sgk-toan-1-tu-nam-2026-tap-1_107202616.pdf'))).toBe(true);
        expect(semesterTwo.every(({ sourceRef }) => sourceRef.includes('sgk-toan-1-tu-nam-2026-tap-2_107202616.pdf'))).toBe(true);
    });

    test('covers every lesson across both semester books', () => {
        for (let lesson = 1; lesson <= 41; lesson += 1) {
            expect(bank.some((question) => question.lo.startsWith(`Bài ${lesson}:`))).toBe(true);
        }
    });

    test('has unique questions and valid answer choices', () => {
        const normalized = bank.map(({ q }) => normalizedQuestion(q));
        expect(new Set(normalized).size).toBe(bank.length);

        for (const question of bank) {
            expect(question.c).toContain(question.a);
            expect(new Set(question.c).size).toBe(question.c.length);
            expect(question.c.length).toBeGreaterThanOrEqual(2);
            if (question.type === 'fill_blank') {
                expect(question.sentence).toContain('___');
            }
            if (question.type === 'true_false') {
                expect(new Set(question.c)).toEqual(new Set(['Đúng', 'Sai']));
            }
        }
    });

    test('keeps numerical content within each semester range', () => {
        const semesterOne = bank.filter(({ sourceRef }) => sourceRef.includes('Tập một'));
        const semesterTwo = bank.filter(({ sourceRef }) => sourceRef.includes('Tập hai'));

        for (const question of semesterOne) {
            const numbers = question.q.match(/\d+/g)?.map(Number) || [];
            expect(numbers.every((number) => number >= 0 && number <= 10)).toBe(true);
            expect(question.q).not.toMatch(/[×÷]/);
        }
        for (const question of semesterTwo) {
            const numbers = question.q.match(/\d+/g)?.map(Number) || [];
            expect(numbers.every((number) => number >= 0 && number <= 100)).toBe(true);
            expect(question.q).not.toMatch(/[×÷]/);
        }
    });

    test('computes all semester-two operations without carrying or borrowing', () => {
        for (const question of bank.filter(({ sourceRef }) => sourceRef.includes('Tập hai'))) {
            let match = question.q.match(/^(?:Tính trong phạm vi 100|Đặt tính rồi tính): (\d+) \+ (\d+) = (?:\?|___)$/);
            if (match) {
                const left = Number(match[1]);
                const right = Number(match[2]);
                expect(Number(question.a)).toBe(left + right);
                expect(left % 10 + right % 10).toBeLessThan(10);
            }

            match = question.q.match(/^(?:Tính trong phạm vi 100|Đặt tính rồi tính): (\d+) − (\d+) = (?:\?|___)$/);
            if (match) {
                const left = Number(match[1]);
                const right = Number(match[2]);
                expect(Number(question.a)).toBe(left - right);
                expect(left % 10).toBeGreaterThanOrEqual(right % 10);
            }
        }
    });

    test('computes generated arithmetic, comparison and decomposition answers correctly', () => {
        for (const question of bank) {
            let match = question.q.match(/^Tính: (\d+) \+ (\d+) = (?:\?|___)$/);
            if (match) expect(Number(question.a)).toBe(Number(match[1]) + Number(match[2]));

            match = question.q.match(/^Tính: (\d+) − (\d+) = (?:\?|___)$/);
            if (match) expect(Number(question.a)).toBe(Number(match[1]) - Number(match[2]));

            match = question.q.match(/^Chọn dấu thích hợp: (\d+) ___ (\d+)\.$/);
            if (match) {
                const left = Number(match[1]);
                const right = Number(match[2]);
                expect(question.a).toBe(left > right ? '>' : left < right ? '<' : '=');
            }

            match = question.q.match(/^Điền số thích hợp: (\d+) gồm (\d+) và ___\.$/);
            if (match) expect(Number(question.a)).toBe(Number(match[1]) - Number(match[2]));

            match = question.q.match(/^Chọn số thích hợp: (\d+) \+ ___ = (\d+)\.$/);
            if (match) expect(Number(question.a)).toBe(Number(match[2]) - Number(match[1]));

            match = question.q.match(/^Chọn số thích hợp: ___ \+ (\d+) = (\d+)\.$/);
            if (match) expect(Number(question.a)).toBe(Number(match[2]) - Number(match[1]));

            match = question.q.match(/^Chọn số thích hợp: (\d+) − ___ = (\d+)\.$/);
            if (match) expect(Number(question.a)).toBe(Number(match[1]) - Number(match[2]));

            match = question.q.match(/^Chọn số thích hợp: ___ − (\d+) = (\d+)\.$/);
            if (match) expect(Number(question.a)).toBe(Number(match[1]) + Number(match[2]));
        }
    });

    test('preserves the intended type and difficulty distribution', () => {
        const countBy = (field) => bank.reduce((counts, question) => ({
            ...counts,
            [question[field]]: (counts[question[field]] || 0) + 1
        }), {});

        expect(countBy('type')).toEqual({
            multiple_choice: 258,
            fill_blank: 105,
            true_false: 37
        });
        expect(countBy('difficulty')).toEqual({ easy: 202, medium: 198 });
    });
});
