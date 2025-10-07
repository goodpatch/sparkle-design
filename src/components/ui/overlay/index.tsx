"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type OverlayOpacity = "sm" | "md" | "lg";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 背景の濃さを段階的に指定します / en: Controls the dimness level applied to the backdrop.
   */
  opacity?: OverlayOpacity;
  /**
   * 背景をぼかす効果を有効化します / en: Toggles a subtle blur effect on the backdrop.
   */
  blur?: boolean;
}

/**
 * **概要 / Overview**
 *
 * - オーバーレイはモーダルやダイアログなどの背後に敷かれ、背面コンテンツの視認性を下げてフォーカスを誘導するレイヤーです。
 * - en: The Overlay component dims the underlying content to guide focus toward foreground surfaces such as modals or dialogs.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Overlay opacity="md" onClick={handleClose} />
 * ```
 *
 * @param {OverlayProps} props
 */
export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, opacity = "md", blur = false, ...props }, ref) => {
    const opacityClass =
      opacity === "lg"
        ? "bg-black/70"
        : opacity === "sm"
          ? "bg-black/30"
          : "bg-black/50";

    return (
      <div
        ref={ref}
        data-slot="overlay"
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200",
          opacityClass,
          blur && "backdrop-blur-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Overlay.displayName = "Overlay";
