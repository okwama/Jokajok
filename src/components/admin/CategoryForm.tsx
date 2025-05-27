
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CategoryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(formData)
        .select()
        .single();

      if (error) throw error;

      toast({ title: 'Success', description: 'Category added successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        image: '',
        featured: false
      });

      onSuccess?.();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-dark-clay-100 border-copper-wood-700">
      <CardHeader>
        <CardTitle className="text-soft-sand">Add New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-copper-wood-400">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-copper-wood-400">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-copper-wood-400">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="bg-dark-clay-50 border-copper-wood-600 text-soft-sand"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="featured" className="text-copper-wood-400">Featured Category</Label>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
          >
            {loading ? 'Adding Category...' : 'Add Category'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
