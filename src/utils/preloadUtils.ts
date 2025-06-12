import React from 'react';

// Preload links for faster navigation
export const preloadLinks = (links: string[]) => {
  links.forEach(link => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'fetch';
    preloadLink.href = link;
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);
  });
};

// Preload critical CSS
export const preloadCriticalCSS = (cssPaths: string[]) => {
  cssPaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = path;
    document.head.appendChild(link);
  });
};

// Define image dimensions for known images
export const imageDimensions = {
  'featured-products': {
    width: 400,
    height: 500,
    aspectRatio: '4/5'
  },
  'category-thumbnails': {
    width: 300,
    height: 300,
    aspectRatio: '1/1'
  },
  'hero-slider': {
    width: 1920,
    height: 1080,
    aspectRatio: '16/9'
  }
} as const;

// Lazy load components
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => importFn());
}; 