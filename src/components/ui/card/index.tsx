/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card のサブコンポーネントが描画する要素
 * en: Element rendered by Card subcomponents
 */
type CardPartElement = "div" | "span";

export interface CardPartProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 描画する要素。ClickableCard（`<button>`）の内側では phrasing content のみ許可されるため `"span"` を使います。ClickableCard の JSX 内に直接書いたサブコンポーネントには自動で `"span"` が付与されます。
   * en: Element to render. Inside ClickableCard (`<button>`), only phrasing content is allowed, so use `"span"`. Subcomponents written directly in ClickableCard's JSX get `"span"` automatically.
   * @default "div"
   */
  as?: CardPartElement;
  /**
   * ルート要素への ref。`as` で `<span>` を描画するケースがあるため `HTMLElement` で受けます。
   * en: Ref to the root element. Typed as `HTMLElement` because `as` may render a `<span>`.
   */
  ref?: React.Ref<HTMLElement>;
}

export interface ClickableCardProps extends React.ComponentProps<"button"> {
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
 * **アンチパターン / Anti-patterns**
 *
 * - ClickableCard は `<button>` を描画するため、内側には phrasing content しか置けません。`CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` は ClickableCard の内側では自動的に `<span>` で描画されるので、これらで構成してください。`<div>` / `<p>` / 見出し要素を直書きしないでください。
 *   en: ClickableCard renders a `<button>`, which only permits phrasing content. `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` automatically render as `<span>` inside ClickableCard, so compose the card with them. Do not write `<div>` / `<p>` / heading elements directly.
 * - ClickableCard の内側に Button / IconButton / リンクなどの対話型要素（`CardControl` を含む）を置かないでください。ネストされた interactive 要素になり、アクセシビリティ違反になります。カード内に個別の操作が必要な場合は `Card` を使ってください。
 *   en: Do not place interactive elements such as Button / IconButton / links (including `CardControl`) inside ClickableCard. They become nested interactive elements, which is an accessibility violation. Use `Card` when the card needs its own actions.
 *
 * ```tsx
 * // ✅ Correct
 * <ClickableCard onClick={handle}>
 *   <CardHeader>
 *     <CardTitle>タイトル</CardTitle>
 *   </CardHeader>
 *   <CardContent>コンテンツの内容</CardContent>
 * </ClickableCard>
 *
 * // ❌ Wrong - div を直書きしない
 * <ClickableCard onClick={handle}>
 *   <div className="px-6">タイトル</div>
 * </ClickableCard>
 *
 * // ❌ Wrong - 対話型要素を入れない
 * <ClickableCard onClick={handle}>
 *   <CardHeader>
 *     <CardTitle>タイトル</CardTitle>
 *     <CardControl>
 *       <Button>編集</Button>
 *     </CardControl>
 *   </CardHeader>
 * </ClickableCard>
 * ```
 *
 * @param {ClickableCardProps} props
 */
function ClickableCard({
  className,
  isDisabled,
  onClick,
  ref,
  children,
  ...props
}: ClickableCardProps) {
  return (
    <button
      ref={ref}
      className={cn(
        "rounded-action border border-border-neutral-middle bg-surface-base-0 shadow-raise text-text-neutral-middle py-4 cursor-pointer hover:bg-neutral-50",
        "transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2",
        "active:bg-neutral-50 active:shadow-float active:border-primary-400",
        "disabled:cursor-not-allowed disabled:bg-surface-base-0 disabled:border-secondary-100 disabled:text-secondary-200 disabled:shadow-flat",
        className
      )}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {toPhrasingContent(children)}
    </button>
  );
}
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
 *       <CardDescription className="character-3-regular-pro text-text-neutral-low">
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
 * **アンチパターン / Anti-patterns**
 *
 * - `<Card>` を `<button>` / `<a>` / `role="button"` で包まないでください。クリック可能な Card には専用の `ClickableCard` を使ってください。
 *   en: Do not wrap `<Card>` with `<button>` / `<a>` / `role="button"`. Use the dedicated `ClickableCard` component for clickable cards.
 *
 * ```tsx
 * // ✅ Correct - CardHeader / CardTitle は ClickableCard の内側では <span> で描画される
 * <ClickableCard onClick={handle}>
 *   <CardHeader><CardTitle>タイトル</CardTitle></CardHeader>
 * </ClickableCard>
 *
 * // ❌ Wrong
 * <button type="button" onClick={handle}>
 *   <Card>...</Card>
 * </button>
 * ```
 *
 * @param {React.ComponentProps<"div">} props
 */
function Card({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-minimum border border-border-neutral-middle bg-surface-base-0 text-text-neutral-middle py-4",
        className
      )}
      {...props}
    />
  );
}
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
 *     <CardDescription className="character-3-regular-pro text-text-neutral-low">
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
 *
 */
