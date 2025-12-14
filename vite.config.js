import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: [
      'lightningcss',
      'lightningcss-win32-x64-msvc',
      '@tailwindcss/node'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  ssr: {
    noExternal: ['lightningcss']
  }
})