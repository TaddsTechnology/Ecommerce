'use client';

import { useState, Fragment } from 'react';
import { ProductCard } from '@/components/commerce/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FragmentOf } from '@/graphql';
import { ProductCardFragment } from '@/lib/vendure/fragments';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface ProductCarouselProps {
  title: string;
  products: Array<FragmentOf<typeof ProductCardFragment>>;
}

interface Tab {
  id: string;
  label: string;
  filter: string;
  collection: string;
}

const tabs: Tab[] = [
  { id: 'new', label: 'New Arrivals', filter: 'new', collection: 'new-arrivals' },
  { id: 'bestsellers', label: 'Best Sellers', filter: 'bestsellers', collection: 'bestsellers' },
  { id: 'sale', label: 'Sale', filter: 'sale', collection: 'sale' },
];

export function FeaturedProductsTabs({ products, title }: ProductCarouselProps) {
  const [activeTab, setActiveTab] = useState('new');

  const filteredProducts = products.slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#111111]">{title}</h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
            Discover our curated selection of premium products designed to elevate your lifestyle
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}