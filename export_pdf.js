const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath = 'C:\\Users\\AN515-56\\.gemini\\antigravity-ide\\brain\\46ec1765-e27e-4c16-84f5-912b5667c56c\\executive_report_roadmap.md';
const htmlPath = path.join(__dirname, 'executive_report_roadmap.html');
const pdfPath = path.join(__dirname, 'executive_report_roadmap.pdf');

let md = fs.readFileSync(mdPath, 'utf8');

function convertMdToHtml(text) {
    let lines = text.split('\n');
    let htmlLines = [];
    let inList = false;
    let inTable = false;
    let tableLines = [];

    function flushTable() {
        if (tableLines.length === 0) return '';
        let header = tableLines[0];
        let body = tableLines.slice(2);
        
        let headers = header.split('|').map(s => s.trim()).filter(s => s.length > 0);
        let tableHtml = '<table class="styled-table"><thead><tr>';
        headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
        tableHtml += '</tr></thead><tbody>';
        
        body.forEach(row => {
            let cols = row.split('|').map(s => s.trim()).filter(s => s.length > 0);
            if (cols.length > 0) {
                tableHtml += '<tr>';
                cols.forEach(c => { tableHtml += `<td>${c}</td>`; });
                tableHtml += '</tr>';
            }
        });
        tableHtml += '</tbody></table>';
        tableLines = [];
        return tableHtml;
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Table lines
        if (line.trim().startsWith('|')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            tableLines.push(line.trim());
            inTable = true;
            continue;
        } else if (inTable) {
            htmlLines.push(flushTable());
            inTable = false;
        }

        // List lines
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            if (!inList) { htmlLines.push('<ul>'); inList = true; }
            let itemText = line.trim().substring(2);
            
            // Format Game Examples
            if (itemText.includes('🎮 **Ví dụ ứng dụng vào Game Edu-Farm:**')) {
                itemText = itemText.replace('🎮 **Ví dụ ứng dụng vào Game Edu-Farm:**', '<strong class="game-tag">🎮 Ví dụ ứng dụng vào Game Edu-Farm:</strong>');
            }
            
            // Bold & Code
            itemText = itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            itemText = itemText.replace(/`(.*?)`/g, '<code>$1</code>');
            
            htmlLines.push(`<li>${itemText}</li>`);
            continue;
        } else if (inList) {
            htmlLines.push('</ul>');
            inList = false;
        }

        let trimmed = line.trim();
        if (trimmed === '') {
            htmlLines.push('');
            continue;
        }

        // Headers
        if (trimmed.startsWith('# ')) {
            htmlLines.push(`<h1 class="doc-title">${trimmed.substring(2)}</h1>`);
        } else if (trimmed.startsWith('## ')) {
            htmlLines.push(`<h2 class="sec-title">${trimmed.substring(3)}</h2>`);
        } else if (trimmed.startsWith('### ')) {
            htmlLines.push(`<h3 class="subsec-title">${trimmed.substring(4)}</h3>`);
        } else if (trimmed.startsWith('#### ')) {
            htmlLines.push(`<h4 class="subsubsec-title">${trimmed.substring(5)}</h4>`);
        } else if (trimmed.startsWith('> ')) {
            htmlLines.push(`<blockquote>${trimmed.substring(2)}</blockquote>`);
        } else if (trimmed === '---') {
            htmlLines.push('<hr>');
        } else {
            let pText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>');
            htmlLines.push(`<p>${pText}</p>`);
        }
    }

    if (inList) htmlLines.push('</ul>');
    if (inTable) htmlLines.push(flushTable());

    return htmlLines.join('\n');
}

const bodyContent = convertMdToHtml(md);

const fullHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Báo cáo Lộ trình Giáo dục & Master Plan Edu-Farm</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    
    @page {
        size: A4;
        margin: 12mm 15mm 12mm 15mm;
    }
    
    body {
        font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
        color: #1e293b;
        line-height: 1.5;
        font-size: 12.5px;
        background: #ffffff;
        padding: 0;
        margin: 0;
    }
    
    .doc-title {
        color: #0f172a;
        font-size: 18px;
        font-weight: 900;
        text-align: center;
        text-transform: uppercase;
        border-bottom: 3px solid #2563eb;
        padding-bottom: 10px;
        margin-bottom: 15px;
        margin-top: 5px;
    }
    
    .sec-title {
        color: #1e40af;
        font-size: 15px;
        font-weight: 800;
        background: #eff6ff;
        padding: 6px 10px;
        border-left: 5px solid #2563eb;
        margin-top: 20px;
        margin-bottom: 10px;
        page-break-after: avoid;
    }
    
    .subsec-title {
        color: #0f766e;
        font-size: 13.5px;
        font-weight: 700;
        margin-top: 14px;
        margin-bottom: 6px;
        border-bottom: 1px dashed #cbd5e1;
        padding-bottom: 3px;
        page-break-after: avoid;
    }

    .subsubsec-title {
        color: #1e293b;
        font-size: 12.5px;
        font-weight: 700;
        margin-top: 10px;
        margin-bottom: 4px;
        page-break-after: avoid;
    }
    
    p {
        margin-bottom: 6px;
    }
    
    ul {
        margin-top: 3px;
        margin-bottom: 8px;
        padding-left: 18px;
    }
    
    li {
        margin-bottom: 3px;
    }
    
    .game-tag {
        color: #b45309;
        display: inline-block;
        margin-top: 2px;
    }
    
    code {
        background: #f1f5f9;
        color: #0f766e;
        padding: 1px 5px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 11.5px;
    }
    
    hr {
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 15px 0;
    }
    
    .styled-table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        font-size: 11.5px;
        page-break-inside: avoid;
    }
    
    .styled-table th {
        background-color: #1e40af;
        color: #ffffff;
        text-align: left;
        padding: 6px 10px;
        font-weight: 700;
    }
    
    .styled-table td {
        padding: 6px 10px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .styled-table tr:nth-of-type(even) {
        background-color: #f8fafc;
    }
    
    blockquote {
        background: #f0fdf4;
        border-left: 4px solid #16a34a;
        margin: 10px 0;
        padding: 8px 12px;
        color: #166534;
        font-size: 11.5px;
    }
</style>
</head>
<body>
${bodyContent}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, 'utf8');
console.log('HTML created successfully:', htmlPath);

// Execute Edge headless print to PDF
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${pdfPath}" "${htmlPath}"`;

try {
    execSync(cmd);
    console.log('PDF generated successfully at:', pdfPath);
} catch (err) {
    console.error('Error generating PDF with Edge:', err);
}
