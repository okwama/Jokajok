import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import { manifest, workbox } from './src/pwa-config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest,
      workbox: {
        // Precaching patterns
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes the errant console.log message from showing up.
        navigateFallback: null,
        // Don't precache sourcemaps (they're large and not needed for production)
        dontCacheBustURLsMatching: /\.\w{8}\./,
        // Runtime caching configuration
        runtimeCaching: workbox.runtimeCaching,
      },
    }),
  ].filter(Boolean),
  // Base public path when served in production
  base: './',
  // Build configuration
  build: {
    // Generate sourcemaps for production builds
    sourcemap: true,
    // Minify output
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
