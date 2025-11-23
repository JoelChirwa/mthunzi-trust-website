import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Development server proxy: forward /api and /uploads to backend server
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/uploads': {
        target: process.env.VITE_API_BASE || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path,
      }
    }
  }
})
