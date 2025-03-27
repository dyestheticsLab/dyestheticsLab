import { TV, tv } from "tailwind-variants";
import { createDynamicVariants } from "../create-dynamic-variants";
import { DynamicVariants } from "../types";

export interface TVROptions<T extends Parameters<TV>[0], breakpoints extends string> {
  preset: T;
  responsiveVariants?: Record<keyof T, boolean> | boolean;
  breakpoints?: breakpoints[]
}

type TransformNestedKeys<T> = {
  [K in keyof T]: keyof T[K] extends string | number
  ? keyof T[K]
  : never;
};


export function tvr<T extends Parameters<TV>[0], breakpoints extends string>({
  breakpoints,
  preset,
  responsiveVariants
}: TVROptions<T, breakpoints>) {
  const { variants, ...rest } = preset

  const allAreResponsive = typeof responsiveVariants === 'boolean'
    && responsiveVariants;


  const variantsWithResponsive = allAreResponsive ?
    variants
    : Object.fromEntries(
      Object
        .keys(responsiveVariants!)
        .map(variant => [variant, variants[variant]])
    )

  const dynamicVariants = createDynamicVariants(variantsWithResponsive, breakpoints);

  return {
    responsiveVariantsNames: Object.keys(dynamicVariants).concat(Object.keys(variantsWithResponsive)),
    cnResolver: tv({
      ...rest,
      variants: {
        ...dynamicVariants,
        ...variants
      }
    }) as unknown as (variants:
      DynamicVariants<Partial<TransformNestedKeys<T['variants']>>, breakpoints> & { className?: string; class?: string }
    ) => string
  }
}
