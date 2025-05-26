
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface PaymentIntegrationProps {
  total: number;
  onPaymentSuccess: () => void;
}

const PaymentIntegration = ({ total, onPaymentSuccess }: PaymentIntegrationProps) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const { toast } = useToast();

  const handleStripePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed via Stripe.",
      });
      onPaymentSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMpesaPayment = async () => {
    if (!mpesaPhone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate M-Pesa STK push
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast({
        title: "Payment Successful",
        description: `Payment of Ksh${total} received via M-Pesa from ${mpesaPhone}.`,
      });
      onPaymentSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "M-Pesa payment was not completed.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed via PayPal.",
      });
      onPaymentSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "PayPal payment was not completed.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardHeader>
        <CardTitle className="text-soft-sand font-serif">Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedMethod('stripe')}
            className={`p-4 border rounded-lg transition-colors ${
              selectedMethod === 'stripe'
                ? 'border-burnished-copper-500 bg-burnished-copper-500/10'
                : 'border-copper-wood-600 hover:border-copper-wood-500'
            }`}
          >
            <CreditCard className="h-6 w-6 mx-auto mb-2 text-burnished-copper-500" />
            <div className="text-sm text-soft-sand">Credit Card</div>
            <div className="text-xs text-copper-wood-400">Visa, Mastercard</div>
          </button>

          <button
            onClick={() => setSelectedMethod('mpesa')}
            className={`p-4 border rounded-lg transition-colors ${
              selectedMethod === 'mpesa'
                ? 'border-burnished-copper-500 bg-burnished-copper-500/10'
                : 'border-copper-wood-600 hover:border-copper-wood-500'
            }`}
          >
            <Smartphone className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-sm text-soft-sand">M-Pesa</div>
            <div className="text-xs text-copper-wood-400">Mobile Money</div>
          </button>

          <button
            onClick={() => setSelectedMethod('paypal')}
            className={`p-4 border rounded-lg transition-colors ${
              selectedMethod === 'paypal'
                ? 'border-burnished-copper-500 bg-burnished-copper-500/10'
                : 'border-copper-wood-600 hover:border-copper-wood-500'
            }`}
          >
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm text-soft-sand">PayPal</div>
            <div className="text-xs text-copper-wood-400">Digital Wallet</div>
          </button>
        </div>

        {/* Payment Forms */}
        {selectedMethod === 'stripe' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number" className="text-copper-wood-400">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="text-copper-wood-400">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-copper-wood-400">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                />
              </div>
            </div>
            <Button
              onClick={handleStripePayment}
              disabled={isProcessing}
              className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
            >
              {isProcessing ? 'Processing...' : `Pay Ksh${total} with Card`}
            </Button>
          </div>
        )}

        {selectedMethod === 'mpesa' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mpesa-phone" className="text-copper-wood-400">M-Pesa Phone Number</Label>
              <Input
                id="mpesa-phone"
                placeholder="+254 7XX XXX XXX"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              />
            </div>
            <div className="text-sm text-copper-wood-400">
              You will receive an STK push notification to complete the payment.
            </div>
            <Button
              onClick={handleMpesaPayment}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? 'Sending STK Push...' : `Pay Ksh${total} via M-Pesa`}
            </Button>
          </div>
        )}

        {selectedMethod === 'paypal' && (
          <div className="space-y-4">
            <div className="text-sm text-copper-wood-400">
              You will be redirected to PayPal to complete your payment securely.
            </div>
            <Button
              onClick={handlePayPalPayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isProcessing ? 'Redirecting...' : `Pay Ksh${total} with PayPal`}
            </Button>
          </div>
        )}

        <div className="text-xs text-copper-wood-500 text-center">
          Your payment information is secure and encrypted.
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegration;
