import { createStyledComponent } from "@dyesthetics-lab/react-component-creators";
import {  VariantProps } from "tailwind-variants";
import { preset, options } from './Button.tailwindConfig.json'
import { tvr, dividePropsByVariants } from "@dyesthetics-lab/tailwind-utils";

const { cnResolver:button, responsiveVariantsNames } = tvr({
  preset,
  breakpoints: ["sm"],
  responsiveVariants: options.responsiveVariants
})

export const Button = createStyledComponent<'button', VariantProps<typeof button>>({
  classNameResolver: button,
  Component: 'button',
  divideProps: dividePropsByVariants(responsiveVariantsNames)
});
