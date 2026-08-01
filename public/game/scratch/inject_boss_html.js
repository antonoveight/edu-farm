const fs = require('fs');
let html = fs.readFileSync('public/game/index.html', 'utf8');

// 1. Update Boss Section
let bossSection = html.match(/<div class="arena-intro-card w-full max-w-lg">[\s\S]*?<\/div>\s*<\/div>/)[0];

const newBossSection = `
<div class="arena-intro-card w-full max-w-lg relative">
    <div class="absolute top-2 right-2">
        <button onclick="openBossConfig()" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
            <i class="fa-solid fa-gear"></i> Cài đặt (Phụ huynh)
        </button>
    </div>
    <div class="boss-icon-lg"><i class="fa-solid fa-ghost"></i></div>
    <h2 class="text-2xl font-black text-rose-500 uppercase tracking-widest mt-2">Sâu Róm Tuần Khổng Lồ</h2>
    <p class="text-sm opacity-80 leading-relaxed max-w-md mx-auto mb-2">
        Chú sâu khổng lồ đang đe dọa nuốt chửng toàn bộ mùa màng của trang trại! Hãy khởi động thử thách giải toán nhanh (60s) để đẩy lùi thế lực bóng tối!
    </p>
    <div id="boss-time-status" class="text-sm font-bold text-slate-400 mb-2">Đang tải lịch...</div>
    <button id="btn-boss-start" class="btn-start !bg-rose-500 hover:!bg-rose-600 !text-white w-full max-w-xs mt-2" onclick="startBossBattle()">
        KHỞI TRANH ĐẤU TRƯỜNG <i class="fa-solid fa-bolt ml-1"></i>
    </button>
</div>
`;
html = html.replace(/<div class="arena-intro-card w-full max-w-lg">[\s\S]*?<\/div>\s*<\/div>/, newBossSection + '\n                    </div>');

// 2. Add Modal Boss Config
const modalConfig = `
    <!-- Modal Cấu hình Giờ Boss (Phụ huynh) -->
    <div id="modal-boss-config" class="modal-overlay hidden" style="z-index: 100;">
        <div class="modal-card max-w-sm" style="border-color: #f43f5e; box-shadow: 0 0 20px rgba(244, 63, 94, 0.2);">
            <h2 class="text-xl font-black text-rose-500 mb-2"><i class="fa-solid fa-clock"></i> Lịch Đấu Trường Boss</h2>
            
            <div id="boss-pin-section">
                <p class="text-sm text-slate-300 mb-4">Vui lòng nhập mã PIN của Phụ huynh để thay đổi cài đặt.</p>
                <input type="password" id="boss-pin-input" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-center text-xl tracking-widest text-white mb-2 focus:border-rose-500 outline-none" placeholder="------" maxlength="6">
                <p id="boss-pin-error" class="text-xs text-rose-500 hidden mb-4">Mã PIN không đúng!</p>
                <div class="flex gap-3 mt-4">
                    <button class="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl transition-all" onclick="closeBossConfig()">Đóng</button>
                    <button class="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl transition-all" onclick="verifyParentPin()">Xác nhận</button>
                </div>
            </div>

            <div id="boss-schedule-section" class="hidden">
                <p class="text-sm text-slate-300 mb-4">Thiết lập khoảng thời gian bé được phép tham gia Đấu Trường Boss hàng ngày.</p>
                <div class="flex gap-4 items-center mb-4">
                    <div class="flex-1">
                        <label class="block text-xs font-bold text-slate-400 mb-1">Giờ bắt đầu</label>
                        <input type="time" id="boss-start-time" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-rose-500 outline-none">
                    </div>
                    <div class="text-slate-500 font-black">-</div>
                    <div class="flex-1">
                        <label class="block text-xs font-bold text-slate-400 mb-1">Giờ kết thúc</label>
                        <input type="time" id="boss-end-time" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-rose-500 outline-none">
                    </div>
                </div>
                <div class="flex gap-3 mt-6">
                    <button class="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl transition-all" onclick="closeBossConfig()">Hủy</button>
                    <button class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl transition-all" onclick="saveBossSchedule()">Lưu Cài Đặt</button>
                </div>
            </div>
        </div>
    </div>
`;

html = html.replace('<!-- Overlay Màn hình đen khi Reset -->', modalConfig + '\n    <!-- Overlay Màn hình đen khi Reset -->');

fs.writeFileSync('public/game/index.html', html, 'utf8');
console.log('HTML Boss Config Added');
