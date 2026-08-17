/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

// ステータスごとのスタイル定義
const inlineMessageVariants = cva(
  "relative w-[448px] max-w-full rounded-notice border p-3 flex gap-2 items-start",
  {
    variants: {
      status: {
        info: "bg-surface-info-low border-border-info",
        warning: "bg-surface-warning-low border-border-warning",
        negative:
          "bg-surface-negative-middle-enabled border-border-negative-high",
        success: "bg-surface-success-low border-border-success",
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
  info: "text-object-info",
  warning: "text-object-warning",
  negative: "text-object-negative-enabled",
  success: "text-object-success",
};

// Context: 子コンポーネントが自分の存在を親に登録するための仕組み
// en: Context for child components to register their presence with parent
interface InlineMessageContextValue {
  titleId: string;
  descId: string;
  registerTitle: () => () => void;
  registerDesc: () => () => void;
}

const InlineMessageContext =
  React.createContext<InlineMessageContextValue | null>(null);

type InlineMessageVariant = VariantProps<typeof inlineMessageVariants>;
export interface InlineMessageProps
  extends React.ComponentProps<"div">,
    InlineMessageVariant {
  /**
   * メッセージのステータス
   * en: Status of the message
   */
  status: InlineMessageVariant["status"];
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
function InlineMessage({
  className,
  status = "info",
  onClose,
  isCloseTrigger = true,
  children,
  ref,
  ...props
}: InlineMessageProps) {
  // 一意なIDを生成 / en: Generate unique IDs
  const baseId = React.useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  // 子コンポーネントの登録状態 / en: Registration state of child components
  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDesc, setHasDesc] = React.useState(false);

  // 子コンポーネントが自分を登録するコールバック
  // en: Callbacks for child components to register themselves
  const registerTitle = React.useCallback(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, []);

  const registerDesc = React.useCallback(() => {
    setHasDesc(true);
    return () => setHasDesc(false);
  }, []);

  // Context値をメモ化 / en: Memoize context value
  const contextValue = React.useMemo<InlineMessageContextValue>(
    () => ({ titleId, descId, registerTitle, registerDesc }),
    [titleId, descId, registerTitle, registerDesc]
  );

  // ステータスに対応するアイコン情報の取得
  const statusIcon = status ? statusIcons[status] : statusIcons.info;

  // ステータスに対応する色クラスの取得
  const colorClass = status
    ? statusColorClasses[status]
    : statusColorClasses.info;

  return (
    <InlineMessageContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="alert"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDesc ? descId : undefined}
        className={cn(inlineMessageVariants({ status }), className)}
        {...props}
      >
        {/* ステータスアイコン */}
        <span
          className="inline-flex p-1 items-center justify-center"
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
    </InlineMessageContext.Provider>
  );
}
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
 * @param {React.HTMLAttributes<HTMLSpanElement>} props
 */
function InlineMessageTitle({
  className,
  ref,
  ...props
}: React.ComponentProps<"span">) {
  const context = React.useContext(InlineMessageContext);

  // マウント時に親へ登録、アンマウント時に解除
  // en: Register on mount, unregister on unmount
  React.useEffect(() => {
    if (!context) return;
    return context.registerTitle();
  }, [context]);

  return (
    <div className={cn("flex items-center min-h-8")}>
      <span
        ref={ref}
        id={context?.titleId}
        className={cn("character-3-bold-pro text-text-neutral-high", className)}
        {...props}
      />
    </div>
  );
}
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
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props
 */
function InlineMessageDescription({
  className,
  ref,
  ...props
}: React.ComponentProps<"p">) {
  const context = React.useContext(InlineMessageContext);

  // マウント時に親へ登録、アンマウント時に解除
  // en: Register on mount, unregister on unmount
  React.useEffect(() => {
    if (!context) return;
    return context.registerDesc();
  }, [context]);

  return (
    <div className={cn("flex items-center min-h-8")}>
      <p
        ref={ref}
        id={context?.descId}
        className={cn(
          "character-3-regular-pro text-text-neutral-middle",
          className
        )}
        {...props}
      />
    </div>
  );
}
InlineMessageDescription.displayName = "InlineMessageDescription";

export { InlineMessage, InlineMessageTitle, InlineMessageDescription };
