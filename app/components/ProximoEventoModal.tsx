"use client";

import { useEffect, useRef, useState } from "react";
import type { Evento } from "../lib/eventos";
import { dataDoEvento } from "../lib/eventos";
import { gerarFlyerPng } from "../lib/flyer";
import {
    INSTAGRAM_URL,
    baixarBlob,
    compartilharNativo,
    linkWhatsApp,
    nomeArquivoFlyer,
    textoCompartilhar,
} from "../lib/compartilhar";

const CHAVE_SESSAO = "zuelando:popup-evento:";

interface Props {
    evento: Evento;
}

/**
 * Abre automaticamente ao entrar na home, uma vez por sessão e por evento,
 * com o próximo evento e botões para compartilhar no Instagram e no WhatsApp.
 */
export function ProximoEventoModal({ evento }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const flyerRef = useRef<Promise<Blob | null> | null>(null);
    const [aviso, setAviso] = useState<{ texto: string; link?: boolean } | null>(null);
    const [ocupado, setOcupado] = useState(false);

    const texto = textoCompartilhar(evento);
    const data = dataDoEvento(evento);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        let jaVisto = false;
        try {
            jaVisto = sessionStorage.getItem(CHAVE_SESSAO + evento.id) === "1";
        } catch {
            // Armazenamento bloqueado: o popup abre normalmente.
        }
        if (jaVisto) return;

        const timer = window.setTimeout(() => {
            if (!dialog.open) dialog.showModal();
            try {
                sessionStorage.setItem(CHAVE_SESSAO + evento.id, "1");
            } catch {
                // Ignora.
            }
            // Prepara a imagem enquanto o usuário lê, para o clique ser imediato.
            flyerRef.current = gerarFlyerPng(evento).catch(() => null);
        }, 700);

        return () => window.clearTimeout(timer);
    }, [evento]);

    const fechar = () => dialogRef.current?.close();

    const obterImagem = async (): Promise<Blob | null> => {
        if (!flyerRef.current) flyerRef.current = gerarFlyerPng(evento).catch(() => null);
        return flyerRef.current;
    };

    const handleInstagram = async () => {
        setOcupado(true);
        setAviso(null);
        const blob = await obterImagem();

        if (blob) {
            const resultado = await compartilharNativo(blob, nomeArquivoFlyer(evento), {
                title: evento.titulo,
                text: texto,
            });
            if (resultado === "compartilhado" || resultado === "cancelado") {
                setOcupado(false);
                return;
            }
            baixarBlob(blob, nomeArquivoFlyer(evento));
            setAviso({
                texto: "Imagem salva no seu aparelho. Abra o Instagram e poste no seu Story.",
                link: true,
            });
        } else {
            setAviso({
                texto: "Não foi possível gerar a imagem. Abra o Instagram e publique manualmente.",
                link: true,
            });
        }
        setOcupado(false);
    };

    const handleWhatsApp = async () => {
        setOcupado(true);
        setAviso(null);
        const blob = await obterImagem();

        if (blob) {
            const resultado = await compartilharNativo(blob, nomeArquivoFlyer(evento), {
                title: evento.titulo,
                text: texto,
            });
            if (resultado === "compartilhado" || resultado === "cancelado") {
                setOcupado(false);
                return;
            }
        }
        window.open(linkWhatsApp(texto), "_blank", "noopener,noreferrer");
        setOcupado(false);
    };

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="popup-evento-titulo"
            onClick={(e) => {
                if (e.target === dialogRef.current) fechar();
            }}
            onClose={() => setAviso(null)}
            className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border-0 bg-white p-0 text-stone-900 shadow-2xl backdrop:bg-stone-950/60 open:animate-[popup-in_220ms_ease-out]"
        >
            <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 px-7 pb-8 pt-9 text-stone-50">
                <button
                    type="button"
                    onClick={fechar}
                    aria-label="Fechar"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-stone-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Próximo evento</p>
                <h2 id="popup-evento-titulo" className="mt-2 pr-8 text-2xl font-extrabold leading-tight sm:text-3xl">
                    {evento.titulo}
                </h2>
                <div className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-stone-200">
                    <span>📅 {data}</span>
                    <span>📍 {evento.local}</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-7 pb-7 pt-6">
                <p className="text-sm font-semibold text-stone-600">Chame a galera para o axé:</p>

                <button
                    type="button"
                    onClick={handleInstagram}
                    disabled={ocupado}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Compartilhar no Instagram
                </button>

                <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={ocupado}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Compartilhar no WhatsApp
                </button>

                {aviso && (
                    <p role="status" className="rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-700">
                        {aviso.texto}
                        {aviso.link && (
                            <>
                                {" "}
                                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-pink-700 underline underline-offset-2">
                                    Abrir Instagram
                                </a>
                            </>
                        )}
                    </p>
                )}

                <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <a href="#agenda" onClick={fechar} className="font-semibold text-stone-500 hover:text-stone-900">
                        Ver todos os eventos
                    </a>
                    <button type="button" onClick={fechar} className="font-semibold text-stone-500 hover:text-stone-900">
                        Agora não
                    </button>
                </div>
            </div>
        </dialog>
    );
}
