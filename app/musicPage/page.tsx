import { BackgroundElements } from "../components/BackgroundElements";
import { BibliotecaClient, type Musica } from "../components/BibliotecaClient";
import { selecionarLinhas } from "../lib/supabaseRest";

export default async function BibliotecaPontos() {
    const pontos = await selecionarLinhas<Musica>("pontos", "select=*&order=id.desc");

    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
            <BackgroundElements />
            <div className="relative">
                <BibliotecaClient pontosIniciais={pontos} />
            </div>
        </main>
    );
}
