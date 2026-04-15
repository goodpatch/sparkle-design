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
