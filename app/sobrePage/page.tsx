import Link from "next/link";
import { BackgroundElements } from "../components/BackgroundElements";
import { AdminButton } from "../components/admin/AdminButton";
import { GaleriaMomentos, type FotoGaleria } from "../components/GaleriaMomentos";
import { selecionarLinhas } from "../lib/supabaseRest";

export default async function SobrePage() {
    const fotos = await selecionarLinhas<FotoGaleria>("galeria", "select=*&order=id.desc");

    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
            <BackgroundElements />

            <div className="relative mx-auto w-full max-w-3xl">
                <header className="mb-12 flex items-center justify-between gap-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Voltar ao início
                    </Link>
                    <AdminButton />
                </header>

                <div className="mb-14">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Quem somos</p>
                    <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-stone-900 sm:text-5xl">Nossa história</h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                        Conheça a raiz do Zuelando e a importância sagrada dos Ogãs na manutenção do axé.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    <section aria-labelledby="titulo-projeto" className="border-t border-stone-200 pt-10">
                        <h2 id="titulo-projeto" className="text-2xl font-extrabold tracking-tight text-stone-900">O projeto Zuelando</h2>
                        <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                            <p>Zuelar é uma palavra de origem banto que significa falar, cantar, louvar.</p>
                            <p>
                                Nosso propósito é levar a ancestralidade, o ritmo e a modernidade, mantendo vivo o axé em cada toque e em cada canto, respeitando as tradições que nos foram passadas.
                            </p>
                        </div>
                    </section>

                    <section aria-labelledby="titulo-ogas" className="border-t border-stone-200 pt-10">
                        <h2 id="titulo-ogas" className="text-2xl font-extrabold tracking-tight text-stone-900">A força dos Ogãs</h2>
                        <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                            <p>
                                O Ogã é o sacerdote responsável por manter a energia vital (axé) girando através do toque e do canto. É o pilar de sustentação ritualística dentro do terreiro.
                            </p>
                            <p>
                                Sem o atabaque, não há festa. Sem a voz do Ogã, a energia não se firma. É um cargo de extrema confiança, respeito e responsabilidade, onde as mãos e a voz são instrumentos do sagrado.
                            </p>
                        </div>
                    </section>

                    <section aria-labelledby="titulo-momentos" className="border-t border-stone-200 pt-10">
                        <div className="mb-8">
                            <h2 id="titulo-momentos" className="text-2xl font-extrabold tracking-tight text-stone-900">Momentos Zuelando</h2>
                            <p className="mt-2 text-stone-600">Um pouco da nossa jornada em imagens e vídeos.</p>
                        </div>
                        <GaleriaMomentos fotosIniciais={fotos} />
                    </section>
                </div>
            </div>
        </main>
    );
}
