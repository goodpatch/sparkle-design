import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

const meta = {
  title: "Components/InlineMessage",
  component: InlineMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "warning", "negative", "success"],
    },
    isCloseButtonVisible: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InlineMessage>;

export default meta;
type Story = StoryObj<typeof InlineMessage>;

// 新しい形式でストーリーを定義

export const Info: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>お知らせタイトル</InlineMessageTitle>
      <InlineMessageDescription>何かが起きました。</InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "info",
    isCloseButtonVisible: true,
  },
};

export const Warning: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>注意タイトル</InlineMessageTitle>
      <InlineMessageDescription>
        注意が必要な状況です。
      </InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "warning",
    isCloseButtonVisible: true,
  },
};

export const Negative: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>エラータイトル</InlineMessageTitle>
      <InlineMessageDescription>問題が発生しました。</InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "negative",
    isCloseButtonVisible: true,
  },
};

export const Success: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>成功タイトル</InlineMessageTitle>
      <InlineMessageDescription>
        正常に処理されました。
      </InlineMessageDescription>
    </InlineMessage>
  ),
  args: {
    status: "success",
    isCloseButtonVisible: true,
  },
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
    isCloseButtonVisible: true,
  },
};

export const WithoutDescription: Story = {
  render: args => (
    <InlineMessage {...args}>
      <InlineMessageTitle>説明なしのタイトル</InlineMessageTitle>
    </InlineMessage>
  ),
  args: {
    status: "info",
    isCloseButtonVisible: true,
  },
};

// 閉じるボタンの機能を示すための例
export const WithCloseButton = () => {
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
      <InlineMessage status="info" onClose={() => setIsVisible(false)}>
        <InlineMessageTitle>閉じるボタンの機能</InlineMessageTitle>
        <InlineMessageDescription>
          このメッセージは閉じるボタンをクリックすると消えます。
        </InlineMessageDescription>
      </InlineMessage>
    </div>
  );
};
