import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "./index";
import { Button } from "../button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

export const Basic: StoryObj<typeof Toast> = {
  render: () => (
    <ToastProvider>
      <ToastViewport />
      <Toast open>
        <div className="flex flex-col gap-1 flex-1">
          <ToastTitle>完了しました</ToastTitle>
          <ToastDescription>処理が正常に終了しました</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
    </ToastProvider>
  ),
};
