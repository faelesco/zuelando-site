export async function selecionarLinhas<T>(tabela: string, consulta: string, revalidar = 300): Promise<T[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return [];

    try {
        const res = await fetch(`${url}/rest/v1/${tabela}?${consulta}`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
            next: { revalidate: revalidar },
        });
        if (!res.ok) return [];
        const data: T[] = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}
