import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.app.json' }), react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'react-tv-variants-creators',
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'tailwind-variants',
        "@dyesthetics-lab/tailwind-utils",
        "@dyesthetics-lab/react-component-creators"
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
       }
     }
    }
}})
