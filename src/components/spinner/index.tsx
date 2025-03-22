import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * スピナーはダウンロード、アップロードなどのシステムによる処理の進行状況を視覚的に提示するために使用するコンポーネントです。
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center justify-center")}
        role="status"
        aria-label="読み込み中"
        {...props}
      >
        <Icon
          icon="progress_activity"
          className={cn("animate-spin", className)}
        />
      </span>
    );
  }
);

Spinner.displayName = "Spinner";
