"use client";

import { useState } from "react";
import { AdminAuth } from "./AdminAuth";

export function AdminButton() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50">
            <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </div>
    );
}