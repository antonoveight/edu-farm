const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

if (!js.includes('document.querySelector(".game-workspace").addEventListener("scroll"')) {
    js += '\n\n// Lắng nghe sự kiện cuộn để cập nhật vị trí trợ lý\n';
    js += 'document.addEventListener("DOMContentLoaded", () => {\n';
    js += '    const workspace = document.querySelector(".game-workspace");\n';
    js += '    if (workspace) workspace.addEventListener("scroll", () => { if (gameState.guideEnabled) updateGuide(); });\n';
    // Cũng thêm cho document scroll (nếu có)
    js += '    window.addEventListener("scroll", () => { if (gameState.guideEnabled) updateGuide(); });\n';
    js += '});\n';
    fs.writeFileSync('public/game/js/main.js', js, 'utf8');
    console.log('Added scroll listener for updateGuide');
} else {
    console.log('Scroll listener already exists');
}
