'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';
import { Grid3X3, List, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchHeaderProps {
  searchTerm: string;
}

export function SearchHeader({ searchTerm }: SearchHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeFilters = Object.entries(searchParams).filter(
    ([key]) => !['q', 'page', 'sort'].includes(key) && searchParams.get(key)
  );

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-4 mt-16 sm:mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {searchTerm ? searchTerm : 'All Products'}
          </h1>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map(([, value]) => (
            <button
              key={value as string}
              onClick={() => removeFilter(value as string)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
            >
              {value}
              <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export function SearchHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}