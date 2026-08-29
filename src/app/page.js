'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const subscribeToAuthChanges = (callback) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
};

const getAuthSnapshot = () => localStorage.getItem('isLoggedIn') === 'true'
    ? 'authenticated'
    : 'unauthenticated';
const getServerAuthSnapshot = () => 'loading';

export default function Home() {
    const router = useRouter();
    const authStatus = useSyncExternalStore(
        subscribeToAuthChanges,
        getAuthSnapshot,
        getServerAuthSnapshot
    );

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            router.push('/login');
        }
    }, [authStatus, router]);

    const [selectedGrade, setSelectedGrade] = useState('1');
    const [selectedWorld, setSelectedWorld] = useState('eco');

    if (authStatus !== 'authenticated') return null;

    const companions = {
        eco: {
            name: 'Cô Tiên Xanh 🧚‍♀️',
            avatar: '🧚‍♀️',
            desc: 'Hướng dẫn bé gieo trồng cải ngọt, cà chua và bảo vệ đảo sinh thái khỏi sâu bệnh.',
            bg: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
        },
        cyber: {
            name: 'Robo Chip 🤖',
            avatar: '🤖',
            desc: 'Đồng hành cùng bé trong trạm không gian công nghệ để chế tạo pin và chip AI.',
            bg: 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300'
        },
        magic: {
            name: 'Bé Phù Thủy 🧙‍♀️',
            avatar: '🧙‍♀️',
            desc: 'Đưa bé vào thế giới phép thuật thần kỳ để nuôi cấy nấm sáng và trứng rồng.',
            bg: 'bg-fuchsia-950/30 border-fuchsia-500/30 text-fuchsia-300'
        }
    };

    return (
        <main className="min-h-screen bg-[#090d16] text-[#f1f5f9] font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-black flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl w-full mx-auto px-6 py-12 relative z-10">
                
                <div className="absolute top-4 right-6 z-50">
                    <Link href="/stats" className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border border-slate-700 transition-colors text-sm font-bold shadow-lg">
                        <i className="fa-solid fa-chart-pie text-emerald-400"></i> Thống Kê Phụ Huynh
                    </Link>
                </div>

                {/* Header Area */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
                        EDU-FARM
                    </h1>
                    <p className="text-slate-400 uppercase tracking-widest text-sm mt-3 font-semibold">
                        Khóa Học Trực Quan Kết Hợp Game Nông Trại
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Select Options */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        {/* Grade Selector */}
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-400 mb-4">
                                <span>🎓</span> Chọn Khối Lớp Học
                            </h3>
                            <div className="grid grid-cols-5 gap-3">
                                {['1', '2', '3', '4', '5'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setSelectedGrade(g)}
                                        className={`py-3.5 rounded-2xl font-black text-lg transition-all duration-200 ${
                                            selectedGrade === g
                                                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-[1.03]'
                                                : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300'
                                        }`}
                                    >
                                        Lớp {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* World Selector */}
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-400 mb-4">
                                <span>🌏</span> Chọn Thế Giới Học Tập
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: 'eco', name: 'Đảo Sinh Thái', icon: '🌱' },
                                    { id: 'cyber', name: 'Trạm Công Nghệ', icon: '🤖' },
                                    { id: 'magic', name: 'Rừng Phép Thuật', icon: '🔮' }
                                ].map((world) => (
                                    <button
                                        key={world.id}
                                        onClick={() => setSelectedWorld(world.id)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl font-bold transition-all duration-300 ${
                                            selectedWorld === world.id
                                                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 scale-[1.03] border-transparent'
                                                : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300'
                                        }`}
                                    >
                                        <span className="text-2xl">{world.icon}</span>
                                        <span className="text-sm">{world.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Launch Buttons */}
                        <div className="flex gap-4">
                            <Link
                                href={`/play?grade=${selectedGrade}&world=${selectedWorld}`}
                                className="flex-1 text-center py-5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-black font-black text-xl rounded-3xl transition-all duration-300 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.01]"
                            >
                                🎮 VÀO NÔNG TRẠI HỌC TẬP
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Assistant Companion */}
                    <div className="flex flex-col justify-between">
                        {/* Companion Preview */}
                        <div className={`border rounded-3xl p-6 transition-all duration-500 shadow-xl flex flex-col items-center text-center gap-4 h-full justify-center ${companions[selectedWorld].bg}`}>
                            <div className="text-8xl animate-bounce filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] duration-1000 mb-2">
                                {companions[selectedWorld].avatar}
                            </div>
                            <h4 className="text-2xl font-black tracking-wide">
                                {companions[selectedWorld].name}
                            </h4>
                            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
                                {companions[selectedWorld].desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
