/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
import React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconSize } from "@/components/ui/icon";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * スピナーのサイズ（スケール値 1-12）
   * en: Size of the spinner (scale value 1-12)
   * @see IconSize
   */
  size?: IconSize;
}

/**
 * **概要 / Overview**
 *
 * - スピナーはダウンロード、アップロードなどのシステムによる処理の進行状況を視覚的に提示するために使用するコンポーネントです。
 * - en: The Spinner component is used to visually present the progress of system processing such as downloads and uploads.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Spinner size={6} />
 * ```
 *
 * @param {SpinnerProps} props
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center justify-center")}
        role="status"
        aria-label="読み込み中"
        data-testid="loading-spinner"
        {...props}
      >
        <Icon
          icon="progress_activity"
          size={size}
          className={cn("animate-spin text-text-low", className)}
        />
      </span>
    );
  }
);

Spinner.displayName = "Spinner";
