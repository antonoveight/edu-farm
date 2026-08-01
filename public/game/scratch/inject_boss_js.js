const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const bossLogic = `

// ==========================================
// BOSS SCHEDULE LOGIC (PHASE 4)
// ==========================================
let bossSchedule = { start: '19:30', end: '20:30' };

function loadBossSchedule() {
    const saved = localStorage.getItem('edufarm_boss_schedule');
    if (saved) {
        try {
            bossSchedule = JSON.parse(saved);
        } catch(e) {}
    }
}

function checkBossTimeWindow() {
    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();
    const currentTotal = currentH * 60 + currentM;

    const [startH, startM] = bossSchedule.start.split(':').map(Number);
    const startTotal = startH * 60 + startM;
    
    const [endH, endM] = bossSchedule.end.split(':').map(Number);
    const endTotal = endH * 60 + endM;

    const btn = document.getElementById("btn-boss-start");
    const status = document.getElementById("boss-time-status");
    if (!btn || !status) return;

    // Check if within window
    // Assumes start < end for simple daily ranges (no overnight for kids)
    if (currentTotal >= startTotal && currentTotal <= endTotal) {
        btn.removeAttribute("disabled");
        btn.classList.remove("opacity-50", "cursor-not-allowed", "grayscale");
        btn.innerHTML = 'KHỞI TRANH ĐẤU TRƯỜNG <i class="fa-solid fa-bolt ml-1"></i>';
        status.innerHTML = '<span class="text-emerald-400">Boss đang tàn phá! Hãy tiêu diệt ngay!</span>';
    } else {
        btn.setAttribute("disabled", "true");
        btn.classList.add("opacity-50", "cursor-not-allowed", "grayscale");
        btn.innerHTML = 'ĐANG KHÓA <i class="fa-solid fa-lock ml-1"></i>';
        status.innerHTML = \`<span class="text-rose-400">Boss đang ngủ... Tỉnh dậy lúc \${bossSchedule.start} - \${bossSchedule.end}</span>\`;
    }
}

function openBossConfig() {
    document.getElementById('modal-boss-config').classList.remove('hidden');
    document.getElementById('modal-boss-config').classList.add('flex');
    document.getElementById('boss-pin-section').classList.remove('hidden');
    document.getElementById('boss-schedule-section').classList.add('hidden');
    document.getElementById('boss-pin-input').value = '';
    document.getElementById('boss-pin-error').classList.add('hidden');
}

function closeBossConfig() {
    document.getElementById('modal-boss-config').classList.add('hidden');
    document.getElementById('modal-boss-config').classList.remove('flex');
}

function verifyParentPin() {
    const pin = document.getElementById('boss-pin-input').value;
    if (pin === '123456') {
        document.getElementById('boss-pin-section').classList.add('hidden');
        document.getElementById('boss-schedule-section').classList.remove('hidden');
        document.getElementById('boss-start-time').value = bossSchedule.start;
        document.getElementById('boss-end-time').value = bossSchedule.end;
    } else {
        document.getElementById('boss-pin-error').classList.remove('hidden');
    }
}

function saveBossSchedule() {
    const start = document.getElementById('boss-start-time').value;
    const end = document.getElementById('boss-end-time').value;
    if (start && end) {
        bossSchedule = { start, end };
        localStorage.setItem('edufarm_boss_schedule', JSON.stringify(bossSchedule));
        checkBossTimeWindow(); // Update UI immediately
        closeBossConfig();
    }
}
`;

if (!js.includes('loadBossSchedule()')) {
    // Append to end of file
    js += bossLogic;
    
    // Call loadBossSchedule inside startGame
    js = js.replace('initDailyQuests();', 'initDailyQuests();\n            loadBossSchedule();');
    
    // Call checkBossTimeWindow inside game loop
    const loopRegex = /setInterval\(\(\) => \{[\s\S]*?updateGameLogic\(\);/;
    const loopMatch = js.match(loopRegex);
    if (loopMatch) {
        js = js.replace(loopMatch[0], loopMatch[0] + '\n                checkBossTimeWindow();');
    }
    
    // Expose functions to window
    js += '\nwindow.openBossConfig = openBossConfig; window.closeBossConfig = closeBossConfig; window.verifyParentPin = verifyParentPin; window.saveBossSchedule = saveBossSchedule;';
    
    fs.writeFileSync('public/game/js/main.js', js, 'utf8');
    console.log('JS Boss Config Added');
} else {
    console.log('Already added');
}
