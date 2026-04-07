import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  title: "Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpenInNew: {
      control: "boolean",
    },
    asChild: {
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
    href: "/",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "リンクテキスト",
    isOpenInNew: true,
    href: "https://example.com",
  },
};

/**
 * `asChild` を使って任意のリンクコンポーネントをルート要素にする例。
 * next/link や React Router の Link と統合する際に使用する。
 */
export const AsChild: Story = {
  render: () => (
    <Link asChild>
      <a href="/">next/link 等に置き換え可能</a>
    </Link>
  ),
};

/**
 * `asChild` + `isOpenInNew` の組み合わせ。
 * 外部リンクアイコンは asChild 使用時も自動付与される。
 */
export const AsChildExternal: Story = {
  render: () => (
    <Link asChild isOpenInNew>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        外部サイト（asChild）
      </a>
    </Link>
  ),
};

/**
 * カスタム typography クラスを指定した例。
 */
export const CustomTypography: Story = {
  args: {
    children: "カスタムタイポグラフィ",
    className: "character-4-bold-pro",
    href: "/",
  },
};
