import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { action } from "storybook/actions";
import { expect } from "storybook/test";
import { Button } from "../button";
import { Tag } from "../tag";
import {
  Card,
  CardContent,
  CardControl,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ClickableCard,
} from "./index";

interface CardStoryArgs {
  title: string;
  isSpace: boolean;
}

interface ClickableCardStoryArgs extends CardStoryArgs {
  isDisabled: boolean;
  onClick: () => void;
}

const meta: Meta<CardStoryArgs> = {
  title: "Data Display/Card",
  component: Card,
  subcomponents: {
    ClickableCard,
    CardContent,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "カードタイトル en: Card title",
    },
    isSpace: {
      control: "boolean",
      description: "スペースを含むかどうか en: Whether to include spacing",
    },
  },
} satisfies Meta<CardStoryArgs>;

export default meta;
type Story = StoryObj<CardStoryArgs>;
type ClickableStory = StoryObj<ClickableCardStoryArgs>;

/**
 * 基本的なカードの例
 */
export const Default: Story = {
  args: {
    title: "タイトル",
    isSpace: true,
  },
  render: args => (
    <Card>
      <CardHeader>
        <CardTitle>
          {args.title}
          <CardDescription className="character-3-regular-pro text-text-neutral-low">
            <div className="border border-dashed border-purple-300 text-purple-300">
              SLOT
            </div>
          </CardDescription>
        </CardTitle>
        <CardControl>
          <div className="border border-dashed border-purple-300 text-purple-300">
            SLOT
          </div>
        </CardControl>
      </CardHeader>
      <CardContent isSpace={args.isSpace}>
        <div className="border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </div>
      </CardContent>
      <CardFooter>
        <div className="border border-dashed border-purple-300 text-purple-300">
          SLOT
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * クリッカブルなカードの例
 */
export const Clickable: ClickableStory = {
  args: {
    title: "タイトル",
    isSpace: true,
    isDisabled: false,
    onClick: action("clicked"),
  },
  render: args => (
    <ClickableCard onClick={args.onClick} isDisabled={args.isDisabled}>
      <CardHeader>
        <CardTitle>
          {args.title}
          <CardDescription className="character-3-regular-pro text-text-neutral-low">
            <span className="block border border-dashed border-purple-300 text-purple-300">
              SLOT
            </span>
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent isSpace={args.isSpace}>
        <span className="block border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </span>
      </CardContent>
    </ClickableCard>
  ),
  argTypes: {
    isDisabled: {
      control: "boolean",
      description: "カードを無効化するかどうか en: Whether to disable the card",
    },
    onClick: {
      action: "clicked",
      description:
        "クリック時のイベントハンドラー en: Event handler for click events",
    },
  },
};

/**
 * クリッカブルなカードが無効な状態の例
 */
export const ClickableDisabled: ClickableStory = {
  args: {
    ...Clickable.args,
    isDisabled: true,
  },
  render: args => (
    <ClickableCard onClick={args.onClick} isDisabled={args.isDisabled}>
      <CardHeader>
        <CardTitle>
          {args.title}
          <CardDescription className="character-3-regular-pro text-text-neutral-low">
            <span className="block border border-dashed border-purple-300 text-purple-300">
              SLOT
            </span>
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent isSpace={args.isSpace}>
        <span className="block border border-dashed border-purple-300 text-purple-300 w-[272px]">
          SLOT
        </span>
      </CardContent>
    </ClickableCard>
  ),
  argTypes: Clickable.argTypes,
};

/**
 * 狭い幅で見出しの横に Tag と文字のボタンを並べた例。CardControl が見出しの下に折り返し、見出しは縦書きにならない
 * en: A narrow card with a Tag and a text button beside the title. CardControl wraps below, and the title does not become vertical
 */
export const NarrowHeader: Story = {
  args: {
    title: "解約率",
    isSpace: true,
  },
  render: args => (
    <div className="w-[260px]">
      <Card>
        <CardHeader>
          <CardTitle data-testid="narrow-title">
            {args.title}
            <CardDescription className="character-3-regular-pro text-text-neutral-low">
              <Tag status="negative" variant="subtle">
                目標未達
              </Tag>
            </CardDescription>
          </CardTitle>
          <CardControl>
            <Button variant="ghost" size="sm" prefixIcon="download">
              エクスポート
            </Button>
          </CardControl>
        </CardHeader>
        <CardContent isSpace={args.isSpace}>2.9%</CardContent>
      </Card>
    </div>
  ),
  play: async ({ canvas }) => {
    // 見出しの文字が 1 行に収まっている（縮んで 1 文字ずつ折り返していない）
    // en: The title text stays on one line (it has not shrunk to one character per line)
    const title = canvas.getByTestId("narrow-title");
    const range = document.createRange();
    range.selectNodeContents(title.firstChild as Node);
    await expect(range.getClientRects().length).toBe(1);
  },
};
