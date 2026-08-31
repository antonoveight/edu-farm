import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import questionStore from '../src/lib/question-store.cjs';

describe('question store', () => {
    beforeEach(() => {
        vi.stubEnv('QUESTION_DB_PATH', ':memory:');
        questionStore.closeDatabaseForTests();
    });

    afterEach(() => {
        questionStore.closeDatabaseForTests();
        vi.unstubAllEnvs();
    });

    test('seeds all legacy questions exactly once', () => {
        const first = questionStore.getMetadataSnapshot();
        const sync = questionStore.syncLegacyQuestions();
        const second = questionStore.getMetadataSnapshot();

        expect(first.stats).toMatchObject({ published: first.stats.total, draft: 0, archived: 0 });
        expect(sync).toMatchObject({ discovered: first.stats.total, inserted: 0, updated: 0 });
        expect(second.stats.total).toBe(first.stats.total);
    });

    test('creates, edits, filters and soft-deletes a question', () => {
        const initialMathTotal = questionStore.listQuestions({ subject: 'math' }).pagination.total;
        const initialTotal = questionStore.getMetadataSnapshot().stats.total;
        const created = questionStore.createQuestion({
            grade: 1,
            subject: 'math',
            questionText: 'Hai cộng ba bằng mấy?',
            correctAnswer: '5',
            choices: ['4', '5', '6'],
            questionType: 'multiple_choice',
            learningObjective: 'Cộng trong phạm vi 10',
            difficulty: 'easy',
            status: 'draft',
            sourceType: 'manual',
            sourceRef: null,
            sourcePage: null
        });
        expect(created.subject).toBe('math');
        expect(questionStore.listQuestions({ subject: 'math' }).pagination.total).toBe(initialMathTotal + 1);

        const updated = questionStore.updateQuestion(created.id, {
            ...created,
            status: 'published',
            questionText: '2 + 3 = ?'
        });
        expect(updated.status).toBe('published');
        expect(questionStore.getPublicQuestionBank(1).math).toHaveLength(401);

        expect(questionStore.deleteQuestion(created.id)).toBe(true);
        expect(questionStore.getQuestion(created.id)).toBeNull();
        expect(questionStore.getMetadataSnapshot().stats.total).toBe(initialTotal);
    });

    test('rejects duplicate question content in the same grade and subject', () => {
        const question = {
            grade: 1,
            subject: 'math',
            questionText: '1 + 1 = ?',
            correctAnswer: '2',
            choices: ['1', '2'],
            questionType: 'multiple_choice',
            learningObjective: null,
            difficulty: 'easy',
            status: 'draft',
            sourceType: 'manual',
            sourceRef: null,
            sourcePage: null
        };

        questionStore.createQuestion(question);
        expect(() => questionStore.createQuestion(question)).toThrow();
    });

    test('does not overwrite an administrator edit during a legacy sync', () => {
        const original = questionStore.listQuestions({ grade: 1, subject: 'viet' }).items[0];
        const editedText = `${original.questionText} (bản đã duyệt)`;
        const editedChoices = ['Phương án do quản trị viên duyệt', original.correctAnswer];
        questionStore.updateQuestion(original.id, {
            ...original,
            questionText: editedText,
            choices: editedChoices,
            interactionData: { hints: ['Gợi ý do quản trị viên duyệt'] }
        });

        questionStore.syncLegacyQuestions();
        const afterSync = questionStore.getQuestion(original.id);
        expect(afterSync.questionText).toBe(editedText);
        expect(afterSync.choices).toEqual(editedChoices);
        expect(afterSync.interactionData.hints).toEqual(['Gợi ý do quản trị viên duyệt']);
    });
});
