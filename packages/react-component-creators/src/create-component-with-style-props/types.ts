import { ElementType } from 'react';

export interface CreateComponentWithStyleProps<StyleProps, Props, IComponent extends ElementType> {
  extractStyleProps(props: Omit<Props, "className">): { styleProps: StyleProps; componentOwnProps: Omit<Props, keyof StyleProps> };
  classNameResolver(styleProps: StyleProps, className?: string): string;
  Component: IComponent;
}