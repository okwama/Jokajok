
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const AdminStats = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalProducts: 156,
    totalOrders: 1249,
    totalRevenue: 45670,
    pendingOrders: 23,
    monthlyGrowth: 12.5,
    dailyRevenue: 1250
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType }: any) => (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-copper-wood-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-burnished-copper-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-soft-sand">{value}</div>
        {change && (
          <p className="text-xs text-copper-wood-400 flex items-center mt-1">
            {changeType === 'positive' ? (
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
            )}
            {change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          change={8.2}
          changeType="positive"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          change={stats.monthlyGrowth}
          changeType="positive"
        />
        <StatCard
          title="Total Revenue"
          value={`Ksh${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          change={15.3}
          changeType="positive"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Users}
          change={-2.1}
          changeType="negative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-copper-wood-400">New order #1234</span>
                <span className="text-sm text-copper-wood-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-copper-wood-400">Product "Maasai Tote" updated</span>
                <span className="text-sm text-copper-wood-500">5 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-copper-wood-400">Low stock alert: Safari Bag</span>
                <span className="text-sm text-copper-wood-500">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-burnished-copper-500 text-charred-wood rounded-lg hover:bg-burnished-copper-600 transition-colors">
                Add Product
              </button>
              <button className="p-4 bg-copper-wood-700 text-soft-sand rounded-lg hover:bg-copper-wood-600 transition-colors">
                View Orders
              </button>
              <button className="p-4 bg-copper-wood-700 text-soft-sand rounded-lg hover:bg-copper-wood-600 transition-colors">
                Manage Categories
              </button>
              <button className="p-4 bg-copper-wood-700 text-soft-sand rounded-lg hover:bg-copper-wood-600 transition-colors">
                Export Data
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;
