import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioItem } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// WithControlsストーリー用の型定義
interface WithControlsProps {
  defaultValue: string;
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  disabled?: boolean;
  label?: string;
}

export const Default: Story = {
  args: {
    defaultValue: "comfortable",
  },
  render: args => (
    <Radio {...args}>
      <RadioItem value="default" id="r1" label="Default" />
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
      description: "ラジオボタンのサイズを指定します",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isInvalid: {
      control: "boolean",
      description: "エラー状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "無効状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "ラベルテキストを指定します",
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
  render: () => (
    <div className="space-y-8">
      <Radio defaultValue="sm">
        <RadioItem value="sm" id="sm" size="sm" label="Small" />
      </Radio>

      <Radio defaultValue="md">
        <RadioItem value="md" id="md" size="md" label="Medium" />
      </Radio>

      <Radio defaultValue="lg">
        <RadioItem value="lg" id="lg" size="lg" label="Large" />
      </Radio>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Radio defaultValue="comfortable">
      <RadioItem value="default" id="invalid1" isInvalid label="Default" />
      <RadioItem
        value="comfortable"
        id="invalid2"
        isInvalid
        label="Comfortable"
      />
      <RadioItem value="compact" id="invalid3" isInvalid label="Compact" />
    </Radio>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Radio defaultValue="comfortable">
      <RadioItem value="default" id="r4" disabled label="Default" />
      <RadioItem value="comfortable" id="r5" disabled label="Comfortable" />
      <RadioItem value="compact" id="r6" disabled label="Compact" />
    </Radio>
  ),
};

export const DisabledAndInvalid: Story = {
  render: () => (
    <Radio defaultValue="comfortable">
      <RadioItem value="default" id="r7" disabled isInvalid label="Default" />
      <RadioItem
        value="comfortable"
        id="r8"
        disabled
        isInvalid
        label="Comfortable"
      />
      <RadioItem value="compact" id="r9" disabled isInvalid label="Compact" />
    </Radio>
  ),
};
