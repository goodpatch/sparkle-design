import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./index";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    emphasis: {
      control: "select",
      options: ["low", "middle", "high"],
    },
    lineStyle: {
      control: "select",
      options: ["solid", "dashed"],
    },
    direction: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    emphasis: "middle",
    lineStyle: "solid",
    direction: "horizontal",
  },
  render: args => (
    <div className="flex items-center justify-center w-40 h-40 ">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    emphasis: "middle",
    lineStyle: "solid",
    direction: "vertical",
  },
  render: args => (
    <div className="flex items-center justify-center w-40 h-40">
      <Divider {...args} />
    </div>
  ),
};

export const Emphasis = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="text-sm font-bold mb-2">Low</p>
        <Divider emphasis="low" />
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Middle (Default)</p>
        <Divider emphasis="middle" />
      </div>
      <div>
        <p className="text-sm font-bold mb-2">High</p>
        <Divider emphasis="high" />
      </div>
    </div>
  );
};

export const LineStyle = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="text-sm font-bold mb-2">Solid (Default)</p>
        <Divider lineStyle="solid" />
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Dashed</p>
        <Divider lineStyle="dashed" />
      </div>
    </div>
  );
};

export const Direction = () => {
  return (
    <div className="flex flex-row gap-8 items-center">
      <div>
        <p className="text-sm font-bold mb-2">Horizontal (Default)</p>
        <div className="w-40">
          <Divider direction="horizontal" />
        </div>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Vertical</p>
        <div className="h-32">
          <Divider direction="vertical" />
        </div>
      </div>
    </div>
  );
};
