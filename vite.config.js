import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/miniApp/', // Укажите путь, соответствующий названию вашего репозитория
  plugins: [react()],
});
