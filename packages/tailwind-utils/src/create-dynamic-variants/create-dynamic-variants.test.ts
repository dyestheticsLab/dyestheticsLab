import { describe, expect, it } from "vitest";
import { createDynamicVariants } from ".";

describe('createDynamicVariants', () => {
  it('creates dynamic variants', () => {
    const dynamicVariants = createDynamicVariants({
      appearance: {
        default: 'bg-primary',
        primary: 'bg-primary',
      },
      padding: {
        default: 'p-4',
        sm: 'p-2',
      },
    },['sm', 'md'] )

    expect(dynamicVariants).toEqual({
      smAppearance: {
        default: ['sm:bg-primary'],
        primary: ['sm:bg-primary'],
      },
      mdAppearance: {
        default: ['md:bg-primary'],
        primary: ['md:bg-primary'],
      },
      smPadding: {
        default: ['sm:p-4'],
        sm: ['sm:p-2'],
      },
      mdPadding: {
        default: ['md:p-4'],
        sm: ['md:p-2'],
      },
    })
  })

})
