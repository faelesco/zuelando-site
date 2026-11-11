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
        explore: "Explore",
        agenda: "Próximos eventos",
        music: "Ouça agora",
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
            title: "YouTube: Vídeos Oficiais",
            icon: "▶️",
            colorClass: "bg-red-600",
            url: "https://www.youtube.com/@Zuelando1",
        },
    ],
};