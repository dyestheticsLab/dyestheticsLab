import { createStyledComponent } from "@dyesthetics-lab/react-component-creators";
import { VariantProps } from "tailwind-variants";
import buttonConfig from './Button.tailwindConfig.json'
import { tvr, dividePropsByVariants } from "@dyesthetics-lab/tailwind-utils";
import { TailwindComponentConfig, createResponsiveStyled } from "@dyesthetics-lab/react-tv-variants-creators";
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


const ButtonCusom = createResponsiveStyled(
  buttonConfig as unknown as TailwindComponentConfig<'button', typeof preset>
);

const A = createResponsiveStyled({
  tag: 'button',
  preset: {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      color: {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-500 text-black",
      },
    },
  },
  breakpoints: ["sm", "lg"],
});



console.log(ButtonCusom)
