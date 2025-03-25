import { composeStory } from "@storybook/react";
import { describe, it } from "vitest";
import meta, { Default, RendersAsSpan, WithCustomAppearance} from "./create-styled-component.stories";

describe('create-component-with-style-props', () => {
  it('creates a button element', composeStory(Default, meta).run)
  it('renders a custom red classname', composeStory(WithCustomAppearance, meta).run)
  it('renders a as a span', composeStory(RendersAsSpan, meta).run)
})
