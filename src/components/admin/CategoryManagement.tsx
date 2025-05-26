
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Category } from '@/types/admin';

interface CategoryManagementProps {
  searchTerm: string;
}

const CategoryManagement = ({ searchTerm }: CategoryManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Ladies Collection',
      description: 'Elegant bags for women',
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      featured: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Men\'s Collection',
      description: 'Professional bags for men',
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      featured: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '3',
      name: 'Safari Collection',
      description: 'Adventure-ready bags',
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      featured: false,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    }
  ]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Category Management</h2>
        <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand">Categories ({filteredCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-copper-wood-700">
                <TableHead className="text-copper-wood-400">Image</TableHead>
                <TableHead className="text-copper-wood-400">Name</TableHead>
                <TableHead className="text-copper-wood-400">Description</TableHead>
                <TableHead className="text-copper-wood-400">Status</TableHead>
                <TableHead className="text-copper-wood-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id} className="border-copper-wood-700 hover:bg-copper-wood-800/50">
                  <TableCell>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-soft-sand font-medium">{category.name}</TableCell>
                  <TableCell className="text-copper-wood-400">{category.description}</TableCell>
                  <TableCell>
                    <Badge className={category.featured ? 'bg-burnished-copper-500' : 'bg-copper-wood-700'}>
                      {category.featured ? 'Featured' : 'Regular'}
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

export default CategoryManagement;
