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
        <Link href="/cart" className="p-2 relative hover:text-[var(--color-gold)] transition-colors duration-500">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-gold)] text-[var(--color-foreground)] text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
            <span className="sr-only">{t('shoppingCart')}</span>
        </Link>
    );
}
