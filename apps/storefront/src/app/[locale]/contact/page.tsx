import type {Metadata} from 'next';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import {ContactForm} from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Contact'});
    return {
        title: t('pageTitle'),
    };
}

export default async function ContactPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Contact'});

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            {/* Hero */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-8" />
                        <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-4">
                            {t('pageTitle')}
                        </h1>
                        <p className="text-[var(--color-muted)] max-w-xl mx-auto">
                            {t('pageDescription')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24 bg-[var(--color-muted-bg)]">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Contact Form */}
                            <div>
                                <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                                <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-2">
                                    {t('sendMessage')}
                                </h2>
                                <p className="text-[var(--color-muted)] text-sm mb-8">
                                    {t('formDescription')}
                                </p>
                                <ContactForm />
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-12">
                                <div>
                                    <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                                    <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-6">
                                        {t('contactInfo')}
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 border border-[var(--color-foreground)]/20 flex items-center justify-center flex-shrink-0">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-1">{t('email')}</p>
                                                <a href="mailto:support@brand.com" className="hover:text-[var(--color-gold)] transition-colors">
                                                    support@brand.com
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 border border-[var(--color-foreground)]/20 flex items-center justify-center flex-shrink-0">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-1">{t('phone')}</p>
                                                <a href="tel:+18001234567" className="hover:text-[var(--color-gold)] transition-colors">
                                                    +1 (800) 123-4567
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 border border-[var(--color-foreground)]/20 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-1">{t('address')}</p>
                                                <p>123 Luxury Lane, New York, NY 10001</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-[var(--font-display)] leading-[0.9] mb-6">
                                        {t('hours')}
                                    </h2>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-[var(--color-muted)]">{t('monday')} - {t('friday')}</span>
                                            <span>9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[var(--color-muted)]">{t('saturday')}</span>
                                            <span>10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[var(--color-muted)]">{t('sunday')}</span>
                                            <span>{t('closed')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}