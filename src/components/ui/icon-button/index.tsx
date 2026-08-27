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

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-action",
    "ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2",
    "relative cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        // solid の 1px 枠線は Figma の刷新で削除された
        // en: The 1px border on solid was removed in the Figma refresh.
        solid: "",
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
          "bg-surface-primary-high-enabled text-object-inverse",
          "hover:bg-surface-primary-high-hover",
          "active:bg-surface-primary-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-primary-high-enabled text-object-inverse",
      },

      // Solid Neutral バリアント
      {
        variant: "solid",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-neutral-high-enabled text-object-inverse",
          "hover:bg-surface-neutral-high-hover",
          "active:bg-surface-neutral-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-neutral-high-enabled text-object-inverse",
      },

      // Solid Negative バリアント
      {
        variant: "solid",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-negative-high-enabled text-object-inverse",
          "hover:bg-surface-negative-high-hover",
          "active:bg-surface-negative-high-active",
        ].join(" "),
      },
      {
        variant: "solid",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "bg-surface-negative-high-enabled text-object-inverse",
      },

      // Outline Primary バリアント
      // hover でアイコン色を変えないのは Figma の binding どおり（neutral / negative は変わる）
      // en: Keeping the icon color on hover matches the Figma binding (neutral / negative do change).
      {
        variant: "outline",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-primary-enabled border-border-primary-high",
          "hover:bg-surface-primary-low-hover",
          "active:bg-surface-primary-low-active active:text-object-primary-active",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-primary-enabled border-border-primary-high",
      },

      // Outline Neutral バリアント
      {
        variant: "outline",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-neutral-middle border-border-neutral-high",
          "hover:bg-surface-neutral-low-hover hover:text-object-neutral-high",
          "active:bg-surface-neutral-low-active active:text-object-neutral-high",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-neutral-middle border-border-neutral-high",
      },

      // Outline Negative バリアント
      {
        variant: "outline",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "bg-surface-base-0 text-object-negative-enabled border-border-negative-high",
          "hover:bg-surface-negative-low-hover hover:text-object-negative-hover",
          "active:bg-surface-negative-low-active active:text-object-negative-active",
        ].join(" "),
      },
      {
        variant: "outline",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className:
          "bg-surface-base-0 text-object-negative-enabled border-border-negative-high",
      },

      // Ghost Primary バリアント
      {
        variant: "ghost",
        theme: "primary",
        isLoading: false,
        isDisabled: false,
        className:
          "text-object-primary-enabled hover:bg-surface-primary-low-hover active:bg-surface-primary-low-active active:text-object-primary-active",
      },
      {
        variant: "ghost",
        theme: "primary",
        isLoading: true,
        isDisabled: false,
        className: "text-object-primary-enabled",
      },

      // Ghost neutral バリアント
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: false,
        isDisabled: false,
        className: [
          "text-object-neutral-middle",
          "hover:bg-surface-neutral-low-hover hover:text-object-neutral-high",
          "active:bg-surface-neutral-low-active active:text-object-neutral-high",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "neutral",
        isLoading: true,
        isDisabled: false,
        className: "text-object-neutral-middle",
      },

      // Ghost Negative バリアント
      {
        variant: "ghost",
        theme: "negative",
        isLoading: false,
        isDisabled: false,
        className: [
          "text-object-negative-enabled",
          "hover:bg-surface-negative-low-hover hover:text-object-negative-hover",
          "active:bg-surface-negative-low-active active:text-object-negative-active",
        ].join(" "),
      },
      {
        variant: "ghost",
        theme: "negative",
        isLoading: true,
        isDisabled: false,
        className: "text-object-negative-enabled",
      },

      // Disabled styles for all variants
      {
        variant: "solid",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-high-disabled aria-disabled:bg-surface-primary-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-high-disabled aria-disabled:bg-surface-neutral-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "solid",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-high-disabled aria-disabled:bg-surface-negative-high-disabled disabled:text-object-inverse aria-disabled:text-object-inverse",
      },
      {
        variant: "outline",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled aria-disabled:text-object-primary-disabled disabled:border-border-primary-low aria-disabled:border-border-primary-low",
      },
      {
        variant: "outline",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled aria-disabled:text-object-neutral-disabled disabled:border-border-neutral-low aria-disabled:border-border-neutral-low",
      },
      {
        variant: "outline",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled aria-disabled:text-object-negative-disabled disabled:border-border-negative-low aria-disabled:border-border-negative-low",
      },
      {
        variant: "ghost",
        theme: "primary",
        isDisabled: true,
        className:
          "disabled:bg-surface-primary-low-disabled aria-disabled:bg-surface-primary-low-disabled disabled:text-object-primary-disabled aria-disabled:text-object-primary-disabled",
      },
      {
        variant: "ghost",
        theme: "neutral",
        isDisabled: true,
        className:
          "disabled:bg-surface-neutral-low-disabled aria-disabled:bg-surface-neutral-low-disabled disabled:text-object-neutral-disabled aria-disabled:text-object-neutral-disabled",
      },
      {
        variant: "ghost",
        theme: "negative",
        isDisabled: true,
        className:
          "disabled:bg-surface-negative-low-disabled aria-disabled:bg-surface-negative-low-disabled disabled:text-object-negative-disabled aria-disabled:text-object-negative-disabled",
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
type NativeButtonProps = React.ComponentProps<"button">;

export interface IconButtonProps
  extends Omit<
    NativeButtonProps,
    | "onClick"
    | "onKeyDown"
    | "onClickCapture"
    | "onKeyDownCapture"
    | "onAuxClickCapture"
    | "onMouseDown"
    | "onPointerDown"
    | "onTouchStart"
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
   * ボタンを別コンポーネントの子としてレンダリングするか。
   * true のとき、差し込んだ要素の中身を保ったままアイコンがその内側に描画される
   * en: Whether to render the button as a child component. When true, the icon is
   * rendered inside the slotted element while keeping the element's own children.
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
  /**
   * クリック時のハンドラ。`asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: Click handler. Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * キー押下時のハンドラ。`asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: KeyDown handler. Typed as `HTMLElement` because `asChild` can render non-button elements.
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
   *
   * `asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onMouseDown?: React.MouseEventHandler<HTMLElement>;

  /**
   * @deprecated アクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）により、基本的に使用を避けてください。
   * en: Deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Avoid using this in most cases.
   *
   * Prefer using `onClick` (activation on release) instead of triggering actions on pointer down.
   * ref: https://www.w3.org/TR/WCAG21/#pointer-cancellation
   *
   * `asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onPointerDown?: React.PointerEventHandler<HTMLElement>;

  /**
   * @deprecated アクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）により、基本的に使用を避けてください。
   * en: Deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Avoid using this in most cases.
   *
   * Prefer using `onClick` (activation on release) instead of triggering actions on pointer down.
   * ref: https://www.w3.org/TR/WCAG21/#pointer-cancellation
   *
   * `asChild` で button 以外の要素を差し込めるため `HTMLElement` で受ける
   * en: Typed as `HTMLElement` because `asChild` can render non-button elements.
   */
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
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
 * **アンチパターン / Anti-patterns**
 *
 * - アイコンだけのアクションでは `Button` + `prefixIcon` ではなく `IconButton` を使ってください。
 *   en: Use `IconButton` for icon-only actions instead of `Button` with `prefixIcon`.
 *
 * ```tsx
 * // ✅ Correct
 * <IconButton icon="content_copy" aria-label="コピー" />
 *
 * // ❌ Wrong - Icon-only action を Button で表現しない
 * <Button prefixIcon="content_copy" aria-label="コピー" />
 * ```
 *
 * **アクセシビリティ / Accessibility**
 *
 * - アイコンは `aria-hidden` のためアクセシブルネームになりません。`aria-label` を必ず指定してください。
 *   `asChild` の場合は差し込む要素側のテキストや `aria-label` でも構いません。
 *   en: The icon is `aria-hidden` and never provides an accessible name — always pass `aria-label`.
 *   With `asChild`, text or `aria-label` on the slotted element works as well.
 * - `asChild` で `<a>` など button 以外の要素を差し込んで無効化した場合、`aria-disabled` の付与、
 *   click / Enter・Space の抑止、`aria-disabled:` プレフィックスによる無効時の配色まで
 *   このコンポーネントが行います（`data-disabled="true"` も利用側のスタイルフックとして出力）。
 *   差し込み先が native の `<button>` の場合は `disabled` 属性がそのまま渡ります。
 *   native の `<button>` かどうかは差し込んだ要素そのもので判定するため、内部で `<button>` を
 *   描画するカスタムコンポーネントを渡した場合は非 button として扱われます。
 *   また無効時に抑止できるのは click / auxclick / Enter・Space までで、コンテキストメニューの
 *   「新しいタブで開く」は止められません。確実に遷移させたくない場合は差し込む要素側で
 *   `href` を外してください。
 * - `type` / `form` / `value` など button 専用の props は、差し込み先が native の `<button>` の
 *   ときだけ転送されます。それ以外の要素では不正な属性になるため落とし、dev ビルドで警告します。
 *   必要な場合は差し込む要素側に直接指定してください（Slot のマージで子の指定が優先されます）。
 *   en: Button-only props such as `type`, `form`, and `value` are forwarded only when the slot is a
 *   native `<button>`; on other elements they would be invalid attributes, so they are dropped with
 *   a dev warning — set them on the slotted element instead (child props win in Slot's merge).
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
 *   A slotted native `<button>` receives the real `disabled` attribute instead. Whether the slot is
 *   a native `<button>` is decided from the slotted element itself, so a custom component that
 *   renders a `<button>` internally is treated as a non-button. Only click / auxclick / Enter /
 *   Space can be blocked — "open in new tab" from the context menu cannot; drop `href` on the
 *   slotted element when navigation must not happen. An `aria-disabled` element stays focusable by
 *   design, which is usually what you want; set `tabIndex={-1}` on the slotted element only when it
 *   must leave the tab order.
 *
 * @param {IconButtonProps} props
 */
function IconButton({
  className,
  variant,
  size,
  theme,
  isLoading = false,
  isDisabled = false,
  asChild = false,
  disabled,
  icon,
  ref,
  children,
  ...props
}: IconButtonProps) {
  // disabled状態の管理（isDisabled、disabled、またはisLoadingがtrueの場合）
  const isIconButtonDisabled = isLoading || isDisabled || disabled;

  // 利用者が aria-disabled を直接指定した場合も、見た目に合わせて操作を抑止する。
  // native の disabled 属性は付けないため、フォーカスは残る（soft disabled）
  // en: A caller-provided aria-disabled also blocks activation so the behavior matches the look.
  // The native `disabled` attribute is not set, so the element stays focusable (soft disabled).
  const isSoftDisabled =
    props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const isActivationBlocked = Boolean(isIconButtonDisabled) || isSoftDisabled;

  // asChild で差し込まれたのが native の <button> なら、button 専用の props を渡してよい。
  // Slot は子の props を優先するため、差し込み側が明示した type はそのまま尊重される
  // en: When the slotted element is a native <button>, button-only props can be forwarded.
  // Slot gives the child's props precedence, so an explicit `type` on the child still wins.
  const isSlottedNativeButton =
    asChild && React.isValidElement(children) && children.type === "button";
  const canUseButtonProps = !asChild || isSlottedNativeButton;

  if (process.env.NODE_ENV !== "production") {
    const slottedChild = React.isValidElement(children) ? children : undefined;
    const slottedChildProps = slottedChild?.props as
      | {
          "aria-label"?: string;
          "aria-labelledby"?: string;
          children?: React.ReactNode;
        }
      | undefined;

    // アイコンのみのボタンには aria-label が必要（WCAG 1.1.1）。
    // asChild では差し込んだ要素側のテキストやラベルでも名前が付くため、そちらも見る
    // en: Icon-only buttons require aria-label (WCAG 1.1.1). With asChild the slotted
    // element's own text or label can provide the name, so check it too.
    const hasAccessibleName =
      Boolean(props["aria-label"] || props["aria-labelledby"]) ||
      Boolean(
        slottedChildProps?.["aria-label"] ||
          slottedChildProps?.["aria-labelledby"]
      ) ||
      (asChild && React.Children.count(slottedChildProps?.children) > 0);

    if (!hasAccessibleName) {
      console.warn(
        "[IconButton] アイコンのみのボタンには aria-label を指定してください（WCAG 1.1.1）。" +
          " / Icon-only buttons require aria-label (WCAG 1.1.1)."
      );
    }

    // asChild で単一要素以外を渡すと、Slot が何も描画しない / React が例外を投げる
    // en: With asChild, anything other than a single element makes Slot render nothing or React throw.
    if (props.onMouseDown || props.onPointerDown || props.onTouchStart) {
      // WCAG 2.5.2 Pointer Cancellation: 押下ではなく離した時点で実行するべき
      // en: WCAG 2.5.2 Pointer Cancellation — activate on release, not on pointer down.
      console.warn(
        "[IconButton] onMouseDown / onPointerDown / onTouchStart はアクセシビリティ観点（WCAG 2.5.2 Pointer Cancellation）で非推奨です。" +
          "押下ではなく離した時点で実行される onClick を使ってください。" +
          " / onMouseDown / onPointerDown / onTouchStart are deprecated for accessibility reasons (WCAG 2.5.2 Pointer Cancellation). Prefer onClick (activation on release)."
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
      ).filter(name => props[name] !== undefined && props[name] !== false);

      if (droppedProps.length > 0) {
        console.warn(
          `[IconButton] asChild で button 以外の要素を差し込む場合、${droppedProps.join(" / ")} は無視されます。` +
            "これらは button / input 専用の属性です。差し込み先が内部で <button> を描画するコンポーネントなら、" +
            "その要素側に直接指定してください（<a> 等では属性自体が機能しません）。" +
            ` / In asChild mode with a non-button element, ${droppedProps.join(" / ")} are ignored: they only apply to button / input. ` +
            "If the slotted component renders a <button> internally, set them on that element instead (they do nothing on <a> and friends)."
        );
      }
    }

    if (asChild && !slottedChild) {
      console.warn(
        "[IconButton] asChild には単一の React 要素を children として渡してください。" +
          "要素以外では何も描画されず、複数要素では実行時エラーになります。" +
          " / asChild requires a single React element child: anything else renders nothing or throws."
      );
    }

    // children は asChild のときだけ意味を持つ（通常時はアイコンのみを描画する）
    // en: `children` is only meaningful with asChild; otherwise only the icon is rendered.
    if (!asChild && React.Children.count(children) > 0) {
      console.warn(
        "[IconButton] asChild を付けていない IconButton の children は描画されません。" +
          "アイコン以外のコンテンツが必要な場合は Button を使ってください。" +
          " / children are not rendered without asChild — use Button when you need content besides the icon."
      );
    }
  }

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

  const {
    onClick,
    onKeyDown,
    onClickCapture,
    onKeyDownCapture,
    onAuxClickCapture,
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
  // <a> 等に渡すと不正な属性になるため。
  // `name` は <a> でも受け付けられる（HTML Living Standard 上は obsolete だが UA が互換のため
  // サポートし続けている）ので、ここでは落とさず転送したままにしている。
  // React の型（ButtonHTMLAttributes）に button 専用 props が増えた場合はこのリストも追随すること
  // en: Button-only props are forwarded only when the slot is a native <button>; on elements like
  // <a> they would be invalid attributes. `name` is deliberately kept: <a name> is obsolete in the
  // HTML Living Standard but still accepted by UAs for compatibility. Keep this list in sync when
  // React's ButtonHTMLAttributes gains new button-only props.
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
            ...(canUseButtonProps && isIconButtonDisabled
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
      {...buttonOnlyProps}
      // 無効時はコンポーネント側の値を優先し、それ以外は利用者の指定をそのまま通す
      // en: While disabled the component's value wins; otherwise the caller's value passes through.
      aria-disabled={
        !canUseButtonProps && isIconButtonDisabled ? true : ariaDisabled
      }
      data-disabled={asChild && isIconButtonDisabled ? "true" : undefined}
      className={cn(
        iconButtonVariants({
          variant,
          size,
          theme,
          isLoading,
          // native の disabled や、利用者が直接指定した aria-disabled でも無効状態のスタイルを当てる
          // en: Apply the disabled styles for the native `disabled` prop and a caller-provided
          // aria-disabled as well.
          isDisabled: Boolean(isDisabled || disabled) || isSoftDisabled,
          className,
        })
      )}
      disabled={canUseButtonProps ? isIconButtonDisabled : undefined}
      onClickCapture={handleClickCapture}
      onAuxClickCapture={handleAuxClickCapture}
      onKeyDownCapture={handleKeyDownCapture}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {/* asChild では差し込んだ要素の中身を保ったまま、その内側にアイコンを描画する */}
      {/* en: In asChild mode, keep the slotted element's own children and render the icon inside it. */}
      {asChild && (
        <SlotPrimitive.Slottable>{slottedChildren}</SlotPrimitive.Slottable>
      )}
      {isLoading ? (
        <Spinner size={getIconSize()} className="text-current" />
      ) : (
        <Icon icon={icon} size={getIconSize()} />
      )}
    </Comp>
  );
}

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
