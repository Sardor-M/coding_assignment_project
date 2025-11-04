import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonProps } from '@repo/ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '다음',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '이전',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: '다음',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '다음',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: '다음',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '다음',
  },
};