const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const SUBJECTS = Object.freeze([
    { code: 'math', name: 'Toán', sortOrder: 1 },
    { code: 'viet', name: 'Tiếng Việt', sortOrder: 2 },
    { code: 'english', name: 'Tiếng Anh', sortOrder: 3 },
    { code: 'science', name: 'Tự nhiên và Xã hội', sortOrder: 4 },
    { code: 'tech', name: 'Tin học', sortOrder: 5 },
    { code: 'ethics', name: 'Đạo đức', sortOrder: 6 },
    { code: 'experience', name: 'Hoạt động trải nghiệm', sortOrder: 7 },
    { code: 'music', name: 'Âm nhạc', sortOrder: 8 },
    { code: 'art', name: 'Mĩ thuật', sortOrder: 9 },
    { code: 'physical', name: 'Giáo dục thể chất', sortOrder: 10 },
    { code: 'history_geo', name: 'Lịch sử và Địa lí', sortOrder: 11 }
]);
const PUBLIC_SUBJECT_CODES = Object.freeze(SUBJECTS.map(({ code }) => code));
const LEGACY_SUBJECT_CODES = Object.freeze(PUBLIC_SUBJECT_CODES);
const GLOBAL_STATE_KEY = Symbol.for('toanvui.question-store');

function resolveDatabasePath() {
    const configuredPath = process.env.QUESTION_DB_PATH?.trim();
    if (configuredPath === ':memory:') return configuredPath;
    if (configuredPath) {
        if (!path.isAbsolute(configuredPath)) {
            throw new Error('QUESTION_DB_PATH must be an absolute path or :memory:');
        }
        return configuredPath;
    }

    return path.join(process.cwd(), 'storage', 'questions.sqlite');
}

function resolveSeedDirectory() {
    const configuredPath = process.env.QUESTION_SEED_DATA_DIR?.trim();
    if (configuredPath) {
        if (!path.isAbsolute(configuredPath)) {
            throw new Error('QUESTION_SEED_DATA_DIR must be an absolute path');
        }
        return configuredPath;
    }
    return path.join(process.cwd(), 'src', 'data');
}

function now() {
    return new Date().toISOString();
}

function normalizeForHash(value) {
    return String(value ?? '')
        .normalize('NFC')
        .trim()
        .replace(/\s+/g, ' ')
        .toLocaleLowerCase('vi');
}

function buildContentHash(question) {
    const content = [
        question.grade,
        question.subject,
        normalizeForHash(question.questionText),
        normalizeForHash(question.correctAnswer),
        question.questionType
    ].join('|');

    return crypto.createHash('sha256').update(content).digest('hex');
}

