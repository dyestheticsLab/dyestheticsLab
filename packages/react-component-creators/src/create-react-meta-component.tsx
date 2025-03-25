import type { ElementType } from "react";
import type { MorphProps, MetaReactElementProps }  from "@dyesthetics-lab/react-types"

type ComponentResolver<Props> = (props: Props) => ElementType | undefined;

export function createReactMetaComponent<
  DefaultElement extends ElementType,
  Props extends object
>({
  defaultElement,
  componentResolver,
}: {
  defaultElement: DefaultElement;
  componentResolver?: ComponentResolver<Props & MorphProps<ElementType> & Record<string, unknown>>;
}) {
  return function Component<RealElementType extends ElementType = DefaultElement>(
    props: MetaReactElementProps<RealElementType, Props> & Record<string, unknown>
  ) {
    const { as, ...restProps } = props;
    const Component = componentResolver?.(props) ?? as ?? defaultElement;

    return <Component {...restProps} />;
  };
}
