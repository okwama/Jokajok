
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import QuickActionsMenu from './QuickActionsMenu';

interface AdminStatsProps {
  onNavigate?: (tab: string) => void;
}

const AdminStats = ({ onNavigate }: AdminStatsProps) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching admin stats...');
      
      // Fetch products count
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productsError) {
        console.error('Error fetching products count:', productsError);
      }

      // Fetch orders count - temporarily disable to avoid type errors
      let ordersCount = 0;
      try {
        const { count, error } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });
        if (!error) ordersCount = count || 0;
      } catch (err) {
        console.log('Orders table not accessible, using default value');
      }

      // Fetch total revenue - temporarily disable to avoid type errors
      let totalRevenue = 0;
      try {
        const { data: revenueData, error } = await supabase
          .from('financial_transactions')
          .select('amount')
          .eq('transaction_type', 'sale');
        
        if (!error && revenueData) {
          totalRevenue = revenueData.reduce((sum: number, transaction: any) => sum + Number(transaction.amount), 0);
        }
      } catch (err) {
        console.log('Financial transactions table not accessible, using default value');
      }

      // Fetch low stock products (less than 10 items)
      const { count: lowStockCount, error: lowStockError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .lt('stock', 10);

      if (lowStockError) {
        console.error('Error fetching low stock count:', lowStockError);
      }

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount,
        totalRevenue,
        lowStockProducts: lowStockCount || 0
      });
    } catch (error: any) {
      console.error('Error in fetchStats:', error);
      toast({ title: 'Error', description: 'Failed to fetch some stats', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-copper-wood-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-soft-sand">{value}</div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div className="text-soft-sand">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="text-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="text-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`Ksh${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-yellow-500"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockProducts}
          icon={AlertTriangle}
          color="text-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-soft-sand">Quick Actions</h3>
        <QuickActionsMenu onNavigate={onNavigate || (() => {})} />
      </div>
    </div>
  );
};

export default AdminStats;
