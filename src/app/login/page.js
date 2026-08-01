'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If already logged in, go to home
        if (localStorage.getItem('isLoggedIn') === 'true') {
            router.push('/');
        }
    }, [router]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/');
        }, 800);
    };

    return (
        <main className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

            <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                        EDU-FARM
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">Nền tảng học tập kết hợp nông trại</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Số điện thoại / Email</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="Nhập tài khoản phụ huynh"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Mật khẩu</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleLogin}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-user-plus"></i> ĐĂNG KÝ
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-right-to-bracket"></i>}
                            ĐĂNG NHẬP
                        </button>
                    </div>
                    <p className="text-center text-slate-500 text-xs mt-4">
                        Dùng chung một tài khoản cho Phụ huynh và Bé.
                    </p>
                </form>
            </div>
        </main>
    );
}
