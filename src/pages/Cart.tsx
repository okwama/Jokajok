
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import QuickCheckout from '@/components/QuickCheckout';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [showQuickCheckout, setShowQuickCheckout] = useState(false);

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-24 w-24 text-copper-wood-400 mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-copper-wood-400 mb-8">
            Discover our beautiful collection of African craftsmanship
          </p>
          <Link to="/products">
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-serif font-bold text-soft-sand">Shopping Cart</h1>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-dark-clay-100 border border-copper-wood-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-serif font-semibold text-soft-sand">
                          {item.name}
                        </h3>
                        <p className="text-copper-wood-400">Ksh{item.price}</p>
                        {item.size && (
                          <p className="text-sm text-copper-wood-400">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-copper-wood-400">Color: {item.color}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-soft-sand font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-soft-sand">
                          Ksh{item.price * item.quantity}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-dark-clay-100 border border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="text-soft-sand font-serif">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Subtotal:</span>
                    <span className="text-soft-sand">Ksh{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Shipping:</span>
                    <span className="text-soft-sand">Free</span>
                  </div>
                  <div className="border-t border-copper-wood-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-soft-sand">Total:</span>
                      <span className="text-lg font-semibold text-burnished-copper-500">
                        Ksh{total}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={() => setShowQuickCheckout(true)}
                      className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0 font-semibold"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Checkout
                    </Button>
                    
                    <Link to="/checkout" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                      >
                        Standard Checkout
                      </Button>
                    </Link>
                  </div>
                  
                  <Link to="/products" className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-copper-wood-400 hover:bg-swahili-dust-700"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <QuickCheckout
        isOpen={showQuickCheckout}
        onClose={() => setShowQuickCheckout(false)}
      />
    </>
  );
};

export default Cart;
