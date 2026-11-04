/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const switchVariants = cva(
  [
    // Figma に枠線の bind は無いが、強制カラーモード（Windows ハイコントラスト等）で
    // トラックの外形を残すため透明な 1px 枠を持たせる（padding と合わせて padding/2 相当）
    // en: Figma binds no border, but keep a transparent 1px border so the track outline
    // survives forced-colors mode (together with p-px this equals padding/2)
    "relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // オン・オフの色の変化は状態の変化なので、つまみと同じタイミングで動かす（Small）
    // en: The on/off color change is a state change, so it moves together with the thumb (Small)
    "transition-[background-color] duration-(--motion-color-duration-small) ease-(--motion-color-ease) delay-(--motion-color-delay)",
    "data-[state=unchecked]:bg-surface-neutral-high-enabled data-[state=checked]:bg-surface-primary-high-enabled",
    // ホバーの色は ::after の層に分け、層の表示は即時に切り替える。クリックはホバー中に起きるので、
    // 層の色はオン・オフに合わせてトラックと同じく動かす
    // en: The hover color lives on an ::after layer whose visibility switches instantly. Clicks
    // happen while hovered, so the layer's color follows on/off with the same transition as the track
    "after:absolute after:-inset-px after:rounded-full after:opacity-0 hover:after:opacity-100",
    "after:transition-[background-color] after:duration-(--motion-color-duration-small) after:ease-(--motion-color-ease) after:delay-(--motion-color-delay)",
    "data-[state=unchecked]:after:bg-surface-neutral-high-hover data-[state=checked]:after:bg-surface-primary-high-hover",
    "disabled:cursor-not-allowed disabled:after:hidden disabled:data-[state=unchecked]:bg-surface-neutral-high-disabled disabled:data-[state=checked]:bg-surface-primary-high-disabled",
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
  [
    // ホバーの層（::after）より手前に出す
    // en: Keep the thumb above the hover layer (::after)
    "pointer-events-none relative z-[1] block rounded-full bg-surface-base-0 shadow-raise ring-0",
    // つまみの移動は状態変化のスプリング（Small）
    // en: The thumb moves with the state-change spring (Small)
    "transition-[translate] duration-(--motion-settle-duration-small) ease-(--motion-settle-ease) delay-(--motion-latency)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
      disabled: {
        true: "data-[state=unchecked]:bg-surface-neutral-low-disabled data-[state=checked]:bg-surface-primary-low-disabled",
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
