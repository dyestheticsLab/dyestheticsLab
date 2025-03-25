import { ElementType } from 'react';
import { CreateComponentWithStyleProps } from "./types";

export default function createComponentWithStyleProps<
  StyleProps extends Record<string, any>,
  Props extends Record<string, any>,
  IComponent extends ElementType
>({
  extractStyleProps,
  classNameResolver,
  Component
}: CreateComponentWithStyleProps<StyleProps, Props, IComponent>) {
  return ({ className, ...props }: Props) => {
    const { styleProps, componentOwnProps } = extractStyleProps(props);

    const resolvedClassName = classNameResolver(styleProps, className);

    return <Component {...componentOwnProps as any} className={resolvedClassName} />;
  };
}