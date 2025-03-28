
export interface Preset {
  extends?: Preset[];
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  responsiveVariants?: boolean | Record<string, boolean>;
}

export const generateResponsiveVariants = (
  preset: Preset,
  breakpoints: string[] = ["sm", "md", "lg"]
) => {
  const { variants } = preset

  return Object.keys(variants!)
    .flatMap(variantKey => Object.values(variants![variantKey]))
    .flatMap(
      classNames => Array
        .isArray(classNames) ? classNames : classNames.split(" ")
    )
    .flatMap((className) => breakpoints
      .map(breakpoint => `${breakpoint}:${className}`)
    )
    .join(" ")
}