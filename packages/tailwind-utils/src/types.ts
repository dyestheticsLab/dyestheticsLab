export type DynamicVariants<T, Variants extends string> = T & {
  [K in keyof T as `${Variants & string}${Capitalize<string & K>}`]: T[K];
};


