
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import AdminStats from '@/components/admin/AdminStats';
import InventoryManagement from '@/components/admin/InventoryManagement';
import FinanceManagement from '@/components/admin/FinanceManagement';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    // For now, we'll check if the user email contains 'admin' or matches specific emails
    // In production, you should have a proper roles system
    const adminEmails = ['admin@jokajok.com', 'admin@example.com'];
    const isUserAdmin = adminEmails.includes(user.email) || user.email.includes('admin');
    
    setIsAdmin(isUserAdmin);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center">
        <div className="text-soft-sand">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-soft-sand mb-4">Access Denied</h1>
          <p className="text-copper-wood-400 mb-6">You don't have permission to access the admin panel.</p>
          <Button onClick={handleLogout} variant="outline" className="border-copper-wood-600 text-copper-wood-400">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-soft-sand">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copper-wood-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-clay-100 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
              />
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-dark-clay-100 border-copper-wood-700">
            <TabsTrigger value="dashboard" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Categories
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Orders
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="finance" className="text-copper-wood-400 data-[state=active]:text-soft-sand data-[state=active]:bg-burnished-copper-500">
              Finance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminStats onNavigate={handleNavigate} />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="finance">
            <FinanceManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
