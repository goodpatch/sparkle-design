import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";
import type { TabsListVariants } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Disclosure/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

type TabsListVariantStory = StoryObj<{
  variant: TabsListVariants["variant"];
  scrollable: TabsListVariants["scrollable"];
}>;

export const Default: TabsListVariantStory = {
  args: {
    variant: "solid",
    scrollable: false,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["solid", "line", "ghost"],
      description: "タブのバリアント (solid/line/ghost)",
      table: { category: "TabsList" },
    },
    scrollable: {
      control: "boolean",
      description: "モバイルなど幅が足りない場合に横スクロールを許可する",
      table: { category: "TabsList" },
    },
  },
  render: args => (
    <Tabs defaultValue="tab1">
      <TabsList variant={args.variant} scrollable={args.scrollable}>
        <TabsTrigger value="tab1">tab 1</TabsTrigger>
        <TabsTrigger value="tab2">tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          tab 3(disabled)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">tab 1の内容</TabsContent>
      <TabsContent value="tab2">tab 2の内容</TabsContent>
      <TabsContent value="tab3">tab 3の内容</TabsContent>
    </Tabs>
  ),
};

export const Scrollable: TabsListVariantStory = {
  args: {
    variant: "line",
    scrollable: true,
  },
  render: args => (
    <div className="w-72 border border-dashed border-neutral-300 p-2">
      <Tabs defaultValue="sync">
        <TabsList variant={args.variant} scrollable={args.scrollable}>
          <TabsTrigger value="sync">カレンダー同期</TabsTrigger>
          <TabsTrigger value="colors">カラーマッピング</TabsTrigger>
          <TabsTrigger value="keywords">キーワードルール</TabsTrigger>
          <TabsTrigger value="distribution">配分テンプレート</TabsTrigger>
        </TabsList>
        <TabsContent value="sync">sync</TabsContent>
        <TabsContent value="colors">colors</TabsContent>
        <TabsContent value="keywords">keywords</TabsContent>
        <TabsContent value="distribution">distribution</TabsContent>
      </Tabs>
    </div>
  ),
};

/**
 * コンテンツ切り替え fade-in と line インジケータースライドの確認用。
 * en: For verifying content fade-in and line indicator slide motion.
 */
export const MotionPreview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "タブを切り替えてモーションを確認する。上段：solid / ghost（コンテンツ fade-in のみ）。下段：line（コンテンツ fade-in + インジケータースライド）。\n\n**コンテンツ**：opacity(0)+translateY(6px)→opacity(1)+translateY(0)、200ms ease-out。\n**line インジケーター**：アクティブタブの位置・幅に追従してスライド、250ms cubic-bezier(0.16,1,0.3,1)。\n\nen: Switch tabs to verify motion. Top: solid/ghost (content fade-in only). Bottom: line (content fade-in + indicator slide). Content: opacity(0)+translateY(6px)→(1)+0, 200ms ease-out. Line indicator: slides to active tab position/width, 250ms cubic-bezier(0.16,1,0.3,1).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-10 w-[400px]">
      {/* solid */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-500 font-medium">solid</p>
        <Tabs defaultValue="a">
          <TabsList variant="solid">
            <TabsTrigger value="a">アカウント</TabsTrigger>
            <TabsTrigger value="b">通知</TabsTrigger>
            <TabsTrigger value="c">セキュリティ</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><p className="py-4 character-3-regular-pro text-text-medium">アカウント設定の内容がここに入ります。</p></TabsContent>
          <TabsContent value="b"><p className="py-4 character-3-regular-pro text-text-medium">通知設定の内容がここに入ります。</p></TabsContent>
          <TabsContent value="c"><p className="py-4 character-3-regular-pro text-text-medium">セキュリティ設定の内容がここに入ります。</p></TabsContent>
        </Tabs>
      </div>

      {/* line */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-500 font-medium">line — インジケータースライド確認</p>
        <Tabs defaultValue="x">
          <TabsList variant="line">
            <TabsTrigger value="x">アカウント</TabsTrigger>
            <TabsTrigger value="y">通知</TabsTrigger>
            <TabsTrigger value="z">セキュリティ</TabsTrigger>
          </TabsList>
          <TabsContent value="x"><p className="py-4 character-3-regular-pro text-text-medium">アカウント設定の内容がここに入ります。</p></TabsContent>
          <TabsContent value="y"><p className="py-4 character-3-regular-pro text-text-medium">通知設定の内容がここに入ります。</p></TabsContent>
          <TabsContent value="z"><p className="py-4 character-3-regular-pro text-text-medium">セキュリティ設定の内容がここに入ります。</p></TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const Solid: Story = {
  render: args => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList variant="solid">
        <TabsTrigger value="tab1">tab 1</TabsTrigger>
        <TabsTrigger value="tab2">tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          tab 3(disabled)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">tab 1の内容</TabsContent>
      <TabsContent value="tab2">tab 2の内容</TabsContent>
      <TabsContent value="tab3">tab 3(disabled)の内容</TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: args => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList variant="line">
        <TabsTrigger value="tab1">tab 1</TabsTrigger>
        <TabsTrigger value="tab2">tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          tab 3(disabled)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">tab 1の内容</TabsContent>
      <TabsContent value="tab2">tab 2の内容</TabsContent>
      <TabsContent value="tab3">tab 3(disabled)の内容</TabsContent>
    </Tabs>
  ),
};

export const Ghost: Story = {
  render: args => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList variant="ghost">
        <TabsTrigger value="tab1">tab 1</TabsTrigger>
        <TabsTrigger value="tab2">tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          tab 3(disabled)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">tab 1の内容</TabsContent>
      <TabsContent value="tab2">tab 2の内容</TabsContent>
      <TabsContent value="tab3">tab 3(disabled)の内容</TabsContent>
    </Tabs>
  ),
};
