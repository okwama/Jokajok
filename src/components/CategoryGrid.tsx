import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import OptimizedImage from '@/components/OptimizedImage';
import { prefetchImages } from '@/utils/imagePrefetch';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Bags',
      image: '/lovable-uploads/4.jpg',
      webp400: '/lovable-uploads/4-400w.webp',
      webp800: '/lovable-uploads/4-800w.webp',
      link: '/products?category=bags',
      description: 'Handcrafted leather bags'
    },
    {
      name: 'Suitcases',
      image: '/lovable-uploads/n.jpg',
      webp400: '/lovable-uploads/n-400w.webp',
      webp800: '/lovable-uploads/n-800w.webp',
      link: '/products?category=suitcases',
      description: 'Premium travel companions'
    },
    {
      name: 'Wallets',
      image: '/lovable-uploads/36.jpg',
      webp400: '/lovable-uploads/36-400w.webp',
      webp800: '/lovable-uploads/36-800w.webp',
      link: '/products?category=wallets',
      description: 'Elegant leather wallets'
    },
    {
      name: 'Backpacks',
      image: '/lovable-uploads/100.jpeg',
      webp400: '/lovable-uploads/100-400w.webp',
      webp800: '/lovable-uploads/100-800w.webp',
      link: '/products?category=backpacks',
      description: 'Adventure-ready packs'
    },
    {
      name: 'Handbags',
      image: '/lovable-uploads/29.jpg',
      webp400: '/lovable-uploads/29-400w.webp',
      webp800: '/lovable-uploads/29-800w.webp',
      link: '/products?category=handbags',
      description: 'Sophisticated carriers'
    },
    {
      name: 'Sleeves',
      image: '/lovable-uploads/200.webp',
      webp400: '/lovable-uploads/200-400w.webp',
      webp800: '/lovable-uploads/200-800w.webp',
      link: '/products?category=sleeves',
      description: 'Protective covers'
    }
  ];

  // Prefetch category images
  useEffect(() => {
    const imageUrls = categories.map(category => category.image);
    prefetchImages(imageUrls);
  }, []);

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
                  <OptimizedImage
                    src={category.image}
                    alt={category.name}
                    className="group-hover:scale-105 transition-transform duration-300"
                    priority={index < 3} // Prioritize loading for first 3 categories
                    width={400}
                    height={400}
                    srcSet={`${category.webp400} 400w, ${category.webp800} 800w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      </div>
    </section>
  );
};

export default CategoryGrid;
