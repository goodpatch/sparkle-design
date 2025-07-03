import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// タグのスタイル定義
const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md text-center whitespace-nowrap",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border",
        subtle: "",
      },
      size: {
        sm: "py-0 px-1 h-5 character-1-regular-pro",
        md: "py-0 px-2 h-6 character-1-regular-pro",
        lg: "py-1 px-2 h-8 character-2-regular-pro",
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
        className: "bg-base-500 text-white",
      },
      // info + solid
      {
        variant: "solid",
        status: "info",
        className: "bg-primary-500 text-white",
      },
      // success + solid
      {
        variant: "solid",
        status: "success",
        className: "bg-success-500 text-white",
      },
      // warning + solid
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning-500 text-white",
      },
      // negative + solid
      {
        variant: "solid",
        status: "negative",
        className: "bg-negative-500 text-white",
      },

      // === OUTLINE バリアント ===
      // neutral + outline
      {
        variant: "outline",
        status: "neutral",
        className: "border-base-500 text-base-700 bg-white",
      },
      // info + outline
      {
        variant: "outline",
        status: "info",
        className: "border-primary-500 text-primary-500 bg-white",
      },
      // success + outline
      {
        variant: "outline",
        status: "success",
        className: "border-success-500 text-success-500 bg-white",
      },
      // warning + outline
      {
        variant: "outline",
        status: "warning",
        className: "border-warning-500 text-warning-500 bg-white",
      },
      // negative + outline
      {
        variant: "outline",
        status: "negative",
        className: "border-negative-500 text-negative-500 bg-white",
      },

      // === SUBTLE バリアント ===
      // neutral + subtle
      {
        variant: "subtle",
        status: "neutral",
        className: "bg-base-100 text-base-700",
      },
      // info + subtle
      {
        variant: "subtle",
        status: "info",
        className: "bg-primary-100 text-primary-500",
      },
      // success + subtle
      {
        variant: "subtle",
        status: "success",
        className: "bg-success-100 text-success-700",
      },
      // warning + subtle
      {
        variant: "subtle",
        status: "warning",
        className: "bg-warning-100 text-warning-700",
      },
      // negative + subtle
      {
        variant: "subtle",
        status: "negative",
        className: "bg-negative-100 text-negative-500",
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  /**
   * タグのラベルテキスト
   * en: Label text displayed inside the tag
   */
  children: React.ReactNode;
}

/**
 * ## 概要 / Overview
 *
 * - タグは特定の要素にラベリングをすることで情報を分類・整理したり、情報にステータスを付与するために使用するコンポーネントです。
 * - en: The Tag component is used to categorize and organize information by labeling specific elements, or to assign status to information.
 *
 * ## プロパティ / Props
 *
 * @param props.variant タグのスタイルバリアント（solid、outline、subtle） /
 * en: Tag style variant (solid, outline, subtle)
 * @param props.size タグのサイズ（sm、md、lg） /
 * en: Tag size (sm, md, lg)
 * @param props.status タグのステータス（neutral、info、success、warning、negative） /
 * en: Tag status (neutral, info, success, warning, negative)
 * @param props.children タグ内に表示するラベル /
 * en: Label displayed inside the tag
 *
 * ## 使用例 / Usage Example
 *
 * ```tsx
 * <Tag variant="solid" size="md" status="info">情報</Tag>
 * ```
 */
const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, status, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(tagVariants({ variant, size, status, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
