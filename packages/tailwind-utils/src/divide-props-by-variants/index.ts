import { pick, omit } from 'rambda'

export function dividePropsByVariants(
  variantNames: string[]
){
  return <T>(props: T)=>{
    return {
      componentOwnProps: omit(variantNames, props),
      styleProps: pick(variantNames, props)
   }

 }
}
