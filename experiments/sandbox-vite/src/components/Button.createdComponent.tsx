import { createStyledComponent } from "@dyesthetics-lab/react-component-creators";
import { VariantProps } from "tailwind-variants";
import buttonConfig from './Button.tailwindConfig.json'
import { tvr, dividePropsByVariants } from "@dyesthetics-lab/tailwind-utils";
import { TailwindComponentConfig, createCustomStyled } from "@dyesthetics-lab/react-tv-variants-creators";
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


const ButtonCusom = createCustomStyled<'button', typeof preset>(
  buttonConfig as unknown as TailwindComponentConfig<'button', typeof preset>
);

console.log(ButtonCusom)
