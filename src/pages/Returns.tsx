
import React from 'react';
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Returns = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8"
    style={{
      backgroundImage: `linear-gradient(rgba(30, 27, 24, 0.85), rgba(30, 27, 24, 0.9)), url('/lovable-uploads/7cc2147c-4961-4230-8e23-a8fd6d332ca6.png')`
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">Return Policy</h1>
          <p className="text-xl text-copper-wood-400">
            We want you to love your JokaJok pieces. If you're not completely satisfied, we're here to help.
          </p>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <RotateCcw className="h-6 w-6 text-burnished-copper-500 mr-3" />
              30-Day Return Window
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <p className="text-lg mb-4">
              You have 30 days from the date of delivery to return your item for a full refund or exchange. 
              The return period starts from the day you receive your order.
            </p>
            <div className="bg-burnished-copper-500/10 border border-burnished-copper-500/30 rounded-lg p-4">
              <p className="text-burnished-copper-400 font-medium">
                Important: Items must be returned in their original condition with all tags attached.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Items in original condition with tags attached</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Unworn and undamaged items</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Items returned within 30 days</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Original packaging and accessories included</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <XCircle className="h-6 w-6 text-red-500 mr-3" />
                Not Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Custom or personalized items</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Items damaged by normal wear and tear</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Items returned after 30 days</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Items without original tags or packaging</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">How to Return Your Item</CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-burnished-copper-500 text-charred-wood rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Contact Us</h4>
                  <p>Email us at returns@jokajok.com or call +254 700 123 456 to initiate your return. Please include your order number and reason for return.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-burnished-copper-500 text-charred-wood rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Receive Return Label</h4>
                  <p>We'll email you a prepaid return shipping label within 24 hours. For international returns, return shipping costs may apply.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-burnished-copper-500 text-charred-wood rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Package & Ship</h4>
                  <p>Carefully package your item in its original packaging, attach the return label, and drop it off at any authorized shipping location.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-burnished-copper-500 text-charred-wood rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Receive Your Refund</h4>
                  <p>Once we receive and inspect your return, we'll process your refund within 5-7 business days to your original payment method.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <AlertCircle className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Exchange Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400 space-y-4">
            <p>
              We offer exchanges for size or color within 30 days of delivery. The process is the same as returns, 
              but please specify that you want an exchange in your initial contact.
            </p>
            <div className="bg-copper-wood-800/30 border border-copper-wood-600 rounded-lg p-4">
              <h4 className="font-semibold text-soft-sand mb-2">Exchange Notes:</h4>
              <ul className="space-y-1">
                <li>• Exchanges are subject to availability</li>
                <li>• Price differences may apply for different items</li>
                <li>• International exchanges may incur additional shipping costs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-soft-sand mb-4">Need Help?</h3>
          <p className="text-copper-wood-400 mb-6">
            Our customer service team is here to help with any questions about returns or exchanges.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
              Contact Support
            </Button>
            <Button variant="outline" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
              Start Return
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
