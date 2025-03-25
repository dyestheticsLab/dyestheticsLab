import { ElementType } from 'react';
import { CreateComponentWithStyleProps } from "./types";

export default function createComponentWithStyleProps<
  S extends Record<string, any>,
  P extends Record<string, any>,
  C extends ElementType
>({
  extractStyleProps,
  classNameResolver,
  Component
}: CreateComponentWithStyleProps<S, P, C>) {
  return ({ className, ...props }: P) => {
    const { styleProps, componentOwnProps } = extractStyleProps(props);

    const resolvedClassName = classNameResolver(styleProps, className);

    return <Component {...componentOwnProps as any} className={resolvedClassName} />;
  };
}