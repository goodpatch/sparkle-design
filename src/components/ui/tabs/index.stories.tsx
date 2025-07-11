import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";
import type { TabsListVariants } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

type TabsListVariantStory = StoryObj<{ variant: TabsListVariants["variant"] }>;

export const Default: TabsListVariantStory = {
  args: {
    variant: "solid",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["solid", "line", "ghost"],
      description: "タブのバリアント (solid/line/ghost)",
      table: { category: "TabsList" },
    },
  },
  render: args => (
    <Tabs defaultValue="tab1">
      <TabsList variant={args.variant}>
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
