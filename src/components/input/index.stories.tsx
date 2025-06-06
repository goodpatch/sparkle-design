import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Placeholder text",
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
    isIconButtonEnable: {
      control: {
        type: "boolean",
      },
      description: "アイコンボタンを表示するかどうかを指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    iconButtonIcon: {
      control: {
        type: "text",
      },
      description: "ボタンのアイコン名を指定します",
      table: {
        defaultValue: { summary: "search" },
      },
    },
    iconButtonAriaLabel: {
      control: {
        type: "text",
      },
      description: "アイコンボタンのアクセシビリティラベルを指定します",
    },
    onIconButtonClick: {
      action: "buttonClicked",
      description: "ボタンクリック時のイベントハンドラ",
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

export const Size: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        size="sm"
        placeholder="Small input (sm)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
      <Input
        size="md"
        placeholder="Medium input (md)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
      <Input
        size="lg"
        placeholder="Large input (lg)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Invalid input" isInvalid />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Disabled input" isDisabled />
    </div>
  ),
};

export const WithIconButton: Story = {
  args: {
    isIconButtonEnable: true,
    iconButtonIcon: "cancel",
    iconButtonAriaLabel: "入力内容を消去する",
  },
};
