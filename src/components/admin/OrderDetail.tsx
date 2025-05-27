
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetail = ({ orderId, onBack }: OrderDetailProps) => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, images)
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
      setTrackingNumber(data.tracking_number || '');
      setNotes(data.notes || '');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const updateData: any = { status: newStatus };
      
      if (newStatus === 'shipped' && trackingNumber) {
        updateData.tracking_number = trackingNumber;
        updateData.shipped_at = new Date().toISOString();
      }
      
      if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      if (notes) {
        updateData.notes = notes;
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      
      setOrder(data);
      toast({ title: 'Success', description: `Order status updated to ${newStatus}` });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="text-soft-sand">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-soft-sand">Order not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
        >
          ← Back to Orders
        </Button>
        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
          {getStatusIcon(order.status)}
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-copper-wood-400">Order Number:</span>
              <span className="text-soft-sand ml-2 font-medium">{order.order_number}</span>
            </div>
            <div>
              <span className="text-copper-wood-400">Total:</span>
              <span className="text-soft-sand ml-2 font-medium">Ksh{order.total}</span>
            </div>
            <div>
              <span className="text-copper-wood-400">Payment Method:</span>
              <span className="text-soft-sand ml-2">{order.payment_method}</span>
            </div>
            <div>
              <span className="text-copper-wood-400">Payment Status:</span>
              <Badge variant="outline" className="ml-2 border-copper-wood-600 text-copper-wood-400">
                {order.payment_status}
              </Badge>
            </div>
            <div>
              <span className="text-copper-wood-400">Created:</span>
              <span className="text-soft-sand ml-2">{new Date(order.created_at).toLocaleString()}</span>
            </div>
            {order.shipped_at && (
              <div>
                <span className="text-copper-wood-400">Shipped:</span>
                <span className="text-soft-sand ml-2">{new Date(order.shipped_at).toLocaleString()}</span>
              </div>
            )}
            {order.delivered_at && (
              <div>
                <span className="text-copper-wood-400">Delivered:</span>
                <span className="text-soft-sand ml-2">{new Date(order.delivered_at).toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            {order.shipping_address ? (
              <div className="text-copper-wood-400">
                <div>{order.shipping_address.street}</div>
                <div>{order.shipping_address.city}, {order.shipping_address.state}</div>
                <div>{order.shipping_address.postal_code}</div>
                <div>{order.shipping_address.country}</div>
              </div>
            ) : (
              <div className="text-copper-wood-400">No shipping address provided</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between border-b border-copper-wood-700 pb-4">
                <div className="flex items-center space-x-4">
                  {item.products?.images?.[0] && (
                    <img 
                      src={item.products.images[0]} 
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="text-soft-sand font-medium">{item.product_name}</div>
                    <div className="text-copper-wood-400">Quantity: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-soft-sand font-medium">Ksh{item.price}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand">Update Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-copper-wood-400">Order Status</Label>
            <Select value={order.status} onValueChange={updateOrderStatus} disabled={updating}>
              <SelectTrigger className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(order.status === 'shipped' || order.status === 'delivered') && (
            <div>
              <Label className="text-copper-wood-400">Tracking Number</Label>
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                placeholder="Enter tracking number"
              />
            </div>
          )}

          <div>
            <Label className="text-copper-wood-400">Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              placeholder="Add notes about this order"
              rows={3}
            />
          </div>

          <Button 
            onClick={() => updateOrderStatus(order.status)}
            disabled={updating}
            className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
