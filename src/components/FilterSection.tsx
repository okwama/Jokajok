
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import SidebarFilter from '@/components/SidebarFilter';

interface Filters {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
  inStock: boolean;
}

interface FilterSectionProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  filteredCount: number;
  totalCount: number;
  showOnlyFilter?: boolean;
  showOnlyMobile?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  filters, 
  onFilterChange, 
  filteredCount, 
  totalCount,
  showOnlyFilter = false,
  showOnlyMobile = false
}) => {
  if (showOnlyFilter) {
    // Desktop sidebar filter only
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <p className="text-copper-wood-400 text-sm">
            Showing {filteredCount} of {totalCount} products
          </p>
        </div>
        <SidebarFilter
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
    );
  }

  if (showOnlyMobile) {
    // Mobile filter button only
    return (
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <p className="text-copper-wood-400 text-sm">
          Showing {filteredCount} of {totalCount} products
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-copper-wood-600 text-copper-wood-400">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-charred-wood w-full sm:w-80 p-6">
            <SidebarFilter
              filters={filters}
              onFilterChange={onFilterChange}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Default: show both (fallback)
  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0 w-80">
        <SidebarFilter
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-none">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <p className="text-copper-wood-400">
            Showing {filteredCount} of {totalCount} products
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-copper-wood-600 text-copper-wood-400">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-charred-wood w-full sm:w-80 p-6">
              <SidebarFilter
                filters={filters}
                onFilterChange={onFilterChange}
                isMobile={true}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Results Summary */}
        <div className="hidden lg:block mb-6">
          <p className="text-copper-wood-400">
            Showing {filteredCount} of {totalCount} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
