import { describe, expect, it } from "vitest";
import { createTransformers } from ".";

describe('create transformers', () => {
  it('should create transformers', async () => {
    const transformers = await createTransformers({
      componentsFileGlobs: ['src/**/*.tsx'],
      createClassNameResolver: () => () => 'className',
      configurationFileRead: async () => '{"preset": "preset", "options": "options"}',
      globResolver: async () => ['src/Button.createdComponent.tsx']
    })

    expect(transformers.has('Button')).toBeTruthy();

    const transformer = transformers.get('Button');
    expect(transformer).toBeInstanceOf(Function);

    expect(transformer?.({}) ?? '').toBe('className');
  })
})
