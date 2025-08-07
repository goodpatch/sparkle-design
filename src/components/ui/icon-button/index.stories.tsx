import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./index";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
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
      options: ["xs", "sm", "md", "lg"],
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
    icon: {
      control: "text",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: "edit",
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    icon: "edit",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: "edit",
    isDisabled: true,
  },
};

export const Variant: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2">
        <IconButton {...args} variant="solid" icon="edit">
          solid
        </IconButton>
        <IconButton {...args} variant="outline" icon="edit">
          outline
        </IconButton>
        <IconButton {...args} variant="ghost" icon="edit">
          ghost
        </IconButton>
      </div>
    );
  },
};

export const Size: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2">
        <IconButton {...args} size="xs" icon="edit">
          extra small
        </IconButton>
        <IconButton {...args} size="sm" icon="edit">
          small
        </IconButton>
        <IconButton {...args} size="md" icon="edit">
          medium
        </IconButton>
        <IconButton {...args} size="lg" icon="edit">
          large
        </IconButton>
      </div>
    );
  },
};

export const Theme: Story = {
  render: args => {
    return (
      <div className="flex flex-row gap-2">
        <IconButton {...args} theme="primary" icon="edit">
          primary
        </IconButton>
        <IconButton {...args} theme="neutral" icon="edit">
          neutral
        </IconButton>
        <IconButton {...args} theme="negative" icon="edit">
          negative
        </IconButton>
      </div>
    );
  },
};
