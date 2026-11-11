"use client";

import type { MouseEvent } from "react";
import { generateGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";
import type { Evento } from "../lib/eventos";

export function CalendarButton({ evento }: { evento: Evento }) {
    if (!evento.data_iso || !evento.hora_inicio || !evento.hora_fim) return null;

    const input = {
        title: evento.titulo,
        location: evento.local,
        description: evento.descricao || "",
        dateIso: evento.data_iso,
        startTime: evento.hora_inicio,
        endTime: evento.hora_fim,
    };
    const googleUrl = generateGoogleCalendarUrl(input);

    // Dispositivos Apple preferem baixar o .ics em vez de abrir o Google Agenda.
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
            e.preventDefault();
            downloadIcsFile(input);
        }
    };

    return (
        <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Agenda
        </a>
    );
}
