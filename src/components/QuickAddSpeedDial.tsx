
import React, { useState } from 'react';
import { Plus, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface QuickAddSpeedDialProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  className?: string;
}

const QuickAddSpeedDial = ({ product, className = '' }: QuickAddSpeedDialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
    
    setIsOpen(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="flex flex-col items-end space-y-2">
        {/* Quick Add Option */}
        {isOpen && (
          <div className="animate-fade-in">
            <Button
              onClick={handleQuickAdd}
              className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood shadow-lg rounded-full p-3"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Quick Add
            </Button>
          </div>
        )}
        
        {/* Main Speed Dial Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45' 
              : 'bg-burnished-copper-500 hover:bg-burnished-copper-600'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Plus className="h-6 w-6 text-charred-wood" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuickAddSpeedDial;
