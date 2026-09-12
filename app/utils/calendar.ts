interface CalendarEventInput {
    title: string;
    location: string;
    description?: string;
    dateIso: string;
    startTime: string;
    endTime: string;
}

export function generateGoogleCalendarUrl(event: CalendarEventInput): string {
    const formatDateTime = (date: string, time: string) => {
        const cleanDate = date.replace(/-/g, "");
        const cleanTime = time.replace(/:/g, "") + "00";
        return `${cleanDate}T${cleanTime}`;
    };

    const start = formatDateTime(event.dateIso, event.startTime);
    const end = formatDateTime(event.dateIso, event.endTime);

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: event.title,
        details: event.description || "",
        location: event.location,
        dates: `${start}/${end}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: CalendarEventInput) {
    const formatIcsDateTime = (date: string, time: string) => {
        const cleanDate = date.replace(/-/g, "");
        const cleanTime = time.replace(/:/g, "") + "00";
        return `${cleanDate}T${cleanTime}`;
    };

    const start = formatIcsDateTime(event.dateIso, event.startTime);
    const end = formatIcsDateTime(event.dateIso, event.endTime);

    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Zuelando//Eventos//PT",
        "BEGIN:VEVENT",
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ""}`,
        `LOCATION:${event.location}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}