import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Builds the component showcase (App.tsx) for /showcase/ on the docs deploy. */
export default defineConfig({
  plugins: [react()],
  base: '/showcase/',
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
})
