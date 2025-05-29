import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EnhancedFilters from '@/components/EnhancedFilters';
import MasonryGrid from '@/components/MasonryGrid';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    categories: [],
    rating: 0,
    sortBy: 'name',
    inStock: false
  });

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const products = [
    {
      id: 1,
      name: 'Maasai Leather Tote',
      price: 89,
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      rating: 4.8,
      category: 'ladies',
      description: 'Handcrafted by Maasai artisans with traditional techniques passed down through generations',
      inStock: true,
      tags: ['leather', 'handmade']
    },
    {
      id: 2,
      name: 'Sahara Crossbody',
      price: 65,
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      rating: 4.9,
      category: 'ladies',
      description: 'Perfect for daily adventures, combining style with functionality',
      inStock: true,
      tags: ['crossbody', 'adventure']
    },
    {
      id: 3,
      name: 'Kente Messenger Bag',
      price: 125,
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      rating: 4.7,
      category: 'men',
      description: 'Traditional patterns meet modern design in this unique messenger bag',
      inStock: false,
      tags: ['messenger', 'traditional']
    },
    {
      id: 4,
      name: 'African Print Wallet',
      price: 35,
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      rating: 4.6,
      category: 'accessories',
      description: 'Compact and stylish wallet featuring authentic African prints',
      inStock: true,
      tags: ['wallet', 'print']
    },
    {
      id: 5,
      name: 'Beaded Jewelry Set',
      price: 55,
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      rating: 4.8,
      category: 'accessories',
      description: 'Handmade with love, featuring traditional African beadwork',
      inStock: true,
      tags: ['jewelry', 'beaded']
    },
    {
      id: 6,
      name: 'Wooden Clutch',
      price: 75,
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      rating: 4.5,
      category: 'safari',
      description: 'Eco-friendly elegance crafted from sustainable African wood',
      inStock: true,
      tags: ['clutch', 'wooden']
    }
  ];

  const applyFilters = (productList: any[]) => {
    return productList
      .filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Category filter
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
        
        // Price filter
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        
        // Rating filter
        const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
        
        // Stock filter
        const matchesStock = !filters.inStock || product.inStock;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'name_desc':
            return b.name.localeCompare(a.name);
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.id - a.id;
          case 'popular':
            return b.rating - a.rating;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  };

  const filteredProducts = applyFilters(products);

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-copper-wood-400 max-w-2xl mx-auto">
            Discover authentic African craftsmanship in every piece
          </p>
        </div>

        {/* Enhanced Filters */}
        <EnhancedFilters
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-copper-wood-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Masonry Grid */}
        <MasonryGrid products={filteredProducts} />

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-copper-wood-400">No products found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  priceRange: [0, 200],
                  categories: [],
                  rating: 0,
                  sortBy: 'name',
                  inStock: false
                });
              }}
              className="mt-4 border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
