
export interface KeyResolverArgs {
  componentName: string;
  componentFilePath: string;
  configFilePath: string;
}

export interface TransformTailwindConfigArgs {
  componentFileGlob?: string;
  configFileNameSuffix?: string;
  keyResolver?: (args: KeyResolverArgs) => string;
}
