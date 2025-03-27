/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tv } from 'tailwind-variants'
import { createTransformers } from '@dyesthetics-lab/tailwind-config-transformers'

//@ts-expect-error aas
import manifestCreators from '@dyesthetics-lab/tailwind-manifest-creators/vite'

const plugin: () => Promise<Plugin> = async () => {
  const transformers = await createTransformers({
    componentsFileGlobs: ['src/components/**/*.createdComponent.tsx'],
    createClassNameResolver({
      preset
    }) {
      const tailwindResolver = tv(preset)
      return (variants) => {
        const variantsWithManyValues = Object
          .entries(variants)
          .filter(([_key, value]) => Array.isArray(value))
          .flatMap(([key, value]) => (value as string[])?.map(singleValue => [key, singleValue]))


        const variantsWithSingleValue = Object.fromEntries(Object
          .entries(variants)
          .filter(([_key, value]) => !Array.isArray(value))
        )

        if (variantsWithManyValues.length)
          return variantsWithManyValues.map(([variantName, value]) => tailwindResolver({
            [variantName]: value,
            ...variantsWithSingleValue
          })).join(' ')

        return tailwindResolver(variantsWithSingleValue)
      }
    },
  })

  console.log(transformers.get('Button')?.({
    appearance: 'primary'
  }))

  return {
    name: 'transform-tailwind-config',
  }
}

export default defineConfig({
  plugins: [
    manifestCreators(),
    plugin(),
    react(),
    tailwindcss(),
  ],
})
