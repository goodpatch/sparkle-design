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
    children: "Tag",
    variant: "solid",
    size: "md",
    status: "neutral",
  },
};

export const Variant = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Tag variant="solid">Solid</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag variant="subtle">Subtle</Tag>
      </div>
    </div>
  );
};

export const Size = () => {
  return (
    <div className="flex gap-4 items-center">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  );
};

export const Status = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold mb-2">Solid Variant</h3>
        <div className="flex gap-2">
          <Tag variant="solid" status="neutral">
            Neutral
          </Tag>
          <Tag variant="solid" status="info">
            Info
          </Tag>
          <Tag variant="solid" status="success">
            Success
          </Tag>
          <Tag variant="solid" status="warning">
            Warning
          </Tag>
          <Tag variant="solid" status="negative">
            Negative
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Outline Variant</h3>
        <div className="flex gap-2">
          <Tag variant="outline" status="neutral">
            Neutral
          </Tag>
          <Tag variant="outline" status="info">
            Info
          </Tag>
          <Tag variant="outline" status="success">
            Success
          </Tag>
          <Tag variant="outline" status="warning">
            Warning
          </Tag>
          <Tag variant="outline" status="negative">
            Negative
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Subtle Variant</h3>
        <div className="flex gap-2">
          <Tag variant="subtle" status="neutral">
            Neutral
          </Tag>
          <Tag variant="subtle" status="info">
            Info
          </Tag>
          <Tag variant="subtle" status="success">
            Success
          </Tag>
          <Tag variant="subtle" status="warning">
            Warning
          </Tag>
          <Tag variant="subtle" status="negative">
            Negative
          </Tag>
        </div>
      </div>
    </div>
  );
};
