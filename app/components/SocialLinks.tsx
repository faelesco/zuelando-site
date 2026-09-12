interface SocialLinksProps {
    socials: { instagram: string; whatsapp: string };
    profileName: string;
    address?: { text: string; mapUrl: string };
}

export function SocialLinks({ socials, profileName, address }: SocialLinksProps) {
    return (
        <div className="flex flex-col items-center gap-6 w-full">

            {/* Container dos Ícones (Instagram e WhatsApp) */}
            <div className="flex gap-4">
                <div className="relative group">
                    <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-44 bg-white p-1.5 rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-bottom transform scale-95 group-hover:scale-100 z-50 pointer-events-none">
                        <img
                            src="/instagram-preview.jpg"
                            alt={`Preview do Instagram de ${profileName}`}
                            className="w-full max-h-56 rounded-xl object-cover shadow-sm"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                    </div>
                </div>
                <a
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </a>
            </div>
            {address && (
                <a
                    href={address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-sm font-semibold text-gray-700 hover:text-[#111827]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 flex-shrink-0">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="truncate max-w-[200px] sm:max-w-xs">{address.text}</span>
                </a>
            )}

        </div>
    );
}