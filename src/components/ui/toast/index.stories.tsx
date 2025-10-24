import type { Meta, StoryObj } from "@storybook/react";
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
              title: `保存しました (${count + 1})`,
              description: "最新の変更が反映されました",
              variant: "neutral",
              duration: 4000,
              position: "bottom-center",
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

export const Success: Story = {
  render: args => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <Button
          onClick={() => {
            setCount(previous => previous + 1);
            toast({
              ...args,
              title: `保存しました (${count + 1})`,
              description: "最新の変更が反映されました",
              variant: "success",
              duration: 4000,
              position: "bottom-center",
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

export const Negative: Story = {
  render: args => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <Button
          onClick={() => {
            setCount(previous => previous + 1);
            toast({
              ...args,
              title: `保存しました (${count + 1})`,
              description: "最新の変更が反映されました",
              variant: "negative",
              duration: 4000,
              position: "bottom-center",
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
