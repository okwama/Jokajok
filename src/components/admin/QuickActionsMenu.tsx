
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, ShoppingCart, Users, TrendingUp, BarChart3 } from 'lucide-react';

interface QuickActionsMenuProps {
  onNavigate: (tab: string) => void;
}

const QuickActionsMenu = ({ onNavigate }: QuickActionsMenuProps) => {
  const quickActions = [
    {
      title: 'Add Product',
      description: 'Add new products to inventory',
      icon: Plus,
      action: () => onNavigate('products'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: ShoppingCart,
      action: () => onNavigate('orders'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Inventory',
      description: 'Track stock levels',
      icon: Package,
      action: () => onNavigate('inventory'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Categories',
      description: 'Manage product categories',
      icon: BarChart3,
      action: () => onNavigate('categories'),
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Finance',
      description: 'View financial reports',
      icon: TrendingUp,
      action: () => onNavigate('finance'),
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickActions.map((action, index) => (
        <Card key={index} className="bg-dark-clay-100 border-copper-wood-700 hover:border-burnished-copper-500 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-soft-sand text-lg">{action.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-copper-wood-400 mb-4">{action.description}</p>
            <Button
              onClick={action.action}
              className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
            >
              Open {action.title}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionsMenu;
