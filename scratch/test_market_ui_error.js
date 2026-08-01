const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Mock browser environment
const mockDOM = `
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
`;

fs.writeFileSync('scratch/test_run_updateMarketUI.js', testCode);
console.log('Test written.');
