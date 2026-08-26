/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-action",
    "ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2",
    "relative cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        // solid の 1px 枠線は Figma の刷新で削除された
        // en: The 1px border on solid was removed in the Figma refresh.
        solid: "",
        outline: "border",
        ghost: "",
      },
      size: {
        xs: "w-6 h-6 p-1",
        sm: "w-8 h-8 p-1.5",
        md: "w-10 h-10 p-2",
        lg: "w-12 h-12 p-2",
      },
      theme: {
        primary: "",
        neutral: "",
        negative: "",
      },
      isLoading: {
        true: "cursor-not-allowed",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      // Solid Primary バリアント
      {
        variant: "solid",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-primary-high-enabled text-object-inverse",
          "hover:bg-surface-primary-high-hover",
          "active:bg-surface-primary-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-primary-high-enabled text-object-inverse",
      },

      // Solid Neutral バリアント
      {
        variant: "solid",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-neutral-high-enabled text-object-inverse",
          "hover:bg-surface-neutral-high-hover",
          "active:bg-surface-neutral-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-neutral-high-enabled text-object-inverse",
      },

      // Solid Negative バリアント
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-negative-high-enabled text-object-inverse",
          "hover:bg-surface-negative-high-hover",
          "active:bg-surface-negative-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-negative-high-enabled text-object-inverse",
      },

      // Outline Primary バリアント
      // hover でアイコン色を変えないのは Figma の binding どおり（neutral / negative は変わる）
      // en: Keeping the icon color on hover matches the Figma binding (neutral / negative do change).
      {
        variant: "outline",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-primary-enabled border-border-primary-high",
          "hover:bg-surface-primary-low-hover",
          "active:bg-surface-primary-low-active active:text-object-primary-active",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-primary-enabled border-border-primary-high",
      },

      // Outline Neutral バリアント
      {
        variant: "outline",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-neutral-middle border-border-neutral-high",
          "hover:bg-surface-neutral-low-hover hover:text-object-neutral-high",
          "active:bg-surface-neutral-low-active active:text-object-neutral-high",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-neutral-middle border-border-neutral-high",
      },

      // Outline Negative バリアント
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-negative-enabled border-border-negative-high",
          "hover:bg-surface-negative-low-hover hover:text-object-negative-hover",
          "active:bg-surface-negative-low-active active:text-object-negative-active",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-negative-enabled border-border-negative-high",
      },

      // Ghost Primary バリアント
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className:
          "text-object-primary-enabled hover:bg-surface-primary-low-hover active:bg-surface-primary-low-active active:text-object-primary-active",
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "text-object-primary-enabled",
      },

      // Ghost neutral バリアント
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "text-object-neutral-middle",
          "hover:bg-surface-neutral-low-hover hover:text-object-neutral-high",
          "active:bg-surface-neutral-low-active active:text-object-neutral-high",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "text-object-neutral-middle",
      },

      // Ghost Negative バリアント
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "text-object-negative-enabled",
          "hover:bg-surface-negative-low-hover hover:text-object-negative-hover",
          "active:bg-surface-negative-low-active active:text-object-negative-active",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "text-object-negative-enabled",
      },

      // Disabled styles for all variants
      {
        variant: "solid",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-high-disabled aria-disabled:bg-surface-primary-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-high-disabled aria-disabled:bg-surface-neutral-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-high-disabled aria-disabled:bg-surface-negative-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "outline",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled aria-disabled:text-object-primary-disabled disabled:border-border-primary-low aria-disabled:border-border-primary-low",
      },
      {
        variant: "outline",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled aria-disabled:text-object-neutral-disabled disabled:border-border-neutral-low aria-disabled:border-border-neutral-low",
      },
      {
        variant: "outline",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled aria-disabled:text-object-negative-disabled disabled:border-border-negative-low aria-disabled:border-border-negative-low",
      },
      {
        variant: "ghost",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled aria-disabled:text-object-primary-disabled",
      },
      {
        variant: "ghost",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled aria-disabled:text-object-neutral-disabled",
      },
      {
        variant: "ghost",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled aria-disabled:text-object-negative-disabled",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      theme: "primary",
      isLoading: false,
      isDisabled: false,
    },
  }
);

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
type NativeButtonProps = React.ComponentProps<"button">;

