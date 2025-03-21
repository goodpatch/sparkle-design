import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "コンポーネント/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
      description: "ボタンの外観バリアント",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "ボタンのサイズ",
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "negative"],
      description: "ボタンのテーマカラー",
    },
    asChild: {
      control: "boolean",
      description: "子要素としてレンダリングするかどうか",
    },
    disabled: {
      control: "boolean",
      description: "ボタンを無効化するかどうか",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// デフォルトのボタン
export const デフォルト: Story = {
  args: {
    children: "ボタン",
  },
};

// その他のバリエーション
export const 無効: Story = {
  args: {
    children: "無効ボタン",
    disabled: true,
  },
};

// 複数のバリエーションを表示するストーリー
export const すべてのバリアント: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="solid">ソリッド</Button>
      <Button variant="outline">アウトライン</Button>
      <Button variant="ghost">ゴースト</Button>
    </div>
  ),
};

export const すべてのサイズ: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">小</Button>
      <Button size="md">中</Button>
      <Button size="lg">大</Button>
    </div>
  ),
};

export const すべてのテーマ: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button theme="primary">プライマリー</Button>
      <Button theme="secondary">セカンダリー</Button>
      <Button theme="negative">ネガティブ</Button>
    </div>
  ),
}; 