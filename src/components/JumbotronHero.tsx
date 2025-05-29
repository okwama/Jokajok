
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  {
    id: 1,
    name: 'Safari Messenger Bag',
    price: 125,
    image: '/lovable-uploads/6ed930a1-71ac-49fd-b106-141b7d78b22d.png',
    description: 'Adventure-ready leather companion'
  },
  {
    id: 2,
    name: 'Adventure Crossbody',
    price: 85,
    image: '/lovable-uploads/d25894e7-0c87-441b-bd66-75fe377c8cb4.png',
    description: 'Perfect for daily adventures'
  },
  {
    id: 3,
    name: 'Classic Red Safari Case',
    price: 165,
    image: '/lovable-uploads/d9afcb00-459a-4fd9-8b86-bdaf96387375.png',
    description: 'Bold and beautiful travel companion'
  }
];

const JumbotronHero = () => {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const product = featuredProducts[currentProduct];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
      {/* Animated Background */}
      <div className="absolute inset-0 transition-all duration-1000">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 animate-float"
          style={{
            backgroundImage: `url('${product.image}')`,
            filter: 'blur(2px) brightness(0.3)'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-soft-sand max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-serif font-bold animate-slide-in-right">
              Discover Africa's
              <span className="block text-burnished-copper-500 bg-gradient-to-r from-burnished-copper-300 via-burnished-copper-500 to-burnished-copper-700 bg-clip-text text-transparent">
                Timeless Beauty
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed text-copper-wood-300">
              Where traditional craftsmanship meets contemporary style. 
              Each piece carries the soul of Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="text-lg px-8 py-4 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood font-semibold border-0 animate-pulse">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-copper-wood-400 text-copper-wood-400 hover:bg-copper-wood-800 hover:text-soft-sand">
                  Our Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Featured Product */}
          <div className="relative animate-fade-in">
            <div className="bg-dark-clay-100/80 backdrop-blur-sm rounded-2xl p-8 border border-copper-wood-700 shadow-2xl">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-soft-sand mb-2">
                {product.name}
              </h3>
              
              <p className="text-copper-wood-400 mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-burnished-copper-500">
                  Ksh{product.price}
                </span>
                <Link to={`/products/${product.id}`}>
                  <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                    Buy Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProduct 
                      ? 'bg-burnished-copper-500 scale-125' 
                      : 'bg-copper-wood-600 hover:bg-copper-wood-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JumbotronHero;
