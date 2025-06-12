import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import { manifest, workbox } from './src/pwa-config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses
    port: 8080,
    strictPort: true, // Don't try other ports if 8080 is taken
    open: true, // Open browser on server start
    proxy: {
      // Proxy API requests through Squid
      '/api': {
        target: 'http://127.0.0.1:3128',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Cache static assets
      '/assets': {
        target: 'http://127.0.0.1:3128',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Asset proxy error:', err);
          });
        },
      }
    },
    hmr: {
      overlay: true, // Show errors as overlay
      clientPort: 8080, // WebSocket port
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        navigateFallback: null,
        dontCacheBustURLsMatching: /\.\w{8}\./,
        runtimeCaching: workbox.runtimeCaching,
      },
      devOptions: {
        enabled: true, // Enable PWA in development
        type: 'module',
      },
    }),
  ].filter(Boolean),
  base: './',
  build: {
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
