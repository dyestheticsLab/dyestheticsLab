import { ElementType } from "react";
import { MetaReactElementProps, MorphProps } from "@dyesthetics-lab/react-types";
import { CreateComponentWithStyleOptions } from "../create-component-with-style-props";
import { ComponentResolver } from "../create-react-meta-component";

export type { ComponentResolver }

export interface CreateStyledComponentOptions<
  DefaultElement extends ElementType,
  StyledProps,
  ComponentProps = StyledProps
> extends CreateComponentWithStyleOptions<StyledProps, DefaultElement> {
  componentResolver?: ComponentResolver<ComponentProps & MorphProps<ElementType> & Record<string, unknown>>;
}

export function createStyledComponent<
  DefaultElement extends ElementType,
  StyledProps,
  ComponentProps = StyledProps
>({
  componentResolver,
  Component: InitialComponent,
  classNameResolver,
  divideProps,
  stylePropResolver,
  defaultProps,
}: CreateStyledComponentOptions<DefaultElement, StyledProps, ComponentProps>) {
  return function Component<RealElementType extends ElementType = DefaultElement>(
    props: MetaReactElementProps<RealElementType, ComponentProps> & Record<string, unknown>
  ) {
    const newProps = { ...defaultProps, ...props }
    const { as, className, ...restProps } = newProps;
    const Component = componentResolver?.(newProps) ?? as ?? InitialComponent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { styleProps, componentOwnProps } = divideProps(restProps as any);

    const finalClassName = classNameResolver({ ...styleProps, className });
    const { style, ...finalOwnProps } = componentOwnProps;

    const finalStyle = stylePropResolver?.(styleProps, style) ?? style;

    return <Component
      {...finalOwnProps}
      className={finalClassName}
      style={finalStyle}
    />;
  };
}

