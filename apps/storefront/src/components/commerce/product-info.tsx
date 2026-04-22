'use client';

import {useState, useMemo, useTransition, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {usePathname, useRouter} from '@/i18n/navigation';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {ShoppingCart, CheckCircle2, Heart, Truck, RotateCcw, ShieldCheck, Clock} from 'lucide-react';
import {addToCart} from '@/app/[locale]/product/[slug]/actions';
import {toast} from 'sonner';
import {Price} from '@/components/commerce/price';
import {useTranslations} from 'next-intl';
import {useWishlistStore} from '@/hooks/use-wishlist';

interface ProductInfoProps {
    product: {
        id: string;
        name: string;
        slug: string;
        description: string;
        assets?: Array<{ preview: string }>;
        collections?: Array<{ name: string }>;
        variants: Array<{
            id: string;
            name: string;
            sku: string;
            priceWithTax: number;
            stockLevel: string;
            options: Array<{
                id: string;
                code: string;
                name: string;
                groupId: string;
                group: {
                    id: string;
                    code: string;
                    name: string;
                };
            }>;
        }>;
        optionGroups: Array<{
            id: string;
            code: string;
            name: string;
            options: Array<{
                id: string;
                code: string;
                name: string;
            }>;
        }>;
    };
    searchParams: { [key: string]: string | string[] | undefined };
    currencyCode: string;
}

export function ProductInfo({product, searchParams, currencyCode}: ProductInfoProps) {
    const t = useTranslations('Product');
    const pathname = usePathname();
    const router = useRouter();
    const currentSearchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isAdded, setIsAdded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const priceRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const {addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist} = useWishlistStore();

    const isWishlisted = isInWishlist(product.id);

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
            toast.success(t('removedFromWishlist'));
        } else {
            const primaryCollection = product.collections?.[0];
            addToWishlist({
                id: product.id,
                name: product.name,
                price: selectedVariant?.priceWithTax || 0,
                image: (product as { assets?: Array<{ preview: string }> }).assets?.[0]?.preview || '',
                slug: product.slug,
                category: (product as { collections?: Array<{ name: string }> }).collections?.[0]?.name,
            });
            toast.success(t('addedToWishlist'));
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline();
        
        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
        
        if (priceRef.current) {
            tl.fromTo(priceRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
                '-=0.2'
            );
        }
        
        if (descRef.current) {
            tl.fromTo(descRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
                '-=0.2'
            );
        }
        
        if (optionsRef.current?.children) {
            tl.fromTo(optionsRef.current.children,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power3.out' },
                '-=0.2'
            );
        }
        
        if (buttonRef.current) {
            tl.fromTo(buttonRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
                '-=0.2'
            );
        }
    }, { scope: containerRef });

    // Initialize selected options from URL
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const initialOptions: Record<string, string> = {};

        // Load from URL search params
        product.optionGroups.forEach((group) => {
            const paramValue = searchParams[group.code];
            if (typeof paramValue === 'string') {
                // Find the option by code
                const option = group.options.find((opt) => opt.code === paramValue);
                if (option) {
                    initialOptions[group.id] = option.id;
                }
            }
        });

        return initialOptions;
    });

    // Find the matching variant based on selected options
    const selectedVariant = useMemo(() => {
        if (product.variants.length === 1) {
            return product.variants[0];
        }

        // If not all option groups have a selection, return null
        if (Object.keys(selectedOptions).length !== product.optionGroups.length) {
            return null;
        }

        // Find variant that matches all selected options
        return product.variants.find((variant) => {
            const variantOptionIds = variant.options.map((opt) => opt.id);
            const selectedOptionIds = Object.values(selectedOptions);
            return selectedOptionIds.every((optId) => variantOptionIds.includes(optId));
        });
    }, [selectedOptions, product.variants, product.optionGroups]);

    const handleOptionChange = (groupId: string, optionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [groupId]: optionId,
        }));

        // Find the option group and option to get their codes
        const group = product.optionGroups.find((g) => g.id === groupId);
        const option = group?.options.find((opt) => opt.id === optionId);

        if (group && option) {
            // Update URL with option code
            const params = new URLSearchParams(currentSearchParams);
            params.set(group.code, option.code);
            router.push(`${pathname}?${params.toString()}`, {scroll: false});
        }
    };

    const handleAddToCart = async () => {
        if (!selectedVariant) return;

        startTransition(async () => {
            const result = await addToCart(selectedVariant.id, 1);

            if (result.success) {
                setIsAdded(true);
                toast.success(t('addedToCartMessage'), {
                    description: t('addedToCartDescription', {name: product.name}),
                });

                // Reset the added state after 2 seconds
                setTimeout(() => setIsAdded(false), 2000);
            } else {
                toast.error(t('errorTitle'), {
                    description: result.error || t('errorAddToCart'),
                });
            }
        });
    };

    const isInStock = selectedVariant && selectedVariant.stockLevel !== 'OUT_OF_STOCK';
    const canAddToCart = selectedVariant && isInStock;

    return (
        <div className="space-y-8" ref={containerRef}>
            {/* Product Title & Price */}
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight" ref={titleRef}>
                    {product.name}
                </h1>
                {selectedVariant && (
                    <p className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900" ref={priceRef}>
                        <Price value={selectedVariant.priceWithTax} currencyCode={currencyCode}/>
                    </p>
                )}
            </div>

            {/* Product Description - 2025 modern typography */}
            <div className="text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl" ref={descRef}>
                <div dangerouslySetInnerHTML={{__html: product.description}}/>
            </div>

            {/* Option Groups */}
            {product.optionGroups.length > 0 && (
                <div className="space-y-5" ref={optionsRef}>
                    {product.optionGroups.map((group) => {
                        const selectedOptionId = selectedOptions[group.id];
                        const selectedOption = group.options.find(o => o.id === selectedOptionId);
                        return (
                            <div key={group.id} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Label className="text-base font-semibold">
                                        {group.name}
                                    </Label>
                                    {selectedOption && (
                                        <span className="text-sm text-gray-500">
                                            • <span className="font-medium text-gray-900">{selectedOption.name}</span>
                                        </span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={selectedOptions[group.id] || ''}
                                    onValueChange={(value) => handleOptionChange(group.id, value)}
                                >
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {group.options.map((option) => {
                                            const isSelected = selectedOptions[group.id] === option.id;
                                            return (
                                                <div key={option.id}>
                                                    <RadioGroupItem
                                                        value={option.id}
                                                        id={option.id}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={option.id}
                                                        className={`flex items-center justify-center rounded-lg border-2 px-4 py-3 text-sm font-medium cursor-pointer transition-all ${
                                                            isSelected
                                                                ? 'border-primary bg-primary text-primary-foreground ring-2 ring-primary/20'
                                                                : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                                                        }`}
                                                    >
                                                        {option.name}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </RadioGroup>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Stock Status */}
            {selectedVariant && (
                <div className="text-sm">
                    {isInStock ? (
                        <span className="inline-flex items-center gap-1.5 text-green-600 font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-600" />
                            {t('inStock')}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-destructive font-medium">
                            <span className="h-2 w-2 rounded-full bg-destructive" />
                            {t('outOfStock')}
                        </span>
                    )}
                </div>
            )}

            {/* Add to Cart & Wishlist Buttons */}
            <div className="pt-2 space-y-3" ref={buttonRef}>
                <Button
                    size="lg"
                    className="w-full h-14 text-base font-semibold rounded-[30px]"
                    disabled={!canAddToCart || isPending}
                    onClick={handleAddToCart}
                >
                    {isAdded ? (
                        <>
                            <CheckCircle2 className="mr-2 h-5 w-5"/>
                            {t('addedToCart')}
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-5 w-5"/>
                            {isPending
                                ? t('adding')
                                : !selectedVariant && product.optionGroups.length > 0
                                    ? t('selectOptions')
                                    : !isInStock
                                        ? t('outOfStock')
                                        : t('addToCart')}
                        </>
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className={`w-full h-14 text-base font-semibold rounded-[30px] flex items-center justify-center gap-2 ${
                        isWishlisted ? 'border-red-500 text-red-500 hover:border-red-500 hover:text-red-500' : ''
                    }`}
                    onClick={handleWishlistToggle}
                >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
                </Button>
            </div>

            {/* SKU */}
            {selectedVariant && (
                <div className="text-xs text-muted-foreground">
                    {t('sku', {sku: selectedVariant.sku})}
                </div>
            )}

            {/* Trust Badges */}
            <div className="border-t pt-6 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free Shipping</span>
                    <span>On orders over $150</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-primary" /> Easy Returns</span>
                    <span>30 days return policy</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure Checkout</span>
                    <span>100% protected</span>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Quick Delivery</span>
                    <span>2-4 business days</span>
                </div>
            </div>
        </div>
    );
}
