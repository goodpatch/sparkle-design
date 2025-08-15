import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./index";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
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
