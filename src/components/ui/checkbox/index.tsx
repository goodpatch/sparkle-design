"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const checkboxItemVariants = cva(
  "relative rounded-sm transition-colors flex items-center justify-center cursor-pointer",
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

const checkboxRootVariants = cva(
  "rounded-xs border-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors cursor-pointer",
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
        true: "cursor-not-allowed",
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

const checkboxLabelVariants = cva("cursor-pointer", {
  variants: {
    size: {
      sm: "character-2-regular-pro",
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-base-200 cursor-not-allowed",
      false: "text-base-900",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

interface CheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * チェックボックスのサイズ
   * en: Size of the checkbox
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * エラー状態かどうか
   * en: Whether the checkbox is in an error state
   * @default false
   */
  isInvalid?: boolean;
  /**
   * 無効状態かどうか
   * en: Whether the checkbox is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * 中間状態かどうか
   * en: Whether the checkbox is in an interminate state
   * @default false
   */
  isInterminate?: boolean;
  /**
   * ラベルのテキスト
   * en: Label text for the checkbox
   */
  label?: string;
}

/**
 * **概要 / Overview**
 *
 * - チェックボックスは複数のオプショングループから複数の項目を選択する形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Checkbox component is used to capture user input by selecting multiple items from multiple option groups.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Checkbox size="md" label="利用規約に同意する" />
 * ```
 *
 * @param {CheckboxItemProps} props
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxItemProps
>(
  (
    {
      className,
      size = "md",
      isInvalid = false,
      isDisabled = false,
      isInterminate = false,
      disabled,
      label,
      id,
      ...props
    },
    ref
  ) => {
    // isDisabledとdisabledの組み合わせで無効状態を管理
    const isCheckboxDisabled = isDisabled || disabled;

    return (
      <div className="flex items-center">
        <div
          className={cn(
            checkboxItemVariants({ size, isDisabled: isCheckboxDisabled })
          )}
        >
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            className={cn(
              checkboxRootVariants({
                size,
                isInvalid,
                isDisabled: isCheckboxDisabled,
              })
            )}
            disabled={isCheckboxDisabled}
            defaultChecked={isInterminate ? true : undefined}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              <Icon
                icon={isInterminate ? "check_indeterminate_small" : "check"}
                size={(function () {
                  switch (size) {
                    case "sm":
                      return 3;
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
            className={cn(
              checkboxLabelVariants({ size, isDisabled: isCheckboxDisabled })
            )}
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
