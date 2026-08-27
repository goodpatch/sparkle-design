/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  [
    // `relative` is required because we absolutely-position the loading spinner at the center.
    "relative inline-flex items-center justify-center gap-0.5 whitespace-nowrap rounded-action transition-colors",
    "cursor-pointer disabled:cursor-not-allowed aria-disabled:cursor-not-allowed",
    "shrink-0 outline-none",
    "focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        // solid の 1px 枠線は Figma の刷新で削除された（shadow も base = 影なし）
        // en: The 1px border on solid was removed in the Figma refresh (shadow is base = none).
        solid: "shadow-base",
        outline: "border shadow-base",
        ghost: "",
      },
      size: {
        sm: "h-8 min-w-16 px-3 py-1 character-2-bold-pro",
        md: "h-10 min-w-20 px-4 py-1.5 character-3-bold-pro",
        lg: "h-12 min-w-24 px-5 py-2 character-4-bold-pro",
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
          "bg-surface-primary-high-enabled",
          "text-text-inverse",
          "hover:bg-surface-primary-high-hover",
          "active:bg-surface-primary-high-active",
          "disabled:bg-surface-primary-high-disabled aria-disabled:bg-surface-primary-high-disabled",
        ].join(" "),
      },
      {
        // ローディング中に見えるのはスピナー（currentColor 継承）なので object トークンで着色する
        // en: Only the spinner (inherits currentColor) is visible while loading, so color it with the object token.
        variant: "solid",
        theme: "primary",
        isLoading: true,
        className:
          "disabled:bg-surface-primary-high-enabled aria-disabled:bg-surface-primary-high-enabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      // solid neutral
      {
        variant: "solid",
        theme: "neutral",
        isLoading: false,
        className: [
          "bg-surface-neutral-high-enabled",
          "text-text-inverse",
          "hover:bg-surface-neutral-high-hover",
          "active:bg-surface-neutral-high-active",
          "disabled:bg-surface-neutral-high-disabled aria-disabled:bg-surface-neutral-high-disabled",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "neutral",
        isLoading: true,
        className:
          "disabled:bg-surface-neutral-high-enabled aria-disabled:bg-surface-neutral-high-enabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      // solid negative
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        className: [
          "bg-surface-negative-high-enabled",
          "text-text-inverse",
          "hover:bg-surface-negative-high-hover",
          "active:bg-surface-negative-high-active",
          "disabled:bg-surface-negative-high-disabled aria-disabled:bg-surface-negative-high-disabled",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "negative",
        isLoading: true,
        className:
          "disabled:bg-surface-negative-high-enabled aria-disabled:bg-surface-negative-high-enabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      // outline primary
      {
        variant: "outline",
        theme: "primary",
        isLoading: false,
        className: [
          "bg-surface-base-0",
          "text-text-primary-enabled",
          "border-border-primary-high",
          "hover:bg-surface-primary-low-hover",
          "hover:text-text-primary-hover",
          "active:bg-surface-primary-low-active",
          "active:text-text-primary-active",
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled",
          "disabled:border-border-primary-low aria-disabled:border-border-primary-low",
          "disabled:text-text-primary-disabled aria-disabled:text-text-primary-disabled",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        className:
          "disabled:bg-surface-base-0 aria-disabled:bg-surface-base-0 disabled:text-object-primary-enabled aria-disabled:text-object-primary-enabled disabled:border-border-primary-high aria-disabled:border-border-primary-high",
      },
      // outline neutral
      {
        variant: "outline",
        theme: "neutral",
        isLoading: false,
        className: [
          "bg-surface-base-0",
          "text-text-neutral-middle",
          "border-border-neutral-high",
          "hover:bg-surface-neutral-low-hover",
          "hover:text-text-neutral-high",
          "active:bg-surface-neutral-low-active",
          "active:text-text-neutral-high",
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled",
          "disabled:border-border-neutral-low aria-disabled:border-border-neutral-low",
          "disabled:text-text-neutral-disabled aria-disabled:text-text-neutral-disabled",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "neutral",
        isLoading: true,
        className:
          "disabled:bg-surface-base-0 aria-disabled:bg-surface-base-0 disabled:text-object-neutral-middle aria-disabled:text-object-neutral-middle disabled:border-border-neutral-high aria-disabled:border-border-neutral-high",
      },
      // outline negative
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        className: [
          "bg-surface-base-0",
          "text-text-negative-enabled",
          "border-border-negative-high",
          "hover:bg-surface-negative-low-hover",
          "hover:text-text-negative-hover",
          "active:bg-surface-negative-low-active",
          "active:text-text-negative-active",
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled",
          "disabled:border-border-negative-low aria-disabled:border-border-negative-low",
          "disabled:text-text-negative-disabled aria-disabled:text-text-negative-disabled",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        className:
          "disabled:bg-surface-base-0 aria-disabled:bg-surface-base-0 disabled:text-object-negative-enabled aria-disabled:text-object-negative-enabled disabled:border-border-negative-high aria-disabled:border-border-negative-high",
      },
      // ghost primary
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        className: [
          "text-text-primary-enabled",
          "hover:bg-surface-primary-low-hover",
          "hover:text-text-primary-hover",
          "active:bg-surface-primary-low-active",
          "active:text-text-primary-active",
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled",
          "disabled:text-text-primary-disabled aria-disabled:text-text-primary-disabled",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        className:
          "disabled:text-object-primary-enabled aria-disabled:text-object-primary-enabled",
      },
      // ghost neutral
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: false,
        className: [
          "text-text-neutral-middle",
          "hover:bg-surface-neutral-low-hover",
          "hover:text-text-neutral-high",
          "active:bg-surface-neutral-low-active",
          "active:text-text-neutral-high",
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled",
          "disabled:text-text-neutral-disabled aria-disabled:text-text-neutral-disabled",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: true,
        className:
          "disabled:text-object-neutral-middle aria-disabled:text-object-neutral-middle",
      },
      // ghost negative
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        className: [
          "text-text-negative-enabled",
          "hover:bg-surface-negative-low-hover",
          "hover:text-text-negative-hover",
          "active:bg-surface-negative-low-active",
          "active:text-text-negative-active",
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled",
          "disabled:text-text-negative-disabled aria-disabled:text-text-negative-disabled",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "negative",
        isLoading: true,
        className:
          "disabled:text-object-negative-enabled aria-disabled:text-object-negative-enabled",
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
type NativeButtonProps = React.ComponentProps<"button">;

export interface ButtonProps
  extends Omit<
    NativeButtonProps,
    | "onClick"
    | "onKeyDown"
    | "onClickCapture"
    | "onKeyDownCapture"
    | "onAuxClickCapture"
    | "ref"
  > {
  /**
   * ルート要素への ref。`asChild` で `<a>` 等を差し込むケースを受け入れるため
   * `HTMLButtonElement` ではなく `HTMLElement` で広く受ける
   * en: Ref to the root element. Typed as `HTMLElement` (not `HTMLButtonElement`)
   * so `asChild` targets such as `<a>` are accepted.
   */
  ref?: React.Ref<HTMLElement>;
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

  /**
   * onClick handler.
   *
   * We intentionally type this as HTMLElement because `asChild` can render non-button elements.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * onKeyDown handler.
   *
   * We intentionally type this as HTMLElement because `asChild` can render non-button elements.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;

  /**
   * capture フェーズのクリックハンドラ。無効時はコンポーネント側のガードが優先される
   * en: Capture-phase click handler. The component's disabled guard takes precedence.
   */
  onClickCapture?: React.MouseEventHandler<HTMLElement>;

  /**
   * capture フェーズのキー押下ハンドラ。無効時はコンポーネント側のガードが優先される
   * en: Capture-phase keydown handler. The component's disabled guard takes precedence.
   */
  onKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;

  /**
   * capture フェーズの中クリックハンドラ。無効時はコンポーネント側のガードが優先される
   * en: Capture-phase auxclick handler. The component's disabled guard takes precedence.
   */
  onAuxClickCapture?: React.MouseEventHandler<HTMLElement>;

  /**
   * @deprecated アクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）により、基本的に使用を避けてください。
   * en: Deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Avoid using this in most cases.
   *
   * Prefer using `onClick` (activation on release) instead of triggering actions on pointer down.
   * ref: https://www.w3.org/TR/WCAG21/#pointer-cancellation
   */
  onMouseDown?: React.MouseEventHandler<HTMLElement>;

  /**
   * @deprecated アクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）により、基本的に使用を避けてください。
   * en: Deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Avoid using this in most cases.
   *
   * Prefer using `onClick` (activation on release) instead of triggering actions on pointer down.
   * ref: https://www.w3.org/TR/WCAG21/#pointer-cancellation
   */
  onPointerDown?: React.PointerEventHandler<HTMLElement>;

  /**
   * @deprecated アクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）により、基本的に使用を避けてください。
   * en: Deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Avoid using this in most cases.
   *
   * Prefer using `onClick` (activation on release) instead of triggering actions on pointer down.
   * ref: https://www.w3.org/TR/WCAG21/#pointer-cancellation
   */
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
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
 * **アンチパターン / Anti-patterns**
 *
 * - `<Icon>` を children として渡さないでください。`prefixIcon` / `suffixIcon` props を使用してください。
 *   en: Do not pass `<Icon>` as children. Use `prefixIcon` / `suffixIcon` props instead.
 * - アイコンのみのボタンには `IconButton` を使用してください。
 *   en: Use `IconButton` for icon-only buttons.
 * - `asChild` 使用時は `prefixIcon` / `suffixIcon` / `isLoading` が反映されません。必要ならスロット先でアイコンやローディング表現を構成してください。
 *   en: In `asChild` mode, `prefixIcon`, `suffixIcon`, and `isLoading` are ignored. Render icons and loading states inside the slotted child when needed.
 * - `asChild` で差し込んだ要素が指定した props（`type` や `disabled` など）は、Slot のマージで
 *   コンポーネント側の値より優先されます。
 *   en: Props set on the slotted element itself (such as `type` or `disabled`) win over the
 *   component's own values through Slot's prop merging.
 *
 * ```tsx
 * // ✅ Correct
 * <Button prefixIcon="check">確定</Button>
 *
 * // ❌ Wrong - Icon を children に入れない
 * <Button><Icon icon="check" /> 確定</Button>
 *
 * // ❌ Wrong - children なしの Button + prefixIcon は IconButton に置き換える
 * <Button prefixIcon="close" aria-label="閉じる" />
 *
 * // ❌ Wrong - asChild では prefixIcon は反映されない
 * <Button asChild prefixIcon="add">
 *   <Link href="/items/new">新規作成</Link>
 * </Button>
 *
 * // ✅ Correct
 * <IconButton icon="edit" aria-label="編集" />
 * <Button asChild>
 *   <Link href="/items/new">新規作成</Link>
 * </Button>
 * ```

 * **アクセシビリティ / Accessibility**
 *
 * - ボタンにはアクセシブルネームが必要です（通常は `children` のテキスト）。
 *   アイコンのみの場合は `aria-label` / `aria-labelledby` を付与するか、可能なら `IconButton` を使用してください。
 * - `isLoading` の場合でもアクセシブルネームは維持されます。
 * - `asChild` を使う場合、子要素がボタン相当のセマンティクス（role/キーボード操作）を満たすようにしてください。
 * - `asChild` で `<a>` など button 以外の要素を差し込んで無効化した場合、`aria-disabled` の付与、
 *   click / auxclick / Enter・Space の抑止、`aria-disabled:` プレフィックスによる無効時の配色まで
 *   このコンポーネントが行います（`data-disabled="true"` も利用側のスタイルフックとして出力）。
 *   差し込み先が native の `<button>` の場合は `disabled` 属性がそのまま渡ります。
 * - `type` / `form` / `value` など button 専用の props は、差し込み先が native の `<button>` の
 *   ときだけ転送されます。それ以外の要素では不正な属性になるため落とし、dev ビルドで警告します。
 *   必要な場合は差し込む要素側に直接指定してください（Slot のマージで子の指定が優先されます）。
 *   また無効時は `onMouseDown` / `onPointerDown` / `onTouchStart` も呼ばれません（native の
 *   `disabled` な `<button>` に揃えた挙動です）。
 *   en: Button-only props such as `type`, `form`, and `value` are forwarded only when the slot is a
 *   native `<button>`; on other elements they would be invalid attributes, so they are dropped with
 *   a dev warning — set them on the slotted element instead (child props win in Slot's merge).
 *   While disabled, `onMouseDown` / `onPointerDown` / `onTouchStart` are not invoked either,
 *   matching a native disabled `<button>`.
 * - `aria-disabled` を直接渡した場合も、無効時の配色が当たり操作が抑止されます（native の
 *   `disabled` 属性は付けないため、フォーカスは残ります）。無効化には基本的に `isDisabled` を
 *   使ってください。
 *   en: Passing `aria-disabled` directly also applies the disabled colors and blocks activation
 *   (the native `disabled` attribute is not set, so the element stays focusable). Prefer
 *   `isDisabled` for disabling.
 *   なお `aria-disabled` の要素は既定でフォーカス可能なままです。無効な項目の存在と理由を
 *   支援技術の利用者に伝えられるため通常はそのままで構いません。タブ順から外す必要がある場合のみ
 *   差し込む要素側で `tabIndex={-1}` を指定してください。
 *   en: When disabled with `asChild` and a non-button element such as `<a>`, this component sets
 *   `aria-disabled`, blocks click / auxclick / Enter / Space, and applies the disabled colors via
 *   `aria-disabled:`-prefixed utilities (`data-disabled="true"` is also emitted as a styling hook).
 *   A slotted native `<button>` receives the real `disabled` attribute instead.
 * - native の `<button>` かどうかは差し込んだ要素そのもので判定するため、内部で `<button>` を
 *   描画するカスタムコンポーネントを渡した場合は非 button として扱われます。
 *   また無効時に抑止できるのは click / auxclick / Enter・Space までで、コンテキストメニューの
 *   「新しいタブで開く」は止められません。確実に遷移させたくない場合は差し込む要素側で
 *   `href` を外してください。
 *   en: Whether the slot is a native `<button>` is decided from the slotted element itself, so a
 *   custom component that renders a `<button>` internally is treated as a non-button. Also, only
 *   click / auxclick / Enter / Space can be blocked while disabled — "open in new tab" from the
 *   context menu cannot. Drop `href` on the slotted element when navigation must not happen.
 *   An `aria-disabled` element stays focusable by design, which is usually what you want; set
 *   `tabIndex={-1}` on the slotted element only when it must leave the tab order.
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
  ref,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
  const isButtonDisabled = isLoading || isDisabled || disabled;

  // 利用者が aria-disabled を直接指定した場合も、見た目に合わせて操作を抑止する。
  // native の disabled 属性は付けないため、フォーカスは残る（soft disabled）
  // en: A caller-provided aria-disabled also blocks activation so the behavior matches the look.
  // The native `disabled` attribute is not set, so the element stays focusable (soft disabled).
  const isSoftDisabled =
    props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const isActivationBlocked = Boolean(isButtonDisabled) || isSoftDisabled;

  // asChild で差し込まれたのが native の <button> なら、button 専用の props を渡してよい。
  // Slot は子の props を優先するため、差し込み側が明示した type はそのまま尊重される
  // en: When the slotted element is a native <button>, button-only props can be forwarded.
  // Slot gives the child's props precedence, so an explicit `type` on the child still wins.
  const isSlottedNativeButton =
    asChild && React.isValidElement(children) && children.type === "button";
  const canUseButtonProps = !asChild || isSlottedNativeButton;

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

  const hasAccessibleNameProp =
    ("aria-label" in props && Boolean(props["aria-label"])) ||
    ("aria-labelledby" in props && Boolean(props["aria-labelledby"]));
  const hasChildren = React.Children.count(children) > 0;
  // asChild では children が差し込む要素そのものなので、その要素のラベル / テキストを見る
  // en: With asChild the children are the slotted element itself, so inspect its label / text.
  const slottedChildProps = React.isValidElement(children)
    ? (children.props as {
        "aria-label"?: string;
        "aria-labelledby"?: string;
        children?: React.ReactNode;
      })
    : undefined;
  const hasAccessibleName = asChild
    ? hasAccessibleNameProp ||
      Boolean(
        slottedChildProps?.["aria-label"] ||
          slottedChildProps?.["aria-labelledby"]
      ) ||
      React.Children.count(slottedChildProps?.children) > 0
    : hasChildren || hasAccessibleNameProp;

  if (process.env.NODE_ENV !== "production") {
    if (!hasAccessibleName) {
      // Icon-only button should use IconButton, or provide aria-label/labelledby.
      // Keep it as a warning (not an exception) to avoid breaking existing usage.
      console.warn(
        "[Button] Accessible name is missing. Provide children text, or set aria-label/aria-labelledby. For icon-only actions, consider using IconButton."
      );
    }
    // asChild で単一要素以外を渡すと、Slot が何も描画しない / React が例外を投げる
    // en: With asChild, anything other than a single element makes Slot render nothing or throw.
    if (asChild && !React.isValidElement(children)) {
      console.warn(
        "[Button] asChild には単一の React 要素を children として渡してください。" +
          "要素以外では何も描画されず、複数要素では実行時エラーになります。" +
          " / asChild requires a single React element child: anything else renders nothing or throws."
      );
    }
    // button 専用の props は button 以外の差し込み先には渡さない（無効な属性になるため）
    // en: Button-only props are not forwarded to non-button slots: they would be invalid attributes.
    if (asChild && !canUseButtonProps) {
      const droppedProps = (
        [
          "type",
          "form",
          "formAction",
          "formEncType",
          "formMethod",
          "formNoValidate",
          "formTarget",
          "value",
          "popoverTarget",
          "popoverTargetAction",
        ] as const
      ).filter(name => props[name] !== undefined);

      if (droppedProps.length > 0) {
        console.warn(
          `[Button] asChild で button 以外の要素を差し込む場合、${droppedProps.join(" / ")} は無視されます。` +
            "必要な場合は差し込む要素側に直接指定してください。" +
            ` / In asChild mode with a non-button element, ${droppedProps.join(" / ")} are ignored — set them on the slotted element instead.`
        );
      }
    }
    if (asChild && (prefixIcon || suffixIcon || isLoading)) {
      console.warn(
        "[Button] asChild mode does not support prefixIcon, suffixIcon, or isLoading. These props will be ignored."
      );
    }

    if (props.onMouseDown || props.onPointerDown || props.onTouchStart) {
      console.warn(
        "[Button] onMouseDown/onPointerDown/onTouchStart are deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Prefer onClick (activation on release)."
      );
    }
  }

  const {
    onClick,
    onKeyDown,
    onClickCapture,
    onKeyDownCapture,
    onAuxClickCapture,
    onMouseDown,
    onPointerDown,
    onTouchStart,
    type,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    value,
    popoverTarget,
    popoverTargetAction,
    "aria-disabled": ariaDisabled,
    ...restProps
  } = props;

  // button 専用の props は、差し込み先が native の <button> のときだけ渡す。
  // <a> 等に渡すと不正な属性になるため
  // en: Button-only props are forwarded only when the slot is a native <button>; on elements
  // like <a> they would be invalid attributes.
  const buttonOnlyProps = canUseButtonProps
    ? {
        type: type || "button",
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        value,
        popoverTarget,
        popoverTargetAction,
      }
    : {};

  // 無効時のガードは capture フェーズで行う。Radix Slot は「差し込んだ要素自身のハンドラ →
  // Slot 側のハンドラ」の順で合成するため、bubble フェーズのガードでは子のハンドラを止められない
  // en: Guard in the capture phase. Radix Slot composes handlers as "the slotted element's own
  // handler first, then the slot's", so a bubble-phase guard cannot stop the child's handler.
  const handleClickCapture: React.MouseEventHandler<HTMLElement> = event => {
    if (isActivationBlocked) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClickCapture?.(event);
  };

  const handleKeyDownCapture: React.KeyboardEventHandler<
    HTMLElement
  > = event => {
    if (isActivationBlocked) {
      // asChild で <a> 等を差し込んだ場合に Enter / Space での実行を止める。
      // それ以外のキーは伝播を止めないが、無効時は利用者の onKeyDown も呼ばない
      // en: Other keys keep propagating, but the caller's onKeyDown is not invoked
      // while disabled.
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    onKeyDownCapture?.(event);
  };

  // 中クリックは click ではなく auxclick として飛ぶため、別途止める必要がある
  // en: A middle click fires `auxclick`, not `click`, so it needs its own guard.
  const handleAuxClickCapture: React.MouseEventHandler<HTMLElement> = event => {
    if (isActivationBlocked) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onAuxClickCapture?.(event);
  };

  // capture 側で stopPropagation するため、無効時にこの bubble 側ハンドラへは到達しない。
  // capture が本体・こちらは保険として残している
  // en: The capture guard stops propagation, so this bubble handler is not reached while
  // disabled. The capture phase is the real guard; this one is a safety net.
  const handleClick: React.MouseEventHandler<HTMLElement> = event => {
    if (isActivationBlocked) {
      return;
    }
    onClick?.(event);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
    if (isActivationBlocked) {
      return;
    }
    onKeyDown?.(event);
  };

  // Slot は「差し込んだ要素自身のハンドラ → Slot のハンドラ」の順で合成するため、
  // 無効時は子側の capture ハンドラを外してガードを確実に先に効かせる。
  // 同様に子が明示した disabled も、無効時はコンポーネント側の状態を優先する
  // en: Slot composes "the slotted element's own handler first, then the slot's", so while
  // disabled we strip the child's capture handlers to keep the guard authoritative. The
  // component's disabled state also overrides a `disabled` set on the child.
  const slottedChildren =
    asChild && isActivationBlocked && React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          {
            onClickCapture: undefined,
            onAuxClickCapture: undefined,
            onKeyDownCapture: undefined,
            onMouseDown: undefined,
            onPointerDown: undefined,
            onTouchStart: undefined,
            ...(canUseButtonProps && isButtonDisabled
              ? { disabled: true }
              : {}),
          }
        )
      : children;

  return (
    <Comp
      // asChild ケースで <a> 等を受け入れるため公開 API は HTMLElement で広く受けるが、
      // 内部の Comp は <button> 固定の union が含まれるためここで narrow する。
      // en: Public ref is HTMLElement (covers asChild targets); inner Comp's button branch needs narrowing.
      ref={ref as React.Ref<HTMLButtonElement>}
      data-slot="button"
      aria-busy={isLoading || undefined}
      // 無効時はコンポーネント側の値を優先し、それ以外は利用者の指定をそのまま通す
      // en: While disabled the component's value wins; otherwise the caller's value passes through.
      aria-disabled={
        !canUseButtonProps && isButtonDisabled ? true : ariaDisabled
      }
      data-disabled={asChild && isButtonDisabled ? "true" : undefined}
      disabled={canUseButtonProps ? isButtonDisabled : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          theme,
          isLoading,
          className,
        })
      )}
      {...buttonOnlyProps}
      // 無効時は pointer 系のハンドラも渡さない（native の disabled 相当に揃える）
      // en: While disabled, pointer handlers are not forwarded either, matching a native disabled button.
      onMouseDown={isActivationBlocked ? undefined : onMouseDown}
      onPointerDown={isActivationBlocked ? undefined : onPointerDown}
      onTouchStart={isActivationBlocked ? undefined : onTouchStart}
      onClickCapture={handleClickCapture}
      onAuxClickCapture={handleAuxClickCapture}
      onKeyDownCapture={handleKeyDownCapture}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {asChild ? (
        slottedChildren
      ) : (
        <>
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
                <Spinner size={getIconSize()} className="text-current" />
              </span>
              <span className="opacity-0">{children}</span>
            </>
          ) : (
            <span className="px-1">{children}</span>
          )}

          {suffixIcon && (
            <Icon
              icon={suffixIcon}
              size={getIconSize()}
              className={cn({ "opacity-0": isLoading })}
            />
          )}
        </>
      )}
    </Comp>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
