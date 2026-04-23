import {getRouteLocale} from '@/i18n/server';
import {getTopCollections} from '@/lib/vendure/cached';
import Link from 'next/link';

export async function NavbarCollections({ className }: { className?: string }) {
    const locale = await getRouteLocale();
    
    try {
        const collections = await getTopCollections(locale);
        
        if (!collections || collections.length === 0) {
            return (
                <div className={className}>
                    <Link href="/search" className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)] transition-colors">
                        All Products
                    </Link>
                    <Link href="/collection/new-arrivals" className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)] transition-colors">
                        New Arrivals
                    </Link>
                </div>
            );
        }
        
        return (
            <div className={className}>
                {collections.slice(0, 5).map((collection: { id: string; name: string; slug: string }) => (
                    <Link
                        key={collection.id}
                        href={`/collection/${collection.slug}`}
                        className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)] transition-colors"
                    >
                        {collection.name}
                    </Link>
                ))}
            </div>
        );
    } catch {
        return (
            <div className={className}>
                <Link href="/search" className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)] transition-colors">
                    All Products
                </Link>
            </div>
        );
    }
}