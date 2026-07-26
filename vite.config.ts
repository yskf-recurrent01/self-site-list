import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/data': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/self-site-list' + path
      },
      '/register.php': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/self-site-list' + path
      },
      '/list.php': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/self-site-list' + path
      }
    }
  },
  base: '/self-site-list/'
})
