"use client";

import { useState } from "react";
import { PONTOS_DATA } from "../constants/musicPageData";

export function PontosList() {
    const [openId, setOpenId] = useState<string | null>(null);

    const togglePonto = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto z-10">
            {PONTOS_DATA.map((ponto) => {
                const isOpen = openId === ponto.id;

                return (
                    <div
                        key={ponto.id}
                        className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => togglePonto(ponto.id)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-[#111827] text-lg">{ponto.title}</span>
                                <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mt-1">
                                    {ponto.orixa}
                                </span>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 visible" : "grid-rows-[0fr] opacity-0 invisible"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5">
                                    <div className="pt-5 border-t border-gray-100">

                                        {ponto.audioUrl && (
                                            <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                                                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide px-1">
                                                    ▶ Dê play no Axé
                                                </p>
                                                <audio
                                                    controls
                                                    className="w-full h-10 outline-none"
                                                    src={ponto.audioUrl}
                                                >
                                                    Seu navegador não suporta o elemento de áudio.
                                                </audio>
                                            </div>
                                        )}
                                        <div className="text-gray-700 italic whitespace-pre-line leading-relaxed px-1">
                                            {ponto.lyrics}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}