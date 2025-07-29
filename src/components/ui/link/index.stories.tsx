import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isExternalLink: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "リンクテキスト",
    isExternalLink: false,
    href: "#",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "リンクテキスト",
    isExternalLink: true,
    href: "#",
  },
};
