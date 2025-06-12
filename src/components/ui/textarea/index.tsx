import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * テキストエリアは複数行のテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。
 */
const textareaVariants = cva(
  // ベーススタイル
  "flex w-full rounded-md border bg-white ring-offset-background placeholder:text-base-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize",
  {
    variants: {
      // サイズバリアント（sm, md, lg）
      size: {
        sm: "px-2 py-1 min-h-[56px] character-2-regular-pro",
        md: "px-3 py-1 min-h-[56px] character-3-regular-pro",
        lg: "px-4 py-1 min-h-[64px] character-4-regular-pro",
      },
      // エラー状態のバリアント
      isInvalid: {
        true: "border-negative-500 hover:border-negative-600 focus-visible:border-negative-600",
        false:
          "border-base-200 hover:border-base-400 focus-visible:border-base-500",
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
        className: "border-negative-100 hover:border-negative-100",
      },
      // 無効状態かつ通常状態の場合
      {
        isInvalid: false,
        isDisabled: true,
        className: "border-base-100 hover:border-base-100",
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
  /** エラー状態かどうか */
  isInvalid?: boolean;
  /** 無効状態かどうか */
  isDisabled?: boolean;
}

/**
 * /**
 * テキストエリアは複数行のテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。
 *
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
