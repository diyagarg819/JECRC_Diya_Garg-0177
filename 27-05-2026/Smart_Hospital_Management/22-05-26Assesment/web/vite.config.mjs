import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5187',
      '/hubs': {
        target: 'http://localhost:5187',
        ws: true
      }
    }
  }
});
