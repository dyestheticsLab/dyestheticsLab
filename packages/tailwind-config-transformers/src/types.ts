export interface TransformTailwindConfigArgs {
  componentFileGlob?: string;
  configFileNameSuffix?: string;
  keyResolver?: (componentFileGlob?: string, configFileNameSuffix?: string) => string;
}
