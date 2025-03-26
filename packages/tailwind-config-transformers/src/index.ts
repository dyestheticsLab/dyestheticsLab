import { glob } from 'tinyglobby'
import { basename, extname, resolve } from 'path';
import { TransformTailwindConfigArgs, TransformTailwindConfigReturn } from './types';
import { readFile } from 'fs/promises';

const defaultConfigReader = async (configFileNamePath: string) => {
  return readFile(configFileNamePath, 'utf-8');
}

//TODO: pass this to a clean builder or factory
/*TODO: this creator is almost agnostic
expcte for the dafults and also bacuse de createCassNameResolver
is bound to create resolvers that returns plain string whic
tailwind could use to get candidadtes, but we may
return anything to pipe to other parts of the code
so we need to make this creator more agnostic
*/
export const createTransformers = async ({
  componentsFileGlobs,
  configFileNameSuffix = 'tailwindConfig',
  componentFileNameSuffix = 'createdComponent',
  keyResolver = ({ componentName }) => componentName,
  createClassNameResolver,
  configurationFileRead = defaultConfigReader,
  globResolver = glob
}: TransformTailwindConfigArgs): Promise<TransformTailwindConfigReturn> => {
  const entries = await globResolver(componentsFileGlobs);

  const filesConfig = entries
    .map((entry) => {

      const componentName = basename(entry)
        .replace(extname(entry), '')
        .replace(componentFileNameSuffix, '')
        .replace(/\.$/, '');

      const configFileNamePath = resolve(entry, `../${componentName}.${configFileNameSuffix}.json`);

      const keyId = keyResolver({
        componentName,
        componentFileNamePath: entry,
        componentFileNameSuffix,
        configFileNameSuffix,
        configFileNamePath
      });

      return {
        configFileNamePath,
        keyId,
      }
    })

  /**
   * TODO: We need to evaluate if we need to allow
   * to pass a way to resolve this promises in other way lie batching
   * or even workers with piscina
   */
  const mapEntries = await Promise.all(filesConfig.map(async ({
    configFileNamePath,
    keyId,
  }) => {
    const configRawContent = await configurationFileRead(configFileNamePath);

    //TODO: give support for mor than JSON file
    const { preset, options } = JSON.parse(configRawContent)

    const classNameResolver = createClassNameResolver({
      preset,
      options
    })

    return [keyId, classNameResolver] as const
  }));

  return new Map(mapEntries)
}
