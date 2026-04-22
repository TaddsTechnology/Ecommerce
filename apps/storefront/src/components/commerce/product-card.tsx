import Image from 'next/image';
import {FragmentOf, readFragment} from '@/graphql';
import {ProductCardFragment} from '@/lib/vendure/fragments';
import {Price} from '@/components/commerce/price';
import { Link } from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

interface ProductCardProps {
    product: FragmentOf<typeof ProductCardFragment>;
}

export function ProductCard({product: productProp}: ProductCardProps) {
    const t = useTranslations('Product');
    const product = readFragment(ProductCardFragment, productProp);

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group block transition-all duration-300"
        >
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                {product.productAsset ? (
                    <Image
                        src={product.productAsset.preview}
                        alt={product.productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        {t('noImage')}
                    </div>
                )}
            </div>
            <div className="py-3">
                <h3 className="text-sm font-medium leading-tight text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {product.productName}
                </h3>
                <p className="text-sm font-medium mt-1 text-gray-900">
                    {product.priceWithTax.__typename === 'PriceRange' ? (
                        product.priceWithTax.min !== product.priceWithTax.max ? (
                            <>
                                <span className="text-sm font-normal text-gray-500 mr-1">{t('from')}</span>
                                <Price value={product.priceWithTax.min} currencyCode={product.currencyCode}/>
                            </>
                        ) : (
                            <Price value={product.priceWithTax.min} currencyCode={product.currencyCode}/>
                        )
                    ) : product.priceWithTax.__typename === 'SinglePrice' ? (
                        <Price value={product.priceWithTax.value} currencyCode={product.currencyCode}/>
                    ) : null}
                </p>
            </div>
        </Link>
    );
}