export interface IconButtonProps
  extends Omit<
    NativeButtonProps,
    "onClick" | "onKeyDown" | "onClickCapture" | "onKeyDownCapture" | "ref"
  > {
  /**
   * ルート要素への ref。`asChild` で `<a>` 等を差し込むケースを受け入れるため
   * `HTMLButtonElement` ではなく `HTMLElement` で広く受ける
   * en: Ref to the root element. Typed as `HTMLElement` (not `HTMLButtonElement`)
   * so `asChild` targets such as `<a>` are accepted.
   */
  ref?: React.Ref<HTMLElement>;
  /**
   * アイコンボタンのバリエーション
   * en: Variation of the icon button
   */
  variant?: IconButtonVariants["variant"];
  /**
   * アイコンボタンのサイズ
   * en: Size of the icon button
   */
  size?: IconButtonVariants["size"];
  /**
   * アイコンボタンのテーマ
   * en: Theme of the icon button
   */
  theme?: IconButtonVariants["theme"];
  /**
   * ボタンを別コンポーネントの子としてレンダリングするか。
   * true のとき、差し込んだ要素の中身を保ったままアイコンがその内側に描画される
   * en: Whether to render the button as a child component. When true, the icon is
   * rendered inside the slotted element while keeping the element's own children.
   */
  asChild?: boolean;
  /**
   * 表示するアイコン名
   * en: Icon name to display
   */
  icon: string;
  /**
   * ローディング状態かどうか
   * en: Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * ボタンを無効化するかどうか
   * en: Whether the button is disabled
   */
  isDisabled?: boolean;
  /**
   * クリック時のハンドラ。`asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: Click handler. Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * キー押下時のハンドラ。`asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: KeyDown handler. Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * capture フェーズのクリックハンドラ。無効時はコンポーネント側のガードが優先される
   * en: Capture-phase click handler. The component's disabled guard takes precedence.
   */
  onClickCapture?: React.MouseEventHandler<HTMLElement>;
  /**
   * capture フェーズのキー押下ハンドラ。無効時はコンポーネント側のガードが優先される
   * en: Capture-phase keydown handler. The component's disabled guard takes precedence.
   */
  onKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
}

/**
 * **概要 / Overview**
 *
 * - アイコンボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
 * - en: The IconButton component is used as a trigger for actions and events such as form submission, dialog expansion, action cancellation, and deletion execution.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <IconButton variant="solid" size="md" theme="primary" icon="edit" />
 * ```
 *
 * **アンチパターン / Anti-patterns**
 *
 * - アイコンだけのアクションでは `Button` + `prefixIcon` ではなく `IconButton` を使ってください。
 *   en: Use `IconButton` for icon-only actions instead of `Button` with `prefixIcon`.
 *
 * ```tsx
 * // ✅ Correct
 * <IconButton icon="content_copy" aria-label="コピー" />
 *
 * // ❌ Wrong - Icon-only action を Button で表現しない
 * <Button prefixIcon="content_copy" aria-label="コピー" />
 * ```
 *
 * **アクセシビリティ / Accessibility**
 *
 * - アイコンは `aria-hidden` のためアクセシブルネームになりません。`aria-label` を必ず指定してください。
 *   `asChild` の場合は差し込む要素側のテキストや `aria-label` でも構いません。
 *   en: The icon is `aria-hidden` and never provides an accessible name — always pass `aria-label`.
 *   With `asChild`, text or `aria-label` on the slotted element works as well.
 * - `asChild` で `<a>` など button 以外の要素を差し込んで無効化した場合、`aria-disabled` の付与、
 *   click / Enter・Space の抑止、`aria-disabled:` プレフィックスによる無効時の配色まで
 *   このコンポーネントが行います（`data-disabled="true"` も利用側のスタイルフックとして出力）。
 *   差し込み先が native の `<button>` の場合は `disabled` 属性がそのまま渡ります。
 *   なお `aria-disabled` の要素はフォーカス可能なままなので、タブ順から外したい場合は
 *   差し込む要素側で `tabIndex={-1}` を指定してください。
 *   en: When disabled with `asChild` and a non-button element such as `<a>`, this component sets
 *   `aria-disabled`, blocks click / Enter / Space, and applies the disabled colors via
 *   `aria-disabled:`-prefixed utilities (`data-disabled="true"` is also emitted as a styling hook).
 *   A slotted native `<button>` receives the real `disabled` attribute instead. Note that an
 *   `aria-disabled` element stays focusable — set `tabIndex={-1}` on the slotted element to remove
 *   it from the tab order.
 *
 * @param {IconButtonProps} props
 */
