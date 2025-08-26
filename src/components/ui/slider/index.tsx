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

const sliderRangeVariants = cva("absolute h-full bg-primary-500", {
  variants: {
    isDisabled: {
      true: "bg-neutral-200",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const sliderThumbVariants = cva(
  [
    "block rounded-full border border-neutral-500 bg-white shadow-raise",
    "ring-offset-background transition-colors hover:bg-neutral-100",
    "focus:outline-hidden focus:bg-primary-100 focus:border-primary-200",
    "focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2",
    "h-4 w-4",
  ].join(" "),
  {
    variants: {
      isDisabled: {
        true: "pointer-events-none bg-neutral-100 hover:bg-neutral-100 border-none",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
type SliderPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>;

export interface SliderProps extends SliderPrimitiveProps {
  /**
   * スライダーが無効化されているかどうか
   * en: Whether the slider is disabled
   */
  isDisabled?: SliderVariantProps["isDisabled"];
  /**
   * スライダーの最大値
   * en: The maximum value of the slider
   */
  max?: SliderPrimitiveProps["max"];
  /**
   * スライダーの最小値
   * en: The minimum value of the slider
   */
  min?: SliderPrimitiveProps["min"];
  /**
   * スライダーのステップ値
   * en: The step value of the slider
   */
  step?: SliderPrimitiveProps["step"];
  /**
   * スライダーの向き
   * en: The orientation of the slider
   */
  orientation?: SliderPrimitiveProps["orientation"];
  /**
   * スライダーの値
   * en: The value of the slider
   */
  value?: SliderPrimitiveProps["value"];
  /**
   * スライダーの値が変更されたときに呼び出されるコールバック
   * en: Callback invoked when the value of the slider changes
   */
  onValueChange?: SliderPrimitiveProps["onValueChange"];
}

/**
 * **概要 / Overview**
 *
 * - スライダーは任意の範囲の中からユーザーに特定の数値を選択してもらうために使用するコンポーネントです。
 * - en: The Slider component is used to select a value within a range.
 *
 * **使用例 / Usage Example**
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
 *
 * @param {SliderProps} props
 */
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
      <SliderPrimitive.Track
        className={cn(
          "relative w-full grow overflow-hidden rounded-xs h-1",
          isDisabledState ? "bg-neutral-100" : "bg-neutral-200"
        )}
      >
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
