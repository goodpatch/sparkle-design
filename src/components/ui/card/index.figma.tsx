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
    props: {},
    example: props => (
      <Card>
        <CardHeader>
          <div>
            <CardTitle>タイトル</CardTitle>
            <CardDescription>Description</CardDescription>
          </div>
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
          <div>
            <CardTitle>タイトル</CardTitle>
            <CardDescription>Description</CardDescription>
          </div>
          <CardControl>Control</CardControl>
        </CardHeader>
        <CardContent>Content</CardContent>
      </ClickableCard>
    ),
  }
);
