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
        <section aria-labelledby="titulo-explore">
            <h2 id="titulo-explore" className="mb-4 text-xl font-extrabold tracking-tight text-stone-900">
                {title}
            </h2>
            <ul className="flex flex-col gap-3">
                {pages.map((page) => (
                    <li key={page.id}>
                        <Link
                            href={page.url}
                            className="group flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${page.colorClass}`} aria-hidden="true">
                                {page.icon}
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="text-base font-bold text-stone-900">{page.title}</span>
                                <span className="truncate text-sm text-stone-500">{page.description}</span>
                            </span>
                            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-stone-600">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
