import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
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
 * thumb のスライド（spring）と押しつぶし（squash）モーションの確認用。
 * en: For verifying thumb slide (spring) and squash motion.
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "クリックを繰り返して動きを確認する。sm / md / lg の3サイズを並べて表示。\n\n**押しつぶし**：押下の瞬間に scaleX(1.3) / scaleY(0.75)、80ms ease-out。\n**スライド + spring**：translate-x + scale が元に戻る、300ms cubic-bezier(0.34,1.56,0.64,1)（終点で少し行き過ぎて戻る）。\n**トラック色**：250ms ease-in-out で同時変化。\n\nen: Click repeatedly to verify motion. sm / md / lg sizes shown side by side. Squash: scaleX(1.3)/scaleY(0.75) on press, 80ms ease-out. Slide + spring: translate-x with scale returning, 300ms cubic-bezier(0.34,1.56,0.64,1). Track color: 250ms ease-in-out.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-8 text-xs text-neutral-500">sm</span>
        <Switch size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 text-xs text-neutral-500">md</span>
        <Switch size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 text-xs text-neutral-500">lg</span>
        <Switch size="lg" />
      </div>
    </div>
  ),
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
