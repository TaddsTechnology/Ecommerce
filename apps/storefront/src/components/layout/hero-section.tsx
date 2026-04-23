"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroContent {
    title: string;
    titleHighlight: string;
    subtitle: string;
    shopNow: string;
}

export function HeroSection({ content }: { content?: HeroContent }) {
    const t = content || {
        title: 'Refined',
        titleHighlight: 'Excellence',
        subtitle: 'Discover our curated collection of timeless pieces',
        shopNow: 'Explore Collection'
    };
    
    return (
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
            {/* Hero Content - Left side */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center justify-center p-8 lg:p-20 bg-[var(--color-background)]"
            >
                <div className="max-w-xl">
                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="h-px w-12 bg-[var(--color-gold)] mb-8"
                    />
                    
                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]"
                    >
                        Editorial
                    </motion.span>

                    {/* Headline - Massive typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight font-[var(--font-display)] text-[var(--color-foreground)] mt-4"
                    >
                        {t.title}{" "}
                        <em className="text-[var(--color-gold)] not-italic">{t.titleHighlight}</em>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-8 text-lg text-[var(--color-muted)] leading-relaxed max-w-md"
                    >
                        {t.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-12 flex flex-wrap gap-6"
                    >
                        <Link href="/search?q=all">
                            <Button>{t.shopNow}</Button>
                        </Link>
                        <Link href="/collection/new-arrivals">
                            <Button variant="outline">View Collection</Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Hero Image - Right side */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative bg-[var(--color-muted-bg)] min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Grayscale image placeholder */}
                <div className="absolute inset-0 bg-[var(--color-grey-200)]" />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/30 via-transparent to-transparent" />
                
                {/* Vertical text label */}
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] hidden lg:block" style={{ writingMode: 'vertical-rl' }}>
                    Vol. 01
                </span>
                
                {/* Placeholder text */}
                <span className="relative text-[var(--color-muted)] text-lg uppercase tracking-wide">
                    Feature Image
                </span>
            </motion.div>
        </section>
    );
}