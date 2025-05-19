"use client";

import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radioGroupVariants = cva("grid gap-2");

const labelVariants = cva("", {
  variants: {
    size: {
      sm: "character-2-regular-pro",
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-base-200",
      false: "text-base-900",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const radioItemVariants = cva(
  "relative rounded-full transition-colors flex items-center justify-center",
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
  "relative rounded-full border border-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "border-negative-500 data-[state=checked]:bg-negative-500",
        false:
          "border-base-500 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500",
      },
      isDisabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDisabled: false,
        isInvalid: false,
        className:
          "hover:border-base-600 data-[state=checked]:hover:bg-primary-600 data-[state=checked]:hover:border-primary-600",
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
        className:
          "border-base-200 data-[state=checked]:bg-primary-200　data-[state=checked]:border-primary-200",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className:
          "border-negative-200 data-[state=checked]:bg-negative-200 data-[state=checked]:border-negative-200",
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

interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item> {
  /**
   * ラジオボタンのサイズ
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * エラー状態かどうか
   * @default false
   */
  isInvalid?: boolean;
  /**
   * ラベルのテキスト
   */
  label?: string;
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioPrimitive.Root
      className={cn(radioGroupVariants(), className)}
      {...props}
      ref={ref}
    />
  );
});
Radio.displayName = RadioPrimitive.Root.displayName;

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Item>,
  RadioItemProps
>(
  (
    {
      className,
      size = "md",
      isInvalid = false,
      disabled = false,
      label,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-center">
        <div className={cn(radioItemVariants({ size }))}>
          <RadioPrimitive.Item
            ref={ref}
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
);
RadioItem.displayName = RadioPrimitive.Item.displayName;

export { Radio, RadioItem };
export type { RadioItemProps };
