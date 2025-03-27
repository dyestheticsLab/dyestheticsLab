import { join } from "node:path";

export const defaultTargetPathResolver = (resourcePath: string) => {
  const fileName = resourcePath.split('/').pop() ?? 'global'

  const nodeModulesPath = join(process.cwd(),'node_modules/.tailwind-manifests')

  return join(nodeModulesPath, `${fileName}.tailwind.manifest`)
};
