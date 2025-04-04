import { createStyledComponent } from "@dyesthetics-lab/react-component-creators";
import { VariantProps } from "tailwind-variants";
import buttonConfig from './Button.tailwindConfig.json'
import { tvr, dividePropsByVariants } from "@dyesthetics-lab/tailwind-utils";
const {preset, options } = buttonConfig


const { cnResolver:button, responsiveVariantsNames } = tvr({
  preset,
  breakpoints: ["sm", "lg"],
  responsiveVariants: options.responsiveVariants
})

export const Button = createStyledComponent<'button', VariantProps<typeof button>>({
  classNameResolver: button,
  Component: 'button',
  divideProps: dividePropsByVariants(responsiveVariantsNames),
  defaultProps: options.defaultProps as Partial<VariantProps<typeof button>>,
});


