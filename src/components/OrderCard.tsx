
import React from 'react';
import { Package, Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
  onReorder: (items: OrderItem[]) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, onTrackOrder, onReorder }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing': return 'bg-swahili-dust-200 text-swahili-dust-800 border-swahili-dust-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-swahili-dust-200 text-swahili-dust-800 border-swahili-dust-300';
    }
  };

  return (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-soft-sand text-lg">Order #{order.id}</h4>
            <p className="text-sm text-copper-wood-400">{order.date} • {order.items.length} items</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-burnished-copper-500 text-lg">Ksh{order.total.toFixed(2)}</p>
            <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {order.items.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded overflow-hidden bg-swahili-dust-600">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-soft-sand truncate">{item.name}</p>
                <p className="text-xs text-copper-wood-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="flex items-center justify-center text-copper-wood-400 text-sm">
              +{order.items.length - 4} more
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order.id)}
            className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTrackOrder(order.id)}
              className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReorder(order.items)}
            className="border-burnished-copper-600 text-burnished-copper-500 hover:bg-burnished-copper-500 hover:text-charred-wood"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reorder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
