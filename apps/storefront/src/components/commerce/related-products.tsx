import { ProductCarousel } from "@/components/commerce/product-carousel";
import { getRouteLocale } from "@/i18n/server";
import {getActiveCurrencyCode} from '@/lib/currency-server';
import { query } from "@/lib/vendure/api";
import { GetCollectionProductsQuery } from "@/lib/vendure/queries";
import { getTranslations } from 'next-intl/server';

interface RelatedProductsProps {
    collectionSlug: string;
    currentProductId: string;
}

async function getRelatedProducts(collectionSlug: string, currentProductId: string, currencyCode: string) {
    const locale = await getRouteLocale();

    const result = await query(GetCollectionProductsQuery, {
        slug: collectionSlug,
        input: {
            collectionSlug,
            collectionSlug2: collectionSlug,
            collectionSlug3: collectionSlug,
            collectionSlug4: collectionSlug,
            term: '',
            facetValueIds: [],
            facetValueIds2: [],
            facetValueIds3: [],
            facetValueIds4: [],
            priceRange: { min: 0, max: 0 },
            priceRange2: { min: 0, max: 0 },
            priceRange3: { min: 0, max: 0 },
            priceRange4: { min: 0, max: 0 },
            take: 13,
            skip: 0,
            groupByProduct: true
        }
    }, {languageCode: locale, currencyCode});

    // Filter out the current product and limit to 12
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (result.data as any)?.search?.items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.filter((item: any) => item.productId !== currentProductId)
        .slice(0, 12) || [];
}

export async function RelatedProducts({ collectionSlug, currentProductId }: RelatedProductsProps) {
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const t = await getTranslations({locale, namespace: 'Product'});
    const products = await getRelatedProducts(collectionSlug, currentProductId, currencyCode);

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <ProductCarousel
            title={t('relatedProducts')}
            products={products}
        />
    );
}