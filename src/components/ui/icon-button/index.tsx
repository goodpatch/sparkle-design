import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-action",
    "ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2",
    "relative cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "border",
        outline: "border",
        ghost: "",
      },
      size: {
        xs: "w-6 h-6 p-1",
        sm: "w-8 h-8 p-1.5",
        md: "w-10 h-10 p-2",
        lg: "w-12 h-12 p-2",
      },
      theme: {
        primary: "",
        neutral: "",
        negative: "",
      },
      isLoading: {
        true: "cursor-not-allowed",
        false: "",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      // Solid Primary バリアント
      {
        variant: "solid",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-primary-500 text-white border-primary-600",
          "hover:bg-primary-600 hover:border-primary-700",
          "active:bg-primary-700 active:border-primary-800",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-primary-500 text-white border-primary-600",
      },

      // Solid Neutral バリアント
      {
        variant: "solid",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-neutral-500 text-white border-neutral-600",
          "hover:bg-neutral-600 hover:border-neutral-700",
          "active:bg-neutral-700 active:border-neutral-800",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "bg-neutral-500 text-white border-neutral-600",
      },

      // Solid Negative バリアント
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-negative-500 text-white border-negative-600",
          "hover:bg-negative-600 hover:border-negative-700",
          "active:bg-negative-700 active:border-negative-800",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-negative-500 text-white border-negative-600",
      },

      // Outline Primary バリアント
      {
        variant: "outline",
        theme: "primary",
        isLoading: false,
        className: [
          "bg-white text-primary-500 border-primary-300",
          "hover:bg-primary-50",
          "active:bg-primary-100 active:border-primary-400 active:text-primary-600",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-primary-500 border-primary-300",
      },

      // Outline Neutral バリアント
      {
        variant: "outline",
        theme: "neutral",
        isLoading: false,
        className: [
          "bg-white text-neutral-700 border-neutral-300",
          "hover:bg-neutral-50",
          "active:bg-neutral-100",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-neutral-700 border-neutral-300",
      },

      // Outline Negative バリアント
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-white text-negative-500 border-negative-300",
          "hover:bg-negative-50",
          "active:bg-negative-100 active:border-negative-400 active:text-negative-600",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-negative-500 border-negative-300",
      },

      // Ghost Primary バリアント
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className:
          "text-primary-500 hover:bg-primary-50 active:bg-primary-100 active:text-primary-600",
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "text-primary-500",
      },

      // Ghost neutral バリアント
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: "text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100",
      },
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "text-neutral-700",
      },

      // Ghost Negative バリアント
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className:
          "text-negative-500 hover:bg-negative-50 active:bg-negative-100 active:text-negative-600",
      },
      {
        variant: "ghost",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "text-negative-500",
      },

      // Disabled styles for all variants
      {
        variant: "solid",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-primary-200 disabled:text-white disabled:border-none",
      },
      {
        variant: "solid",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-neutral-200 disabled:text-white disabled:border-none",
      },
      {
        variant: "solid",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-negative-200 disabled:text-white disabled:border-none",
      },
      {
        variant: "outline",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-white disabled:text-primary-200 disabled:border-primary-100",
      },
      {
        variant: "outline",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-white disabled:text-neutral-200 disabled:border-neutral-100",
      },
      {
        variant: "outline",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-white disabled:text-negative-200 disabled:border-negative-100",
      },
      {
        variant: "ghost",
        theme: "primary",
        isDisabled: true,
        className: "disabled:text-primary-200",
      },
      {
        variant: "ghost",
        theme: "neutral",
        isDisabled: true,
        className: "disabled:text-neutral-200",
      },
      {
        variant: "ghost",
        theme: "negative",
        isDisabled: true,
        className: "disabled:text-negative-200",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      theme: "primary",
      isLoading: false,
      isDisabled: false,
    },
  }
);

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * アイコンボタンのバリエーション
   * en: Variation of the icon button
   */
  variant?: IconButtonVariants["variant"];
  /**
   * アイコンボタンのサイズ
   * en: Size of the icon button
   */
  size?: IconButtonVariants["size"];
  /**
   * アイコンボタンのテーマ
   * en: Theme of the icon button
   */
  theme?: IconButtonVariants["theme"];
  /**
   * ボタンを別コンポーネントの子としてレンダリングするか
   * en: Whether to render the button as a child component
   */
  asChild?: boolean;
  /**
   * 表示するアイコン名
   * en: Icon name to display
   */
  icon: string;
  /**
   * ローディング状態かどうか
   * en: Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * ボタンを無効化するかどうか
   * en: Whether the button is disabled
   */
  isDisabled?: boolean;
}

/**
 * **概要 / Overview**
 *
 * - アイコンボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
 * - en: The IconButton component is used as a trigger for actions and events such as form submission, dialog expansion, action cancellation, and deletion execution.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <IconButton variant="solid" size="md" theme="primary" icon="edit" />
 * ```
 *
 * @param {IconButtonProps} props
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      theme,
      isLoading = false,
      isDisabled = false,
      asChild = false,
      disabled,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
    const isIconButtonDisabled = isLoading || isDisabled || disabled;

    const Comp = asChild ? SlotPrimitive.Slot : "button";

    // アイコンのサイズをボタンサイズに合わせて設定
    const getIconSize = () => {
      switch (size) {
        case "xs":
          return 3;
        case "sm":
          return 5;
        case "lg":
          return 7;
        default:
          return 6;
      }
    };

    return (
      <Comp
        type="button"
        className={cn(
          iconButtonVariants({
            variant,
            size,
            theme,
            isLoading,
            isDisabled,
            className,
          })
        )}
        ref={ref}
        disabled={isIconButtonDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={getIconSize()} className="text-current" />
          </>
        ) : (
          <Icon icon={icon} size={getIconSize()} />
        )}
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
