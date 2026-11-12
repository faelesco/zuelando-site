import type { ReactNode } from "react";

export const campoClass =
    "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20 disabled:bg-stone-100 disabled:text-stone-500";

export const botaoPrimarioClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-stone-700 disabled:opacity-60";

export const botaoSecundarioClass =
    "inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-950 disabled:opacity-60";

export function PainelAdmin({
    titulo,
    descricao,
    acao,
    children,
}: {
    titulo: string;
    descricao?: string;
    acao?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-amber-200/70 bg-amber-50/40 p-5 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Administração</p>
                    <h3 className="mt-1 text-lg font-extrabold text-stone-900">{titulo}</h3>
                    {descricao && <p className="mt-1 text-sm text-stone-600">{descricao}</p>}
                </div>
                {acao}
            </div>
            {children}
        </section>
    );
}

export function Campo({
    rotulo,
    children,
    obrigatorio,
    className = "",
}: {
    rotulo: string;
    children: ReactNode;
    obrigatorio?: boolean;
    className?: string;
}) {
    return (
        <label className={`flex flex-col gap-1.5 text-sm font-semibold text-stone-700 ${className}`}>
            <span>
                {rotulo}
                {obrigatorio && <span className="text-red-600"> *</span>}
            </span>
            {children}
        </label>
    );
}
