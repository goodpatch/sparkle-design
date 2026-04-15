import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
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
  render: args => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size={1} />
      <Spinner {...args} size={2} />
      <Spinner {...args} size={3} />
      <Spinner {...args} size={4} />
      <Spinner {...args} size={5} />
      <Spinner {...args} size={6} />
      <Spinner {...args} size={7} />
      <Spinner {...args} size={8} />
      <Spinner {...args} size={9} />
      <Spinner {...args} size={10} />
      <Spinner {...args} size={11} />
      <Spinner {...args} size={12} />
    </div>
  ),
};
