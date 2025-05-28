
import React from 'react';
import { Truck, Clock, MapPin, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">Shipping Information</h1>
          <p className="text-xl text-copper-wood-400">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Truck className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Shipping Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-4">
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Standard Shipping (5-7 business days)</h4>
                <p>Free for orders over Ksh 5,000 within Kenya</p>
                <p>Ksh 500 for orders under Ksh 5,000</p>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Express Shipping (2-3 business days)</h4>
                <p>Ksh 1,200 within Nairobi</p>
                <p>Ksh 1,800 to other major cities</p>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">International Shipping (7-14 business days)</h4>
                <p>Available to East Africa: Ksh 2,500</p>
                <p>Rest of Africa: Ksh 4,000</p>
                <p>Worldwide: Ksh 6,500</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Clock className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Processing Times
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-4">
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">In-Stock Items</h4>
                <p>1-2 business days processing time</p>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Custom/Made-to-Order</h4>
                <p>5-10 business days processing time</p>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Peak Seasons</h4>
                <p>During holidays and special events, processing may take an additional 2-3 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <MapPin className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Delivery Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Kenya (Domestic)</h4>
                <ul className="space-y-1">
                  <li>• Nairobi and surrounding areas</li>
                  <li>• Mombasa</li>
                  <li>• Kisumu</li>
                  <li>• Nakuru</li>
                  <li>• Eldoret</li>
                  <li>• All major towns and cities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">International</h4>
                <ul className="space-y-1">
                  <li>• Uganda</li>
                  <li>• Tanzania</li>
                  <li>• Rwanda</li>
                  <li>• South Africa</li>
                  <li>• Nigeria</li>
                  <li>• United States & Europe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <Package className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Packaging & Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400 space-y-4">
            <div>
              <h4 className="font-semibold text-soft-sand mb-2">Eco-Friendly Packaging</h4>
              <p>All items are carefully packaged using sustainable materials that reflect our commitment to the environment. Your JokaJok pieces will arrive in custom-branded packaging that protects your items while minimizing environmental impact.</p>
            </div>
            <div>
              <h4 className="font-semibold text-soft-sand mb-2">Order Tracking</h4>
              <p>Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier's tracking system.</p>
            </div>
            <div>
              <h4 className="font-semibold text-soft-sand mb-2">Delivery Confirmation</h4>
              <p>Signature confirmation is required for all orders over Ksh 10,000. For international shipments, additional customs documentation may be required.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShippingInfo;
