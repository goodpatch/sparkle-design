"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sliderRootVariants = cva(
  "relative flex w-full touch-none select-none items-center py-1.5",
  {
    variants: {
      isDisabled: {
        true: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-sm bg-neutral-200 h-1"
);

const sliderRangeVariants = cva("absolute h-full bg-primary-500", {
  variants: {
    isDisabled: {
      true: "bg-primary-200",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const sliderThumbVariants = cva(
  "block rounded-full border border-neutral-200 bg-white shadow-raise ring-offset-background transition-colors hover:bg-neutral-100 focus:outline-hidden focus:bg-primary-100 focus:border-primary-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 h-4 w-4",
  {
    variants: {
      isDisabled: {
        true: "pointer-events-none bg-neutral-100 hover:bg-neutral-100 focus:bg-neutral-300 focus:border-neutral-300",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

/**
 * ## 概要 / Overview
 *
 * - スライダーは、範囲内の値を選択するために使用するコンポーネントです。
 * - en: The Slider component is used to select a value within a range.
 *
 * ## プロパティ / Props
 *
 * @param props.value 現在の値の配列 /
 * en: Array of current values
 * @param props.onValueChange 値が変更されたときのコールバック /
 * en: Callback function called when the value changes
 * @param props.min 最小値 /
 * en: Minimum value
 * @param props.max 最大値 /
 * en: Maximum value
 * @param props.step ステップ値 /
 * en: Step value
 * @param props.isDisabled スライダーが無効化されているかどうか /
 * en: Whether the slider is disabled
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Slider
 *   value={[50]}
 *   onValueChange={setValue}
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 * ```
 */
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderRootVariants> {
  /**
   * スライダーが無効化されているかどうか
   * en: Whether the slider is disabled
   */
  isDisabled?: boolean;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, isDisabled, disabled, ...props }, ref) => {
  const isDisabledState = Boolean(isDisabled || disabled);

  return (
    <SliderPrimitive.Root
      ref={ref}
      disabled={isDisabledState}
      aria-disabled={isDisabledState}
      className={cn(
        sliderRootVariants({ isDisabled: isDisabledState }),
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn(sliderTrackVariants())}>
        <SliderPrimitive.Range
          className={cn(sliderRangeVariants({ isDisabled: isDisabledState }))}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(sliderThumbVariants({ isDisabled: isDisabledState }))}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
