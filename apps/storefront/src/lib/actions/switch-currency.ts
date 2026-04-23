'use server';

import {setCurrencyCookie} from '@/lib/currency';
import {getActiveChannelCached} from '@/lib/vendure/cached';
import {revalidateTag} from 'next/cache';

export async function switchCurrency(currencyCode: string) {
    const channel = await getActiveChannelCached();
    if (!(channel.availableCurrencyCodes as string[]).includes(currencyCode)) {
        throw new Error('Invalid currency code');
    }

    await setCurrencyCookie(currencyCode);

    revalidateTag('products');
    revalidateTag('collection');
    revalidateTag('cart');
    revalidateTag('active-order');
}
