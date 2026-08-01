import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('EduFarm-CoCoTien.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Extract CSS
const styleStart = htmlContent.indexOf('<style>');
const styleEnd = htmlContent.indexOf('</style>');
if (styleStart === -1 || styleEnd === -1) {
    console.error('Could not find style block');
    process.exit(1);
}
const cssContent = htmlContent.substring(styleStart + 7, styleEnd).trim();

// 2. Extract Javascript
// Look for the main script block (the second <script> tag, or the one with "Hệ thống Game Engine")
const scriptIndicator = '<!-- Hệ thống Game Engine điều phối chính -->';
const scriptIndicatorIndex = htmlContent.indexOf(scriptIndicator);
if (scriptIndicatorIndex === -1) {
    console.error('Could not find script indicator');
    process.exit(1);
}
const scriptStart = htmlContent.indexOf('<script>', scriptIndicatorIndex);
const scriptEnd = htmlContent.indexOf('</script>', scriptStart);
if (scriptStart === -1 || scriptEnd === -1) {
    console.error('Could not find script block');
    process.exit(1);
}
const jsContent = htmlContent.substring(scriptStart + 8, scriptEnd).trim();

// 3. Extract HTML Template
// We need to keep everything in the HTML but replace the CSS with a link tag, and the script block with a module script tag
let indexHtml = htmlContent;

// Replace style block with link
indexHtml = indexHtml.substring(0, styleStart) + '<link rel="stylesheet" href="/src/css/style.css">' + indexHtml.substring(styleEnd + 8);

// Update script block index since indexHtml size changed
const newIndicatorIndex = indexHtml.indexOf(scriptIndicator);
const newScriptStart = indexHtml.indexOf('<script>', newIndicatorIndex);
const newScriptEnd = indexHtml.indexOf('</script>', newScriptStart);

indexHtml = indexHtml.substring(0, newScriptStart) + '<script type="module" src="/src/main.js"></script>' + indexHtml.substring(newScriptEnd + 9);

// Create directories
fs.mkdirSync('src/css', { recursive: true });
fs.mkdirSync('src/engine', { recursive: true });
fs.mkdirSync('src/education', { recursive: true });
fs.mkdirSync('src/data', { recursive: true });
fs.mkdirSync('textbooks', { recursive: true });

// Write files
fs.writeFileSync('src/css/style.css', cssContent);
fs.writeFileSync('src/main.js', jsContent);
fs.writeFileSync('index.html', indexHtml);

console.log('Split completed successfully!');
