"use client";

import * as React from "react";
import { Switch as SwitchPrimitives } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=unchecked]:bg-gray-500 data-[state=unchecked]:border-gray-600 data-[state=unchecked]:hover:bg-gray-600 data-[state=unchecked]:hover:border-gray-700 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-600 data-[state=checked]:hover:bg-blue-600 data-[state=checked]:hover:border-blue-700 disabled:cursor-not-allowed disabled:data-[state=unchecked]:bg-gray-200 disabled:data-[state=unchecked]:border-transparent disabled:data-[state=checked]:bg-blue-200 disabled:data-[state=checked]:border-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-7 p-px",
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
  "pointer-events-none block rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  /**
   * スイッチのサイズ（sm、md、lg）
   * en: Switch size (sm, md, lg)
   */
  size?: "sm" | "md" | "lg";
}

/**
 * ## 概要 / Overview
 *
 * - スイッチは設定のオンとオフを切り替えるために使用するコンポーネントです。
 * - en: The Switch component is used to toggle settings on and off.
 *
 * ## プロパティ / Props
 *
 * @param props.size スイッチのサイズ（sm、md、lg） /
 * en: Switch size (sm, md, lg)
 * @param props.checked スイッチがチェックされているかどうか /
 * en: Whether the switch is checked
 * @param props.disabled スイッチが無効化されているかどうか /
 * en: Whether the switch is disabled
 * @param props.onCheckedChange チェック状態が変更されたときのコールバック /
 * en: Callback function called when the checked state changes
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Switch size="md" checked={isEnabled} onCheckedChange={setIsEnabled} />
 * ```
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants, thumbVariants };
