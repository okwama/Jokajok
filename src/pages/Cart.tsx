import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen page-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-24 w-24 text-copper-wood-400 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-soft-sand mb-4">
            Your cart is empty
          </h1>
          <p className="text-xl text-copper-wood-400 mb-8">
            Discover our beautiful collection of African crafts
          </p>
          <Link to="/products">
            <Button className="flat-button text-lg px-8 py-4">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-background py-8">
      {/* Increased container width (max-w-6xl or max-w-7xl) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-soft-sand mb-8">
          Shopping Cart ({itemCount} items)
        </h1>

        {/* Wider grid layout (70/30 split) */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
          {/* Cart Items (70%) - Made wider */}
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden bg-dark-clay-100 border-copper-wood-700">
                {/* Reduced padding (p-10 → p-6) for more width usage */}
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-soft-sand">
                        {item.name}
                      </h3>
                      <p className="text-soft-sand font-semibold">Ksh{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="bg-transparent border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold text-soft-sand">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-transparent border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-sof">
                        Ksh{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
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

          {/* Order Summary (30%) - Also wider now */}
          <div>
            <Card className="sticky top-8 bg-dark-clay-100 border-copper-wood-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-semibold text-soft-sand mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Subtotal</span>
                    <span className="font-semibold text-soft-sand">Ksh{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Shipping</span>
                    <span className="font-semibold text-soft-sand">Free</span>
                  </div>
                  <div className="border-t border-copper-wood-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-soft-sand">Total</span>
                      <span className="text-lg font-bold text-soft-sand">
                        Ksh{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/products" className="block">
                    <Button className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;