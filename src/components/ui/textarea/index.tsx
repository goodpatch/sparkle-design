/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
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
  "flex w-full rounded-action border bg-white px-3 py-1 ring-offset-background placeholder:text-base-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2 resize",
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
        true: "border-negative-500 hover:border-negative-600 focus-visible:border-negative-600",
        false:
          "border-neutral-500 hover:border-neutral-600 focus-visible:border-neutral-600",
      },
      // 無効状態のバリアント
      isDisabled: {
        false: "",
        true: "cursor-not-allowed text-base-300 placeholder:text-base-300 focus-visible:ring-0",
      },
    },
    // 複合バリアント（複数の状態の組み合わせ）
    compoundVariants: [
      // 無効状態かつエラー状態の場合
      {
        isInvalid: true,
        isDisabled: true,
        className:
          "bg-neutral-50 border-negative-200 hover:border-negative-200",
      },
      // 無効状態かつ通常状態の場合
      {
        isInvalid: false,
        isDisabled: true,
        className: "bg-neutral-50 border-neutral-200 hover:border-neutral-200",
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
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
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
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, size, isDisabled, disabled, ...props }, ref) => {
    // 後方互換性のため、isDisabledが優先、次にdisabledを使用
    const isTextareaDisabled = isDisabled ?? disabled;

    return (
      <textarea
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
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
