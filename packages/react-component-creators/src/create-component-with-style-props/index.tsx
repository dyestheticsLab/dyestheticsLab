/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ElementType } from 'react';
import { CreateComponentWithStyleOptions } from "./types";

//TODO: some code is being repeated in createStyled, could be abstracted to functions
export function createComponentWithStyleProps<
  StyleProps,
  IComponent extends ElementType
>({
  divideProps,
  classNameResolver,
  Component,
  defaultProps
}: CreateComponentWithStyleOptions<StyleProps, IComponent>) {
  return ({ className, ...props }: ComponentProps<IComponent> & StyleProps) => {
    //TODO: check if wee need to merge classNames
    const newProps = { ...props, defaultProps };

    const {
      styleProps,
      componentOwnProps
    } = divideProps(newProps);

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
