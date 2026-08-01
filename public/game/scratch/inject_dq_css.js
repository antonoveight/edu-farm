const fs = require('fs');
let css = fs.readFileSync('public/game/css/style.css', 'utf8');

const DQ_CSS = `
        /* ========== DAILY QUEST SYSTEM ========== */
        .dq-header { display:flex; align-items:center; justify-content:space-between; }
        .dq-reset-badge { font-size:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:2px 8px; color:rgba(255,255,255,0.4); font-weight:700; }
        .dq-card { background:rgba(15,23,42,0.6); border:1.5px solid rgba(255,255,255,0.07); border-radius:14px; padding:10px 12px; display:flex; flex-direction:column; gap:6px; transition:border-color .3s, background .3s; }
        .dq-card.done    { border-color:rgba(34,197,94,0.35);  background:rgba(34,197,94,0.07); }
        .dq-card.claimed { border-color:rgba(255,255,255,0.05); opacity:0.5; }
        .dq-card.failed  { border-color:rgba(239,68,68,0.3);    background:rgba(239,68,68,0.05); }
        .dq-top   { display:flex; align-items:flex-start; gap:8px; }
        .dq-icon  { font-size:18px; flex-shrink:0; line-height:1; margin-top:1px; }
        .dq-info  { flex:1; min-width:0; }
        .dq-title { font-size:12px; font-weight:800; color:rgba(255,255,255,0.9); line-height:1.3; }
        .dq-desc  { font-size:10px; color:rgba(255,255,255,0.45); margin-top:1px; line-height:1.4; }
        .dq-badge { flex-shrink:0; font-size:9px; font-weight:900; padding:2px 7px; border-radius:20px; text-transform:uppercase; letter-spacing:.5px; }
        .dq-badge.easy   { background:rgba(34,197,94,0.15);  color:#4ade80; border:1px solid rgba(34,197,94,0.3); }
        .dq-badge.medium { background:rgba(251,191,36,0.15); color:#fbbf24; border:1px solid rgba(251,191,36,0.3); }
        .dq-badge.hard   { background:rgba(239,68,68,0.15);  color:#f87171; border:1px solid rgba(239,68,68,0.3); }
        .dq-prog-wrap { display:flex; align-items:center; gap:8px; }
        .dq-bar-outer { flex:1; height:5px; background:rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; }
        .dq-bar-inner { height:100%; border-radius:10px; background:linear-gradient(90deg, var(--primary-color), var(--primary-glow)); transition:width .4s cubic-bezier(.25,1,.5,1); }
        .dq-card.done .dq-bar-inner { background:linear-gradient(90deg,#22c55e,#4ade80); }
        .dq-count { font-size:10px; font-weight:800; color:rgba(255,255,255,0.5); white-space:nowrap; }
        .dq-card.done .dq-count { color:#4ade80; }
        .dq-footer { display:flex; align-items:center; justify-content:space-between; margin-top:2px; }
        .dq-reward { font-size:10px; color:rgba(255,255,255,0.4); display:flex; align-items:center; gap:4px; flex-wrap:wrap; }
        .dq-reward-tag { background:rgba(255,255,255,0.07); border-radius:8px; padding:2px 6px; font-weight:700; }
        .dq-claim-btn { font-size:10px; font-weight:900; padding:4px 12px; border-radius:20px; border:none; cursor:pointer; background:linear-gradient(135deg,#22c55e,#4ade80); color:#052e16; animation:dqPulse 1.5s ease-in-out infinite; letter-spacing:.5px; }
        .dq-claimed-tag { font-size:10px; color:rgba(255,255,255,0.3); font-weight:700; }
        .dq-failed-tag  { font-size:10px; color:rgba(239,68,68,0.6); font-weight:700; }
        @keyframes dqPulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4);} 50%{box-shadow:0 0 0 7px rgba(34,197,94,0);} }
        /* ========================================= */

`;

// Find insertion point before first .theme-eco block
const marker = '.theme-eco {';
const idx = css.indexOf(marker);
if (idx > -1) {
    css = css.slice(0, idx) + DQ_CSS + css.slice(idx);
    fs.writeFileSync('public/game/css/style.css', css, 'utf8');
    console.log('OK: inserted before .theme-eco at char ' + idx);
} else {
    // Append at end
    css = css + DQ_CSS;
    fs.writeFileSync('public/game/css/style.css', css, 'utf8');
    console.log('OK: appended at end');
}
