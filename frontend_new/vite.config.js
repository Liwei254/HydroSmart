import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    port: 8082,
    open: true,
    // Enable SPA fallback for client-side routing
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
