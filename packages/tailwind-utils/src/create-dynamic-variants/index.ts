import { DynamicVariants } from "../types";

export function arrifyClassnames(classNames: string | string []){
  return Array.isArray(classNames) ? classNames : [classNames]
}

export function prefixVariant<T extends Record<string, string | string []>, prefix extends string>(
  variant: T,
  prefix: prefix,
  separator: string = ':'
){
  return Object.fromEntries(Object
    .entries(variant)
    .map(([variantValue, classNames])=>{
      return [variantValue, arrifyClassnames(classNames).map(className=>`${prefix}${separator}${className}`)]
    }))
}

export function capitalize(string: string){
  return string.charAt(0).toUpperCase() + string.slice(1)
}

//TODO: this can be useful in its own package
export function createDynamicVariants<
  Variants extends Record<string, Record<string, string | string [] >>,
  prefixes extends string
>(
  variants: Variants,
  prefixes: prefixes[] = [],
  separator: string = ':'
):DynamicVariants<Variants, prefixes> {
  return Object.fromEntries(Object.entries(variants)
    .flatMap(([
      variantName,
      variantData
    ])=>{
      const capitalizedVariantName = capitalize(variantName)

      return prefixes
        .map(prefix => [
          `${prefix}${capitalizedVariantName}`,
          prefixVariant(variantData, prefix, separator)]
        )
    }
  )) as DynamicVariants<Variants, prefixes>
}
