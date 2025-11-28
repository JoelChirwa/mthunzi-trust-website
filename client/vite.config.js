import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // This is required so assets load correctly in production
  base: '/',

  // THIS IS THE FIX THAT ELIMINATES THE BLANK PAGE
  build: {
    outDir: 'build',                    // ← Vite now outputs to client/build (not dist!)
    emptyOutDir: true,                  // Deletes old build before creating new one
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Keep your excellent manual chunking logic
        // Manual chunking removed — use default Rollup/Vite output behavior
      }
    }
  },

  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE || 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: process.env.VITE_API_BASE || 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})