import {FeaturedProductsTabs} from "@/components/commerce/featured-products-tabs";
import {getRouteLocale} from "@/i18n/server";
import {unstable_cache} from "next/cache";
import {getActiveCurrencyCode} from '@/lib/currency-server';
import {query} from "@/lib/vendure/api";
import {GetCollectionProductsQuery} from "@/lib/vendure/queries";
import {getTranslations} from 'next-intl/server';

async function getCollectionProducts(slug: string, currencyCode: string) {
    const locale = await getRouteLocale();

    const result = await query(GetCollectionProductsQuery, {
        slug,
        input: {
            collectionSlug: slug,
            take: 12,
            skip: 0,
            groupByProduct: true
        }
    }, {languageCode: locale, currencyCode});

    return result.data.search.items;
}

export async function FeaturedProducts() {
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const t = await getTranslations({locale, namespace: 'Product'});

    const [newArrivals, bestsellers, sale] = await Promise.all([
        getCollectionProducts('new-arrivals', currencyCode),
        getCollectionProducts('bestsellers', currencyCode),
        getCollectionProducts('sale', currencyCode),
    ]);

    return (
        <FeaturedProductsTabs
            title={t('featuredProducts')}
            productsData={{
                new: newArrivals,
                bestsellers: bestsellers,
                sale: sale,
            }}
        />
    );
}