
import React from 'react';
import { Input } from '@/components/ui/input';

interface ProductsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">
          Our Collection
        </h1>
        <p className="text-xl text-copper-wood-400 max-w-2xl mx-auto">
          Discover authentic African craftsmanship in every piece
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-dark-clay-100 border-copper-wood-700 text-soft-sand placeholder:text-copper-wood-400"
        />
      </div>
    </>
  );
};

export default ProductsHeader;
