
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Switch to video after 3 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    // Generate copper dust particles
    const particleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(particleArray);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charred-wood/90 to-dark-clay-100/70 z-10"></div>
      
      {/* Hero background - transitions from image to video */}
      <div className="absolute inset-0 transition-opacity duration-2000">
        {!showVideo ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-float"
            style={{
              backgroundImage: `url('/lovable-uploads/54ea69d9-3a59-46b5-8602-3d40a5c950ac.png')`,
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 animate-fade-in">
            {/* Simulated video with artisan work imagery */}
            <div 
              className="w-full h-full bg-cover bg-center animate-float"
              style={{
                backgroundImage: `url('/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png')`,
                filter: 'sepia(20%) saturate(120%)'
              }}
            />
          </div>
        )}
      </div>

      {/* African fabric texture overlay */}
      <div className="absolute inset-0 kanga-pattern opacity-0 z-20"></div>

      {/* Copper dust particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-burnished-copper rounded-full dust-particle z-30"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6
          }}
        />
      ))}
      
      {/* Hero content */}
      <div className="relative z-40 text-center text-soft-sand max-w-4xl mx-auto px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-slide-in-right">
          Discover Africa's
          <span className="block text-burnished-copper animate-fade-in copper-shimmer bg-gradient-to-r from-burnished-copper-300 via-burnished-copper-500 to-burnished-copper-700 bg-clip-text text-transparent">
            Timeless Beauty
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed text-soft-sand-light">
          Where traditional craftsmanship meets contemporary style. 
          Each piece carries the soul of Africa, handcrafted with heritage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" className="stamped-button text-lg px-8 py-4 bg-burnished-copper hover:bg-burnished-copper-dark text-charred-wood font-semibold">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/blog">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-soft-sand text-soft-sand hover:bg-soft-sand hover:text-charred-wood transition-all duration-300">
              Our Story
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-40">
        <div className="w-6 h-10 border-2 border-soft-sand rounded-full flex justify-center">
          <div className="w-1 h-3 bg-burnished-copper rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
