/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
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
 * **概要 / Overview**
 *
 * - カードはコンテンツをグルーピングして表示するために使用するコンポーネントです。
 * - en: The Card component is used to group and display content.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <ClickableCard onClick={() => console.log('Clicked')}>
 *   クリック可能なカードです
 * </ClickableCard>
 * ```
 *
 * @param {ClickableCardProps} props
 */
const ClickableCard = React.forwardRef<HTMLButtonElement, ClickableCardProps>(
  ({ className, isDisabled, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "rounded-action border border-divider-middle bg-white shadow-raise text-text-middle py-4 cursor-pointer hover:bg-neutral-50",
        "transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2",
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
 * **概要 / Overview**
 *
 * - カードはコンテンツをグルーピングして表示するために使用するコンポーネントです。
 * - en: The Card component is used to group and display content.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>
 *       タイトル
 *       <CardDescription className="character-3-regular-pro text-text-low">
 *         全 12 件
 *       </CardDescription>
 *     </CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     コンテンツの内容
 *   </CardContent>
 * </Card>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-minimum border border-divider-middle bg-white text-text-middle py-4",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * **アンチパターン / Anti-patterns**
 *
 * - CardHeader 内で手動の flex レイアウト（`<div className="flex justify-between">`）を使わないでください。CardHeader は内部で flex レイアウトを適用済みです。アクションボタンは `CardControl` で囲んでください。
 *   en: Do not use manual flex layout inside CardHeader. CardHeader already applies flex layout internally. Wrap action buttons with `CardControl`.
 * - CardTitle の補足情報や件数は、`span` などを直書きせず `CardDescription` を使ってください。
 *   en: For supporting text or counts inside CardTitle, do not inline a `span`; use `CardDescription`.
 * - `CardDescription` はタイトルの補足テキスト用です。長い説明文は `CardContent` に配置してください。
 *   en: Use `CardDescription` for short supporting text in CardTitle. Put long descriptive copy inside `CardContent`.
 *
 * ```tsx
 * // ✅ Correct
 * <CardHeader>
 *   <CardTitle>
 *     タイトル
 *     <CardDescription className="character-3-regular-pro text-text-low">
 *       全 12 件
 *     </CardDescription>
 *   </CardTitle>
 *   <CardControl>
 *     <Button theme="neutral" variant="outline">キャンセル</Button>
 *     <Button>保存</Button>
 *   </CardControl>
 * </CardHeader>
 *
 * // ❌ Wrong - 手動 flex を使わない
 * <CardHeader>
 *   <div className="flex justify-between">
 *     <CardTitle>タイトル</CardTitle>
 *     <Button theme="neutral" variant="outline">キャンセル</Button>
 *     <Button>保存</Button>
 *   </div>
 * </CardHeader>
 *
 * // ❌ Wrong - CardTitle 内に補足を入れない
 * <CardHeader>
 *   <CardTitle>
 *     タイトル
 *     <span className="text-sm text-neutral-500">全 12 件</span>
 *   </CardTitle>
 * </CardHeader>
 * ```

 */
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
    className={cn("character-4-bold-pro flex items-center gap-2", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * **概要 / Overview**
 *
 * - カードタイトル内の補足情報や件数表示に使用するコンポーネントです。
 * - en: The CardDescription component is used for supporting text or counts inside CardTitle.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <CardTitle>
 *   タイトル
 *   <CardDescription className="character-3-regular-pro text-text-low">
 *     全 12 件
 *   </CardDescription>
 * </CardTitle>
 * ```
 *
 * **アンチパターン / Anti-patterns**
 *
 * - `CardDescription` は CardTitle 内の短い補足テキスト用です。長い説明文は `CardContent` に配置してください。
 *   en: `CardDescription` is for short supporting text inside CardTitle. Put long descriptive copy inside `CardContent`.
 * - Typography や text color は用途に応じて className で明示してください。
 *   en: Specify typography and text color explicitly with className based on the use case.
 *
 * ```tsx
 * // ✅ Correct
 * <CardTitle>
 *   プロジェクト一覧
 *   <CardDescription className="character-3-regular-pro text-text-low">
 *     全 12 件
 *   </CardDescription>
 * </CardTitle>
 *
 * // ❌ Wrong - 長い説明文を CardTitle 内に入れない
 * <CardTitle>
 *   プロジェクト一覧
 *   <CardDescription>
 *     このカードはダッシュボードで重要な進捗と担当者の状態を表示します。
 *   </CardDescription>
 * </CardTitle>
 * ```

 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

/**
 * **概要 / Overview**
 *
 * - CardHeader 右側のアクションをまとめるコンポーネントです。
 * - en: CardControl groups right-side actions inside CardHeader.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <CardControl>
 *   <Button theme="neutral" variant="outline">キャンセル</Button>
 *   <Button>保存</Button>
 * </CardControl>
 * ```
 *
 * **アンチパターン / Anti-patterns**
 *
 * - CardHeader の右側アクションは `CardControl` に集約してください。複数ボタンでも追加の layout class は不要です。
 *   en: Place right-side actions in `CardControl`. No extra layout classes are needed even with multiple buttons.
 *
 * ```tsx
 * // ✅ Correct
 * <CardControl>
 *   <Button theme="neutral" variant="outline">キャンセル</Button>
 *   <Button>保存</Button>
 * </CardControl>
 * ```

 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
const CardControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
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
