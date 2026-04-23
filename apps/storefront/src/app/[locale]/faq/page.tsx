import type { Metadata } from 'next';
import Link from 'next/link';
import { getRouteLocale } from '@/i18n/server';
import { getTranslations } from 'next-intl/server';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'FAQ'});
    return {
        title: t('pageTitle'),
    };
}

export default async function FAQPage() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'FAQ'});

    const faqs = [
        {
            question: t('questions.shipping.question'),
            answer: t('questions.shipping.answer'),
        },
        {
            question: t('questions.returns.question'),
            answer: t('questions.returns.answer'),
        },
        {
            question: t('questions.tracking.question'),
            answer: t('questions.tracking.answer'),
        },
        {
            question: t('questions.international.question'),
            answer: t('questions.international.answer'),
        },
        {
            question: t('questions.payment.question'),
            answer: t('questions.payment.answer'),
        },
        {
            question: t('questions.warranty.question'),
            answer: t('questions.warranty.answer'),
        },
        {
            question: t('questions.size.question'),
            answer: t('questions.size.answer'),
        },
        {
            question: t('questions.contact.question'),
            answer: t('questions.contact.answer'),
        },
    ];

    return (
        <main className="min-h-screen pt-24 md:pt-28">
            <div className="container mx-auto px-8 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="h-px w-12 bg-[var(--color-gold)] mb-8" />
                    <h1 className="text-4xl md:text-5xl font-[var(--font-display)] leading-[0.9] mb-4">
                        {t('pageTitle')}
                    </h1>
                    <p className="text-[var(--color-muted)] mb-16 max-w-xl">
                        {t('pageDescription')}
                    </p>

                    <Accordion className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-[var(--color-foreground)]/10">
                                <AccordionTrigger className="text-left text-sm uppercase tracking-[0.15em] py-5 hover:no-underline hover:text-[var(--color-gold)] transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm text-[var(--color-muted)] leading-relaxed pb-5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-16 pt-8 border-t border-[var(--color-foreground)]/10 text-center">
                        <p className="text-[var(--color-muted)] mb-4">{t('stillHaveQuestions')}</p>
                        <Link href="/contact" className="inline-block text-xs uppercase tracking-[0.2em] border-b border-[var(--color-gold)] pb-1 hover:text-[var(--color-gold)] transition-colors">
                            {t('contactUs')}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}