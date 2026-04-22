'use client';

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface CartIconProps {
    cartItemCount: number;
}

export function CartIcon({ cartItemCount }: CartIconProps) {
    const t = useTranslations('Navigation');
    return (
        <Link href="/cart" className="relative p-2 rounded-full hover:bg-[var(--color-grey-100)] transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
            <span className="sr-only">{t('shoppingCart')}</span>
        </Link>
    );
}