function CardHeader({
  as: Comp = "div",
  className,
  ref,
  ...props
}: CardPartProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn(
        "flex flex-row gap-2 justify-between px-6 py-2 items-center",
        className
      )}
      {...props}
    />
  );
}
CardHeader.displayName = "CardHeader";

function CardTitle({
  as: Comp = "div",
  className,
  ref,
  ...props
}: CardPartProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn("character-4-bold-pro flex items-center gap-2", className)}
      {...props}
    />
  );
}
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
 *   <CardDescription className="character-3-regular-pro text-text-neutral-low">
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
 *   <CardDescription className="character-3-regular-pro text-text-neutral-low">
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
 *
 * @param {CardPartProps} props
 */
function CardDescription({
  as: Comp = "div",
  className,
  ref,
  ...props
}: CardPartProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn(Comp === "span" && "block", className)}
      {...props}
    />
  );
}
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
 * - CardControl にはアクション用の Button / IconButton のみを入れてください。ステータス表示（Tag 等）は CardDescription に入れてください。
 *   en: CardControl is for action buttons (Button / IconButton) only. Place status displays (Tag, etc.) in CardDescription.
 *
 * ```tsx
 * // ✅ Correct
 * <CardControl>
 *   <Button theme="neutral" variant="outline">キャンセル</Button>
 *   <Button>保存</Button>
 * </CardControl>
 *
 * // ❌ Wrong - ステータス表示を CardControl に入れない
 * <CardControl>
 *   <Tag status="negative">警告</Tag>
 * </CardControl>
 * ```
 *
 * @param {CardPartProps} props
 */
function CardControl({
  as: Comp = "div",
  className,
  ref,
  ...props
}: CardPartProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}
CardControl.displayName = "CardControl";

export interface CardContentProps extends CardPartProps {
  /**
   * スペースを入れるかどうか
   * en: Whether to add spacing
   */
  isSpace?: boolean;
}

function CardContent({
  as: Comp = "div",
  className,
  isSpace = true,
  ref,
  ...props
}: CardContentProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn(
        Comp === "span" && "block",
        isSpace ? "px-6 py-2" : "",
        className
      )}
      {...props}
    />
  );
}
CardContent.displayName = "CardContent";

function CardFooter({
  as: Comp = "div",
  className,
  ref,
  ...props
}: CardPartProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={cn("flex items-center justify-end px-6 py-2", className)}
      {...props}
    />
  );
}
CardFooter.displayName = "CardFooter";

/**
 * ClickableCard の内側で `<span>` 描画に切り替える Card のサブコンポーネント
 * en: Card subcomponents switched to `<span>` rendering inside ClickableCard
 */
const CARD_PARTS = new Set<unknown>([
  CardHeader,
  CardTitle,
  CardDescription,
  CardControl,
  CardContent,
  CardFooter,
]);

/**
 * ClickableCard の children を走査し、Card のサブコンポーネントに `as="span"` を付与する。
 * hooks（Context）を使わないため Server Component でも動作する。走査対象は Card のサブコンポーネント・Fragment・HTML 要素のみで、独自コンポーネントの内側には入らない。明示された `as` は上書きしない。
 * en: Walks ClickableCard's children and adds `as="span"` to Card subcomponents.
 * It uses no hooks (Context), so it also works in Server Components. It only descends into Card subcomponents, Fragments and HTML elements, never into custom components. An explicit `as` is never overridden.
 */
function toPhrasingContent(node: React.ReactNode): React.ReactNode {
  if (Array.isArray(node)) {
    return node.map(toPhrasingContent);
  }
  if (!React.isValidElement<CardPartProps>(node)) {
    return node;
  }
  const isCardPart = CARD_PARTS.has(node.type);
  if (
    !isCardPart &&
    node.type !== React.Fragment &&
    typeof node.type !== "string"
  ) {
    return node;
  }
  const { as, children } = node.props;
  const shouldSetAs = isCardPart && as === undefined;
  if (children === undefined && !shouldSetAs) {
    return node;
  }
  // children は props 経由で渡す（可変長引数で配列を渡すと key 警告が出るため）
  // en: Pass children via props (passing an array as a rest argument triggers key warnings)
  return React.cloneElement(node, {
    ...(shouldSetAs ? { as: "span" as const } : {}),
    ...(children === undefined
      ? {}
      : { children: toPhrasingContent(children) }),
  });
}

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
