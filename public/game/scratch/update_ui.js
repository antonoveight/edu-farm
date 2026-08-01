const fs = require('fs');
let html = fs.readFileSync('public/game/index.html', 'utf8');

// 1. Fix Assistant Box position
html = html.replace('id="assistant-box" class="absolute', 'id="assistant-box" class="fixed');

// 2. Add 'Nhiệm Vụ Hàng Ngày' tab
const tabBtnHTML = `
                <button class="btn-tab" id="tab-daily" onclick="switchTab('daily')">
                    <i class="fa-solid fa-list-check"></i> Nhiệm Vụ Hàng Ngày
                </button>
            </div>`;
html = html.replace('</div>\n\n            <!-- Không gian làm việc của nông trại -->', tabBtnHTML + '\n\n            <!-- Không gian làm việc của nông trại -->');

// 3. Move Daily Quest Section to Tab Content
const dqSectionRegex = /<!-- NHIEM VU HANG NGAY -->[\s\S]*?<div class="sidebar-section" id="daily-quest-section">[\s\S]*?<div id="daily-quest-list"><\/div>\n                    <\/div>/;
const dqMatch = html.match(dqSectionRegex);

if (dqMatch) {
    const dqHTML = dqMatch[0];
    html = html.replace(dqHTML, ''); // Remove from sidebar
    
    // Convert to tab content
    const tabContentHTML = `
                    <!-- Không gian Nhiệm Vụ Hàng Ngày -->
                    <div id="tab-daily-content" class="hidden flex-col w-full h-full overflow-y-auto p-6 bg-slate-900/40 rounded-xl relative">
                        <div class="max-w-4xl w-full mx-auto">
                            <div class="flex items-center justify-between mb-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                                <h2 class="text-2xl font-black text-amber-400 tracking-wider"><i class="fa-solid fa-list-check"></i> Nhiệm Vụ Hôm Nay</h2>
                                <span class="dq-reset-badge text-lg px-4 py-2" id="dq-reset-timer">--:--</span>
                            </div>
                            <div id="daily-quest-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                        </div>
                    </div>
`;
    // Insert after tab-arena-content
    html = html.replace(/(<div id="tab-arena-content"[\s\S]*?<\/div>\s*<\/div>)/, '$1\n' + tabContentHTML);
}

fs.writeFileSync('public/game/index.html', html, 'utf8');

let js = fs.readFileSync('public/game/js/main.js', 'utf8');
// Fix switchTab logic
js = js.replace('document.getElementById("tab-arena").classList.remove("active");', 'document.getElementById("tab-arena").classList.remove("active");\n    const td = document.getElementById("tab-daily");\n    if(td) td.classList.remove("active");');
js = js.replace('document.getElementById("tab-arena-content").classList.add("hidden");', 'document.getElementById("tab-arena-content").classList.add("hidden");\n    const tdc = document.getElementById("tab-daily-content");\n    if(tdc) tdc.classList.add("hidden");');
js = js.replace('if (tabId === "arena") {', 'if (tabId === "daily") {\n        document.getElementById("tab-daily").classList.add("active");\n        document.getElementById("tab-daily-content").classList.remove("hidden");\n        document.getElementById("tab-daily-content").classList.add("flex");\n    } else if (tabId === "arena") {');

fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('HTML and JS updated successfully');
