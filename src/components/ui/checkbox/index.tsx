"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const checkboxItemVariants = cva(
  "relative rounded-sm transition-colors flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkboxRootVariants = cva(
  "rounded-xs border-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2 transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: [
          "border-negative-500",
          "data-[state=checked]:bg-negative-500 data-[state=checked]:border-none",
          "data-[state=indeterminate]:bg-negative-500 data-[state=indeterminate]:border-none",
        ].join(" "),
        false: [
          "border-neutral-500",
          "data-[state=checked]:bg-primary-500 data-[state=checked]:border-none",
          "data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-none",
        ].join(" "),
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
        className: [
          "hover:border-neutral-600",
          "data-[state=checked]:hover:bg-primary-600",
          "data-[state=indeterminate]:hover:bg-primary-600",
        ].join(" "),
      },
      {
        isDisabled: false,
        isInvalid: true,
        className: [
          "hover:border-negative-600",
          "data-[state=checked]:hover:bg-negative-600",
          "data-[state=indeterminate]:hover:bg-negative-600",
        ].join(" "),
      },
      {
        isDisabled: true,
        isInvalid: false,
        className: [
          "border-neutral-200",
          "data-[state=checked]:bg-primary-200 data-[state=checked]:border-primary-200",
          "data-[state=indeterminate]:bg-primary-200 data-[state=indeterminate]:border-primary-200",
        ].join(" "),
      },
      {
        isDisabled: true,
        isInvalid: true,
        className: [
          "border-negative-200",
          "data-[state=checked]:bg-negative-200 data-[state=checked]:border-negative-200",
          "data-[state=indeterminate]:bg-negative-200 data-[state=indeterminate]:border-negative-200",
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
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-text-disabled cursor-not-allowed",
      false: "text-text-middle",
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
    <div className="flex items-center">
      <div className={cn(checkboxItemVariants({ size }))}>
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          id={id}
          className={cn(
            checkboxRootVariants({
              size,
              isInvalid,
              isDisabled: isCheckboxDisabled,
            })
          )}
          disabled={isCheckboxDisabled}
          checked={checked}
          onCheckedChange={handleChange}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-white"
          >
            <Icon
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

export { Checkbox };
export type { CheckboxItemProps };
