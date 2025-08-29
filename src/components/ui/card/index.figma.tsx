import React from "react";
import figma from "@figma/code-connect";
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  CardControl,
  CardDescription,
  CardContent,
  CardFooter,
} from "./index";

/**
 * Card - 基本的なカードコンポーネント
 * en: Card - Basic card component
 */
figma.connect(
  Card,
  "https://www.figma.com/design/7alBZXZf65YgcII41TWT0r/Sparkle-Design?node-id=1274-60861&t=A1ymB6VaQrqwNcKU-4",
  {
    props: {
      /**
       * カードタイトル
       * en: Card title
       */
      title: figma.string("title"),
    },
    example: props => (
      <Card>
        <CardHeader>
          <CardTitle>
            {props.title}
            <CardDescription>Description</CardDescription>
          </CardTitle>
          <CardControl>Control</CardControl>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    ),
  }
);

/**
 * ClickableCard - クリック可能なカードコンポーネント
 * en: ClickableCard - Clickable card component
 */
figma.connect(
  ClickableCard,
  "https://www.figma.com/design/7alBZXZf65YgcII41TWT0r/Sparkle-Design?node-id=8271-617&t=A1ymB6VaQrqwNcKU-4",
  {
    props: {
      /**
       * カードタイトル
       * en: Card title
       */
      title: figma.string("title"),
      /**
       * 無効化状態
       * en: Disabled state
       */
      isDisabled: figma.enum("state", {
        disabled: true,
        default: false,
      }),
    },
    example: props => (
      <ClickableCard isDisabled={props.isDisabled}>
        <CardHeader>
          <CardTitle>
            {props.title}
            <CardDescription>Description</CardDescription>
          </CardTitle>
          <CardControl>Control</CardControl>
        </CardHeader>
        <CardContent>Content</CardContent>
      </ClickableCard>
    ),
  }
);
