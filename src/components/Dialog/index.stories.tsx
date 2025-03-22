import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogAction,
  DialogCancel,
} from "./index";
import { Button } from "../button";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

/**
 * 基本的なダイアログの例
 */
export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認</DialogTitle>
          <DialogDescription>
            この操作を実行してもよろしいですか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>キャンセル</DialogCancel>
          <DialogAction>続行</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
