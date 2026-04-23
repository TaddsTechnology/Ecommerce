import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
    const footerLinks = {
        shop: [
            { href: "/collections/new", label: "New Arrivals" },
            { href: "/collections/bestsellers", label: "Best Sellers" },
            { href: "/collections/sale", label: "Sale" },
            { href: "/collections/all", label: "All Products" },
        ],
        help: [
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "Contact" },
            { href: "/shipping", label: "Shipping" },
            { href: "/returns", label: "Returns" },
        ],
        company: [
            { href: "/about", label: "About" },
            { href: "/careers", label: "Careers" },
            { href: "/press", label: "Press" },
            { href: "/sustainability", label: "Sustainability" },
        ],
        legal: [
            { href: "/terms", label: "Terms" },
            { href: "/privacy", label: "Privacy" },
            { href: "/cookies", label: "Cookies" },
        ],
    };

    return (
        <footer className="bg-[var(--color-foreground)] text-[var(--color-background)] mt-auto">
            {/* Main Footer */}
            <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block text-2xl font-[var(--font-display)] tracking-tight mb-6">
                            BRAND
                        </Link>
                        <p className="text-sm text-[var(--color-background)]/60 mb-8 leading-relaxed max-w-xs">
                            Curated excellence for discerning tastes. We source the finest pieces to elevate your everyday.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3 text-xs text-[var(--color-background)]/60">
                            <p>
                                <a href="mailto:support@brand.com" className="hover:text-[var(--color-gold)] transition-colors duration-500">
                                    support@brand.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:+18001234567" className="hover:text-[var(--color-gold)] transition-colors duration-500">
                                    +1 (800) 123-4567
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-background)]/80 mb-6">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[var(--color-background)]/60 hover:text-[var(--color-gold)] transition-colors duration-500">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-background)]/80 mb-6">Help</h3>
                        <ul className="space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[var(--color-background)]/60 hover:text-[var(--color-gold)] transition-colors duration-500">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-background)]/80 mb-6">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[var(--color-background)]/60 hover:text-[var(--color-gold)] transition-colors duration-500">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--color-background)]/80 mb-6">Newsletter</h3>
                        <p className="text-sm text-[var(--color-background)]/60 mb-6">
                            Subscribe for exclusive updates and early access.
                        </p>
                        <div className="flex flex-col gap-4">
                            <Input 
                                type="email" 
                                placeholder="Email address"
                                className="bg-transparent border-[var(--color-background)]/20 text-[var(--color-background)] placeholder:text-[var(--color-background)]/40"
                            />
                            <Button variant="white" className="w-full">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-background)]/10">
                <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-background)]/40">
                        <p>© 2026 BRAND. All rights reserved.</p>
                        <div className="flex gap-8">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-[var(--color-gold)] transition-colors duration-300">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}