import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-white text-center justify-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        normal: "bg-info-500",
        emphasis: " bg-negative-500",
      },
      isNumberVisible: {
        true: "",
        false: "",
      },
      size: {
        xs: "w-2 h-2 min-w-2",
        sm: "w-4 h-4 min-w-4",
        md: "min-w-6 py-0.5 px-1.5 character-1-bold-mono",
        lg: "min-w-8 py-1 px-1.5 character-3-bold-mono",
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
        size: "xs",
        class: "outline-white outline-2",
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
      {
        isGapped: true,
        size: "lg",
        class: "outline-white outline-4",
      },
      // 数字がない場合はheightを指定
      {
        isNumberVisible: false,
        size: "md",
        class: "h-6",
      },
      {
        isNumberVisible: false,
        size: "lg",
        class: "h-8",
      },
    ],
    defaultVariants: {
      isNumberVisible: true,
      size: "md",
      variant: "normal",
      isGapped: false,
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * バッジのサイズ
   * en: Size of the badge
   */
  size?: BadgeVariants["size"];
  /**
   * バッジのバリエーション
   * en: Variation of the badge
   */
  variant?: BadgeVariants["variant"];
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
 * **概要 / Overview**
 *
 * - バッジは特定の要素に対して通知の数やタスクの数などの数値情報を付与するために使用するコンポーネントです。
 * - en: The Badge component is used to attach numerical information such as notification counts or task counts to specific elements.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Badge size="md" variant="normal">5</Badge>
 * ```
 *
 * @param {BadgeProps} props
 */
function Badge({
  className,
  isNumberVisible = true,
  size,
  variant = "normal",
  isGapped = false,
  children,
  ...props
}: BadgeProps) {
  // sm以下のサイズの場合は、文字を非表示にする
  if (size === "sm" || size === "xs") {
    isNumberVisible = false;
  }

  // childrenがない場合はisNumberVisibleがfalseの扱いにする
  if (!children) {
    isNumberVisible = false;
  }

  return (
    <div
      className={cn(
        badgeVariants({ isNumberVisible, size, variant, isGapped }),
        className
      )}
      {...props}
    >
      {isNumberVisible && children}
    </div>
  );
}

export { Badge, badgeVariants };
