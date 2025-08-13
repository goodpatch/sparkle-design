import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Placeholder text",
  },
  argTypes: {
    size: {
      control: {
        type: "radio",
      },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isInvalid: {
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isIconButtonEnable: {
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    iconButtonIcon: {
      control: {
        type: "text",
      },
      table: {
        defaultValue: { summary: "search" },
      },
    },
    iconButtonAriaLabel: {
      control: {
        type: "text",
      },
    },
    onIconButtonClick: {
      action: "buttonClicked",
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    defaultValue: {
      control: {
        type: "text",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

export const Size: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <Input
        {...args}
        size="sm"
        placeholder="Small input (sm)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
      <Input
        {...args}
        size="md"
        placeholder="Medium input (md)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
      <Input
        {...args}
        size="lg"
        placeholder="Large input (lg)"
        isIconButtonEnable
        iconButtonIcon="cancel"
        iconButtonAriaLabel="入力内容を消去する"
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <Input {...args} placeholder="Invalid input" isInvalid />
    </div>
  ),
};

export const Disabled: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <Input {...args} placeholder="Disabled input" isDisabled />
    </div>
  ),
};

export const WithIconButton: Story = {
  args: {
    isIconButtonEnable: true,
    iconButtonIcon: "cancel",
    iconButtonAriaLabel: "入力内容を消去する",
  },
};
