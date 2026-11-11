import type { Evento } from "./eventos";
import { dataDoEvento } from "./eventos";

export const SITE_URL = "https://www.zuelando.com.br";
export const INSTAGRAM_URL = "https://www.instagram.com/zuelando";
export const WHATSAPP_NUMBER = "5531998892727";

export function textoCompartilhar(evento: Evento): string {
    return `Vem aí: ${evento.titulo}! ${dataDoEvento(evento)} · ${evento.local}. Mais informações em ${SITE_URL} 🌿`;
}

export function nomeArquivoFlyer(evento: Evento): string {
    const slug = evento.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return `zuelando-${slug || "evento"}.png`;
}

export type ResultadoShare = "compartilhado" | "cancelado" | "fallback";

/**
 * Tenta abrir a folha de compartilhamento nativa com a imagem.
 * Devolve "fallback" quando o aparelho/navegador não suporta envio de arquivos.
 */
export async function compartilharNativo(
    blob: Blob,
    nomeArquivo: string,
    dados: { title: string; text: string }
): Promise<ResultadoShare> {
    const file = new File([blob], nomeArquivo, { type: "image/png" });
    if (typeof navigator === "undefined" || !navigator.share || !navigator.canShare?.({ files: [file] })) {
        return "fallback";
    }
    try {
        await navigator.share({ ...dados, files: [file] });
        return "compartilhado";
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return "cancelado";
        return "fallback";
    }
}

export function baixarBlob(blob: Blob, nomeArquivo: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function linkWhatsApp(texto: string): string {
    return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}
