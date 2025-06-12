import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  srcSet,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Add cache busting for development
  const cacheBustingSrc = process.env.NODE_ENV === 'development' 
    ? `${src}?v=${Date.now()}` 
    : src;
  
  const cacheBustingSrcSet = process.env.NODE_ENV === 'development' && srcSet
    ? srcSet.split(',').map(s => {
        const [url, descriptor] = s.trim().split(' ');
        return `${url}?v=${Date.now()} ${descriptor}`;
      }).join(', ')
    : srcSet;

  const [currentSrc, setCurrentSrc] = useState(cacheBustingSrc);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = cacheBustingSrc;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [cacheBustingSrc, priority]);

  const handleError = () => {
    // If srcSet fails, fallback to the main src
    if (srcSet && currentSrc === cacheBustingSrc) {
      setCurrentSrc(cacheBustingSrc);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.1'%3E%3Cpath d='M0 0h100v100H0V0zm10 10v80h80V10H10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      
      {/* Main image */}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        srcSet={cacheBustingSrcSet}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${error ? 'opacity-100' : ''}
        `}
      />
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 