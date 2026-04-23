import type { Metadata } from 'next';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Cookies'});
    return {
        title: t('pageTitle'),
    };
}

export default async function CookiesPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Cookies'});

    const cookieTypes = [
        { key: 'essential', title: t('types.essential.title'), description: t('types.essential.description') },
        { key: 'analytics', title: t('types.analytics.title'), description: t('types.analytics.description') },
        { key: 'functional', title: t('types.functional.title'), description: t('types.functional.description') },
        { key: 'marketing', title: t('types.marketing.title'), description: t('types.marketing.description') },
    ];

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            <div className="container mx-auto px-8 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                    <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-4">
                        {t('pageTitle')}
                    </h1>
                    <p className="text-[var(--color-muted)] mb-8">
                        {t('lastUpdated')}
                    </p>
                    <p className="text-[var(--color-muted)] mb-16 leading-relaxed">
                        {t('introduction')}
                    </p>

                    {/* Cookie Types */}
                    <div className="space-y-8 mb-16">
                        <div>
                            <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                            <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-6">{t('typesTitle')}</h2>
                        </div>
                        
                        {cookieTypes.map((cookie) => (
                            <div key={cookie.key} className="p-6 border border-[var(--color-foreground)]/10">
                                <h3 className="text-lg font-[var(--font-display)] mb-3">{cookie.title}</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{cookie.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* How to Manage */}
                    <div className="mb-16">
                        <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                        <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-6">{t('manageTitle')}</h2>
                        <div className="space-y-4 text-sm text-[var(--color-muted)] leading-relaxed">
                            <p>{t('manageDescription')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>{t('managePoint1')}</li>
                                <li>{t('managePoint2')}</li>
                                <li>{t('managePoint3')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Updates */}
                    <div className="mb-16">
                        <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                        <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-6">{t('updatesTitle')}</h2>
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                            {t('updatesDescription')}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="pt-8 border-t border-[var(--color-foreground)]/10">
                        <p className="text-sm text-[var(--color-muted)]">
                            {t('contactInfo')}{' '}
                            <Link href="/contact" className="text-[var(--color-gold)] hover:underline">
                                {t('contactLink')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}