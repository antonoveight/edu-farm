import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const subject = searchParams.get('subject'); // e.g. vietnamese, science, tech

    if (!grade || !['1', '2', '3', '4', '5'].includes(grade)) {
        return Response.json({ error: 'Grade must be 1, 2, 3, 4 or 5' }, { status: 400 });
    }

    const textbookDir = path.join(process.cwd(), 'textbooks', `grade${grade}`);
    
    if (!fs.existsSync(textbookDir)) {
        return Response.json({ error: `Textbook directory for Grade ${grade} does not exist.` }, { status: 404 });
    }

    const processFile = async (fileName) => {
        const pdfPath = path.join(textbookDir, fileName);
        if (!fs.existsSync(pdfPath)) {
            return { error: `File ${fileName} not found.` };
        }
        try {
            const require = createRequire(import.meta.url);
            const { PDFParse } = require('pdf-parse');
            const dataBuffer = fs.readFileSync(pdfPath);
            
            const parser = new PDFParse(new Uint8Array(dataBuffer));
            const parsedData = await parser.getText();
            
            const outputFileName = fileName.replace('.pdf', '_extracted.txt');
            const outputPath = path.join(textbookDir, outputFileName);
            
            fs.writeFileSync(outputPath, parsedData.text || '', 'utf8');
            return { 
                success: true, 
                pdf: fileName, 
                txt: outputFileName, 
                pages: parsedData.pages ? parsedData.pages.length : 0
            };
        } catch (e) {
            console.error(`Error parsing PDF ${fileName}:`, e);
            return { error: `Failed to parse PDF: ${e.message}` };
        }
    };

    if (subject) {
        const fileName = `${subject}.pdf`;
        const result = await processFile(fileName);
        if (result.error) {
            return Response.json(result, { status: 500 });
        }
        return Response.json(result);
    } else {
        // Process all PDFs in the directory
        const files = fs.readdirSync(textbookDir);
        const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));
        const results = [];

        for (const file of pdfFiles) {
            const res = await processFile(file);
            results.push(res);
        }

        return Response.json({ 
            message: `Processed ${pdfFiles.length} PDF files.`, 
            results 
        });
    }
}
