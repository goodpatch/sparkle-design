import * as React from "react";

import { cn } from "@/lib/utils";

export interface ClickableCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * クリック時の処理
   * en: Click handler function
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * ボタンを無効化するかどうか
   * en: Whether the button is disabled
   */
  isDisabled?: boolean;
}

/**
 * ## 概要 / Overview
 *
 * - 遷移トリガーやドラッグ&ドロップなど、インタラクションを想定する場合は、Clickable Cardコンポーネントを使用します。
 * - en: The ClickableCard component is used when interactions such as navigation triggers or drag & drop are expected.
 *
 * ## プロパティ / Props
 *
 * @param props.onClick クリック時の処理 /
 * en: Click handler function
 * @param props.isDisabled ボタンを無効化するかどうか /
 * en: Whether the button is disabled
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <ClickableCard onClick={() => console.log('Clicked')}>
 *   クリック可能なカードです
 * </ClickableCard>
 * ```
 */
const ClickableCard = React.forwardRef<HTMLButtonElement, ClickableCardProps>(
  ({ className, isDisabled, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "rounded-action border border-divider-low bg-white shadow-raise text-text-middle py-4 cursor-pointer hover:bg-neutral-50",
        "transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:bg-neutral-50 active:shadow-float active:border-primary-400",
        "disabled:cursor-not-allowed disabled:bg-white disabled:border-secondary-100 disabled:text-secondary-200 disabled:shadow-flat",
        className
      )}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      {...props}
    />
  )
);
ClickableCard.displayName = "ClickableCard";

/**
 * ## 概要 / Overview
 *
 * - カードはコンテンツをグルーピングして表示するために使用するコンポーネントです。
 * - en: The Card component is used to group and display content.
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>タイトル</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     コンテンツの内容
 *   </CardContent>
 * </Card>
 * ```
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-minimum border border-divider-low bg-white text-text-middle py-4",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row gap-2 justify-between px-6 py-2 items-center",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("character-4-bold-pro flex gap-2", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardControl.displayName = "CardControl";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * スペースを入れるかどうか
   * en: Whether to add spacing
   */
  isSpace?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, isSpace = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(isSpace ? "px-6 py-2" : "", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end px-6 py-2", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  ClickableCard,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardControl,
  CardDescription,
  CardContent,
};
