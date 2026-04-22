import {Suspense} from "react";
import {getRouteLocale} from "@/i18n/server";
import {getActiveCurrencyCode} from '@/lib/currency-server';
import {FacetFilters} from "@/components/commerce/facet-filters";
import {ProductGridSkeleton} from "@/components/shared/product-grid-skeleton";
import {ProductGrid } from "@/components/commerce/product-grid";
import {SearchHeader, SearchHeaderSkeleton} from "./search-header";
import {buildSearchInput, getCurrentPage} from "@/lib/search-helpers";
import {query} from "@/lib/vendure/api";
import {SearchProductsQuery} from "@/lib/vendure/queries";
import {getTranslations} from 'next-intl/server';

interface SearchResultsProps {
    searchParams: Promise<{
        page?: string
        q?: string
    }>
}

export async function SearchResults({searchParams}: SearchResultsProps) {
    const searchParamsResolved = await searchParams;
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const page = getCurrentPage(searchParamsResolved);
    const searchQuery = searchParamsResolved.q as string || '';
    const t = await getTranslations({locale, namespace: 'Product'});

    const productDataPromise = query(SearchProductsQuery, {
        input: buildSearchInput({searchParams: searchParamsResolved})
    }, {languageCode: locale, currencyCode});


    // Resolve in server component
    const productData = await productDataPromise;
    const searchResult = productData.data.search;
    const totalResults = searchResult.totalItems;

    const translations = {
        productCount: t('productCount', {count: totalResults}),
        noProductsFound: t('noProductsFound'),
    };

    return (
        <div>
            {/* Header with Sort + Active Filters */}
            <Suspense fallback={<SearchHeaderSkeleton/>}>
                <SearchHeader 
                    searchTerm={searchQuery} 
                    totalResults={totalResults}
                />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
                {/* Filters Sidebar - Desktop */}
                <aside className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24">
                        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-lg"/>}>
                            <FacetFilters productDataPromise={productDataPromise}/>
                        </Suspense>
                    </div>
                </aside>

                {/* Product Grid - pass resolved data */}
                <div className="lg:col-span-3">
                    <ProductGrid searchResult={searchResult} currentPage={page} take={12} totalItems={totalResults} t={translations}/>
                </div>
            </div>
        </div>
    )
}