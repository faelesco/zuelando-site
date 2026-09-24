"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { generateGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aguardando-chaves.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "chave-publica-temporaria";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Evento {
    id: string;
    titulo: string;
    local: string;
    data_texto?: string | null;
    link_fotos?: string | null;
    data_iso?: string | null;
    hora_inicio?: string | null;
    hora_fim?: string | null;
    descricao?: string | null;
}

interface AgendaSectionProps {
    title: string;
    isAdmin?: boolean;
}

export function AgendaSection({ title, isAdmin = false }: AgendaSectionProps) {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const todayIso = new Date().toISOString().split('T')[0];

    const [editingId, setEditingId] = useState<string | null>(null);
    const [titulo, setTitulo] = useState("");
    const [local, setLocal] = useState("");
    const [dataTexto, setDataTexto] = useState("");
    const [linkFotos, setLinkFotos] = useState("");
    const [dataIso, setDataIso] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");
    const [descricao, setDescricao] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchEventos() {
            const { data } = await supabase
                .from("eventos")
                .select("*")
                .order("data_iso", { ascending: true });

            if (data) setEventos(data);
        }
        fetchEventos();
    }, []);

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo || !local) return;
        setIsLoading(true);

        const eventoData = {
            titulo,
            local,
            data_texto: dataTexto || null,
            link_fotos: linkFotos || null,
            data_iso: dataIso || null,
            hora_inicio: horaInicio || null,
            hora_fim: horaFim || null,
            descricao: descricao || null,
        };

        try {
            if (editingId) {
                const { error } = await supabase.from("eventos").update(eventoData).eq("id", editingId);
                if (!error) setEventos(eventos.map(ev => ev.id === editingId ? { ...ev, ...eventoData } as Evento : ev));
            } else {
                const { data, error } = await supabase.from("eventos").insert([eventoData]).select();
                if (data && !error) setEventos([...eventos, data[0] as Evento]);
            }
            cancelarEdicao();
        } catch (error) {
            alert("Erro ao salvar o evento.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditar = (evento: Evento) => {
        setEditingId(evento.id);
        setTitulo(evento.titulo);
        setLocal(evento.local);
        setDataTexto(evento.data_texto || "");
        setLinkFotos(evento.link_fotos || "");
        setDataIso(evento.data_iso || "");
        setHoraInicio(evento.hora_inicio || "");
        setHoraFim(evento.hora_fim || "");
        setDescricao(evento.descricao || "");
        document.getElementById("form-eventos")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleRemover = async (id: string) => {
        if (!window.confirm("Tem certeza que deseja apagar este evento?")) return;
        const { error } = await supabase.from("eventos").delete().eq("id", id);
        if (!error) setEventos(eventos.filter(ev => ev.id !== id));
    };

    const cancelarEdicao = () => {
        setEditingId(null); setTitulo(""); setLocal(""); setDataTexto("");
        setLinkFotos(""); setDataIso(""); setHoraInicio(""); setHoraFim(""); setDescricao("");
    };

    const handleCalendarClick = (e: React.MouseEvent, evento: Evento) => {
        if (!evento.hora_inicio || !evento.hora_fim || !evento.data_iso) return;

        const isAppleDevice = typeof window !== "undefined" && /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
        if (isAppleDevice) {
            e.preventDefault();
            downloadIcsFile({
                title: evento.titulo,
                location: evento.local,
                description: evento.descricao || "",
                dateIso: evento.data_iso,
                startTime: evento.hora_inicio,
                endTime: evento.hora_fim,
            });
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">{title}</h2>
            </div>

            {isAdmin && (
                <form id="form-eventos" onSubmit={handleSalvar} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-neutral-200 mb-4">
                    <h3 className="font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">
                        {editingId ? "✏️ Editar Evento" : "➕ Adicionar Evento"}
                    </h3>

                    <div className="space-y-3">
                        <input type="text" placeholder="Nome do Evento" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm" required />
                        <input type="text" placeholder="Local/Endereço" value={local} onChange={(e) => setLocal(e.target.value)} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm" required />

                        <div className="flex gap-3">
                            <input type="text" placeholder="Texto da Data (Ex: 20 Set)" value={dataTexto} onChange={(e) => setDataTexto(e.target.value)} className="w-1/2 p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm" />
                            <input type="date" title="Data Exata (Para Calendário)" value={dataIso} onChange={(e) => setDataIso(e.target.value)} className="w-1/2 p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm text-neutral-500" />
                        </div>

                        <div className="flex gap-3">
                            <input type="time" title="Hora Início" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="w-1/2 p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm text-neutral-500" />
                            <input type="time" title="Hora Fim" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} className="w-1/2 p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm text-neutral-500" />
                        </div>

                        <input type="url" placeholder="Link das Fotos (Opcional)" value={linkFotos} onChange={(e) => setLinkFotos(e.target.value)} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm" />
                        <textarea placeholder="Descrição para o Calendário..." rows={2} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-red-500 font-medium text-sm"></textarea>

                        <div className="flex gap-2 pt-2">
                            <button type="submit" disabled={isLoading} className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                                {isLoading ? "A guardar..." : (editingId ? "Atualizar Evento" : "Salvar Evento")}
                            </button>
                            {editingId && (
                                <button type="button" onClick={cancelarEdicao} className="px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold rounded-xl transition-colors text-sm">Cancelar</button>
                            )}
                        </div>
                    </div>
                </form>
            )}

            {/* LISTA DE EVENTOS COM A LÓGICA RESTAURADA (Sem Links Nativos Sobrepostos) */}
            <div className="space-y-3">
                {eventos.map((evento) => {
                    const isPast = evento.data_iso ? evento.data_iso < todayIso : false;

                    // LAYOUT 1: EVENTOS PASSADOS (Usa <Link>)
                    if (isPast) {
                        return (
                            <div key={evento.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 gap-3 overflow-hidden">
                                <Link href={evento.link_fotos || "#"} className={`flex flex-col sm:flex-row sm:items-center justify-between flex-grow gap-3 ${evento.link_fotos ? 'cursor-pointer' : 'cursor-default'}`}>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[#111827] text-base">{evento.titulo}</span>
                                        <span className="text-xs text-gray-500">{evento.local}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 pr-16 sm:pr-0">
                                        <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1 group-hover:bg-gray-200 transition-colors">
                                            📷 Ver fotos
                                        </div>
                                    </div>
                                </Link>
                                {isAdmin && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white pl-2 shadow-[-10px_0_10px_white]">
                                        <button onClick={() => handleEditar(evento)} className="p-2 text-neutral-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors z-20"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                                        <button onClick={() => handleRemover(evento.id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-20"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // LAYOUT 2: EVENTOS FUTUROS (Usa <div> normal com <a> para o Calendário)
                    const googleUrl = (evento.data_iso && evento.hora_inicio && evento.hora_fim)
                        ? generateGoogleCalendarUrl({
                            title: evento.titulo,
                            location: evento.local,
                            description: evento.descricao || "",
                            dateIso: evento.data_iso,
                            startTime: evento.hora_inicio,
                            endTime: evento.hora_fim,
                        })
                        : "#";

                    return (
                        <div key={evento.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 gap-3 overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-grow gap-3">
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#111827] text-base">{evento.titulo}</span>
                                    <span className="text-xs text-gray-500">{evento.local}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 pr-16 sm:pr-0">
                                    {evento.hora_inicio && evento.hora_fim && evento.data_iso && (
                                        <a href={googleUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => handleCalendarClick(e, evento)} title="Adicionar à agenda" className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors z-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                                <line x1="16" x2="16" y1="2" y2="6"></line>
                                                <line x1="8" x2="8" y1="2" y2="6"></line>
                                                <line x1="3" x2="21" y1="10" y2="10"></line>
                                                <path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path>
                                                <path d="M8 18h.01"></path><path d="M12 18h.01"></path>
                                            </svg>
                                        </a>
                                    )}
                                    <div className="bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                                        {evento.data_texto}
                                    </div>
                                </div>
                            </div>
                            {isAdmin && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white pl-2 shadow-[-10px_0_10px_white]">
                                    <button onClick={() => handleEditar(evento)} className="p-2 text-neutral-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors z-20"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                                    <button onClick={() => handleRemover(evento.id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-20"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                                </div>
                            )}
                        </div>
                    );
                })}
                {eventos.length === 0 && !isLoading && (
                    <p className="text-sm text-neutral-500 italic">Nenhum evento agendado no momento.</p>
                )}
            </div>
        </div>
    );
}