const fs = require('fs');
let js = fs.readFileSync('public/game/js/main.js', 'utf8');

// Replace the renderInventory function
const newRenderInventory = `function renderInventory() {
            const container = document.getElementById("inv-grid-container");
            if (!container) return;
            container.innerHTML = "";

            const w = (typeof selectedWorld !== 'undefined' && selectedWorld) ? selectedWorld : 'eco';
            const seeds = gameAssets[w].seeds;

            const items = [
                { id: "s1", name: seeds.s1.name, emoji: seeds.s1.emoji, desc: "Hạt giống Dễ" },
                { id: "s2", name: seeds.s2.name, emoji: seeds.s2.emoji, desc: "Hạt giống Vừa" },
                { id: "s3", name: seeds.s3.name, emoji: seeds.s3.emoji, desc: "Hạt giống Khó" }
            ];

            // Add premium seeds to inventory grid if they have count > 0
            for(let i=4; i<=10; i++) {
                let seedId = 's'+i;
                let count = gameState.inventory[seedId] || 0;
                if (count > 0) {
                    items.push({
                        id: seedId,
                        name: seeds[seedId].name,
                        emoji: seeds[seedId].emoji,
                        desc: "Hạt đặc biệt"
                    });
                }
            }

            // Add water
            items.push({ id: "water", name: "Bình Nước", emoji: "💧", desc: "Giữ ẩm đất" });

            items.forEach(it => {
                const card = document.createElement("div");
                card.className = \`inv-card \${selectedTool === it.id ? 'active' : ''}\`;
                card.id = \`inv-card-\${it.id}\`;
                card.onclick = () => selectTool(it.id);

                card.innerHTML = \`
                    <div class="inv-qty">\${gameState.inventory[it.id] || 0}</div>
                    <div class="inv-icon">\${it.emoji}</div>
                    <div class="inv-name">\${it.name}</div>
                    <div style="font-size: 10px; opacity: 0.5;">\${it.desc}</div>
                \`;

                container.appendChild(card);
            });
        }`;

// Replace in main.js
js = js.replace(/function renderInventory\(\) \{[\s\S]*?\}\r?\n\r?\n\s*function selectTool/, newRenderInventory + '\n\n        function selectTool');

fs.writeFileSync('public/game/js/main.js', js);
console.log('Fixed renderInventory.');
