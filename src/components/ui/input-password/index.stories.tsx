import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InputPassword } from "@/components/ui/input-password";

const meta: Meta<typeof InputPassword> = {
  title: "Form/Input Password",
  component: InputPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "パスワードを入力してください",
  },
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["sm", "md", "lg"],
      description: "入力フィールドのサイズを指定します",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isInvalid: {
      control: {
        type: "boolean",
      },
      description: "エラー状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
      description: "無効状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
      description: "プレースホルダーテキスト",
    },
    defaultValue: {
      control: {
        type: "text",
      },
      description: "デフォルト値",
    },
    className: {
      control: {
        type: "text",
      },
      description: "カスタムCSSクラス",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    placeholder: "パスワードを入力してください",
  },
};

export const Size: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputPassword size="sm" placeholder="Small パスワード入力 (sm)" />
      <InputPassword size="md" placeholder="Medium パスワード入力 (md)" />
      <InputPassword size="lg" placeholder="Large パスワード入力 (lg)" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputPassword placeholder="無効なパスワード入力" isInvalid />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputPassword placeholder="無効化されたパスワード入力" isDisabled />
    </div>
  ),
};
