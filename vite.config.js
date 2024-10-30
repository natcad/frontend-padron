import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['xlsx'] // Mantén esto como está si quieres excluirlo
    }
  },
  resolve: {
    alias: {
      'xlsx': 'xlsx/dist/xlsx.full.js', // Asegúrate de que esta ruta sea correcta
    }
  }
});
