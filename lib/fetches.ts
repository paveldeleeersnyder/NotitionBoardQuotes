'use server'

import { createClient } from '@/lib/supabase/server';

export async function getQuotes(): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("quotes").select();
    if (error) {
        return [];
    }

    return data!;
}

export async function getUnprocessable(): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("quotes_with_problems").select();
    if (error) {
        return [];
    }

    return data!;
}

export async function getProducts(id: string): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("products").select().eq("quote_id", id);
    if (error) {
        return [];
    }

    return data!;
}

export async function getLink(path: string): Promise<string> {
    const supabase = await createClient();

    const { data, error } = await supabase.storage.from("quotes").createSignedUrl(path, 600);
    if (error) {
        return "";
    }

    return data.signedUrl;
}

export async function getQuoteDetails(id: string): Promise<Record<string, any>> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("quotes").select().eq("id", id);
    if (error) {
        return null!;
    }

    return data[0];
}