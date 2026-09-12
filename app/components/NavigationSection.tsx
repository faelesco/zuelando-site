import Link from "next/link";

interface PageLink {
    id: string;
    title: string;
    description: string;
    icon: string;
    url: string;
    colorClass: string;
}

export function NavigationSection({ pages, title }: { pages: PageLink[]; title: string }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-[#111827] flex items-center gap-2">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pages.map((page) => (
                    <Link
                        key={page.id}
                        href={page.url}
                        className="group flex flex-col p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-2 z-10">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${page.colorClass}`}>
                                {page.icon}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                        <div className="z-10 mt-1">
                            <span className="font-bold text-[#111827] text-lg block">{page.title}</span>
                            <span className="text-sm text-gray-500 line-clamp-2">{page.description}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
}