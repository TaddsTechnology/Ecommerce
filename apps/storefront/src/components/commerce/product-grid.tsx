'use client';

import {useRef} from 'react';
import {ProductCard} from './product-card';
import {Pagination} from '@/components/shared/pagination';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

interface ProductGridProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchResult: any;
    currentPage: number;
    take: number;
    totalItems: number;
    t: {
        productCount: string;
        noProductsFound: string;
    };
}

export function ProductGrid({searchResult, currentPage, take, totalItems, t}: ProductGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const totalPages = Math.ceil(totalItems / take);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = searchResult?.items as any[];

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
                <p className="text-gray-500">{t.noProductsFound}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-10" ref={containerRef}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" ref={gridRef}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                {items.map((product: any, i: number) => (
                    <ProductCard key={'product-grid-item-' + i} product={product}/>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages}/>
            )}
        </div>
    );
}