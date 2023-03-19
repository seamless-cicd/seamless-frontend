import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        // target: 'https://6u8k18q4cg.execute-api.us-east-1.amazonaws.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
