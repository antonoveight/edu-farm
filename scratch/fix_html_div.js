const fs = require('fs');
let html = fs.readFileSync('public/game/index.html', 'utf8');

// We want to find the sequence:
// <div id="market-items" class="mt-6 w-full"></div>
//                     </div>
//                         </div>
//                     </div>
//
// and replace it with:
// <div id="market-items" class="mt-6 w-full"></div>
//                     </div>
//                         </div>

const targetStr = '<div id="market-items" class="mt-6 w-full"></div>\n                     </div>\n                         </div>\n                     </div>';
const targetStrWin = '<div id="market-items" class="mt-6 w-full"></div>\r\n                     </div>\r\n                         </div>\r\n                     </div>';
const targetStrSpaces = '<div id="market-items" class="mt-6 w-full"></div>\n                    </div>\n                        </div>\n                    </div>';
const targetStrSpacesWin = '<div id="market-items" class="mt-6 w-full"></div>\r\n                    </div>\r\n                        </div>\r\n                    </div>';

let replaced = false;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, '<div id="market-items" class="mt-6 w-full"></div>\n                    </div>\n                        </div>');
    replaced = true;
} else if (html.includes(targetStrWin)) {
    html = html.replace(targetStrWin, '<div id="market-items" class="mt-6 w-full"></div>\r\n                    </div>\r\n                        </div>');
    replaced = true;
} else if (html.includes(targetStrSpaces)) {
    html = html.replace(targetStrSpaces, '<div id="market-items" class="mt-6 w-full"></div>\n                    </div>\n                        </div>');
    replaced = true;
} else if (html.includes(targetStrSpacesWin)) {
    html = html.replace(targetStrSpacesWin, '<div id="market-items" class="mt-6 w-full"></div>\r\n                    </div>\r\n                        </div>');
    replaced = true;
}

if (replaced) {
    fs.writeFileSync('public/game/index.html', html);
    console.log('Successfully fixed index.html div matching.');
} else {
    console.log('Target string not found in index.html, let us do a fallback regex search.');
    // Let's use regex to find market-items and the divs following it
    const regex = /<div id="market-items" class="mt-6 w-full"><\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
    if (regex.test(html)) {
        html = html.replace(regex, '<div id="market-items" class="mt-6 w-full"></div>\n                    </div>\n                </div>');
        fs.writeFileSync('public/game/index.html', html);
        console.log('Fixed using regex.');
    } else {
        console.log('Regex also failed. Printing lines around market-items:');
        const lines = html.split('\n');
        lines.forEach((l, i) => {
            if (l.includes('market-items')) {
                for (let k = Math.max(0, i-2); k < Math.min(lines.length, i+6); k++) {
                    console.log((k+1) + ': ' + lines[k]);
                }
            }
        });
    }
}
