import { LoaderDefinitionFunction } from 'webpack'
import { createManifest } from './default-create-manifest';
import { BaseLoaderOptions } from './plugin-types';
import { defaultTargetPathResolver } from './target-path-resolver';


const loader = async function (
  this: ThisParameterType<LoaderDefinitionFunction<BaseLoaderOptions>>,
  source: string
) {
  const callback = this.async();
  const {
    targetPath,
    targetPathResolver = defaultTargetPathResolver,
    flag = 'w'
  } = this.getOptions() ?? {};

  try {
    const { resourcePath } = this;

    await createManifest({
      entry: resourcePath,
      targetPath: targetPath ?? targetPathResolver?.(resourcePath),
      source,
      flag
    })

    callback(null, source);
  } catch (error) {
    callback(error as Error);
  }
}

module.exports = loader
