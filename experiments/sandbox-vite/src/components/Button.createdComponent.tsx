import { createStyledComponent } from "@dyesthetics-lab/react-component-creators";
import { tv, VariantProps } from "tailwind-variants";
import { preset } from './Button.tailwindConfig.json'

const button = tv(preset)

export const Button = createStyledComponent<'button', VariantProps<typeof button>>({
  classNameResolver: button,
  Component: 'button',
  divideProps({appearance, ...restProps}){
    return {
      componentOwnProps: restProps,
      styleProps: {
        appearance
      }
    }
  }
});
