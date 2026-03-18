'use server'

const QUOTES_PER_PAGE = 50;

import { createClient } from '@/lib/supabase/server';

export async function getQuotes(page: number): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("quotes")
        .select()
        .order("time_created", {ascending: false})
        .range(QUOTES_PER_PAGE * (page - 1), (QUOTES_PER_PAGE * page) - 1);
    if (error) {
        return [];
    }

    return data!;
}

export async function getTotalAmountOfQuotes(): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase.from("quotes").select("*", {count: 'exact', head: true});
    if (error) {
        return 0;
    }

    return count!;
}

export async function getUnprocessable(page: number): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("quotes_with_problems")
        .select()
        .order("time_created", {ascending: false})
        .range(QUOTES_PER_PAGE * (page - 1), (QUOTES_PER_PAGE * page) - 1);
    if (error) {
        console.log(error)
        return [];
    }

    return data!;
}

export async function getTotalUnprocessableQuotes(): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase.from("quotes_with_problems").select("*", {count: 'exact', head: true});
    if (error) {
        return 0;
    }

    return count!;
}

export async function getProducts(id: string): Promise<Record<string, any>[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("products").select("*, posts(name, categories(name))").eq("quote_id", id);
    if (error) {
        return [];
    }
    const results: Record<string, any>[] = data!;

    results.forEach(r => {
        r.post = `${r.posts.categories.name} ${r.posts.name}`

        delete r.posts;
    });

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