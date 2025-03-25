import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({
  command
})=>{
  const isBuild = command === 'build'
  return {
  plugins: [
    isBuild && dts({ tsconfigPath: './tsconfig.app.json' }),
    !isBuild && react()
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactComponentCreators',
      fileName: (format) => `react-component-creators.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '.storybook/**',
        '**/*.d.ts',
        'vite.config.ts',
        'eslint.config.js',
      ],
    }
  }
}})
