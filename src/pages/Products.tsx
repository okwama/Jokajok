
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Maasai Leather Tote',
      price: 89,
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      rating: 4.8,
      category: 'bags',
      description: 'Handcrafted by Maasai artisans'
    },
    {
      id: 2,
      name: 'Sahara Crossbody',
      price: 65,
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      rating: 4.9,
      category: 'bags',
      description: 'Perfect for daily adventures'
    },
    {
      id: 3,
      name: 'Kente Messenger Bag',
      price: 125,
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      rating: 4.7,
      category: 'bags',
      description: 'Traditional patterns meet modern design'
    },
    {
      id: 4,
      name: 'African Print Wallet',
      price: 35,
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      rating: 4.6,
      category: 'accessories',
      description: 'Compact and stylish'
    },
    {
      id: 5,
      name: 'Beaded Jewelry Set',
      price: 55,
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      rating: 4.8,
      category: 'accessories',
      description: 'Handmade with love'
    },
    {
      id: 6,
      name: 'Wooden Clutch',
      price: 75,
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      rating: 4.5,
      category: 'bags',
      description: 'Eco-friendly elegance'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'bags', name: 'Bags' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-swahili-dust-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-swahili-dust-800 mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-swahili-dust-600 max-w-2xl mx-auto">
            Discover authentic African craftsmanship in every piece
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-swahili-dust-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-swahili-dust-100 border-swahili-dust-300"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-copper-600 hover:bg-copper-700" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-swahili-dust-50">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-copper-500 fill-current' : 'text-swahili-dust-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-swahili-dust-600">({product.rating})</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-swahili-dust-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-swahili-dust-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-copper-600">${product.price}</span>
                  <Link to={`/products/${product.id}`}>
                    <Button size="sm" className="bg-copper-600 hover:bg-copper-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-swahili-dust-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