function initializeSchema(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS app_metadata (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS grades (
            id INTEGER PRIMARY KEY CHECK (id BETWEEN 1 AND 5),
            name TEXT NOT NULL,
            sort_order INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            sort_order INTEGER NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
        );

        CREATE TABLE IF NOT EXISTS seed_question_state (
            source_key TEXT PRIMARY KEY,
            content_hash TEXT NOT NULL,
            synced_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            grade_id INTEGER NOT NULL REFERENCES grades(id),
            subject_id INTEGER NOT NULL REFERENCES subjects(id),
            question_text TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            choices_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(choices_json)),
            question_type TEXT NOT NULL DEFAULT 'multiple_choice',
            learning_objective TEXT,
            difficulty TEXT NOT NULL DEFAULT 'medium'
                CHECK (difficulty IN ('easy', 'medium', 'hard')),
            status TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'published', 'archived')),
            source_type TEXT NOT NULL DEFAULT 'manual',
            source_ref TEXT,
            source_page INTEGER,
            payload_json TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(payload_json)),
            source_key TEXT UNIQUE,
            content_hash TEXT NOT NULL UNIQUE,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            deleted_at TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_questions_grade_subject_status
            ON questions (grade_id, subject_id, status, deleted_at);
        CREATE INDEX IF NOT EXISTS idx_questions_updated_at
            ON questions (updated_at DESC);
        CREATE INDEX IF NOT EXISTS idx_questions_type
            ON questions (question_type);
    `);

    const questionColumns = new Set(
        db.prepare('PRAGMA table_info(questions)').all().map(({ name }) => name)
    );
    if (!questionColumns.has('payload_json')) {
        db.exec("ALTER TABLE questions ADD COLUMN payload_json TEXT NOT NULL DEFAULT '{}'");
    }

    const upsertGrade = db.prepare(`
        INSERT INTO grades (id, name, sort_order)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET name = excluded.name, sort_order = excluded.sort_order
    `);
    const upsertSubject = db.prepare(`
        INSERT INTO subjects (code, name, sort_order, is_active)
        VALUES (?, ?, ?, 1)
        ON CONFLICT(code) DO UPDATE SET
            name = excluded.name,
            sort_order = excluded.sort_order,
            is_active = 1
    `);

    const seedReferences = db.transaction(() => {
        for (let grade = 1; grade <= 5; grade += 1) {
            upsertGrade.run(grade, `Lớp ${grade}`, grade);
        }
        for (const subject of SUBJECTS) {
            upsertSubject.run(subject.code, subject.name, subject.sortOrder);
        }
    });
    seedReferences();
}

function getMetadata(db, key) {
    return db.prepare('SELECT value FROM app_metadata WHERE key = ?').get(key)?.value;
}

function setMetadata(db, key, value) {
    db.prepare(`
        INSERT INTO app_metadata (key, value, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `).run(key, String(value), now());
}

function buildSeedFingerprint() {
    const dataDirectory = resolveSeedDirectory();
    const hash = crypto.createHash('sha256');
    for (let grade = 1; grade <= 5; grade += 1) {
        for (const subject of LEGACY_SUBJECT_CODES) {
            const relativePath = path.join(`grade${grade}`, `${subject}.json`);
            const filePath = path.join(dataDirectory, relativePath);
            hash.update(relativePath);
            if (fs.existsSync(filePath)) hash.update(fs.readFileSync(filePath));
        }
    }
    return hash.digest('hex');
}

function buildQuestionPayload(item) {
    const payload = {};
    for (const key of ['sentence', 'words', 'pairs', 'explanation', 'hints']) {
        if (item[key] !== undefined) payload[key] = item[key];
    }
    return payload;
}

function buildSeedStateHash(question) {
    const managedState = {
        gradeId: Number(question.gradeId),
        subjectId: Number(question.subjectId),
        questionText: String(question.questionText),
        correctAnswer: String(question.correctAnswer),
        choicesJson: JSON.stringify(JSON.parse(question.choicesJson || '[]')),
        questionType: String(question.questionType),
        learningObjective: question.learningObjective || null,
        difficulty: String(question.difficulty),
        status: String(question.status),
        sourceType: String(question.sourceType),
        sourceRef: question.sourceRef || null,
        sourcePage: question.sourcePage || null,
        payloadJson: JSON.stringify(JSON.parse(question.payloadJson || '{}'))
    };
    return crypto.createHash('sha256').update(JSON.stringify(managedState)).digest('hex');
}

function syncLegacyQuestionsInternal(db) {
    const dataDirectory = resolveSeedDirectory();
    const subjectIds = Object.fromEntries(
        db.prepare('SELECT id, code FROM subjects').all().map((row) => [row.code, row.id])
    );
    const insertQuestion = db.prepare(`
        INSERT INTO questions (
            grade_id, subject_id, question_text, correct_answer, choices_json,
            question_type, learning_objective, difficulty, status, source_type,
            source_ref, source_page, payload_json, source_key, content_hash, created_at, updated_at
        ) VALUES (
            @gradeId, @subjectId, @questionText, @correctAnswer, @choicesJson,
            @questionType, @learningObjective, @difficulty, @status, @sourceType,
            @sourceRef, @sourcePage, @payloadJson, @sourceKey, @contentHash, @timestamp, @timestamp
        )
    `);
    const selectSeedQuestion = db.prepare(`
        SELECT
            id,
            grade_id AS gradeId,
            subject_id AS subjectId,
            question_text AS questionText,
            correct_answer AS correctAnswer,
            choices_json AS choicesJson,
            question_type AS questionType,
            learning_objective AS learningObjective,
            difficulty,
            status,
            source_type AS sourceType,
            source_ref AS sourceRef,
            source_page AS sourcePage,
            payload_json AS payloadJson,
            content_hash AS contentHash,
            updated_at AS updatedAt
        FROM questions
        WHERE source_key = ? AND deleted_at IS NULL
    `);
    const updateSeedQuestion = db.prepare(`
        UPDATE questions SET
            grade_id = @gradeId,
            subject_id = @subjectId,
            question_text = @questionText,
            correct_answer = @correctAnswer,
            choices_json = @choicesJson,
            question_type = @questionType,
            learning_objective = @learningObjective,
            difficulty = @difficulty,
            status = @status,
            source_type = @sourceType,
            source_ref = @sourceRef,
            source_page = @sourcePage,
            payload_json = @payloadJson,
            content_hash = @contentHash,
            updated_at = @timestamp
        WHERE id = @id
    `);
    const selectSeedState = db.prepare(
        'SELECT content_hash FROM seed_question_state WHERE source_key = ?'
    );
    const upsertSeedState = db.prepare(`
        INSERT INTO seed_question_state (source_key, content_hash, synced_at)
        VALUES (?, ?, ?)
        ON CONFLICT(source_key) DO UPDATE SET
            content_hash = excluded.content_hash,
            synced_at = excluded.synced_at
    `);
    let legacySeedSyncedAt = null;
    try {
        legacySeedSyncedAt = JSON.parse(getMetadata(db, 'legacy_seed_v1') || '{}').syncedAt || null;
    } catch {
        legacySeedSyncedAt = null;
    }

    const result = { discovered: 0, inserted: 0, updated: 0, skipped: 0 };
    const sync = db.transaction(() => {
        for (let grade = 1; grade <= 5; grade += 1) {
            for (const subject of LEGACY_SUBJECT_CODES) {
                const relativePath = path.join(`grade${grade}`, `${subject}.json`);
                const filePath = path.join(dataDirectory, relativePath);
                if (!fs.existsSync(filePath)) continue;

                const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                questions.forEach((item, index) => {
                    result.discovered += 1;
                    const sourceKey = item.sourceKey || `legacy:${grade}:${subject}:${index}`;
                    const normalized = {
                        grade,
                        subject,
                        questionText: String(item.q || '').trim(),
                        correctAnswer: String(item.a || '').trim(),
                        questionType: String(item.type || 'multiple_choice').trim()
                    };
                    const contentHash = buildContentHash(normalized);

                    const values = {
                        gradeId: grade,
                        subjectId: subjectIds[subject],
                        questionText: normalized.questionText,
                        correctAnswer: normalized.correctAnswer,
                        choicesJson: JSON.stringify(Array.isArray(item.c) ? item.c : []),
                        questionType: normalized.questionType,
                        learningObjective: item.lo ? String(item.lo).trim() : null,
                        difficulty: item.difficulty || 'medium',
                        status: item.status || 'published',
                        sourceType: item.sourceType || 'legacy_json',
                        sourceRef: item.sourceRef || relativePath,
                        sourcePage: item.sourcePage || null,
                        payloadJson: JSON.stringify(buildQuestionPayload(item)),
                        sourceKey,
                        contentHash,
                        timestamp: now()
                    };
                    const existing = selectSeedQuestion.get(sourceKey);
                    const lastSeedHash = selectSeedState.get(sourceKey)?.content_hash;
                    const seedStateHash = buildSeedStateHash(values);
                    const existingStateHash = existing ? buildSeedStateHash(existing) : null;
                    const isUnmodifiedSeed = existing && (
                        existingStateHash === lastSeedHash ||
                        (!lastSeedHash && legacySeedSyncedAt && existing.updatedAt <= legacySeedSyncedAt)
                    );

                    try {
                        if (!existing) {
                            insertQuestion.run(values);
                            result.inserted += 1;
                        } else if (existingStateHash === seedStateHash) {
                            result.skipped += 1;
                        } else if (isUnmodifiedSeed) {
                            updateSeedQuestion.run({ ...values, id: existing.id });
                            result.updated += 1;
                        } else {
                            result.skipped += 1;
                        }
                        upsertSeedState.run(sourceKey, seedStateHash, values.timestamp);
                    } catch (error) {
                        if (error.code?.startsWith('SQLITE_CONSTRAINT')) {
                            result.skipped += 1;
                            return;
                        }
                        throw error;
                    }
                });
            }
        }
        setMetadata(db, 'legacy_seed_hash', buildSeedFingerprint());
        setMetadata(db, 'legacy_seed_last_sync', JSON.stringify({ ...result, syncedAt: now() }));
    });

    sync();
    return result;
}

function openDatabase() {
    const databasePath = resolveDatabasePath();
    if (databasePath !== ':memory:') {
        fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    }

    const db = new Database(databasePath);
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');
    if (databasePath !== ':memory:') {
        db.pragma('journal_mode = WAL');
        db.pragma('synchronous = NORMAL');
    }
    initializeSchema(db);
    if (getMetadata(db, 'legacy_seed_hash') !== buildSeedFingerprint()) {
        syncLegacyQuestionsInternal(db);
    }

    return { db, databasePath };
}

function getDatabase() {
    const expectedPath = resolveDatabasePath();
    const currentState = globalThis[GLOBAL_STATE_KEY];
    if (currentState?.databasePath === expectedPath && currentState.db.open) {
        return currentState.db;
    }
    if (currentState?.db?.open) currentState.db.close();

    const state = openDatabase();
    globalThis[GLOBAL_STATE_KEY] = state;
    return state.db;
}

function parseQuestionRow(row) {
    if (!row) return null;
    return {
        id: row.id,
        grade: row.grade_id,
        subject: row.subject_code,
        subjectName: row.subject_name,
        questionText: row.question_text,
        correctAnswer: row.correct_answer,
        choices: JSON.parse(row.choices_json || '[]'),
        questionType: row.question_type,
        learningObjective: row.learning_objective,
        difficulty: row.difficulty,
        status: row.status,
        sourceType: row.source_type,
        sourceRef: row.source_ref,
        sourcePage: row.source_page,
        interactionData: JSON.parse(row.payload_json || '{}'),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

const SELECT_QUESTION = `
    SELECT q.*, s.code AS subject_code, s.name AS subject_name
    FROM questions q
    JOIN subjects s ON s.id = q.subject_id
`;

function listQuestions(filters = {}) {
    const db = getDatabase();
    const where = ['q.deleted_at IS NULL'];
    const values = {};

    if (filters.grade) {
        where.push('q.grade_id = @grade');
        values.grade = filters.grade;
    }
    if (filters.subject) {
        where.push('s.code = @subject');
        values.subject = filters.subject;
    }
    if (filters.status) {
        where.push('q.status = @status');
        values.status = filters.status;
    }
    if (filters.questionType) {
        where.push('q.question_type = @questionType');
        values.questionType = filters.questionType;
    }
    if (filters.search) {
        where.push(`(
            q.question_text LIKE @search OR
            q.correct_answer LIKE @search OR
            COALESCE(q.learning_objective, '') LIKE @search
        )`);
        values.search = `%${filters.search}%`;
    }

    const page = Math.max(1, Number(filters.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(filters.pageSize) || 20));
    values.limit = pageSize;
    values.offset = (page - 1) * pageSize;
    const whereSql = `WHERE ${where.join(' AND ')}`;
    const rows = db.prepare(`
        ${SELECT_QUESTION}
        ${whereSql}
        ORDER BY q.updated_at DESC, q.id DESC
        LIMIT @limit OFFSET @offset
    `).all(values);
    const total = db.prepare(`
        SELECT COUNT(*) AS total
        FROM questions q
        JOIN subjects s ON s.id = q.subject_id
        ${whereSql}
    `).get(values).total;

    return {
        items: rows.map(parseQuestionRow),
        pagination: {
            page,
            pageSize,
            total,
            totalPages: Math.max(1, Math.ceil(total / pageSize))
        }
    };
}

function getQuestion(id) {
    return parseQuestionRow(
        getDatabase().prepare(`${SELECT_QUESTION} WHERE q.id = ? AND q.deleted_at IS NULL`).get(id)
    );
}

function getSubjectId(db, subject) {
    return db.prepare('SELECT id FROM subjects WHERE code = ? AND is_active = 1').get(subject)?.id;
}

function createQuestion(question) {
    const db = getDatabase();
    const subjectId = getSubjectId(db, question.subject);
    const timestamp = now();
    const contentHash = buildContentHash(question);
    const result = db.prepare(`
        INSERT INTO questions (
            grade_id, subject_id, question_text, correct_answer, choices_json,
            question_type, learning_objective, difficulty, status, source_type,
            source_ref, source_page, payload_json, source_key, content_hash, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?)
    `).run(
        question.grade,
        subjectId,
        question.questionText,
        question.correctAnswer,
        JSON.stringify(question.choices),
        question.questionType,
        question.learningObjective || null,
        question.difficulty,
        question.status,
        question.sourceType || 'manual',
        question.sourceRef || null,
        question.sourcePage || null,
        JSON.stringify(question.interactionData || {}),
        contentHash,
        timestamp,
        timestamp
    );

    return getQuestion(Number(result.lastInsertRowid));
}

function updateQuestion(id, question) {
    const db = getDatabase();
    const subjectId = getSubjectId(db, question.subject);
    const result = db.prepare(`
        UPDATE questions SET
            grade_id = ?, subject_id = ?, question_text = ?, correct_answer = ?,
            choices_json = ?, question_type = ?, learning_objective = ?, difficulty = ?,
            status = ?, source_type = ?, source_ref = ?, source_page = ?, payload_json = ?,
            content_hash = ?, updated_at = ?
        WHERE id = ? AND deleted_at IS NULL
    `).run(
        question.grade,
        subjectId,
        question.questionText,
        question.correctAnswer,
        JSON.stringify(question.choices),
        question.questionType,
        question.learningObjective || null,
        question.difficulty,
        question.status,
        question.sourceType || 'manual',
        question.sourceRef || null,
        question.sourcePage || null,
        JSON.stringify(question.interactionData || {}),
        buildContentHash(question),
        now(),
        id
    );

    return result.changes ? getQuestion(id) : null;
}

function deleteQuestion(id) {
    const result = getDatabase().prepare(`
        UPDATE questions SET deleted_at = ?, updated_at = ?
        WHERE id = ? AND deleted_at IS NULL
    `).run(now(), now(), id);
    return result.changes > 0;
}

function getMetadataSnapshot() {
    const db = getDatabase();
    const grades = db.prepare('SELECT id, name FROM grades ORDER BY sort_order').all();
    const subjects = db.prepare(`
        SELECT id, code, name FROM subjects WHERE is_active = 1 ORDER BY sort_order
    `).all();
    const statusRows = db.prepare(`
        SELECT status, COUNT(*) AS count
        FROM questions WHERE deleted_at IS NULL GROUP BY status
    `).all();
    const typeRows = db.prepare(`
        SELECT question_type AS type, COUNT(*) AS count
        FROM questions WHERE deleted_at IS NULL GROUP BY question_type ORDER BY question_type
    `).all();
    const total = statusRows.reduce((sum, row) => sum + row.count, 0);

    return {
        grades,
        subjects,
        stats: {
            total,
            published: statusRows.find((row) => row.status === 'published')?.count || 0,
            draft: statusRows.find((row) => row.status === 'draft')?.count || 0,
            archived: statusRows.find((row) => row.status === 'archived')?.count || 0
        },
        questionTypes: typeRows
    };
}

function getPublicQuestionBank(grade) {
    const db = getDatabase();
    const grades = grade === 1 ? [grade] : [grade, grade - 1];
    const placeholders = grades.map(() => '?').join(', ');
    const rows = db.prepare(`
        ${SELECT_QUESTION}
        WHERE q.grade_id IN (${placeholders})
          AND q.status = 'published'
          AND q.deleted_at IS NULL
        ORDER BY q.grade_id DESC, q.id
    `).all(...grades);
    const bank = Object.fromEntries(PUBLIC_SUBJECT_CODES.map((code) => [code, []]));

    for (const row of rows) {
        const payload = JSON.parse(row.payload_json || '{}');
        bank[row.subject_code].push({
            q: row.question_text,
            a: row.correct_answer,
            c: JSON.parse(row.choices_json || '[]'),
            type: row.question_type,
            ...(row.learning_objective ? { lo: row.learning_objective } : {}),
            ...payload
        });
    }
    return bank;
}

function syncLegacyQuestions() {
    return syncLegacyQuestionsInternal(getDatabase());
}

function closeDatabaseForTests() {
    const state = globalThis[GLOBAL_STATE_KEY];
    if (state?.db?.open) state.db.close();
    delete globalThis[GLOBAL_STATE_KEY];
}

module.exports = {
    PUBLIC_SUBJECT_CODES,
    buildContentHash,
    closeDatabaseForTests,
    createQuestion,
    deleteQuestion,
    getDatabase,
    getMetadataSnapshot,
    getPublicQuestionBank,
    getQuestion,
    listQuestions,
    syncLegacyQuestions,
    updateQuestion
};
