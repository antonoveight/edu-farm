const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// 1. Fix collectCropToInventory
const oldCollect = `            // Thêm vào kho nông sản thu hoạch ảo
            if (gameState.inventory['harvested_' + seedType] !== undefined) {
    gameState.inventory['harvested_' + seedType]++;
}`;

const newCollect = `            // Thêm vào kho nông sản thu hoạch ảo (đảm bảo khởi tạo nếu chưa có)
            gameState.inventory['harvested_' + seedType] = (gameState.inventory['harvested_' + seedType] || 0) + 1;`;

js = js.replace(oldCollect, newCollect);

// 2. Fix triggerMarketFluctuation
const oldFluctuation = `        function triggerMarketFluctuation() {
            currentMarketPrices.s1 = Math.floor(Math.random() * 20) + 10;   // 10 -> 30
            currentMarketPrices.s2 = Math.floor(Math.random() * 50) + 30;   // 30 -> 80
            currentMarketPrices.s3 = Math.floor(Math.random() * 100) + 80;  // 80 -> 180

            if (activeTab === "market") {
                updateMarketUI();
            }
        }`;

const newFluctuation = `        function triggerMarketFluctuation() {
            let seeds = getSeedConfig();
            for(let i=1; i<=10; i++) {
                let seedId = 's'+i;
                if (seeds[seedId]) {
                    let reward = seeds[seedId].reward;
                    let min = Math.floor(reward * 0.6);
                    let max = Math.floor(reward * 1.4);
                    currentMarketPrices[seedId] = Math.floor(Math.random() * (max - min + 1)) + min;
                }
            }

            if (activeTab === "market") {
                updateMarketUI();
            }
        }`;

js = js.replace(oldFluctuation, newFluctuation);

// 3. Fix updateMarketUI chart rendering
// Let's locate the updateMarketUI function chart drawing logic
const oldChartLogic = `            const crops = [
                { id: "s1", name: gameAssets[selectedWorld].seeds.s1.name, price: currentMarketPrices.s1, maxPrice: 30 },
                { id: "s2", name: gameAssets[selectedWorld].seeds.s2.name, price: currentMarketPrices.s2, maxPrice: 80 },
                { id: "s3", name: gameAssets[selectedWorld].seeds.s3.name, price: currentMarketPrices.s3, maxPrice: 180 }
            ];`;

const newChartLogic = `            const w = selectedWorld || (gameState && gameState.world) || 'eco';
            const seeds = gameAssets[w].seeds;
            const crops = [
                { id: "s1", name: seeds.s1.name, price: currentMarketPrices.s1 || seeds.s1.reward, maxPrice: Math.floor(seeds.s1.reward * 1.5) },
                { id: "s2", name: seeds.s2.name, price: currentMarketPrices.s2 || seeds.s2.reward, maxPrice: Math.floor(seeds.s2.reward * 1.5) },
                { id: "s3", name: seeds.s3.name, price: currentMarketPrices.s3 || seeds.s3.reward, maxPrice: Math.floor(seeds.s3.reward * 1.5) }
            ];

            // Add premium crops to the chart if purchased or harvested
            for (let i = 4; i <= 10; i++) {
                const seedId = 's' + i;
                if ((gameState.inventory[seedId] || 0) > 0 || (gameState.inventory['harvested_' + seedId] || 0) > 0) {
                    crops.push({
                        id: seedId,
                        name: seeds[seedId].name,
                        price: currentMarketPrices[seedId] || seeds[seedId].reward,
                        maxPrice: Math.floor(seeds[seedId].reward * 1.5)
                    });
                }
            }`;

js = js.replace(oldChartLogic, newChartLogic);

fs.writeFileSync('public/game/js/main.js', js);
console.log('JS modified successfully.');

// 4. Modify public/game/css/style.css to support scrollable chart wrapper
let css = fs.readFileSync('public/game/css/style.css', 'utf8');

const oldBarsWrapper = `.chart-bars-wrapper {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            height: 180px;
            border-bottom: 2px solid rgba(255,255,255,0.1);
            margin-top: 15px;
            padding-bottom: 10px;
        }`;

const newBarsWrapper = `.chart-bars-wrapper {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            height: 180px;
            border-bottom: 2px solid rgba(255,255,255,0.1);
            margin-top: 15px;
            padding-bottom: 10px;
            overflow-x: auto !important;
            gap: 10px;
        }
        .chart-bars-wrapper::-webkit-scrollbar {
            height: 6px;
        }
        .chart-bars-wrapper::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }`;

css = css.replace(oldBarsWrapper, newBarsWrapper);

const oldBarItem = `.chart-bar-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;
        }`;

const newBarItem = `.chart-bar-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;
            flex-shrink: 0 !important;
        }`;

css = css.replace(oldBarItem, newBarItem);

fs.writeFileSync('public/game/css/style.css', css);
console.log('CSS modified successfully.');
