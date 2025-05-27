
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductDetailModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-clay-100 border-copper-wood-700 max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-soft-sand text-xl">{product.name}</DialogTitle>
            <Button variant="ghost" onClick={onClose} className="text-copper-wood-400 hover:text-soft-sand">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-copper-wood-400 text-sm">Price</label>
              <p className="text-soft-sand font-semibold">Ksh{product.price}</p>
            </div>
            <div>
              <label className="text-copper-wood-400 text-sm">Stock</label>
              <p className="text-soft-sand font-semibold">{product.stock} units</p>
            </div>
            <div>
              <label className="text-copper-wood-400 text-sm">SKU</label>
              <p className="text-soft-sand">{product.sku || 'N/A'}</p>
            </div>
            <div>
              <label className="text-copper-wood-400 text-sm">Category</label>
              <p className="text-soft-sand">{product.categories?.name || 'Uncategorized'}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-copper-wood-400 text-sm">Description</label>
            <p className="text-soft-sand mt-1">{product.description || 'No description available'}</p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <label className="text-copper-wood-400 text-sm">Tags</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-copper-wood-700 text-soft-sand">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex space-x-4">
            <Badge className={product.featured ? 'bg-burnished-copper-500' : 'bg-copper-wood-700'}>
              {product.featured ? 'Featured' : 'Regular'}
            </Badge>
            <Badge className={product.stock > 0 ? 'bg-green-600' : 'bg-red-600'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
