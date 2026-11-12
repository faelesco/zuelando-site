import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

/** Monta a URL pública de um arquivo do bucket do Supabase Storage. */
export function urlPublicaStorage(bucket: string, arquivo: string): string {
    return supabase.storage.from(bucket).getPublicUrl(arquivo).data.publicUrl;
}
