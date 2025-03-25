import { Meta, StoryObj } from '@storybook/react';

import { createComponentWithStyleProps } from '.';
import { expect, within } from '@storybook/test'

const DivComponent = createComponentWithStyleProps({
  Component: 'div',
  classNameResolver: (_props, className) => className,
  extractStyleProps: (props) => {
    const { children, ...styleProps } = props;
    return { styleProps, componentOwnProps: { children } };
  },
});

interface StyleProps {
  customColor?: string;
}

const DivComponentWithClassName = createComponentWithStyleProps<StyleProps, 'div'>({
  Component: 'div',
  classNameResolver: (props) => {
    return `${props.customColor === 'red' ? 'red' : 'blue'}`;
  },
  extractStyleProps: (props) => {
    const { customColor, ...ownProps } = props;
    return { styleProps: {customColor}, componentOwnProps: ownProps };
  },
});

const meta: Meta<typeof DivComponent> = {
  title: 'Components/ComponentWithStyleProps',
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

export const WithCustomColorRed: StoryObj<typeof DivComponentWithClassName> = {
  args: {
    children: 'Hello World',
    customColor: 'red',
  },
  render(args){
    return <DivComponentWithClassName {...args} />;
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div.className).toBe('red');
  }
}

export const WithCustomColorBlue: StoryObj<typeof DivComponentWithClassName> = {
  args: {
    children: 'Hello World',
    customColor: 'blue',
  },
  render(args){
    return <DivComponentWithClassName {...args} />;
  },
  play({ canvasElement }){
    const canvas = within(canvasElement);

    const div = canvas.getByText('Hello World');
    expect(div.className).toBe('blue');
  }
}

