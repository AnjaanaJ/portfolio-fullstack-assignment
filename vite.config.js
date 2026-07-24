import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  
  // subdirectory for production builds.
  base: command === 'build' ? '/portfolio-fullstack-assignment/' : '/',
}))
