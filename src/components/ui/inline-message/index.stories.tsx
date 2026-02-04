import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

const meta: Meta<typeof InlineMessage> = {
  title: "Feedback/Inline Message",
  component: InlineMessage,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "warning", "negative", "success"],
    },
    isCloseTrigger: {
      control: "boolean",
    },
    onClose: {
      action: "closed",
    },
  },
};
export default meta;
type Story = StoryObj<typeof InlineMessage>;
export const Default: Story = {
  args: {
    status: "info",
    isCloseTrigger: true,
  },
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>タイトル</InlineMessageTitle>
      <InlineMessageDescription>デスクリプション</InlineMessageDescription>
    </InlineMessage>
  ),
};

// Variant ショートカット（必要最小限）
export const Info: Story = {
  args: { ...Default.args, status: "info" },
  render: Default.render,
};
export const Warning: Story = {
  args: { ...Default.args, status: "warning" },
  render: Default.render,
};
export const Negative: Story = {
  args: { ...Default.args, status: "negative" },
  render: Default.render,
};
export const Success: Story = {
  args: { ...Default.args, status: "success" },
  render: Default.render,
};

export const WithoutTitle: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageDescription>
        タイトルなしのメッセージです。
      </InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "info",
    isCloseTrigger: true,
  },
};

// 閉じるボタンの機能を示すための例
export const WithCloseButton: Story = {
  args: {
    status: "info",
    isCloseTrigger: true,
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
