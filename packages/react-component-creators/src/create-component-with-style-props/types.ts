import { ComponentProps, CSSProperties, ElementType } from 'react';

export interface CreateComponentWithStyleOptions<StyleProps,IComponent extends ElementType> {
  divideProps(
    props: Omit<ComponentProps<IComponent> & StyleProps, "className">
  ): {
    styleProps: StyleProps;
    componentOwnProps: Omit<ComponentProps<IComponent>, "className">
  };
  classNameResolver(styleProps: StyleProps, className?: string): string | undefined;
  stylePropResolver?(styleProps: StyleProps, style: CSSProperties): CSSProperties;
  Component: IComponent;
}
