import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedFilters from '@/components/EnhancedFilters';

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
      description: 'Handcrafted by Maasai artisans',
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
      description: 'Perfect for daily adventures',
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
      description: 'Traditional patterns meet modern design',
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
      description: 'Compact and stylish',
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
      description: 'Handmade with love',
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
      description: 'Eco-friendly elegance',
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100 border border-copper-wood-700">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-burnished-copper-500 fill-current' : 'text-copper-wood-600'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-copper-wood-400">({product.rating})</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-soft-sand mb-2">
                  {product.name}
                </h3>
                <p className="text-copper-wood-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-soft-sand">Ksh{product.price}</span>
                  <Link to={`/products/${product.id}`}>
                    <Button 
                      className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'View Details' : 'Out of Stock'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
