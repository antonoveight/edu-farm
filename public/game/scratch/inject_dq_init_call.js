const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Add initDailyQuests() call after renderPetsList() in startGame
const OLD = '            renderPetsList();\n\n            // Dong bo trang thai Tro ly Huong dan';
const NEW = '            renderPetsList();\n            initDailyQuests(); // Khoi tao nhiem vu hang ngay\n\n            // Dong bo trang thai Tro ly Huong dan';

if (js.includes(OLD)) {
    js = js.replace(OLD, NEW);
    console.log('OK method 1');
} else {
    // Try alternate approach: Vietnamese content
    const target = '            renderPetsList();\n\n            // Đồng bộ trạng thái Trợ lý Hướng dẫn';
    const replacement = '            renderPetsList();\n            initDailyQuests(); // Khoi tao nhiem vu hang ngay\n\n            // Đồng bộ trạng thái Trợ lý Hướng dẫn';
    if (js.includes(target)) {
        js = js.replace(target, replacement);
        console.log('OK method 2');
    } else {
        // method 3: find renderPetsList then insert after it
        const rpIdx = js.indexOf('            renderPetsList();');
        if (rpIdx > -1) {
            const afterRP = rpIdx + '            renderPetsList();'.length;
            js = js.slice(0, afterRP) + '\n            initDailyQuests(); // Khoi tao nhiem vu hang ngay' + js.slice(afterRP);
            console.log('OK method 3 at char', rpIdx);
        } else {
            console.error('Could not find renderPetsList insertion point');
            process.exit(1);
        }
    }
}

fs.writeFileSync('public/game/js/main.js', js, 'utf8');

const { execSync } = require('child_process');
try {
    execSync('node --check public/game/js/main.js', { stdio: 'pipe' });
    console.log('Syntax OK');
} catch(e) {
    console.error('Syntax ERROR:', e.stderr.toString());
}
