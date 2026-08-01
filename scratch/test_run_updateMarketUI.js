

const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');
global.window = {};
global.document = {
    getElementById: function(id) {
        return {
            innerHTML: '',
            set innerHTML(val) {
                // do nothing
            },
            querySelectorAll: () => [],
            appendChild: () => {}
        };
    },
    querySelectorAll: () => [],
    createElement: () => ({ 
        appendChild: () => {}, 
        className: '', 
        style: {},
        innerHTML: ''
    }),
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

window.getSeedConfig = function() {
    let w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
    if (typeof gameState !== 'undefined' && gameState && gameState.world) w = gameState.world;
    return gameAssets[w].seeds;
};
function getSeedConfig() {
    return window.getSeedConfig();
}

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

// Extract renderMarket and updateMarketUI
const renderMarketStart = js.indexOf('function renderMarket');
const renderMarketEnd = js.indexOf('window.buySeed =');
const renderMarketDecl = js.substring(renderMarketStart, renderMarketEnd);

const updateMarketUIStart = js.indexOf('function updateMarketUI');
const updateMarketUIEnd = js.indexOf('function sellCrop');
const updateMarketUIDecl = js.substring(updateMarketUIStart, updateMarketUIEnd);

eval(renderMarketDecl);
eval(updateMarketUIDecl);

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
        updateMarketUI();
        console.log('updateMarketUI executed successfully for ' + world);
    } catch (err) {
        console.error('ERROR executing updateMarketUI for ' + world + ':', err.message);
        console.error(err.stack);
    }
});
