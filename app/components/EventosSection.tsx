import Link from "next/link";
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

function EventoCard({ evento, passado }: { evento: Evento; passado: boolean }) {
    const data = dataDoEvento(evento);

    return (
        <li className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-col gap-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${passado ? "text-stone-400" : "text-amber-700"}`}>
                    {data}
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
            </div>
        </li>
    );
}

export function EventosSection({ title, eventos, hoje }: Props) {
    const futuros = eventos.filter((e) => !e.data_iso || e.data_iso >= hoje);
    const passados = eventos
        .filter((e) => e.data_iso && e.data_iso < hoje)
        .reverse()
        .slice(0, MAX_PASSADOS);

    return (
        <section id="agenda" aria-labelledby="titulo-agenda" className="scroll-mt-24">
            <h2 id="titulo-agenda" className="mb-5 text-2xl font-extrabold tracking-tight text-stone-900">
                {title}
            </h2>

            {futuros.length > 0 ? (
                <ul className="flex flex-col gap-3">
                    {futuros.map((evento) => (
                        <EventoCard key={evento.id} evento={evento} passado={false} />
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
                            <EventoCard key={evento.id} evento={evento} passado />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
