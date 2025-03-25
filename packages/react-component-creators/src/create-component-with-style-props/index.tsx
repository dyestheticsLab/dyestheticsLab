/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ElementType } from 'react';
import { CreateComponentWithStyleOptions } from "./types";

export function createComponentWithStyleProps<
  StyleProps,
  IComponent extends ElementType
>({
  extractStyleProps,
  classNameResolver,
  Component
}: CreateComponentWithStyleOptions<StyleProps, IComponent>) {
  return ({ className, ...props }: ComponentProps<IComponent> & StyleProps) => {
    const { styleProps, componentOwnProps } = extractStyleProps(props);

    const resolvedClassName = classNameResolver(styleProps, className);

    return <Component {...componentOwnProps as any} className={resolvedClassName} />;
  };
}

export type * from './types';
