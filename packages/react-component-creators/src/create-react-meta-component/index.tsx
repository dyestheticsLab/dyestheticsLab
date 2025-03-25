import type { ElementType } from "react";
import type { MorphProps, MetaReactElementProps }  from "@dyesthetics-lab/react-types"

export type ComponentResolver<Props> = (props: Props) => ElementType | undefined;

export interface CreateReactMetaComponentOptions<DefaultElement extends ElementType, Props> {
  defaultElement: DefaultElement;
  componentResolver?: ComponentResolver<Props & MorphProps<ElementType> & Record<string, unknown>>;
}

export function createReactMetaComponent<
  DefaultElement extends ElementType,
  Props
>({
  defaultElement,
  componentResolver,
}: CreateReactMetaComponentOptions<DefaultElement, Props>) {
  return function Component<RealElementType extends ElementType = DefaultElement>(
    props: MetaReactElementProps<RealElementType, Props> & Record<string, unknown>
  ) {
    const { as, ...restProps } = props;
    const Component = componentResolver?.(props) ?? as ?? defaultElement;

    return <Component {...restProps} />;
  };
}
