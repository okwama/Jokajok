
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LazyImage from '@/components/LazyImage';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickCheckout: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickCheckout }) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100 border border-copper-wood-700">
      <div className="aspect-square overflow-hidden relative">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1600px) 33vw, 25vw"
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-soft-sand">Ksh{product.price}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-copper-wood-600 hover:bg-copper-wood-700 text-soft-sand border-0"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <Button
            onClick={() => onQuickCheckout(product)}
            disabled={!product.inStock}
            className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0"
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Buy
          </Button>
        </div>
        
        <Link to={`/products/${product.id}`} className="block mt-2">
          <Button 
            variant="outline"
            className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            size="sm"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
