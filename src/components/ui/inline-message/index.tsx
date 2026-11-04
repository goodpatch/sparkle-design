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
  [
    "relative w-[448px] max-w-full rounded-notice border p-3 flex gap-2 items-start",
    // 上から出る。閉じるときは data-closing で退場を再生してから onClose を呼ぶ
    // en: Drops in from above. On close, data-closing plays the exit before onClose is called
    "animate-motion-pop-in [--motion-pop-from-y:-1] data-[closing]:animate-motion-pop-out data-[closing]:pointer-events-none",
  ].join(" "),
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
 * - 既定の幅は Figma と同じ 448px（`max-w-full` で親より広がらない）。`w-fit` / `inline-flex` / auto の grid トラックなど、中身の幅で決まる親の中では親を 448px まで押し広げるため、`className="w-full"` を渡すか `contain: inline-size` の要素で包む。
 * - en: The default width is 448px, matching Figma (capped by `max-w-full`). Inside a parent sized by its content (`w-fit`, `inline-flex`, auto grid tracks), it widens the parent to 448px; pass `className="w-full"` or wrap it in an element with `contain: inline-size`.
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

  // 閉じるボタンを押したら、退場のアニメーションを再生し終えてから onClose を呼ぶ
  // en: When the close button is pressed, call onClose after the exit animation finishes
  const [closing, setClosing] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      elementRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const finishClose = React.useCallback(() => {
    // 利用側が外さなかったときは、元の表示に戻す
    // en: If the consumer keeps the message mounted, it returns to its normal state
    setClosing(false);
    onCloseRef.current?.();
  }, []);

  React.useLayoutEffect(() => {
    if (!closing) return;
    const element = elementRef.current;
    const animationName = element
      ? getComputedStyle(element).animationName
      : "";
    // アニメーションが無い（className で上書きされた、テスト環境など）ときは待たずに閉じる
    // en: Close right away when there is no animation (overridden className, test environments, etc.)
    if (!animationName || animationName === "none") finishClose();
  }, [closing, finishClose]);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    props.onAnimationEnd?.(event);
    if (closing && event.target === event.currentTarget) finishClose();
  };

  // ステータスに対応するアイコン情報の取得
  const statusIcon = status ? statusIcons[status] : statusIcons.info;

  // ステータスに対応する色クラスの取得
  const colorClass = status
    ? statusColorClasses[status]
    : statusColorClasses.info;

  return (
    <InlineMessageContext.Provider value={contextValue}>
      <div
        role="alert"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDesc ? descId : undefined}
        className={cn(inlineMessageVariants({ status }), className)}
        {...props}
        ref={setRefs}
        data-closing={closing ? "" : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* ステータスアイコン */}
        <span
          className="inline-flex p-1 items-center justify-center"
          aria-hidden="true"
        >
          <Icon
            icon={statusIcon}
            size={7}
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
            onClick={() => setClosing(true)}
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
