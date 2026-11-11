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

/**
 * Busca os eventos no Supabase a partir do servidor (sem esperar o navegador).
 * O resultado fica em cache por 5 minutos e é revalidado automaticamente.
 */
export async function getEventos(): Promise<Evento[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return [];

    try {
        const res = await fetch(`${url}/rest/v1/eventos?select=*&order=data_iso.asc`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
            next: { revalidate: 300 },
        });
        if (!res.ok) return [];
        const data: Evento[] = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

/** Próximo evento (hoje ou futuro), ou null. Requer a lista ordenada por data_iso. */
export function proximoEvento(eventos: Evento[], hoje: string): Evento | null {
    return eventos.find((e) => e.data_iso && e.data_iso >= hoje) ?? null;
}

/** Formata "2026-11-15" como "sábado, 15 de novembro". */
export function formatarDataIso(iso: string): string {
    const data = new Date(`${iso}T12:00:00`);
    return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(data);
}

/** Texto exibido para a data: o texto livre do admin ou a data formatada. */
export function dataDoEvento(evento: Evento): string {
    if (evento.data_texto) return evento.data_texto;
    if (evento.data_iso) return formatarDataIso(evento.data_iso);
    return "Em breve";
}
