import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, ShoppingCart, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { prefetchProductImages } from '@/utils/imagePrefetch';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { getProducts, getCategories, searchProducts } from '@/services/dataService';
import type { Product, Category } from '@/services/dataService';
import QuickCheckout from '@/components/QuickCheckout';
import SidebarFilter from '@/components/SidebarFilter';

interface ProductFilters {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
  inStock: boolean;
}

interface QuickCheckoutState {
  isOpen: boolean;
  product: Product | null;
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [quickCheckout, setQuickCheckout] = useState<QuickCheckoutState>({
    isOpen: false,
    product: null
  });
  
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  
  const { addItem } = useCart();
  const { toast } = useToast();
  const [filters, setFilters] = useState<ProductFilters>({
    priceRange: [0, 50000],
    categories: [],
    rating: 0,
    sortBy: 'name',
    inStock: false
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search) {
      setSearchTerm(search);
    }
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        // Prefetch images for all products
        prefetchProductImages(productsData);
        
        setProducts(productsData);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product: Product) => {
      try {
        // Check if any filters are active (other than default values)
        const isFilterActive = 
          searchTerm !== '' ||
          filters.priceRange[0] !== 0 ||
          filters.priceRange[1] < 50000 || // Only active if max price is less than default 50000
          filters.categories.length > 0 ||
          filters.rating > 0 ||
          filters.inStock === true;
        
        // If no filters are active, include all products
        if (!isFilterActive) {
          return true;
        }
        
        // Search filter
        const matchesSearch = searchTerm === '' || 
          (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.tags && product.tags.some(tag => tag && tag.toLowerCase().includes(searchTerm.toLowerCase())));
        
        // Price filter - parse price strings by removing commas
        const productPrice = typeof product.price === 'string' ? 
          parseFloat(product.price.replace(/,/g, '')) : 
          (typeof product.price === 'number' ? product.price : 0);
        const minPrice = typeof filters.priceRange[0] === 'number' ? filters.priceRange[0] : 0;
        const maxPrice = typeof filters.priceRange[1] === 'number' ? filters.priceRange[1] : 50000; // Updated max price
        
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
        
        // Category filter - only match main categories (first part before any hyphen)
        const matchesCategory = filters.categories.length === 0 || 
          (product.category && filters.categories.some(cat => {
            // Get the main category ID (part before any hyphen)
            const productMainCategory = typeof product.category === 'string' ? 
              product.category.split('-')[0].trim().toLowerCase() : '';
            const filterMainCategory = typeof cat === 'string' ? 
              cat.split('-')[0].trim().toLowerCase() : '';
              
            return productMainCategory === filterMainCategory;
          }));
        
        // Rating filter - ensure rating is a number
        const productRating = typeof product.rating === 'number' ? product.rating : 0;
        const matchesRating = productRating >= (filters.rating || 0);
        
        // Stock filter - handle different inStock formats
        const stockValue = typeof product.inStock === 'boolean' ? 
          (product.inStock ? 1 : 0) : 
          (typeof product.inStock === 'number' ? product.inStock : 0);
        const matchesStock = !filters.inStock || stockValue > 0;
        
        return matchesSearch && matchesPrice && matchesCategory && matchesRating && matchesStock;
      } catch (error) {
        console.error('Error filtering product:', error, product);
        return true; // Include products that cause errors to be safe
      }
    });
  }, [products, searchTerm, filters]);

  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    switch(filters.sortBy) {
      case 'price-asc':
        // Parse price strings by removing commas and converting to number
        const priceA = parseFloat(a.price.replace(/,/g, ''));
        const priceB = parseFloat(b.price.replace(/,/g, ''));
        return priceA - priceB;
      case 'price-desc':
        // Parse price strings by removing commas and converting to number
        const priceA2 = parseFloat(a.price.replace(/,/g, ''));
        const priceB2 = parseFloat(b.price.replace(/,/g, ''));
        return priceB2 - priceA2;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0] || ''
    });
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickCheckout = (product: Product) => {
    setQuickCheckout({ isOpen: true, product });
    handleQuickBuy(product);
  };

  const closeQuickCheckout = () => {
    setQuickCheckout({ isOpen: false, product: null });
  };
  
  const handleQuickBuy = (product: Product) => {
    handleQuickCheckout(product);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
        <Loader2 className="h-12 w-12 animate-spin text-copper-wood-600 mb-4" />
        <p className="text-copper-wood-400 text-lg">Loading products...</p>
        <p className="text-copper-wood-500 text-sm mt-2">Please wait while we fetch your items</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center">
        <div className="container mx-auto p-8 text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-soft-sand mb-4">Oops! Something went wrong</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full bg-copper-wood-600 hover:bg-copper-wood-700"
            >
              Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')} 
              className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">
              Our Collection
            </h1>
            <p className="text-xl text-copper-wood-400 max-w-2xl mx-auto">
              Discover authentic African craftsmanship in every piece
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 max-w-4xl mx-auto px-4">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-copper-wood-400" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-clay-100 border-copper-wood-700 text-soft-sand placeholder:text-copper-wood-400 h-12 text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {/* All Products Button */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters(prev => ({
                      ...prev,
                      categories: [],
                      priceRange: [0, 50000],
                      inStock: false
                    }));
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                    filters.categories.length === 0
                      ? 'bg-burnished-copper-600 text-white shadow-lg'
                      : 'bg-dark-clay-100 text-copper-wood-400 hover:bg-dark-clay-200 border border-copper-wood-700 hover:shadow-md'
                  }`}
                >
                  All Products
                </button>
                
                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSearchTerm('');
                      setFilters(prev => ({
                        ...prev,
                        categories: prev.categories.includes(category.id) 
                          ? [] 
                          : [category.id],
                        priceRange: [0, 50000],
                        inStock: false
                      }));
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                      filters.categories.includes(category.id)
                        ? 'bg-burnished-copper-600 text-white shadow-lg'
                        : 'bg-dark-clay-100 text-copper-wood-400 hover:bg-dark-clay-200 border border-copper-wood-700 hover:shadow-md'
                    }`}
                  >
                    {category.name}
                    {category.productCount !== undefined && (
                      <span className="text-xs bg-copper-wood-700 text-soft-sand rounded-full h-5 w-5 flex-shrink-0 flex items-center justify-center">
                        {category.productCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {sortedProducts.map((product: Product) => (
                <Card key={product.id} className="group h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100 border border-copper-wood-700 w-full">
                  <div className="flex-1 flex flex-col">
                    <Link 
                      to={`/products/${product.id}`}
                      state={{ product }}
                      className="block flex-1"
                    >
                      <div className="aspect-[4/5] overflow-hidden relative">
                        <OptimizedImage 
                          src={product.images?.[0] || ''} 
                          alt={product.name}
                          className="group-hover:scale-105 transition-transform duration-300"
                          priority={product.id <= 4} // Prioritize loading for first 4 products
                        />
                        {!product.inStock && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-burnished-copper-500 fill-current' : 'text-copper-wood-600'}`} 
                            />
                          ))}
                          <span className="ml-2 text-sm text-copper-wood-400">({product.rating.toFixed(1)})</span>
                        </div>
                        <h3 className="text-sm font-serif font-semibold text-soft-sand mb-2">
                          {product.name}
                        </h3>
                        <p className="text-copper-wood-400 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-soft-sand">Ksh {product.price.toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Link>
                    <div className="p-4 pt-0">
                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          disabled={!product.inStock}
                          className="flex-1 bg-copper-wood-600 hover:bg-copper-wood-700 text-soft-sand border-0"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickCheckout(product);
                          }}
                          disabled={!product.inStock}
                          className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0"
                          size="sm"
                        >
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Quick Buy
                        </Button>
                      </div>
                      <Link 
                        to={`/products/${product.id}`} 
                        state={{ product }}
                        className="block mt-2"
                      >
                        <Button 
                          variant="outline"
                          className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-copper-wood-400">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      priceRange: [0, 50000],
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
      </div>

      {quickCheckout.isOpen && quickCheckout.product && (
       <QuickCheckout 
         isOpen={quickCheckout.isOpen}
         onClose={closeQuickCheckout} 
       />
      )}
    </>
  );
};

export default Products;
