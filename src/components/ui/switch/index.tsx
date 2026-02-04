/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const switchVariants = cva(
  [
    "relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "data-[state=unchecked]:bg-neutral-500 data-[state=unchecked]:border-neutral-600 data-[state=unchecked]:hover:bg-neutral-600 data-[state=unchecked]:hover:border-neutral-700",
    "data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-600 data-[state=checked]:hover:bg-primary-600 data-[state=checked]:hover:border-primary-700",
    "disabled:cursor-not-allowed disabled:data-[state=unchecked]:bg-neutral-100 disabled:data-[state=unchecked]:border-transparent disabled:data-[state=checked]:bg-primary-200 disabled:data-[state=checked]:border-transparent",
  ].join(" "),
  {
    variants: {
      size: {
        // smサイズのタッチターゲットを24px以上に拡張（WCAG 2.5.8）
        // en: Expand sm size touch target to 24px minimum (WCAG 2.5.8)
        sm: "h-4 w-7 p-px before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-full before:min-h-6",
        md: "h-6 w-11 p-px",
        lg: "h-8 w-[60px] p-px",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-raise ring-0 transition-transform bg-white",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
      disabled: {
        true: "data-[state=unchecked]:bg-neutral-50 data-[state=checked]:bg-primary-50",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type SwitchVariants = VariantProps<typeof switchVariants>;
type ReactSwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;
export interface SwitchProps extends ReactSwitchProps {
  /**
   * スイッチのサイズ（sm、md、lg）
   * en: Switch size (sm, md, lg)
   */
  size?: SwitchVariants["size"];
  /**
   * スイッチを無効状態にするかどうか
   * en: Whether to disable the switch
   */
  disabled?: ReactSwitchProps["disabled"];
  /**
   * スイッチをオン状態（チェック状態）にするかどうか
   * en: Whether to make the switch checked (on)
   */
  checked?: ReactSwitchProps["checked"];
  /**
   * スイッチの状態が変更されたときに呼び出されるコールバック関数
   * en: Callback function called when the switch state changes
   */
  onCheckedChange?: ReactSwitchProps["onCheckedChange"];
}

/**
 * **概要 / Overview**
 *
 * - スイッチは設定のオンとオフを切り替えるために使用するコンポーネントです。
 * - en: The Switch component is used to toggle settings on and off.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Switch size="md" checked={isEnabled} onCheckedChange={setIsEnabled} />
 * ```
 *
 * @param {SwitchProps} props
 */
function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size, disabled: props.disabled }))}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
