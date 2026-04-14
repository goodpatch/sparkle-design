import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Skeleton } from "./index";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // 引数の設定
    className: {
      description: "コンポーネントのスタイルをカスタマイズするためのクラス名",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * 基本的なスケルトン表示
 */
export const Default: Story = {
  args: {
    className: "h-4 w-[250px]",
  },
  render: args => <Skeleton {...args} />,
};

/**
 * プロフィールカードのスケルトン
 */
export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

/**
 * Skeleton モーションの確認用。常時ローディングと、コンテンツ表示への遷移を並べて確認する。
 * en: For verifying Skeleton motion. Shows always-loading state and transition to content side by side.
 */
export const MotionPreview: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "左：常時ローディング状態の Skeleton（animate-pulse ループ）。右：一定時間後にコンテンツへ遷移する Skeleton。Reset ボタンでローディング状態に戻る。**fade-out**：opacity(1)→opacity(0)、150ms ease-out。\n\nen: Left: always-loading Skeleton (animate-pulse loop). Right: Skeleton that transitions to content after a delay. Reset button restarts loading. Fade-out: opacity(1)→opacity(0), 150ms ease-out.",
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

    return (
      <div className="flex gap-10 items-start">
        {/* 1. 常時ローディング */}
        <div className="flex flex-col gap-3 w-[240px]">
          <p className="text-xs text-neutral-500 font-medium">常時ローディング</p>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[120px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* 2. ローディング → コンテンツ表示 */}
        <div className="flex flex-col gap-3 w-[240px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 font-medium">ローディング → 表示</p>
            <button
              type="button"
              className="rounded bg-neutral-900 px-2 py-1 text-xs text-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div key={key} className="flex flex-col space-y-3">
            {!loaded ? (
              <>
                <Skeleton
                  className="h-[120px] w-full rounded-xl"
                  onAnimationIteration={() => setLoaded(true)}
                />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </>
            ) : (
              <>
                <img
                  src="https://picsum.photos/seed/sparkle/240/120"
                  alt="サンプル画像"
                  className="h-[120px] w-full rounded-xl object-cover"
                />
                <div className="space-y-1">
                  <p className="character-3-bold-pro text-text-high">Sparkle Design System</p>
                  <p className="character-2-regular-pro text-text-medium">コンポーネントライブラリのサンプルテキストです。</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * イメージカードのスケルトン
 */
export const ImageCard: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
