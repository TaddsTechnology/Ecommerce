'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Minus, Plus, X } from 'lucide-react';
import { Price } from '@/components/commerce/price';
import { adjustQuantity, removeFromCart } from './actions';

type ActiveOrder = {
    id: string;
    currencyCode: string;
    lines: Array<{
        id: string;
        quantity: number;
        unitPriceWithTax: number;
        linePriceWithTax: number;
        productVariant: {
            id: string;
            name: string;
            sku: string;
            product: {
                name: string;
                slug: string;
                featuredAsset?: {
                    preview: string;
                } | null;
            };
        };
    }>;
};

interface CartItemsTranslations {
    empty: string;
    emptyMessage: string;
    continueShopping: string;
    sku: string;
    each: string;
}

function MinusButton({ lineId, quantity }: { lineId: string; quantity: number }) {
    return (
        <button
            onClick={() => adjustQuantity(lineId, Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 disabled:opacity-50"
        >
            <Minus className="h-4 w-4" />
        </button>
    );
}

function PlusButton({ lineId }: { lineId: string }) {
    return (
        <button
            onClick={() => adjustQuantity(lineId, 1)}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200"
        >
            <Plus className="h-4 w-4" />
        </button>
    );
}

function RemoveButton({ lineId }: { lineId: string }) {
    return (
        <button
            onClick={() => removeFromCart(lineId)}
            className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
        >
            <X className="h-5 w-5" />
        </button>
    );
}

export function CartItems({ activeOrder, t }: { activeOrder: ActiveOrder | null; t: CartItemsTranslations }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
    }, { scope: containerRef });

    if (!activeOrder || activeOrder.lines.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">{t.empty}</h1>
                    <p className="text-muted-foreground mb-8">{t.emptyMessage}</p>
                    <Link href="/" className="inline-flex items-center justify-center rounded-[30px] bg-[var(--color-primary)] text-white px-6 py-3 font-medium hover:opacity-90">
                        {t.continueShopping}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:col-span-2 divide-y divide-[var(--color-border)]" ref={containerRef}>
            {activeOrder.lines.map((line) => (
                <div key={line.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white hover:bg-[var(--color-grey-50)]">
                    {line.productVariant.product.featuredAsset && (
                        <Link href={`/product/${line.productVariant.product.slug}`} className="flex-shrink-0">
                            <Image src={line.productVariant.product.featuredAsset.preview} alt={line.productVariant.name} width={120} height={120} className="rounded-lg object-cover w-full sm:w-[120px] h-[120px]" />
                        </Link>
                    )}

                    <div className="flex-grow min-w-0">
                        <Link href={`/product/${line.productVariant.product.slug}`} className="font-medium hover:underline block">
                            {line.productVariant.product.name}
                        </Link>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{t.sku.replace('{sku}', line.productVariant.sku)}</p>

                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-1 border rounded-full bg-[var(--color-grey-100)]">
                                <MinusButton lineId={line.id} quantity={line.quantity} />
                                <span className="w-10 text-center font-medium">{line.quantity}</span>
                                <PlusButton lineId={line.id} />
                            </div>
                            <RemoveButton lineId={line.id} />
                        </div>
                    </div>

                    <div className="hidden sm:block text-right flex-shrink-0">
                        <p className="font-medium text-[var(--color-primary)]">
                            <Price value={line.linePriceWithTax} currencyCode={activeOrder.currencyCode} />
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                            <Price value={line.unitPriceWithTax} currencyCode={activeOrder.currencyCode} /> {t.each}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
