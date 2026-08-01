const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// 1. Rewrite gameAssets
const newGameAssets = `const gameAssets = {
    eco: {
        name: "Đảo Sinh Thái", styleClass: "theme-eco",
        seeds: {
            s1: { id: "s1", name: "Cải Ngọt", emoji: "🥬", color: "#10b981", reward: 20, price: 0 },
            s2: { id: "s2", name: "Cà Tomato", emoji: "🍅", color: "#f43f5e", reward: 55, price: 0 },
            s3: { id: "s3", name: "Dưa Hấu", emoji: "🍉", color: "#22c55e", reward: 120, price: 0 },
            s4: { id: "s4", name: "Dâu Tây", emoji: "🍓", color: "#ef4444", reward: 150, price: 50 },
            s5: { id: "s5", name: "Hướng Dương", emoji: "🌻", color: "#eab308", reward: 200, price: 80 },
            s6: { id: "s6", name: "Bí Ngô", emoji: "🎃", color: "#f97316", reward: 280, price: 120 },
            s7: { id: "s7", name: "Ngô Trắng", emoji: "🌽", color: "#fef08a", reward: 350, price: 150 },
            s8: { id: "s8", name: "Cà Rốt Đỏ", emoji: "🥕", color: "#f97316", reward: 450, price: 200 },
            s9: { id: "s9", name: "Cây Táo", emoji: "🍎", color: "#dc2626", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Táo Vàng", emoji: "🍏", color: "#84cc16", reward: 1000, price: 500 }
        },
        decorations: [
            { id: "d_eco_1", name: "Hàng Rào Gỗ", emoji: "🪵", price: 50 },
            { id: "d_eco_2", name: "Bù Nhìn Rơm", emoji: "🌾", price: 150 },
            { id: "d_eco_3", name: "Cối Xay Gió", emoji: "🏡", price: 300 }
        ]
    },
    cyber: {
        name: "Trạm Công Nghệ", styleClass: "theme-cyber",
        seeds: {
            s1: { id: "s1", name: "Pin Mini", emoji: "🔋", color: "#06b6d4", reward: 20, price: 0 },
            s2: { id: "s2", name: "Led Module", emoji: "💡", color: "#38bdf8", reward: 55, price: 0 },
            s3: { id: "s3", name: "Chip AI", emoji: "🌌", color: "#a855f7", reward: 120, price: 0 },
            s4: { id: "s4", name: "Lõi Năng Lượng", emoji: "⚡", color: "#eab308", reward: 150, price: 50 },
            s5: { id: "s5", name: "Ăng-ten", emoji: "📡", color: "#94a3b8", reward: 200, price: 80 },
            s6: { id: "s6", name: "Đĩa Than", emoji: "💿", color: "#cbd5e1", reward: 280, price: 120 },
            s7: { id: "s7", name: "Bo Mạch", emoji: "🖲️", color: "#22c55e", reward: 350, price: 150 },
            s8: { id: "s8", name: "Laser", emoji: "🔫", color: "#ef4444", reward: 450, price: 200 },
            s9: { id: "s9", name: "CPU Lõi Kép", emoji: "💻", color: "#64748b", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Tinh Thể Ánh Sáng", emoji: "💠", color: "#0ea5e9", reward: 1000, price: 500 }
        },
        decorations: [
            { id: "d_cyb_1", name: "Hàng Rào Laser", emoji: "⚡", price: 50 },
            { id: "d_cyb_2", name: "Trạm Thu Tín Hiệu", emoji: "📡", price: 150 },
            { id: "d_cyb_3", name: "Hologram", emoji: "💽", price: 300 }
        ]
    },
    magic: {
        name: "Khu Rừng Phép Thuật", styleClass: "theme-magic",
        seeds: {
            s1: { id: "s1", name: "Hoa Tiên", emoji: "🌸", color: "#f43f5e", reward: 20, price: 0 },
            s2: { id: "s2", name: "Nấm Sáng", emoji: "🍄", color: "#fbbf24", reward: 55, price: 0 },
            s3: { id: "s3", name: "Tim Thần", emoji: "🔮", color: "#d946ef", reward: 120, price: 0 },
            s4: { id: "s4", name: "Lá Nguyện Ước", emoji: "🍀", color: "#22c55e", reward: 150, price: 50 },
            s5: { id: "s5", name: "Mắt Phép", emoji: "🧿", color: "#3b82f6", reward: 200, price: 80 },
            s6: { id: "s6", name: "Mặt Trăng", emoji: "🌙", color: "#fef08a", reward: 280, price: 120 },
            s7: { id: "s7", name: "Sao Chổi", emoji: "☄️", color: "#f97316", reward: 350, price: 150 },
            s8: { id: "s8", name: "Vương Miện", emoji: "👑", color: "#eab308", reward: 450, price: 200 },
            s9: { id: "s9", name: "Trượng Thần", emoji: "🪄", color: "#a855f7", reward: 600, price: 300 },
            s10:{ id: "s10",name: "Rồng Lửa", emoji: "🐉", color: "#ef4444", reward: 1000, price: 500 }
        },
        decorations: [
            { id: "d_mag_1", name: "Hàng Rào Pha Lê", emoji: "💎", price: 50 },
            { id: "d_mag_2", name: "Đèn Lồng Ma Thuật", emoji: "🏮", price: 150 },
            { id: "d_mag_3", name: "Cổng Không Gian", emoji: "🌌", price: 300 }
        ]
    }
};`;

