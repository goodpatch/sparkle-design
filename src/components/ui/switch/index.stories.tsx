import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./index";

/**
 * スイッチコンポーネントのStorybook設定
 */
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "スイッチは設定のオンとオフを切り替えるために使用するコンポーネントです。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "スイッチのサイズ (sm: 小, md: 中, lg: 大)",
      defaultValue: "md",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "スイッチを無効状態にするかどうか",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      control: "boolean",
      description: "スイッチをオン状態（チェック状態）にするかどうか",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      action: "changed",
      description:
        "スイッチの状態が変更されたときに呼び出されるコールバック関数",
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
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">小:</span>
        <Switch size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">中:</span>
        <Switch size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-10 text-right font-bold">大:</span>
        <Switch size="lg" />
      </div>
    </div>
  ),
};
