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
        {
            id: "page-sobre",
            title: "Sobre Nós",
            description: "Nossa história e dos Ogãs",
            icon: "🪘",
            url: "/sobrePage",
            colorClass: "bg-green-100 text-green-700",
        }
    ],
    events: [
        {
            id: "evento-1",
            title: "Resenha do Zuelando",
            location: "Rua Condor, 535 - Nova Cintra, BH",
            date: "12 Set",
            dateIso: "2026-09-12",
            startTime: "18:00",
            endTime: "23:00",
            url: "#",
            galleryUrl: "/galeria/resenha12-09",
        },
        {
            id: "evento-3",
            title: "Resenha do Zuelando Part2",
            location: "Rua Condor, 535 - Nova Cintra, BH",
            date: "20 Set",
            dateIso: "2026-09-20",
            startTime: "18:00",
            endTime: "23:00",
            url: "#",
            galleryUrl: "/galeria/resenha12-09",
        },
        {
            id: "evento-2",
            title: "Festival de Cultura Negra",
            location: "Rio de Janeiro, RJ",
            date: "05 Dez",
            dateIso: "2025-12-05",
            startTime: "16:00",
            endTime: "21:00",
            description: "Apresentação especial do grupo Zuelando no festival.",
            url: "#",
            galleryUrl: "/galeria/festarj"
        },
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