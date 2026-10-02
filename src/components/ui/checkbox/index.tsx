/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const checkboxItemVariants = cva(
  // 表示寸法を維持しつつ、疑似要素で横24pxの操作領域を確保。en: Keep visuals, expand hit width to 24px.
  [
    "relative before:absolute before:inset-y-0 before:left-1/2 before:w-6 before:-translate-x-1/2 before:content-[''] rounded-sm transition-colors flex items-center justify-center cursor-pointer",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 w-4",
        md: "h-10 w-[18px]",
        lg: "h-12 w-5",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isDisabled: false,
    },
  }
);

const checkboxRootVariants = cva(
  [
    "rounded-minimum border-2 transition-colors",
    "[.group:focus_&]:outline-hidden [.group:focus-visible_&]:ring-2 [.group:focus-visible_&]:ring-border-ring [.group:focus-visible_&]:ring-offset-2",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-[18px] w-[18px]",
        lg: "h-5 w-5",
      },
      isInvalid: {
        true: [
          "bg-surface-base-0 border-object-negative-enabled",
          "[.group[data-state=checked]_&]:bg-object-negative-enabled [.group[data-state=checked]_&]:border-none",
          "[.group[data-state=indeterminate]_&]:bg-object-negative-enabled [.group[data-state=indeterminate]_&]:border-none",
        ].join(" "),
        false: [
          "bg-surface-base-0 border-object-neutral-low",
          "[.group[data-state=checked]_&]:bg-object-primary-enabled [.group[data-state=checked]_&]:border-none",
          "[.group[data-state=indeterminate]_&]:bg-object-primary-enabled [.group[data-state=indeterminate]_&]:border-none",
        ].join(" "),
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
        className: [
          "hover:border-object-neutral-middle",
          "[.group[data-state=checked]_&]:hover:bg-object-primary-hover",
          "[.group[data-state=indeterminate]_&]:hover:bg-object-primary-hover",
        ].join(" "),
      },
      {
        isDisabled: false,
        isInvalid: true,
        className: [
          "hover:border-object-negative-hover",
          "[.group[data-state=checked]_&]:hover:bg-object-negative-hover",
          "[.group[data-state=indeterminate]_&]:hover:bg-object-negative-hover",
        ].join(" "),
      },
      {
        isDisabled: true,
        isInvalid: false,
        className: [
          "border-object-neutral-disabled",
          "[.group[data-state=checked]_&]:bg-object-primary-disabled [.group[data-state=checked]_&]:border-object-primary-disabled",
          "[.group[data-state=indeterminate]_&]:bg-object-primary-disabled [.group[data-state=indeterminate]_&]:border-object-primary-disabled",
        ].join(" "),
      },
      {
        isDisabled: true,
        isInvalid: true,
        className: [
          "border-object-negative-disabled",
          "[.group[data-state=checked]_&]:bg-object-negative-disabled [.group[data-state=checked]_&]:border-object-negative-disabled",
          "[.group[data-state=indeterminate]_&]:bg-object-negative-disabled [.group[data-state=indeterminate]_&]:border-object-negative-disabled",
        ].join(" "),
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
      md: "character-2-regular-pro",
      lg: "character-3-regular-pro",
    },
    isDisabled: {
      true: "text-text-neutral-disabled cursor-not-allowed",
      false:
        "text-text-neutral-middle group-hover/checkbox:text-text-neutral-high",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

type CheckboxPrimitiveProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
>;
type CheckboxVariants = VariantProps<typeof checkboxRootVariants>;
interface CheckboxItemProps extends CheckboxPrimitiveProps {
  /**
   * チェックボックスのサイズ
   * en: Size of the checkbox
   * @default "md"
   */
  size?: CheckboxVariants["size"];
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
   * ラベルのテキスト
   * en: Label text for the checkbox
   */
  label?: string;
  /**
   * 不確定状態かどうか
   * en: Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * チェック状態
   * en: Checked state of the checkbox
   */
  checked?: CheckboxPrimitiveProps["checked"];
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
function Checkbox({
  className,
  size = "md",
  isInvalid = false,
  isDisabled = false,
  disabled,
  label,
  id,
  checked: controlledChecked,
  defaultChecked,
  indeterminate = false,
  onCheckedChange,
  ...props
}: CheckboxItemProps) {
  // 内部状態の初期値を決定
  const initialChecked = React.useMemo(() => {
    if (controlledChecked !== undefined) return controlledChecked;
    if (indeterminate) return "indeterminate";
    return defaultChecked || false;
  }, [controlledChecked, indeterminate, defaultChecked]);

  const [internalChecked, setInternalChecked] =
    React.useState<CheckboxPrimitiveProps["checked"]>(initialChecked);

  // 制御されているかどうかを判定
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // indeterminateプロパティが変更された場合の処理
  React.useEffect(() => {
    if (!isControlled && indeterminate) {
      setInternalChecked("indeterminate");
    }
  }, [indeterminate, isControlled]);

  const handleChange = React.useCallback(
    (newChecked: boolean | "indeterminate") => {
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    },
    [isControlled, onCheckedChange]
  );

  // isDisabledとdisabledの組み合わせで無効状態を管理
  const isCheckboxDisabled = isDisabled || disabled;

  return (
    <div
      className={cn(
        "group/checkbox flex items-center",
        size === "lg" ? "gap-2" : "gap-1.5"
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        id={id}
        aria-invalid={isInvalid || undefined}
        className={cn(
          checkboxItemVariants({ size, isDisabled: isCheckboxDisabled }),
          "group",
          className
        )}
        disabled={isCheckboxDisabled}
        checked={checked}
        onCheckedChange={handleChange}
        {...props}
      >
        <div
          className={cn(
            checkboxRootVariants({
              size,
              isInvalid,
              isDisabled: isCheckboxDisabled,
            })
          )}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-surface-base-0"
          >
            <Icon
              className="text-current"
              icon={
                checked === "indeterminate"
                  ? "check_indeterminate_small"
                  : "check"
              }
              size={(function () {
                switch (size) {
                  case "sm":
                    return 3;
                  case "md":
                    return 4;
                  case "lg":
                    return 5;
                  default:
                    return 4;
                }
              })()}
            />
          </CheckboxPrimitive.Indicator>
        </div>
      </CheckboxPrimitive.Root>
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

export { Checkbox };
export type { CheckboxItemProps };
