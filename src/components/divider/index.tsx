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
    // {
    //   direction: "horizontal",
    //   lineStyle: "dashed",
    //   className: "bg-transparent border-t",
    // },
    // // 垂直方向の破線
    // {
    //   direction: "vertical",
    //   lineStyle: "dashed",
    //   className: "bg-transparent border-l",
    // },
  ],
  defaultVariants: {
    emphasis: "middle",
    lineStyle: "solid",
    direction: "horizontal",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

/**
 * Dividerコンポーネント
 * コンテンツの視覚的な区切りを提供します
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
