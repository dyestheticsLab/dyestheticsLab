import { ComponentProps, ElementType } from 'react';

export interface CreateComponentWithStyleProps<StyleProps,IComponent extends ElementType> {
  extractStyleProps(
    props: Omit<ComponentProps<IComponent> & StyleProps, "className">
  ): {
    styleProps: StyleProps;
    componentOwnProps: Omit<ComponentProps<IComponent>, "className">
  };
  classNameResolver(styleProps: StyleProps, className?: string): string | undefined;
  Component: IComponent;
}
