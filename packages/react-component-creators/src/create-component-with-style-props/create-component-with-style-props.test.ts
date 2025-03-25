import { composeStory } from "@storybook/react";
import { describe, it } from "vitest";
import meta, { Default, WithCustomColorBlue, WithCustomColorRed } from "./create-component-with-style-props.stories";

describe('create-component-with-style-props', () => {
  it('creates a div element', composeStory(Default, meta).run)
  it('renders a custom red classname', composeStory(WithCustomColorRed, meta).run)
  it('renders a custom blue classname', composeStory(WithCustomColorBlue, meta).run)
})
