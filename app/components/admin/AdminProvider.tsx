"use client";

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { AdminBar } from "./AdminBar";

interface AdminContextValue {
    isAdmin: boolean;
    abrirLogin: () => void;
}

const AdminContext = createContext<AdminContextValue>({ isAdmin: false, abrirLogin: () => {} });

export function useAdmin() {
    return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginAberto, setLoginAberto] = useState(false);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_evento, sessao) => {
            setIsAdmin(!!sessao);
        });
        return () => data.subscription.unsubscribe();
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin, abrirLogin: () => setLoginAberto(true) }}>
            {children}
            {!isAdmin && loginAberto && <AdminLoginDialog onFechar={() => setLoginAberto(false)} />}
            {isAdmin && <AdminBar />}
        </AdminContext.Provider>
    );
}

function AdminLoginDialog({ onFechar }: { onFechar: () => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) dialog.showModal();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEnviando(true);
        setErro(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        setEnviando(false);
        if (error) {
            setErro("E-mail ou senha incorretos.");
            return;
        }
        dialogRef.current?.close();
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={onFechar}
            onClick={(e) => {
                if (e.target === dialogRef.current) dialogRef.current?.close();
            }}
            aria-labelledby="titulo-login"
            className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border-0 bg-white p-0 text-stone-900 shadow-2xl backdrop:bg-stone-950/60 open:animate-[popup-in_200ms_ease-out]"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Área restrita</p>
                    <h2 id="titulo-login" className="mt-1 text-2xl font-extrabold tracking-tight text-stone-900">
                        Entrar como administrador
                    </h2>
                </div>

                <label className="flex flex-col gap-1.5 text-sm font-semibold text-stone-700">
                    E-mail
                    <input
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm font-normal text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-semibold text-stone-700">
                    Senha
                    <input
                        type="password"
                        autoComplete="current-password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm font-normal text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                </label>

                {erro && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {erro}
                    </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        className="rounded-full px-4 py-2.5 text-sm font-semibold text-stone-500 hover:text-stone-900"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={enviando}
                        className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
                    >
                        {enviando ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
