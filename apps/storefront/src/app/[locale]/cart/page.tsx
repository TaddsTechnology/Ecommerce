import type {Metadata} from 'next';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import {Cart} from "@/app/[locale]/cart/cart";
import {Suspense} from "react";
import {CartSkeleton} from "@/components/shared/skeletons/cart-skeleton";
import {noIndexRobots} from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Cart'});
    return {
        title: t('title'),
        robots: noIndexRobots(),
    };
}

export default async function CartPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Cart'});

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Hero-style header */}
            <div className="bg-[var(--color-foreground)] text-[var(--color-background)] py-16 md:py-20">
                <div className="container mx-auto px-8 md:px-16">
                    {/* Decorative line */}
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-6" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] leading-[0.9]">
                        {t('title')}
                    </h1>
                </div>
            </div>

            {/* Cart content */}
            <div className="container mx-auto px-8 md:px-16 py-12">
                <Suspense fallback={<CartSkeleton />}>
                    <Cart/>
                </Suspense>
            </div>
        </div>
    );
}
