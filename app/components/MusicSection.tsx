interface LinkItem {
  id: string; title: string; icon: string; colorClass: string; url: string;
}

export function MusicSection({ links, title }: { links: LinkItem[]; title: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#111827] flex items-center gap-2">
        {title}
      </h2>
      <div className="space-y-4">
        {links.map((link) => (
          <a key={link.id} href={link.url} className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100">
            <div className={`w-12 h-12 ${link.colorClass} rounded-xl flex items-center justify-center text-white text-xl shadow-sm`}>
              {link.icon}
            </div>
            <span className="font-semibold text-[#111827]">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}