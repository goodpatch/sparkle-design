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
          "disabled:bg-surface-primary-high-disabled disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-high-disabled disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-high-disabled disabled:text-object-inverse",
      },
      {
        variant: "outline",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled disabled:border-border-primary-low",
      },
      {
        variant: "outline",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled disabled:border-border-neutral-low",
      },
      {
        variant: "outline",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled disabled:border-border-negative-low",
      },
      {
        variant: "ghost",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled",
      },
      {
        variant: "ghost",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled",
      },
      {
        variant: "ghost",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled",
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
export interface IconButtonProps extends React.ComponentProps<"button"> {
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
   * ボタンを別コンポーネントの子としてレンダリングするか
   * en: Whether to render the button as a child component
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

  // アイコンのみのボタンには aria-label が必要（WCAG 1.1.1）
  // en: Icon-only buttons require aria-label (WCAG 1.1.1)
  if (process.env.NODE_ENV !== "production") {
    if (!asChild && !props["aria-label"] && !props["aria-labelledby"]) {
      console.warn(
        "[IconButton] アイコンのみのボタンには aria-label を指定してください（WCAG 1.1.1）。" +
          " / Icon-only buttons require aria-label (WCAG 1.1.1)."
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

  return (
    <Comp
      ref={ref}
      type="button"
      className={cn(
        iconButtonVariants({
          variant,
          size,
          theme,
          isLoading,
          isDisabled,
          className,
        })
      )}
      disabled={isIconButtonDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size={getIconSize()} className="text-current" />
        </>
      ) : (
        <Icon icon={icon} size={getIconSize()} />
      )}
    </Comp>
  );
}

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
