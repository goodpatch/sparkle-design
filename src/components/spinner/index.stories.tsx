import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description:
        "Tailwind CSSクラスを指定してカスタマイズできます。フォントサイズやタイポグラフィ設定も反映されます。",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="icon-1-fill-0" />
      <Spinner className="icon-2-fill-0" />
      <Spinner className="icon-3-fill-0" />
      <Spinner className="icon-4-fill-0" />
      <Spinner className="icon-5-fill-0" />
      <Spinner className="icon-6-fill-0" />
      <Spinner className="icon-7-fill-0" />
      <Spinner className="icon-8-fill-0" />
      <Spinner className="icon-9-fill-0" />
      <Spinner className="icon-10-fill-0" />
      <Spinner className="icon-11-fill-0" />
      <Spinner className="icon-12-fill-0" />
    </div>
  ),
};
