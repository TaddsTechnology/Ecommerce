import { getRouteLocale } from '@/i18n/server';
import { SearchX, Home, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { getTopCollections } from '@/lib/vendure/cached';

export default async function NotFound() {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'NotFound'});
    let collections: { id: string; name: string; slug: string }[] = [];
    try {
        collections = await getTopCollections(locale);
    } catch {
        // Gracefully handle if collections can't be fetched
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
            <div className="text-center space-y-8 max-w-lg">
                <div className="flex justify-center">
                    <div className="rounded-full bg-muted p-6">
                        <SearchX className="h-16 w-16 text-muted-foreground" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-7xl font-bold text-primary">404</h1>
                    <h2 className="text-2xl font-semibold">{t('title')}</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        {t('message')}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-[30px] bg-[var(--color-primary)] text-white h-14 px-8 font-medium">
                        <Home className="h-4 w-4" />
                        {t('goHome')}
                    </Link>
                    <Link href="/search" className="inline-flex items-center justify-center gap-2 rounded-[30px] border border-[var(--color-border)] h-14 px-8 font-medium">
                        <ShoppingBag className="h-4 w-4" />
                        {t('browseProducts')}
                    </Link>
                </div>

                {collections.length > 0 && (
                    <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-muted-foreground mb-3">{t('popularCollections')}</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {collections.slice(0, 6).map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/collection/${collection.slug}`}
                                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] h-9 px-3 text-sm font-medium"
                                >
                                    {collection.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
