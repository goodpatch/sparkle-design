/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * **概要 / Overview**
 *
 * - テキストエリアは複数行のテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Textarea component is used to capture user input in the form of multi-line text fields.
 */
const textareaVariants = cva(
  // ベーススタイル
  "flex w-full rounded-action border bg-surface-base-0 px-3 py-1 ring-offset-background placeholder:text-text-neutral-low focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2 resize",
  {
    variants: {
      // サイズバリアント（sm, md, lg）
      size: {
        sm: "min-h-[56px] character-2-regular-pro",
        md: "min-h-[56px] character-3-regular-pro",
        lg: "min-h-[64px] character-4-regular-pro",
      },
      // エラー状態のバリアント
      isInvalid: {
        true: "border-border-negative-extra-high-enabled hover:border-border-negative-extra-high-hover focus-visible:border-border-negative-extra-high-hover",
        false:
          "border-border-neutral-extra-high-enabled hover:border-border-neutral-extra-high-hover focus-visible:border-border-neutral-extra-high-hover",
      },
      // 無効状態のバリアント
      isDisabled: {
        false: "",
        true: "cursor-not-allowed text-text-neutral-disabled placeholder:text-text-neutral-disabled focus-visible:ring-0",
      },
    },
    // 複合バリアント（複数の状態の組み合わせ）
    compoundVariants: [
      // 無効状態かつエラー状態の場合
      {
        isInvalid: true,
        isDisabled: true,
        className:
          "bg-surface-neutral-middle-disabled border-border-negative-extra-high-disabled hover:border-border-negative-extra-high-disabled",
      },
      // 無効状態かつ通常状態の場合
      {
        isInvalid: false,
        isDisabled: true,
        className:
          "bg-surface-neutral-middle-disabled border-border-neutral-extra-high-disabled hover:border-border-neutral-extra-high-disabled",
      },
    ],
    // デフォルト値
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

/**
 * テキストエリアコンポーネントのプロパティ定義
 * 標準のTextarea属性に加えてバリアントプロパティを拡張
 */
export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  /**
   * エラー状態かどうか
   * en: Whether the textarea is in an error state
   */
  isInvalid?: boolean;
  /**
   * 無効状態かどうか
   * en: Whether the textarea is disabled
   */
  isDisabled?: boolean;
}

/**
 * **概要 / Overview**
 *
 * - テキストエリアは複数行のテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Textarea component is used to capture user input in the form of multi-line text fields.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Textarea size="md" placeholder="複数行のテキストを入力してください" />
 * ```
 *
 * @param {TextareaProps} props
 */
function Textarea({
  className,
  isInvalid,
  size,
  isDisabled,
  disabled,
  ref,
  ...props
}: TextareaProps) {
  // 後方互換性のため、isDisabledが優先、次にdisabledを使用
  const isTextareaDisabled = isDisabled ?? disabled;

  return (
    <textarea
      aria-invalid={isInvalid || undefined}
      className={cn(
        textareaVariants({
          size,
          isInvalid,
          isDisabled: isTextareaDisabled,
        }),
        className
      )}
      disabled={isTextareaDisabled}
      ref={ref}
      {...props}
    />
  );
}

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
