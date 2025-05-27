
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Package, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import OrderDetail from './OrderDetail';

interface OrderManagementProps {
  searchTerm: string;
}

const OrderManagement = ({ searchTerm }: OrderManagementProps) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.order_items?.some((item: any) => 
      item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  if (selectedOrder) {
    return (
      <OrderDetail 
        orderId={selectedOrder} 
        onBack={() => setSelectedOrder(null)} 
      />
    );
  }

  if (loading) {
    return <div className="text-soft-sand">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Order Management</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            onClick={fetchOrders}
          >
            Refresh Orders
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
                  <TableCell className="text-soft-sand font-medium">{order.order_number}</TableCell>
                  <TableCell>
                    <div className="text-copper-wood-400">
                      {order.order_items?.length || 0} item(s)
                      {order.order_items?.[0] && (
                        <div className="text-xs text-copper-wood-500">
                          {order.order_items[0].product_name}
                          {order.order_items.length > 1 && ` +${order.order_items.length - 1} more`}
                        </div>
                      )}
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedOrder(order.id)}
                        className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                      >
                        <Eye className="h-4 w-4" />
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
