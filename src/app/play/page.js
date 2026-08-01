'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function GameIFrame() {
    const searchParams = useSearchParams();
    const grade = searchParams.get('grade') || '1';
    const world = searchParams.get('world') || 'eco';

    return (
        <iframe
            src={`/game/index.html?grade=${grade}&world=${world}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            title="Edu-Farm Game"
        />
    );
}

export default function PlayPage() {
    return (
        <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#090d16', color: '#f1f5f9' }}>
            {/* Top Navigation Bar */}
            <header className="flex-shrink-0 bg-slate-950/80 border-b border-slate-900 px-6 py-4 flex items-center justify-between backdrop-blur-md relative z-20">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500/50 border border-slate-700/80 rounded-xl text-xs font-bold transition-all text-slate-200"
                    >
                        <span>⬅</span> Quay Lại Dashboard
                    </Link>
                    <span className="h-6 w-[1.5px] bg-slate-800"></span>
                    <h2 className="text-sm font-black tracking-wider text-emerald-400">
                        EDU-FARM ĐANG CHẠY
                    </h2>
                </div>
                <div className="text-xs font-semibold text-slate-500">
                    Phần mềm hỗ trợ học tập tiểu học
                </div>
            </header>

            {/* Game iframe — inline style forces concrete height for iframe */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-slate-400 font-bold animate-pulse text-lg">Đang tải game...</div>
                    </div>
                }>
                    <GameIFrame />
                </Suspense>
            </div>
        </main>
    );
}
