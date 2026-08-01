const fs = require('fs');
let code = fs.readFileSync('src/app/page.js', 'utf8');

// Add imports
code = code.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';");

// Add auth check logic
const authLogic = `    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            router.push('/login');
        } else {
            setIsAuth(true);
        }
    }, [router]);

    if (!isAuth) return null;

`;
code = code.replace("const [selectedGrade, setSelectedGrade] = useState('1');", authLogic + "    const [selectedGrade, setSelectedGrade] = useState('1');");

// Add Stats button
const statsBtn = `
                <div className="absolute top-4 right-6 z-50">
                    <Link href="/stats" className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border border-slate-700 transition-colors text-sm font-bold shadow-lg">
                        <i className="fa-solid fa-chart-pie text-emerald-400"></i> Thống Kê Phụ Huynh
                    </Link>
                </div>
`;
code = code.replace('{/* Header Area */}', statsBtn + '\n                {/* Header Area */}');

fs.writeFileSync('src/app/page.js', code, 'utf8');
console.log('page.js updated');
