"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { BackgroundElements } from "../components/BackgroundElements";
import { AdminAuth } from "../components/AdminAuth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface FotoGaleria {
    id: string;
    imagem_url: string;
}

export default function SobrePage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [fotos, setFotos] = useState<FotoGaleria[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        async function fetchFotos() {
            const { data } = await supabase
                .from("galeria")
                .select("*")
                .order("id", { ascending: false });

            if (data) setFotos(data);
        }
        fetchFotos();
    }, []);

    const handleFotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 50 * 1024 * 1024) {
            alert("O ficheiro é muito grande. Escolha uma mídia com menos de 50MB.");
            e.target.value = "";
            return;
        }

        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop()?.toLowerCase();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("galeria")
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("galeria")
                .getPublicUrl(fileName);

            const novaFotoData = {
                imagem_url: publicUrlData.publicUrl
            };

            const { data, error: insertError } = await supabase
                .from("galeria")
                .insert([novaFotoData])
                .select();

            if (insertError) throw insertError;

            if (data) {
                setFotos([data[0] as FotoGaleria, ...fotos]);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar o ficheiro.");
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    const handleRemoverFoto = async (id: string, url: string) => {
        if (!window.confirm("Tem certeza que deseja apagar esta mídia?")) return;

        try {
            await supabase.from("galeria").delete().eq("id", id);

            const fileName = url.split("/").pop();
            if (fileName) {
                await supabase.storage.from("galeria").remove([fileName]);
            }

            setFotos(fotos.filter(f => f.id !== id));
        } catch (error) {
            alert("Erro ao remover a mídia.");
        }
    };

    const isVideoUrl = (url: string) => {
        return url.match(/\.(mp4|webm|mov|ogg)$/i) !== null;
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden px-4 sm:px-6 py-8 sm:py-12">
            <BackgroundElements />

            <div className="z-50 w-full max-w-4xl flex justify-between items-center mb-8 sm:mb-12 relative">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium transition-colors bg-white/80 backdrop-blur-md sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-full shadow-sm sm:shadow-none border border-neutral-100 sm:border-transparent"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span className="hidden sm:inline">Voltar ao Início</span>
                    <span className="sm:hidden">Voltar</span>
                </Link>

                <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            </div>

            <div className="z-10 w-full max-w-4xl flex flex-col items-center">

                <div className="text-center mb-10 sm:mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 uppercase">
                        Nossa História
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-medium leading-relaxed px-4">
                        Conheça a raiz do Zuelando e a importância sagrada dos Ogãs na manutenção do axé.
                    </p>
                </div>

                <div className="w-full max-w-3xl space-y-6 sm:space-y-8 mb-16">

                    <div className="bg-white/90 backdrop-blur-md border border-neutral-100 rounded-3xl p-6 sm:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                        <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                            <span className="text-3xl">🌿</span> O Projeto Zuelando
                        </h2>
                        <div className="text-neutral-700 leading-relaxed space-y-4 text-base sm:text-lg font-medium">
                            <p>
                                Zuelar é uma palavra de origem banto que significa falar, cantar, louvar.
                            </p>
                            <p>
                                Nosso propósito é levar a ancestralidade, o ritmo e a modernidade, mantendo vivo o axé em cada toque e em cada canto, respeitando as tradições que nos foram passadas.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md border border-neutral-100 rounded-3xl p-6 sm:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                        <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
                            <span className="text-3xl">🪘</span> A Força dos Ogãs
                        </h2>
                        <div className="text-neutral-700 leading-relaxed space-y-4 text-base sm:text-lg font-medium">
                            <p>
                                O Ogã é o sacerdote responsável por manter a energia vital (axé) girando através do toque e do canto. É o pilar de sustentação ritualística dentro do terreiro.
                            </p>
                            <p>
                                Sem o atabaque, não há festa. Sem a voz do Ogã, a energia não se firma. É um cargo de extrema confiança, respeito e responsabilidade, onde as mãos e a voz são instrumentos do sagrado.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md border border-neutral-100 rounded-3xl p-6 sm:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#0f172a] mb-2 flex items-center gap-3">
                                    <span className="text-3xl">📷</span> Momentos Zuelando
                                </h2>
                                <p className="text-neutral-600 font-medium">Um pouco da nossa jornada em imagens e vídeos.</p>
                            </div>

                            {isAdmin && (
                                <div className="relative shrink-0">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp, video/mp4, video/webm, video/quicktime"
                                        onChange={handleFotoUpload}
                                        disabled={isUploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                        title="Adicionar nova mídia"
                                    />
                                    <button
                                        disabled={isUploading}
                                        className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-500 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center gap-2"
                                    >
                                        {isUploading ? (
                                            "A enviar..."
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                Nova Mídia
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {fotos.map((foto) => {
                                const isVideo = isVideoUrl(foto.imagem_url);

                                return (
                                    <div key={foto.id} className="group relative aspect-square bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all">

                                        {isVideo ? (
                                            <video
                                                src={foto.imagem_url}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <img
                                                src={foto.imagem_url}
                                                alt="Momento Zuelando"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        )}

                                        {isVideo && (
                                            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                            </div>
                                        )}

                                        {isAdmin && (
                                            <button
                                                onClick={(e) => { e.preventDefault(); handleRemoverFoto(foto.id, foto.imagem_url); }}
                                                className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-md text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl shadow-sm transition-all opacity-0 group-hover:opacity-100 z-20"
                                                title="Remover Mídia"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {fotos.length === 0 && !isUploading && (
                            <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-2xl">
                                <span className="text-3xl mb-2">🎞️</span>
                                <p className="text-neutral-500 font-medium">A galeria está vazia.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}