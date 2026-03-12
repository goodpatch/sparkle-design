import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
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
          <CardDescription className="character-3-regular-pro text-text-low">
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
          <CardDescription className="character-3-regular-pro text-text-low">
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
          <CardDescription className="character-3-regular-pro text-text-low">
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
    </ClickableCard>
  ),
  argTypes: Clickable.argTypes,
};
