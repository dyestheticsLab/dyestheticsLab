import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    lib:{
      entry: {
        'manifest-creators': './src/index.ts',
        'manifest-loaders': './src/manifest-loader.ts',
        'vite-plugin': './src/vite-plugin.ts',
        'generate-responsive-variants': './src/generate-responsive-variants.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? format+'.js': format}`
    },
    rollupOptions: {
      external: ['tinyglobby', 'node:path', 'node:fs/promises']
    }
  }
})
