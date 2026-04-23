import type { Metadata } from 'next';
import Link from 'next/link';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Package, RefreshCw, Clock, Shield } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Returns'});
    return {
        title: t('pageTitle'),
    };
}

export default async function ReturnsPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Returns'});

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                        <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-6">
                            {t('pageTitle')}
                        </h1>
                        <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                            {t('pageDescription')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-16 md:py-24 bg-[var(--color-muted-bg)]">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                            <h2 className="text-3xl font-[var(--font-display)] leading-[0.9] mb-4">{t('howItWorks')}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { icon: Package, title: t('steps.1.title'), desc: t('steps.1.desc') },
                                { icon: RefreshCw, title: t('steps.2.title'), desc: t('steps.2.desc') },
                                { icon: Clock, title: t('steps.3.title'), desc: t('steps.3.desc') },
                                { icon: Shield, title: t('steps.4.title'), desc: t('steps.4.desc') },
                            ].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 border border-[var(--color-foreground)]/20 flex items-center justify-center">
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2">Step {index + 1}</p>
                                    <h3 className="text-lg font-[var(--font-display)] mb-2">{step.title}</h3>
                                    <p className="text-sm text-[var(--color-muted)]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Policy Details */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-12">
                            <div>
                                <div className="h-px w-12 bg-[var(--color-gold)] mb-6" />
                                <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-4">{t('policy.title')}</h2>
                                <div className="prose prose-sm max-w-none text-[var(--color-muted)] space-y-4">
                                    <p>{t('policy.description')}</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>{t('policy.point1')}</li>
                                        <li>{t('policy.point2')}</li>
                                        <li>{t('policy.point3')}</li>
                                        <li>{t('policy.point4')}</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-4">{t('refunds.title')}</h2>
                                <div className="prose prose-sm max-w-none text-[var(--color-muted)] space-y-4">
                                    <p>{t('refunds.description')}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-4">{t('exchanges.title')}</h2>
                                <div className="prose prose-sm max-w-none text-[var(--color-muted)] space-y-4">
                                    <p>{t('exchanges.description')}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-4">{t('exclusions.title')}</h2>
                                <div className="prose prose-sm max-w-none text-[var(--color-muted)] space-y-4">
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>{t('exclusions.point1')}</li>
                                        <li>{t('exclusions.point2')}</li>
                                        <li>{t('exclusions.point3')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-16 pt-12 border-t border-[var(--color-foreground)]/10">
                            <div className="bg-[var(--color-muted-bg)] p-8 text-center">
                                <h3 className="text-xl font-[var(--font-display)] leading-[0.9] mb-3">{t('needHelp')}</h3>
                                <p className="text-[var(--color-muted)] mb-6">{t('needHelpDesc')}</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] transition-colors">
                                        {t('contactUs')}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}