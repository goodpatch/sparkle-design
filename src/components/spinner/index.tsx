import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {}

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
          name="progress_activity"
          className={cn("animate-spin", className)}
        />
      </span>
    );
  }
);

Spinner.displayName = "Spinner";
