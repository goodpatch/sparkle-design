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
  description: string;
  control: string;
  content: string;
  footerText: string;
  isSpace: boolean;
}

interface ClickableCardStoryArgs extends CardStoryArgs {
  isDisabled: boolean;
  onClick: () => void;
}

const meta: Meta<CardStoryArgs> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "カードタイトル",
    },
    description: {
      control: "text", 
      description: "カードの説明",
    },
    control: {
      control: "text",
      description: "コントロール内容",
    },
    content: {
      control: "text",
      description: "カードの内容",
    },
    footerText: {
      control: "text",
      description: "フッターのテキスト",
    },
    isSpace: {
      control: "boolean",
      description: "スペースを含むかどうか",
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
    title: "カードタイトル",
    description: "カードの説明文がここに入ります。",
    control: "編集",
    content: "ここにカードの主要なコンテンツが表示されます。テキストや画像、その他の要素を含めることができます。",
    footerText: "フッター情報",
    isSpace: true,
  },
  render: args => (
    <Card>
      <CardHeader>
        <CardTitle>
          {args.title}
          <CardDescription>
            {args.description}
          </CardDescription>
        </CardTitle>
        <CardControl>
          {args.control}
        </CardControl>
      </CardHeader>
      <CardContent isSpace={args.isSpace}>
        {args.content}
      </CardContent>
      <CardFooter>
        {args.footerText}
      </CardFooter>
    </Card>
  ),
};

/**
 * クリッカブルなカードの例
 */
export const Clickable: ClickableStory = {
  args: {
    title: "クリック可能なカード",
    description: "このカードはクリック可能です。",
    control: "詳細",
    content: "クリックすると何らかのアクションが実行されます。ボタンとしての機能を持つカードです。",
    footerText: "",
    isSpace: true,
    isDisabled: false,
    onClick: action("clicked"),
  },
  render: args => (
    <ClickableCard onClick={args.onClick} isDisabled={args.isDisabled}>
      <CardHeader>
        <CardTitle>
          {args.title}
          <CardDescription>
            {args.description}
          </CardDescription>
        </CardTitle>
        <CardControl>
          {args.control}
        </CardControl>
      </CardHeader>
      <CardContent isSpace={args.isSpace}>
        {args.content}
      </CardContent>
      {args.footerText && (
        <CardFooter>
          {args.footerText}
        </CardFooter>
      )}
    </ClickableCard>
  ),
  argTypes: {
    isDisabled: {
      control: "boolean",
      description: "カードを無効化するかどうか",
    },
    onClick: {
      action: "clicked",
      description: "クリック時のイベントハンドラー",
    },
  },
};

/**
 * クリッカブルなカードが無効な状態の例
 */
export const ClickableDisabled: ClickableStory = {
  args: {
    ...Clickable.args,
    title: "無効化されたカード",
    description: "このカードは無効化されており、クリックできません。",
    content: "無効化状態では、カードの外観が変化し、クリックイベントが発火しません。",
    isDisabled: true,
  },
  render: Clickable.render,
  argTypes: Clickable.argTypes,
};

/**
 * シンプルなカード（コンテンツのみ）
 */
export const Simple: Story = {
  args: {
    title: "",
    description: "",
    control: "",
    content: "シンプルなカードコンテンツ",
    footerText: "",
    isSpace: true,
  },
  render: args => (
    <Card>
      <CardContent isSpace={args.isSpace}>
        {args.content}
      </CardContent>
    </Card>
  ),
};

/**
 * ヘッダーのみのカード
 */
export const HeaderOnly: Story = {
  args: {
    title: "ヘッダーのみ",
    description: "説明文も表示可能",
    control: "アクション",
    content: "",
    footerText: "",
    isSpace: true,
  },
  render: args => (
    <Card>
      <CardHeader>
        <CardTitle>
          {args.title}
          {args.description && (
            <CardDescription>
              {args.description}
            </CardDescription>
          )}
        </CardTitle>
        {args.control && (
          <CardControl>
            {args.control}
          </CardControl>
        )}
      </CardHeader>
    </Card>
  ),
};

/**
 * スペーシングなしのカード
 */
export const NoSpacing: Story = {
  args: {
    ...Default.args,
    title: "スペーシングなしカード",
    description: "コンテンツ部分にパディングがありません。",
    content: "このコンテンツは境界まで広がります。",
    isSpace: false,
  },
  render: Default.render,
};
