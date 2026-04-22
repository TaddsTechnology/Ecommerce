import type {Metadata} from 'next';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import {ContactForm} from './contact-form';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Contact'});
    return {
        title: t('pageTitle'),
        description: t('pageDescription'),
    };
}

export default async function ContactPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Contact'});

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-gray-900 py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                        {t('pageTitle')}
                    </h1>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                        {t('pageDescription')}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">
                            {t('sendMessage')}
                        </h2>
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">
                                {t('contactInfo')}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5 7v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m5-7h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">{t('email')}</p>
                                        <p className="text-[var(--color-text-secondary)]">support@store.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">{t('phone')}</p>
                                        <p className="text-[var(--color-text-secondary)]">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">{t('address')}</p>
                                        <p className="text-[var(--color-text-secondary)]">123 Store Street, New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold uppercase tracking-wide mb-4">
                                {t('hours')}
                            </h3>
                            <div className="space-y-2 text-[var(--color-text-secondary)]">
                                <p>{t('monday')}: 9:00 AM - 6:00 PM</p>
                                <p>{t('tuesday')}: 9:00 AM - 6:00 PM</p>
                                <p>{t('wednesday')}: 9:00 AM - 6:00 PM</p>
                                <p>{t('thursday')}: 9:00 AM - 6:00 PM</p>
                                <p>{t('friday')}: 9:00 AM - 6:00 PM</p>
                                <p>{t('saturday')}: 10:00 AM - 4:00 PM</p>
                                <p>{t('sunday')}: {t('closed')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}