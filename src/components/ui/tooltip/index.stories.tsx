import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Tooltip,
  TooltipContent,
  TooltipContentProps,
  TooltipTrigger,
} from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  subcomponents: { TooltipContent, TooltipTrigger },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: StoryObj<TooltipContentProps> = {
  args: {
    side: "top",
  },
  argTypes: {
    side: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
      table: {
        defaultValue: { summary: "top" },
      },
    },
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
