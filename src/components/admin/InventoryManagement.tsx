
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Package, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const InventoryManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [movementType, setMovementType] = useState<'in' | 'out' | 'adjustment'>('in');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, stock, sku')
      .order('name');

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch products', variant: 'destructive' });
    } else {
      setProducts(data || []);
    }
  };

  const fetchMovements = async () => {
    const { data, error } = await supabase
      .from('inventory_movements')
      .select(`
        *,
        products (name, sku)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch movements', variant: 'destructive' });
    } else {
      setMovements(data || []);
    }
  };

  const recordMovement = async () => {
    if (!selectedProduct || !quantity || !reason) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const product = products.find(p => p.id === selectedProduct);
      if (!product) throw new Error('Product not found');

      const movementQuantity = movementType === 'out' ? -parseInt(quantity) : parseInt(quantity);
      const newStock = Math.max(0, product.stock + movementQuantity);

      // Record the movement
      await supabase.from('inventory_movements').insert({
        product_id: selectedProduct,
        movement_type: movementType,
        quantity: parseInt(quantity),
        reason,
        reference_type: 'manual'
      });

      // Update product stock
      await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', selectedProduct);

      toast({ title: 'Success', description: 'Inventory movement recorded successfully!' });
      
      // Reset form
      setSelectedProduct('');
      setQuantity('');
      setReason('');
      
      // Refresh data
      fetchProducts();
      fetchMovements();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stock < 10);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Inventory Management</h2>
      </div>

      {/* Low Stock Alert */}
      {getLowStockProducts().length > 0 && (
        <Card className="bg-red-900/20 border-red-600">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getLowStockProducts().map(product => (
                <div key={product.id} className="flex justify-between items-center">
                  <span className="text-red-300">{product.name} ({product.sku})</span>
                  <Badge variant="destructive">{product.stock} left</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Record Movement */}
        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand">Record Inventory Movement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-copper-wood-400">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.sku}) - Stock: {product.stock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-copper-wood-400">Movement Type</Label>
              <Select value={movementType} onValueChange={(value: any) => setMovementType(value)}>
                <SelectTrigger className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">Stock In</SelectItem>
                  <SelectItem value="out">Stock Out</SelectItem>
                  <SelectItem value="adjustment">Adjustment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-copper-wood-400">Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <Label className="text-copper-wood-400">Reason</Label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
                placeholder="Reason for movement"
              />
            </div>

            <Button 
              onClick={recordMovement}
              disabled={loading}
              className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
            >
              {loading ? 'Recording...' : 'Record Movement'}
            </Button>
          </CardContent>
        </Card>

        {/* Current Stock Levels */}
        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand">Current Stock Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-copper-wood-700">
                    <TableHead className="text-copper-wood-400">Product</TableHead>
                    <TableHead className="text-copper-wood-400">SKU</TableHead>
                    <TableHead className="text-copper-wood-400">Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id} className="border-copper-wood-700">
                      <TableCell className="text-soft-sand">{product.name}</TableCell>
                      <TableCell className="text-copper-wood-400">{product.sku}</TableCell>
                      <TableCell>
                        <Badge 
                          className={product.stock < 10 ? 'bg-red-600' : 'bg-green-600'}
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movements */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand">Recent Inventory Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-copper-wood-700">
                <TableHead className="text-copper-wood-400">Date</TableHead>
                <TableHead className="text-copper-wood-400">Product</TableHead>
                <TableHead className="text-copper-wood-400">Type</TableHead>
                <TableHead className="text-copper-wood-400">Quantity</TableHead>
                <TableHead className="text-copper-wood-400">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map(movement => (
                <TableRow key={movement.id} className="border-copper-wood-700">
                  <TableCell className="text-copper-wood-400">
                    {new Date(movement.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-soft-sand">
                    {movement.products?.name} ({movement.products?.sku})
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        movement.movement_type === 'in' ? 'bg-green-600' : 
                        movement.movement_type === 'out' ? 'bg-red-600' : 
                        'bg-yellow-600'
                      }
                    >
                      {movement.movement_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-soft-sand">{movement.quantity}</TableCell>
                  <TableCell className="text-copper-wood-400">{movement.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
