import { BackgroundElements } from "../components/BackgroundElements";
import { BibliotecaClient } from "../components/BibliotecaClient";

export default function BibliotecaPontos() {
    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6">
            <BackgroundElements />
            
            <BibliotecaClient />
        </main>
    );
}