import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Builds the component showcase (App.tsx), not the npm library. */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
})
