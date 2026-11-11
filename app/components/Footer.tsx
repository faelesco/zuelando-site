import { INITIAL_PAGE } from "../constants/initialPageData";

export function Footer() {
    return (
        <footer className="border-t border-stone-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="text-2xl font-extrabold tracking-tight text-stone-900">
                        Leve o <span className="text-amber-700">Zuelando</span> para o seu evento
                    </h2>
                    <p className="max-w-md text-sm text-stone-500 sm:text-base">
                        Shows, vivências culturais ou locação do espaço.
                    </p>
                </div>

                <a
                    href={INITIAL_PAGE.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-emerald-700 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:text-base"
                >
                    Fale com a gente
                </a>
            </div>

            <div className="border-t border-stone-100">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-xs font-medium text-stone-400 sm:flex-row sm:px-8">
                    <p>© {new Date().getFullYear()} {INITIAL_PAGE.profile.name}. Todos os direitos reservados.</p>
                    <p>
                        Feito com axé e tecnologia por{" "}
                        <a href="https://www.raphalelis.com.br" target="_blank" rel="noopener noreferrer" className="underline decoration-stone-300 underline-offset-2 hover:text-stone-600">
                            Raphael Lelis
                        </a>
                        {" "}🌿
                    </p>
                </div>
            </div>
        </footer>
    );
}
