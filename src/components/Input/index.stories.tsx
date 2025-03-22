import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/Input";

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
    buttonIcon: {
      control: {
        type: "text",
      },
      description: "ボタンのアイコン名を指定します",
      table: {
        defaultValue: { summary: "search" },
      },
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
        buttonIcon="delete"
      />
      <Input
        size="md"
        placeholder="Medium input (md)"
        isIconButtonEnable
        buttonIcon="delete"
      />
      <Input
        size="lg"
        placeholder="Large input (lg)"
        isIconButtonEnable
        buttonIcon="delete"
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

export const WitIconButton: Story = {
  args: {
    isIconButtonEnable: true,
    buttonIcon: "delete",
  },
};
