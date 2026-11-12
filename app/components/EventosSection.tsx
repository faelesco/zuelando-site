"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAdmin } from "./admin/AdminProvider";
import { PainelAdmin, Campo, campoClass, botaoPrimarioClass, botaoSecundarioClass } from "./admin/ui";
import { supabase } from "../lib/supabase";
import type { Evento } from "../lib/eventos";
import { dataDoEvento } from "../lib/eventos";
import { CalendarButton } from "./CalendarButton";
import { ShareFlyer } from "./ShareFlyer";

interface Props {
    title: string;
    eventos: Evento[];
    hoje: string;
}

const MAX_PASSADOS = 6;

type Formulario = {
    titulo: string;
    local: string;
    data_texto: string;
    data_iso: string;
    hora_inicio: string;
    hora_fim: string;
    link_fotos: string;
    descricao: string;
};

const formularioVazio: Formulario = {
    titulo: "",
    local: "",
    data_texto: "",
    data_iso: "",
    hora_inicio: "",
    hora_fim: "",
    link_fotos: "",
    descricao: "",
};

function ordenar(lista: Evento[]): Evento[] {
    return [...lista].sort((a, b) => (a.data_iso ?? "9999").localeCompare(b.data_iso ?? "9999"));
}

function EventoCard({
    evento,
    passado,
    admin,
    onEditar,
    onRemover,
}: {
    evento: Evento;
    passado: boolean;
    admin: boolean;
    onEditar: () => void;
    onRemover: () => void;
}) {
    return (
        <li className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-col gap-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${passado ? "text-stone-400" : "text-amber-700"}`}>
                    {dataDoEvento(evento)}
                </span>
                <h3 className="text-lg font-bold leading-snug text-stone-900">{evento.titulo}</h3>
                <span className="text-sm text-stone-500">📍 {evento.local}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
                {passado ? (
                    evento.link_fotos ? (
                        <Link
                            href={evento.link_fotos}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-stone-700"
                        >
                            📷 Ver fotos
                        </Link>
                    ) : (
                        <span className="text-xs font-semibold text-stone-400">Evento realizado</span>
                    )
                ) : (
                    <>
                        <CalendarButton evento={evento} />
                        <ShareFlyer evento={evento} />
                    </>
                )}

                {admin && (
                    <div className="ml-1 flex items-center gap-1 border-l border-stone-200 pl-2">
                        <button type="button" onClick={onEditar} className="rounded-full px-3 py-1.5 text-xs font-bold text-stone-600 hover:bg-stone-100 hover:text-stone-900">
                            Editar
                        </button>
                        <button type="button" onClick={onRemover} className="rounded-full px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
                            Remover
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
}

export function EventosSection({ title, eventos: eventosIniciais, hoje }: Props) {
    const { isAdmin } = useAdmin();
    const [eventos, setEventos] = useState<Evento[]>(eventosIniciais);
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [form, setForm] = useState<Formulario>(formularioVazio);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const futuros = eventos.filter((e) => !e.data_iso || e.data_iso >= hoje);
    const passados = eventos
        .filter((e) => e.data_iso && e.data_iso < hoje)
        .reverse()
        .slice(0, MAX_PASSADOS);

    const atualizarCampo = (campo: keyof Formulario, valor: string) => setForm((f) => ({ ...f, [campo]: valor }));

    const abrirNovo = () => {
        setEditandoId(null);
        setForm(formularioVazio);
        setErro(null);
        setMostrarFormulario(true);
    };

    const abrirEdicao = (evento: Evento) => {
        setEditandoId(evento.id);
        setForm({
            titulo: evento.titulo,
            local: evento.local,
            data_texto: evento.data_texto || "",
            data_iso: evento.data_iso || "",
            hora_inicio: evento.hora_inicio || "",
            hora_fim: evento.hora_fim || "",
            link_fotos: evento.link_fotos || "",
            descricao: evento.descricao || "",
        });
        setErro(null);
        setMostrarFormulario(true);
        document.getElementById("painel-eventos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const fecharFormulario = () => {
        setMostrarFormulario(false);
        setEditandoId(null);
        setForm(formularioVazio);
        setErro(null);
    };

    const handleSalvar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSalvando(true);
        setErro(null);

        const dados = {
            titulo: form.titulo.trim(),
            local: form.local.trim(),
            data_texto: form.data_texto.trim() || null,
            data_iso: form.data_iso || null,
            hora_inicio: form.hora_inicio || null,
            hora_fim: form.hora_fim || null,
            link_fotos: form.link_fotos.trim() || null,
            descricao: form.descricao.trim() || null,
        };

        try {
            if (editandoId) {
                const { error } = await supabase.from("eventos").update(dados).eq("id", editandoId);
                if (error) throw error;
                setEventos((lista) => ordenar(lista.map((ev) => (ev.id === editandoId ? { ...ev, ...dados } : ev))));
            } else {
                const { data, error } = await supabase.from("eventos").insert([dados]).select();
                if (error) throw error;
                if (data?.[0]) setEventos((lista) => ordenar([...lista, data[0] as Evento]));
            }
            fecharFormulario();
        } catch {
            setErro("Não foi possível salvar o evento. Verifique os campos e tente novamente.");
        } finally {
            setSalvando(false);
        }
    };

    const handleRemover = async (evento: Evento) => {
        if (!window.confirm(`Remover o evento "${evento.titulo}"?`)) return;
        const { error } = await supabase.from("eventos").delete().eq("id", evento.id);
        if (error) {
            window.alert("Não foi possível remover o evento.");
            return;
        }
        setEventos((lista) => lista.filter((ev) => ev.id !== evento.id));
    };

    return (
        <section id="agenda" aria-labelledby="titulo-agenda" className="scroll-mt-24">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 id="titulo-agenda" className="text-2xl font-extrabold tracking-tight text-stone-900">
                    {title}
                </h2>
                {isAdmin && !mostrarFormulario && (
                    <button type="button" onClick={abrirNovo} className={botaoPrimarioClass}>
                        + Novo evento
                    </button>
                )}
            </div>

            {isAdmin && mostrarFormulario && (
                <div id="painel-eventos" className="mb-6">
                    <PainelAdmin
                        titulo={editandoId ? "Editar evento" : "Novo evento"}
                        descricao="Os eventos com data aparecem na agenda e no popup de próximo evento."
                    >
                        <form onSubmit={handleSalvar} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Campo rotulo="Nome do evento" obrigatorio className="sm:col-span-2">
                                <input className={campoClass} value={form.titulo} onChange={(e) => atualizarCampo("titulo", e.target.value)} required />
                            </Campo>
                            <Campo rotulo="Local" obrigatorio className="sm:col-span-2">
                                <input className={campoClass} value={form.local} onChange={(e) => atualizarCampo("local", e.target.value)} required />
                            </Campo>
                            <Campo rotulo="Data de exibição" className="sm:col-span-1">
                                <input className={campoClass} placeholder="Ex.: 20 Set" value={form.data_texto} onChange={(e) => atualizarCampo("data_texto", e.target.value)} />
                            </Campo>
                            <Campo rotulo="Data (para agenda e destaque)" className="sm:col-span-1">
                                <input type="date" className={campoClass} value={form.data_iso} onChange={(e) => atualizarCampo("data_iso", e.target.value)} />
                            </Campo>
                            <Campo rotulo="Início">
                                <input type="time" className={campoClass} value={form.hora_inicio} onChange={(e) => atualizarCampo("hora_inicio", e.target.value)} />
                            </Campo>
                            <Campo rotulo="Término">
                                <input type="time" className={campoClass} value={form.hora_fim} onChange={(e) => atualizarCampo("hora_fim", e.target.value)} />
                            </Campo>
                            <Campo rotulo="Link das fotos (após o evento)" className="sm:col-span-2">
                                <input type="url" className={campoClass} placeholder="https://" value={form.link_fotos} onChange={(e) => atualizarCampo("link_fotos", e.target.value)} />
                            </Campo>
                            <Campo rotulo="Descrição (usada no calendário)" className="sm:col-span-2">
                                <textarea rows={3} className={campoClass} value={form.descricao} onChange={(e) => atualizarCampo("descricao", e.target.value)} />
                            </Campo>

                            {erro && (
                                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                                    {erro}
                                </p>
                            )}

                            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                                <button type="button" onClick={fecharFormulario} className={botaoSecundarioClass}>
                                    Cancelar
                                </button>
                                <button type="submit" disabled={salvando} className={botaoPrimarioClass}>
                                    {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Publicar evento"}
                                </button>
                            </div>
                        </form>
                    </PainelAdmin>
                </div>
            )}

            {futuros.length > 0 ? (
                <ul className="flex flex-col gap-3">
                    {futuros.map((evento) => (
                        <EventoCard
                            key={evento.id}
                            evento={evento}
                            passado={false}
                            admin={isAdmin}
                            onEditar={() => abrirEdicao(evento)}
                            onRemover={() => handleRemover(evento)}
                        />
                    ))}
                </ul>
            ) : (
                <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-6 text-center text-sm text-stone-500">
                    Nenhum evento agendado no momento. Fique de olho nas nossas redes!
                </p>
            )}

            {passados.length > 0 && (
                <div className="mt-10">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-stone-400">Eventos anteriores</h3>
                    <ul className="flex flex-col gap-3">
                        {passados.map((evento) => (
                            <EventoCard
                                key={evento.id}
                                evento={evento}
                                passado
                                admin={isAdmin}
                                onEditar={() => abrirEdicao(evento)}
                                onRemover={() => handleRemover(evento)}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
