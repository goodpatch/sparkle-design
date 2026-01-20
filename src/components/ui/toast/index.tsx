/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
"use client";

import * as React from "react";
// eslint-disable-next-line import/no-unresolved -- SonnerはESMのエクスポート構造によりLintの解決が失敗するため。 en: Sonner's ESM export map confuses the lint resolver.
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ToastClassnames,
  type ToasterProps as SonnerToasterProps,
} from "sonner";

import { cn } from "@/lib/utils";

export type { ExternalToast, ToastClassnames, ToastT } from "sonner";

export { sonnerToast as toastFn };

export type ToastToasterProps = React.ComponentProps<typeof SonnerToaster>;

const baseClassNames: Partial<Record<keyof ToastClassnames, string>> = {
  toast:
    "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-border-subtle bg-surface shadow-elevation-3 p-4",
  title: "character-3-medium-pro text-foreground",
  description: "character-4-regular-pro text-foreground-subtle",
  actionButton:
    "character-4-medium-pro inline-flex items-center justify-center rounded-button border border-border-strong bg-surface-strong px-3 py-2 transition-colors hover:bg-surface-strong/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  closeButton:
    "inline-flex size-7 items-center justify-center rounded-full border border-border-subtle text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
};

function mergeClassNames(
  overrides?: ToastClassnames
): ToastClassnames | undefined {
  if (!overrides) {
    return baseClassNames as ToastClassnames;
  }

  return Object.entries(baseClassNames).reduce<ToastClassnames>(
    (acc, [key, base]) => {
      acc[key as keyof ToastClassnames] = cn(
        base,
        overrides[key as keyof ToastClassnames]
      );
      return acc;
    },
    { ...overrides }
  );
}

/**
 * **概要 / Overview**
 *
 * - Toastコンポーネントは shadcn/ui の Sonner をベースに、ユーザー操作のフィードバックや通知を非同期に表示します。
 * - en: The Toast component wraps shadcn/ui's Sonner to present asynchronous feedback and lightweight notifications to users.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <>
 *   <ToastToaster />
 *   <Button onClick={() => toast("保存しました", { description: "1件の変更が反映されました" })}>
 *     トーストを表示
 *   </Button>
 * </>
 * ```
 *
 * @param {ToastToasterProps} props
 */
export function ToastToaster({
  className,
  toastOptions,
  ...props
}: ToastToasterProps) {
  const mergedToastOptions: SonnerToasterProps["toastOptions"] = {
    duration: 4000,
    closeButton: true,
    ...toastOptions,
    classNames: mergeClassNames(toastOptions?.classNames),
  };

  return (
    <SonnerToaster
      data-slot="toast-toaster"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6",
        className
      )}
      toastOptions={mergedToastOptions}
      {...props}
    />
  );
}
