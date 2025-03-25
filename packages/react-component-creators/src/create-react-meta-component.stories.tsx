import { Meta, StoryObj } from '@storybook/react';

import { createReactMetaComponent } from './create-react-meta-component';
import { expect, fn, within } from '@storybook/test'

const DivComponent = createReactMetaComponent({
  defaultElement: 'div',
});

const meta: Meta<typeof DivComponent> = {
  title: 'Components/YourComponent',
  component: DivComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DivComponent>;


export const Default: Story = {
  args: {
    children: 'Hello World',
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div instanceof HTMLDivElement).toBe(true);
  }
};

export const RendersAsSpan: Story = {
  args: {
    as: 'span',
    children: 'Hello World',
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const span = canvas.getByText('Hello World');
    expect(span instanceof HTMLSpanElement).toBeTruthy();
  }
}

export const WithCustomComponentResolver: Story = {
  args: {
    href: '#',
    componentResolver: fn((props) =>props.href? 'a': undefined),
  },
  render({
    componentResolver,
    ...args
  }){
    const CustomComponent = createReactMetaComponent({
      defaultElement: 'div',
      componentResolver,
    });

    return <CustomComponent {...args} >Hello World</CustomComponent>;
  },
  play({ canvasElement, args }){
    const canvas = within(canvasElement);

    const a = canvas.getByText('Hello World');
    expect(a instanceof HTMLAnchorElement).toBeTruthy();
    expect(args.componentResolver).toHaveBeenCalled();
  },
}
