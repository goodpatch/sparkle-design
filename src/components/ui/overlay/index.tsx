"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * **概要 / Overview**
 *
 * - Overlayはモーダルなどの背後に敷かれる半透明のレイヤーを表示するためのコンポーネントです。
 * - en: The Overlay component renders a semi-transparent layer behind elements such as modals.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Overlay />
 * ```
 *
 * @param {OverlayProps} props
 */
const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="overlay"
        className={cn(
          "fixed inset-0 bg-[rgba(36,41,47,0.30)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    );
  }
);
Overlay.displayName = "Overlay";

export { Overlay };
