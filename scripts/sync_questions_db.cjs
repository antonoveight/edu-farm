const questionStore = require('../src/lib/question-store.cjs');

try {
    questionStore.getDatabase();
    const result = questionStore.syncLegacyQuestions();
    const metadata = questionStore.getMetadataSnapshot();
    console.log(JSON.stringify({
        database: process.env.QUESTION_DB_PATH || 'storage/questions.sqlite',
        sync: result,
        stats: metadata.stats
    }, null, 2));
} finally {
    questionStore.closeDatabaseForTests();
}
