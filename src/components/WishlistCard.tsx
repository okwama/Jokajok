
import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface WishlistCardProps {
  item: WishlistItem;
  onRemoveFromWishlist: (id: number) => void;
  onAddToCart: (item: WishlistItem) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item, onRemoveFromWishlist, onAddToCart }) => {
  return (
    <Card className="group overflow-hidden bg-dark-clay-100 border-copper-wood-700 hover:border-burnished-copper-500 transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-soft-sand mb-2">{item.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-burnished-copper-500">Ksh{item.price}</span>
          {!item.inStock && (
            <span className="text-sm text-red-400">Out of Stock</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveFromWishlist(item.id)}
            className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Remove
          </Button>
          <Button
            size="sm"
            onClick={() => onAddToCart(item)}
            disabled={!item.inStock}
            className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
