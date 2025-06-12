import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative",
  {
    variants: {
      variant: {
        solid: "border shadow-sm",
        outline: "border shadow-sm",
        ghost: "",
      },
      size: {
        xs: "w-6 h-6 p-0.5 character-1-bold-pro",
        sm: "w-8 h-8 p-1 character-2-bold-pro",
        md: "w-10 h-10 p-2 character-3-bold-pro",
        lg: "w-12 h-12 p-2.5 character-4-bold-pro",
      },
      theme: {
        primary: "",
        secondary: "",
        negative: "",
      },
      isLoading: {
        true: "cursor-not-allowed",
        false: "gap-2",
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
        className:
          "bg-primary-500 text-white border-primary-600 hover:bg-primary-600 hover:border-primary-700 active:bg-primary-700 active:border-primary-800 active:shadow-sm",
      },
      {
        variant: "solid",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-primary-500 text-white border-primary-600",
      },

      // Solid Secondary バリアント
      {
        variant: "solid",
        theme: "secondary",
        isLoading: false,
        isDisabled: false,
        className:
          "bg-secondary-500 text-white border-secondary-600 hover:bg-secondary-600 hover:border-secondary-700 active:bg-secondary-700 active:border-secondary-800 active:shadow-sm",
      },
      {
        variant: "solid",
        theme: "secondary",
        isLoading: true,
        isDisabled: false,
        className: "bg-secondary-500 text-white border-secondary-600",
      },

      // Solid Negative バリアント
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className:
          "bg-negative-500 text-white border-negative-600 hover:bg-negative-600 hover:border-negative-700 active:bg-negative-700 active:border-negative-800 active:shadow-sm",
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
        className:
          "bg-white text-primary-500 border-primary-500 shadow-sm hover:bg-primary-50 active:bg-primary-100",
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-primary-500 border-primary-500 shadow-sm",
      },

      // Outline Secondary バリアント
      {
        variant: "outline",
        theme: "secondary",
        isLoading: false,
        className:
          "bg-white text-secondary-700 border-secondary-500 shadow-sm hover:bg-secondary-50 active:bg-secondary-100",
      },
      {
        variant: "outline",
        theme: "secondary",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-secondary-700 border-secondary-500 shadow-sm",
      },

      // Outline Negative バリアント
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className:
          "bg-white text-negative-500 border-negative-500 shadow-sm hover:bg-negative-50 active:bg-negative-100",
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-negative-500 border-negative-500 shadow-sm",
      },

      // Ghost Primary バリアント
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className: "text-primary-500 hover:bg-primary-50 active:bg-primary-100",
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "text-primary-500",
      },

      // Ghost Secondary バリアント
      {
        variant: "ghost",
        theme: "secondary",
        isLoading: false,
        isDisabled: false,
        className:
          "text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100",
      },
      {
        variant: "ghost",
        theme: "secondary",
        isLoading: true,
        isDisabled: false,
        className: "text-secondary-700",
      },

      // Ghost Negative バリアント
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className:
          "text-negative-500 hover:bg-negative-100 active:bg-negative-100",
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
        theme: "secondary",
        isDisabled: true,
        className:
          "disabled:bg-secondary-200 disabled:text-white disabled:border-none",
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
        theme: "secondary",
        isDisabled: true,
        className:
          "disabled:bg-white disabled:text-secondary-200 disabled:border-secondary-100",
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
        theme: "secondary",
        isDisabled: true,
        className: "disabled:text-secondary-200",
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

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  icon: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

/**
 * アイコンボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
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
    const isIconButtonDisabled = isLoading || isDisabled;

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
            <Spinner size={getIconSize()} />
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
