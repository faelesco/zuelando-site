import { selecionarLinhas } from "./supabaseRest";

export interface Evento {
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

/** Data de hoje no fuso de São Paulo, no formato AAAA-MM-DD. */
export function hojeIso(): string {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

export function getEventos(): Promise<Evento[]> {
    return selecionarLinhas<Evento>("eventos", "select=*&order=data_iso.asc");
}

export function proximoEvento(eventos: Evento[], hoje: string): Evento | null {
    return eventos.find((e) => e.data_iso && e.data_iso >= hoje) ?? null;
}

export function formatarDataIso(iso: string): string {
    const data = new Date(`${iso}T12:00:00`);
    return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(data);
}

export function dataDoEvento(evento: Evento): string {
    if (evento.data_texto) return evento.data_texto;
    if (evento.data_iso) return formatarDataIso(evento.data_iso);
    return "Em breve";
}
