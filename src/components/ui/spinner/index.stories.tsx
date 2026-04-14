import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { Spinner } from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "range",
        min: 1,
        max: 12,
        step: 1,
      },
      defaultValue: 6,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 6,
  },
};

/**
 * 出現・消滅モーションの確認用。
 * en: For verifying appear and disappear motion.
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "左：常時ローディング状態の Spinner。右：3秒後にコンテンツへ遷移する Spinner。Reset ボタンでローディング状態に戻る。回転（animate-spin：1s linear）は変更なし。\n\n**出現**：opacity(0)→opacity(1) + scale(0.8)→scale(1)、200ms cubic-bezier(0.16,1,0.3,1)。\n**消滅**：opacity(1)→opacity(0) + scale(1)→scale(0.8)、150ms ease-in。\n\nen: Left: always-loading Spinner. Right: Spinner that transitions to content after 3s. Reset button restarts loading. Rotation unchanged. Appear: opacity(0)→(1) + scale(0.8)→(1), 200ms cubic-bezier(0.16,1,0.3,1). Disappear: opacity(1)→(0) + scale(1)→(0.8), 150ms ease-in.",
      },
    },
  },
  render: () => {
    const [loaded, setLoaded] = useState(false);
    const [key, setKey] = useState(0);

    const handleReset = () => {
      setLoaded(false);
      setKey(k => k + 1);
    };

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 3000);
      return () => clearTimeout(timer);
    }, [key]);

    return (
      <div className="flex gap-16 items-start">
        {/* 1. 常時ローディング */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-neutral-500 font-medium">常時ローディング</p>
          <div className="h-16 flex items-center justify-center">
            <Spinner size={8} />
          </div>
        </div>

        {/* 2. ローディング → コンテンツ表示 */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xs text-neutral-500 font-medium">ローディング → 表示</p>
            <button
              type="button"
              className="rounded bg-neutral-900 px-2 py-1 text-xs text-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div key={key} className="h-16 flex items-center justify-center">
            {!loaded ? (
              <Spinner size={8} />
            ) : (
              <p className="character-4-bold-pro text-text-high">Sparkle Design</p>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const Size: Story = {
  render: args => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size={1} />
      <Spinner {...args} size={2} />
      <Spinner {...args} size={3} />
      <Spinner {...args} size={4} />
      <Spinner {...args} size={5} />
      <Spinner {...args} size={6} />
      <Spinner {...args} size={7} />
      <Spinner {...args} size={8} />
      <Spinner {...args} size={9} />
      <Spinner {...args} size={10} />
      <Spinner {...args} size={11} />
      <Spinner {...args} size={12} />
    </div>
  ),
};
