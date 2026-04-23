'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/commerce/product-grid';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface ProductCarouselProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productsData: any;
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

export function FeaturedProductsTabs({ productsData, title }: ProductCarouselProps) {
  const [activeTab, setActiveTab] = useState('new');

  const getProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return productsData.bestsellers;
      case 'sale':
        return productsData.sale;
      default:
        return productsData.new;
    }
  };

  const filteredProducts = getProducts();

  return (
    <section className="py-20 md:py-32 bg-[var(--color-background)]">
      <div className="container mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Decorative line */}
          <div className="h-px w-16 bg-[var(--color-gold)] mx-auto mb-8" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] leading-[0.9] text-[var(--color-foreground)]">
            {title}
          </h2>
          <p className="text-[var(--color-muted)] text-base mt-6 max-w-md mx-auto">
            Discover our curated selection of timeless pieces designed to elevate your collection
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border-b border-[var(--color-foreground)]/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeTab === tab.id
                    ? 'text-[var(--color-foreground)] border-b-2 border-[var(--color-gold)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts.slice(0, 8)} />

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={`/collection/${tabs.find(t => t.id === activeTab)?.collection}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-foreground)] hover:text-[var(--color-gold)] transition-colors duration-500"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}