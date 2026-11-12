"use client";

import { useRef, useState, type MouseEvent } from "react";
import { useAdmin } from "./admin/AdminProvider";
import { PainelAdmin, campoClass } from "./admin/ui";
import { supabase, urlPublicaStorage } from "../lib/supabase";

export interface FotoGaleria {
    id: string;
    imagem_url: string;
}

const LIMITE_BYTES = 50 * 1024 * 1024;
const EXTENSOES_VIDEO = /\.(mp4|webm|mov|ogg)$/i;

const isVideo = (url: string) => EXTENSOES_VIDEO.test(url);

function Lixeira() {
    return (
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    );
}

export function GaleriaMomentos({ fotosIniciais }: { fotosIniciais: FotoGaleria[] }) {
    const { isAdmin } = useAdmin();
    const [fotos, setFotos] = useState<FotoGaleria[]>(fotosIniciais);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [formularioAberto, setFormularioAberto] = useState(false);
    const [destaque, setDestaque] = useState<FotoGaleria | null>(null);
    const lightboxRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const abrirDestaque = (foto: FotoGaleria) => {
        setDestaque(foto);
        lightboxRef.current?.showModal();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0];
        e.target.value = "";
        if (!arquivo) return;

        if (arquivo.size > LIMITE_BYTES) {
            setErro("O arquivo é muito grande. Use uma mídia com menos de 50 MB.");
            return;
        }

        setEnviando(true);
        setErro(null);
        try {
            const ext = arquivo.name.split(".").pop()?.toLowerCase() ?? "jpg";
            const nome = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
            const { error: uploadError } = await supabase.storage.from("galeria").upload(nome, arquivo);
            if (uploadError) throw uploadError;

            const { data, error } = await supabase
                .from("galeria")
                .insert([{ imagem_url: urlPublicaStorage("galeria", nome) }])
                .select();
            if (error) throw error;

            if (data?.[0]) setFotos((lista) => [data[0] as FotoGaleria, ...lista]);
            setFormularioAberto(false);
        } catch {
            setErro("Não foi possível enviar o arquivo. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    };

    const handleRemover = async (foto: FotoGaleria, e: MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Remover esta mídia da galeria?")) return;

        const { error } = await supabase.from("galeria").delete().eq("id", foto.id);
        if (error) {
            window.alert("Não foi possível remover a mídia.");
            return;
        }
        const arquivo = foto.imagem_url.split("/").pop();
        if (arquivo) await supabase.storage.from("galeria").remove([arquivo]);
        setFotos((lista) => lista.filter((f) => f.id !== foto.id));
    };

    return (
        <div className="flex flex-col gap-6">
            {isAdmin && (
                <div>
                    {formularioAberto ? (
                        <PainelAdmin
                            titulo="Adicionar à galeria"
                            descricao="Fotos (JPG, PNG, WEBP) ou vídeos (MP4, WEBM, MOV), até 50 MB."
                            acao={
                                <button type="button" onClick={() => setFormularioAberto(false)} className="text-sm font-semibold text-stone-500 hover:text-stone-900">
                                    Fechar
                                </button>
                            }
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/png, image/jpeg, image/webp, video/mp4, video/webm, video/quicktime"
                                onChange={handleUpload}
                                disabled={enviando}
                                className={`${campoClass} file:mr-4 file:rounded-full file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-stone-700`}
                            />
                            {enviando && <p className="mt-3 text-sm font-semibold text-amber-700">Enviando... aguarde.</p>}
                        </PainelAdmin>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setFormularioAberto(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-stone-700"
                        >
                            + Adicionar mídia
                        </button>
                    )}
                    {erro && (
                        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {erro}
                        </p>
                    )}
                </div>
            )}

            {fotos.length > 0 ? (
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                    {fotos.map((foto) => {
                        const video = isVideo(foto.imagem_url);
                        return (
                            <li key={foto.id} className="group relative">
                                <button
                                    type="button"
                                    onClick={() => abrirDestaque(foto)}
                                    aria-label={video ? "Assistir vídeo da galeria" : "Ampliar foto da galeria"}
                                    className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                >
                                    {video ? (
                                        <>
                                            <video src={`${foto.imagem_url}#t=0.1`} preload="metadata" muted playsInline className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                            <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow">
                                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>
                                            </span>
                                        </>
                                    ) : (
                                        <img
                                            src={foto.imagem_url}
                                            alt="Momento do Zuelando"
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    )}
                                </button>

                                {isAdmin && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemover(foto, e)}
                                        aria-label="Remover mídia"
                                        title="Remover"
                                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-md transition-colors hover:bg-red-50"
                                    >
                                        <Lixeira />
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-14 text-center">
                    <p className="font-semibold text-stone-700">Em breve, novas fotos e vídeos.</p>
                    <p className="mt-1 text-sm text-stone-500">Acompanhe nossas redes para ver os momentos das nossas vivências.</p>
                </div>
            )}

            <dialog
                ref={lightboxRef}
                onClick={(e) => {
                    if (e.target === lightboxRef.current) lightboxRef.current?.close();
                }}
                onClose={() => setDestaque(null)}
                className="m-auto max-h-[92vh] w-[min(96vw,1100px)] rounded-2xl border-0 bg-transparent p-0 backdrop:bg-stone-950/85"
            >
                {destaque && (
                    <div className="relative flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => lightboxRef.current?.close()}
                            aria-label="Fechar"
                            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:-right-12 sm:top-0"
                        >
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                        {isVideo(destaque.imagem_url) ? (
                            <video src={destaque.imagem_url} controls autoPlay playsInline className="max-h-[85vh] w-full rounded-2xl bg-black object-contain" />
                        ) : (
                            <img src={destaque.imagem_url} alt="Momento do Zuelando" className="max-h-[85vh] w-auto rounded-2xl object-contain" />
                        )}
                    </div>
                )}
            </dialog>
        </div>
    );
}
