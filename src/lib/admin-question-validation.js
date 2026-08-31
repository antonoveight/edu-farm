const SUBJECTS = new Set([
    'math', 'viet', 'english', 'science', 'tech', 'ethics', 'experience',
    'music', 'art', 'physical', 'history_geo'
]);
const QUESTION_TYPES = new Set([
    'multiple_choice',
    'fill_blank',
    'reorder',
    'typing',
    'matching',
    'true_false',
    'find_error',
    'categorize',
    'shortcut'
]);
const STATUSES = new Set(['draft', 'published', 'archived']);
const DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const SOURCE_TYPES = new Set(['manual', 'book', 'import', 'legacy_json']);

export class QuestionValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QuestionValidationError';
    }
}

function requiredText(value, label, maxLength) {
    if (typeof value !== 'string' || !value.trim()) {
        throw new QuestionValidationError(`${label} không được để trống`);
    }
    const normalized = value.trim();
    if (normalized.length > maxLength) {
        throw new QuestionValidationError(`${label} không được vượt quá ${maxLength} ký tự`);
    }
    return normalized;
}

function optionalText(value, label, maxLength) {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value !== 'string') {
        throw new QuestionValidationError(`${label} không hợp lệ`);
    }
    const normalized = value.trim();
    if (normalized.length > maxLength) {
        throw new QuestionValidationError(`${label} không được vượt quá ${maxLength} ký tự`);
    }
    return normalized || null;
}

function enumValue(value, allowed, label) {
    if (typeof value !== 'string' || !allowed.has(value)) {
        throw new QuestionValidationError(`${label} không hợp lệ`);
    }
    return value;
}

export function parseQuestionInput(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        throw new QuestionValidationError('Dữ liệu câu hỏi không hợp lệ');
    }

    const grade = Number(input.grade);
    if (!Number.isInteger(grade) || grade < 1 || grade > 5) {
        throw new QuestionValidationError('Khối lớp phải từ 1 đến 5');
    }
    const subject = enumValue(input.subject, SUBJECTS, 'Môn học');
    const questionType = enumValue(
        input.questionType || 'multiple_choice', QUESTION_TYPES, 'Loại câu hỏi'
    );
    const questionText = requiredText(input.questionText, 'Nội dung câu hỏi', 2000);
    const correctAnswer = requiredText(input.correctAnswer, 'Đáp án đúng', 1000);
    if (!Array.isArray(input.choices)) {
        throw new QuestionValidationError('Danh sách lựa chọn không hợp lệ');
    }
    if (input.choices.length > 20) {
        throw new QuestionValidationError('Một câu hỏi có tối đa 20 lựa chọn');
    }
    const choices = [...new Set(input.choices.map((choice) =>
        requiredText(choice, 'Lựa chọn', 500)
    ))];
    if (['multiple_choice', 'true_false'].includes(questionType)) {
        if (choices.length < 2) {
            throw new QuestionValidationError('Câu trắc nghiệm cần ít nhất 2 lựa chọn');
        }
        if (!choices.includes(correctAnswer)) {
            throw new QuestionValidationError('Đáp án đúng phải nằm trong danh sách lựa chọn');
        }
    }

    let sourcePage = null;
    if (input.sourcePage !== undefined && input.sourcePage !== null && input.sourcePage !== '') {
        sourcePage = Number(input.sourcePage);
        if (!Number.isInteger(sourcePage) || sourcePage < 1 || sourcePage > 10000) {
            throw new QuestionValidationError('Trang nguồn không hợp lệ');
        }
    }

    return {
        grade,
        subject,
        questionText,
        correctAnswer,
        choices,
        questionType,
        learningObjective: optionalText(
            input.learningObjective, 'Mục tiêu học tập', 1000
        ),
        difficulty: enumValue(input.difficulty || 'medium', DIFFICULTIES, 'Độ khó'),
        status: enumValue(input.status || 'draft', STATUSES, 'Trạng thái'),
        sourceType: enumValue(input.sourceType || 'manual', SOURCE_TYPES, 'Loại nguồn'),
        sourceRef: optionalText(input.sourceRef, 'Nguồn tham chiếu', 1000),
        sourcePage
    };
}

export function parseQuestionFilters(searchParams) {
    const gradeValue = searchParams.get('grade');
    const grade = gradeValue ? Number(gradeValue) : null;
    if (gradeValue && (!Number.isInteger(grade) || grade < 1 || grade > 5)) {
        throw new QuestionValidationError('Khối lớp không hợp lệ');
    }
    const subject = searchParams.get('subject') || null;
    if (subject && !SUBJECTS.has(subject)) {
        throw new QuestionValidationError('Môn học không hợp lệ');
    }
    const status = searchParams.get('status') || null;
    if (status && !STATUSES.has(status)) {
        throw new QuestionValidationError('Trạng thái không hợp lệ');
    }
    const questionType = searchParams.get('type') || null;
    if (questionType && !QUESTION_TYPES.has(questionType)) {
        throw new QuestionValidationError('Loại câu hỏi không hợp lệ');
    }
    const search = (searchParams.get('search') || '').trim().slice(0, 200);
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 20);
    if (!Number.isInteger(page) || page < 1) {
        throw new QuestionValidationError('Trang không hợp lệ');
    }
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
        throw new QuestionValidationError('Số bản ghi mỗi trang phải từ 1 đến 100');
    }

    return { grade, subject, status, questionType, search, page, pageSize };
}

export function parseQuestionId(value) {
    const id = Number(value);
    if (!Number.isInteger(id) || id < 1) {
        throw new QuestionValidationError('Mã câu hỏi không hợp lệ');
    }
    return id;
}
