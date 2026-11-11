interface LinkItem {
  id: string; title: string; icon: string; colorClass: string; url: string;
}

export function MusicSection({ links, title }: { links: LinkItem[]; title: string }) {
  return (
    <section aria-labelledby="titulo-musica">
      <h2 id="titulo-musica" className="mb-4 text-xl font-extrabold tracking-tight text-stone-900">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl text-white ${link.colorClass}`} aria-hidden="true">
                {link.icon}
              </span>
              <span className="font-semibold text-stone-900">{link.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
