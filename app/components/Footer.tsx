import { INITIAL_PAGE } from "../constants/initialPageData";

export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 pt-10 pb-8 px-6 mt-16 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] rounded-t-[2rem]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                        Leve o <span className="text-orange-500">Zuelando</span> para o seu evento!
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base font-medium max-w-md">
                        Shows, vivências culturais ou locação do espaço.
                    </p>
                </div>

                <a
                    href={INITIAL_PAGE.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0"
                >
                    <svg className="w-5 h-5 fill-current shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    <span>Fale com a gente</span>
                </a>
            </div>

            <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-[13px] font-medium text-center">
                <p>© {new Date().getFullYear()} {INITIAL_PAGE.profile.name}. Todos os direitos reservados.</p>
                <p>
                    Feito com axé e tecnologia por{' '}
                    <a
                        href="https://www.raphalelis.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-600 transition-colors underline decoration-transparent hover:decoration-gray-300"
                    >
                        Raphael Lelis
                    </a>. 🌿
                </p>
            </div>
        </footer>
    );
}