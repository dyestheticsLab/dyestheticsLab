import { tvr, dividePropsByVariants, DynamicVariants } from "@dyesthetics-lab/tailwind-utils";
import { ComponentProps, ElementType, JSX } from "react";
import { TV, VariantProps } from "tailwind-variants";
import {  createStyledComponent } from "@dyesthetics-lab/react-component-creators"

export { dividePropsByVariants }

export interface CnBaseResolver<StyleProps> {
  (styleProps: StyleProps, className?: string): string | undefined
}


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
  classNameResolver?(
    tvrCnResolver:CnBaseResolver<VariantProps<T['variants']>>,
    styleProps: VariantProps<T['variants']>,
    className?: string
  ): string | undefined,
  componentResolver?(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: ComponentProps<Tag> & Record<string, any> & {as?: ElementType}
  ): ElementType,
  divideProps?(
    responsiveVariants: string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Omit<ComponentProps<Tag> & VariantProps<T['variants']>, 'className'> & Record<string, any> & {as?: ElementType}
  ):{
    styleProps: VariantProps<T['variants']>,
    componentOwnProps: Omit<ComponentProps<Tag>, 'className'>
  };
  stylePropResolver?(
    responsiveVariants: string[],
    styleProps: VariantProps<T['variants']>,
    style: React.CSSProperties
  ): React.CSSProperties;
}


export function createResponsiveStyled<Component extends keyof JSX.IntrinsicElements, T extends Parameters<TV>[0], breakpoints extends string = string>({
  preset,
  options,
  breakpoints,
  tag,
  classNameResolver,
  componentResolver,
  divideProps,
  stylePropResolver
}: TailwindComponentConfig<Component, T, breakpoints>){
  const {cnResolver, responsiveVariantsNames} = tvr({
    preset,
    breakpoints,
    responsiveVariants: options?.responsiveVariants
  })

  return createStyledComponent({
    //@ts-expect-error type is ok
    classNameResolver: !classNameResolver?
      cnResolver
      //@ts-expect-error type is ok
      :(...args)=>classNameResolver(cnResolver, ...args)
    ,
    Component: tag as Component,
    //@ts-expect-error type is ok
    divideProps: !divideProps? dividePropsByVariants(responsiveVariantsNames):(...args)=>divideProps(responsiveVariantsNames, ...args),
    //@ts-expect-error type is ok
    defaultProps: options.defaultProps,
    stylePropResolver: !stylePropResolver? undefined : (...args)=>stylePropResolver(responsiveVariantsNames, ...args),
    componentResolver: componentResolver
  }) as ReturnType<typeof createStyledComponent<Component, DynamicVariants<VariantProps<T['variants']>, breakpoints>>>;
}
