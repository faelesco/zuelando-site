import type { Evento } from "./eventos";
import { dataDoEvento } from "./eventos";

const FLYER_WIDTH = 1080;
const FLYER_HEIGHT = 1920;

function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    styles: Partial<CSSStyleDeclaration>,
    text?: string
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    Object.assign(node.style, styles);
    if (text !== undefined) node.textContent = text;
    return node;
}

/** Monta o flyer 1080x1920 (formato Story) fora da tela, só para ser capturado. */
function montarFlyer(evento: Evento): HTMLDivElement {
    const root = el("div", {
        position: "fixed",
        left: "-10000px",
        top: "0",
        width: `${FLYER_WIDTH}px`,
        height: `${FLYER_HEIGHT}px`,
        pointerEvents: "none",
    });

    const flyer = el("div", {
        width: `${FLYER_WIDTH}px`,
        height: `${FLYER_HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "160px 120px",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #1c1917 0%, #292524 55%, #44301a 100%)",
        color: "#fafaf9",
        fontFamily: "Geist, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    });

    const glow = el("div", {
        position: "absolute",
        inset: "0",
        background: "radial-gradient(circle at 50% 40%, rgba(217,119,6,0.35) 0%, transparent 60%)",
    });

    const marca = el("div", {
        position: "relative",
        fontSize: "64px",
        fontWeight: "800",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "rgba(250,250,249,0.85)",
        marginBottom: "120px",
    }, "Zuelando");

    const card = el("div", {
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        padding: "100px 80px",
        borderRadius: "56px",
        border: "2px solid rgba(250,250,249,0.15)",
        background: "rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
    });

    const rotulo = el("div", {
        fontSize: "44px",
        fontWeight: "700",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#fbbf24",
    }, "Próximo evento");

    const titulo = el("div", {
        fontSize: "112px",
        fontWeight: "800",
        lineHeight: "1.05",
        color: "#ffffff",
        wordBreak: "break-word",
    }, evento.titulo);

    const detalhes = el("div", {
        width: "100%",
        boxSizing: "border-box",
        padding: "60px 40px",
        borderRadius: "40px",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "36px",
        alignItems: "center",
    });

    const data = el("div", {
        fontSize: "60px",
        fontWeight: "700",
        color: "#ffffff",
    }, `📅 ${dataDoEvento(evento)}`);

    const local = el("div", {
        fontSize: "46px",
        fontWeight: "500",
        color: "rgba(250,250,249,0.85)",
        lineHeight: "1.3",
    }, `📍 ${evento.local}`);

    const rodape = el("div", {
        position: "relative",
        marginTop: "120px",
        fontSize: "40px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(250,250,249,0.6)",
    }, "Ancestralidade & Ritmo");

    detalhes.append(data, local);
    card.append(rotulo, titulo, detalhes);
    flyer.append(glow, marca, card, rodape);
    root.append(flyer);
    return root;
}

/** Gera o PNG 1080x1920 do evento. Carrega html-to-image só quando é preciso. */
export async function gerarFlyerPng(evento: Evento): Promise<Blob> {
    const { toBlob } = await import("html-to-image");
    const root = montarFlyer(evento);
    document.body.appendChild(root);

    try {
        // Aguarda o navegador pintar o nó antes de capturar.
        await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
        const flyer = root.firstElementChild as HTMLElement;
        const blob = await toBlob(flyer, { pixelRatio: 1, cacheBust: false });
        if (!blob) throw new Error("Não foi possível gerar a imagem do flyer.");
        return blob;
    } finally {
        root.remove();
    }
}
