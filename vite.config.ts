import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'build'
      ? [dts({ include: ['src'], exclude: ['src/App.tsx', 'src/main.tsx'], rollupTypes: true })]
      : []),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClayUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `clay-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'recharts'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'lucide-react': 'LucideReact',
          recharts: 'Recharts',
        },
      },
    },
    cssCodeSplit: false,
  },
}))
