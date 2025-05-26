
import React, { useState } from 'react';
import { X, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface QuickCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickCheckout = ({ isOpen, onClose }: QuickCheckoutProps) => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      onClose();
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-clay-100 border border-copper-wood-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-soft-sand font-serif">Quick Checkout</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-copper-wood-400 hover:text-soft-sand">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="border border-copper-wood-700 rounded-lg p-4">
            <h3 className="font-semibold text-soft-sand mb-3">Order Summary</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-copper-wood-400">{item.name} x {item.quantity}</span>
                  <span className="text-soft-sand">Ksh{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-copper-wood-700 mt-3 pt-3">
              <div className="flex justify-between font-semibold">
                <span className="text-soft-sand">Total:</span>
                <span className="text-burnished-copper-500">Ksh{total}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleQuickCheckout} className="space-y-4">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-soft-sand mb-3 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
                <Input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-semibold text-soft-sand mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="nameOnCard"
                  placeholder="Name on Card"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400 md:col-span-2"
                />
                <Input
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400 md:col-span-2"
                />
                <Input
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
                <Input
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="bg-swahili-dust-800 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0"
              >
                {isProcessing ? 'Processing...' : `Pay Ksh${total}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickCheckout;
