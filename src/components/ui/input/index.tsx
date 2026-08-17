/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { useMergeRefs } from "@/hooks/useMergeRefs";
import { useInputContainerFocus } from "@/hooks/useInputContainerFocus";

// 入力フィールドのスタイル定義
const inputVariants = cva(
  "flex gap-0 items-center w-full rounded-action border bg-surface-base-0 transition-colors p-1",
  {
    variants: {
      size: {
        sm: "h-8 character-2-regular-pro",
        md: "h-10 character-3-regular-pro",
        lg: "h-12 character-4-regular-pro",
      },
      isInvalid: {
        true: "border-border-negative-extra-high-enabled",
        false: "border-border-neutral-extra-high-enabled",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
      isFocused: {
        true: "ring-2 ring-border-ring ring-offset-2 outline-hidden",
        false: "",
      },
    },
    compoundVariants: [
      // 通常状態
      {
        isInvalid: false,
        isDisabled: false,
        className:
          "border-border-neutral-extra-high-enabled hover:border-border-neutral-extra-high-hover",
      },
      // エラー状態
      {
        isInvalid: true,
        isDisabled: false,
        className:
          "border-border-negative-extra-high-enabled hover:border-border-negative-extra-high-hover bg-surface-base-0",
      },
      // 無効状態
      {
        isInvalid: false,
        isDisabled: true,
        className:
          "border-border-neutral-extra-high-disabled bg-surface-neutral-middle-disabled",
      },
      // エラー+無効状態
      {
        isInvalid: true,
        isDisabled: true,
        className:
          "border-border-negative-extra-high-disabled bg-surface-neutral-middle-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
      isFocused: false,
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;
export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  /**
   * Inputサイズ指定
   * en: Input size specification
   */
  size?: InputVariantProps["size"];
  /**
   * 無効にするかどうか
   * en: Whether to disable the input
   */
  isDisabled?: boolean;
  /**
   * フォーカスするかどうか
   * en: Whether to focus the input
   */
  isFocused?: boolean;
  /**
   * フィールドが無効かどうか
   * en: Whether the field is invalid
   */
  isInvalid?: boolean;
  /**
   * アイコンボタンを有効にするフラグ
   * en: Flag to enable the icon button
   */
  isTrigger?: boolean;
  /**
   * ボタンに表示するアイコン名
   * en: Icon name displayed in the button
   */
  triggerIcon?: string;
  /**
   * アイコンボタンのアクセシビリティラベル
   * en: Accessibility label for the icon button
   */
  triggerAriaLabel?: string;
  /**
   * アイコンボタンクリック時のコールバック
   * en: Callback function for icon button click
   */
  onIconButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * トリガーボタンへフォワードする HTML / ARIA 属性。`isTrigger` が true のときのみ有効。
   * `aria-haspopup` / `aria-expanded` / `aria-controls` のように、Popover や Date Picker と
   * 連携する際に必要な属性を宣言的に渡すために使用する。
   *
   * 以下の属性は Input が内部で制御するため、`triggerProps` で渡しても無視される:
   * `ref` / `onFocus` / `onBlur` / `type` / `disabled` / `aria-label`（`triggerAriaLabel` が優先）
   * / `onClick`（`onIconButtonClick` が指定された場合のみ優先。未指定なら `triggerProps.onClick`
   * が使われる）。アイコンボタン自体の見た目（`icon` / `theme` / `variant` / `size`）も同様に
   * Input 側で固定される。
   *
   * en: HTML / ARIA attributes forwarded to the trigger button. Only applied when
   *     `isTrigger` is true. Use for attributes like `aria-haspopup`,
   *     `aria-expanded`, `aria-controls` when integrating with Popover or Date Picker.
   *     The following are controlled by Input and dropped if passed via
   *     `triggerProps`: `ref`, `onFocus`, `onBlur`, `type`, `disabled`, `aria-label`
   *     (the dedicated `triggerAriaLabel` wins), and the visual props
   *     `icon` / `theme` / `variant` / `size`. `onClick` is overridden only when
   *     `onIconButtonClick` is provided; otherwise `triggerProps.onClick` is used.
   */
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * **概要 / Overview**
 *
 * - インプットはテキストフィールドの形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Input component is used to capture user input in the form of a text field.
 *
 * **アンチパターン / Anti-patterns**
 *
 * - Input の横にアイコンボタンを手動で配置しないでください。`isTrigger` / `triggerIcon` props を使用してください。
 *   en: Do not manually place an IconButton next to Input. Use `isTrigger` / `triggerIcon` props instead.
 * - Input と横並びの Button は原則同じサイズにしてください。デフォルトの Input には `Button size="md"`、省スペース UI では `Input size="sm"` と `Button size="sm"` を使ってください。
 *   en: Keep Button size aligned when placing it next to Input. Use `Button size="md"` with the default Input, or pair `Input size="sm"` with `Button size="sm"` in compact UIs.
 * - 無効状態は `isDisabled` を優先して使ってください。HTML 標準の `disabled` も互換のため受け付けますが、Sparkle Design のコードでは `isDisabled` に統一します。
 *   en: Prefer `isDisabled` for disabled state. The native `disabled` prop is still supported for compatibility, but Sparkle Design code should standardize on `isDisabled`.
 *
 * ```tsx
 * // ✅ Correct
 * <>
 *   <Input
 *     isTrigger
 *     triggerIcon="search"
 *     triggerAriaLabel="検索"
 *     onIconButtonClick={() => {}}
 *   />
 *   <div className="flex gap-2">
 *     <Input placeholder="検索..." />
 *     <Button size="md">検索</Button>
 *   </div>
 *   <div className="flex gap-2">
 *     <Input size="sm" placeholder="メッセージ" />
 *     <Button size="sm">送信</Button>
 *   </div>
 *   <Input isDisabled placeholder="無効状態" />
 * </>
 *
 * // ❌ Wrong - 手動配置
 * <div className="flex">
 *   <Input />
 *   <IconButton icon="search" aria-label="検索" />
 * </div>
 *
 * // ❌ Wrong - サイズ不一致
 * <div className="flex gap-2">
 *   <Input placeholder="検索..." />
 *   <Button size="sm">検索</Button>
 * </div>
 * ```

 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Input
 *   size="md"
 *   placeholder="テキストを入力"
 *   isTrigger
 *   triggerIcon="search"
 * />
 *
 * // Popover / Date Picker 連携時は triggerProps で ARIA を宣言的に渡す
 * <Input
 *   isTrigger
 *   triggerIcon="calendar_today"
 *   triggerAriaLabel="日付を選択"
 *   triggerProps={{
 *     "aria-haspopup": "dialog",
 *     "aria-expanded": open,
 *     "aria-controls": "date-picker-popover",
 *   }}
 * />
 * ```
 *
 * @param {InputProps} props
 */
function Input({
  className,
  size,
  isInvalid = false,
  isDisabled = false,
  isTrigger = false,
  triggerIcon = "edit",
  triggerAriaLabel,
  onIconButtonClick,
  triggerProps,
  disabled,
  defaultValue,
  value,
  onChange,
  onBlur,
  onFocus,
  ref,
  ...props
}: InputProps) {
  // Refs
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergedInputRef = useMergeRefs(inputRef, ref);

  // 状態管理
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [isIconButtonFocused, setIsIconButtonFocused] = React.useState(false);

  // HTML標準のdisabled属性とisDisabledプロパティを組み合わせた実際の無効状態
  const isInputDisabled = Boolean(isDisabled || disabled);

  // 入力値が変更されたときの処理
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isInputDisabled) return;
      onChange?.(e);
    },
    [onChange, isInputDisabled]
  );

  // Input要素のフォーカス処理
  const handleInputFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (isInputDisabled) return;
      setIsInputFocused(true);
      onFocus?.(e);
    },
    [isInputDisabled, onFocus]
  );

  const handleInputBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      // ボタンにフォーカスが移った場合は、入力欄のフォーカスは解除しない
      if (buttonRef.current !== e.relatedTarget) {
        setIsInputFocused(false);
      }
      onBlur?.(e);
    },
    [onBlur]
  );

  // ボタンのフォーカス処理
  const handleIconButtonFocus = React.useCallback(() => {
    if (isInputDisabled) return;
    setIsIconButtonFocused(true);
    setIsInputFocused(false);
  }, [isInputDisabled]);

  const handleIconButtonBlur = React.useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      // 入力欄にフォーカスが移った場合は、ボタンのフォーカスは解除しない
      if (inputRef.current !== e.relatedTarget) {
        setIsIconButtonFocused(false);
      }
    },
    []
  );

  // コンテナクリック時にインプットへフォーカスを移すハンドラ（ボタン上のクリックは除外）
  const excludeRefs = React.useMemo(() => [buttonRef], []);
  const handleContainerClick = useInputContainerFocus({
    targetRef: inputRef,
    isDisabled: isInputDisabled,
    excludeRefs,
  });

  // 外部クリックでフォーカスを解除するためのハンドラ
  React.useEffect(() => {
    // 無効状態の場合はイベントリスナーを追加しない
    if (isInputDisabled) return;

    const handleOutsideClick = (e: MouseEvent) => {
      // コンポーネント外のクリックを検出
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsInputFocused(false);
        setIsIconButtonFocused(false);
      }
    };

    // イベントリスナーを追加
    document.addEventListener("mousedown", handleOutsideClick);

    // クリーンアップ関数
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isInputDisabled]);

  // ボタンサイズの計算
  const iconButtonSize = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "xs";
      case "lg":
        return "md";
      default:
        return "sm";
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={cn(
        inputVariants({
          size,
          isInvalid,
          isDisabled: isInputDisabled,
          isFocused: isInputFocused && !isIconButtonFocused,
          className,
        }),
        !isInputDisabled && "cursor-text" // 入力可能な場合はテキストカーソルを表示
      )}
      // NOTE: not supportエラーがLintで出るためコメントアウト
      // aria-disabled={isInputDisabled}
      // aria-invalid={isInvalid === null ? undefined : isInvalid}
      onClick={handleContainerClick}
      role="presentation"
      tabIndex={-1}
    >
      <input
        ref={mergedInputRef}
        disabled={isInputDisabled}
        aria-invalid={isInvalid || undefined}
        className={cn(
          "w-full h-full bg-transparent border-none outline-hidden focus:outline-hidden",
          "text-text-neutral-high placeholder:text-text-neutral-low px-2",
          isInputDisabled &&
            "cursor-not-allowed text-text-neutral-disabled placeholder:text-text-neutral-disabled"
        )}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        value={value}
        aria-disabled={isInputDisabled}
        {...props}
      />

      {isTrigger && (
        <IconButton
          // triggerProps を先に展開し、専用 props (triggerAriaLabel / onIconButtonClick)
          // と内部制御プロパティで上書きする
          // en: Spread triggerProps first, then let dedicated props and internal
          //     control props override them
          {...triggerProps}
          ref={buttonRef}
          icon={triggerIcon}
          theme="neutral"
          variant="ghost"
          size={iconButtonSize}
          onClick={onIconButtonClick ?? triggerProps?.onClick}
          isDisabled={isInputDisabled}
          disabled={isInputDisabled}
          type="button" // フォーム内でデフォルトのsubmit動作を防ぐ
          aria-label={triggerAriaLabel ?? triggerProps?.["aria-label"]}
          onFocus={handleIconButtonFocus}
          onBlur={handleIconButtonBlur}
        />
      )}
    </div>
  );
}

Input.displayName = "Input";

export { Input, inputVariants };
