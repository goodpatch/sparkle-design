import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./index";

/**
 * テキストエリアコンポーネントのStorybook設定
 */
const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
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
