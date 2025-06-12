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

// Generate responsive srcSet for WebP images
const generateResponsiveSrcSet = (src: string): string => {
  if (!src) return '';
  
  // Check if it's already a responsive image or if we should generate one
  if (src.includes('-400w.webp') || src.includes('-800w.webp')) {
    return ''; // Already responsive, don't modify
  }
  
  // Generate responsive versions for images that support it
  if (src.includes('.webp') || src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png')) {
    const baseName = src.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    
    // Try to generate WebP responsive versions
    const srcSet = [
      `${baseName}-400w.webp 400w`,
      `${baseName}-800w.webp 800w`,
      `${src} 1200w` // Original as fallback for larger screens
    ].join(', ');
    
    return srcSet;
  }
  
  return '';
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  srcSet,
  sizes = '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate responsive srcSet if not provided
  const responsiveSrcSet = srcSet || generateResponsiveSrcSet(src);
  
  // Add cache busting for development
  const cacheBustingSrc = process.env.NODE_ENV === 'development' 
    ? `${currentSrc}?v=${Date.now()}` 
    : currentSrc;
  
  const cacheBustingSrcSet = process.env.NODE_ENV === 'development' && responsiveSrcSet
    ? responsiveSrcSet.split(',').map(s => {
        const [url, descriptor] = s.trim().split(' ');
        return `${url}?v=${Date.now()} ${descriptor}`;
      }).join(', ')
    : responsiveSrcSet;

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = cacheBustingSrc;
      if (cacheBustingSrcSet) {
        img.srcset = cacheBustingSrcSet;
      }
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [cacheBustingSrc, cacheBustingSrcSet, priority]);

  const handleError = () => {
    // If responsive image fails, try the original source
    if (responsiveSrcSet && currentSrc === src) {
      console.warn(`Failed to load responsive image: ${src}, falling back to original`);
      setCurrentSrc(src);
      setError(false);
    } else {
      console.error(`Failed to load image: ${currentSrc}`);
      setError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder with skeleton effect */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div 
            className="w-full h-full opacity-20"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.1'%3E%3Cpath d='M0 0h100v100H0V0zm10 10v80h80V10H10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}
      
      {/* Main image */}
      <img
        src={cacheBustingSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        srcSet={cacheBustingSrcSet}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-all duration-500 ease-out
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          ${error ? 'opacity-100' : ''}
        `}
        style={{
          filter: isLoaded ? 'none' : 'blur(0px)',
        }}
      />
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 