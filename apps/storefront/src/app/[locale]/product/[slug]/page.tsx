import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { query } from '@/lib/vendure/api';
import { GetProductDetailQuery } from '@/lib/vendure/queries';
import { ProductImageCarousel } from '@/components/commerce/product-image-carousel';
import { ProductInfo } from '@/components/commerce/product-info';
import { RelatedProducts } from '@/components/commerce/related-products';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { notFound } from 'next/navigation';
import { Truck, RotateCcw, ShieldCheck, Clock } from 'lucide-react';
import { routing } from '@/i18n/routing';
import {
    SITE_NAME,
    truncateDescription,
    buildCanonicalUrl,
    buildOgImages,
} from '@/lib/metadata';
import {getTranslations} from 'next-intl/server';
import {toOgLocale} from '@/i18n/locale-utils';
import {getActiveCurrencyCode} from '@/lib/currency-server';
import {getRouteLocale} from '@/i18n/server';

async function getProductData(slug: string, currencyCode: string) {
    const locale = await getRouteLocale();

    return await query(GetProductDetailQuery, {slug}, {languageCode: locale, currencyCode});
}

export async function generateMetadata({
    params,
}: PageProps<'/[locale]/product/[slug]'>): Promise<Metadata> {
    const { slug } = await params;
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const result = await getProductData(slug, currencyCode);
    const product = result.data.product;

    const t = await getTranslations({locale, namespace: 'Product'});

    if (!product) {
        return {
            title: t('notFound'),
        };
    }

    const description = truncateDescription(product.description);
    const fallbackDescription = t('shopProductAt', {name: product.name, siteName: SITE_NAME});
    const ogImage = product.assets?.[0]?.preview;
    const ogLocale = toOgLocale(locale);
    const productPath = `/product/${product.slug}`;

    return {
        title: product.name,
        description: description || fallbackDescription,
        alternates: {
            canonical: buildCanonicalUrl(`/${locale}${productPath}`),
            languages: Object.fromEntries(
                routing.locales.map((l) => [l, buildCanonicalUrl(`/${l}${productPath}`)])
            ),
        },
        openGraph: {
            title: product.name,
            description: description || fallbackDescription,
            type: 'website',
            locale: ogLocale,
            url: buildCanonicalUrl(`/${locale}${productPath}`),
            images: buildOgImages(ogImage, product.name),
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: description || fallbackDescription,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export default async function ProductDetailPage({params, searchParams}: PageProps<'/[locale]/product/[slug]'>) {
    const { slug } = await params;
    const searchParamsResolved = await searchParams;
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const t = await getTranslations({locale, namespace: 'Product'});

    const result = await getProductData(slug, currencyCode);

    const product = result.data.product;

    if (!product) {
        notFound();
    }

    // Get the primary collection (prefer deepest nested / most specific)
    const primaryCollection = product.collections?.find(c => c.parent?.id) ?? product.collections?.[0];

return (
        <>
            <div className="container mx-auto px-8 md:px-16 pt-32 md:pt-28">
                {/* Breadcrumb Navigation - Minimal */}
                <Breadcrumb className="mb-12">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link href="/"/>} className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">{t('home')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {primaryCollection && (
                            <>
                                <BreadcrumbSeparator className="text-[var(--color-foreground)]/20" />
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link href={`/collection/${primaryCollection.slug}`} />} className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
                                        {primaryCollection.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        )}
                        <BreadcrumbSeparator className="text-[var(--color-foreground)]/20" />
                        <BreadcrumbPage className="text-xs uppercase tracking-[0.2em] text-[var(--color-foreground)]">{product.name}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14">
                    {/* Left Column: Image Carousel */}
                    <div className="lg:sticky lg:top-20 lg:self-start">
                        <ProductImageCarousel images={product.assets} />
                    </div>

                    {/* Right Column: Product Info */}
                    <div>
                        <ProductInfo product={product} searchParams={searchParamsResolved} currencyCode={currencyCode} />
                    </div>
                </div>
            </div>

            {/* Shipping & Trust Badges - Luxury styled */}
            <section className="py-12 mt-12 border-t border-[var(--color-foreground)]/10">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3 p-4 border border-[var(--color-foreground)]/10">
                            <Truck className="h-5 w-5 text-[var(--color-gold)]" />
                            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-foreground)]">{t('trustBadges.fastShipping')}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-[var(--color-foreground)]/10">
                            <RotateCcw className="h-5 w-5 text-[var(--color-gold)]" />
                            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-foreground)]">{t('trustBadges.freeReturns')}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-[var(--color-foreground)]/10">
                            <ShieldCheck className="h-5 w-5 text-[var(--color-gold)]" />
                            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-foreground)]">{t('trustBadges.secureCheckout')}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-[var(--color-foreground)]/10">
                            <Clock className="h-5 w-5 text-[var(--color-gold)]" />
                            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-foreground)]">{t('trustBadges.guarantee')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store FAQ Section */}
            <section className="py-16 md:py-24 bg-[var(--color-muted-bg)]">
                <div className="container mx-auto px-8 md:px-16 max-w-2xl">
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                    <h2 className="text-3xl font-[var(--font-display)] leading-[0.9] mb-8">{t('faq.title')}</h2>
                    <Accordion className="w-full border-t border-[var(--color-foreground)]/10">
                        <AccordionItem value="shipping" className="border-b border-[var(--color-foreground)]/10">
                            <AccordionTrigger className="text-xs uppercase tracking-[0.2em] py-4">{t('faq.shipping.question')}</AccordionTrigger>
                            <AccordionContent className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t('faq.shipping.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="returns" className="border-b border-[var(--color-foreground)]/10">
                            <AccordionTrigger className="text-xs uppercase tracking-[0.2em] py-4">{t('faq.returns.question')}</AccordionTrigger>
                            <AccordionContent className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t('faq.returns.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="tracking" className="border-b border-[var(--color-foreground)]/10">
                            <AccordionTrigger className="text-xs uppercase tracking-[0.2em] py-4">{t('faq.tracking.question')}</AccordionTrigger>
                            <AccordionContent className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t('faq.tracking.answer')}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="international" className="border-b border-[var(--color-foreground)]/10">
                            <AccordionTrigger className="text-xs uppercase tracking-[0.2em] py-4">{t('faq.international.question')}</AccordionTrigger>
                            <AccordionContent className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t('faq.international.answer')}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {primaryCollection && (
                <RelatedProducts
                    collectionSlug={primaryCollection.slug}
                    currentProductId={product.id}
                />
            )}
        </>
    );
}
