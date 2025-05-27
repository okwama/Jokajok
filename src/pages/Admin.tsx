
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Package, ShoppingCart, Users, DollarSign, Warehouse, TrendingUp } from 'lucide-react';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import AdminStats from '@/components/admin/AdminStats';
import InventoryManagement from '@/components/admin/InventoryManagement';
import FinanceManagement from '@/components/admin/FinanceManagement';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

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
            <AdminStats />
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
