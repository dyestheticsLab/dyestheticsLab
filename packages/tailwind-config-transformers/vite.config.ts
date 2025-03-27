import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({
  command
})=>{
  const isBuild = command === 'build'
  return {
  plugins: [
    isBuild && dts({ tsconfigPath: './tsconfig.json' }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TailwindConfigTransformers',
      fileName: (format) => `tailwind-config-transformers.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['path', 'fs/promises', 'tinyglobby'],
    }
  },
  test: {
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
