import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Button } from "../button";
import { toast, Toast, Toaster } from "./index";

const meta: Meta<typeof Toast> = {
  title: "Overlay/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: args => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <Button
          onClick={() => {
            setCount(previous => previous + 1);
            toast({
              ...args,
              title: `カウントアップしました (${count + 1})`,
              description: "最新の変更が反映されました",
              duration: 4000,
            });
          }}
        >
          トーストを表示
        </Button>
        <Toaster />
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  render: args => {
    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <Button
          onClick={() => {
            toast({
              ...args,
              description: "タイトルなしのトーストです",
              duration: 4000,
            });
          }}
        >
          トーストを表示
        </Button>
        <Toaster />
      </div>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: args => {
    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <Button
          onClick={() => {
            toast({
              ...args,
              title: "閉じるボタンなしのトーストです",
              description: "自動で閉じるまで表示されます",
              isCloseTrigger: false,
              duration: 4000,
            });
          }}
        >
          トーストを表示
        </Button>
        <Toaster />
      </div>
    );
  },
};
