import Link from "next/link";
import { BackgroundElements } from "../components/BackgroundElements";
import { PontosList } from "../components/PontosList";

export default function PontosPage() {
    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center bg-[#F9FAFB] py-12 px-6">
            <BackgroundElements />
            <div className="z-10 w-full max-w-4xl flex flex-col items-center">
                <div className="w-full max-w-2xl flex justify-start mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-500 hover:text-[#111827] font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Voltar ao Início
                    </Link>
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-4 uppercase">
                        Biblioteca de Pontos
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg mx-auto">
                        Os pontos de umbanda são os cânticos sagrados dessa religião afro-brasileira que têm diversas funções como, por exemplo, homenagear uma entidade ou convidá-la ao convívio no terreiro. Explore as letras e cantos sagrados da nossa tradição.
                    </p>
                </div>
                <PontosList />
            </div>
        </main>
    );
}