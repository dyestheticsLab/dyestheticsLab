import { tvr, dividePropsByVariants, DynamicVariants } from "@dyesthetics-lab/tailwind-utils";
import { ComponentProps, ElementType, JSX } from "react";
import {  createStyledComponent } from "@dyesthetics-lab/react-component-creators"

export { dividePropsByVariants }

export interface CnBaseResolver<StyleProps> {
  (styleProps: StyleProps, className?: string): string | undefined
}

export type ExtractVariants<T extends RecordInRecord> = {
  [K in  keyof T]?: keyof T[K]
}

export type  TailwindComponentConfig<
  Tag extends keyof JSX.IntrinsicElements,
  T extends RecordInRecord,
  ResponsiveVariants extends boolean | Partial<Record<keyof T , boolean>> | undefined,
  breakpoints extends string = string,
> = {
  name?: string;
  preset:IPreset<T>
  responsiveVariants?: ResponsiveVariants;
  defaultProps?: Partial<ExtractVariants<T> & ComponentProps<Tag>>;
  breakpoints?: breakpoints[];
  tag?: Tag;
  classNameResolver?(
    tvrCnResolver:CnBaseResolver<ExtractVariants<T>>,
    styleProps: DynamicVariants<ExtractVariants<T>, breakpoints>,
    className?: string
  ): string | undefined,
  componentResolver?(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: ComponentProps<Tag> & Record<string, any> & {as?: ElementType}
  ): ElementType,
  divideProps?(
    responsiveVariants: string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Omit<ComponentProps<Tag> & ExtractVariants<T>, 'className'> & Record<string, any> & {as?: ElementType}
  ):{
    styleProps: DynamicVariants<ExtractVariants<T>, breakpoints>,
    componentOwnProps: Omit<ComponentProps<Tag>, 'className'>
  };
  stylePropResolver?(
    responsiveVariants: string[],
    styleProps: DynamicVariants<ExtractVariants<T>, breakpoints>,
    style: React.CSSProperties
  ): React.CSSProperties;
}

export type RecordInRecord = Record<string, Record<string, string | string []>>
export interface IPreset<T extends RecordInRecord> {
  variants?: T,
  base?: string[]
}


export function createResponsiveStyled<
  Component extends keyof JSX.IntrinsicElements,
  T extends RecordInRecord,
  ResponsiveVariants extends boolean | Partial<Record<keyof T, boolean>> | undefined = undefined,
  breakpoints extends string = string,
>({
  preset,
  defaultProps,
  responsiveVariants,
  breakpoints,
  tag,
  classNameResolver,
  componentResolver,
  divideProps,
  stylePropResolver
}: TailwindComponentConfig<Component, T, ResponsiveVariants, breakpoints>){

  const {cnResolver, responsiveVariantsNames} = tvr({
    preset,
    breakpoints,
    responsiveVariants
  });


  return createStyledComponent({
    //@ts-expect-error type is ok
    classNameResolver: !classNameResolver?
      cnResolver
      //@ts-expect-error type is ok
      :(...args)=>classNameResolver(cnResolver, ...args)
    ,
    Component: tag as Component,
    //@ts-expect-error type is ok
    divideProps: !divideProps? dividePropsByVariants(responsiveVariantsNames.concat(Object.keys(preset.variants))):(...args)=>divideProps(responsiveVariantsNames, ...args),
    defaultProps: defaultProps,
    //@ts-expect-error type is ok
    stylePropResolver: !stylePropResolver? undefined : (...args)=>stylePropResolver(responsiveVariantsNames, ...args),
    componentResolver: componentResolver
  }) as ReturnType<typeof createStyledComponent<
    Component,
    Partial<ResponsiveVariants extends undefined?
      ExtractVariants<T>:
    ResponsiveVariants extends true?
      DynamicVariants<ExtractVariants<T>, breakpoints>
      : ResponsiveVariants extends Partial<Record<keyof T, boolean>>?
      DynamicVariants<PickResponsiveVariants<T, ResponsiveVariants>, breakpoints>
      : ExtractVariants<T>>
  >>;
}

type PickResponsiveVariants<
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  Variants extends Record<string, Record<string, any>>,
  ResponsiveVariants extends Partial<Record<keyof Variants, boolean>>
> = {
  [K in keyof ResponsiveVariants as ResponsiveVariants[K] extends true ? K : never]: K extends keyof Variants
    ? keyof Variants[K]
    : never;
};
