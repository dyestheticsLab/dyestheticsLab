import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode, Ref } from "react";

export type CommonComponentProps<T extends ElementType> = {
  className?: string;
  [data: `data-${string}`]: string;
  ref?: Ref<T>;
  style?: CSSProperties;
  children?: ReactNode;
}

export type MorphProps<T extends ElementType> = {
  as?: T;
}

export type BaseMetaReactElementProps<T extends ElementType> = CommonComponentProps<T> & MorphProps<T>;

export type MetaReactElementProps<
  T extends ElementType,
  AdditionalProps,
> = BaseMetaReactElementProps<T> &
  ComponentPropsWithoutRef<T> &
  AdditionalProps;

