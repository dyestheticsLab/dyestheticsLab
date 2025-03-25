/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ElementType } from 'react';
import { CreateComponentWithStyleOptions } from "./types";

export function createComponentWithStyleProps<
  StyleProps,
  IComponent extends ElementType
>({
  divideProps,
  classNameResolver,
  Component
}: CreateComponentWithStyleOptions<StyleProps, IComponent>) {
  return ({ className, ...props }: ComponentProps<IComponent> & StyleProps) => {
    const {
      styleProps,
      componentOwnProps
    } = divideProps(props);

    const resolvedClassName = classNameResolver?.(styleProps, className) ?? className;
    const { style, ...restProps } = componentOwnProps;

    return <Component
      {...restProps as any}
      lassName={resolvedClassName}
      style={style}
    />;
  };
}

export type * from './types';