js = js.replace(/const gameAssets = \{[\s\S]*?            }\n        };\n/, newGameAssets + '\n');

// 2. Refactor inventory initialization
let inventoryInitRegex = /s1: 3,\s*s2: 1,\s*s3: 0,[\s\S]*?harvested_s3: 0,/;
let newInventoryInit = `s1: 3, s2: 1, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0,
                harvested_s1: 0, harvested_s2: 0, harvested_s3: 0, harvested_s4: 0, harvested_s5: 0, harvested_s6: 0, harvested_s7: 0, harvested_s8: 0, harvested_s9: 0, harvested_s10: 0,
                decorations: [],`;
js = js.replace(inventoryInitRegex, newInventoryInit);

// Reset game function (second instance)
let resetInventoryRegex = /s1: 3,\s*s2: 1,\s*s3: 0,\s*harvested_s1: 0,\s*harvested_s2: 0,\s*harvested_s3: 0/;
let resetInventoryNew = `s1: 3, s2: 1, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0,
            harvested_s1: 0, harvested_s2: 0, harvested_s3: 0, harvested_s4: 0, harvested_s5: 0, harvested_s6: 0, harvested_s7: 0, harvested_s8: 0, harvested_s9: 0, harvested_s10: 0,
            decorations: []`;
js = js.replace(resetInventoryRegex, resetInventoryNew);

// Fallback logic inside init() just in case:
js = js.replace(/if \(typeof gameState\.inventory\.s1 === 'undefined'\) \{[\s\S]*?\}/, `
if (typeof gameState.inventory.s4 === 'undefined') {
    for(let i=1; i<=10; i++) {
        if(typeof gameState.inventory['s'+i] === 'undefined') gameState.inventory['s'+i] = (i==1?3:(i==2?1:0));
        if(typeof gameState.inventory['harvested_s'+i] === 'undefined') gameState.inventory['harvested_s'+i] = 0;
    }
    if(!gameState.inventory.decorations) gameState.inventory.decorations = [];
}
`);

// 3. Harvest logic
js = js.replace(/if \(seedType === "s1"\) gameState\.inventory\.harvested_s1\+\+;\s*else if \(seedType === "s2"\) gameState\.inventory\.harvested_s2\+\+;\s*else if \(seedType === "s3"\) gameState\.inventory\.harvested_s3\+\+;/, 
`if (gameState.inventory['harvested_' + seedType] !== undefined) {
    gameState.inventory['harvested_' + seedType]++;
}`);

// 4. renderInventory
js = js.replace(/document\.getElementById\('inv-s1-count'\)\.innerText = gameState\.inventory\.s1;[\s\S]*?document\.getElementById\('inv-s3-count'\)\.innerText = gameState\.inventory\.s3;/, 
`
for(let i=1; i<=10; i++) {
    let el = document.getElementById('inv-s'+i+'-count');
    if(el) el.innerText = gameState.inventory['s'+i];
}
`);

