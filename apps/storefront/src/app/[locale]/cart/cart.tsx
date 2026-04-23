import {CartItems} from "@/app/[locale]/cart/cart-items";
import {OrderSummary} from "@/app/[locale]/cart/order-summary";
import {PromotionCode} from "@/app/[locale]/cart/promotion-code";
import {getRouteLocale} from "@/i18n/server";
import {getTranslations} from "next-intl/server";
import {getActiveCurrencyCode} from "@/lib/currency-server";
import {query} from "@/lib/vendure/api";
import {GetActiveOrderQuery} from "@/lib/vendure/queries";

export async function Cart() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Cart'});
    const currencyCode = await getActiveCurrencyCode();
    const {data} = await query(GetActiveOrderQuery, {}, {
        useAuthToken: true,
        languageCode: locale,
        currencyCode,
    });

    const activeOrder = data.activeOrder;

    const translations = {
        empty: t('empty'),
        emptyMessage: t('emptyMessage'),
        continueShopping: t('continueShopping'),
        sku: 'SKU',  // Simple fallback without variable
        each: t('each'),
    };

    // Handle empty cart case
    if (!activeOrder || activeOrder.lines.length === 0) {
        return <CartItems activeOrder={null} t={translations}/>;
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <CartItems activeOrder={activeOrder} t={translations}/>

            <div className="lg:col-span-1">
                <OrderSummary activeOrder={activeOrder}/>
                <PromotionCode activeOrder={activeOrder}/>
            </div>
        </div>
    )
}