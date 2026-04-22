import type {Metadata} from 'next';
import {query} from '@/lib/vendure/api';
import {GetCustomerOrdersQuery} from '@/lib/vendure/queries';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { AnimatedOrdersList } from './animated-orders-list';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('ordersPageTitle'),
    };
}

const ITEMS_PER_PAGE = 10;

export default async function OrdersPage(props: PageProps<'/[locale]/account/orders'>) {
    const searchParams = await props.searchParams;
    const locale = await getRouteLocale();
    const pageParam = searchParams.page;
    const currentPage = parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam || '1', 10);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const {data} = await query(
        GetCustomerOrdersQuery,
        {
            options: {
                take: ITEMS_PER_PAGE,
                skip,
                filter: {
                    state: {
                        notEq: 'AddingItems',
                    },
                },
            },
        },
        {useAuthToken: true}
    );

    if (!data.activeCustomer) {
        return redirect({href: '/sign-in', locale});
    }
    const t = await getTranslations({locale, namespace: 'Account'});

    const orders = data.activeCustomer.orders.items;
    const totalItems = data.activeCustomer.orders.totalItems;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl font-bold mb-6">{t('myOrders')}</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">{t('noOrders')}</p>
                    </div>
                ) : (
                    <AnimatedOrdersList
                        orders={orders}
                        t={t}
                        locale={locale}
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </main>
    );
}