import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
  tags: string[];
}

interface Filters {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
  inStock: boolean;
}

export const useProductFilters = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 200] as [number, number],
    categories: [] as string[],
    rating: 0,
    sortBy: 'name',
    inStock: false
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Maasai Leather Tote',
      price: 89,
      image: '/lovable-uploads/6ed930a1-71ac-49fd-b106-141b7d78b22d.png',
      rating: 4.8,
      category: 'bags',
      description: 'Handcrafted by Maasai artisans',
      inStock: true,
      tags: ['leather', 'handmade']
    },
    {
      id: 2,
      name: 'Sahara Crossbody',
      price: 65,
      image: '/lovable-uploads/d25894e7-0c87-441b-bd66-75fe377c8cb4.png',
      rating: 4.9,
      category: 'bags',
      description: 'Perfect for daily adventures',
      inStock: true,
      tags: ['crossbody', 'adventure']
    },
    {
      id: 3,
      name: 'Kente Messenger Bag',
      price: 125,
      image: '/lovable-uploads/d9afcb00-459a-4fd9-8b86-bdaf96387375.png',
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
      image: '/lovable-uploads/b248e647-f0a9-4ed5-a326-00cec924ce86.png',
      rating: 4.6,
      category: 'wallets',
      description: 'Compact and stylish',
      inStock: true,
      tags: ['wallet', 'print']
    },
    {
      id: 5,
      name: 'Beaded Jewelry Set',
      price: 55,
      image: '/lovable-uploads/eaea5260-d612-4d26-9d9e-e8cb70850440.png',
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
      image: '/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png',
      rating: 4.5,
      category: 'safari',
      description: 'Eco-friendly elegance',
      inStock: true,
      tags: ['clutch', 'wooden']
    }
  ];

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

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
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
  }, [products, searchTerm, filters]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      priceRange: [0, 200] as [number, number],
      categories: [] as string[],
      rating: 0,
      sortBy: 'name',
      inStock: false
    });
  };

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearAllFilters
  };
};
