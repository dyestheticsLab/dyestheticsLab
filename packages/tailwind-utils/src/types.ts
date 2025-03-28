export type DynamicVariants<T, suffixes extends string> = T & {
  [K in keyof T as `${suffixes & string}${Capitalize<string & K>}`]: T[K];
};


