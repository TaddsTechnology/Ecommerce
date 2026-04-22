'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        let prev = 0;
        for (const i of range) {
            if (prev && i - prev > 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-2">
            <Link
                href={createPageUrl(currentPage - 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-[var(--color-grey-100)]'}`}
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>

            {pages.map((page, index) => {
                if (page === '...') {
                    return <span key={`dots-${index}`} className="px-2 text-muted-foreground">...</span>;
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                    <Link
                        key={pageNum}
                        href={createPageUrl(pageNum)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-[var(--color-grey-100)]'}`}
                    >
                        {pageNum}
                    </Link>
                );
            })}

            <Link
                href={createPageUrl(currentPage + 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-[var(--color-grey-100)]'}`}
            >
                <ChevronRight className="h-4 w-4" />
            </Link>
        </nav>
    );
}
