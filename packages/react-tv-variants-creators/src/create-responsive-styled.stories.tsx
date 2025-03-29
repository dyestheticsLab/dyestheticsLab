import { Meta, StoryObj } from '@storybook/react';

import { createResponsiveStyled } from '.';
import { expect, within } from '@storybook/test'


const Button = createResponsiveStyled({
  tag: 'button',
  preset: {
    variants: {
      appearance: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
      },
    },
  },
});


const meta: Meta<typeof Button> = {
  title: 'Components/CreateResponsiveStyled',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;


export const Default: Story = {
  args: {
    children: 'Hello World',
  },
  play({ canvasElement }) {
    const canvas = within(canvasElement);

    const button = canvas.getByText('Hello World');
    expect(button instanceof HTMLButtonElement).toBe(true);
  }
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Hello World',
    appearance: 'primary',
    className: 'p-4',
  },
  play({ canvasElement }) {
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div.className).toBe('bg-blue-500 text-white p-4');
  }
};
