import Link from "next/link";

interface Event {
    id: string;
    title: string;
    location: string;
    date: string;
    dateIso: string;
    url: string;
    galleryUrl?: string;
}

export function AgendaSection({ events, title }: { events: Event[]; title: string }) {
    const todayIso = new Date().toISOString().split('T')[0];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-[#111827] flex items-center gap-2">
                {title}
            </h2>
            <div className="space-y-3">
                {events.map((event) => {
                    const isPast = event.dateIso < todayIso;

                    if (isPast) {
                        return (
                            <Link
                                key={event.id}
                                href={event.galleryUrl || "#"}
                                className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group"
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#111827] text-base">{event.title}</span>
                                    <span className="text-xs text-gray-500">{event.location}</span>
                                </div>
                                <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1 group-hover:bg-gray-200 transition-colors">
                                    📷 Ver fotos
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <a
                            key={event.id}
                            href={event.url}
                            className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100"
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-[#111827] text-base">{event.title}</span>
                                <span className="text-xs text-gray-500">{event.location}</span>
                            </div>
                            <div className="bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                                {event.date}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}