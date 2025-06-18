"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

const toastVariants = cva(
  "flex items-start gap-3 border rounded-md bg-background shadow-raise px-4 py-3",
  {
    variants: {
      status: {
        neutral: "border-neutral-300",
        success: "border-success-300 bg-success-50",
        negative: "border-negative-300 bg-negative-50",
      },
      isCloseButtonVisible: {
        true: "pr-2",
        false: "",
      },
    },
    defaultVariants: {
      status: "neutral",
      isCloseButtonVisible: true,
    },
  }
);

export interface ShowToastOptions extends VariantProps<typeof toastVariants> {
  /** トーストのタイトル */
  title?: React.ReactNode;
  /** トーストの説明文 */
  description?: React.ReactNode;
}

export function showToast({
  title,
  description,
  status = "neutral",
  isCloseButtonVisible = true,
}: ShowToastOptions) {
  sonnerToast.custom(
    (id) => (
      <div className={cn(toastVariants({ status, isCloseButtonVisible }))}>
        <div className="flex-1">
          {title && (
            <p className="character-3-bold-pro text-base-900">{title}</p>
          )}
          {description && (
            <p className="character-3-regular-pro text-base-700">
              {description}
            </p>
          )}
        </div>
        {isCloseButtonVisible && (
          <IconButton
            icon="close"
            variant="ghost"
            theme="secondary"
            size="sm"
            aria-label="閉じる"
            onClick={() => sonnerToast.dismiss(id)}
            className="shrink-0"
          />
        )}
      </div>
    ),
    { unstyled: true, classNames: { toast: "p-0 shadow-none" } }
  );
}

export interface ToastProps
  extends React.ComponentProps<typeof SonnerToaster> {}

/**
 * [Copilot Comment] トーストはアクションの発生時にユーザーへフィードバックを行うために使用するコンポーネントです。
 */
export const Toast = ({ ...props }: ToastProps) => {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{ duration: 3000 }}
      {...props}
    />
  );
};
Toast.displayName = "Toast";
