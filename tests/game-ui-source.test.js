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
    test('renders true/false as its own exercise branch before reorder', () => {
        const branches = gameScript.match(/else if \(qType === 'true_false'\)/g) || [];
        const trueFalseIndex = gameScript.indexOf("else if (qType === 'true_false')");
        const reorderIndex = gameScript.indexOf("else if (qType === 'reorder')");

        expect(branches).toHaveLength(1);
        expect(trueFalseIndex).toBeGreaterThan(-1);
        expect(trueFalseIndex).toBeLessThan(reorderIndex);
    });

    test('offers exactly the two expected true/false answers', () => {
        const start = gameScript.indexOf("else if (qType === 'true_false')");
        const end = gameScript.indexOf("else if (qType === 'find_error')", start);
        const branch = gameScript.slice(start, end);

        expect(branch.match(/class=\"tf-btn/g)).toHaveLength(2);
        expect(branch).toContain("submitCurrentAnswer('Đúng', this)");
        expect(branch).toContain("submitCurrentAnswer('Sai', this)");
        expect(branch).not.toContain('options.forEach');
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
