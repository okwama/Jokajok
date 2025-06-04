import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Star, X } from 'lucide-react';

export interface ProductFilters {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
  inStock: boolean;
}

interface SidebarFilterProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
  filters, 
  onFilterChange, 
  onClose, 
  isMobile = false 
}) => {
  const categories = [
    { id: 'bags', label: 'Bags' },
    { id: 'suitcases', label: 'Suitcases' },
    { id: 'wallets', label: 'Wallets' },
    { id: 'backpacks', label: 'Backpacks' },
    { id: 'handbags', label: 'Handbags' },
    { id: 'sleeves', label: 'Sleeves' },
    { id: 'men', label: 'Men' },
    { id: 'ladies', label: 'Ladies' },
    { id: 'safari', label: 'Safari' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handleInStockChange = (checked: boolean) => {
    onFilterChange({ ...filters, inStock: checked });
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 200],
      categories: [],
      rating: 0,
      sortBy: 'name',
      inStock: false
    });
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'w-80'} space-y-6`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-soft-sand">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Sort By */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand text-sm">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={() => handleSortChange(option.value)}
                className="text-burnished-copper-500"
              />
              <span className="text-copper-wood-400 text-sm">{option.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={200}
              min={0}
              step={5}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-copper-wood-400">
              <span>Ksh{filters.priceRange[0]}</span>
              <span>Ksh{filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <label 
                htmlFor={category.id} 
                className="text-sm text-copper-wood-400 cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="text-burnished-copper-500"
              />
              <div className="flex items-center space-x-1">
                {rating === 0 ? (
                  <span className="text-copper-wood-400 text-sm">Any Rating</span>
                ) : (
                  <>
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-burnished-copper-500 fill-current" />
                    ))}
                    <span className="text-copper-wood-400 text-sm">& up</span>
                  </>
                )}
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Stock Status */}
      <Card className="bg-dark-clay-100 border-copper-wood-700">
        <CardHeader>
          <CardTitle className="text-soft-sand text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={handleInStockChange}
            />
            <label htmlFor="inStock" className="text-sm text-copper-wood-400 cursor-pointer">
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default SidebarFilter;
