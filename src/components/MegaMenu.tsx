
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface MegaMenuProps {
  title: string;
  categories: {
    title: string;
    items: string[];
    baseUrl: string;
  }[];
}

const MegaMenu = ({ title, categories }: MegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center space-x-1 text-copper-wood-400 hover:text-burnished-copper-500 font-medium transition-all duration-200 py-2">
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-screen max-w-4xl bg-dark-clay-100 border border-copper-wood-700 shadow-xl rounded-lg z-50 animate-fade-in">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index}>
                  <h3 className="font-serif font-semibold text-soft-sand mb-4 text-lg">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={`${category.baseUrl}?item=${encodeURIComponent(item)}`}
                        className="block text-copper-wood-400 hover:text-burnished-copper-500 text-sm py-1 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
