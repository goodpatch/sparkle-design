import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./index";

/**
 * テキストエリアコンポーネントのStorybook設定
 */
const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "複数行のテキスト入力に使用するテキストエリアコンポーネントです。各種サイズやステートに対応しています。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isDisabled: {
      control: "boolean",
      description: "テキストエリアを無効状態にするかどうか",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isInvalid: {
      control: "boolean",
      description: "テキストエリアをエラー状態として表示するかどうか",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "テキストエリアのサイズ (sm: 小, md: 中, lg: 大)",
      defaultValue: "md",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
      table: {
        type: { summary: "string" },
      },
    },
    defaultValue: {
      control: "text",
      description: "初期値",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * デフォルトのテキストエリア
 */
export const Default: Story = {
  args: {
    placeholder: "テキストを入力してください",
    size: "md",
  },
};

/**
 * エラー状態のテキストエリア
 */
export const InvalidState: Story = {
  args: {
    placeholder: "エラー状態のテキストエリア",
    isInvalid: true,
    size: "md",
  },
};

/**
 * 無効状態のテキストエリア
 */
export const DisabledState: Story = {
  args: {
    placeholder: "無効状態のテキストエリア",
    isDisabled: true,
    size: "md",
  },
};

/**
 * 無効かつエラー状態のテキストエリア
 */
export const DisabledWithInvalidState: Story = {
  args: {
    placeholder: "無効かつエラー状態のテキストエリア",
    isDisabled: true,
    isInvalid: true,
    size: "md",
  },
};

/**
 * サイズバリエーション
 * sm（小）、md（中）、lg（大）の3サイズ
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Textarea placeholder="小サイズのテキストエリア" size="sm" />
      <Textarea placeholder="標準サイズのテキストエリア" size="md" />
      <Textarea placeholder="大サイズのテキストエリア" size="lg" />
    </div>
  ),
};
