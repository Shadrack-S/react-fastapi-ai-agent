import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Safely resolves the exact path to your folders
      '@styles': path.resolve(__dirname, './src/styles'),
      '@': path.resolve(__dirname, './src'),
    }
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
