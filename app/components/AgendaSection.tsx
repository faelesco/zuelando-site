"use client";

import Link from "next/link";
import { generateGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";

interface Event {
    id: string;
    title: string;
    location: string;
    date: string;
    dateIso: string;
    startTime?: string;
    endTime?: string;
    description?: string;
    url: string;
    galleryUrl?: string;
}

export function AgendaSection({ events, title }: { events: Event[]; title: string }) {
    const todayIso = new Date().toISOString().split('T')[0];

    const handleCalendarClick = (e: React.MouseEvent, event: Event) => {
        if (!event.startTime || !event.endTime) return;

        const isAppleDevice = typeof window !== "undefined" && /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);

        if (isAppleDevice) {
            e.preventDefault();
            downloadIcsFile({
                title: event.title,
                location: event.location,
                description: event.description,
                dateIso: event.dateIso,
                startTime: event.startTime,
                endTime: event.endTime,
            });
        }
    };

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

                    const googleUrl = (event.startTime && event.endTime)
                        ? generateGoogleCalendarUrl({
                            title: event.title,
                            location: event.location,
                            description: event.description,
                            dateIso: event.dateIso,
                            startTime: event.startTime,
                            endTime: event.endTime,
                        })
                        : "#";

                    return (
                        <div
                            key={event.id}
                            className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 gap-3"
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-[#111827] text-base">{event.title}</span>
                                <span className="text-xs text-gray-500">{event.location}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {event.startTime && (
                                    <a
                                        href={googleUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleCalendarClick(e, event)}
                                        title="Adicionar à agenda"
                                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                            <line x1="16" x2="16" y1="2" y2="6"></line>
                                            <line x1="8" x2="8" y1="2" y2="6"></line>
                                            <line x1="3" x2="21" y1="10" y2="10"></line>
                                            <path d="M8 14h.01"></path>
                                            <path d="M12 14h.01"></path>
                                            <path d="M16 14h.01"></path>
                                            <path d="M8 18h.01"></path>
                                            <path d="M12 18h.01"></path>
                                        </svg>
                                    </a>
                                )}

                                <div className="bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
                                    {event.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}