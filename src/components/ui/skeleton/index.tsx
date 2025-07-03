import { cn } from "@/lib/utils";

/**
 * ## 概要 / Overview
 *
 * - スケルトンはユーザーにコンテンツが読込中であることを提示するために使用するコンポーネントです。
 * - en: The Skeleton component is used to indicate to users that content is loading.
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-base-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
