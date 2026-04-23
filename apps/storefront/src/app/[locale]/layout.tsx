import type {Metadata, Viewport} from "next";
import {locale as rootLocale} from "next/root-params";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {Plus_Jakarta_Sans, Playfair_Display} from "next/font/google";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {toOgLocale} from "@/i18n/locale-utils";
import {getRouteLocale} from "@/i18n/server";
import {Toaster} from "@/components/ui/sonner";
import {Navbar} from "@/components/layout/navbar";
import {Footer} from "@/components/layout/footer";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {LenisProvider} from "@/components/providers/lenis-provider";
import {PopupManager} from "@/components/ui/popup";
import {CookieConsent} from "@/components/ui/cookie-consent";
import {SITE_NAME, SITE_URL} from "@/lib/metadata";
import {getTopCollections} from "@/lib/vendure/cached";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const ogLocale = toOgLocale(locale);
    const t = await getTranslations({locale, namespace: 'Common'});

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`,
        },
        description: t('siteDescription', {siteName: SITE_NAME}),
        openGraph: {
            type: "website",
            siteName: SITE_NAME,
            locale: ogLocale,
        },
        twitter: {
            card: "summary_large_image",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            languages: Object.fromEntries(
                routing.locales.map((l) => [l, `/${l}`])
            ),
        },
    };
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#ffffff"},
        {media: "(prefers-color-scheme: dark)", color: "#000000"},
    ],
};

interface Collection {
  id: string;
  name: string;
  slug: string;
}

export default async function LocaleLayout({children}: {children: React.ReactNode}) {
    const locale = await rootLocale();

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages({locale});

    let collections: Collection[] = [];
    try {
        collections = await getTopCollections(locale) || [];
    } catch (e) {
        console.error('Failed to load collections:', e);
    }

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body
                className={`${jakarta.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider>
                        <LenisProvider>
                            {/* Visible grid lines */}
                            <div className="fixed inset-0 pointer-events-none z-50 hidden md:block">
                                <div className="absolute left-[16.666%] top-0 bottom-0 w-px bg-[var(--color-foreground)]/10" />
                                <div className="absolute left-[33.333%] top-0 bottom-0 w-px bg-[var(--color-foreground)]/10" />
                                <div className="absolute left-[50%] top-0 bottom-0 w-px bg-[var(--color-foreground)]/10" />
                                <div className="absolute left-[66.666%] top-0 bottom-0 w-px bg-[var(--color-foreground)]/10" />
                                <div className="absolute left-[83.333%] top-0 bottom-0 w-px bg-[var(--color-foreground)]/10" />
                            </div>
                            {/* Paper texture overlay */}
                            <div className="paper-texture hidden" aria-hidden="true" />
                            <Navbar collections={collections} />
                            <PopupManager />
                            <CookieConsent />
                            {children}
                            <Footer/>
                            <Toaster/>
                        </LenisProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
