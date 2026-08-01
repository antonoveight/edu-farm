const fs = require('fs');
const path = require('path');

const ROOT = path.join('textbooks', 'game_knowledge_jsonl');

function cleanSentence(text) {
    if (!text) return '';
    // Normalize spaces
    let cleaned = text.replace(/\s+/g, ' ').trim();
    // Remove leading/trailing non-alphanumeric noise
    cleaned = cleaned.replace(/^[^a-zA-Z0-9À-ỹ\"\'\(]+/g, '');
    cleaned = cleaned.replace(/[^a-zA-Z0-9À-ỹ\.\,\!\?\"\'\)]+$/g, '');
    return cleaned.trim();
}

function isClean(text) {
    if (text.length < 15 || text.length > 150) return false;
    // Check if it contains too many OCR symbols
    const badSymbols = /[\@\#\$\%\^\&\*\\\/\_\|\[\]\{\}\<\>\~`·•¤øÿƒ®¬±÷×+=]/;
    if (badSymbols.test(text)) return false;
    // Check ratio of alphabetic characters (including accented Vietnamese)
    const letterCount = (text.match(/[a-zA-ZÀ-ỹ]/g) || []).length;
    if (letterCount / text.length < 0.7) return false;
    // Check if it has a sensible number of words
    const words = text.split(' ');
    if (words.length < 4 || words.length > 25) return false;
    return true;
}

const subjectsMapping = {
    // Tech: Math, Computer Science, Technology
    'toan': 'tech',
    'tin-hoc': 'tech',
    'tinhoc': 'tech',
    'cong-nghe': 'tech',
    'congnghe': 'tech',
    'tech': 'tech',
    // Science: Natural & Social, Science, Ethics/Moral, History/Geography
    'tunhienvaxahoi': 'science',
    'tu-nhien-va-xa-hoi': 'science',
    'science': 'science',
    'khoahoc': 'science',
    'khoa-hoc': 'science',
    'daoduc': 'science',
    'dao-duc': 'science',
    'lichsu': 'science',
    'lich-su': 'science',
    'dia-li': 'science',
    'dia-ly': 'science',
    // Vietnamese & Art/Music
    'tiengviet': 'vietnamese',
    'tieng-viet': 'vietnamese',
    'viet': 'vietnamese',
    'vietnamese': 'vietnamese',
    'am-nhac': 'vietnamese',
    'amnhac': 'vietnamese',
    'mithuat': 'vietnamese',
    'mi-thuat': 'vietnamese'
};

const extractedData = {
    grade1: { science: [], tech: [], vietnamese: [] },
    grade2: { science: [], tech: [], vietnamese: [] },
    grade3: { science: [], tech: [], vietnamese: [] },
    grade4: { science: [], tech: [], vietnamese: [] },
    grade5: { science: [], tech: [], vietnamese: [] }
};

for (let g = 1; g <= 5; g++) {
    const gradeKey = 'grade' + g;
    const gradeDir = path.join(ROOT, gradeKey);
    if (!fs.existsSync(gradeDir)) continue;

    const files = fs.readdirSync(gradeDir).filter(f => f.endsWith('.jsonl'));
    files.forEach(fileName => {
        const filePath = path.join(gradeDir, fileName);
        const nameLower = fileName.toLowerCase();

        // Determine subject
        let sub = 'science'; // default fallback
        for (const [pattern, targetSub] of Object.entries(subjectsMapping)) {
            if (nameLower.includes(pattern)) {
                sub = targetSub;
                break;
            }
        }

        const lines = fs.readFileSync(filePath, 'utf8').split('\n');
        lines.forEach(line => {
            if (!line.trim()) return;
            try {
                const obj = JSON.parse(line);
                
                // Collect candidates
                const candidates = [];
                if (obj.quiz_or_fill_blank_candidates) {
                    obj.quiz_or_fill_blank_candidates.forEach(c => candidates.push(c));
                }
                if (obj.raw_knowledge) {
                    obj.raw_knowledge.forEach(k => candidates.push(k));
                }

                candidates.forEach(c => {
                    const cleaned = cleanSentence(c);
                    if (isClean(cleaned)) {
                        // Check if duplicate
                        if (!extractedData[gradeKey][sub].includes(cleaned)) {
                            extractedData[gradeKey][sub].push(cleaned);
                        }
                    }
                });
            } catch (e) {
                // ignore invalid lines
            }
        });
    });
}

// Print counts
for (let g = 1; g <= 5; g++) {
    const gk = 'grade' + g;
    console.log('Grade ' + g + ':');
    console.log('  Science:', extractedData[gk].science.length, 'candidates');
    console.log('  Tech:', extractedData[gk].tech.length, 'candidates');
    console.log('  Vietnamese:', extractedData[gk].vietnamese.length, 'candidates');
}

fs.writeFileSync('scratch/extracted_candidates.json', JSON.stringify(extractedData, null, 2), 'utf8');
console.log('Extracted candidates saved to scratch/extracted_candidates.json');
