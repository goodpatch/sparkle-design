import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    id: {
      control: "text",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    isInvalid: {
      control: "boolean",
    },
    checked: {
      control: "radio",
      options: ["true", "false", "indeterminate"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: "default",
    label: "Checkbox",
  },
};

export const Sizes: Story = {
  render: args => (
    <div className="space-y-8">
      <Checkbox {...args} id="small" size="sm" label="Small" />
      <Checkbox {...args} id="medium" size="md" label="Medium" />
      <Checkbox {...args} id="large" size="lg" label="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <div className="space-y-4">
      <Checkbox {...args} id="invalid1" isInvalid label="エラー状態" />
      <Checkbox
        {...args}
        id="invalid2"
        isInvalid
        checked
        label="エラー状態（チェック済み）"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: args => (
    <div className="space-y-4">
      <Checkbox {...args} id="disabled1" disabled label="無効状態" />
      <Checkbox
        {...args}
        id="disabled2"
        disabled
        checked
        label="無効状態（チェック済み）"
      />
    </div>
  ),
};

export const DisabledAndInvalid: Story = {
  render: args => (
    <div className="space-y-4">
      <Checkbox
        {...args}
        id="disabledInvalid1"
        disabled
        isInvalid
        label="無効状態とエラー状態"
      />
      <Checkbox
        {...args}
        id="disabledInvalid2"
        disabled
        isInvalid
        checked
        label="無効状態とエラー状態（チェック済み）"
      />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: args => (
    <div className="space-y-4">
      <Checkbox {...args} id="indeterminate1" indeterminate label="中間状態" />
      <Checkbox
        {...args}
        id="indeterminate2"
        indeterminate
        isInvalid
        label="中間状態（エラー）"
      />
      <Checkbox
        {...args}
        id="indeterminate3"
        indeterminate
        disabled
        label="中間状態（無効）"
      />
      <Checkbox
        {...args}
        id="indeterminate4"
        indeterminate
        isInvalid
        disabled
        label="中間状態（エラーで無効）"
      />
    </div>
  ),
};
