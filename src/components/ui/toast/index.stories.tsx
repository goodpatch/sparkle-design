import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../button";
import { toastFn, ToastToaster } from "./index";

const meta: Meta<typeof ToastToaster> = {
  title: "Feedback/Toast",
  component: ToastToaster,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ToastToaster>;

export const Playground: Story = {
  render: args => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex h-[320px] items-center justify-center bg-surface-muted">
        <ToastToaster {...args} />
        <Button
          onClick={() => {
            setCount(previous => previous + 1);
            toastFn(`保存しました (${count + 1})`, {
              description: "最新の変更が反映されました",
            });
          }}
        >
          トーストを表示
        </Button>
      </div>
    );
  },
};
