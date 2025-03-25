import {  ElementType } from "react";
import { MetaReactElementProps, MorphProps } from "@dyesthetics-lab/react-types";
import { CreateComponentWithStyleOptions } from "../create-component-with-style-props";
import { ComponentResolver } from "../create-react-meta-component";


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
  extractStyleProps,
}: CreateStyledComponentOptions<DefaultElement, StyledProps, ComponentProps>) {
  return function Component<RealElementType extends ElementType = DefaultElement>(
    props: MetaReactElementProps<RealElementType, ComponentProps> & Record<string, unknown>
  ) {
    const { as, className, ...restProps } = props;
    const Component = componentResolver?.(props) ?? as ?? InitialComponent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { styleProps, componentOwnProps } = extractStyleProps(restProps as any);

    const resolvedClassName = classNameResolver(styleProps, className);

    return <Component {...componentOwnProps} className={resolvedClassName} />;
  };
}

