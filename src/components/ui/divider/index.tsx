/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Dividerのスタイル定義
const dividerVariants = cva("shrink-0", {
  variants: {
    emphasis: {
      low: "border-base-100 bg-base-100",
      middle: "border-base-200 bg-base-200",
      high: "border-base-300 bg-base-300",
    },
    lineStyle: {
      solid: "",
      dashed: "border-dashed",
    },
    direction: {
      horizontal: "w-full h-px",
      vertical: "h-full w-px",
    },
  },
  compoundVariants: [
    // 水平方向の破線
    {
      direction: "horizontal",
      lineStyle: "dashed",
      className: "bg-transparent border-t",
    },
    // 垂直方向の破線
    {
      direction: "vertical",
      lineStyle: "dashed",
      className: "bg-transparent border-l",
    },
  ],
  defaultVariants: {
    emphasis: "middle",
    lineStyle: "solid",
    direction: "horizontal",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /**
   * ディバイダーの強調度（low、middle、high）
   * en: Emphasis level of the divider (low, middle, high)
   */
  emphasis?: "low" | "middle" | "high";
  /**
   * 線のスタイル（solid、dashed）
   * en: Line style (solid, dashed)
   */
  lineStyle?: "solid" | "dashed";
  /**
   * ディバイダーの方向（horizontal、vertical）
   * en: Direction of the divider (horizontal, vertical)
   */
  direction?: "horizontal" | "vertical";
}

/**
 * **概要 / Overview**
 *
 * - ディバイダーコンポーネントはグループ内のコンテンツを視覚的に区切ってユーザーに提示する際に使用します。
 * - en: The Divider component is used to visually separate content within groups for users.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Divider emphasis="middle" lineStyle="solid" direction="horizontal" />
 * ```
 *
 * @param {DividerProps} props
 */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, emphasis, lineStyle, direction, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          dividerVariants({
            emphasis,
            lineStyle,
            direction,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
