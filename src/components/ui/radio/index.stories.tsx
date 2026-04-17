import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { action } from "storybook/actions";
import { Radio, RadioItem, RadioItemProps } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Form/Radio",
  component: Radio,
  subcomponents: { RadioItem },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
    },
    onValueChange: action("onValueChange"),
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// WithControlsストーリー用の型定義
interface WithControlsProps extends RadioItemProps {
  defaultValue: string;
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
      <Radio {...args} defaultValue="sm">
        <RadioItem value="sm" id="sm" size="sm" label="Small" />
      </Radio>

      <Radio {...args} defaultValue="md">
        <RadioItem value="md" id="md" size="md" label="Medium" />
      </Radio>

      <Radio {...args} defaultValue="lg">
        <RadioItem value="lg" id="lg" size="lg" label="Large" />
      </Radio>
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
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
  render: args => (
    <Radio {...args} defaultValue="comfortable">
      <RadioItem value="default" id="r4" disabled label="Default" />
      <RadioItem value="comfortable" id="r5" disabled label="Comfortable" />
      <RadioItem value="compact" id="r6" disabled label="Compact" />
    </Radio>
  ),
};

/**
 * 選択モーション（ドット出現 + 押下フィードバック）の確認用。
 * en: For verifying selection motion (dot appearance + press feedback).
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "クリックを繰り返してモーションを確認する。**ドット出現**：scale(0)→scale(1) + opacity(0)→opacity(1)、150ms cubic-bezier(0.16,1,0.3,1)。**押下フィードバック**：scale(1)→scale(0.9)→scale(1)、押下 80ms ease-in / 戻り 120ms ease-out。\n\nen: Click repeatedly to verify motion. **Dot appearance**: scale(0)→scale(1) + opacity(0)→opacity(1), 150ms cubic-bezier(0.16,1,0.3,1). **Press feedback**: scale(1)→scale(0.9)→scale(1), press 80ms ease-in / return 120ms ease-out.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio defaultValue="">
        <RadioItem value="a" id="motion1" size="sm" label="Small — クリックして確認" />
        <RadioItem value="b" id="motion2" size="md" label="Medium — クリックして確認" />
        <RadioItem value="c" id="motion3" size="lg" label="Large — クリックして確認" />
      </Radio>
    </div>
  ),
};

export const DisabledAndInvalid: Story = {
  render: args => (
    <Radio {...args} defaultValue="comfortable">
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
