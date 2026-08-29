const VALID_GRADES = new Set([1, 2, 3, 4, 5]);
const VALID_SUBJECTS = new Set(['vietnamese', 'science', 'tech']);
const VALID_WORLDS = new Set(['eco', 'cyber', 'magic']);

export const CANONICAL_SUBJECTS = Object.freeze([...VALID_SUBJECTS]);

export class RequestValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestValidationError';
    }
}

export function parseGrade(value) {
    const grade = typeof value === 'string' && /^[1-5]$/.test(value)
        ? Number(value)
        : value;

    if (!Number.isInteger(grade) || !VALID_GRADES.has(grade)) {
        throw new RequestValidationError('Grade must be 1, 2, 3, 4 or 5');
    }

    return grade;
}

export function parseSubject(value) {
    if (typeof value !== 'string' || !VALID_SUBJECTS.has(value)) {
        throw new RequestValidationError(
            'Subject must be vietnamese, science or tech'
        );
    }

    return value;
}

export function parseWorld(value) {
    if (typeof value !== 'string' || !VALID_WORLDS.has(value)) {
        throw new RequestValidationError('World must be eco, cyber or magic');
    }

    return value;
}
