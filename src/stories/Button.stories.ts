import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import { expect } from '@storybook/jest';

import Button from '@components/_common/atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트',
    },
    type: {
      control: 'text',
      description: '버튼 유형',
      defaultValue: 'button',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      description: '버튼 크기',
      defaultValue: 'md',
    },
    color: {
      options: ['white', 'primary', 'secondary', 'analogous', 'triadic'],
      control: { type: 'select' },
      description: '버튼 색상',
      defaultValue: 'white',
    },
    shape: {
      options: ['default', 'round'],
      control: { type: 'select' },
      description: '버튼 모양',
      defaultValue: 'default',
    },
    borderColor: {
      options: ['primary', 'triadic'],
      control: { type: 'select' },
      description: '버튼 테두리 색상',
      defaultValue: 'primary',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const White: Story = {
  args: {
    children: '버튼',
    onClick: fn(),
    type: 'button',
    size: 'md',
    color: 'white',
    shape: 'default',
    borderColor: 'triadic',
  },
};

export const LargePrimary: Story = {
  args: {
    ...White.args,
    color: 'primary',
    size: 'lg',
    borderColor: 'primary',
  },
};

export const SmallTriadic: Story = {
  args: {
    ...White.args,
    color: 'triadic',
    size: 'sm',
  },
};

export const RoundedButton: Story = {
  args: {
    ...White.args,
    shape: 'round',
    borderColor: 'primary',
  },
};

export const ClickInteraction: Story = {
  args: {
    ...White.args,
    children: '클릭 테스트',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