function IconButton({
  className,
  variant,
  size,
  theme,
  isLoading = false,
  isDisabled = false,
  asChild = false,
  disabled,
  icon,
  ref,
  children,
  ...props
}: IconButtonProps) {
  // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
  const isIconButtonDisabled = isLoading || isDisabled || disabled;

  // asChild で差し込まれたのが native の <button> なら、button 専用の props を渡してよい。
  // Slot は子の props を優先するため、差し込み側が明示した type はそのまま尊重される
  // en: When the slotted element is a native <button>, button-only props can be forwarded.
  // Slot gives the child's props precedence, so an explicit `type` on the child still wins.
  const isSlottedNativeButton =
    asChild && React.isValidElement(children) && children.type === "button";
  const canUseButtonProps = !asChild || isSlottedNativeButton;

  if (process.env.NODE_ENV !== "production") {
    const slottedChild = React.isValidElement(children) ? children : undefined;
    const slottedChildProps = slottedChild?.props as
      | {
          "aria-label"?: string;
          "aria-labelledby"?: string;
          children?: React.ReactNode;
        }
      | undefined;

    // アイコンのみのボタンには aria-label が必要（WCAG 1.1.1）。
    // asChild では差し込んだ要素側のテキストやラベルでも名前が付くため、そちらも見る
    // en: Icon-only buttons require aria-label (WCAG 1.1.1). With asChild the slotted
    // element's own text or label can provide the name, so check it too.
    const hasAccessibleName =
      Boolean(props["aria-label"] || props["aria-labelledby"]) ||
      Boolean(
        slottedChildProps?.["aria-label"] ||
          slottedChildProps?.["aria-labelledby"]
      ) ||
      (asChild && React.Children.count(slottedChildProps?.children) > 0);

    if (!hasAccessibleName) {
      console.warn(
        "[IconButton] アイコンのみのボタンには aria-label を指定してください（WCAG 1.1.1）。" +
          " / Icon-only buttons require aria-label (WCAG 1.1.1)."
      );
    }

    // asChild で単一要素以外を渡すと、Slot が何も描画しない / React が例外を投げる
    // en: With asChild, anything other than a single element makes Slot render nothing or React throw.
    if (asChild && !slottedChild) {
      console.warn(
        "[IconButton] asChild には単一の React 要素を children として渡してください。" +
          "要素以外では何も描画されず、複数要素では実行時エラーになります。" +
          " / asChild requires a single React element child: anything else renders nothing or throws."
      );
    }

    // children は asChild のときだけ意味を持つ（通常時はアイコンのみを描画する）
    // en: `children` is only meaningful with asChild; otherwise only the icon is rendered.
    if (!asChild && React.Children.count(children) > 0) {
      console.warn(
        "[IconButton] asChild を付けていない IconButton の children は描画されません。" +
          "アイコン以外のコンテンツが必要な場合は Button を使ってください。" +
          " / children are not rendered without asChild — use Button when you need content besides the icon."
      );
    }
  }

  const Comp = asChild ? SlotPrimitive.Slot : "button";

  // アイコンのサイズをボタンサイズに合わせて設定
  const getIconSize = () => {
    switch (size) {
      case "xs":
        return 3;
      case "sm":
        return 5;
      case "lg":
        return 7;
      default:
        return 6;
    }
  };

  const {
    onClick,
    onKeyDown,
    onClickCapture,
    onKeyDownCapture,
    type,
    ...restProps
  } = props;

  // 無効時のガードは capture フェーズで行う。Radix Slot は「差し込んだ要素自身のハンドラ →
  // Slot 側のハンドラ」の順で合成するため、bubble フェーズのガードでは子のハンドラを止められない
  // en: Guard in the capture phase. Radix Slot composes handlers as "the slotted element's own
  // handler first, then the slot's", so a bubble-phase guard cannot stop the child's handler.
  const handleClickCapture: React.MouseEventHandler<HTMLElement> = event => {
    if (isIconButtonDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClickCapture?.(event);
  };

  const handleKeyDownCapture: React.KeyboardEventHandler<
    HTMLElement
  > = event => {
    if (isIconButtonDisabled) {
      // asChild で <a> 等を差し込んだ場合に Enter / Space での実行を止める。
      // それ以外のキー（Escape 等）は上位に伝播させる
      // en: Block activation keys when used with asChild (e.g., <a>); let other keys
      // such as Escape keep propagating.
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    onKeyDownCapture?.(event);
  };

  const handleClick: React.MouseEventHandler<HTMLElement> = event => {
    if (isIconButtonDisabled) {
      return;
    }
    onClick?.(event);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
    if (isIconButtonDisabled) {
      return;
    }
    onKeyDown?.(event);
  };

  return (
    <Comp
      // asChild ケースで <a> 等を受け入れるため公開 API は HTMLElement で広く受けるが、
      // 内部の Comp は <button> 固定の union が含まれるためここで narrow する。
      // en: Public ref is HTMLElement (covers asChild targets); inner Comp's button branch needs narrowing.
      ref={ref as React.Ref<HTMLButtonElement>}
      type={canUseButtonProps ? type || "button" : undefined}
      aria-disabled={
        !canUseButtonProps && isIconButtonDisabled ? true : undefined
      }
      data-disabled={asChild && isIconButtonDisabled ? "true" : undefined}
      className={cn(
        iconButtonVariants({
          variant,
          size,
          theme,
          isLoading,
          // native の disabled だけを渡された場合も無効状態のスタイルを当てる
          // en: Apply the disabled styles even when only the native `disabled` prop is passed.
          isDisabled: Boolean(isDisabled || disabled),
          className,
        })
      )}
      disabled={canUseButtonProps ? isIconButtonDisabled : undefined}
      onClickCapture={handleClickCapture}
      onKeyDownCapture={handleKeyDownCapture}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {/* asChild では差し込んだ要素の中身を保ったまま、その内側にアイコンを描画する */}
      {/* en: In asChild mode, keep the slotted element's own children and render the icon inside it. */}
      {asChild && <SlotPrimitive.Slottable>{children}</SlotPrimitive.Slottable>}
      {isLoading ? (
        <Spinner size={getIconSize()} className="text-current" />
      ) : (
        <Icon icon={icon} size={getIconSize()} />
      )}
    </Comp>
  );
}

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
