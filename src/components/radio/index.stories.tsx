import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioItem } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["default", "comfortable", "compact"],
      description: "初期値を指定します",
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      control: "boolean",
      description: "無効状態を指定します",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    defaultValue: "comfortable",
  },
  render: (args) => (
    <Radio {...args}>
      <div className="flex items-center space-x-2">
        <RadioItem value="default" id="r1" />
        <label
          htmlFor="r1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Default
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioItem value="comfortable" id="r2" />
        <label
          htmlFor="r2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Comfortable
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioItem value="compact" id="r3" />
        <label
          htmlFor="r3"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Compact
        </label>
      </div>
    </Radio>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: "comfortable",
    disabled: true,
  },
  render: (args) => (
    <Radio {...args}>
      <div className="flex items-center space-x-2">
        <RadioItem value="default" id="r4" disabled={args.disabled} />
        <label
          htmlFor="r4"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Default
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioItem value="comfortable" id="r5" disabled={args.disabled} />
        <label
          htmlFor="r5"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Comfortable
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioItem value="compact" id="r6" disabled={args.disabled} />
        <label
          htmlFor="r6"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Compact
        </label>
      </div>
    </Radio>
  ),
};
