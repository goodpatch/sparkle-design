import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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

/**
 * 開閉モーション（fade-in/out + duration/easing）の確認用。
 * en: For verifying open/close motion (fade-in/out + duration/easing).
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "ボタンで `data-state` を open/closed に切り替えて、オーバーレイのフェードを確認する。Open 150ms ease-out / Close 200ms ease-in。Modal の ModalOverlay と同じキーフレーム・duration を使用。\n\nen: Toggle `data-state` between open/closed to verify overlay fade. Open 150ms ease-out / Close 200ms ease-in — uses the same keyframes and duration as ModalOverlay in Modal.",
      },
    },
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="relative min-h-[320px] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 p-6">
        <div className="relative z-10 flex flex-col gap-3">
          <p className="character-3-medium text-neutral-800">
            `data-state` を切り替えてモーションを確認します。
          </p>
          <button
            type="button"
            className="w-fit rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
            onClick={() => setIsOpen(v => !v)}
          >
            Toggle state（{isOpen ? "open" : "closed"}）
          </button>
        </div>
        <Overlay
          {...args}
          data-state={isOpen ? "open" : "closed"}
          aria-hidden="true"
        />
      </div>
    );
  },
};
