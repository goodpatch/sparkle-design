import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isNumberVisible: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["normal", "emphasis"],
    },
    isGapped: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "13",
  },
};

export const Size: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2 items-start">
        <Badge {...args} size="xs">
          13
        </Badge>
        <Badge {...args} size="sm">
          13
        </Badge>
        <Badge {...args} size="md">
          13
        </Badge>
        <Badge {...args} size="lg">
          13
        </Badge>
      </div>
    );
  },
};

export const Variant: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2  items-start">
        <Badge {...args} variant="normal">
          13
        </Badge>
        <Badge {...args} variant="emphasis">
          13
        </Badge>
      </div>
    );
  },
};

export const NumberVisible: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2 items-start">
        <Badge {...args} isNumberVisible={false}>
          13
        </Badge>
        <Badge {...args} isNumberVisible={true}>
          13
        </Badge>
      </div>
    );
  },
};

export const Gapped: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2 items-start">
        <Badge {...args} isGapped={true}>
          13
        </Badge>
        <Badge {...args} isGapped={false}>
          13
        </Badge>
      </div>
    );
  },
};
