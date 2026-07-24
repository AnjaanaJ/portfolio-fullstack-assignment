import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Use localhost's root while developing, but keep the GitHub Pages
  // subdirectory for production builds.
  base: command === 'build' ? '/portfolio-fullstack-assignment/' : '/',
}))
