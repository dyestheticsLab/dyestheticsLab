import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
})
