import type { Meta, StoryObj } from "@storybook/react";
import { Toast, showToast, ShowToastOptions } from "./index";
import { Button } from "../button";

const meta: Meta<ShowToastOptions> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["neutral", "success", "negative"],
    },
    title: { control: "text" },
    description: { control: "text" },
    isCloseButtonVisible: { control: "boolean" },
  },
} satisfies Meta<ShowToastOptions>;

export default meta;
type Story = StoryObj<ShowToastOptions>;

export const Default: Story = {
  args: {
    status: "neutral",
    title: "トーストのタイトル",
    description: "トーストの説明です。",
    isCloseButtonVisible: true,
  },
  render: (args) => (
    <>
      <Toast />
      <Button onClick={() => showToast(args)}>トーストを表示</Button>
    </>
  ),
};
