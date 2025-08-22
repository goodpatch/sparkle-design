"use client";

import * as React from "react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva("cursor-pointer", {
  variants: {
    size: {
      sm: "character-2-regular-pro",
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-text-disabled cursor-not-allowed",
      false: "text-text-medium",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const radioItemVariants = cva(
  "relative rounded-full transition-colors flex items-center justify-center cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      isInvalid: {
        true: "",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

const radioIndicatorVariants = cva(
  [
    "relative rounded-full border border-2 data-[state=checked]:border-none",
    "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2",
    "transition-colors cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "border-negative-500 data-[state=checked]:bg-negative-500",
        false: "border-neutral-500 data-[state=checked]:bg-primary-500",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDisabled: false,
        isInvalid: false,
        className:
          "hover:border-neutral-600 data-[state=checked]:hover:bg-primary-600",
      },
      {
        isDisabled: false,
        isInvalid: true,
        className:
          "hover:border-negative-600 data-[state=checked]:hover:bg-negative-600",
      },
      {
        isDisabled: true,
        isInvalid: false,
        className: "border-neutral-200 data-[state=checked]:bg-primary-100",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className: "border-negative-200 data-[state=checked]:bg-negative-200",
      },
    ],
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

const radioIndicatorDotVariants = cva("absolute rounded-full bg-white", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioPrimitiveProps = React.ComponentProps<typeof RadioPrimitive.Root>;
export interface RadioProps extends RadioPrimitiveProps {
  /**
   * ラジオのデフォルト値
   * en: Default value of the radio group
   */
  defaultValue?: RadioPrimitiveProps["defaultValue"];
  /**
   * ラジオの値が変更されたときのコールバック
   * en: Callback when the radio value changes
   */
  onValueChange?: RadioPrimitiveProps["onValueChange"];
}

/**
 * **概要 / Overview**
 *
 * - ラジオボタンは単一選択の形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Radio component is used to select one option from multiple choices.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Radio value="option1" onValueChange={setValue}>
 *   <RadioItem value="option1" label="オプション1" />
 *   <RadioItem value="option2" label="オプション2" />
 * </Radio>
 * ```
 *
 * @param props
 */
function Radio({ className, ...props }: RadioProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-y-2 gap-x-4", className)}
      {...props}
    />
  );
}
Radio.displayName = RadioPrimitive.Root.displayName;

type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
type RadioPrimitiveItemProps = React.ComponentPropsWithoutRef<
  typeof RadioPrimitive.Item
>;
interface RadioItemProps extends RadioPrimitiveItemProps {
  /**
   * ラジオボタンのサイズ
   * en: Radio button size
   * @default "md"
   */
  size?: RadioItemVariantProps["size"];
  /**
   * エラー状態かどうか
   * en: Whether the radio button is in an error state
   * @default false
   */
  isInvalid?: RadioItemVariantProps["isInvalid"];
  /**
   * ラジオボタンが無効かどうか
   * en: Whether the radio button is disabled
   * @default false
   */
  disabled?: RadioPrimitiveItemProps["disabled"];
  /**
   * ラベルのテキスト
   * en: Label text for the radio button
   */
  label?: string;
}

/**
 * **概要 / Overview**
 *
 * - ラジオボタンのアイテムコンポーネントです。
 * - en: Individual radio button item component.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <RadioItem value="option1" label="オプション1" size="md" />
 * ```
 *
 * @param {RadioItemProps} props
 */
function RadioItem({
  className,
  size = "md",
  isInvalid = false,
  disabled = false,
  label,
  id,
  ...props
}: RadioItemProps) {
  return (
    <div className="flex items-center">
      <div className={cn(radioItemVariants({ size, isDisabled: disabled }))}>
        <RadioPrimitive.Item
          data-slot="radio-group-item"
          id={id}
          className={cn(
            radioIndicatorVariants({ size, isInvalid, isDisabled: disabled })
          )}
          disabled={disabled}
          {...props}
        >
          <RadioPrimitive.Indicator className="flex items-center justify-center">
            <div className={cn(radioIndicatorDotVariants({ size }))} />
          </RadioPrimitive.Indicator>
        </RadioPrimitive.Item>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(labelVariants({ size, isDisabled: disabled }))}
        >
          {label}
        </label>
      )}
    </div>
  );
}
RadioItem.displayName = RadioPrimitive.Item.displayName;

export { Radio, RadioItem };
export type { RadioItemProps };
