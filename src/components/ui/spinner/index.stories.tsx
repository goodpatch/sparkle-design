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
    size: {
      control: {
        type: "range",
        min: 1,
        max: 12,
        step: 1,
      },
      defaultValue: 6,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 6,
  },
};

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size={1} />
      <Spinner size={2} />
      <Spinner size={3} />
      <Spinner size={4} />
      <Spinner size={5} />
      <Spinner size={6} />
      <Spinner size={7} />
      <Spinner size={8} />
      <Spinner size={9} />
      <Spinner size={10} />
      <Spinner size={11} />
      <Spinner size={12} />
    </div>
  ),
};
