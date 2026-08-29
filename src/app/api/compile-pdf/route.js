import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { resolvePathWithinBase } from '../../../lib/path-containment-policy.js';
import {
    compilerDisabledResponse,
    isCompilerDisabled
} from '../../../lib/production-route-policy.js';
import {
    CANONICAL_SUBJECTS,
    RequestValidationError,
    parseGrade,
    parseSubject
} from '../../../lib/request-validation.js';

async function extractSubjectPdf(textbookDirectory, subject) {
    const pdfFileName = `${subject}.pdf`;
    const pdfPath = resolvePathWithinBase(textbookDirectory, pdfFileName);
    if (!fs.existsSync(pdfPath)) {
        return null;
    }

    const require = createRequire(import.meta.url);
    const { PDFParse } = require('pdf-parse');
    const parser = new PDFParse(new Uint8Array(fs.readFileSync(pdfPath)));
    const parsedData = await parser.getText();
    const outputFileName = `${subject}_extracted.txt`;
    const outputPath = resolvePathWithinBase(textbookDirectory, outputFileName);

    fs.writeFileSync(outputPath, parsedData.text || '', 'utf8');
    return {
        success: true,
        pdf: pdfFileName,
        txt: outputFileName,
        pages: parsedData.pages ? parsedData.pages.length : 0
    };
}

export async function GET(request) {
    if (isCompilerDisabled(process.env.NODE_ENV)) {
        return compilerDisabledResponse();
    }

    try {
        const { searchParams } = new URL(request.url);
        const grade = parseGrade(searchParams.get('grade'));
        const subjectParam = searchParams.get('subject');
        const subject = subjectParam === null ? null : parseSubject(subjectParam);
        const textbookDirectory = path.resolve(
            process.cwd(),
            'textbooks',
            `grade${grade}`
        );

        if (!fs.existsSync(textbookDirectory)) {
            return Response.json({ error: 'Textbook directory not found' }, { status: 404 });
        }

        if (subject) {
            const result = await extractSubjectPdf(textbookDirectory, subject);
            return result
                ? Response.json(result)
                : Response.json({ error: 'PDF not found' }, { status: 404 });
        }

        const results = (await Promise.all(CANONICAL_SUBJECTS.map(
            (canonicalSubject) => extractSubjectPdf(textbookDirectory, canonicalSubject)
        ))).filter(Boolean);

        return Response.json({
            message: `Processed ${results.length} PDF files.`,
            results
        });
    } catch (error) {
        if (error instanceof RequestValidationError) {
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error('PDF compilation failed', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
