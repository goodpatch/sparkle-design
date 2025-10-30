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
 * @param props
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-notice bg-skeleton-fill", className)}
      {...props}
    />
  );
}

export { Skeleton };
