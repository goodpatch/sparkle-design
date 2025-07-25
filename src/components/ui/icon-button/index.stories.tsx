import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./index";

const meta = {
  title: "Form/Icon Button",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline-solid", "ghost"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "negative"],
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

export const Variant = () => {
  return (
    <div className="flex flex-row gap-2">
      <IconButton variant="solid" icon="edit">
        solid
      </IconButton>
      <IconButton variant="outline" icon="edit">
        outline
      </IconButton>
      <IconButton variant="ghost" icon="edit">
        ghost
      </IconButton>
    </div>
  );
};

export const Size = () => {
  return (
    <div className="flex flex-row gap-2">
      <IconButton size="xs" icon="edit">
        extra small
      </IconButton>
      <IconButton size="sm" icon="edit">
        small
      </IconButton>
      <IconButton size="md" icon="edit">
        medium
      </IconButton>
      <IconButton size="lg" icon="edit">
        large
      </IconButton>
    </div>
  );
};

export const Theme = () => {
  return (
    <div className="flex flex-row gap-2">
      <IconButton theme="primary" icon="edit">
        primary
      </IconButton>
      <IconButton theme="secondary" icon="edit">
        secondary
      </IconButton>
      <IconButton theme="negative" icon="edit">
        negative
      </IconButton>
    </div>
  );
};
