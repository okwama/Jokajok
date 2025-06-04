
import React from 'react';
import ProductCard from '@/components/ProductCard';

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

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickCheckout: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onQuickCheckout }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickCheckout={onQuickCheckout}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
