
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Package, Truck } from 'lucide-react';
import { Order } from '@/types/admin';

interface OrderManagementProps {
  searchTerm: string;
}

const OrderManagement = ({ searchTerm }: OrderManagementProps) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      user_id: 'user1',
      items: [
        {
          product_id: '1',
          product_name: 'Maasai Leather Tote',
          quantity: 1,
          price: 89
        }
      ],
      total: 89,
      status: 'pending',
      payment_method: 'stripe',
      payment_status: 'paid',
      shipping_address: {
        street: '123 Main St',
        city: 'Nairobi',
        state: 'Nairobi',
        postal_code: '00100',
        country: 'Kenya'
      },
      created_at: '2024-01-20',
      updated_at: '2024-01-20'
    },
    {
      id: 'ORD-002',
      user_id: 'user2',
      items: [
        {
          product_id: '2',
          product_name: 'Sahara Crossbody',
          quantity: 2,
          price: 65
        }
      ],
      total: 130,
      status: 'shipped',
      payment_method: 'mpesa',
      payment_status: 'paid',
      shipping_address: {
        street: '456 Oak Ave',
        city: 'Mombasa',
        state: 'Mombasa',
        postal_code: '80100',
        country: 'Kenya'
      },
      created_at: '2024-01-18',
      updated_at: '2024-01-19'
    }
  ]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'processing': return 'bg-blue-600';
      case 'shipped': return 'bg-purple-600';
      case 'delivered': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe': return '💳';
      case 'mpesa': return '📱';
      case 'paypal': return '🟦';
      default: return '💰';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Order Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
            Export Orders
          </Button>
        </div>
      </div>

      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-copper-wood-700">
                <TableHead className="text-copper-wood-400">Order ID</TableHead>
                <TableHead className="text-copper-wood-400">Items</TableHead>
                <TableHead className="text-copper-wood-400">Total</TableHead>
                <TableHead className="text-copper-wood-400">Payment</TableHead>
                <TableHead className="text-copper-wood-400">Status</TableHead>
                <TableHead className="text-copper-wood-400">Date</TableHead>
                <TableHead className="text-copper-wood-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-copper-wood-700 hover:bg-copper-wood-800/50">
                  <TableCell className="text-soft-sand font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="text-copper-wood-400">
                      {order.items.length} item(s)
                      <div className="text-xs text-copper-wood-500">
                        {order.items[0].product_name}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-soft-sand">Ksh{order.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{getPaymentMethodIcon(order.payment_method)}</span>
                      <Badge variant="outline" className="border-copper-wood-600 text-copper-wood-400">
                        {order.payment_status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-copper-wood-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                        <Truck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
