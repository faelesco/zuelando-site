"use client";

import { useAdmin } from "./AdminProvider";

export function AdminButton() {
    const { isAdmin, abrirLogin } = useAdmin();
    if (isAdmin) return null;

    return (
        <button
            type="button"
            onClick={abrirLogin}
            title="Acesso restrito"
            aria-label="Acesso restrito"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 transition-colors hover:border-stone-300 hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        </button>
    );
}
