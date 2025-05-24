
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderId} has been confirmed.`,
    });

    clearCart();
    navigate(`/orders/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen page-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-soft-sand mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card className="bg-dark-clay-100 border-copper-wood-700">
              <CardHeader>
                <CardTitle className="font-serif text-soft-sand">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-copper-wood-400">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-clay-100 border-copper-wood-700">
              <CardHeader>
                <CardTitle className="font-serif text-soft-sand">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-copper-wood-400">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-copper-wood-400">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-copper-wood-400">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-copper-wood-400">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-copper-wood-400">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country" className="text-copper-wood-400">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-clay-100 border-copper-wood-700">
              <CardHeader>
                <CardTitle className="font-serif flex items-center text-soft-sand">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-copper-wood-400">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-copper-wood-400">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-copper-wood-400">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-copper-wood-400">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8 bg-dark-clay-100 border-copper-wood-700">
              <CardHeader>
                <CardTitle className="font-serif text-soft-sand">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-soft-sand">{item.name}</h4>
                      <p className="text-sm text-copper-wood-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-burnished-copper">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t border-copper-wood-700 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Subtotal</span>
                    <span className="text-soft-sand">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-copper-wood-400">Shipping</span>
                    <span className="text-burnished-copper">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-soft-sand">Total</span>
                    <span className="text-burnished-copper">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-sm text-copper-wood-400">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure checkout
                  </div>
                  <div className="flex items-center text-sm text-copper-wood-400">
                    <Truck className="h-4 w-4 mr-2" />
                    Free shipping across Africa
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full flat-button text-lg py-3"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
