import { describe, expect, test } from 'vitest';
import {
    parseQuestionFilters,
    parseQuestionId,
    parseQuestionInput
} from '../src/lib/admin-question-validation.js';

const validQuestion = {
    grade: 1,
    subject: 'math',
    questionText: '1 + 2 = ?',
    correctAnswer: '3',
    choices: ['2', '3', '4'],
    questionType: 'multiple_choice',
    difficulty: 'easy',
    status: 'draft',
    sourceType: 'manual'
};

describe('admin question validation', () => {
    test('normalizes a valid question', () => {
        expect(parseQuestionInput(validQuestion)).toMatchObject({
            grade: 1,
            subject: 'math',
            correctAnswer: '3'
        });
    });

    test.each([
        [{ ...validQuestion, grade: 6 }, 'Khối lớp'],
        [{ ...validQuestion, subject: '../math' }, 'Môn học'],
        [{ ...validQuestion, choices: ['1', '2'] }, 'Đáp án đúng'],
        [{ ...validQuestion, questionText: '' }, 'Nội dung']
    ])('rejects invalid question input', (input, message) => {
        expect(() => parseQuestionInput(input)).toThrow(message);
    });

    test('validates list filters and identifiers', () => {
        const params = new URLSearchParams('grade=2&subject=math&status=draft&page=3&pageSize=50');
        expect(parseQuestionFilters(params)).toMatchObject({
            grade: 2, subject: 'math', status: 'draft', page: 3, pageSize: 50
        });
        expect(parseQuestionId('42')).toBe(42);
        expect(() => parseQuestionId('../42')).toThrow('Mã câu hỏi');
    });
});
