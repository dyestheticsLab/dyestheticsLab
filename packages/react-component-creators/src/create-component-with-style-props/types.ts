import { ElementType } from 'react';

export interface CreateComponentWithStyleProps<S, P, C extends ElementType> {
  extractStyleProps(props: Omit<P, "className">): { styleProps: S; componentOwnProps: Omit<P, keyof S> };
  classNameResolver(styleProps: S, className?: string): string;
  Component: C;
}