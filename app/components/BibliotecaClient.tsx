"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAdmin } from "./admin/AdminProvider";
import { AdminButton } from "./admin/AdminButton";
import { PainelAdmin, Campo, campoClass, botaoPrimarioClass } from "./admin/ui";
import { supabase, urlPublicaStorage } from "../lib/supabase";

export interface Musica {
    id: string;
    titulo: string;
    categoria?: string | null;
    letra: string;
    audio_url?: string | null;
}

const LIMITE_AUDIO_BYTES = 15 * 1024 * 1024;

function PontoCard({
    musica,
    isAdmin,
    onRemover,
}: {
    musica: Musica;
    isAdmin: boolean;
    onRemover: () => void;
}) {
    const [aberto, setAberto] = useState(false);

    return (
        <article className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
            <button
                type="button"
                aria-expanded={aberto}
                onClick={() => setAberto((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-600 sm:px-7"
            >
                <div className="flex min-w-0 flex-col gap-1">
                    {musica.categoria && (
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{musica.categoria}</span>
                    )}
                    <h3 className="text-lg font-extrabold leading-snug text-stone-900 sm:text-xl">{musica.titulo}</h3>
                </div>
                <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-stone-400 transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {aberto && (
                <div className="border-t border-stone-100 px-5 pb-7 pt-5 sm:px-7">
                    {musica.audio_url && (
                        <div className="mb-6 rounded-xl bg-stone-50 p-4">
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-stone-500">Ouça o ponto</p>
                            <audio controls preload="none" className="h-10 w-full" src={musica.audio_url}>
                                Seu navegador não suporta áudio.
                            </audio>
                        </div>
                    )}

                    <p className="whitespace-pre-line text-base leading-relaxed text-stone-700 sm:text-lg">{musica.letra}</p>

                    {isAdmin && (
                        <div className="mt-6 flex justify-end border-t border-stone-100 pt-4">
                            <button
                                type="button"
                                onClick={onRemover}
                                className="rounded-full px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                            >
                                Remover ponto
                            </button>
                        </div>
                    )}
                </div>
            )}
        </article>
    );
}

export function BibliotecaClient({ pontosIniciais }: { pontosIniciais: Musica[] }) {
    const { isAdmin } = useAdmin();
    const [musicas, setMusicas] = useState<Musica[]>(pontosIniciais);
    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("");
    const [novaLetra, setNovaLetra] = useState("");
    const [novoAudio, setNovoAudio] = useState<File | null>(null);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [formularioAberto, setFormularioAberto] = useState(false);

    const limparFormulario = () => {
        setNovoTitulo("");
        setNovaCategoria("");
        setNovaLetra("");
        setNovoAudio(null);
        const input = document.getElementById("audio-upload") as HTMLInputElement | null;
        if (input) input.value = "";
    };

    const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setErro(null);
        if (file && file.size > LIMITE_AUDIO_BYTES) {
            setErro("O áudio é muito grande. Use um arquivo com menos de 15 MB.");
            e.target.value = "";
            setNovoAudio(null);
            return;
        }
        setNovoAudio(file);
    };

    const handleAdicionar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!novoTitulo.trim() || !novaLetra.trim()) return;

        setEnviando(true);
        setErro(null);
        let audioUrl: string | null = null;

        try {
            if (novoAudio) {
                const ext = novoAudio.name.split(".").pop()?.toLowerCase() ?? "mp3";
                const nomeArquivo = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
                const { error: uploadError } = await supabase.storage.from("audios").upload(nomeArquivo, novoAudio);
                if (uploadError) throw uploadError;
                audioUrl = urlPublicaStorage("audios", nomeArquivo);
            }

            const { data, error } = await supabase
                .from("pontos")
                .insert([{ titulo: novoTitulo.trim(), categoria: novaCategoria.trim().toUpperCase(), letra: novaLetra, audio_url: audioUrl }])
                .select();
            if (error) throw error;

            if (data?.[0]) setMusicas((lista) => [data[0] as Musica, ...lista]);
            limparFormulario();
            setFormularioAberto(false);
        } catch {
            setErro("Não foi possível salvar o ponto. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    };

    const handleRemover = async (musica: Musica) => {
        if (!window.confirm(`Remover o ponto "${musica.titulo}"?`)) return;

        const { error } = await supabase.from("pontos").delete().eq("id", musica.id);
        if (error) {
            window.alert("Não foi possível remover o ponto.");
            return;
        }
        if (musica.audio_url) {
            const arquivo = musica.audio_url.split("/").pop();
            if (arquivo) await supabase.storage.from("audios").remove([arquivo]);
        }
        setMusicas((lista) => lista.filter((m) => m.id !== musica.id));
    };

    return (
        <div className="mx-auto w-full max-w-3xl">
            <header className="mb-10 flex items-center justify-between gap-4">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Voltar ao início
                </Link>
                <AdminButton />
            </header>

            <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Acervo</p>
                <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-stone-900 sm:text-5xl">Biblioteca de pontos</h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                    Os pontos de umbanda são os cânticos sagrados dessa religião afro-brasileira, com diversas funções: homenagear uma entidade ou convidá-la ao convívio no terreiro. Explore as letras e cantos da nossa tradição.
                </p>
            </div>

            {isAdmin && (
                <div className="mb-8">
                    {formularioAberto ? (
                        <PainelAdmin
                            titulo="Novo ponto"
                            descricao="Preencha a letra e, se quiser, anexe o áudio do ponto."
                            acao={
                                <button type="button" onClick={() => setFormularioAberto(false)} className="text-sm font-semibold text-stone-500 hover:text-stone-900">
                                    Fechar
                                </button>
                            }
                        >
                            <form onSubmit={handleAdicionar} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Campo rotulo="Título" obrigatorio className="sm:col-span-2">
                                    <input className={campoClass} placeholder="Ex.: Se meu pai é Ogum" value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} disabled={enviando} required />
                                </Campo>
                                <Campo rotulo="Categoria / entidade" className="sm:col-span-2">
                                    <input className={`${campoClass} uppercase`} placeholder="Ex.: OGUM" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} disabled={enviando} />
                                </Campo>
                                <Campo rotulo="Letra" obrigatorio className="sm:col-span-2">
                                    <textarea className={campoClass} rows={6} value={novaLetra} onChange={(e) => setNovaLetra(e.target.value)} disabled={enviando} required />
                                </Campo>
                                <Campo rotulo="Áudio (MP3, WAV ou OGG, até 15 MB)" className="sm:col-span-2">
                                    <input
                                        id="audio-upload"
                                        type="file"
                                        accept="audio/mp3, audio/mpeg, audio/wav, audio/ogg"
                                        onChange={handleAudio}
                                        disabled={enviando}
                                        className="w-full text-sm text-stone-600 file:mr-4 file:rounded-full file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-stone-700 disabled:opacity-60"
                                    />
                                </Campo>

                                {erro && (
                                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                                        {erro}
                                    </p>
                                )}

                                <div className="sm:col-span-2 sm:flex sm:justify-end">
                                    <button type="submit" disabled={enviando} className={`${botaoPrimarioClass} w-full sm:w-auto`}>
                                        {enviando ? "Enviando (o áudio pode levar um tempo)..." : "Publicar ponto"}
                                    </button>
                                </div>
                            </form>
                        </PainelAdmin>
                    ) : (
                        <button type="button" onClick={() => setFormularioAberto(true)} className={botaoPrimarioClass}>
                            + Novo ponto
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-3">
                {musicas.map((musica) => (
                    <PontoCard key={musica.id} musica={musica} isAdmin={isAdmin} onRemover={() => handleRemover(musica)} />
                ))}
            </div>

            {musicas.length === 0 && (
                <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-sm text-stone-500">
                    A biblioteca de pontos está vazia no momento.
                </p>
            )}
        </div>
    );
}
