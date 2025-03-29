import { composeStory } from "@storybook/react";
import { describe, it } from "vitest";
import meta, { Default, WithCustomClassName } from "./create-responsive-styled.stories";

describe('create-component-with-style-props', () => {
  it('creates a button element', composeStory(Default, meta).run)
  it('renders a custom classname', composeStory(WithCustomClassName, meta).run)
})
