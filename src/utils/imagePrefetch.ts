interface Product {
  id: number;
  name: string;
  image: string;
  images: string[];
  category: string;
}

// Enhanced prefetch with priority and responsive images
export const prefetchImages = (urls: string[], priority: 'high' | 'low' = 'low') => {
  urls.forEach(url => {
    if (!url) return;
    
    const link = document.createElement('link');
    link.rel = priority === 'high' ? 'preload' : 'prefetch';
    link.as = 'image';
    link.href = url;
    
    // Add responsive image hints for better loading
    if (url.includes('-400w.webp')) {
      link.media = '(max-width: 768px)';
    } else if (url.includes('-800w.webp')) {
      link.media = '(min-width: 769px)';
    }
    
    document.head.appendChild(link);
  });
};

// Generate responsive image URLs
const generateResponsiveUrls = (baseUrl: string): string[] => {
  const urls: string[] = [baseUrl]; // Always include original
  
  // Check if it's a WebP image and generate responsive versions
  if (baseUrl.includes('.webp') || baseUrl.includes('.jpg') || baseUrl.includes('.jpeg') || baseUrl.includes('.png')) {
    const baseName = baseUrl.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    
    // Generate 400w and 800w versions for WebP
    if (!baseUrl.includes('-400w') && !baseUrl.includes('-800w')) {
      urls.push(`${baseName}-400w.webp`);
      urls.push(`${baseName}-800w.webp`);
    }
  }
  
  return urls.filter(Boolean);
};

// Smart product image prefetching with priority
export const prefetchProductImages = (products: Product[], options: {
  priorityCount?: number;
  includeAllImages?: boolean;
  responsive?: boolean;
} = {}) => {
  const { priorityCount = 4, includeAllImages = false, responsive = true } = options;
  
  if (!products || products.length === 0) return;
  
  // Separate priority and regular images
  const priorityProducts = products.slice(0, priorityCount);
  const regularProducts = products.slice(priorityCount);
  
  // High priority images (first few products - preload)
  const priorityImageUrls: string[] = [];
  priorityProducts.forEach(product => {
    if (product.image) {
      if (responsive) {
        priorityImageUrls.push(...generateResponsiveUrls(product.image));
      } else {
        priorityImageUrls.push(product.image);
      }
    }
    
    // Include first additional image for priority products
    if (includeAllImages && product.images && product.images.length > 1) {
      const firstAdditionalImage = product.images.find(img => img !== product.image);
      if (firstAdditionalImage) {
        if (responsive) {
          priorityImageUrls.push(...generateResponsiveUrls(firstAdditionalImage));
        } else {
          priorityImageUrls.push(firstAdditionalImage);
        }
      }
    }
  });
  
  // Regular priority images (remaining products - prefetch)
  const regularImageUrls: string[] = [];
  regularProducts.forEach(product => {
    if (product.image) {
      if (responsive) {
        regularImageUrls.push(...generateResponsiveUrls(product.image));
      } else {
        regularImageUrls.push(product.image);
      }
    }
    
    // Include all images for regular products if requested
    if (includeAllImages && product.images) {
      product.images.forEach(img => {
        if (img !== product.image) {
          if (responsive) {
            regularImageUrls.push(...generateResponsiveUrls(img));
          } else {
            regularImageUrls.push(img);
          }
        }
      });
    }
  });
  
  // Remove duplicates
  const uniquePriorityUrls = [...new Set(priorityImageUrls)];
  const uniqueRegularUrls = [...new Set(regularImageUrls)];
  
  console.log(`🚀 Prefetching ${uniquePriorityUrls.length} priority images and ${uniqueRegularUrls.length} regular images`);
  
  // Prefetch with appropriate priority
  prefetchImages(uniquePriorityUrls, 'high');
  
  // Delay regular prefetching to not block priority images
  setTimeout(() => {
    prefetchImages(uniqueRegularUrls, 'low');
  }, 100);
};

// Preload critical images (hero, category banners, etc.)
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    if (!url) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Prefetch images for a specific category
export const prefetchCategoryImages = (products: Product[], categoryId: string) => {
  const categoryProducts = products.filter(p => p.category === categoryId);
  prefetchProductImages(categoryProducts, { 
    priorityCount: 6, 
    includeAllImages: true, 
    responsive: true 
  });
};

// Progressive image loading - prefetch visible images first
export const prefetchVisibleImages = (products: Product[], startIndex: number = 0, count: number = 8) => {
  const visibleProducts = products.slice(startIndex, startIndex + count);
  prefetchProductImages(visibleProducts, { 
    priorityCount: count, 
    includeAllImages: false, 
    responsive: true 
  });
};

// Cleanup prefetch links (useful for SPA navigation)
export const cleanupPrefetchLinks = () => {
  const prefetchLinks = document.querySelectorAll('link[rel="prefetch"], link[rel="preload"][as="image"]');
  prefetchLinks.forEach(link => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  });
}; 