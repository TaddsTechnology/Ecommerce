import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SocialIcon } from "react-social-icons";

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
            { href: "/contact", label: "Contact Us" },
            { href: "/shipping", label: "Shipping Info" },
            { href: "/returns", label: "Returns" },
        ],
        company: [
            { href: "/about", label: "About Us" },
            { href: "/careers", label: "Careers" },
            { href: "/press", label: "Press" },
            { href: "/sustainability", label: "Sustainability" },
        ],
        legal: [
            { href: "/terms", label: "Terms of Service" },
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/cookies", label: "Cookie Policy" },
        ],
    };

    const socialLinks = [
        { href: "https://instagram.com", network: "instagram" },
        { href: "https://facebook.com", network: "facebook" },
        { href: "https://youtube.com", network: "youtube" },
        { href: "https://twitter.com", network: "x" },
    ];

    return (
        <footer className="bg-[#0a0a0a] text-white mt-auto">
            {/* Main Footer */}
            <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block text-2xl font-bold tracking-tight mb-4">
                            STORE
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Premium quality products for everyday living. We curate the best essentials designed to elevate your daily experience.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <SocialIcon
                                    key={link.href}
                                    url={link.href}
                                    network={link.network}
                                    className="!w-10 !h-10 !rounded-full !bg-transparent !border !border-gray-700 hover:!border-white hover:!bg-transparent transition-all duration-300"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Help</h3>
                        <ul className="space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Stay Connected</h3>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <a href="mailto:support@store.com" className="hover:text-white transition-colors">
                                    support@store.com
                                </a>
                            </p>
                            <p className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <a href="tel:+18001234567" className="hover:text-white transition-colors">
                                    +1 (800) 123-4567
                                </a>
                            </p>
                            <p className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>New York, NY</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 pt-10 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Join Our Newsletter</h3>
                            <p className="text-sm text-gray-400">
                                Subscribe to receive updates, access to exclusive deals, and more.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto max-w-md">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md bg-white text-black hover:bg-gray-200 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>© 2026 STORE. All rights reserved.</p>
                        <div className="flex gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
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