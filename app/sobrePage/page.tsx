import Link from "next/link";
import { BackgroundElements } from "../components/BackgroundElements";

export default function SobrePage() {
    return (
        <main className="min-h-screen relative flex flex-col overflow-x-hidden">
            <BackgroundElements />

            <div className="z-10 w-full max-w-4xl flex flex-col items-center">

                <div className="w-full max-w-3xl flex justify-start mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Voltar ao Início
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 uppercase">
                        Nossa História
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
                        Conheça a raiz do Zuelando e a importância sagrada dos Ogãs.
                    </p>
                </div>

                <div className="w-full max-w-3xl space-y-6 mb-16">

                    <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-3xl">🌿</span> O Projeto Zuelando
                        </h2>
                        <div className="text-gray-600 leading-relaxed space-y-4 text-base sm:text-lg">
                            <p>
                                O Zuelando nasceu do desejo de... (substitua com a história do grupo). Zuelar é uma palavra de origem banto que significa falar, cantar, louvar.
                            </p>
                            <p>
                                Nosso propósito é levar a ancestralidade, o ritmo e a modernidade, mantendo vivo o axé em cada toque e em cada canto.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-3xl">🪘</span> A Força dos Ogãs
                        </h2>
                        <div className="text-gray-600 leading-relaxed space-y-4 text-base sm:text-lg">
                            <p>
                                O Ogã é o sacerdote responsável por manter a energia vital (axé) girando através do toque e do canto. É o pilar de sustentação ritualística.
                            </p>
                            <p>
                                Sem o atabaque, não há festa. Sem a voz do Ogã, a energia não se firma. É um cargo de extrema confiança, respeito e responsabilidade dentro da nossa religião.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}