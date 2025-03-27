export interface BaseLoaderOptions {
  targetPath?: string;
  targetPathResolver?: (resourcePath: string) => string;
  flag?: string;
}
