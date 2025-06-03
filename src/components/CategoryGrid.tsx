
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CategoryGridSkeleton } from '@/components/ui/category-skeleton';
import LazyImage from '@/components/LazyImage';
import categoriesData from '@/data/categories.json';

const CategoryGrid = () => {
  const categories = categoriesData.categories;

  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/3f30eb21-7f54-4177-9803-22095fd9696f.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-dark-clay-100/85"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-soft-sand mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-soft-sand-dark max-w-2xl mx-auto">
            Each piece crafted from premium leather with traditional techniques
          </p>
        </div>

        <Suspense fallback={<CategoryGridSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-swahili-dust-800/90 copper-glow overflow-hidden sisal-texture backdrop-blur-sm">
                  <div className="aspect-square overflow-hidden relative">
                    <LazyImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charred-wood/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="inline-block text-lg font-serif font-semibold bg-burnished-copper-500 rounded-lg px-2 py-0.5 text-soft-sand">
                        {category.name}
                      </h3>
                      <p className="text-soft-sand-dark text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default CategoryGrid;
