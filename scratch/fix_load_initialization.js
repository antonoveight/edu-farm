const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Replace target block
const target = `            if (gameState.inventory.s1 === undefined) gameState.inventory.s1 = 3;
            if (gameState.inventory.s2 === undefined) gameState.inventory.s2 = 1;
            if (gameState.inventory.s3 === undefined) gameState.inventory.s3 = 0;
            if (gameState.inventory.water === undefined) gameState.inventory.water = 5;
            if (gameState.inventory.harvested_s1 === undefined) gameState.inventory.harvested_s1 = 0;
            if (gameState.inventory.harvested_s2 === undefined) gameState.inventory.harvested_s2 = 0;
            if (gameState.inventory.harvested_s3 === undefined) gameState.inventory.harvested_s3 = 0;`;

const replacement = `            for (let i = 1; i <= 10; i++) {
                if (gameState.inventory['s' + i] === undefined) gameState.inventory['s' + i] = (i === 1 ? 3 : (i === 2 ? 1 : 0));
                if (gameState.inventory['harvested_s' + i] === undefined) gameState.inventory['harvested_s' + i] = 0;
            }
            if (gameState.inventory.water === undefined) gameState.inventory.water = 5;`;

// Let's check both Unix and Windows line endings
let replaced = false;
if (js.includes(target)) {
    js = js.replace(target, replacement);
    replaced = true;
} else {
    // try to match with regex
    const regex = /if\s*\(gameState\.inventory\.s1\s*===\s*undefined\)[\s\S]*?harvested_s3\s*===\s*undefined\)[\s\S]*?=\s*0;/;
    if (regex.test(js)) {
        js = js.replace(regex, replacement);
        replaced = true;
    }
}

if (replaced) {
    fs.writeFileSync('public/game/js/main.js', js);
    console.log('Successfully updated game load initialization loop.');
} else {
    console.log('Could not find target block for load initialization.');
}
