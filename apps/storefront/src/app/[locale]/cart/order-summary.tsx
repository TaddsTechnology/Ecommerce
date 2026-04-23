import { Link } from '@/i18n/navigation';
import {Lock} from 'lucide-react';
import {Price} from '@/components/commerce/price';
import {getTranslations} from 'next-intl/server';

type ActiveOrder = {
    id: string;
    currencyCode: string;
    subTotalWithTax: number;
    shippingWithTax: number;
    totalWithTax: number;
    discounts?: Array<{
        description: string;
        amountWithTax: number;
    }> | null;
};

export async function OrderSummary({activeOrder}: { activeOrder: ActiveOrder }) {
    const t = await getTranslations('Cart');
    return (
        <div className="border border-[var(--color-foreground)] p-6 bg-[var(--color-background)]">
            <h2 className="text-xl font-[var(--font-display)] leading-[0.9] mb-6">{t('orderSummary')}</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">{t('subtotal')}</span>
                    <span>
                        <Price value={activeOrder.subTotalWithTax} currencyCode={activeOrder.currencyCode}/>
                    </span>
                </div>
                {activeOrder.discounts && activeOrder.discounts.length > 0 && (
                    <>
                        {activeOrder.discounts.map((discount, index) => (
                            <div key={index} className="flex justify-between text-sm text-green-600">
                                <span>{discount.description}</span>
                                <span>
                                    <Price value={discount.amountWithTax} currencyCode={activeOrder.currencyCode}/>
                                </span>
                            </div>
                        ))}
                    </>
                )}
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-muted)]">{t('shipping')}</span>
                    <span>
                        {activeOrder.shippingWithTax > 0
                            ? <Price value={activeOrder.shippingWithTax} currencyCode={activeOrder.currencyCode}/>
                            : t('calculatedAtCheckout')}
                    </span>
                </div>
            </div>

            <div className="border-t border-[var(--color-foreground)]/10 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                    <span className="font-[var(--font-display)]">{t('total')}</span>
                    <span className="text-2xl font-[var(--font-display)]">
                        <Price value={activeOrder.totalWithTax} currencyCode={activeOrder.currencyCode}/>
                    </span>
                </div>
            </div>

            <Link href="/checkout" className="inline-flex items-center justify-center bg-[var(--color-foreground)] text-[var(--color-background)] h-14 px-6 font-medium w-full uppercase text-xs tracking-[0.2em]">{t('proceedToCheckout')}</Link>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[var(--color-muted)]">
                <Lock className="h-3 w-3" />
                <span>{t('secureCheckout')}</span>
            </div>

            <Link href="/" className="inline-flex items-center justify-center border border-[var(--color-foreground)]/20 h-12 px-6 font-medium w-full mt-3 uppercase text-xs tracking-[0.2em]">{t('continueShopping')}</Link>
        </div>
    );
}
