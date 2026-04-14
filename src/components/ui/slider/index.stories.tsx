import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Form/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "object" },
      table: {
        type: { summary: "number[]" },
        defaultValue: { summary: "[0]" },
      },
    },
    max: {
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    step: {
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[240px]">
      <Slider {...props} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[240px]">
      <Slider {...props} />
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    max: 100,
    step: 1,
  },
  render: ({ className, ...props }) => {
    const [value, setValue] = useState([50]);

    return (
      <div className="flex flex-col items-center justify-center w-[240px] gap-4">
        <Slider {...props} value={value} onValueChange={setValue} />
        <p className="text-sm text-gray-600">現在の値: {value[0]}</p>
      </div>
    );
  },
};

/**
 * Thumb のスケールモーション確認用。
 * en: For verifying thumb scale motion on hover and drag.
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "thumb を hover・ドラッグして動きを確認する。数値はアニメーションなし（ドラッグ中のノイズを防ぐため静止）。\n\n**hover**：scale(1)→scale(1.2)、150ms ease-out。\n**drag 中**：scale(1.2)→scale(1.3)、80ms ease-out。\n**release**：scale(1.3)→scale(1)、200ms cubic-bezier(0.16,1,0.3,1)（spring 系で弾んで戻る）。\n\nen: Hover or drag the thumb to verify motion. Value indicator has no animation (stays still to avoid distraction during drag). Hover: scale(1)→scale(1.2), 150ms ease-out. Drag: scale(1.2)→scale(1.3), 80ms ease-out. Release: scale(1.3)→scale(1), 200ms cubic-bezier(0.16,1,0.3,1).",
      },
    },
  },
  args: {
    defaultValue: [40],
    max: 100,
    step: 1,
    unit: "%",
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[320px]">
      <Slider {...props} />
    </div>
  ),
};

export const WithUnit: Story = {
  args: {
    defaultValue: [25],
    max: 100,
    step: 1,
    unit: "%",
  },
  render: ({ className, ...props }) => (
    <div className="flex flex-col items-center justify-center w-[240px]">
      <Slider {...props} />
    </div>
  ),
};
