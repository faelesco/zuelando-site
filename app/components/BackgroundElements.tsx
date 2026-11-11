import Image from "next/image";

/**
 * Ornamento decorativo (imagem WebP leve), posicionado à direita do conteúdo.
 * Só aparece em telas médias e grandes e não interfere na leitura nem no toque.
 */
export function BackgroundElements() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
            <Image
                src="/decor/espada.webp"
                alt=""
                width={480}
                height={720}
                sizes="(min-width: 1024px) 220px, 160px"
                className="absolute bottom-0 right-6 h-56 w-auto opacity-90 lg:right-12 lg:h-80"
            />
        </div>
    );
}
