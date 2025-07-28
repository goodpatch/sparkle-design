import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      control: "boolean",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      action: "changed",
      table: {
        type: { summary: "function" },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * デフォルトのスイッチ
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * チェック状態のスイッチ
 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
    size: "md",
  },
};

/**
 * 無効状態のスイッチ
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    size: "md",
  },
};

/**
 * チェック状態かつ無効状態のスイッチ
 */
export const CheckedAndDisabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    size: "md",
  },
};

/**
 * サイズバリエーション
 */
export const SizeVariations: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">小:</span>
        <Switch {...args} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">中:</span>
        <Switch {...args} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">大:</span>
        <Switch {...args} size="lg" />
      </div>
    </div>
  ),
};
