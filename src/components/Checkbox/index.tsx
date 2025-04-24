"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

const checkboxGroupVariants = cva("grid gap-2");

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

const checkboxItemVariants = cva(
  "relative rounded-sm transition-colors flex items-center justify-center",
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

const checkboxIndicatorVariants = cva(
  "rounded-sm border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "border-negative-500 data-[state=checked]:bg-negative-500 data-[state=checked]:border-none",
        false:
          "border-base-500 data-[state=checked]:bg-primary-500 data-[state=checked]:border-none",
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
          "hover:border-base-600 data-[state=checked]:hover:bg-primary-600",
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
          "border-base-200 data-[state=checked]:bg-primary-200 data-[state=checked]:border-primary-200",
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

interface CheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * チェックボックスのサイズ
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

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxItemProps
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
        <div className={cn(checkboxItemVariants({ size }))}>
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            className={cn(
              checkboxIndicatorVariants({
                size,
                isInvalid,
                isDisabled: disabled,
              })
            )}
            disabled={disabled}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              <Icon
                icon="check"
                size={(function () {
                  switch (size) {
                    case "sm":
                      return 4;
                    case "md":
                      return 5;
                    case "lg":
                      return 6;
                    default:
                      return 5;
                  }
                })()}
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
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
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
export type { CheckboxItemProps };
