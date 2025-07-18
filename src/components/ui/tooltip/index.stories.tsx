import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./index";

const meta: Meta<typeof TooltipContent> = {
  title: "Components/Tooltip",
  component: TooltipContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {
  args: {
    side: "top",
  },
  render: args => (
    <Tooltip>
      <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
      <TooltipContent side={args.side} sideOffset={args.sideOffset}>
        Tooltip Content
      </TooltipContent>
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
