
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Belts',
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      link: '/products?category=belts',
      description: 'Handcrafted leather belts'
    },
    {
      name: 'Suitcases',
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      link: '/products?category=suitcases',
      description: 'Premium travel companions'
    },
    {
      name: 'Wallets',
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      link: '/products?category=wallets',
      description: 'Elegant leather wallets'
    },
    {
      name: 'Backpacks',
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      link: '/products?category=backpacks',
      description: 'Adventure-ready packs'
    },
    {
      name: 'Handbags',
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      link: '/products?category=handbags',
      description: 'Sophisticated carriers'
    },
    {
      name: 'Sleeves',
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      link: '/products?category=sleeves',
      description: 'Protective covers'
    }
  ];

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
      {/* Background overlay to reduce opacity and add color blend */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={index} to={category.link} className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-swahili-dust-800/90 copper-glow overflow-hidden sisal-texture backdrop-blur-sm">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charred-wood/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="inline-block text-xl font-serif font-semibold bg-red-600 rounded-lg px-2 py-0.5 text-soft-sand">
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
      </div>
    </section>
  );
};

export default CategoryGrid;
