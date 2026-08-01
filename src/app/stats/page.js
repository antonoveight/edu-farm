'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StatsPage() {
    const [view, setView] = useState('LOADING'); // LOADING, SETUP, LOCKED, DASHBOARD
    const [pinInput, setPinInput] = useState('');
    const [pinConfirm, setPinConfirm] = useState('');
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        math_correct: 0,
        math_wrong: 0,
        crops_harvested: 0,
        boss_wins: 0,
        coins_earned: 0
    });

    useEffect(() => {
        const savedPin = localStorage.getItem('parent_pin');
        if (!savedPin) {
            setView('SETUP');
        } else {
            setView('LOCKED');
        }

        // Load stats
        const savedStats = localStorage.getItem('edufarm_global_stats');
        if (savedStats) {
            try {
                setStats(JSON.parse(savedStats));
            } catch(e) {}
        }
    }, []);

    const handleSetupPin = () => {
        if (pinInput.length < 4) {
            setError('Mã PIN phải có ít nhất 4 số');
            return;
        }
        if (pinInput !== pinConfirm) {
            setError('Mã xác nhận không khớp');
            return;
        }
        localStorage.setItem('parent_pin', pinInput);
        setView('DASHBOARD');
    };

    const handleUnlock = () => {
        const savedPin = localStorage.getItem('parent_pin');
        if (pinInput === savedPin) {
            setView('DASHBOARD');
        } else {
            setError('Mã PIN không đúng');
        }
    };

    const totalMath = stats.math_correct + stats.math_wrong;
    const accuracy = totalMath > 0 ? Math.round((stats.math_correct / totalMath) * 100) : 0;

    if (view === 'LOADING') return <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center">Đang tải...</div>;

    return (
        <main className="min-h-screen bg-[#090d16] text-[#f1f5f9] font-sans p-6 relative">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

            <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
            </Link>

            {view === 'SETUP' && (
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center">
                        <h2 className="text-2xl font-black text-emerald-400 mb-2">Tạo Mã PIN</h2>
                        <p className="text-sm text-slate-400 mb-6">Mã này giúp bảo vệ khu vực Thống kê, chỉ dành cho Phụ huynh.</p>
                        
                        <input type="password" placeholder="Nhập PIN (VD: 1234)" value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center tracking-widest text-xl mb-4 focus:border-emerald-500 outline-none" />
                        <input type="password" placeholder="Xác nhận mã PIN" value={pinConfirm} onChange={(e) => setPinConfirm(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center tracking-widest text-xl mb-2 focus:border-emerald-500 outline-none" />
                        
                        {error && <p className="text-rose-400 text-xs mb-4">{error}</p>}
                        
                        <button onClick={handleSetupPin} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl mt-2 transition-all">Lưu Mã PIN</button>
                    </div>
                </div>
            )}

            {view === 'LOCKED' && (
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center">
                        <div className="text-4xl mb-4 text-slate-600"><i className="fa-solid fa-lock"></i></div>
                        <h2 className="text-2xl font-black text-cyan-400 mb-2">Khu Vực Phụ Huynh</h2>
                        <p className="text-sm text-slate-400 mb-6">Vui lòng nhập mã PIN để xem thống kê học tập.</p>
                        
                        <input type="password" placeholder="----" value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center tracking-widest text-2xl mb-2 focus:border-cyan-500 outline-none" />
                        
                        {error && <p className="text-rose-400 text-xs mb-4">{error}</p>}
                        
                        <button onClick={handleUnlock} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl mt-4 transition-all">Mở Khóa</button>
                    </div>
                </div>
            )}

            {view === 'DASHBOARD' && (
                <div className="max-w-5xl mx-auto mt-12 relative z-10">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-4xl font-black text-white flex items-center gap-3">
                                <i className="fa-solid fa-chart-pie text-emerald-400"></i> Báo Cáo Học Tập
                            </h1>
                            <p className="text-slate-400 mt-2">Tổng hợp kết quả học tập và chơi game của bé</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* C 1 */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
                            <div className="text-slate-500 mb-2 font-bold text-sm uppercase">Tỷ lệ trả lời đúng</div>
                            <div className="text-4xl font-black text-emerald-400">{accuracy}%</div>
                            <div className="text-xs text-slate-400 mt-2">Trên tổng số {totalMath} câu hỏi</div>
                            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5"><i className="fa-solid fa-check-double"></i></div>
                        </div>

                        {/* C 2 */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
                            <div className="text-slate-500 mb-2 font-bold text-sm uppercase">Xu kiếm được</div>
                            <div className="text-4xl font-black text-amber-400">{stats.coins_earned}</div>
                            <div className="text-xs text-slate-400 mt-2">Từ nông sản và nhiệm vụ</div>
                            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5"><i className="fa-solid fa-coins"></i></div>
                        </div>

                        {/* C 3 */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
                            <div className="text-slate-500 mb-2 font-bold text-sm uppercase">Nông sản thu hoạch</div>
                            <div className="text-4xl font-black text-green-400">{stats.crops_harvested}</div>
                            <div className="text-xs text-slate-400 mt-2">Tổng củ cải, cà chua...</div>
                            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5"><i className="fa-solid fa-seedling"></i></div>
                        </div>

                        {/* C 4 */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
                            <div className="text-slate-500 mb-2 font-bold text-sm uppercase">Boss đã tiêu diệt</div>
                            <div className="text-4xl font-black text-rose-500">{stats.boss_wins}</div>
                            <div className="text-xs text-slate-400 mt-2">Bảo vệ nông trại thành công</div>
                            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5"><i className="fa-solid fa-ghost"></i></div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
