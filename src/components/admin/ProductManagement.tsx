
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Product } from '@/types/admin';

interface ProductManagementProps {
  searchTerm: string;
}

const ProductManagement = ({ searchTerm }: ProductManagementProps) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Maasai Leather Tote',
      description: 'Handcrafted by Maasai artisans',
      price: 89,
      category: 'ladies',
      images: ['/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png'],
      stock: 15,
      rating: 4.8,
      reviews: 124,
      featured: true,
      tags: ['leather', 'handmade', 'tote'],
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: '2',
      name: 'Sahara Crossbody',
      description: 'Perfect for daily adventures',
      price: 65,
      category: 'ladies',
      images: ['/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png'],
      stock: 8,
      rating: 4.9,
      reviews: 89,
      featured: false,
      tags: ['crossbody', 'adventure', 'daily'],
      created_at: '2024-01-10',
      updated_at: '2024-01-18'
    }
  ]);

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortBy as keyof Product];
    const bValue = b[sortBy as keyof Product];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Product Management</h2>
        <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
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
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-soft-sand font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-copper-wood-600 text-copper-wood-400">
                      {product.category}
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
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-800">
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