// 5. Update HTML renderInventory generator. Currently it only shows s1, s2, s3. Wait, HTML is static in main.js? No, it's generated dynamically? Let's check.
// In index.html, there is `inventory-grid`. In main.js, `renderInventory()` needs to generate it if it's dynamic, or we just generate it.
// Let's rewrite `renderInventory()` entirely.
let oldRenderInv = /function renderInventory\(\) \{[\s\S]*?document\.getElementById\('inv-s1-count'\)\.innerText = gameState\.inventory\.s1;[\s\S]*?\}/;
let newRenderInv = `function renderInventory() {
    const invGrid = document.querySelector('.inventory-grid');
    if (!invGrid) return;
    
    let html = '';
    const seeds = getSeedConfig();
    for(let i=1; i<=10; i++) {
        let seedId = 's' + i;
        if(gameState.inventory[seedId] > 0 || i <= 3) {
            html += \`
            <div class="inv-item">
                <div class="inv-icon">\${seeds[seedId].emoji}</div>
                <div class="inv-info">
                    <span class="inv-name">\${seeds[seedId].name}</span>
                    <span class="inv-count">Số lượng: <strong id="inv-s\${i}-count">\${gameState.inventory[seedId]}</strong></span>
                </div>
            </div>\`;
        }
    }
    invGrid.innerHTML = html;
}`;
js = js.replace(oldRenderInv, newRenderInv);
// Fallback if not matching regex (renderInventory might just be lines updating IDs)
if(!js.includes('const invGrid = document.querySelector(\'.inventory-grid\')')) {
    // try replacing the inside
    js = js.replace(/document\.getElementById\('inv-s1-count'\)[\s\S]*?(\n|$)/, 
`
    const invGrid = document.querySelector('.inventory-grid');
    if (invGrid) {
        let html = '';
        const seeds = getSeedConfig();
        for(let i=1; i<=10; i++) {
            let seedId = 's' + i;
            if(gameState.inventory[seedId] > 0 || i <= 3) {
                html += \`<div class="inv-item"><div class="inv-icon">\${seeds[seedId].emoji}</div><div class="inv-info"><span class="inv-name">\${seeds[seedId].name}</span><span class="inv-count">Số lượng: <strong id="inv-s\${i}-count">\${gameState.inventory[seedId]}</strong></span></div></div>\`;
            }
        }
        invGrid.innerHTML = html;
    }
`);
}

// 6. showPlantingModal
let oldPlanting = `let s1c = gameState.inventory.s1;
    let s2c = gameState.inventory.s2;
    let s3c = gameState.inventory.s3;

    let seeds = getSeedConfig();
    document.getElementById('plant-s1-btn').disabled = s1c <= 0;
    document.getElementById('plant-s2-btn').disabled = s2c <= 0;
    document.getElementById('plant-s3-btn').disabled = s3c <= 0;

    document.getElementById('plant-s1-btn').innerHTML = \`\${seeds.s1.emoji} \${seeds.s1.name} (Còn: \${s1c})\`;
    document.getElementById('plant-s2-btn').innerHTML = \`\${seeds.s2.emoji} \${seeds.s2.name} (Còn: \${s2c})\`;
    document.getElementById('plant-s3-btn').innerHTML = \`\${seeds.s3.emoji} \${seeds.s3.name} (Còn: \${s3c})\`;`;

let newPlanting = `
    let seeds = getSeedConfig();
    const modalContent = document.querySelector('#planting-modal .modal-content');
    if (modalContent) {
        let title = modalContent.querySelector('h2').outerHTML;
        let p = modalContent.querySelector('p').outerHTML;
        let html = title + p + '<div class="btn-grid" style="grid-template-columns: repeat(2, 1fr); max-height: 50vh; overflow-y: auto; padding: 10px;">';
        
        for(let i=1; i<=10; i++) {
            let seedId = 's' + i;
            let count = gameState.inventory[seedId];
            if(count > 0 || i <= 3) { // Show all available seeds, and first 3 even if 0
                html += \`<button class="btn-select btn-plant" id="plant-\${seedId}-btn" \${count <= 0 ? 'disabled' : ''} onclick="plantSeed('\${seedId}')">
                    \${seeds[seedId].emoji} \${seeds[seedId].name} (Còn: \${count})
                </button>\`;
            }
        }
        html += '</div>';
        
        let cancelBtn = modalContent.querySelector('.btn-cancel');
        if (cancelBtn) html += cancelBtn.outerHTML;
        else html += \`<button class="btn-cancel mt-4" onclick="closeModal('planting-modal')">Hủy / Đóng</button>\`;
        
        modalContent.innerHTML = html;
    }
`;
js = js.replace(oldPlanting, newPlanting);

// 7. Market prices for selling
js = js.replace(/let currentMarketPrices = \{ s1: 15, s2: 40, s3: 90 \};/, `
let seeds = getSeedConfig();
let currentMarketPrices = {};
for(let i=1; i<=10; i++) {
    currentMarketPrices['s'+i] = seeds['s'+i].reward;
}
`);

