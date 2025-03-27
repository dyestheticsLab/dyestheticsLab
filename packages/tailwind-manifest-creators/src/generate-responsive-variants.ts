export interface Preset {
  extends?: Preset[];
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
}

export interface GenerationOptions {
  responsiveVariants?: boolean | Record<string, boolean>
}


// TODO: we need to add support to generate base cases since
//when we have a compiler the files are not sourced by tailwind
export const generateResponsiveVariants = (
  preset: Preset,
  options?: GenerationOptions,
  breakpoints: string[] = ["sm", "md", "lg"]
) => {
  const { variants } = preset

  const { responsiveVariants = {} } = options ?? {}

  const allAreResponsive = typeof responsiveVariants === 'boolean' && responsiveVariants

  const variantsThatAreResponsive = allAreResponsive ?
    Object.keys(variants!) :
    Object.keys(variants!)
      .filter(variantName => responsiveVariants[variantName as keyof typeof responsiveVariants])

  return variantsThatAreResponsive
    .flatMap(variantKey => Object.values(variants![variantKey]))
    .flatMap(
      classNames => Array
        .isArray(classNames) ? classNames : classNames.split(" ")
    )
    .flatMap((className) => breakpoints
      .map(breakpoint => `${breakpoint}:${className}`)
    )
}
