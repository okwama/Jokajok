
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuickAddSpeedDial from './QuickAddSpeedDial';

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

interface MasonryGridProps {
  products: Product[];
  columns?: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const MasonryGrid = ({ 
  products, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 } 
}: MasonryGridProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div 
        className={`
          grid gap-6 
          grid-cols-${columns.sm} 
          md:grid-cols-${columns.md} 
          lg:grid-cols-${columns.lg} 
          xl:grid-cols-${columns.xl}
        `}
        style={{
          gridAutoRows: 'masonry'
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group break-inside-avoid"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100 border border-copper-wood-700 relative">
              <div 
                className="relative overflow-hidden"
                style={{
                  height: `${300 + (index % 3) * 100}px` // Varying heights for masonry effect
                }}
              >
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
                
                {/* Floating Speed Dial for this product */}
                {hoveredProduct === product.id && (
                  <QuickAddSpeedDial
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      image: product.image
                    }}
                    className="absolute bottom-4 right-4 !fixed-none !relative"
                  />
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
                
                <p className="text-copper-wood-400 mb-4 line-clamp-2">{product.description}</p>
                
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
