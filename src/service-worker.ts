/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

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
