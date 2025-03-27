import { PluginOption } from 'vite'
import { createManifest } from './default-create-manifest';
import { BaseLoaderOptions } from './plugin-types';
import { defaultTargetPathResolver } from './target-path-resolver';

export type ManifestCreatorVitePlugin = (option?: ManifestCreatorVitePluginOptions)=>PluginOption

export interface  ManifestCreatorVitePluginOptions extends BaseLoaderOptions{
  tailwindConfigFilesSuffix?: string | RegExp;
  activeForProd?: boolean;
}


const tailwindManifestCreator: ManifestCreatorVitePlugin = function (options){
  const {
    flag,
    targetPath,
    targetPathResolver = defaultTargetPathResolver,
    activeForProd,
    tailwindConfigFilesSuffix = 'tailwindConfig'
  } = options ?? {}

  return {
    name: 'vite-tailwind-manifest-creator',
    async transform(code, id) {
      const isString = typeof tailwindConfigFilesSuffix === 'string';

      const regexpForConfigFiles = isString ?
        new RegExp(`.${tailwindConfigFilesSuffix}.json$`)
        : tailwindConfigFilesSuffix;
      const isTailwindJson = regexpForConfigFiles.exec(id)
      console.log(id.includes('.json'))
      console.log({isTailwindJson})
      if(isTailwindJson){
        console.log('hel;ooooooo')
        await createManifest({
          source:code,
          entry: id,
          targetPath: targetPath ?? targetPathResolver(id),
          flag
        })
      }
      return code;
    },
    enforce: 'pre',
    apply: !activeForProd ?'serve': undefined
  }
}

export default tailwindManifestCreator
