import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true, // Output to show the compression details
      disable: false, // Ensure compression is enabled
      threshold: 10240, // Compress files larger than 10KB
      algorithm: 'brotli', // Use Brotli (you can also try 'gzip')
    }),
  ],
  build: {
    // Enable minification in production
    minify: 'terser', // Terser is the default, but you can explicitly set it
    terserOptions: {
      compress: {
        drop_console: true, // Optional: Remove console logs in production
      },
    },
  },
});