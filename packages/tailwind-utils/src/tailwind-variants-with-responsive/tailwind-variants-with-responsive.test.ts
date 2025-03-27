import { describe, expect, it } from "vitest";
import { tvr } from ".";

describe('tailwind variants with responsive', ()=>{
  it('adds responsive variants', ()=>{
    const { cnResolver: padding } = tvr({
      breakpoints: ['sm'],
      preset: {
        variants: {
          padding: {
            1: 'p-1',
            2: 'p-2'
          }
        }
      },
      responsiveVariants: true
    })

  const resolvedClassname = padding({className: 'hello', padding: 1, smPadding: 1});

   expect(resolvedClassname.split(' ').sort()).toEqual(['sm:p-1', 'hello', 'p-1'].sort())
  })
})
