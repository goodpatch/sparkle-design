/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

// ステータスごとのスタイル定義
const inlineMessageVariants = cva(
  "relative w-full rounded-md border p-3 flex gap-2",
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
  info: "text-info-500",
  warning: "text-warning-500",
  negative: "text-negative-500",
  success: "text-success-500",
};

export interface InlineMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineMessageVariants> {
  /**
   * 閉じる時のハンドラー
   * en: Handler when the message is dismissed
   */
  onClose?: () => void;
  /**
   * 閉じるボタンを表示するかどうか（デフォルト: true）
   * en: Whether to show close button (default: true)
   */
  isCloseTrigger?: boolean;
  /**
   * 子要素
   * en: Child nodes
   */
  children?: React.ReactNode;
}

/**
 * **概要 / Overview**
 *
 * - インラインメッセージはユーザーにシステムやサービスの状態を伝えるために使用するコンポーネントです。
 * - en: The InlineMessage component is used to convey system or service status to users.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <InlineMessage status="info" onClose={() => console.log('closed')}>
 *   <InlineMessageTitle>情報</InlineMessageTitle>
 *   <InlineMessageDescription>
 *     これは情報メッセージです。
 *   </InlineMessageDescription>
 * </InlineMessage>
 * ```
 *
 * @param {InlineMessageProps} props
 */
const InlineMessage = React.forwardRef<HTMLDivElement, InlineMessageProps>(
  (
    { className, status = "info", onClose, isCloseTrigger = true, children, ...props },
    ref
  ) => {
    // ルート要素参照 / en: root element ref
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );
    // ステータスに対応するアイコン情報の取得
    const statusIcon = status ? statusIcons[status] : statusIcons.info;

    // ステータスに対応する色クラスの取得
    const colorClass = status
      ? statusColorClasses[status]
      : statusColorClasses.info;

    // aria 属性自動付与 / en: auto wiring aria-labelledby & aria-describedby
    React.useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const titleEl = root.querySelector<HTMLElement>(
        "[data-inline-message-title]"
      );
      const descEl = root.querySelector<HTMLElement>(
        "[data-inline-message-description]"
      );
      if (titleEl) {
        if (!titleEl.id)
          titleEl.id = `inline-message-title-${Math.random().toString(36).slice(2, 9)}`;
        root.setAttribute("aria-labelledby", titleEl.id);
      } else {
        root.removeAttribute("aria-labelledby");
      }
      if (descEl) {
        if (!descEl.id)
          descEl.id = `inline-message-desc-${Math.random().toString(36).slice(2, 9)}`;
        root.setAttribute("aria-describedby", descEl.id);
      } else {
        root.removeAttribute("aria-describedby");
      }
    }, [children]);

    return (
      <div
        ref={setRootRef}
        role="alert"
        className={cn(inlineMessageVariants({ status }), className)}
        {...props}
      >
        {/* ステータスアイコン */}
        <span
          className="inline-flex w-8 h-8 items-center justify-center"
          aria-hidden="true"
        >
          <Icon
            icon={statusIcon}
            size={6}
            fill={false}
            className={cn(colorClass)}
          />
        </span>

        {/* メッセージ本文 */}
        <div className="flex flex-col flex-1 min-h-8">{children}</div>

        {/* 閉じるボタン（表示条件あり） */}
        {isCloseTrigger && onClose && (
          <IconButton
            icon="close"
            size="sm"
            variant="ghost"
            theme="neutral"
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
 * **概要 / Overview**
 *
 * - インラインメッセージのタイトルコンポーネントです。
 * - en: Title component for inline messages.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <InlineMessageTitle>タイトル</InlineMessageTitle>
 * ```
 *
 * @param props
 */
const InlineMessageTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center min-h-8")}>
    <span
      ref={ref}
      data-inline-message-title
      className={cn("character-3-bold-pro text-text-high", className)}
      {...props}
    />
  </div>
));
InlineMessageTitle.displayName = "InlineMessageTitle";

/**
 * **概要 / Overview**
 *
 * - インラインメッセージの説明文コンポーネントです。
 * - en: Description component for inline messages.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <InlineMessageDescription>詳細な説明文</InlineMessageDescription>
 * ```
 *
 * @param props
 */
const InlineMessageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center min-h-8")}>
    <p
      ref={ref}
      data-inline-message-description
      className={cn("character-3-regular-pro text-text-middle", className)}
      {...props}
    />
  </div>
));
InlineMessageDescription.displayName = "InlineMessageDescription";

export { InlineMessage, InlineMessageTitle, InlineMessageDescription };
