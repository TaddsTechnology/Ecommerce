import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/metadata';

const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/terms',
    '/privacy',
    '/cookies',
    '/sign-in',
    '/register',
    '/cart',
    '/checkout',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL.replace(/\/$/, '');

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const locale of routing.locales) {
        const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;

        for (const route of staticRoutes) {
            sitemapEntries.push({
                url: `${baseUrl}${localePrefix}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        }

        sitemapEntries.push({
            url: `${baseUrl}${localePrefix}/collections/new-arrivals`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        });

        sitemapEntries.push({
            url: `${baseUrl}${localePrefix}/collections/bestsellers`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        });

        sitemapEntries.push({
            url: `${baseUrl}${localePrefix}/collections/sale`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        });

        sitemapEntries.push({
            url: `${baseUrl}${localePrefix}/search`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        });
    }

    return sitemapEntries;
}