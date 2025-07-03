import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative",
  {
    variants: {
      variant: {
        solid: "border shadow-raise",
        outline: "border shadow-raise",
        ghost: "",
      },
      size: {
        sm: "h-8 px-2.5 py-1 character-2-bold-pro",
        md: "h-10 px-3 py-2 character-3-bold-pro",
        lg: "h-12 px-3.5 py-2.5 character-4-bold-pro",
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
          "bg-primary-500 text-white border-primary-600 hover:bg-primary-600 hover:border-primary-700 active:bg-primary-700 active:border-primary-800 active:shadow-raise",
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
          "bg-secondary-500 text-white border-secondary-600 hover:bg-secondary-600 hover:border-secondary-700 active:bg-secondary-700 active:border-secondary-800 active:shadow-raise",
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
          "bg-negative-500 text-white border-negative-600 hover:bg-negative-600 hover:border-negative-700 active:bg-negative-700 active:border-negative-800 active:shadow-raise",
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
        isDisabled: false,
        className:
          "bg-white text-primary-500 border-primary-500 hover:bg-primary-50 active:bg-primary-100",
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-primary-500 border-primary-500",
      },

      // Outline Secondary バリアント
      {
        variant: "outline",
        theme: "secondary",
        isLoading: false,
        isDisabled: false,
        className:
          "bg-white text-secondary-700 border-secondary-500 hover:bg-secondary-50 active:bg-secondary-100",
      },
      {
        variant: "outline",
        theme: "secondary",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-secondary-700 border-secondary-500",
      },

      // Outline Negative バリアント
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className:
          "bg-white text-negative-500 border-negative-500 hover:bg-negative-50 active:bg-negative-100",
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-white text-negative-500 border-negative-500",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * ボタンを別コンポーネントの子としてレンダリングするか
   * en: Whether to render the button as a child component
   */
  asChild?: boolean;
  /**
   * 左側に表示するアイコン名
   * en: Icon name displayed on the left side
   */
  prefixIcon?: string;
  /**
   * 右側に表示するアイコン名
   * en: Icon name displayed on the right side
   */
  suffixIcon?: string;
  /**
   * ローディング状態かどうか
   * en: Indicates if the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * ボタンを無効化するかどうか
   * en: Disables the button when set to true
   */
  isDisabled?: boolean;
}

/**
 * ボタンはフォームの送信やダイアログの展開など、ユーザー操作を実行するためのコンポーネントです。
 * en: The Button component triggers user actions like submitting forms or opening dialogs.
 *
 * @param props.asChild 子要素として別のコンポーネントを使うかどうか
 * en: Whether to render as a child component
 * @param props.prefixIcon 左側に表示するアイコン名
 * en: Icon name shown on the left side
 * @param props.suffixIcon 右側に表示するアイコン名
 * en: Icon name shown on the right side
 * @param props.isLoading ローディング状態かどうか
 * en: Whether the button is in a loading state
 * @param props.isDisabled ボタンを無効化するかどうか
 * en: Whether the button is disabled
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      prefixIcon,
      suffixIcon,
      children,
      ...props
    },
    ref
  ) => {
    // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
    const computedIsDisabled = isDisabled || disabled;
    const isButtonDisabled = isLoading || computedIsDisabled;

    const Comp = asChild ? SlotPrimitive.Slot : "button";

    // アイコンのサイズをボタンサイズに合わせて設定
    const getIconSize = () => {
      switch (size) {
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
          buttonVariants({
            variant,
            size,
            theme,
            isLoading,
            isDisabled: computedIsDisabled,
            className,
          })
        )}
        ref={ref}
        disabled={isButtonDisabled}
        {...props}
      >
        {prefixIcon && (
          <Icon
            icon={prefixIcon}
            size={getIconSize()}
            className={cn({ "opacity-0": isLoading })}
          />
        )}

        {isLoading ? (
          <>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex">
              <Spinner size={getIconSize()} />
            </span>
            <span className="opacity-0" aria-hidden="true">
              {children}
            </span>
          </>
        ) : (
          children
        )}

        {suffixIcon && (
          <Icon
            icon={suffixIcon}
            size={getIconSize()}
            className={cn({ "opacity-0": isLoading })}
          />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
