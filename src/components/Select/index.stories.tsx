import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './index';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // 引数の設定
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    // デフォルトの引数をここに設定
  },
};
