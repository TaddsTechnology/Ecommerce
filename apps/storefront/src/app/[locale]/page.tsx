import type {Metadata} from "next";
import {Suspense} from "react";
import {getRouteLocale} from "@/i18n/server";
import {HeroSection} from "@/components/layout/hero-section";
import {FeaturedProducts} from "@/components/commerce/featured-products";
import {ImageCarousel} from "@/components/layout/image-carousel";
import {SITE_NAME, SITE_URL} from "@/lib/metadata";
import {getTranslations} from 'next-intl/server';
import {toOgLocale} from '@/i18n/locale-utils';
import {routing} from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Home'});
    const ogLocale = toOgLocale(locale);
    const baseUrl = SITE_URL.replace(/\/$/, '');
    const isDefaultLocale = locale === routing.defaultLocale;
    const canonicalPath = isDefaultLocale ? '/' : `/${locale}`;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_NAME,
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-123-4567",
            "contactType": "customer service",
            "email": "support@brand.com"
        },
        "sameAs": []
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/${locale}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return {
        title: {
            absolute: `${SITE_NAME} - ${t('pageTitle')}`,
        },
        description: t('description'),
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${SITE_NAME} - ${t('pageTitle')}`,
            description: t('ogDescription'),
            type: "website",
            locale: ogLocale,
            url: SITE_URL,
        },
        other: {
            "script:ld+json": JSON.stringify([organizationSchema, websiteSchema])
        }
    };
}

export default async function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection/>
            <Suspense>
                <FeaturedProducts/>
            </Suspense>

            <ImageCarousel />
        </div>
    );
}
