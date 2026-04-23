'use client';

import {useLocale} from 'next-intl';
import {toIntlLocale} from '@/i18n/locale-utils';

interface PriceProps {
    value: number;
    currencyCode?: string;
    className?: string;
}

export function Price({value, currencyCode = 'USD', className}: PriceProps) {
    const locale = useLocale();
    const intlLocale = toIntlLocale(locale);
    return (
        <span className={className}>
            {new Intl.NumberFormat(intlLocale, {
                style: 'currency',
                currency: currencyCode,
            }).format(value / 100)}
        </span>
    );
}