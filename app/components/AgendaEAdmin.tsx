"use client";

import { useState } from "react";
import { AdminAuth } from "./AdminAuth";
import { AgendaSection } from "./AgendaSection";

export function AgendaEAdmin({ title }: { title: string }) {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="w-full flex flex-col gap-10 relative">
            <AgendaSection title={title} isAdmin={isAdmin} />
        </div>
    );
}