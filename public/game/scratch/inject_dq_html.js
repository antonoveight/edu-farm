const fs = require('fs');
let html = fs.readFileSync('public/game/index.html', 'utf8');

const DQ_HTML = [
    '                    <!-- NHIEM VU HANG NGAY -->',
    '                    <div class="sidebar-section" id="daily-quest-section">',
    '                        <div class="dq-header">',
    '                            <div class="sidebar-title" style="border:none;padding:0;opacity:1;">Nhiem vu hom nay</div>',
    '                            <span class="dq-reset-badge" id="dq-reset-timer">--:--</span>',
    '                        </div>',
    '                        <div id="daily-quest-list"></div>',
    '                    </div>',
    ''
].join('\n');

// Find insertion point: right before the sidebar-section containing task-list
const taskListIdx = html.indexOf('id="task-list-container"');
if (taskListIdx === -1) { console.error('task-list-container not found'); process.exit(1); }

const sectionStartIdx = html.lastIndexOf('<div class="sidebar-section">', taskListIdx);
if (sectionStartIdx === -1) { console.error('sidebar-section not found'); process.exit(1); }

html = html.slice(0, sectionStartIdx) + DQ_HTML + '\n' + html.slice(sectionStartIdx);
fs.writeFileSync('public/game/index.html', html, 'utf8');
console.log('OK: daily quest section inserted before task-list at char', sectionStartIdx);
