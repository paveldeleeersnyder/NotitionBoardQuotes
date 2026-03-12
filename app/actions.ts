"use server"

import { getLink } from '@/lib/fetches';

export async function getQuoteLink(path: string): Promise<string> {
    return getLink(path);
}