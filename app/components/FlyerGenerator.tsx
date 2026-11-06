"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import * as htmlToImage from "html-to-image";

interface FlyerProps {
    titulo: string;
    dataTexto: string;
    local: string;
}

export function FlyerGenerator({ titulo, dataTexto, local }: FlyerProps) {
    const flyerRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePartilhar = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!flyerRef.current) return;

        setIsGenerating(true);

        try {
            const dataUrl = await htmlToImage.toPng(flyerRef.current, {
                quality: 1,
                pixelRatio: 2,
            });

            const file = new File([await (await fetch(dataUrl)).blob()], "zuelando-evento.png", { type: "image/png" });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: titulo,
                    text: `Vem aí: ${titulo}! Zuelando 🌿`,
                });
            } else {
                const link = document.createElement('a');
                link.download = `Flyer-${titulo.replace(/\s+/g, '-')}.png`;
                link.href = dataUrl;
                link.click();
            }
        } catch (error) {
            console.error(error);
            alert("Não foi possível gerar o flyer. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const flyerContent = (
        <div className="fixed -left-[9999px] top-0 pointer-events-none">
            <div
                ref={flyerRef}
                className="w-[1080px] h-[1920px] flex flex-col items-center justify-center p-20 text-center relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #f97316 0%, transparent 70%)' }}></div>

                <h2 className="text-white/90 text-[80px] font-black mb-16 uppercase tracking-[0.3em] z-10 relative">
                    Zuelando
                </h2>

                <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 p-24 rounded-[4rem] w-full shadow-2xl relative z-10 flex flex-col items-center">
                    <span className="text-orange-400 text-[50px] font-bold uppercase tracking-wider mb-6">Próximo Evento</span>

                    <h3 className="text-white text-[110px] font-extrabold leading-tight mb-12 drop-shadow-lg">
                        {titulo}
                    </h3>

                    <div className="flex flex-col gap-6 items-center bg-black/30 p-10 rounded-3xl w-full border border-white/10">
                        <p className="text-white text-[60px] font-bold flex items-center gap-4">
                            🗓️ {dataTexto || "Em breve"}
                        </p>
                        <p className="text-white/80 text-[45px] font-medium flex items-center gap-4">
                            📍 {local}
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-24 flex flex-col items-center gap-4 z-10">
                    <p className="text-white/50 text-[40px] tracking-widest font-medium uppercase">
                        Ancestralidade & Ritmo
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={handlePartilhar}
                disabled={isGenerating}
                title="Partilhar no Story"
                className="p-2 text-neutral-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors flex items-center justify-center shrink-0 z-20"
            >
                {isGenerating ? (
                    <span className="animate-spin text-pink-500">⏳</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                )}
            </button>

            {mounted && createPortal(flyerContent, document.body)}
        </>
    );
}