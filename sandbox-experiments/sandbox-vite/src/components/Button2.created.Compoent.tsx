import { createResponsiveStyled } from "@dyesthetics-lab/react-tv-variants-creators";


const Button = createResponsiveStyled({
  preset: {
    variants: {
      customColor: {
        danger: "bg-red-500 text-white",
      }
    },
  },
  breakpoints: ["sm", "lg"],
  responsiveVariants: {
    customColor: true,
  },
  tag: "button",
});

export default Button;
