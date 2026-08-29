

global.window = {};
global.document = {
    getElementById: function(id) {
        return {
            innerHTML: '',
            set innerHTML(val) {
                // do nothing
            },
            querySelectorAll: () => []
        };
    },
    querySelectorAll: () => [],
    createElement: () => ({ appendChild: () => {}, className: '', style: {} }),
    createElementNS: () => ({ setAttribute: () => {}, innerHTML: '' })
};
global.currentMarketPrices = { s1: 20, s2: 50, s3: 100 };
global.activeTab = 'market';
global.companionsConfig = { eco: {}, cyber: {}, magic: {} };
global.audioCtx = { state: 'suspended', resume: () => {} };
global.playChime = () => {};
global.dqOnSell = () => {};
global.saveDataForMode = () => {};
global.updateHeaderStats = () => {};
global.showToast = () => {};

const gameAssets = {
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
};

        // CẤU HÌNH NHÂN VẬT TRỢ LÝ ĐỒNG HÀNH CHO TỪNG THẾ GIỚI
        
global.gameAssets = gameAssets;

// Define getSeedConfig
window.getSeedConfig = function() {
    let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    return gameAssets[w].seeds;
};
function getSeedConfig() {
    return window.getSeedConfig();
}
global.getSeedConfig = getSeedConfig;

// Extract renderMarket
function renderMarket() {
    let marketEl = document.getElementById('market-items');
    if (!marketEl) return;
    let seeds = getSeedConfig();
    let currentPrices = {};
    for(let i=1; i<=10; i++) currentPrices['s'+i] = currentMarketPrices['s'+i] || seeds['s'+i].reward;
    
    let decor = gameAssets[gameState.world].decorations;

    let html = `
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-cart-shopping text-emerald-500"></i> BÁN NÔNG SẢN
            </h3>
            <div class="shop-items-grid">`;
            
    for(let i=1; i<=10; i++) {
        let seedId = 's'+i;
        let harvestedCount = gameState.inventory['harvested_'+seedId] || 0;
        if (harvestedCount > 0 || i <= 3) {
            html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">${currentPrices[seedId]}🪙 / cái</span>
                <span class="text-[10px] opacity-75">Kho: ${harvestedCount}</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="sellCrop('${seedId}')" ${harvestedCount <= 0 ? 'disabled' : ''}>Bán Hết</button>
            </div>`;
        }
    }
    
    html += `</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-seedling text-amber-500"></i> MUA HẠT GIỐNG ĐẶC BIỆT
            </h3>
            <div class="shop-items-grid">`;
            
    for(let i=4; i<=10; i++) {
        let seedId = 's'+i;
        let seedCount = gameState.inventory[seedId] || 0;
        html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${seeds[seedId].emoji}</span>
                <span class="text-xs font-bold">${seeds[seedId].name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: ${seeds[seedId].price}🪙</span>
                <span class="text-[10px] opacity-75">Bé có: ${seedCount}</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="buySeed('${seedId}')" ${gameState.coins < seeds[seedId].price ? 'disabled' : ''}>Mua Hạt</button>
            </div>`;
    }
    
    html += `</div></div>
    
        <div class="market-chart-container mb-6">
            <h3 class="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-hammer text-blue-500"></i> VẬT PHẨM TRANG TRÍ
            </h3>
            <div class="shop-items-grid">`;
            
    decor.forEach(item => {
        let hasItem = gameState.inventory.decorations && gameState.inventory.decorations.includes(item.id);
        html += `
            <div class="shop-item-card flex flex-col justify-between items-center text-center p-3">
                <span class="text-3xl">${item.emoji}</span>
                <span class="text-xs font-bold">${item.name}</span>
                <span class="text-xs text-yellow-400 font-bold">Giá: ${item.price}🪙</span>
                <button class="btn-select mt-2 w-full py-1 text-xs font-bold" onclick="buyDecoration('${item.id}', ${item.price})" ${hasItem ? 'disabled' : (gameState.coins < item.price ? 'disabled' : '')}>
                    ${hasItem ? 'Đã Sở Hữu' : 'Mua'}
                </button>
            </div>`;
    });
    
    html += `</div></div>`;
    
    marketEl.innerHTML = html;
}


['eco', 'cyber', 'magic'].forEach(world => {
    try {
        global.gameState = {
            world: world,
            coins: 100,
            inventory: {
                s1: 1, s2: 0, s3: 0,
                harvested_s1: 5,
                decorations: []
            },
            plots: []
        };
        global.selectedWorld = world;
        renderMarket();
        console.log('renderMarket executed successfully for ' + world);
    } catch (err) {
        console.error('ERROR executing renderMarket for ' + world + ':', err.message);
        console.error(err.stack);
    }
});
