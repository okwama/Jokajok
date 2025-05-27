
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AddProductForm from './AddProductForm';

interface ProductManagementProps {
  searchTerm: string;
}

const ProductManagement = ({ searchTerm }: ProductManagementProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Product deleted successfully!' });
      fetchProducts();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categories?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-soft-sand">Add Product</h2>
          <Button 
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
          >
            ← Back to Products
          </Button>
        </div>
        <AddProductForm onSuccess={() => { setShowAddForm(false); fetchProducts(); }} />
      </div>
    );
  }

  if (loading) {
    return <div className="text-soft-sand">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Product Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-soft-sand">Products ({sortedProducts.length})</CardTitle>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand rounded px-3 py-1"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="stock">Sort by Stock</option>
                <option value="created_at">Sort by Date</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-copper-wood-700">
                <TableHead className="text-copper-wood-400">Image</TableHead>
                <TableHead className="text-copper-wood-400">Name</TableHead>
                <TableHead className="text-copper-wood-400">Category</TableHead>
                <TableHead className="text-copper-wood-400">Price</TableHead>
                <TableHead className="text-copper-wood-400">Stock</TableHead>
                <TableHead className="text-copper-wood-400">Status</TableHead>
                <TableHead className="text-copper-wood-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id} className="border-copper-wood-700 hover:bg-copper-wood-800/50">
                  <TableCell>
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-copper-wood-700 rounded flex items-center justify-center">
                        <Package className="h-6 w-6 text-copper-wood-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-soft-sand font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-copper-wood-600 text-copper-wood-400">
                      {product.categories?.name || 'Uncategorized'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-soft-sand">Ksh{product.price}</TableCell>
                  <TableCell>
                    <span className={`text-sm ${product.stock < 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={product.featured ? 'bg-burnished-copper-500' : 'bg-copper-wood-700'}>
                      {product.featured ? 'Featured' : 'Regular'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteProduct(product.id)}
                        className="border-red-600 text-red-400 hover:bg-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default ProductManagement;
