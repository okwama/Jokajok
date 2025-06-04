
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarFilter from '@/components/SidebarFilter';
import EnhancedFilters from '@/components/EnhancedFilters';
import ProductGrid from '@/components/ProductGrid';
import { useProductFilters } from '@/hooks/useProductFilters';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    categories: [] as string[],
    rating: 0,
    sortBy: 'featured',
    inStock: false
  });

  const { 
    products, 
    filteredProducts, 
    categories, 
    isLoading, 
    error 
  } = useProductFilters(filters, searchTerm);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-charred-wood flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-soft-sand mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-copper-wood-400 mb-6">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charred-wood">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-soft-sand mb-4">
              Our Collection
            </h1>
            <p className="text-xl text-copper-wood-400 max-w-2xl mx-auto">
              Discover handcrafted leather goods that blend African heritage with contemporary design
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copper-wood-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-dark-clay-100 border-copper-wood-600 text-soft-sand placeholder-copper-wood-400 focus:border-burnished-copper-500"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <SidebarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              products={products}
            />
          </div>

          {/* Main Product Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle & Sort */}
            <EnhancedFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
              resultCount={filteredProducts.length}
            />

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-dark-clay-100 shadow-xl transform transition-transform">
            <SidebarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              products={products}
              onClose={() => setIsMobileFilterOpen(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
