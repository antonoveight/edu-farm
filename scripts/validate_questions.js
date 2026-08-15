const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'src', 'data');
let totalQ = 0;
let errors = [];
let warnings = [];

const VALID_TYPES = [
    'multiple_choice', 'fill_blank', 'typing', 'shortcut', 'reorder',
    'matching', 'true_false', 'find_error', 'categorize'
];

function checkJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        if (!Array.isArray(data)) {
            errors.push({ file: filePath, err: 'Root element must be an array' });
            return;
        }

        data.forEach((item, idx) => {
            totalQ++;
            const { q, a, c, type, lo, pairs, words, sentence } = item;

            // ─── Required fields ───────────────────────────────────────────
            if (!q) {
                errors.push({ file: filePath, idx, err: 'Missing q (question text)' });
                return;
            }
            if (!a) {
                errors.push({ file: filePath, idx, err: 'Missing a (answer)' });
                return;
            }

            // ─── Learning Objective ─────────────────────────────────────────
            if (!lo) {
                warnings.push({ file: filePath, idx, warn: 'Missing lo (Learning Objective)', q });
            }

            // ─── Type validation ────────────────────────────────────────────
            if (type && !VALID_TYPES.includes(type)) {
                errors.push({ file: filePath, idx, err: `Unknown type: "${type}". Valid: ${VALID_TYPES.join(', ')}`, q });
            }

            // ─── choices array ──────────────────────────────────────────────
            if (c && !Array.isArray(c)) {
                errors.push({ file: filePath, idx, err: 'c (choices) must be an array if provided', q });
                return;
            }

            // ─── matching questions ─────────────────────────────────────────
            if (type === 'matching') {
                if (!pairs || !Array.isArray(pairs)) {
                    errors.push({ file: filePath, idx, err: 'matching type requires "pairs" array', q });
                } else {
                    pairs.forEach((p, pi) => {
                        if (!p.left || !p.right) {
                            errors.push({ file: filePath, idx, err: `pairs[${pi}] must have "left" and "right" properties`, q });
                        }
                    });
                }
            }

            // ─── reorder questions ──────────────────────────────────────────
            if (type === 'reorder') {
                if (!words || !Array.isArray(words) || words.length === 0) {
                    // words may be auto-generated from a, just warn
                    warnings.push({ file: filePath, idx, warn: 'reorder type has no "words" array – will auto-split from answer', q });
                }
            }

            // ─── fill_blank questions ───────────────────────────────────────
            if (type === 'fill_blank') {
                if (!sentence) {
                    warnings.push({ file: filePath, idx, warn: 'fill_blank type has no "sentence" field – fallback to q', q });
                } else if (!sentence.includes('___')) {
                    errors.push({ file: filePath, idx, err: 'fill_blank "sentence" must contain "___" placeholder', q, sentence });
                }
            }

            // ─── multiple_choice: answer must be in choices ─────────────────
            if (type === 'multiple_choice' || (c && c.length > 1 && type !== 'matching')) {
                if (c && c.length > 0 && !c.includes(a)) {
                    errors.push({ file: filePath, idx, err: 'Answer not found in choices array', q, a, c });
                }
            }

            // ─── Duplicate choices ──────────────────────────────────────────
            if (c && type !== 'matching') {
                const uniqueC = new Set(c);
                if (uniqueC.size !== c.length) {
                    errors.push({ file: filePath, idx, err: 'Duplicate choices detected', q });
                }
            }
        });
    } catch(e) {
        errors.push({ file: filePath, err: 'Failed to parse JSON: ' + e.message });
    }
}

for (let i = 1; i <= 5; i++) {
    const gradeDir = path.join(dataDir, 'grade' + i);
    if (fs.existsSync(gradeDir)) {
        const files = fs.readdirSync(gradeDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                checkJSON(path.join(gradeDir, file));
            }
        }
    }
}

console.log('Total JSON Questions Analyzed:', totalQ);

if (warnings.length > 0) {
    console.warn('\nWarnings (' + warnings.length + '):');
    warnings.forEach(w => console.warn(`  [${path.basename(path.dirname(w.file))}/${path.basename(w.file)}] idx:${w.idx} – ${w.warn}`));
}

if (errors.length > 0) {
    console.error('\nValidation FAILED with', errors.length, 'errors:');
    errors.forEach(e => console.error(`  [${path.basename(path.dirname(e.file))}/${path.basename(e.file)}] idx:${e.idx} – ${e.err}`));
    process.exit(1);
} else {
    console.log('\nValidation PASSED! All questions are correctly formatted.');
}
