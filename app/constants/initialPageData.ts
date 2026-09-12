export const INITIAL_PAGE = {
    profile: {
        name: "ZUELANDO",
        description: "Ancestralidade, ritmo, modernidade e muito axé! 🌿",
        photoPlaceholder: "Foto",
        address: {
            text: "Rua Condor, 535 - Nova Cintra",
            mapUrl: "https://maps.google.com/?q=Rua+Condor+535+Nova+Cintra",
        },
    },
    socials: {
        instagram: "https://instagram.com/zuelando",
        whatsapp: "https://wa.me/5531998892727",
    },
    sections: {
        explore: "✨ Explore",
        agenda: "📅 Próximos Eventos",
        music: "🎧 Ouça Agora",
    },
    pages: [
        {
            id: "page-pontos",
            title: "Biblioteca de Pontos",
            description: "Letras e cantos sagrados",
            icon: "📜",
            url: "/musicPage",
            colorClass: "bg-amber-100 text-amber-700",
        },
    ],
    events: [
        {
            id: "evento-1",
            title: "Resenha do Zuelando",
            location: "Nova Cintra, BH",
            date: "12 Set",
            dateIso: "2026-09-12",
            url: "#",
            galleryUrl: "/galeria/resenha12-09",
        },
        {
            id: "evento-2",
            title: "Festa de Iemanjá",
            location: "Praia Grande, SP",
            date: "02 Fev",
            dateIso: "2026-02-02",
            url: "#",
            galleryUrl: "/galeria/iemanja",
        }
    ],
    links: [
        {
            id: "link-1",
            title: "Spotify: Novo Música",
            icon: "🎵",
            colorClass: "bg-green-500",
            url: "#",
        },
        {
            id: "link-2",
            title: "YouTube: Clipe Oficial",
            icon: "▶️",
            colorClass: "bg-red-600",
            url: "#",
        },
    ],
};