// 8. renderMarket to include buying seeds (s4-s10) and decor
let renderMarketReplace = `
function renderMarket() {
    let marketEl = document.getElementById('market-items');
    if (!marketEl) return;
    let seeds = getSeedConfig();
    let currentPrices = {};
    for(let i=1; i<=10; i++) currentPrices['s'+i] = seeds['s'+i].reward;
    
    let decor = gameAssets[gameState.world].decorations;

    let html = \`
        <div class="market-section mb-6">
            <h3 class="text-xl font-black text-slate-700 mb-4 flex items-center gap-2"><i class="fa-solid fa-cart-shopping text-emerald-500"></i> BÁN NÔNG SẢN</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">\`;
            
    for(let i=1; i<=10; i++) {
        let seedId = 's'+i;
        let harvestedCount = gameState.inventory['harvested_'+seedId];
        if (harvestedCount > 0 || i <= 3) {
            html += \`
            <div class="market-item">
                <div class="market-icon">\${seeds[seedId].emoji}</div>
                <h4 class="market-name font-bold">\${seeds[seedId].name}</h4>
                <div class="market-price text-emerald-600 font-bold">\${currentPrices[seedId]} Xu / cái</div>
                <div class="market-stock text-sm text-slate-500">Kho: \${harvestedCount}</div>
                <button class="btn-sell mt-2" onclick="sellCrop('\${seedId}')" \${harvestedCount <= 0 ? 'disabled' : ''}>Bán 1</button>
            </div>\`;
        }
    }
    
    html += \`</div></div>
    
        <div class="market-section mb-6">
            <h3 class="text-xl font-black text-slate-700 mb-4 flex items-center gap-2"><i class="fa-solid fa-seedling text-amber-500"></i> MUA HẠT GIỐNG ĐẶC BIỆT</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">\`;
            
    for(let i=4; i<=10; i++) {
        let seedId = 's'+i;
        html += \`
            <div class="market-item">
                <div class="market-icon">\${seeds[seedId].emoji}</div>
                <h4 class="market-name font-bold">\${seeds[seedId].name}</h4>
                <div class="market-price text-rose-500 font-bold">\${seeds[seedId].price} Xu</div>
                <button class="btn-buy mt-2 w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 rounded-lg shadow-sm" onclick="buySeed('\${seedId}')" \${gameState.coins < seeds[seedId].price ? 'disabled' : ''}>Mua Hạt</button>
            </div>\`;
    }
    
    html += \`</div></div>
    
        <div class="market-section mb-6">
            <h3 class="text-xl font-black text-slate-700 mb-4 flex items-center gap-2"><i class="fa-solid fa-hammer text-blue-500"></i> VẬT PHẨM TRANG TRÍ</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">\`;
            
    decor.forEach(item => {
        let hasItem = gameState.inventory.decorations && gameState.inventory.decorations.includes(item.id);
        html += \`
            <div class="market-item">
                <div class="market-icon">\${item.emoji}</div>
                <h4 class="market-name font-bold">\${item.name}</h4>
                <div class="market-price text-rose-500 font-bold">\${item.price} Xu</div>
                <button class="btn-buy mt-2 w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 rounded-lg shadow-sm" onclick="buyDecor('\${item.id}', \${item.price})" \${hasItem ? 'disabled' : (gameState.coins < item.price ? 'disabled' : '')}>\${hasItem ? 'Đã Sở Hữu' : 'Mua Trang Trí'}</button>
            </div>\`;
    });
    
    html += \`</div></div>\`;
    
    marketEl.innerHTML = html;
}
window.buySeed = function(seedId) {
    let seeds = getSeedConfig();
    let price = seeds[seedId].price;
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.inventory[seedId]++;
        updateUI();
        playSound('coin');
        showToast('Đã mua ' + seeds[seedId].name, 'success');
        renderMarket(); // re-render to update disabled states
    } else {
        showToast('Không đủ xu!', 'error');
    }
};

window.buyDecor = function(id, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        if (!gameState.inventory.decorations) gameState.inventory.decorations = [];
        gameState.inventory.decorations.push(id);
        updateUI();
        playSound('coin');
        showToast('Đã mua trang trí', 'success');
        renderMarket();
        renderFarmDecor(); // You can implement this to show decor on farm
    } else {
        showToast('Không đủ xu!', 'error');
    }
};
\n\n`;

// Append renderMarket completely overriding the old one. We can just replace the old one.
let oldRenderMarketRegex = /function renderMarket\(\) \{[\s\S]*?\}\n(?=function)/;
if (js.match(oldRenderMarketRegex)) {
    js = js.replace(oldRenderMarketRegex, renderMarketReplace);
} else {
    // if not found, just append
    js += renderMarketReplace;
}

// Write the modified JS
fs.writeFileSync('public/game/js/main.js', js, 'utf8');

// Fix the CSS for tab-menu-bar
let css = fs.readFileSync('public/game/css/style.css', 'utf8');
css = css.replace(/\.tab-menu-bar\s*\{[\s\S]*?\}/, `.tab-menu-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
    border-bottom: 2px solid rgba(16, 185, 129, 0.3);
    align-items: center;
    justify-content: center;
}`);

css = css.replace(/\.btn-tab\s*\{[\s\S]*?\}/, `.btn-tab {
    flex: 1 1 auto;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 10px 16px;
    border-radius: 20px;
    font-weight: 800;
    font-family: 'Urbanist', sans-serif;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 0 rgba(203, 213, 225, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}`);

fs.writeFileSync('public/game/css/style.css', css, 'utf8');

console.log("Refactoring complete");
