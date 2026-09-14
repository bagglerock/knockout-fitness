import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: ['index.html', 'coaches.html', 'schedule.html', 'photos.html', 'location.html'],
    },
  },
});
