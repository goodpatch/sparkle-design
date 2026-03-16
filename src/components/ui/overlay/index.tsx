/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * **概要 / Overview**
 *
 * - オーバーレイはシステムのモードが切り替わったことを伝えるために使用するコンポーネントです。
 * - en: The Overlay component is used to indicate that the system mode has changed.
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
          "fixed inset-0 bg-[var(--color-black-alpha-300)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    );
  }
);
Overlay.displayName = "Overlay";

export { Overlay };
