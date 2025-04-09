import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from Docker
    port: 5173,  // Ensures Vite runs on the correct port
    strictPort: true,  // Prevents Vite from switching ports
    watch: {
      usePolling: true,  // Fix for Docker live reload
    },
  },
});
