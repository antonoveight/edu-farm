import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const directory = path.resolve(import.meta.dirname, '../src/data/grade2');
const banks = Object.fromEntries([
    'math', 'viet', 'ethics', 'experience', 'music', 'art', 'physical'
].map((subject) => [subject, JSON.parse(fs.readFileSync(path.join(directory, `${subject}.json`), 'utf8'))]));

const expectedFiles = {
    math: ['toan-2-tap-1-ket-noi-tri-thuc-voi-cuoc-song56f30_5120269.pdf', 'toan-2-tap-2-ket-noi-tri-thuc-voi-cuoc-song57e50_5120269.pdf'],
    viet: ['tieng-viet-2-tap-1-ket-noi-tri-thuc-voi-cuoc-song6167f_5120269.pdf', 'tieng-viet-2-tap-2-ket-noi-tri-thuc-voi-cuoc-songeddfb_5120269.pdf'],
    ethics: ['daoduc2ketnoitrithucvoicuocsong90e92_5120269.pdf'],
    experience: ['hoatdongtrainghiem2ketnoitrithucvoicuocsongf88b0_5120269.pdf'],
    music: ['amnhac2ketnoitrithucvoicuocsongd7bf0_5120269.pdf'],
    art: ['mithuat2ketnoitrithucvoicuocsong4102f_5120269.pdf'],
    physical: ['giaoducthechat2ketnoitrithucvoicuocsongba970_5120269.pdf']
};

function assertBank(subject, minimumCount) {
    const bank = banks[subject];
    const prompts = new Set();
    expect(bank.length).toBeGreaterThanOrEqual(minimumCount);

    for (const question of bank) {
        expect(question.q.trim()).not.toBe('');
        expect(question.a.trim()).not.toBe('');
        expect(question.lo.trim()).not.toBe('');
        expect(question.status).toBe('published');
        expect(question.sourceType).toBe('book');
        expect(question.sourcePage).toBeGreaterThan(0);
        expect(question.explanation.trim()).not.toBe('');
        expect(question.hints).toBeInstanceOf(Array);
        expect(expectedFiles[subject].some((file) => question.sourceRef.includes(file))).toBe(true);
        expect(question.c).toContain(question.a);
        expect(new Set(question.c).size).toBe(question.c.length);

        const prompt = question.q.normalize('NFC').toLocaleLowerCase('vi').replace(/\s+/g, ' ').trim();
        expect(prompts.has(prompt)).toBe(false);
        prompts.add(prompt);
    }
}

describe('Grade 2 textbook-authored banks', () => {
    test('keep traceable source metadata and valid choices for every supplied subject', () => {
        assertBank('math', 400);
        assertBank('viet', 90);
        for (const subject of ['ethics', 'experience', 'music', 'art', 'physical']) assertBank(subject, 20);
    });

    test('covers both volumes of mathematics and Vietnamese textbooks', () => {
        for (const subject of ['math', 'viet']) {
            for (const file of expectedFiles[subject]) {
                expect(banks[subject].some(({ sourceRef }) => sourceRef.includes(file))).toBe(true);
            }
        }
    });
});
