const fs = require('fs');

// Fix style.css
let css = fs.readFileSync('public/game/css/style.css', 'utf8');
const btnTabReplace = '.btn-tab, .btn-start, .btn-submit, .btn-action, .btn-home, .tool-btn {\n            border-radius: 16px !important;\n            border: none !important;\n            border-bottom: 4px solid rgba(0, 0, 0, 0.25) !important;\n            box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;\n            transition: transform 0.1s ease, border-bottom-width 0.1s ease !important;\n            outline: none !important;\n            padding: 8px 16px !important;\n            font-weight: bold !important;\n            display: flex !important;\n            align-items: center !important;\n            gap: 6px !important;\n            white-space: nowrap !important;\n        }';
css = css.replace(/\.btn-tab, \.btn-start, \.btn-submit, \.btn-action, \.btn-home, \.tool-btn \{[\s\S]*?outline: none !important;\s*\}/, btnTabReplace);

const tabMenuReplace = '.tab-menu-bar {\n    display: flex;\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    overflow-y: hidden;\n    -webkit-overflow-scrolling: touch;\n    gap: 8px;\n    padding: 10px;\n    background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));\n    border-bottom: 2px solid rgba(16, 185, 129, 0.3);\n    align-items: center;\n    justify-content: flex-start;\n}\n.tab-menu-bar::-webkit-scrollbar { display: none; }';
css = css.replace(/\.tab-menu-bar \{[\s\S]*?justify-content: center;\s*\}/, tabMenuReplace);
fs.writeFileSync('public/game/css/style.css', css);

// Fix index.html
let html = fs.readFileSync('public/game/index.html', 'utf8');
const startMarker = '<!-- Thống kê kho nông sản & Bộ Số Lượng Bán -->';
const endMarker = '</div>\n                        </div>\n                    </div>'; 
const endMarkerWin = '</div>\r\n                        </div>\r\n                    </div>';

const startIdx = html.indexOf(startMarker);
let endIdx = html.indexOf(endMarker, startIdx);
if (endIdx === -1) endIdx = html.indexOf(endMarkerWin, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const before = html.substring(0, startIdx);
    const after = html.substring(endIdx);
    const newHtml = before + '<div id="market-items" class="mt-6 w-full"></div>\n                    ' + after;
    fs.writeFileSync('public/game/index.html', newHtml);
    console.log('Fixed index.html');
} else {
    console.log('Could not find markers in index.html');
    console.log('Start index:', startIdx);
    console.log('End index:', endIdx);
}
