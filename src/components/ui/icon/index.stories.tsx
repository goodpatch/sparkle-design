import * as React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./index";

const meta: Meta<typeof Icon> = {
  title: "Media/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
    },
    size: {
      control: "number",
    },
    fill: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
  args: {
    icon: "favorite",
  },
};

// Size
export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="favorite" size={1} />
      <Icon icon="favorite" size={2} />
      <Icon icon="favorite" size={3} />
      <Icon icon="favorite" size={4} />
      <Icon icon="favorite" size={5} />
      <Icon icon="favorite" size={6} />
      <Icon icon="favorite" size={7} />
      <Icon icon="favorite" size={8} />
      <Icon icon="favorite" size={9} />
      <Icon icon="favorite" size={10} />
      <Icon icon="favorite" size={11} />
      <Icon icon="favorite" size={12} />
    </div>
  ),
};

// Fill
export const Fill: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="favorite" size={6} fill={false} />
      <Icon icon="favorite" size={6} fill={true} />
    </div>
  ),
};

// アイコン例の一覧
export const IconExamples: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center">
        <Icon icon="home" size={6} fill={false} />
        <span className="mt-2 text-sm">home</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="settings" size={6} fill={false} />
        <span className="mt-2 text-sm">settings</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="search" size={6} fill={false} />
        <span className="mt-2 text-sm">search</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="notifications" size={6} fill={false} />
        <span className="mt-2 text-sm">notifications</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="person" size={6} fill={false} />
        <span className="mt-2 text-sm">person</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="favorite" size={6} fill={false} />
        <span className="mt-2 text-sm">favorite</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="star" size={6} fill={false} />
        <span className="mt-2 text-sm">star</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="delete" size={6} fill={false} />
        <span className="mt-2 text-sm">delete</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="visibility" size={6} fill={false} />
        <span className="mt-2 text-sm">visibility</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="visibility_off" size={6} fill={false} />
        <span className="mt-2 text-sm">visibility_off</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="edit" size={6} fill={false} />
        <span className="mt-2 text-sm">edit</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="check_circle" size={6} fill={false} />
        <span className="mt-2 text-sm">check_circle</span>
      </div>
    </div>
  ),
};
