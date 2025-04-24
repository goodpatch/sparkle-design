import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "チェックボックスは複数のオプショングループから複数の項目を選択する形式でユーザーからの入力を取得するために使用するコンポーネントです。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "チェック状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// WithControlsストーリー用の型定義
interface WithControlsProps {
  checked?: boolean;
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  disabled?: boolean;
  label?: string;
}

export const Default: Story = {
  render: () => <Checkbox id="default" label="チェックボックス" />,
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
