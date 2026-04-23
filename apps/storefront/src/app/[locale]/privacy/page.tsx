import type { Metadata } from 'next';
import Link from 'next/link';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Privacy'});
    return {
        title: t('pageTitle'),
    };
}

export default async function PrivacyPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Privacy'});

    const sections = [
        { key: 'collection', title: t('sections.collection.title') },
        { key: 'usage', title: t('sections.usage.title') },
        { key: 'protection', title: t('sections.protection.title') },
        { key: 'cookies', title: t('sections.cookies.title') },
        { key: 'thirdParty', title: t('sections.thirdParty.title') },
        { key: 'retention', title: t('sections.retention.title') },
        { key: 'rights', title: t('sections.rights.title') },
        { key: 'children', title: t('sections.children.title') },
        { key: 'changes', title: t('sections.changes.title') },
    ];

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            <div className="container mx-auto px-8 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                    <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-4">
                        {t('pageTitle')}
                    </h1>
                    <p className="text-[var(--color-muted)] mb-16">
                        {t('lastUpdated')}
                    </p>

                    <div className="space-y-12">
                        {sections.map((section) => (
                            <div key={section.key}>
                                <h2 className="text-xl font-[var(--font-display)] leading-[0.9] mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    {t(`sections.${section.key}.content`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-[var(--color-foreground)]/10">
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