import type { Meta, StoryObj } from "@storybook/react";
import { Toast, showToast } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Toast> = {
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
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

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
