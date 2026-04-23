'use client';

import {useRef} from 'react';
import {ProductCard} from './product-card';
import {Pagination} from '@/components/shared/pagination';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {FragmentOf} from '@/graphql';
import {ProductCardFragment} from '@/lib/vendure/fragments';

interface ProductGridProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchResult?: any;
    currentPage?: number;
    take?: number;
    totalItems?: number;
    products?: Array<FragmentOf<typeof ProductCardFragment>>;
    t?: {
        productCount: string;
        noProductsFound: string;
    };
}

export function ProductGrid({searchResult, currentPage, take, totalItems, products, t}: ProductGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const totalPages = totalItems ? Math.ceil(totalItems / (take || 12)) : 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = searchResult?.items as any[] || products || [];

    useGSAP(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
        
        if (gridRef.current?.children) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'power3.out'
                }
            );
        }
    }, { scope: containerRef });

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-[var(--color-muted)]">{t?.noProductsFound || 'No products found'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-12" ref={containerRef}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12" ref={gridRef}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                {items.map((product: any, i: number) => (
                    <ProductCard key={'product-grid-item-' + i} product={product}/>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage || 1} totalPages={totalPages}/>
            )}
        </div>
    );
}