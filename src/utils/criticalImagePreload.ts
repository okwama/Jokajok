import { preloadCriticalImages } from './imagePrefetch';

// Critical images that should be preloaded immediately
export const CRITICAL_IMAGES = [
  // Hero/banner images
  '/lovable-uploads/18.jpg', // THAYAH WEEKENDER (hero product)
  '/lovable-uploads/17.jpg', // YASMINE (featured product)
  
  // Category images
  '/categories/bags.jpg',
  '/categories/clothing.jpg',
  '/categories/home.jpg',
  '/categories/jewelry.jpg',
  '/categories/art.jpg',
  '/categories/new-releases.jpg',
  
  // Logo and branding
  '/img/logo.png',
  '/jk.png'
];

// First few product images (above the fold)
export const ABOVE_FOLD_PRODUCTS = [
  '/lovable-uploads/18.jpg', // THAYAH WEEKENDER
  '/lovable-uploads/17.jpg', // YASMINE
  '/lovable-uploads/1.jpg',  // NYAYABINGI DRUM
  '/lovable-uploads/30.jpg', // WARIDI
  '/img/lad.jpeg',          // Tye and Dye Canvas Backpack
  '/img/wn.webp'            // Maasai Heritage Tote
];

// Preload critical images on app start
export const preloadCriticalAppImages = () => {
  // Preload critical images with high priority
  preloadCriticalImages(CRITICAL_IMAGES);
  
  // Preload above-fold product images
  setTimeout(() => {
    preloadCriticalImages(ABOVE_FOLD_PRODUCTS);
  }, 100);
};

// Preload images for specific page
export const preloadPageImages = (page: 'home' | 'products' | 'categories') => {
  switch (page) {
    case 'home':
      preloadCriticalImages([
        '/lovable-uploads/18.jpg', // Hero product
        '/lovable-uploads/17.jpg', // Featured product
        '/img/wn.webp'            // New arrival
      ]);
      break;
      
    case 'products':
      preloadCriticalImages(ABOVE_FOLD_PRODUCTS);
      break;
      
    case 'categories':
      preloadCriticalImages([
        '/categories/bags.jpg',
        '/categories/clothing.jpg',
        '/categories/home.jpg',
        '/categories/jewelry.jpg'
      ]);
      break;
  }
}; 