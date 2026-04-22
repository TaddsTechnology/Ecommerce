'use client';

import {useRef} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {ArrowRightIcon} from "lucide-react";
import {Price} from '@/components/commerce/price';
import {OrderStatusBadge} from '@/components/commerce/order-status-badge';
import {formatDate} from '@/lib/format';
import { Link } from '@/i18n/navigation';

export function AnimatedOrdersList({orders, t, locale, totalPages, currentPage}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: any;
    locale: string;
    totalPages: number;
    currentPage: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );

        const items = containerRef.current?.querySelectorAll('.order-item');
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }
            );
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* Mobile: Card-based layout */}
            <div className="md:hidden space-y-3">
                {orders.map((order) => (
                    <Link
                        key={order.id}
                        href={`/account/orders/${order.code}`}
                        className="block border rounded-xl p-4 bg-card hover:bg-muted/30 transition-colors duration-200 order-item"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold">#{order.code}</span>
                            <OrderStatusBadge state={order.state}/>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{formatDate(order.createdAt, 'short', locale)}</span>
                            <span className="font-medium text-base">
                                <Price value={order.totalWithTax} currencyCode={order.currencyCode}/>
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                                {order.lines.length} {order.lines.length === 1 ? t('item') : t('items')}
                            </span>
                            <ArrowRightIcon className="h-4 w-4 text-muted-foreground"/>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden md:block border rounded-lg">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>{t('orderNumber')}</TableHead>
                            <TableHead>{t('date')}</TableHead>
                            <TableHead>{t('status')}</TableHead>
                            <TableHead>{t('itemsHeader')}</TableHead>
                            <TableHead className="text-right">{t('totalHeader')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/50 order-item">
                                <TableCell className="font-medium">
                                    <Link href={`/account/orders/${order.code}`} className="inline-flex items-center gap-2">
                                            {order.code} <ArrowRightIcon className="h-4 w-4"/>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {formatDate(order.createdAt, 'short', locale)}
                                </TableCell>
                                <TableCell>
                                    <OrderStatusBadge state={order.state}/>
                                </TableCell>
                                <TableCell>
                                    {order.lines.length}{' '}
                                    {order.lines.length === 1 ? t('item') : t('items')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Price value={order.totalWithTax} currencyCode={order.currencyCode}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={
                                        currentPage > 1
                                            ? `/account/orders?page=${currentPage - 1}`
                                            : '#'
                                    }
                                    className={
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>

                            {Array.from({length: totalPages}, (_, i) => i + 1).map(
                                (page) => {
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 &&
                                            page <= currentPage + 1)
                                    ) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href={`/account/orders?page=${page}`}
                                                    isActive={page === currentPage}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis/>
                                            </PaginationItem>
                                        );
                                    }
                                    return null;
                                }
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href={
                                        currentPage < totalPages
                                            ? `/account/orders?page=${currentPage + 1}`
                                            : '#'
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
