import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Overlay } from "./index";

const meta: Meta<typeof Overlay> = {
  title: "Overlay/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: args => {
    return (
      <div className="relative flex h-[320px] w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
        <div className="relative z-10 max-w-[320px] rounded-lg border border-neutral-200 bg-white p-6 shadow-lg">
          <p className="character-3-medium text-neutral-800">
            背景コンテンツの上にOverlayが配置されています。
          </p>
        </div>
        <Overlay {...args} />
      </div>
    );
  },
};
