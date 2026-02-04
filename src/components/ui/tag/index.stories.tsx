import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./index";

const meta: Meta<typeof Tag> = {
  title: "Data Display/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "subtle"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    status: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "negative"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "ラベル",
    variant: "solid",
    size: "md",
    status: "neutral",
  },
};

export const Variant: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Tag {...args} variant="solid">
          Solid
        </Tag>
        <Tag {...args} variant="outline">
          Outline
        </Tag>
        <Tag {...args} variant="subtle">
          Subtle
        </Tag>
      </div>
    </div>
  ),
};

export const Size: Story = {
  render: args => (
    <div className="flex gap-4 items-center">
      <Tag {...args} size="sm">
        Small
      </Tag>
      <Tag {...args} size="md">
        Medium
      </Tag>
      <Tag {...args} size="lg">
        Large
      </Tag>
    </div>
  ),
};

export const Status: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold mb-2">Solid Variant</h3>
        <div className="flex gap-2">
          <Tag {...args} variant="solid" status="neutral">
            Neutral
          </Tag>
          <Tag {...args} variant="solid" status="info">
            Info
          </Tag>
          <Tag {...args} variant="solid" status="success">
            Success
          </Tag>
          <Tag {...args} variant="solid" status="warning">
            Warning
          </Tag>
          <Tag {...args} variant="solid" status="negative">
            Negative
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Outline Variant</h3>
        <div className="flex gap-2">
          <Tag {...args} variant="outline" status="neutral">
            Neutral
          </Tag>
          <Tag {...args} variant="outline" status="info">
            Info
          </Tag>
          <Tag {...args} variant="outline" status="success">
            Success
          </Tag>
          <Tag {...args} variant="outline" status="warning">
            Warning
          </Tag>
          <Tag {...args} variant="outline" status="negative">
            Negative
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Subtle Variant</h3>
        <div className="flex gap-2">
          <Tag {...args} variant="subtle" status="neutral">
            Neutral
          </Tag>
          <Tag {...args} variant="subtle" status="info">
            Info
          </Tag>
          <Tag {...args} variant="subtle" status="success">
            Success
          </Tag>
          <Tag {...args} variant="subtle" status="warning">
            Warning
          </Tag>
          <Tag {...args} variant="subtle" status="negative">
            Negative
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const LineBreakPrevention: Story = {
  render: args => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold mb-2">
          改行禁則処理 en: Line Break Prevention
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          タグは改行せずに1行で表示されます。長いテキストは省略記号で表示されます。
          en: Tags are displayed in a single line without wrapping. Long text is
          displayed with ellipsis.
        </p>
        <div className="flex gap-2 w-[400px]">
          <Tag {...args}>Short</Tag>
          <Tag {...args}>This is a longer tag text</Tag>
          <Tag {...args}>
            This is a very long tag text that should not wrap to multiple lines
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold mb-2">
          横並びレイアウト en: Horizontal Layout
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag {...args} status="info">
            情報
          </Tag>
          <Tag {...args} status="success">
            成功
          </Tag>
          <Tag {...args} status="warning">
            警告
          </Tag>
          <Tag {...args} status="negative">
            エラー
          </Tag>
          <Tag {...args} status="neutral">
            処理中
          </Tag>
        </div>
      </div>
    </div>
  ),
};
