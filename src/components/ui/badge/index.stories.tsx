import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isNumberVisible: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["x5s", "x4s", "x3s", "x2s", "xs", "sm", "md"],
    },
    status: {
      control: "select",
      options: ["info", "success", "negative"],
    },
    isGapped: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "13",
  },
};

export const Size = () => {
  return (
    <div className="flex flex-row gap-2 items-start">
      <Badge size="x5s">13</Badge>
      <Badge size="x4s">13</Badge>
      <Badge size="x3s">13</Badge>
      <Badge size="x2s">13</Badge>
      <Badge size="xs">13</Badge>
      <Badge size="sm">13</Badge>
      <Badge size="md">13</Badge>
    </div>
  );
};

export const Status = () => {
  return (
    <div className="flex flex-row gap-2  items-start">
      <Badge status="info">13</Badge>
      <Badge status="success">13</Badge>
      <Badge status="negative">13</Badge>
    </div>
  );
};

export const NumberVisible = () => {
  return (
    <div className="flex flex-row gap-2 items-start">
      <Badge isNumberVisible={false}>13</Badge>
      <Badge isNumberVisible={true}>13</Badge>
    </div>
  );
};

export const Gapped = () => {
  return (
    <div className="flex flex-row gap-2 items-start">
      <Badge isGapped={true}>13</Badge>
      <Badge isGapped={false}>13</Badge>
    </div>
  );
};
