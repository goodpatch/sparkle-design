/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Radio（radiogroup）のエラー状態を各 RadioItem に伝える
 * en: Propagates the radio group's invalid state to each RadioItem
 */
const RadioInvalidContext = React.createContext(false);

const labelVariants = cva("cursor-pointer", {
  variants: {
    size: {
      sm: "character-2-regular-pro",
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-text-neutral-disabled cursor-not-allowed",
      false: "text-text-neutral-middle",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const radioItemVariants = cva(
  [
    "relative rounded-full transition-colors flex items-center justify-center cursor-pointer",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
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

const radioIndicatorVariants = cva(
  [
    "flex items-center justify-center rounded-full border border-2 bg-surface-base-0 transition-colors",
    "[.group:focus_&]:outline-hidden [.group:focus-visible_&]:ring-2 [.group:focus-visible_&]:ring-border-ring [.group:focus-visible_&]:ring-offset-2",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "border-object-negative-enabled [.group[data-state=checked]_&]:border-object-negative-enabled",
        false: "border-object-neutral-low",
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
        className: "hover:border-object-neutral-middle",
      },
      {
        isDisabled: false,
        isInvalid: true,
        className: "hover:border-object-negative-hover",
      },
      {
        isDisabled: true,
        isInvalid: false,
        className:
          "border-object-neutral-disabled [.group[data-state=checked]_&]:border-object-primary-disabled",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className:
          "border-object-negative-disabled [.group[data-state=checked]_&]:border-object-negative-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorDotVariants = cva(
  "rounded-full transition-colors flex items-center justify-center shrink-0",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "[.group[data-state=checked]_&]:bg-object-negative-enabled",
        false: "[.group[data-state=checked]_&]:bg-object-primary-enabled",
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
          "[.group[data-state=checked]_&]:hover:bg-object-primary-hover",
      },
      {
        isDisabled: false,
        isInvalid: true,
        className:
          "[.group[data-state=checked]_&]:hover:bg-object-negative-hover",
      },
      {
        isDisabled: true,
        isInvalid: false,
        className: "[.group[data-state=checked]_&]:bg-object-primary-disabled",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className: "[.group[data-state=checked]_&]:bg-object-negative-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

const radioIndicatorDotInnerVariants = cva("rounded-full bg-surface-base-0", {
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
  /**
   * グループ全体がエラー状態かどうか。`aria-invalid` を radiogroup に付け、配下の RadioItem もエラー配色になる
   * en: Whether the whole group is in an error state. Sets `aria-invalid` on the radiogroup and renders every RadioItem in the error style
   * @default false
   */
  isInvalid?: boolean;
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
 * @param {RadioProps} props
 */
function Radio({ className, isInvalid = false, ...props }: RadioProps) {
  // aria-invalid は ARIA 1.2 で radiogroup がサポートロール（radio は対象外）なのでグループに付ける。
  // FormControl などが aria-invalid を直接渡した場合もエラー配色を伝える
  // en: ARIA 1.2 supports aria-invalid on radiogroup (not on radio), so set it on the group.
  // 空文字は ARIA では false 相当なので invalid 扱いしない
  // en: An empty string means false in ARIA, so it is not treated as invalid
  // An aria-invalid passed directly (e.g. by FormControl) also turns on the error style
  // 型付けされていない呼び出し（JS や Slot 経由）の空文字も弾けるよう unknown で比較する
  // en: Compare as unknown so an empty string from untyped callers (JS, Slot) is also rejected
  const ariaInvalid: unknown = props["aria-invalid"];
  const groupInvalid =
    isInvalid ||
    (ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== "false" &&
      ariaInvalid !== "");
  return (
    <RadioInvalidContext.Provider value={groupInvalid}>
      <RadioPrimitive.Root
        data-slot="radio-group"
        className={cn("grid gap-y-2 gap-x-4", className)}
        {...props}
        aria-invalid={groupInvalid || undefined}
      />
    </RadioInvalidContext.Provider>
  );
}
Radio.displayName = RadioPrimitive.Root.displayName;

type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
type RadioIndicatorDotVariantProps = VariantProps<
  typeof radioIndicatorDotVariants
>;
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
   * エラー配色にするかどうか（見た目のみ）。支援技術に無効状態を伝えるには Radio の `isInvalid` を使う
   * en: Whether to render this item in the error style (visual only). Use `isInvalid` on Radio to expose the invalid state to assistive technology
   * @default false
   */
  isInvalid?: RadioIndicatorDotVariantProps["isInvalid"];
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
  isInvalid: isInvalidProp = false,
  disabled = false,
  label,
  id,
  ...props
}: RadioItemProps) {
  const isInvalid = React.useContext(RadioInvalidContext) || !!isInvalidProp;
  return (
    <div className="flex items-center">
      <RadioPrimitive.Item
        data-slot="radio-group-item"
        id={id}
        className={cn(
          radioItemVariants({ size, isDisabled: disabled }),
          "group",
          className
        )}
        disabled={disabled}
        {...props}
      >
        <div
          className={cn(
            radioIndicatorVariants({ size, isInvalid, isDisabled: disabled })
          )}
        >
          <RadioPrimitive.Indicator
            data-slot="radio-group-indicator"
            className={cn(
              radioIndicatorDotVariants({
                size,
                isInvalid,
                isDisabled: disabled,
              })
            )}
          >
            <div className={cn(radioIndicatorDotInnerVariants({ size }))} />
          </RadioPrimitive.Indicator>
        </div>
      </RadioPrimitive.Item>
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
