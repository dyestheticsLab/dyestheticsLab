import { composeStory } from '@storybook/react'
import { describe, it } from 'vitest'
import meta, { Default } from './create-react-meta-component.stories'

describe('create-react-meta-component', () => {
  it('creates a div element', composeStory(Default, meta).run)
  it('renders a span element', composeStory(Default, meta).run)
  it('renders a custom component', composeStory(Default, meta).run)
})
