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
    isOpenInNew: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "リンクテキスト",
    isOpenInNew: false,
    href: "#",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "リンクテキスト",
    isOpenInNew: true,
    href: "#",
  },
};
