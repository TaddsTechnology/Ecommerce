"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BackgroundGrid } from "@/components/magicui/background-grid";

interface HeroContent {
    title: string;
    titleHighlight: string;
    subtitle: string;
    shopNow: string;
}

export function HeroSection({ content }: { content?: HeroContent }) {
    const t = content || {
        title: 'Your Title',
        titleHighlight: 'Here',
        subtitle: 'Add your subtitle text here',
        shopNow: 'Shop Now'
    };
    
    return (
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
            {/* Hero Image - 60% on desktop */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-[var(--color-grey-100)] min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
            >
                <BackgroundGrid className="opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                <span className="text-[var(--color-text-secondary)] text-lg font-medium uppercase tracking-wide">
                    Hero Image
                </span>
            </motion.div>

            {/* Hero Content - 40% on desktop */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <div className="max-w-md">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-5xl lg:text-7xl uppercase leading-[0.90] tracking-tight font-display text-[var(--color-primary)]"
                    >
                        {t.title}{" "}
                        <span className="text-[var(--color-text-secondary)]">{t.titleHighlight}</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-lg font-medium text-[var(--color-text-secondary)]"
                    >
                        {t.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <ShimmerButton>
                            <Link href="/search?q=all" className="text-white font-medium">
                                {t.shopNow}
                            </Link>
                        </ShimmerButton>
                        <Link
                            href="/collection/new-arrivals"
                            className="inline-flex items-center justify-center px-8 py-4 text-[var(--color-text-secondary)] font-medium hover:text-[var(--color-primary)] transition-colors"
                        >
                            Learn More
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
