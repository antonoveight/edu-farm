const fs = require('fs');

// 1. Fix public/game/css/style.css
let css = fs.readFileSync('public/game/css/style.css', 'utf8');

// Restore the shared button definition back to its original layout style (no flex/nowrap/gap/etc.)
const oldButtonCSS = `.btn-select, .btn-tab, .btn-start, .btn-submit, .btn-action, .btn-home, .tool-btn {
            border-radius: 16px !important;
            border: none !important;
            border-bottom: 4px solid rgba(0, 0, 0, 0.25) !important;
            box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
            transition: transform 0.1s ease, border-bottom-width 0.1s ease !important;
            outline: none !important;
        }`;

css = css.replace(/\.btn-select, \.btn-tab, \.btn-start, \.btn-submit, \.btn-action, \.btn-home, \.tool-btn \{[\s\S]*?\}/, oldButtonCSS);

// Add isolated styling for .btn-tab to fix the icon/text wrap properly and display inline-flex
const isolatedBtnTab = `
.btn-tab {
    padding: 8px 16px !important;
    font-size: 14px !important;
    font-weight: bold !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    white-space: nowrap !important;
    cursor: pointer;
}
`;

// Insert the isolated styling if it doesn't exist
if (!css.includes('.btn-tab {')) {
    css += isolatedBtnTab;
}

// Restore tab-menu-bar back to wrapping (original)
const originalTabMenuBar = `.tab-menu-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
    border-bottom: 2px solid rgba(16, 185, 129, 0.3);
    align-items: center;
    justify-content: center;
}`;

css = css.replace(/\.tab-menu-bar \{[\s\S]*?justify-content: flex-start;\s*\}/, originalTabMenuBar);

// Save css
fs.writeFileSync('public/game/css/style.css', css);
console.log('CSS fixed.');

// 2. Fix public/game/js/main.js - Rewrite renderMarket and buySeed
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

const newRenderMarket = `function renderMarket() {
    let marketEl = document.getElementById('market-items');
    if (!marketEl) return;
    let seeds = getSeedConfig();
    let currentPrices = {};
    for(let i=1; i<=10; i++) currentPrices['s'+i] = currentMarketPrices['s'+i] || seeds['s'+i].reward;
    
    let decor = gameAssets[gameState.world].decorations;

    let html = \`
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-cart-shopping text-emerald-500"></i> BÁN NÔNG SẢN
            </h3>
            <div class="shop-items-grid">\`;
            
    for(let i=1; i<=10; i++) {
        let seedId = 's'+i;
        let harvestedCount = gameState.inventory['harvested_'+seedId] || 0;
        if (harvestedCount > 0 || i <= 3) {
            html += \`
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">\${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">\${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">\${currentPrices[seedId]}🪙 / cái</span>
                <span class="text-[10px] opacity-75">Kho: \${harvestedCount}</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="sellCrop('\${seedId}')" \${harvestedCount <= 0 ? 'disabled' : ''}>Bán Hết</button>
            </div>\`;
        }
    }
    
    html += \`</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-seedling text-amber-500"></i> MUA HẠT GIỐNG ĐẶC BIỆT
            </h3>
            <div class="shop-items-grid">\`;
            
    for(let i=4; i<=10; i++) {
        let seedId = 's'+i;
        let seedCount = gameState.inventory[seedId] || 0;
        html += \`
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">\${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">\${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: \${seeds[seedId].price}🪙</span>
                <span class="text-[10px] opacity-75">Bé có: \${seedCount}</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="buySeed('\${seedId}')" \${gameState.coins < seeds[seedId].price ? 'disabled' : ''}>Mua Hạt</button>
            </div>\`;
    }
    
    html += \`</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-hammer text-blue-500"></i> VẬT PHẨM TRANG TRÍ
            </h3>
            <div class="shop-items-grid">\`;
            
    decor.forEach(item => {
        let hasItem = gameState.inventory.decorations && gameState.inventory.decorations.includes(item.id);
        html += \`
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">\${item.emoji}</span>
                <span class="text-xs font-bold">\${item.name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: \${item.price}🪙</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="buyDecoration('\${item.id}', \${item.price})" \${hasItem ? 'disabled' : (gameState.coins < item.price ? 'disabled' : '')}>
                    \${hasItem ? 'Đã Sở Hữu' : 'Mua'}
                </button>
            </div>\`;
    });
    
    html += \`</div></div>\`;
    
    marketEl.innerHTML = html;
}`;

// Replace the renderMarket function in JS
js = js.replace(/function renderMarket\(\) \{[\s\S]*?\}\r?\nwindow\.buySeed =/, newRenderMarket + '\nwindow.buySeed =');

// Update buySeed function to correctly call updateHeaderStats and updateMarketUI
const newBuySeed = `window.buySeed = function(seedId) {
    let seeds = getSeedConfig();
    let price = seeds[seedId].price;
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.inventory[seedId] = (gameState.inventory[seedId] || 0) + 1;
        saveDataForMode();
        updateHeaderStats();
        playChime(600, 'triangle', 0.25);
        showToast('Đã mua 1 hạt giống ' + seeds[seedId].name, 'success');
        updateMarketUI();
    } else {
        playChime(150, 'sawtooth', 0.15);
        showToast('Không đủ xu!', 'error');
    }
};`;

js = js.replace(/window\.buySeed = function\(seedId\) \{[\s\S]*?\};\r?\n\r?\nwindow\.buyDecor =/, newBuySeed + '\n\nwindow.buyDecor =');

fs.writeFileSync('public/game/js/main.js', js);
console.log('JS fixed.');
