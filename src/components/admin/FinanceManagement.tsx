import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Banknote, BarChart3, PieChart, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const FinanceManagement = () => {
  const [activeView, setActiveView] = useState('overview');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, [dateRange]);

  const fetchTransactions = async () => {
    let query = supabase
      .from('financial_transactions')
      .select(`
        *,
        orders (order_number)
      `)
      .order('created_at', { ascending: false });

    if (dateRange?.from && dateRange?.to) {
      query = query
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch transactions', variant: 'destructive' });
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    const { data: salesData } = await supabase
      .from('financial_transactions')
      .select('amount')
      .eq('transaction_type', 'sale');

    const { data: expenseData } = await supabase
      .from('financial_transactions')
      .select('amount')
      .in('transaction_type', ['fee', 'expense']);

    // Monthly revenue (current month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: monthlyData } = await supabase
      .from('financial_transactions')
      .select('amount')
      .eq('transaction_type', 'sale')
      .gte('created_at', startOfMonth.toISOString());

    const totalRevenue = salesData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const totalExpenses = expenseData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const monthlyRevenue = monthlyData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

    setStats({
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      monthlyRevenue
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sale': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'refund': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'fee': return <CreditCard className="h-4 w-4 text-yellow-400" />;
      case 'expense': return <Banknote className="h-4 w-4 text-red-400" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-green-600';
      case 'refund': return 'bg-red-600';
      case 'fee': return 'bg-yellow-600';
      case 'expense': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const FinanceNavCard = ({ title, description, icon: Icon, isActive, onClick }: any) => (
    <Card 
      className={`cursor-pointer transition-all ${
        isActive 
          ? 'bg-burnished-copper-500 border-burnished-copper-500' 
          : 'bg-dark-clay-100 border-copper-wood-700 hover:border-burnished-copper-500'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${isActive ? 'text-charred-wood' : 'text-burnished-copper-500'}`} />
          <CardTitle className={`text-lg ${isActive ? 'text-charred-wood' : 'text-soft-sand'}`}>
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${isActive ? 'text-charred-wood/80' : 'text-copper-wood-400'}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-copper-wood-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-soft-sand">
          Ksh{value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={stats.totalRevenue}
                icon={TrendingUp}
                color="text-green-500"
              />
              <StatCard
                title="Total Expenses"
                value={stats.totalExpenses}
                icon={TrendingDown}
                color="text-red-500"
              />
              <StatCard
                title="Net Profit"
                value={stats.netProfit}
                icon={DollarSign}
                color={stats.netProfit >= 0 ? "text-green-500" : "text-red-500"}
              />
              <StatCard
                title="Monthly Revenue"
                value={stats.monthlyRevenue}
                icon={TrendingUp}
                color="text-blue-500"
              />
            </div>
          </div>
        );

      case 'transactions':
        return (
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="text-soft-sand">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-copper-wood-700">
                    <TableHead className="text-copper-wood-400">Date</TableHead>
                    <TableHead className="text-copper-wood-400">Type</TableHead>
                    <TableHead className="text-copper-wood-400">Order</TableHead>
                    <TableHead className="text-copper-wood-400">Amount</TableHead>
                    <TableHead className="text-copper-wood-400">Payment Method</TableHead>
                    <TableHead className="text-copper-wood-400">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-copper-wood-700 hover:bg-copper-wood-800/50">
                      <TableCell className="text-copper-wood-400">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTransactionColor(transaction.transaction_type)} flex items-center gap-1 w-fit`}>
                          {getTransactionIcon(transaction.transaction_type)}
                          {transaction.transaction_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-soft-sand">
                        {transaction.orders?.order_number || '-'}
                      </TableCell>
                      <TableCell className={`font-medium ${
                        transaction.transaction_type === 'sale' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.transaction_type === 'sale' ? '+' : '-'}Ksh{transaction.amount}
                      </TableCell>
                      <TableCell className="text-copper-wood-400">
                        {transaction.payment_method || '-'}
                      </TableCell>
                      <TableCell className="text-copper-wood-400">
                        {transaction.description || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {transactions.length === 0 && (
                <div className="text-center text-copper-wood-400 py-8">
                  No transactions found for the selected period
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'reports':
        return (
          <div className="text-center text-copper-wood-400 py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-copper-wood-600" />
            <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
            <p>Advanced reporting features coming soon...</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-soft-sand">Loading financial data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Finance Management</h2>
        <div className="flex items-center space-x-4">
          <DatePickerWithRange 
            date={dateRange} 
            setDate={setDateRange}
            className="bg-dark-clay-50 border-copper-wood-600"
          />
          <Button 
            onClick={() => setDateRange(null)}
            variant="outline"
            className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
          >
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceNavCard
          title="Overview"
          description="Financial summary and key metrics"
          icon={BarChart3}
          isActive={activeView === 'overview'}
          onClick={() => setActiveView('overview')}
        />
        <FinanceNavCard
          title="Transactions"
          description="Detailed transaction history"
          icon={CreditCard}
          isActive={activeView === 'transactions'}
          onClick={() => setActiveView('transactions')}
        />
        <FinanceNavCard
          title="Reports"
          description="Advanced financial reports"
          icon={FileText}
          isActive={activeView === 'reports'}
          onClick={() => setActiveView('reports')}
        />
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
};

export default FinanceManagement;
