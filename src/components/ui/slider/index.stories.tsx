import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "object" },
      table: {
        type: { summary: "number[]" },
        defaultValue: { summary: "[0]" },
      },
    },
    max: {
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    step: {
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    orientation: {
      control: { type: "radio", options: ["horizontal", "vertical"] },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "horizontal" },
      },
    },
    className: {
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
