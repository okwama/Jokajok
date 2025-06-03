
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import QuickCheckout from '@/components/QuickCheckout';
import ProductsHeader from '@/components/ProductsHeader';
import FilterSection from '@/components/FilterSection';
import ProductGrid from '@/components/ProductGrid';
import { useProductFilters } from '@/hooks/useProductFilters';

const Products = () => {
  const [showQuickCheckout, setShowQuickCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearAllFilters
  } = useProductFilters();

  useEffect(() => {
    // Simulate loading for demo
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickCheckout = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    setShowQuickCheckout(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <div className="flex gap-8">
            {/* Desktop Sidebar Filter */}
            <div className="hidden lg:block flex-shrink-0 w-80">
              <FilterSection
                filters={filters}
                onFilterChange={setFilters}
                filteredCount={filteredProducts.length}
                totalCount={products.length}
                showOnlyFilter={true}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-none">
              {/* Mobile Filter Button - only show filter button on mobile */}
              <FilterSection
                filters={filters}
                onFilterChange={setFilters}
                filteredCount={filteredProducts.length}
                totalCount={products.length}
                showOnlyMobile={true}
              />

              {/* Products Grid */}
              <Suspense fallback={<ProductGridSkeleton />}>
                {isLoading ? (
                  <ProductGridSkeleton />
                ) : (
                  <ProductGrid
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                    onQuickCheckout={handleQuickCheckout}
                  />
                )}
              </Suspense>

              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-xl text-copper-wood-400">No products found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="mt-4 border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <QuickCheckout
        isOpen={showQuickCheckout}
        onClose={() => setShowQuickCheckout(false)}
      />
    </>
  );
};

export default Products;
