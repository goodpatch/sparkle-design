"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

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
    "block rounded-full border border-neutral-500 bg-white shadow-raise cursor-pointer",
    "ring-offset-background transition-colors hover:bg-neutral-100",
    "focus:outline-hidden focus:bg-primary-100 focus:border-primary-200",
    "focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2",
    "h-4 w-4",
  ].join(" "),
  {
    variants: {
      isDisabled: {
        true: "pointer-events-none bg-neutral-100 hover:bg-neutral-100 border-none cursor-not-allowed",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
type SliderPrimitiveProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  // NOTE: Sparkle Designでは横方向のみのスライダーをサポートしています
  "orientation"
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
   * スライダーの値（制御コンポーネント用）
   * en: The value of the slider (for controlled component)
   */
  value?: SliderPrimitiveProps["value"];
  /**
   * スライダーの初期値（非制御コンポーネント用）
   * en: The default value of the slider (for uncontrolled component)
   */
  defaultValue?: SliderPrimitiveProps["defaultValue"];
  /**
   * スライダーの値が変更されたときに呼び出されるコールバック
   * en: Callback invoked when the value of the slider changes
   */
  onValueChange?: SliderPrimitiveProps["onValueChange"];
  /**
   * スライダーの単位表示を設定
   * en: Set the unit display of the slider
   */
  unit?: string;
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
>(
  (
    {
      className,
      isDisabled,
      disabled,
      value,
      defaultValue,
      onValueChange,
      unit,
      ...props
    },
    ref
  ) => {
    const isDisabledState = Boolean(isDisabled || disabled);

    // 現在の値を取得（制御/非制御コンポーネントに対応）
    const [currentValue, setCurrentValue] = useState(
      value || defaultValue || [0]
    );
    const handleValueChange = useCallback(
      (newValue: number[]) => {
        setCurrentValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    return (
      <div className="flex justify-center gap-3 w-full">
        <SliderPrimitive.Root
          ref={ref}
          disabled={isDisabledState}
          aria-disabled={isDisabledState}
          className={cn(
            sliderRootVariants({ isDisabled: isDisabledState }),
            className
          )}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          {...props}
        >
          <SliderPrimitive.Track
            className={cn(
              "relative w-full grow overflow-hidden rounded-xs h-1",
              isDisabledState
                ? "bg-neutral-100 cursor-not-allowed"
                : "bg-neutral-200 cursor-pointer"
            )}
          >
            <SliderPrimitive.Range
              className={cn(
                sliderRangeVariants({ isDisabled: isDisabledState })
              )}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(sliderThumbVariants({ isDisabled: isDisabledState }))}
          />
        </SliderPrimitive.Root>
        <span
          className={cn(
            "min-w-10 text-left tabular-nums character-3-regular-pro",
            isDisabledState
              ? "text-text-disabled cursor-not-allowed"
              : "text-text-middle"
          )}
        >
          {currentValue[0]}
          {unit}
        </span>
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
