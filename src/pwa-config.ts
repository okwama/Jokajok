import type { ManifestOptions } from 'vite-plugin-pwa';
import { type Strategy } from 'workbox-strategies';

// PWA Manifest configuration
export const manifest: Partial<ManifestOptions> = {
  name: 'JokaJok',
  short_name: 'JokaJok',
  description: 'Authentic African Accessories',
  theme_color: '#1E1B18', // charred-wood color
  background_color: '#1E1B18',
  display: 'standalone',
  start_url: '/',
  icons: [
    {
      src: '/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
  screenshots: [
    {
      src: '/screenshot1.png',
      sizes: '1280x800',
      type: 'image/png',
      form_factor: 'wide',
      label: 'JokaJok Homepage',
    },
  ],
};

// Workbox configuration
export const workbox = {
  // Cache strategies for different file types
  runtimeCaching: [
    // Cache Google Fonts
    {
      urlPattern: /^https?:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst' as any,
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    // Cache API responses
    {
      urlPattern: /^https?:\/\/api\.yourdomain\.com\/.*/i,
      handler: 'NetworkFirst' as any,
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 1 // 1 hour
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    // Cache static assets
    {
      urlPattern: /\.[a-f0-9]{8}\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
      handler: 'StaleWhileRevalidate' as any,
      options: {
        cacheName: 'static-assets-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    // Cache images
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst' as any,
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
};
