import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
