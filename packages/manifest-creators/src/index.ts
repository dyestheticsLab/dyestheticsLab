import { glob } from 'tinyglobby'
import { batchExecutor } from './batch-executer';

export interface BatchOptions {
  batchSize?: number;
  onError?: (reject: PromiseRejectedResult) => void;
  onSuccess?: (result: string) => void;
  createManifest?: (entry: string) => Promise<string>;
  targetPath: string;
}


export interface ManifestCreatorOptions {
  globPath: string;
  globResolver?: (componentsFileGlobs: string | string[]) => Promise<string[]>;
  batchOptions?: BatchOptions;
}

export async function createManifest({
  globPath,
  globResolver = glob,
  batchOptions,
}: ManifestCreatorOptions): Promise<void> {
  const entries = await globResolver(globPath);

  return batchExecutor(entries, batchOptions)
}