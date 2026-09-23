"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundElements } from "../components/BackgroundElements";
import { AdminAuth } from "../components/AdminAuth";

interface Musica {
    id: string;
    titulo: string;
    categoria?: string;
    letra: string;
    audioBase64?: string;
}

function PontoCard({ musica, isAdmin, onRemover }: { musica: Musica; isAdmin: boolean; onRemover: (id: string, e: React.MouseEvent) => void; }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100 overflow-hidden transition-all duration-300">

            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between p-6 sm:px-8 sm:py-6 text-left hover:bg-neutral-50/50 transition-colors focus:outline-none">
                <div className="flex flex-col gap-1.5 pr-4">
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#0f172a]">{musica.titulo}</h3>
                    {musica.categoria && <span className="text-sm font-bold text-amber-500 uppercase tracking-widest">{musica.categoria}</span>}
                </div>
                <div className={`transform transition-transform duration-300 shrink-0 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-8 pt-2">

                        <div className="w-full h-px bg-neutral-100 mb-6"></div>

                        {musica.audioBase64 && (
                            <div className="bg-neutral-50/80 border border-neutral-200 rounded-xl p-4 sm:p-5 mb-8">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    Dê play no axé
                                </div>
                                <audio controls className="w-full h-10 outline-none" src={musica.audioBase64}>
                                    O seu navegador não suporta áudio.
                                </audio>
                            </div>
                        )}

                        <p className="text-slate-700 italic whitespace-pre-line leading-relaxed text-base sm:text-lg mb-8">
                            {musica.letra}
                        </p>

                        {isAdmin && (
                            <div className="flex justify-end pt-4 border-t border-neutral-100">
                                <button onClick={(e) => onRemover(musica.id, e)} className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                    Remover Ponto
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BibliotecaPontos() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [musicas, setMusicas] = useState<Musica[]>([]);

    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("");
    const [novaLetra, setNovaLetra] = useState("");
    const [novoAudio, setNovoAudio] = useState<string>("");

    useEffect(() => {
        const musicasSalvas = localStorage.getItem("@zuelando:musicas");
        if (musicasSalvas) {
            setMusicas(JSON.parse(musicasSalvas));
        } else {
            setMusicas([{
                id: "1",
                titulo: "Se meu pai é Ogum / Ogum 7 Espadas",
                categoria: "OGUM",
                letra: "Se meu pai é Ogum (Ogum)\nVencedor de demanda\nEle vem de Aruanda pra salvar filho de Umbanda\n\nSe meu pai é Ogum (Ogum)\nVencedor de demanda\nEle vem de Aruanda pra salvar filho de umbanda\n\nOgum (Ogum)\nOgum Iara\nOgum (Ogum)\nOgum Iara\nSalve os campos de batalha\nSalve a sereia do mar\nOgum, Ogum Iara"
            }]);
        }
    }, []);

    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2.5 * 1024 * 1024) {
                alert("Atenção: No modo de teste atual, o áudio deve ter menos de 2.5MB.");
                e.target.value = ""; return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setNovoAudio(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAdicionarMusica = (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoTitulo || !novaLetra) return;
        const novaMusica: Musica = { id: Date.now().toString(), titulo: novoTitulo, categoria: novaCategoria, letra: novaLetra, audioBase64: novoAudio };
        const novaLista = [novaMusica, ...musicas];

        try {
            localStorage.setItem("@zuelando:musicas", JSON.stringify(novaLista));
            setMusicas(novaLista);
            setNovoTitulo(""); setNovaCategoria(""); setNovaLetra(""); setNovoAudio("");
            const fileInput = document.getElementById("audio-upload") as HTMLInputElement;
            if (fileInput) fileInput.value = "";
        } catch (error) {
            alert("Erro ao salvar! A memória do navegador está cheia (limite de 5MB).");
        }
    };

    const handleRemoverMusica = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const novaLista = musicas.filter(m => m.id !== id);
        setMusicas(novaLista);
        localStorage.setItem("@zuelando:musicas", JSON.stringify(novaLista));
    };

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6">
            <BackgroundElements />

            <div className="z-10 w-full max-w-4xl flex flex-col">

                <div className="flex justify-between items-center mb-10 relative z-20">
                    <Link href="/" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors bg-white/80 backdrop-blur-md sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-full shadow-sm sm:shadow-none border border-neutral-100 sm:border-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span className="hidden sm:inline">Voltar ao Início</span>
                        <span className="sm:hidden">Voltar</span>
                    </Link>
                    <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 uppercase">Biblioteca de Pontos</h1>
                    <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto font-medium leading-relaxed">
                        Os pontos de umbanda são os cânticos sagrados dessa religião afro-brasileira que têm diversas funções como, por exemplo, homenagear uma entidade ou convidá-la ao convívio no terreiro. Explore as letras e cantos sagrados da nossa tradição.
                    </p>
                </div>

                {isAdmin && (
                    <form onSubmit={handleAdicionarMusica} className="mb-12 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-neutral-200">
                        <h3 className="font-bold text-xl mb-6 text-neutral-900">Adicionar Novo Ponto</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Título da Música (ex: Se meu pai é Ogum...)" value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium" />
                            <input type="text" placeholder="Categoria (ex: OGUM, OXÓSSI, EXU...)" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium uppercase" />
                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">Anexar Áudio MP3 (Opcional)</label>
                                <input id="audio-upload" type="file" accept="audio/mp3, audio/wav, audio/ogg" onChange={handleAudioUpload} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all" />
                            </div>
                            <textarea placeholder="Letra do ponto..." rows={5} value={novaLetra} onChange={(e) => setNovaLetra(e.target.value)} className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium mt-2" />
                            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors mt-2 text-lg">Salvar Ponto</button>
                        </div>
                    </form>
                )}

                <div className="space-y-4 mb-16">
                    {musicas.map((musica) => (
                        <PontoCard key={musica.id} musica={musica} isAdmin={isAdmin} onRemover={handleRemoverMusica} />
                    ))}
                    {musicas.length === 0 && (
                        <p className="text-center text-neutral-500 font-medium py-10">A biblioteca de pontos está vazia.</p>
                    )}
                </div>

            </div>
        </main>
    );
}