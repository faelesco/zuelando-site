"use client";

import { useState } from "react";
import { AdminAuth } from "./AdminAuth";

export function AdminButton() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="shrink-0">
            <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </div>
    );
}
