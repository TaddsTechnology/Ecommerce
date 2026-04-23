import type {Metadata} from 'next';
import {getActiveCurrencyCode} from '@/lib/currency-server';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import {query} from '@/lib/vendure/api';
import {
    GetActiveOrderForCheckoutQuery,
    GetCustomerAddressesQuery,
    GetEligiblePaymentMethodsQuery,
    GetEligibleShippingMethodsQuery,
} from '@/lib/vendure/queries';
import {redirect} from '@/i18n/navigation';
import CheckoutFlow from './checkout-flow';
import {CheckoutProvider} from './checkout-provider';
import {noIndexRobots} from '@/lib/metadata';
import {getActiveCustomer} from '@/lib/vendure/actions';
import {getAvailableCountriesCached} from '@/lib/vendure/cached';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Checkout'});
    return {
        title: t('pageTitle'),
        robots: noIndexRobots(),
    };
}

export default async function CheckoutPage() {
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const t = await getTranslations({locale, namespace: 'Checkout'});
    const customer = await getActiveCustomer();
    const isGuest = !customer;

    const [orderRes, addressesRes, countries, shippingMethodsRes, paymentMethodsRes] =
        await Promise.all([
            query(GetActiveOrderForCheckoutQuery, {}, {useAuthToken: true, currencyCode}),
            isGuest
                ? Promise.resolve({ data: { activeCustomer: null } })
                : query(GetCustomerAddressesQuery, {}, {useAuthToken: true}),
            getAvailableCountriesCached(locale),
            query(GetEligibleShippingMethodsQuery, {}, {useAuthToken: true, currencyCode}),
            query(GetEligiblePaymentMethodsQuery, {}, {useAuthToken: true, currencyCode}),
        ]);

    const activeOrder = orderRes.data.activeOrder;

    if (!activeOrder || activeOrder.lines.length === 0) {
        return redirect({href: '/cart', locale});
    }

    if (activeOrder.state !== 'AddingItems' && activeOrder.state !== 'ArrangingPayment') {
        return redirect({href: `/order-confirmation/${activeOrder.code}`, locale});
    }

    const addresses = addressesRes.data.activeCustomer?.addresses || [];
    const shippingMethods = shippingMethodsRes.data.eligibleShippingMethods || [];
    const paymentMethods =
        paymentMethodsRes.data.eligiblePaymentMethods?.filter((m) => m.isEligible) || [];

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <div className="bg-[var(--color-foreground)] text-[var(--color-background)] py-12 md:py-16">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-6" />
                    <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9]">
                        {t('pageTitle')}
                    </h1>
                </div>
            </div>
            
            {/* Checkout content */}
            <div className="container mx-auto px-8 md:px-16 py-12">
                <CheckoutProvider
                    order={activeOrder}
                    addresses={addresses}
                    countries={countries}
                    shippingMethods={shippingMethods}
                    paymentMethods={paymentMethods}
                    isGuest={isGuest}
                >
                    <CheckoutFlow/>
                </CheckoutProvider>
            </div>
        </div>
    );
}
