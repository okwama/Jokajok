/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference lib="webworker" />

import { registerSW } from 'virtual:pwa-register';

// Only run in browser context
if (typeof window !== 'undefined') {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  // Register the service worker
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show a prompt to the user to update the app
      if (confirm('New content available. Reload to update?')) {
        updateSW(true);
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline');
    },
    onRegisterError(error) {
      console.error('Error during service worker registration:', error);
    },
  });

  // Check for updates every hour
  const intervalId = setInterval(() => {
    updateSW();
  }, 60 * 60 * 1000);

  // Listen for the beforeinstallprompt event
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  const handleBeforeInstallPrompt = (e: Event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e as BeforeInstallPromptEvent;
    
    // Show custom install button or notification
    console.log('App can be installed');
  };

  // Add the event listener
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

  // Function to trigger the installation prompt
  function showInstallPrompt() {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Reset the deferred prompt variable
        deferredPrompt = null;
      });
    }
  }

  // Add a global function to trigger installation
  (window as any).showInstallPrompt = showInstallPrompt;

  // Cleanup function
  const cleanup = () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    // Clear the interval
    clearInterval(intervalId);
  };

  // Clean up on unload
  window.addEventListener('unload', cleanup);
}

const CACHE_NAME = 'jokajok-image-cache-v1';
const IMAGE_CACHE_NAME = 'jokajok-images-v1';

// List of image paths to cache immediately
const IMAGES_TO_CACHE = [
  '/lovable-uploads/backpack-1.webp',
  '/lovable-uploads/backpack-2.webp',
  '/lovable-uploads/backpack-3.webp',
  '/lovable-uploads/tote-1.webp',
  '/lovable-uploads/tote-2.webp',
  '/lovable-uploads/tote-3.webp',
  
  // Add more critical images here
];

self.addEventListener('install', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME),
      caches.open(IMAGE_CACHE_NAME).then(cache => 
        cache.addAll(IMAGES_TO_CACHE)
      )
    ])
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // Check if the request is for an image
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        // Return cached image if found
        if (response) {
          return response;
        }

        // If not in cache, fetch from network
        return fetch(event.request).then(networkResponse => {
          // Cache the new image
          const responseToCache = networkResponse.clone();
          caches.open(IMAGE_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
