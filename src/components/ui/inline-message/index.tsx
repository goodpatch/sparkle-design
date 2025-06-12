import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@/components/icon";
import { IconButton } from "@/components/icon-button";
import { cn } from "@/lib/utils";

// ステータスごとのスタイル定義
const inlineMessageVariants = cva(
  "relative w-full rounded-md border p-3 flex items-center gap-3",
  {
    variants: {
      status: {
        info: "bg-info-50 border-info-300",
        warning: "bg-warning-50 border-warning-300",
        negative: "bg-negative-50 border-negative-300",
        success: "bg-success-50 border-success-300",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
);

// ステータスごとのアイコン名
const statusIcons = {
  info: "info",
  warning: "warning",
  negative: "error",
  success: "check_circle",
};

// ステータスごとの色クラス
const statusColorClasses = {
  info: "text-info-600",
  warning: "text-warning-600",
  negative: "text-negative-600",
  success: "text-success-600",
};

export interface InlineMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineMessageVariants> {
  /** メッセージのタイトル (後方互換性用) */
  title?: string;
  /** メッセージの説明文 (後方互換性用) */
  description?: string;
  /** 閉じるボタンをクリックしたときに呼ばれるコールバック関数 */
  onClose?: () => void;
  /** 閉じるボタンを表示するかどうか（デフォルト: true） */
  isCloseButtonVisible?: boolean;
  /** 子要素 */
  children?: React.ReactNode;
}

/**
 * インラインメッセージはユーザーにシステムやサービスの状態を伝えるために使用するコンポーネントです。
 */
const InlineMessage = React.forwardRef<HTMLDivElement, InlineMessageProps>(
  (
    {
      className,
      status = "info",
      onClose,
      isCloseButtonVisible = true,
      children,
      ...props
    },
    ref
  ) => {
    // ステータスに対応するアイコン情報の取得
    const statusIcon = status ? statusIcons[status] : statusIcons.info;

    // ステータスに対応する色クラスの取得
    const colorClass = status
      ? statusColorClasses[status]
      : statusColorClasses.info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(inlineMessageVariants({ status }), className)}
        {...props}
      >
        {/* ステータスアイコン */}
        <Icon
          icon={statusIcon}
          size={6}
          fill={true}
          className={cn(colorClass)}
        />

        {/* メッセージ本文 */}
        <div className="flex flex-col gap-1 flex-1">{children}</div>

        {/* 閉じるボタン（表示条件あり） */}
        {isCloseButtonVisible && onClose && (
          <IconButton
            icon="close"
            size="sm"
            variant="ghost"
            theme="secondary"
            onClick={onClose}
            aria-label="閉じる"
            className="shrink-0"
          />
        )}
      </div>
    );
  }
);
InlineMessage.displayName = "InlineMessage";

/**
 * インラインメッセージのタイトルコンポーネント
 */
const InlineMessageTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("character-3-bold-pro text-base-900", className)}
    {...props}
  />
));
InlineMessageTitle.displayName = "InlineMessageTitle";

/**
 * インラインメッセージの説明コンポーネント
 */
const InlineMessageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("character-3-regular-pro text-base-700", className)}
    {...props}
  />
));
InlineMessageDescription.displayName = "InlineMessageDescription";

export { InlineMessage, InlineMessageTitle, InlineMessageDescription };
