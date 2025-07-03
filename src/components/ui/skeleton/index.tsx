import { cn } from "@/lib/utils";

/**
 * ## 概要 / Overview
 *
 * - スケルトンは、コンテンツが読み込まれるまでの間、プレースホルダーとして表示するコンポーネントです。
 * - en: The Skeleton component is displayed as a placeholder while content is loading.
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
