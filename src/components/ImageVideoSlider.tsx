import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ImageVideoSliderProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

const ImageVideoSlider: React.FC<ImageVideoSliderProps> = ({ 
  slides, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-charred-wood">
      {/* Main slide */}
      <div className="relative w-full h-full">
        {currentSlide.type === 'image' ? (
          <img
            src={currentSlide.src}
            alt={currentSlide.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={currentSlide.src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charred-wood/70 to-transparent"></div>
        
        {/* Content overlay */}
        {(currentSlide.title || currentSlide.subtitle) && (
          <div className="absolute top-1/3 left-8 text-soft-sand max-w-2xl">
            {currentSlide.title && (
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 animate-fade-in">
                {currentSlide.title}
              </h1>
            )}
            {currentSlide.subtitle && (
              <p className="text-xl md:text-2xl text-copper-wood-300 leading-relaxed animate-fade-in">
                {currentSlide.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-soft-sand"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-soft-sand"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Play/Pause button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-soft-sand"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-burnished-copper-500' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-copper-wood-400 rounded-full flex justify-center mt-8">
          <div className="w-1 h-3 bg-burnished-copper-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageVideoSlider;
