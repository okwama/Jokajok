
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CategoryForm from './CategoryForm';

interface CategoryManagementProps {
  searchTerm: string;
}

const CategoryManagement = ({ searchTerm }: CategoryManagementProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Category deleted successfully!' });
      fetchCategories();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-soft-sand">Add Category</h2>
          <Button 
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
          >
            ← Back to Categories
          </Button>
        </div>
        <CategoryForm onSuccess={() => { setShowAddForm(false); fetchCategories(); }} />
      </div>
    );
  }

  if (loading) {
    return <div className="text-soft-sand">Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">Category Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
        >
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
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-copper-wood-700 rounded"></div>
                    )}
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteCategory(category.id)}
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

export default CategoryManagement;
