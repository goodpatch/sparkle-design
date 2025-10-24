"use client";

import * as React from "react";
// eslint-disable-next-line import/no-unresolved -- SonnerはESMのエクスポート構造によりLintの解決が失敗するため。 en: Sonner's ESM export map confuses the lint resolver.
import { Toaster, toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";

export type { ExternalToast, ToastClassnames, ToastT } from "sonner";

const toastVariants = cva(
  "shadow-float px-3 py-2 text-neutral-50 flex w-[320px] rounded-notice gap-2",
  {
    variants: {
      variant: {
        neutral: "bg-neutral-700",
        success: "bg-success-500",
        negative: "bg-negative-500",
      },
    },
  }
);

type ReactToastProps = React.ComponentProps<typeof Toaster>;
type ToastVariant = VariantProps<typeof toastVariants>;
export interface ToastProps extends Omit<ReactToastProps, "id">, ToastVariant {
  /**
   * トーストの識別子
   * en: Identifier of the toast
   */
  id?: string | number;
  /**
   * トーストのタイトル
   * en: Title of the toast
   */
  title: string;
  /**
   * トーストの説明
   * en: Description of the toast
   */
  description?: string;
  /**
   * トーストのバリアント
   * en: Variant of the toast
   */
  variant?: ToastVariant["variant"];
  /**
   * トーストの表示時間（ミリ秒）
   * en: Duration of the toast (in milliseconds)
   */
  duration?: ReactToastProps["duration"];
  /**
   * トーストの表示位置
   * en: Position of the toast
   */
  position?: ReactToastProps["position"];
}

/**
 * **概要 / Overview**
 *
 * - トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。
 * - en: Toasts are used to provide feedback to users when actions occur.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <>
 *   <Toaster />
 *   <Button onClick={() => toast({
 *     title: "保存しました",
 *     description: "1件の変更が反映されました",
 *     variant: "success",
 *   })}>
 *     トーストを表示
 *   </Button>
 * </>
 * ```
 *
 * @param {ToastProps} props
 */
export function Toast({
  className,
  variant = "neutral",
  title,
  description,
  id,
}: ToastProps) {
  const ToastIcon = () => {
    switch (variant) {
      case "success":
        return <Icon icon="check_circle" size={6} fill />;
      case "negative":
        return <Icon icon="error" size={6} fill />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(toastVariants({ variant }), className)}>
      <ToastIcon />
      <div className="gap-0 px-1 grow">
        <p className="character-3-bold-pro">{title}</p>
        {description && (
          <p
            className={cn(
              "character-3-regular-pro",
              variant === "neutral" ? "text-neutral-100" : ""
            )}
          >
            {description}
          </p>
        )}
      </div>
      <IconButton
        icon="close"
        size="sm"
        variant="ghost"
        theme="neutral"
        onClick={() => {
          sonnerToast.dismiss(id);
        }}
        className="text-neutral-50 hover:bg-neutral-700 active:bg-neutral-800"
      />
    </div>
  );
}

export function toast(toast: Omit<ToastProps, "id">) {
  const { title, description, variant, ...rest } = toast;
  return sonnerToast.custom(
    id => (
      <Toast
        title={title}
        description={description}
        variant={variant}
        id={id}
      />
    ),
    {
      ...rest,
    }
  );
}

export { Toaster };
