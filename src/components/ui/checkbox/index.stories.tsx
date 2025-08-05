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
      control: "boolean",
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
  render: () => (
    <div className="space-y-8">
      <Checkbox id="small" size="sm" label="Small" />
      <Checkbox id="medium" size="md" label="Medium" />
      <Checkbox id="large" size="lg" label="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox id="invalid1" isInvalid label="エラー状態" />
      <Checkbox
        id="invalid2"
        isInvalid
        checked
        label="エラー状態（チェック済み）"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox id="disabled1" disabled label="無効状態" />
      <Checkbox
        id="disabled2"
        disabled
        checked
        label="無効状態（チェック済み）"
      />
    </div>
  ),
};

export const DisabledAndInvalid: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        id="disabledInvalid1"
        disabled
        isInvalid
        label="無効状態とエラー状態"
      />
      <Checkbox
        id="disabledInvalid2"
        disabled
        isInvalid
        checked
        label="無効状態とエラー状態（チェック済み）"
      />
    </div>
  ),
};

export const Interminate: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox id="intermediate1" isInterminate label="中間状態" />
      <Checkbox
        id="intermediate2"
        isInterminate
        isInvalid
        label="中間状態（エラー）"
      />
      <Checkbox
        id="intermediate3"
        isInterminate
        disabled
        label="中間状態（無効）"
      />
      <Checkbox
        id="intermediate4"
        isInterminate
        isInvalid
        disabled
        label="中間状態（エラーで無効）"
      />
    </div>
  ),
};
