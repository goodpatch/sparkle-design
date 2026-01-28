/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
"use client";

import * as React from "react";
// eslint-disable-next-line import/no-unresolved -- SonnerはESMのエクスポート構造によりLintの解決が失敗するため。 en: Sonner's ESM export map confuses the lint resolver.
import { Toaster, toast as sonnerToast } from "sonner";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export type { ExternalToast, ToastClassnames, ToastT } from "sonner";

type ReactToastProps = React.ComponentProps<typeof Toaster>;
export interface ToastProps extends Omit<ReactToastProps, "id"> {
  /**
   * トーストの識別子
   * en: Identifier of the toast
   */
  id?: string | number;
  /**
   * トーストのタイトル
   * en: Title of the toast
   */
  title?: string;
  /**
   * トーストの説明
   * en: Description of the toast
   */
  description: string;
  /**
   * 閉じるボタンを表示するかどうか
   * en: Whether to show the close button
   */
  isCloseTrigger?: boolean;
  /**
   * トーストの表示時間（ミリ秒）
   * en: Duration of the toast (in milliseconds)
   */
  duration?: ReactToastProps["duration"];
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
  title,
  description,
  isCloseTrigger = true,
  id,
}: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        "shadow-float px-3 py-2 text-text-high flex w-[320px] rounded-notice gap-2 bg-neutral-50 border border-divider-middle",
        className
      )}
    >
      <div className="h-full flex flex-col justify-center gap-0 px-1 grow">
        {title && <p className="character-3-bold-pro min-h-8 flex items-center">{title}</p>}
        <p className="character-3-regular-pro min-h-8 flex items-center">{description}</p>
      </div>
      {isCloseTrigger && (
        <IconButton
          icon="close"
          size="sm"
          variant="ghost"
          theme="neutral"
          aria-label="閉じる"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}
        />
      )}
    </div>
  );
}

/**
 * - トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。
 * - en: Toasts are used to provide feedback to users when actions occur.
 */
export function toast(toast: Omit<ToastProps, "id" | "position">) {
  const { title, description, isCloseTrigger, ...rest } = toast;
  return sonnerToast.custom(
    id => (
      <Toast
        title={title}
        description={description}
        isCloseTrigger={isCloseTrigger}
        id={id}
      />
    ),
    {
      ...rest,
      position: "top-center",
    }
  );
}

export { Toaster };
