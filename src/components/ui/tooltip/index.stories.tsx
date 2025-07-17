import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./index";
import type { TooltipContentVariants } from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<{ side: TooltipContentVariants["side"] }>;

export const Default: Story = {
  args: {
    side: "top",
  },
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "TooltipContentの表示位置",
      table: { category: "TooltipContent" },
    },
  },
  render: args => (
    <Tooltip>
      <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
      <TooltipContent side={args.side}>Tooltip Content</TooltipContent>
    </Tooltip>
  ),
};

export const Positioning: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Tooltip>
        <TooltipTrigger>Top</TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>Right</TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>Bottom</TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>Left</TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
};
