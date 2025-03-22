import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    isUnderline: {
      control: "boolean",
      description: "下線を表示するかどうか",
    },
    isExternalLink: {
      control: "boolean",
      description: "外部リンクアイコンを表示するかどうか",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "リンクテキスト",
    isUnderline: false,
    isExternalLink: false,
    href: "#",
  },
};

export const WithUnderline: Story = {
  args: {
    children: "リンクテキスト",
    isUnderline: true,
    isExternalLink: false,
    href: "#",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "リンクテキスト",
    isUnderline: false,
    isExternalLink: true,
    href: "#",
  },
};
