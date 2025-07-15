import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-0.5 whitespace-nowrap rounded-action transition-colors",
    "cursor-pointer disabled:cursor-not-allowed",
    "shrink-0 outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "border shadow-raise",
        outline: "border shadow-raise",
        ghost: "",
      },
      size: {
        sm: "h-8 px-3 py-1 character-2-bold-pro",
        md: "h-10 px-4 py-1.5 character-3-bold-pro",
        lg: "h-12 px-5 py-2 character-4-bold-pro",
      },
      theme: {
        primary: "",
        neutral: "",
        negative: "",
      },
      isLoading: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // solid primary
      {
        variant: "solid",
        theme: "primary",
        isLoading: false,
        className: [
          "bg-primary-500",
          "text-white",
          "border-primary-600",
          "hover:bg-primary-600",
          "hover:border-primary-700",
          "active:bg-primary-700",
          "active:border-primary-800",
          "disabled:bg-primary-200",
          "disabled:border-none",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "primary",
        isLoading: true,
        className:
          "disabled:bg-primary-500 disabled:text-white disabled:border-primary-600",
      },
      // solid neutral
      {
        variant: "solid",
        theme: "neutral",
        isLoading: false,
        className: [
          "bg-neutral-500",
          "text-white",
          "border-neutral-600",
          "hover:bg-neutral-600",
          "hover:border-neutral-700",
          "active:bg-neutral-700",
          "active:border-neutral-800",
          "disabled:bg-neutral-200",
          "disabled:border-none",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "neutral",
        isLoading: true,
        className:
          "disabled:bg-neutral-500 disabled:text-white disabled:border-neutral-600",
      },
      // solid negative
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        className: [
          "bg-negative-500",
          "text-white",
          "border-negative-600",
          "hover:bg-negative-600",
          "hover:border-negative-700",
          "active:bg-negative-700",
          "active:border-negative-800",
          "disabled:bg-negative-200",
          "disabled:border-none",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "negative",
        isLoading: true,
        className:
          "disabled:bg-negative-500 disabled:text-white disabled:border-negative-600",
      },
      // outline primary
      {
        variant: "outline",
        theme: "primary",
        isLoading: false,
        className: [
          "bg-white",
          "text-primary-500",
          "border-primary-300",
          "hover:bg-primary-50",
          "active:bg-primary-100",
          "active:border-primary-400",
          "active:text-primary-600",
          "disabled:border-primary-100",
          "disabled:text-primary-200",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        className:
          "disabled:white disabled:text-primary-500 disabled:border-primary-300",
      },
      // outline neutral
      {
        variant: "outline",
        theme: "neutral",
        isLoading: false,
        className: [
          "bg-white",
          "text-neutral-700",
          "border-neutral-300",
          "hover:bg-neutral-50",
          "active:bg-neutral-100",
          "active:border-neutral-300",
          "disabled:border-neutral-100",
          "disabled:text-neutral-200",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "neutral",
        isLoading: true,
        className:
          "disabled:bg-white disabled:text-neutral-700 disabled:border-neutral-300",
      },
      // outline negative
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        className: [
          "bg-white",
          "text-negative-500",
          "border-negative-300",
          "hover:bg-negative-50",
          "active:bg-negative-100",
          "active:border-negative-400",
          "active:text-negative-600",
          "disabled:border-negative-100",
          "disabled:text-negative-200",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        className:
          "disabled:bg-white disabled:text-negative-500 disabled:border-negative-300",
      },
      // ghost primary
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        className: [
          "text-primary-500",
          "hover:bg-primary-50",
          "active:bg-primary-100",
          "active:text-primary-600",
          "disabled:text-primary-200",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        className: "disabled:text-primary-500",
      },
      // ghost neutral
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: false,
        className: [
          "text-neutral-700",
          "hover:bg-neutral-50",
          "active:bg-neutral-100",
          "disabled:text-neutral-200",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: true,
        className: "disabled:text-neutral-700",
      },
      // ghost negative
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        className: [
          "text-negative-500",
          "hover:bg-negative-50",
          "active:bg-negative-100",
          "active:text-negative-600",
          "disabled:text-negative-200",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "negative",
        isLoading: true,
        className: "disabled:text-negative-500",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      theme: "primary",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export interface ButtonProps extends React.ComponentProps<"button"> {
  /**
   * ボタンのサイズバリエーション
   * en: Size variation of the button
   */
  size?: ButtonVariantProps["size"];
  /**
   * ボタンのスタイルバリエーション
   * en: Style variation of the button
   */
  variant?: ButtonVariantProps["variant"];
  /**
   * ボタンのテーマバリエーション
   * en: Theme variation of the button
   */
  theme?: ButtonVariantProps["theme"];
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
 * **概要 / Overview**
 *
 * - ボタンはフォームの送信、ダイアログの展開、アクションのキャンセル、削除の実行など、アクションやイベントのトリガーとして使用するコンポーネントです。
 * - en: The Button component is used as a trigger for actions and events such as form submission, dialog expansion, action cancellation, and deletion execution.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Button variant="solid" size="md" theme="primary" prefixIcon="check">確定</Button>
 * ```
 *
 * @param {ButtonProps} props
 */
function Button({
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
}: ButtonProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
  const isButtonDisabled = isLoading || isDisabled || disabled;

  // アイコンのサイズをボタンサイズに合わせて設定
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 4;
      case "lg":
        return 6;
      default:
        return 5;
    }
  };

  return (
    <Comp
      data-slot="button"
      disabled={isButtonDisabled}
      className={cn(
        buttonVariants({
          variant,
          size,
          theme,
          isLoading,
          className,
        })
      )}
      type={asChild ? undefined : props.type || "button"}
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

Button.displayName = "Button";

export { Button, buttonVariants };
