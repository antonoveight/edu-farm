import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const projectRoot = path.resolve(import.meta.dirname, '..');
const gameScript = fs.readFileSync(
    path.join(projectRoot, 'public/game/js/main.js'),
    'utf8'
);
const gameHtml = fs.readFileSync(
    path.join(projectRoot, 'public/game/index.html'),
    'utf8'
);
const gameCss = fs.readFileSync(
    path.join(projectRoot, 'public/game/css/style.css'),
    'utf8'
);

describe('game exercise rendering', () => {
    test('loads and prefers the curated mathematics bank from the API', () => {
        expect(gameScript).toContain('QUIZ_BANK[`g${selectedGrade}_math`] = data.math || []');
        expect(gameScript).toContain('const bankKey = `g${grade}_math`');
        expect(gameScript).toContain('candidate = pickQuizQuestion(bankKey)');
    });

    test('loads English and includes it in maps, random play and treasure rounds', () => {
        expect(gameScript).toContain('QUIZ_BANK[`g${selectedGrade}_english`] = data.english || []');
        expect(gameScript).toContain('{ id: 4, type: "english", icon: "fa-language", name: "Tiếng Anh" }');
        expect(gameScript).toContain("const subjects = ['math', 'viet', 'english', 'science', 'tech']");
        expect(gameScript).toContain("shuffleArray(['math', 'viet', 'english', 'science', 'tech'])");
    });

    test('uses explanations and hints carried by the textbook bank', () => {
        expect(gameScript).toContain('candidate.explanation ||');
        expect(gameScript).toContain('Array.isArray(candidate.hints)');
    });

    test('keeps Grade 1 treasure rounds inside the Grade 1 curriculum', () => {
        expect(gameScript).toContain("activeTask.type === 'treasure' && baseGrade > 1");
        expect(gameScript).toContain('Khi thấy dây điện bị hở, em cần làm gì?');
        expect(gameScript).not.toContain('Cây xanh cần gì nhất để quang hợp?');
    });

    test('only changes repeated mathematics choices to numeric input for numeric answers', () => {
        expect(gameScript).toContain("normSubject === 'math' && Number.isFinite(Number(ans))");
    });

    test('renders true/false as one top-level exercise branch', () => {
        const branches = gameScript.match(/else if \(qType === 'true_false'\)/g) || [];
        const trueFalseIndex = gameScript.indexOf("else if (qType === 'true_false')");
        const reorderStateStart = gameScript.indexOf('function renderReorderState()');
        const reorderStateEnd = gameScript.indexOf("else if (qType === 'matching')", reorderStateStart);
        const reorderState = gameScript.slice(reorderStateStart, reorderStateEnd);

        expect(branches).toHaveLength(1);
        expect(trueFalseIndex).toBeGreaterThan(-1);
        expect(reorderState).not.toContain("qType === 'true_false'");
    });

    test('offers exactly the two expected true/false answers', () => {
        const start = gameScript.indexOf("else if (qType === 'true_false')");
        const end = gameScript.indexOf("else if (qType === 'find_error')", start);
        const branch = gameScript.slice(start, end);

        expect(branch.match(/class=\"tf-btn/g)).toHaveLength(2);
        expect(branch).toContain("submitCurrentAnswer(\\'\\u0110úng\\', this)");
        expect(branch).toContain("submitCurrentAnswer(\\'Sai\\', this)");
        expect(branch).not.toContain('options.forEach');
    });

    test('does not expose dummy placeholder answers', () => {
        expect(gameScript).not.toContain('"Lựa chọn " +');
        expect(gameScript).toContain('Number.isFinite(numericBase)');
    });

    test('routes treasure answers through the multi-question handler', () => {
        const start = gameScript.indexOf('function submitCurrentAnswer');
        const end = gameScript.indexOf('window.submitCurrentAnswer', start);

        expect(gameScript.slice(start, end)).toContain('activeTask.type === "treasure"');
    });
});

describe('currency icon', () => {
    test('uses a local CSS coin instead of an external icon font glyph', () => {
        expect(gameHtml).toContain('class="currency-coin-icon"');
        expect(gameHtml).not.toContain('class="fa-solid fa-coins"');
        expect(gameCss).toContain('.currency-coin-icon');
        expect(gameCss).toContain('background: linear-gradient(145deg, #fde047, #f59e0b)');
    });
});
