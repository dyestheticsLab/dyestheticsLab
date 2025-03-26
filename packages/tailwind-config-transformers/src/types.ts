
export interface KeyResolverArgs {
  componentName: string;
  componentFileNamePath: string;
  configFileNamePath: string;
  componentFileNameSuffix: string;
  configFileNameSuffix: string;
}

export interface TransformTailwindConfigArgs {
  componentFileGlob: string;
  componentFileNameSuffix?: string;
  configFileNameSuffix?: string;
  keyResolver?: (args: KeyResolverArgs) => string;
}
