import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/ui/link";

/**
 * - パンくずはユーザーが現在のページ階層を理解し、親の階層へ戻るためのナビゲーションとして機能するコンポーネントです。
 * - en: The Breadcrumb component helps users understand the current page hierarchy and navigate back to parent levels.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Link</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @param {BreadcrumbProps} props
 */
export function Breadcrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

/**
 * パンくずリスト（ol）
 * en: Breadcrumb list (ol)
 *
 * @param props ol要素のprops
 * en: Props for ol element
 */
export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center break-words gap-1", className)}
      {...props}
    />
  );
}

/**
 * パンくずアイテム（li）
 * en: Breadcrumb item (li)
 *
 * @param props li要素のprops
 * en: Props for li element
 */
export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center p-0.5", className)}
      {...props}
    />
  );
}

/**
 * パンくずリンク
 * en: Breadcrumb link
 *
 * @param props Linkコンポーネントのprops
 * en: Props for Link component
 */
export function BreadcrumbLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="breadcrumb-link"
      className={cn("character-3-regular-pro", className)}
      {...props}
    />
  );
}

/**
 * パンくずの区切り（/など）
 * en: Breadcrumb separator (e.g. /)
 *
 * @param props span要素のprops
 * en: Props for span element
 */
export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("mx-1 text-neutral-500 select-none", className)}
      {...props}
    >
      {children ?? "/"}
    </span>
  );
}

/**
 * 現在ページ表示用
 * en: Current page label (not a link)
 *
 * @param props span要素のprops
 * en: Props for span element
 */
export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "character-3-regular-pro text-text-high cursor-default",
        className
      )}
      {...props}
    />
  );
}
