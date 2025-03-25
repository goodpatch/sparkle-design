import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      isNumberVisible: {
        true: "",
        false: "",
      },
      size: {
        x5s: "w-2 h-2 min-w-2",
        x4s: "w-3 h-3 min-w-3",
        x3s: "w-4 h-4 min-w-4",
        x2s: "min-w-5 py-0 px-1.5 character-1-bold-mono",
        xs: "min-w-6 py-0.5 px-1.5 character-1-bold-mono",
        sm: "min-w-7 py-0.5 px-2 character-2-bold-mono",
        md: "min-w-8 py-1 px-2 character-3-bold-mono",
      },
      status: {
        info: "bg-info-500",
        success: "bg-success-500",
        negative: "bg-negative-500",
      },
      isGapped: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // isGappedのボーダー設定
      {
        isGapped: true,
        size: "x5s",
        class: "border-white border-2",
      },
      {
        isGapped: true,
        size: "x4s",
        class: "border-white border-2",
      },
      {
        isGapped: true,
        size: "x3s",
        class: "border-white border-4",
      },
      {
        isGapped: true,
        size: "x2s",
        class: "border-white border-4",
      },
      {
        isGapped: true,
        size: "xs",
        class: "border-white border-4",
      },
      {
        isGapped: true,
        size: "sm",
        class: "border-white border-4",
      },
      {
        isGapped: true,
        size: "md",
        class: "border-white border-4",
      },
    ],
    defaultVariants: {
      isNumberVisible: true,
      size: "md",
      status: "info",
      isGapped: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
      isNumberVisible?: boolean;
      isGapped?: boolean;
    }

/**
 * バッジは特定の要素に対して通知の数やタスクの数などの数値情報を付与するために使用するコンポーネントです。
 */
function Badge({
  className,
  isNumberVisible = true,
  size,
  status,
  isGapped = false,
  children,
  ...props
}: BadgeProps) {
  // 3xs以下のサイズの場合は、文字を非表示にする
  if (size === "x5s" || size === "x4s" || size === "x3s") {
    isNumberVisible = false;
  }

  return (
    <div
      className={cn(
        badgeVariants({ isNumberVisible, size, status, isGapped }),
        className
      )}
      {...props}
    >
      {isNumberVisible && children}
    </div>
  );
}

export { Badge, badgeVariants };
