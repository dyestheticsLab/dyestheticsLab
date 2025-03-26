
export interface KeyResolverArgs {
  componentName: string;
  componentFileNamePath: string;
  configFileNamePath?: string;
  componentFileNameSuffix?: string;
  configFileNameSuffix?: string;
}

export interface TransformTailwindConfigArgs {
  componentsFileGlobs: string | string[];
  componentFileNameSuffix?: string;
  configFileNameSuffix?: string;
  keyResolver?: (args: KeyResolverArgs) => string;
  createClassNameResolver: (config: {
    preset: any;
    options: any;
  }) => VariantResolver;
  //TODO: could we do this more agnostic, specially the return?
  configurationFileRead?(configFileNamePath: string): Promise<string>;
  globResolver?: (componentsFileGlobs: string | string[]) => Promise<string[]>;
}

export type VariantCandidateValue = boolean | string | number | undefined;

export type TailwindClasses = VariantCandidateValue | VariantCandidateValue[];

export interface VariantData {
  [variantName: string]: TailwindClasses;
}

export type VariantResolver = (variants: VariantData) => string;

export type TransformTailwindConfigReturn = Map<
  string,
  VariantResolver
>;
