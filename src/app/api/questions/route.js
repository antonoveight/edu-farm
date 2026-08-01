import fs from 'fs';
import path from 'path';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');

    if (!grade || !['1', '2', '3', '4', '5'].includes(grade)) {
        return Response.json({ error: 'Grade must be 1, 2, 3, 4 or 5' }, { status: 400 });
    }

    const currentGrade = parseInt(grade);
    const subjects = ['viet', 'science', 'tech'];
    const responseData = { viet: [], science: [], tech: [] };

    const loadGradeData = (g) => {
        const dataDir = path.join(process.cwd(), 'src', 'data', `grade${g}`);
        const data = {};
        subjects.forEach(subject => {
            const filePath = path.join(dataDir, `${subject}.json`);
            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    data[subject] = JSON.parse(content);
                } catch (e) {
                    console.error(`Error parsing ${filePath}:`, e);
                    data[subject] = [];
                }
            } else {
                data[subject] = [];
            }
        });
        return data;
    };

    // Nạp câu hỏi lớp hiện tại
    const currentData = loadGradeData(currentGrade);
    subjects.forEach(sub => {
        responseData[sub] = [...(currentData[sub] || [])];
    });

    // Nạp thêm câu hỏi lớp nhỏ hơn 1 cấp để trộn ngẫu nhiên
    if (currentGrade > 1) {
        const prevData = loadGradeData(currentGrade - 1);
        subjects.forEach(sub => {
            if (prevData[sub] && prevData[sub].length > 0) {
                // Ghép nối danh sách câu hỏi của lớp trước vào lớp hiện tại
                responseData[sub] = [...responseData[sub], ...prevData[sub]];
            }
        });
    }

    return Response.json(responseData);
}
