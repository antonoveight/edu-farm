import path from 'path';
import { describe, expect, test } from 'vitest';
import {
    RequestValidationError,
    parseGrade,
    parseSubject,
    parseWorld
} from '../src/lib/request-validation.js';
import { resolvePathWithinBase } from '../src/lib/path-containment-policy.js';

describe('parseGrade', () => {
    test.each([
        ['1', 1],
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        [1, 1],
        [5, 5]
    ])('returns an integer for valid grade %j', (input, expected) => {
        expect(parseGrade(input)).toBe(expected);
    });

    test.each([
        undefined,
        null,
        '',
        '0',
        '6',
        '01',
        '1.0',
        ' 1 ',
        0,
        6,
        1.5,
        true,
        [],
        {}
    ])('rejects invalid grade %j', (input) => {
        expect(() => parseGrade(input)).toThrow(RequestValidationError);
    });
});

describe('parseSubject', () => {
    test.each(['vietnamese', 'science', 'tech'])(
        'accepts canonical subject %s',
        (subject) => {
            expect(parseSubject(subject)).toBe(subject);
        }
    );

    test.each([
        undefined,
        null,
        '',
        'viet',
        'SCIENCE',
        '../science',
        '..%2fscience',
        '%2e%2e%2fscience',
        'science/other',
        'science\\other',
        'science.pdf',
        1,
        {}
    ])('rejects non-canonical subject %j', (input) => {
        expect(() => parseSubject(input)).toThrow(RequestValidationError);
    });
});

describe('parseWorld', () => {
    test.each(['eco', 'cyber', 'magic'])('accepts canonical world %s', (world) => {
        expect(parseWorld(world)).toBe(world);
    });

    test.each([
        undefined,
        null,
        '',
        'Eco',
        'space',
        '../eco',
        'eco/cyber',
        1,
        []
    ])('rejects invalid world %j', (input) => {
        expect(() => parseWorld(input)).toThrow(RequestValidationError);
    });
});

describe('resolvePathWithinBase', () => {
    const basePath = path.resolve('/tmp/edu-farm/textbooks/grade1');

    test('resolves a child path beneath the grade base', () => {
        expect(resolvePathWithinBase(basePath, 'science.pdf')).toBe(
            path.join(basePath, 'science.pdf')
        );
    });

    test.each([
        '../grade2/science.pdf',
        '../../outside.pdf',
        '/tmp/outside.pdf'
    ])('rejects path escape %s', (candidate) => {
        expect(() => resolvePathWithinBase(basePath, candidate)).toThrow(
            RequestValidationError
        );
    });
});
