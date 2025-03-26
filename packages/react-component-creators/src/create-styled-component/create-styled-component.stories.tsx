import { Meta, StoryObj } from '@storybook/react';

import { createStyledComponent } from '.';
import { expect, within } from '@storybook/test'


const Button = createStyledComponent<'button', {appearance: 'red' | 'blue' }>({
  Component: 'button',
  divideProps: (props) => {
    const { appearance, ...styleProps } = props;
    return { styleProps: {appearance}, componentOwnProps: styleProps};
  },
  classNameResolver: (styleProps) => {
    return styleProps.appearance === 'red' ? 'red' :'blue';
  }
});


const meta: Meta<typeof Button> = {
  title: 'Components/MetaComponentWithStyleProps',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;


export const Default: Story = {
  args: {
    children: 'Hello World',
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const button = canvas.getByText('Hello World');
    expect(button instanceof HTMLButtonElement).toBe(true);
  }
};


export const RendersAsSpan: Story = {
  args: {
    children: 'Hello World',
    as: 'span',
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div instanceof HTMLSpanElement).toBe(true);
  }
};

export const WithCustomAppearance: Story = {
  args: {
    children: 'Hello World',
    appearance: 'red',
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div.className).toBe('red');
  }
};
