/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// タグのスタイル定義
const tagVariants = cva(
  "inline-flex items-center justify-center rounded-notice h-fit min-w-0",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border",
        subtle: "",
      },
      size: {
        sm: "py-0 px-2 min-w-10 character-1-bold-pro",
        md: "py-0.5 px-2 min-w-12 character-1-bold-pro",
        lg: "py-1 px-2 min-w-14 character-2-bold-pro",
      },
      status: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        negative: "",
      },
    },
    compoundVariants: [
      // === SOLID バリアント ===
      // neutral + solid
      {
        variant: "solid",
        status: "neutral",
        className: "bg-object-neutral-middle text-text-inverse",
      },
      // info + solid
      {
        variant: "solid",
        status: "info",
        className: "bg-object-info text-text-inverse",
      },
      // success + solid
      {
        variant: "solid",
        status: "success",
        className: "bg-object-success text-text-inverse",
      },
      // warning + solid
      {
        variant: "solid",
        status: "warning",
        className: "bg-object-warning text-text-inverse",
      },
      // negative + solid
      {
        variant: "solid",
        status: "negative",
        className: "bg-object-negative-enabled text-text-inverse",
      },

      // === OUTLINE バリアント ===
      // neutral + outline
      {
        variant: "outline",
        status: "neutral",
        className:
          "border-object-neutral-middle text-text-neutral-middle bg-surface-base-0",
      },
      // info + outline
      {
        variant: "outline",
        status: "info",
        className: "border-object-info text-text-info bg-surface-base-0",
      },
      // success + outline
      {
        variant: "outline",
        status: "success",
        className: "border-object-success text-text-success bg-surface-base-0",
      },
      // warning + outline
      {
        variant: "outline",
        status: "warning",
        className: "border-object-warning text-text-warning bg-surface-base-0",
      },
      // negative + outline
      {
        variant: "outline",
        status: "negative",
        className:
          "border-object-negative-enabled text-text-negative-enabled bg-surface-base-0",
      },

      // === SUBTLE バリアント ===
      // neutral + subtle
      {
        variant: "subtle",
        status: "neutral",
        className: "bg-surface-neutral-middle-enabled text-text-neutral-middle",
      },
      // info + subtle
      {
        variant: "subtle",
        status: "info",
        className: "bg-surface-info-low text-text-info",
      },
      // success + subtle
      {
        variant: "subtle",
        status: "success",
        className: "bg-surface-success-low text-text-success",
      },
      // warning + subtle
      {
        variant: "subtle",
        status: "warning",
        className: "bg-surface-warning-low text-text-warning",
      },
      // negative + subtle
      {
        variant: "subtle",
        status: "negative",
        className:
          "bg-surface-negative-middle-enabled text-text-negative-enabled",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      status: "neutral",
    },
  }
);

export interface TagProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof tagVariants> {
  /**
   * タグのラベルテキスト
   * en: Label text displayed inside the tag
   */
  children: React.ReactNode;
}

/**
 * **概要 / Overview**
 *
 * - タグは特定の要素にラベリングをすることで情報を分類・整理したり、情報にステータスを付与するために使用するコンポーネントです。
 * - en: The Tag component is used to categorize and organize information by labeling specific elements, or to assign status to information.
 *
 * **アンチパターン / Anti-patterns**
 *
 * - 通知数や件数などの数値情報には `Tag` を使わず、`Badge` を使ってください。
 *   en: Do not use `Tag` for numeric information such as notification counts. Use `Badge` instead.
 *
 * ```tsx
 * // ✅ Correct
 * <>
 *   <Tag status="success">完了</Tag>
 *   <Badge>3</Badge>
 * </>
 *
 * // ❌ Wrong - 件数表示に Tag を使わない
 * <Tag status="info">3件</Tag>
 * ```
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Tag variant="solid" size="md" status="info">情報</Tag>
 * ```
 *
 * @param {TagProps} props
 */
function Tag({
  className,
  variant,
  size,
  status,
  children,
  ref,
  ...props
}: TagProps) {
  return (
    <div
      ref={ref}
      className={cn(tagVariants({ variant, size, status, className }))}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

Tag.displayName = "Tag";

export { Tag, tagVariants };
