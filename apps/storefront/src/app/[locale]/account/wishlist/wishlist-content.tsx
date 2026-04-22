'use client';

import {useWishlistStore} from '@/hooks/use-wishlist';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {Heart, ShoppingBag, Trash2} from 'lucide-react';
import {toast} from 'sonner';

export function WishlistContent() {
    const t = useTranslations('Account');
    const {items, removeItem} = useWishlistStore();

    if (items.length === 0) {
        return (
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center text-center gap-6">
                        <Heart className="w-16 h-16 text-gray-400" />
                        <h1 className="text-3xl font-bold">Your wishlist is empty</h1>
                        <p className="text-gray-500 max-w-md">
                            Save items you love to your wishlist to keep them for later.
                        </p>
                        <Link href="/" className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Wishlist</h1>

                <div className="space-y-4">
                    {items.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-4 border border-gray-200 rounded-lg p-3 sm:p-4"
                        >
                            <Link href={`/product/${product.slug}`} className="flex-shrink-0">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-md overflow-hidden">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            N/A
                                        </div>
                                    )}
                                </div>
                            </Link>
                            
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <Link href={`/product/${product.slug}`}>
                                        <h3 className="font-medium text-sm sm:text-base hover:text-gray-600 truncate">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-3">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Move to Bag
                                    </Link>
                                    <button
                                        onClick={() => {
                                            removeItem(product.id);
                                            toast.success(`${product.name} removed from wishlist`);
                                        }}
                                        className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                                        title="Remove"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}