import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-server-cjy8.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
