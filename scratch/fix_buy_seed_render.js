const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Update buySeed to include renderInventory()
const target = "showToast('Đã mua 1 hạt giống ' + seeds[seedId].name, 'success');\n        updateMarketUI();";
const replacement = "showToast('Đã mua 1 hạt giống ' + seeds[seedId].name, 'success');\n        updateMarketUI();\n        renderInventory();";

if (js.includes(target)) {
    js = js.replace(target, replacement);
    fs.writeFileSync('public/game/js/main.js', js);
    console.log('Successfully added renderInventory() call to buySeed.');
} else {
    console.log('Target string not found in main.js');
}
