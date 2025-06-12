export const prefetchImages = (urls: string[]) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

export const prefetchProductImages = (products: any[]) => {
  const imageUrls = products.flatMap(product => 
    product.images || [product.image]
  ).filter(Boolean);
  
  prefetchImages(imageUrls);
};

// Preload critical images
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}; 