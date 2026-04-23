import type { Metadata } from 'next';
import Link from 'next/link';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'About'});
    return {
        title: t('pageTitle'),
    };
}

export default async function AboutPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'About'});

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                        <h1 className="text-4xl md:text-6xl font-[var(--font-display)] leading-[0.9] mb-6">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                            {t('heroDescription')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24 bg-[var(--color-muted-bg)]">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                            <h2 className="text-3xl md:text-4xl font-[var(--font-display)] leading-[0.9] mb-6">
                                {t('storyTitle')}
                            </h2>
                            <div className="space-y-4 text-[var(--color-muted)] leading-relaxed">
                                <p>{t('storyParagraph1')}</p>
                                <p>{t('storyParagraph2')}</p>
                                <p>{t('storyParagraph3')}</p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] bg-[var(--color-foreground)]/5">
                            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-foreground)]/20 text-6xl font-[var(--font-display)]">
                                BRAND
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                            <h2 className="text-3xl md:text-4xl font-[var(--font-display)] leading-[0.9] mb-4">
                                {t('valuesTitle')}
                            </h2>
                            <p className="text-[var(--color-muted)]">{t('valuesDescription')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {['quality', 'sustainability', 'craftsmanship'].map((value) => (
                                <div key={value} className="text-center p-6 border border-[var(--color-foreground)]/10 hover:border-[var(--color-gold)] transition-colors duration-500">
                                    <h3 className="text-lg font-[var(--font-display)] mb-3">
                                        {t(`values.${value}.title`)}
                                    </h3>
                                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                        {t(`values.${value}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: t('stats.years.number'), label: t('stats.years.label') },
                            { number: t('stats.customers.number'), label: t('stats.customers.label') },
                            { number: t('stats.products.number'), label: t('stats.products.label') },
                            { number: t('stats.countries.number'), label: t('stats.countries.label') },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-2">{stat.number}</p>
                                <p className="text-xs uppercase tracking-[0.2em] opacity-60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                        <h2 className="text-3xl md:text-4xl font-[var(--font-display)] leading-[0.9] mb-4">
                            {t('ctaTitle')}
                        </h2>
                        <p className="text-[var(--color-muted)] mb-8">{t('ctaDescription')}</p>
                        <Link href="/contact" className="inline-block bg-[var(--color-foreground)] text-[var(--color-background)] px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] transition-colors duration-500">
                            {t('ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}