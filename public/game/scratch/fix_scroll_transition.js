const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const oldScroll = 'workspace.addEventListener("scroll", () => { if (gameState.guideEnabled) updateGuide(); });';
const newScroll = `workspace.addEventListener("scroll", () => { 
        if (gameState.guideEnabled) {
            const box = document.getElementById("assistant-box");
            if(box) {
                box.style.transition = "none";
                updateGuide();
                clearTimeout(box.scrollTimeout);
                box.scrollTimeout = setTimeout(() => {
                    box.style.transition = "top 0.7s cubic-bezier(0.25, 1, 0.5, 1), left 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
                }, 100);
            }
        } 
    });`;

js = js.replace(oldScroll, newScroll);
fs.writeFileSync('public/game/js/main.js', js, 'utf8');
console.log('Fixed scroll transition lag');
