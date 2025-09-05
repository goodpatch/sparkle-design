import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

const meta: Meta<typeof InlineMessage> = {
  title: "Components/InlineMessage",
  component: InlineMessage,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "warning", "negative", "success"],
      description: "メッセージの状態 / en: Message status",
    },
    isTitle: {
      control: "boolean",
      description:
        "タイトルを表示するかどうか / en: Whether to display the title",
    },
    isCloseTrigger: {
      control: "boolean",
      description:
        "閉じるボタンを表示するかどうか / en: Whether to show close button",
    },
    title: {
      control: "text",
      description:
        "後方互換用タイトル（children優先） / en: Fallback title (children has priority)",
    },
    description: {
      control: "text",
      description:
        "後方互換用説明文（children優先） / en: Fallback description (children has priority)",
    },
    onClose: {
      action: "closed",
      description:
        "閉じる操作時のハンドラー / en: Handler when message is closed",
    },
  },
};
export default meta;
type Story = StoryObj<typeof InlineMessage>;
export const Default: Story = {
  args: {
    status: "info",
    isCloseTrigger: true,
    isTitle: true,
    title: "タイトル",
    description: "デスクリプション",
  },
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>{args.title}</InlineMessageTitle>
      <InlineMessageDescription>{args.description}</InlineMessageDescription>
    </InlineMessage>
  ),
};

// Variant ショートカット（必要最小限）
export const Info: Story = { args: { ...Default.args, status: "info" } };
export const Warning: Story = { args: { ...Default.args, status: "warning" } };
export const Negative: Story = {
  args: { ...Default.args, status: "negative" },
};
export const Success: Story = { args: { ...Default.args, status: "success" } };

export const WithoutTitle: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>（このタイトルは非表示設定）</InlineMessageTitle>
      <InlineMessageDescription>
        タイトルなしのメッセージです。
      </InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "info",
    isCloseTrigger: true,
    isTitle: false,
  },
};

// 閉じるボタンの機能を示すための例
export const WithCloseButton: Story = {
  args: {
    status: "info",
    isCloseTrigger: true,
    isTitle: true,
  },
  render: args => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) {
      return (
        <Button variant="outline" onClick={() => setIsVisible(true)}>
          メッセージを表示
        </Button>
      );
    }
    return (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <InlineMessage
          {...args}
          onClose={() => {
            setIsVisible(false);
            args.onClose?.();
          }}
        >
          <InlineMessageTitle>閉じるボタンの機能</InlineMessageTitle>
          <InlineMessageDescription>
            このメッセージは閉じるボタンをクリックすると消えます。
          </InlineMessageDescription>
        </InlineMessage>
      </div>
    );
  },
};
