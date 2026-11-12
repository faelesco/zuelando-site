"use client";

import { supabase } from "../../lib/supabase";

export function AdminBar() {
    return (
        <div
            role="status"
            className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-stone-900 py-2 pl-4 pr-2 text-sm text-white shadow-xl"
        >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold">Modo administrador</span>
            <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-white/20"
            >
                Sair
            </button>
        </div>
    );
}
