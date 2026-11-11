"use client";

import { useState } from "react";
import type { Evento } from "../lib/eventos";
import { gerarFlyerPng } from "../lib/flyer";
import {
    baixarBlob,
    compartilharNativo,
    nomeArquivoFlyer,
    textoCompartilhar,
} from "../lib/compartilhar";

/** Botão que gera o flyer do evento e o compartilha (ou baixa, se o aparelho não permitir). */
export function ShareFlyer({ evento }: { evento: Evento }) {
    const [estado, setEstado] = useState<"parado" | "gerando" | "erro">("parado");

    const handleClick = async () => {
        setEstado("gerando");
        try {
            const blob = await gerarFlyerPng(evento);
            const resultado = await compartilharNativo(blob, nomeArquivoFlyer(evento), {
                title: evento.titulo,
                text: textoCompartilhar(evento),
            });
            if (resultado === "fallback") baixarBlob(blob, nomeArquivoFlyer(evento));
            setEstado("parado");
        } catch {
            setEstado("erro");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={estado === "gerando"}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:border-pink-300 hover:text-pink-700 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            {estado === "gerando" ? "Gerando..." : estado === "erro" ? "Tentar de novo" : "Compartilhar"}
        </button>
    );
}
