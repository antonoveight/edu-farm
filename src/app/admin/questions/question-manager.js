'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EMPTY_FORM = {
    grade: 1,
    subject: 'math',
    questionText: '',
    correctAnswer: '',
    choicesText: '',
    questionType: 'multiple_choice',
    learningObjective: '',
    difficulty: 'medium',
    status: 'draft',
    sourceType: 'manual',
    sourceRef: '',
    sourcePage: ''
};

const TYPE_LABELS = {
    multiple_choice: 'Trắc nghiệm',
    fill_blank: 'Điền chỗ trống',
    reorder: 'Sắp xếp',
    typing: 'Gõ đáp án',
    matching: 'Nối cặp',
    true_false: 'Đúng / Sai',
    find_error: 'Tìm lỗi sai',
    categorize: 'Phân loại',
    shortcut: 'Phím tắt'
};

const STATUS_LABELS = {
    draft: 'Bản nháp',
    published: 'Đã xuất bản',
    archived: 'Lưu trữ'
};

function toForm(question) {
    if (!question) return { ...EMPTY_FORM };
    return {
        ...question,
        choicesText: question.choices.join('\n'),
        learningObjective: question.learningObjective || '',
        sourceRef: question.sourceRef || '',
        sourcePage: question.sourcePage || ''
    };
}

async function readApiResponse(response) {
    let result;
    try {
        result = await response.json();
    } catch {
        result = {};
    }
    if (!response.ok) {
        const error = new Error(result.error || 'Yêu cầu không thể hoàn tất');
        error.status = response.status;
        throw error;
    }
    return result;
}

