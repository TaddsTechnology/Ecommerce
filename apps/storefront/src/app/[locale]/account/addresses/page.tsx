import type {Metadata} from 'next';
import {getRouteLocale} from '@/i18n/server';
import { query } from '@/lib/vendure/api';
import { GetCustomerAddressesQuery, GetAvailableCountriesQuery } from '@/lib/vendure/queries';
import { AddressesClient } from './addresses-client';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('addressesPageTitle'),
    };
}

export default async function AddressesPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Account'});
    const [addressesResult, countriesResult] = await Promise.all([
        query(GetCustomerAddressesQuery, {}, { useAuthToken: true }),
        query(GetAvailableCountriesQuery, {}, { languageCode: locale }),
    ]);

    const addresses = addressesResult.data.activeCustomer?.addresses || [];
    const countries = countriesResult.data.availableCountries || [];

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div>
                    <h1 className="text-3xl font-bold">{t('addresses')}</h1>
                    <p className="text-gray-500 mt-2">
                        {t('manageAddresses')}
                    </p>
                </div>

                <div className="mt-8">
                    <AddressesClient addresses={addresses} countries={countries} />
                </div>
            </div>
        </main>
    );
}
