
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Star } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const EnhancedFilters = ({ onFilterChange, searchTerm, onSearchChange }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [inStock, setInStock] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'ladies', name: 'Ladies Collection', count: 25 },
    { id: 'men', name: 'Men\'s Collection', count: 18 },
    { id: 'safari', name: 'Safari Collection', count: 12 },
    { id: 'accessories', name: 'Accessories', count: 8 },
    { id: 'redline', name: 'Redline', count: 5 }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked 
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(newCategories);
    updateFilters({ categories: newCategories });
  };

  const updateFilters = (newFilters: any) => {
    const filters = {
      priceRange,
      categories: selectedCategories,
      rating: selectedRating,
      sortBy,
      inStock,
      ...newFilters
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedRating(0);
    setSortBy('name');
    setInStock(false);
    onSearchChange('');
    updateFilters({
      priceRange: [0, 200],
      categories: [],
      rating: 0,
      sortBy: 'name',
      inStock: false
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copper-wood-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-dark-clay-100 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            updateFilters({ sortBy: e.target.value });
          }}
          className="bg-dark-clay-100 border-copper-wood-600 text-soft-sand rounded-md px-3 py-2"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedRating > 0 || inStock || priceRange[0] > 0 || priceRange[1] < 200) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-copper-wood-400">Active filters:</span>
          {selectedCategories.map(categoryId => {
            const category = categories.find(c => c.id === categoryId);
            return (
              <Badge key={categoryId} variant="outline" className="border-burnished-copper-500 text-burnished-copper-500">
                {category?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleCategoryChange(categoryId, false)}
                />
              </Badge>
            );
          })}
          {selectedRating > 0 && (
            <Badge variant="outline" className="border-burnished-copper-500 text-burnished-copper-500">
              {selectedRating}+ Stars
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  setSelectedRating(0);
                  updateFilters({ rating: 0 });
                }}
              />
            </Badge>
          )}
          {inStock && (
            <Badge variant="outline" className="border-burnished-copper-500 text-burnished-copper-500">
              In Stock
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  setInStock(false);
                  updateFilters({ inStock: false });
                }}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-copper-wood-400 hover:text-soft-sand"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {isFilterOpen && (
        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-copper-wood-400 mb-3">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  updateFilters({ priceRange: value });
                }}
                max={200}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-copper-wood-400">
                <span>Ksh{priceRange[0]}</span>
                <span>Ksh{priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-copper-wood-400 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      />
                      <label htmlFor={category.id} className="text-sm text-copper-wood-400">
                        {category.name}
                      </label>
                    </div>
                    <span className="text-xs text-copper-wood-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-copper-wood-400 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => {
                        setSelectedRating(rating);
                        updateFilters({ rating });
                      }}
                      className="text-burnished-copper-500"
                    />
                    <label htmlFor={`rating-${rating}`} className="flex items-center text-sm text-copper-wood-400">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-burnished-copper-500 fill-current" />
                      ))}
                      <span className="ml-1">& up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStock}
                  onCheckedChange={(checked) => {
                    setInStock(checked as boolean);
                    updateFilters({ inStock: checked });
                  }}
                />
                <label htmlFor="in-stock" className="text-sm text-copper-wood-400">
                  In Stock Only
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedFilters;
