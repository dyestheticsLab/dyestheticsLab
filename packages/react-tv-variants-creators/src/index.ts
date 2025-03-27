import { tvr } from "@dyesthetics-lab/tailwind-utils";
import { ComponentProps, JSX } from "react";
import { TV, VariantProps } from "tailwind-variants";
import {  createStyledComponent } from "@dyesthetics-lab/react-component-creators"

export type  TailwindComponentConfig<
  Tag extends keyof JSX.IntrinsicElements,
  T extends Pick<Parameters<TV>[0], 'variants'>,
  breakpoints extends string = string
> = {
  name?: string;
  preset: T
  options?: {
    responsiveVariants?: boolean | Record<keyof T, boolean>;
    defaultProps?: Partial<VariantProps<T['variants']> & ComponentProps<Tag>>;
  };
  breakpoints?: breakpoints[];
  tag?: Tag;
}


export function createResponsiveStyled<Component extends keyof JSX.IntrinsicElements, T extends Parameters<TV>[0], breakpoints extends string = string>({
  preset, options, breakpoints, tag
}: TailwindComponentConfig<Component, T, breakpoints>){
  const {cnResolver, responsiveVariantsNames} = tvr<T, breakpoints>({
    preset,
    breakpoints,
    responsiveVariants: options?.responsiveVariants
  })

  return createStyledComponent({
    classNameResolver: cnResolver,
    Component: tag as Component,
    //@ts-expect-error type is ok
    divideProps: dividePropsByVariants(responsiveVariantsNames),
    //@ts-expect-error type is ok
    defaultProps: options.defaultProps,
  });
}
