
import React from 'react';
import { useParams } from 'react-router-dom';
import { Check, Package, Truck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrderTracking = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id || 'ORDER123',
    date: '2024-01-15',
    status: 'shipped',
    total: 154.00,
    estimatedDelivery: '2024-01-20',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Nairobi',
      country: 'Kenya'
    },
    items: [
      {
        id: 1,
        name: 'Maasai Leather Tote',
        price: 89,
        quantity: 1,
        image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png'
      },
      {
        id: 2,
        name: 'Sahara Crossbody',
        price: 65,
        quantity: 1,
        image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png'
      }
    ],
    tracking: [
      {
        status: 'Order Confirmed',
        date: '2024-01-15 10:30',
        completed: true,
        icon: Check,
        description: 'Your order has been confirmed and is being prepared.'
      },
      {
        status: 'In Production',
        date: '2024-01-16 14:20',
        completed: true,
        icon: Package,
        description: 'Your items are being handcrafted by our artisans.'
      },
      {
        status: 'Shipped',
        date: '2024-01-17 09:15',
        completed: true,
        icon: Truck,
        description: 'Your order is on its way to you.'
      },
      {
        status: 'Out for Delivery',
        date: 'Expected: 2024-01-20',
        completed: false,
        icon: MapPin,
        description: 'Your order will be delivered soon.'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-swahili-dust-100 text-swahili-dust-800';
    }
  };

  return (
    <div className="min-h-screen bg-swahili-dust-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Order Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-swahili-dust-800 mb-2">
            Order #{order.id}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-swahili-dust-600">Placed on {order.date}</span>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.tracking.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        step.completed ? 'bg-copper-600 text-white' : 'bg-swahili-dust-200 text-swahili-dust-500'
                      }`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${
                            step.completed ? 'text-swahili-dust-800' : 'text-swahili-dust-500'
                          }`}>
                            {step.status}
                          </h3>
                          <span className="text-sm text-swahili-dust-600">{step.date}</span>
                        </div>
                        <p className="text-swahili-dust-600 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="font-serif">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-swahili-dust-800">{item.name}</h4>
                        <p className="text-sm text-swahili-dust-600">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-copper-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-serif">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-swahili-dust-600">Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-swahili-dust-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-swahili-dust-200 pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-copper-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-swahili-dust-200 pt-4">
                  <h4 className="font-semibold text-swahili-dust-800 mb-2">Shipping Address</h4>
                  <div className="text-sm text-swahili-dust-600 space-y-1">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  </div>
                </div>

                <div className="border-t border-swahili-dust-200 pt-4">
                  <h4 className="font-semibold text-swahili-dust-800 mb-2">Estimated Delivery</h4>
                  <p className="text-copper-600 font-semibold">{order.estimatedDelivery}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
