'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Đăng nhập thất bại');
            router.replace('/admin/questions');
            router.refresh();
        } catch (loginError) {
            setError(loginError.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 px-5 py-12 text-slate-100 flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-emerald-950/30">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl">🔐</div>
                    <h1 className="text-2xl font-bold">Quản trị ngân hàng câu hỏi</h1>
                    <p className="mt-2 text-sm text-slate-400">Edu-Farm · Tin Học Sao Việt</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-300">Tài khoản</span>
                        <input
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-300">Mật khẩu</span>
                        <input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            required
                        />
                    </label>
                    {error && (
                        <p role="alert" className="rounded-xl border border-red-900/60 bg-red-950/50 px-4 py-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}
                    <button
                        disabled={submitting}
                        className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"
                    >
                        {submitting ? 'Đang đăng nhập…' : 'Đăng nhập quản trị'}
                    </button>
                </form>
            </div>
        </main>
    );
}
