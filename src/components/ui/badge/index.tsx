import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-white text-center justify-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        class: "outline-white outline-2",
      },
      {
        isGapped: true,
        size: "x4s",
        class: "outline-white outline-2",
      },
      {
        isGapped: true,
        size: "x3s",
        class: "outline-white outline-4",
      },
      {
        isGapped: true,
        size: "x2s",
        class: "outline-white outline-4",
      },
      {
        isGapped: true,
        size: "xs",
        class: "outline-white outline-4",
      },
      {
        isGapped: true,
        size: "sm",
        class: "outline-white outline-4",
      },
      {
        isGapped: true,
        size: "md",
        class: "outline-white outline-4",
      },
      // 数字がない場合はheightを指定
      {
        isNumberVisible: false,
        size: "x2s",
        class: "h-5",
      },
      {
        isNumberVisible: false,
        size: "xs",
        class: "h-6",
      },
      {
        isNumberVisible: false,
        size: "sm",
        class: "h-7",
      },
      {
        isNumberVisible: false,
        size: "md",
        class: "h-8",
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
  /**
   * 数字表示するかどうか
   * en: Whether to display numbers
   */
  isNumberVisible?: boolean;
  /**
   * 隙間を設けるかどうか
   * en: Whether to add gaps
   */
  isGapped?: boolean;
}

/**
 * ## 概要 / Overview
 *
 * - バッジは特定の要素に対して通知の数やタスクの数などの数値情報を付与するために使用するコンポーネントです。
 * - en: The Badge component is used to attach numerical information such as notification counts or task counts to specific elements.
 *
 * ## プロパティ / Props
 *
 * @param props.isNumberVisible 数字を表示するかどうか /
 * en: Whether to display numbers
 * @param props.isGapped 隙間を設けるかどうか /
 * en: Whether to add gaps
 * @param props.size バッジのサイズ /
 * en: Size of the badge
 * @param props.status バッジのステータス色 /
 * en: Status color of the badge
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Badge size="md" status="info">5</Badge>
 * ```
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

  // childrenがない場合はisNumberVisibleがfalseの扱いにする
  if (!children) {
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