export default function QuestionManager({ username }) {
    const router = useRouter();
    const [metadata, setMetadata] = useState(null);
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
    const [filters, setFilters] = useState({
        grade: '', subject: '', status: '', type: '', search: '', page: 1
    });
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState(null);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [saving, setSaving] = useState(false);

    const handleApiError = useCallback((error) => {
        if (error.status === 401) {
            router.replace('/admin/login');
            router.refresh();
            return;
        }
        setNotice({ type: 'error', text: error.message });
    }, [router]);

    const loadMetadata = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/question-metadata', { cache: 'no-store' });
            setMetadata(await readApiResponse(response));
        } catch (error) {
            handleApiError(error);
        }
    }, [handleApiError]);

    const loadQuestions = useCallback(async (currentFilters) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(currentFilters.page),
                pageSize: '20'
            });
            for (const key of ['grade', 'subject', 'status', 'type', 'search']) {
                if (currentFilters[key]) params.set(key, currentFilters[key]);
            }
            const response = await fetch(`/api/admin/questions?${params}`, { cache: 'no-store' });
            const result = await readApiResponse(response);
            setItems(result.items);
            setPagination(result.pagination);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, [handleApiError]);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/admin/question-metadata', { cache: 'no-store' })
            .then(readApiResponse)
            .then((result) => {
                if (!cancelled) setMetadata(result);
            })
            .catch((error) => {
                if (!cancelled) handleApiError(error);
            });
        return () => {
            cancelled = true;
        };
    }, [handleApiError]);

    useEffect(() => {
        const timer = window.setTimeout(() => loadQuestions(filters), filters.search ? 300 : 0);
        return () => window.clearTimeout(timer);
    }, [filters, loadQuestions]);

    function updateFilter(name, value) {
        setFilters((current) => ({ ...current, [name]: value, page: 1 }));
    }

    function openCreate() {
        setForm({
            ...EMPTY_FORM,
            grade: filters.grade ? Number(filters.grade) : 1,
            subject: filters.subject || 'math'
        });
        setModal({ mode: 'create', id: null });
        setNotice(null);
    }

    function openEdit(question) {
        setForm(toForm(question));
        setModal({ mode: 'edit', id: question.id });
        setNotice(null);
    }

    function updateForm(name, value) {
        setForm((current) => ({ ...current, [name]: value }));
    }

    async function saveQuestion(event) {
        event.preventDefault();
        setSaving(true);
        setNotice(null);
        const payload = {
            ...form,
            grade: Number(form.grade),
            choices: form.choicesText.split('\n').map((choice) => choice.trim()).filter(Boolean),
            sourcePage: form.sourcePage ? Number(form.sourcePage) : null
        };

        try {
            const isEditing = modal.mode === 'edit';
            const response = await fetch(
                isEditing ? `/api/admin/questions/${modal.id}` : '/api/admin/questions',
                {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
            );
            await readApiResponse(response);
            setModal(null);
            setNotice({
                type: 'success',
                text: isEditing ? 'Đã cập nhật câu hỏi.' : 'Đã thêm câu hỏi mới.'
            });
            await Promise.all([loadQuestions(filters), loadMetadata()]);
        } catch (error) {
            handleApiError(error);
        } finally {
            setSaving(false);
        }
    }

    async function removeQuestion(question) {
        if (!window.confirm(`Xóa câu hỏi #${question.id}? Thao tác này sẽ ẩn câu hỏi khỏi ngân hàng.`)) return;
        try {
            const response = await fetch(`/api/admin/questions/${question.id}`, { method: 'DELETE' });
            await readApiResponse(response);
            setNotice({ type: 'success', text: 'Đã xóa câu hỏi.' });
            await Promise.all([loadQuestions(filters), loadMetadata()]);
        } catch (error) {
            handleApiError(error);
        }
    }

    async function syncLegacy() {
        setLoading(true);
        setNotice(null);
        try {
            const response = await fetch('/api/admin/questions/sync', { method: 'POST' });
            const result = await readApiResponse(response);
            setNotice({
                type: 'success',
                text: `Đồng bộ xong ${result.sync.discovered} câu: ${result.sync.inserted} thêm mới, ${result.sync.updated} cập nhật.`
            });
            await Promise.all([loadQuestions(filters), loadMetadata()]);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        await fetch('/api/admin/auth/logout', { method: 'POST' });
        router.replace('/admin/login');
        router.refresh();
    }

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <header className="border-b border-slate-800 bg-slate-950 text-white">
                <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">Edu-Farm Backend</p>
                        <h1 className="mt-1 text-2xl font-bold">Ngân hàng câu hỏi</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="hidden text-slate-400 sm:inline">Xin chào, {username}</span>
                        <button onClick={logout} className="rounded-lg border border-slate-700 px-3 py-2 font-bold hover:bg-slate-800">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        ['Tổng câu hỏi', metadata?.stats.total ?? '—', 'bg-slate-900 text-white'],
                        ['Đã xuất bản', metadata?.stats.published ?? '—', 'bg-emerald-600 text-white'],
                        ['Bản nháp', metadata?.stats.draft ?? '—', 'bg-amber-400 text-slate-950'],
                        ['Lưu trữ', metadata?.stats.archived ?? '—', 'bg-white text-slate-900']
                    ].map(([label, value, classes]) => (
                        <div key={label} className={`rounded-2xl border border-slate-200 p-5 shadow-sm ${classes}`}>
                            <p className="text-sm font-bold opacity-70">{label}</p>
                            <p className="mt-2 text-3xl font-extrabold">{value}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold">Quản lý câu hỏi</h2>
                            <p className="text-sm text-slate-500">Lọc theo khối lớp, môn học và trạng thái xuất bản.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={syncLegacy} disabled={loading} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 disabled:opacity-50">
                                ↻ Đồng bộ dữ liệu cũ
                            </button>
                            <button onClick={openCreate} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">
                                + Thêm câu hỏi
                            </button>
                        </div>
                    </div>

                    {notice && (
                        <div className={`mt-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
                            notice.type === 'error'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        }`}>
                            {notice.text}
                        </div>
                    )}

                    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
                        <input
                            value={filters.search}
                            onChange={(event) => updateFilter('search', event.target.value)}
                            placeholder="Tìm câu hỏi, đáp án…"
                            className="rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 xl:col-span-2"
                        />
                        <select value={filters.grade} onChange={(event) => updateFilter('grade', event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5">
                            <option value="">Tất cả khối lớp</option>
                            {metadata?.grades.map((grade) => <option key={grade.id} value={grade.id}>{grade.name}</option>)}
                        </select>
                        <select value={filters.subject} onChange={(event) => updateFilter('subject', event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5">
                            <option value="">Tất cả môn học</option>
                            {metadata?.subjects.map((subject) => <option key={subject.code} value={subject.code}>{subject.name}</option>)}
                        </select>
                        <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5">
                            <option value="">Mọi trạng thái</option>
                            {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                        <select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2.5">
                            <option value="">Mọi loại câu</option>
                            {Object.entries(TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                    </div>

                    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full min-w-[1000px] text-left text-sm">
                            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Khối / Môn</th>
                                    <th className="px-4 py-3">Câu hỏi</th>
                                    <th className="px-4 py-3">Đáp án</th>
                                    <th className="px-4 py-3">Loại</th>
                                    <th className="px-4 py-3">Trạng thái</th>
                                    <th className="px-4 py-3 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-500">Đang tải dữ liệu…</td></tr>
                                ) : items.length === 0 ? (
                                    <tr><td colSpan="7" className="px-4 py-12 text-center text-slate-500">Không có câu hỏi phù hợp.</td></tr>
                                ) : items.map((question) => (
                                    <tr key={question.id} className="align-top hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-xs text-slate-500">#{question.id}</td>
                                        <td className="px-4 py-4">
                                            <span className="font-bold">Lớp {question.grade}</span>
                                            <span className="mt-1 block text-slate-500">{question.subjectName}</span>
                                        </td>
                                        <td className="max-w-md px-4 py-4">
                                            <p className="line-clamp-3 font-semibold leading-6">{question.questionText}</p>
                                            {question.learningObjective && <p className="mt-1 line-clamp-1 text-xs text-slate-500">🎯 {question.learningObjective}</p>}
                                        </td>
                                        <td className="max-w-xs px-4 py-4 font-semibold text-emerald-700">{question.correctAnswer}</td>
                                        <td className="px-4 py-4 text-slate-600">{TYPE_LABELS[question.questionType] || question.questionType}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                                question.status === 'published'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : question.status === 'draft'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {STATUS_LABELS[question.status]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            <button onClick={() => openEdit(question)} className="rounded-lg px-3 py-2 font-bold text-blue-700 hover:bg-blue-50">Sửa</button>
                                            <button onClick={() => removeQuestion(question)} className="rounded-lg px-3 py-2 font-bold text-red-700 hover:bg-red-50">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                        <span>{pagination.total} câu hỏi · Trang {pagination.page}/{pagination.totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                disabled={pagination.page <= 1}
                                onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
                                className="rounded-lg border border-slate-300 px-3 py-2 font-bold disabled:opacity-40"
                            >← Trước</button>
                            <button
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
                                className="rounded-lg border border-slate-300 px-3 py-2 font-bold disabled:opacity-40"
                            >Sau →</button>
                        </div>
                    </div>
                </section>
            </div>

            {modal && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="mx-auto my-5 max-w-4xl rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                            <div>
                                <h2 className="text-xl font-bold">{modal.mode === 'edit' ? `Chỉnh sửa câu hỏi #${modal.id}` : 'Thêm câu hỏi mới'}</h2>
                                <p className="text-sm text-slate-500">Câu hỏi chỉ xuất hiện trong game khi ở trạng thái Đã xuất bản.</p>
                            </div>
                            <button onClick={() => setModal(null)} className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100" aria-label="Đóng">×</button>
                        </div>

                        <form onSubmit={saveQuestion} className="space-y-5 p-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Field label="Khối lớp">
                                    <select value={form.grade} onChange={(event) => updateForm('grade', event.target.value)} className="admin-input">
                                        {[1, 2, 3, 4, 5].map((grade) => <option key={grade} value={grade}>Lớp {grade}</option>)}
                                    </select>
                                </Field>
                                <Field label="Môn học">
                                    <select value={form.subject} onChange={(event) => updateForm('subject', event.target.value)} className="admin-input">
                                        {metadata?.subjects.map((subject) => <option key={subject.code} value={subject.code}>{subject.name}</option>)}
                                    </select>
                                </Field>
                                <Field label="Loại câu hỏi">
                                    <select value={form.questionType} onChange={(event) => updateForm('questionType', event.target.value)} className="admin-input">
                                        {Object.entries(TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                                    </select>
                                </Field>
                                <Field label="Trạng thái">
                                    <select value={form.status} onChange={(event) => updateForm('status', event.target.value)} className="admin-input">
                                        {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                                    </select>
                                </Field>
                            </div>

                            <Field label="Nội dung câu hỏi">
                                <textarea value={form.questionText} onChange={(event) => updateForm('questionText', event.target.value)} className="admin-input min-h-24" required />
                            </Field>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Field label="Đáp án đúng">
                                    <textarea value={form.correctAnswer} onChange={(event) => updateForm('correctAnswer', event.target.value)} className="admin-input min-h-24" required />
                                </Field>
                                <Field label="Các lựa chọn" hint="Mỗi đáp án một dòng. Trắc nghiệm cần ít nhất 2 dòng.">
                                    <textarea value={form.choicesText} onChange={(event) => updateForm('choicesText', event.target.value)} className="admin-input min-h-24" placeholder={'Đáp án A\nĐáp án B\nĐáp án C'} />
                                </Field>
                            </div>

                            <Field label="Mục tiêu học tập">
                                <input value={form.learningObjective} onChange={(event) => updateForm('learningObjective', event.target.value)} className="admin-input" placeholder="Ví dụ: Cộng các số trong phạm vi 10" />
                            </Field>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Field label="Độ khó">
                                    <select value={form.difficulty} onChange={(event) => updateForm('difficulty', event.target.value)} className="admin-input">
                                        <option value="easy">Dễ</option>
                                        <option value="medium">Trung bình</option>
                                        <option value="hard">Khó</option>
                                    </select>
                                </Field>
                                <Field label="Loại nguồn">
                                    <select value={form.sourceType} onChange={(event) => updateForm('sourceType', event.target.value)} className="admin-input">
                                        <option value="manual">Nhập thủ công</option>
                                        <option value="book">Sách giáo khoa</option>
                                        <option value="import">Dữ liệu nhập</option>
                                        {form.sourceType === 'legacy_json' && <option value="legacy_json">Dữ liệu cũ</option>}
                                    </select>
                                </Field>
                                <div className="lg:col-span-2">
                                    <Field label="Nguồn tham chiếu">
                                        <input value={form.sourceRef} onChange={(event) => updateForm('sourceRef', event.target.value)} className="admin-input" placeholder="Tên sách, bài học hoặc đường dẫn" />
                                    </Field>
                                </div>
                                <Field label="Trang nguồn">
                                    <input type="number" min="1" value={form.sourcePage} onChange={(event) => updateForm('sourcePage', event.target.value)} className="admin-input" />
                                </Field>
                            </div>

                            {notice?.type === 'error' && (
                                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{notice.text}</p>
                            )}

                            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                                <button type="button" onClick={() => setModal(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 font-bold hover:bg-slate-50">Hủy</button>
                                <button disabled={saving} className="rounded-xl bg-emerald-600 px-5 py-2.5 font-bold text-white hover:bg-emerald-500 disabled:opacity-50">
                                    {saving ? 'Đang lưu…' : 'Lưu câu hỏi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

function Field({ label, hint, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>
            {children}
            {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
        </label>
    );
}
