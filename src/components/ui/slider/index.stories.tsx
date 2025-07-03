import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "スライダーは、ユーザーが指定された範囲内の値を選択するために使用するコンポーネントです。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      description: "スライダーの初期値",
      control: { type: "object" },
      table: {
        type: { summary: "number[]" },
        defaultValue: { summary: "[0]" },
      },
    },
    max: {
      description: "スライダーの最大値",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    step: {
      description: "スライダーの増減単位",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    disabled: {
      description: "スライダーを無効にするかどうか",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    orientation: {
      description: "スライダーの向き",
      control: { type: "radio", options: ["horizontal", "vertical"] },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "horizontal" },
      },
    },
    className: {
      description: "コンポーネントのスタイルをカスタマイズするためのクラス名",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[240px]">
      <Slider {...props} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[240px]">
      <Slider {...props} />
    </div>
  ),
};
