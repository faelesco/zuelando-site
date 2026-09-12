import { INITIAL_PAGE } from "../constants/initialPageData";

export function Footer() {
    return (
        <footer className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200/80 text-[#111827] py-6 px-6 mt-8 relative z-30 rounded-t-2xl shadow-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                <div className="flex flex-col gap-0.5">
                    <h2 className="text-base sm:text-lg font-bold text-[#111827] leading-tight">
                        Leve o <span className="text-orange-600">Zuelando</span> para o seu evento!
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm max-w-md">
                        Shows, rodas de samba, vivências culturais ou locação do espaço.
                    </p>
                </div>

                <a
                    href={INITIAL_PAGE.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 shrink-0"
                >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    <span>Fale com a gente</span>
                </a>
            </div>

            <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-400 text-[11px] text-center">
                <p>© {new Date().getFullYear()} {INITIAL_PAGE.profile.name}. Todos os direitos reservados.</p>
                <p>Feito com axé e tecnologia. 🌿</p>
            </div>
        </footer>
    );
}