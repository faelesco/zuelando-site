"use client";

import { useState } from "react";

interface AdminAuthProps {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
}

export function AdminAuth({ isAdmin, setIsAdmin }: AdminAuthProps) {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (user === "admin" && password === "zuelando777") {
            setIsAdmin(true);
            setShowLogin(false);
            setUser("");
            setPassword("");
        } else {
            alert("Usuário ou senha incorretos!");
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
    };

    return (
        <>
            {isAdmin ? (
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-neutral-100">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
                        Modo Admin
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-bold text-neutral-500 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                        Sair
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowLogin(true)}
                    className="bg-white/80 backdrop-blur-md shadow-sm border border-neutral-100 text-neutral-400 hover:text-neutral-700 transition-all focus:outline-none p-3 rounded-full flex items-center justify-center hover:scale-105 active:scale-95"
                    title="Acesso Restrito"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </button>
            )}

            {showLogin && !isAdmin && (
                <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-left">
                    <form onSubmit={handleLogin} className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl w-full max-w-sm relative animate-in zoom-in-95 duration-200">
                        <button type="button" onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold mb-8 text-center text-neutral-900">Administrador do Zuelando</h2>
                        <input type="text" placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} className="w-full p-4 mb-4 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 transition-colors font-medium" />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 mb-8 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 transition-colors font-medium" />
                        <button type="submit" className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-md">Entrar</button>
                    </form>
                </div>
            )}
        </>
    );
}