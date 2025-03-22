import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./index";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
      description: "Material Symbols Roundedのアイコン名",
    },
    className: {
      control: "text",
      description: "追加のTailwindクラス（サイズや塗りつぶしスタイルなど）",
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
      <Icon icon="favorite" className="icon-1-fill-0" />
      <Icon icon="favorite" className="icon-2-fill-0" />
      <Icon icon="favorite" className="icon-3-fill-0" />
      <Icon icon="favorite" className="icon-4-fill-0" />
      <Icon icon="favorite" className="icon-5-fill-0" />
      <Icon icon="favorite" className="icon-6-fill-0" />
      <Icon icon="favorite" className="icon-7-fill-0" />
      <Icon icon="favorite" className="icon-8-fill-0" />
      <Icon icon="favorite" className="icon-9-fill-0" />
      <Icon icon="favorite" className="icon-10-fill-0" />
      <Icon icon="favorite" className="icon-11-fill-0" />
      <Icon icon="favorite" className="icon-12-fill-0" />
    </div>
  ),
};

// Fill
export const Fill: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="favorite" className="icon-6-fill-1" />
      <Icon icon="favorite" className="icon-6-fill-0" />
    </div>
  ),
};

// アイコン例の一覧
export const IconExamples: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center">
        <Icon icon="home" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">home</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="settings" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">settings</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="search" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">search</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="notifications" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">notifications</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="person" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">person</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="favorite" className="icon-6-fill-1" />
        <span className="mt-2 text-sm">favorite</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="favorite" className="icon-6-fill-1" />
        <span className="mt-2 text-sm">star</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="delete" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">delete</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="visibility" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">visibility</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="visibility_off" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">visibility_off</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="edit" className="icon-6-fill-0" />
        <span className="mt-2 text-sm">edit</span>
      </div>
      <div className="flex flex-col items-center">
        <Icon icon="check_circle" className="icon-6-fill-1" />
        <span className="mt-2 text-sm">check_circle</span>
      </div>
    </div>
  ),
};
