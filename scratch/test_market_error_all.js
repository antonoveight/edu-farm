const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Mock browser environment
const mockDOM = `
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
`;

// Extract gameAssets definition from js
const assetsStart = js.indexOf('const gameAssets = {');
const assetsEnd = js.indexOf('const companionsConfig = {');
const gameAssetsDecl = js.substring(assetsStart, assetsEnd);

// Combine and run
const testCode = `
${mockDOM}
${gameAssetsDecl}
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
${js.substring(js.indexOf('function renderMarket'), js.indexOf('window.buySeed ='))}

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
`;

fs.writeFileSync('scratch/test_run_all.js', testCode);
console.log('Test run all file written.');
require('./scratch/test_run_all.js');
