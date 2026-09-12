interface Event {
  id: string; title: string; location: string; date: string; url: string;
}

export function AgendaSection({ events, title }: { events: Event[]; title: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#111827] flex items-center gap-2">
        {title}
      </h2>
      <div className="space-y-4">
        {events.map((event) => (
          <a key={event.id} href={event.url} className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100">
            <div className="flex flex-col">
              <span className="font-bold text-[#111827] text-lg">{event.title}</span>
              <span className="text-sm text-gray-500">{event.location}</span>
            </div>
            <div className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap">
              {event.date}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}