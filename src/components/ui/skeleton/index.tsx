/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { cn } from "@/lib/utils";

/**
 * **概要 / Overview**
 *
 * - スケルトンはユーザーにコンテンツが読込中であることを提示するために使用するコンポーネントです。
 * - en: The Skeleton component is used to indicate to users that content is loading.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-notice bg-surface-base-200",
        // 強制カラーモードでは背景色が消えて読み込み中の形がなくなるので、GrayText で塗る
        // en: Forced-colors mode drops the background and the placeholder shape, so paint it with GrayText
        "forced-colors:forced-color-adjust-none forced-colors:bg-[GrayText]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
