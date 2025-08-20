import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioItem, RadioItemProps } from "./index";

const meta: Meta<typeof RadioItem> = {
  title: "Components/Radio",
  component: RadioItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description:
        "Radioに設定するデフォルトの値 en: The default value to set for the radio group",
    },
  },
};

export default meta;
type Story = StoryObj<RadioItemProps & { defaultValue: string }>;

// WithControlsストーリー用の型定義
interface WithControlsProps extends RadioItemProps {
  defaultValue: string;
}

export const Default: Story = {
  args: {
    defaultValue: "comfortable",
  },
  render: args => (
    <Radio defaultValue={args.defaultValue}>
      <RadioItem {...args} value="default" id="r1" label="Default" />
      <RadioItem value="comfortable" id="r2" label="Comfortable" />
      <RadioItem value="compact" id="r3" label="Compact" />
    </Radio>
  ),
};

export const WithControls: StoryObj<WithControlsProps> = {
  args: {
    defaultValue: "default",
    size: "md",
    isInvalid: false,
    disabled: false,
    label: "ラジオボタン",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isInvalid: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
    },
  },
  render: args => (
    <Radio defaultValue={args.defaultValue}>
      <RadioItem
        value="default"
        id="control1"
        size={args.size}
        isInvalid={args.isInvalid}
        disabled={args.disabled}
        label={args.label}
      />
    </Radio>
  ),
};

export const Sizes: Story = {
  render: args => (
    <div className="space-y-8">
      <Radio defaultValue="sm">
        <RadioItem {...args} value="sm" id="sm" size="sm" label="Small" />
      </Radio>

      <Radio defaultValue="md">
        <RadioItem {...args} value="md" id="md" size="md" label="Medium" />
      </Radio>

      <Radio defaultValue="lg">
        <RadioItem {...args} value="lg" id="lg" size="lg" label="Large" />
      </Radio>
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <Radio defaultValue="comfortable">
      <RadioItem
        {...args}
        value="default"
        id="invalid1"
        isInvalid
        label="Default"
      />
      <RadioItem
        {...args}
        value="comfortable"
        id="invalid2"
        isInvalid
        label="Comfortable"
      />
      <RadioItem
        {...args}
        value="compact"
        id="invalid3"
        isInvalid
        label="Compact"
      />
    </Radio>
  ),
};

export const Disabled: Story = {
  render: args => (
    <Radio defaultValue="comfortable">
      <RadioItem {...args} value="default" id="r4" disabled label="Default" />
      <RadioItem
        {...args}
        value="comfortable"
        id="r5"
        disabled
        label="Comfortable"
      />
      <RadioItem {...args} value="compact" id="r6" disabled label="Compact" />
    </Radio>
  ),
};

export const DisabledAndInvalid: Story = {
  render: args => (
    <Radio defaultValue="comfortable">
      <RadioItem
        {...args}
        value="default"
        id="r7"
        disabled
        isInvalid
        label="Default"
      />
      <RadioItem
        {...args}
        value="comfortable"
        id="r8"
        disabled
        isInvalid
        label="Comfortable"
      />
      <RadioItem
        {...args}
        value="compact"
        id="r9"
        disabled
        isInvalid
        label="Compact"
      />
    </Radio>
  ),
};
