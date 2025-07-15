import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    theme: {
      control: "select",
      options: ["primary", "neutral", "negative"],
    },
    isLoading: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    prefixIcon: {
      control: "text",
    },
    suffixIcon: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "solid",
    isDisabled: true,
  },
};

export const WithPrefixIcon: Story = {
  args: {
    children: "with Prefix Icon",
    prefixIcon: "add",
  },
};

export const WithSuffixIcon: Story = {
  args: {
    children: "with Suffix Icon",
    suffixIcon: "open_in_new",
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "with Both Icons",
    prefixIcon: "favorite",
    suffixIcon: "expand_more",
  },
};

export const Variant: Story = {
  render: args => (
    <div className="flex flex-row gap-2">
      <Button {...args} variant="solid">
        solid
      </Button>
      <Button {...args} variant="outline">
        outline
      </Button>
      <Button {...args} variant="ghost">
        ghost
      </Button>
    </div>
  ),
};

export const Size: Story = {
  render: args => (
    <div className="flex flex-row gap-2">
      <Button {...args} size="sm">
        small
      </Button>
      <Button {...args} size="md">
        medium
      </Button>
      <Button {...args} size="lg">
        large
      </Button>
    </div>
  ),
};

export const Theme: Story = {
  render: args => (
    <div className="flex flex-row gap-2">
      <Button {...args} theme="primary">
        primary
      </Button>
      <Button {...args} theme="neutral">
        neutral
      </Button>
      <Button {...args} theme="negative">
        negative
      </Button>
    </div>
  ),
};
