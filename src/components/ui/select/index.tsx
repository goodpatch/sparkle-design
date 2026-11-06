/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Icon } from "@/components/ui/icon";
import { cva, VariantProps } from "class-variance-authority";

import { useControllableState } from "@/lib/use-controllable-state";
import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  [
    "flex items-center justify-between w-full rounded-action border bg-surface-base-0 text-text-neutral-high transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2",
    "overflow-hidden whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      size: {
        // Figma の内側6px + 外側4pxを合成した10px。en: Combine inner 6px and outer 4px.
        // sparkle-disable-next-line use-figma-spacing-scale
        sm: "h-8 py-1 pl-2.5 pr-1.5 gap-2 character-2-regular-pro",
        md: "h-10 py-1 pl-3 pr-2 gap-2 character-2-regular-pro",
        lg: "h-12 py-1 pl-4 pr-2 gap-2 character-3-regular-pro",
      },
      isInvalid: {
        true: "bg-surface-base-0 border-border-negative-extra-high-enabled hover:border-border-negative-extra-high-hover data-[state=open]:border-border-negative-extra-high-hover",
        false:
          "border-border-neutral-extra-high-enabled hover:border-border-neutral-extra-high-hover data-[state=open]:border-border-neutral-extra-high-hover",
      },
      isDisabled: {
        true: "cursor-not-allowed bg-surface-neutral-middle-disabled border-border-neutral-extra-high-disabled hover:border-border-neutral-extra-high-disabled text-text-neutral-disabled",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        isInvalid: true,
        isDisabled: true,
        class:
          "bg-surface-neutral-middle-disabled border-border-negative-extra-high-disabled hover:border-border-negative-extra-high-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

const selectIconVariants = cva("", {
  variants: {
    size: {
      sm: "icon-5-fill-0",
      md: "icon-7-fill-0",
      lg: "icon-8-fill-0",
    },
    isDisabled: {
      true: "text-object-neutral-disabled",
      false: "text-object-neutral-middle",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

/**
 * 選んだ項目が点滅してから閉じるまでの時間。--motion-blink-duration と同じ値で、重さに依存しない
 * en: Time the picked item blinks before the list closes. Same as --motion-blink-duration; independent of the motion weight
 */
const SELECT_BLINK_MS = 160;

const SelectMotionContext = React.createContext<{
  blinkingValue: string | null;
  closing: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  markSelecting: (value: string) => void;
  onContentAnimationEnd: (event: React.AnimationEvent<HTMLDivElement>) => void;
} | null>(null);

const selectContentVariants = cva(
  [
    "bg-surface-base-0 text-text-neutral-high",
    // トリガーの側から出る（下に開くときは上から下へ）
    // en: Pops in from the trigger side (top-down when opening below)
    // 閉じるときは Select が data-closing を付けて退場を再生し、終わってから外す
    // en: On close, Select sets data-closing to play the exit, then unmounts when it ends
    "data-[state=open]:animate-motion-pop-in data-[closing]:data-[state=open]:animate-motion-pop-out data-[closing]:pointer-events-none",
    "data-[side=bottom]:[--motion-pop-from-y:-1] data-[side=top]:[--motion-pop-from-y:1] data-[side=left]:[--motion-pop-from-x:1] data-[side=right]:[--motion-pop-from-x:-1]",
    "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-action border shadow-float",
  ].join(" "),
  {
    variants: {
      position: {
        popper:
          "bg-surface-base-0 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        item: "",
        "item-aligned": "",
      },
    },
    defaultVariants: {
      position: "popper",
    },
  }
);

const selectViewportVariants = cva("p-1", {
  variants: {
    position: {
      popper:
        "h-[var(--radix-select-content-available-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      item: "",
      "item-aligned": "",
    },
  },
  defaultVariants: {
    position: "popper",
  },
});

/**
 * **概要 / Overview**
 *
 * - セレクトはオプショングループの中から値を選択する形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Select component is used to capture user input by selecting a value from a group of options.
 *
 * **アンチパターン / Anti-patterns**
 *
 * - `SelectTrigger` と横並びの Button は原則同じサイズにしてください。デフォルトの `SelectTrigger` に対しては `Button size="md"` を使ってください。
 *   en: Keep Button size aligned when placing it next to `SelectTrigger`. Use `Button size="md"` with the default `SelectTrigger` size.
 *
 * ```tsx
 * // ✅ Correct
 * <div className="flex gap-2">
 *   <Select>
 *     <SelectTrigger size="md" className="w-60">
 *       <SelectValue placeholder="選択してください" />
 *     </SelectTrigger>
 *   </Select>
 *   <Button size="md">追加</Button>
 * </div>
 *
 * // ❌ Wrong - 高さが揃わないサイズ不一致
 * <div className="flex gap-2">
 *   <Select>
 *     <SelectTrigger size="md" className="w-60">
 *       <SelectValue placeholder="選択してください" />
 *     </SelectTrigger>
 *   </Select>
 *   <Button size="sm">追加</Button>
 * </div>
 * ```
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger size="md">
 *     <SelectValue placeholder="選択してください" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">オプション1</SelectItem>
 *     <SelectItem value="option2">オプション2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @param {React.ComponentProps<typeof SelectPrimitive.Root>} props
 */
function Select({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  // リストを DOM に残しておくための「見た目の open」。閉じたあとも点滅と退場が終わるまで true のまま Radix に渡す
  // en: The "visual open" that keeps the list in the DOM. Stays true after closing until the blink and exit finish
  const [renderOpen, setRenderOpen] = React.useState(open);
  const [blinkingValue, setBlinkingValue] = React.useState<string | null>(null);
  const [closing, setClosing] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  // 項目の操作で選ばれた値。Radix は同じイベントの中で onValueChange → onOpenChange(false) の順に呼ぶ
  // en: Value picked from an item. Radix calls onValueChange then onOpenChange(false) within the same event
  const selectingRef = React.useRef<string | null>(null);
  // 閉じたきっかけが項目の選択だったときの値。閉じる演出で点滅させる
  // en: Value picked when the close came from a selection; blinked by the close sequence
  const closedBySelectRef = React.useRef<string | null>(null);
  const blinkTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const prevOpenRef = React.useRef(open);

  React.useEffect(() => () => clearTimeout(blinkTimerRef.current), []);

  const finishClose = React.useCallback(() => {
    setClosing(false);
    setRenderOpen(false);
  }, []);

  // open が変わったら見た目を追いかける。制御側で open を false にしたときも、ここで退場を再生する
  // en: Follow open with the visuals. Also plays the exit when a controlled open turns false
  React.useLayoutEffect(() => {
    if (prevOpenRef.current === open) return;
    prevOpenRef.current = open;
    const selected = closedBySelectRef.current;
    closedBySelectRef.current = null;
    clearTimeout(blinkTimerRef.current);
    blinkTimerRef.current = undefined;
    setBlinkingValue(null);
    if (open) {
      setClosing(false);
      setRenderOpen(true);
      return;
    }
    if (!contentRef.current) {
      setClosing(false);
      setRenderOpen(false);
      return;
    }
    if (selected === null) {
      setClosing(true);
      return;
    }
    setBlinkingValue(selected);
    blinkTimerRef.current = setTimeout(() => {
      blinkTimerRef.current = undefined;
      setBlinkingValue(null);
      setClosing(true);
    }, SELECT_BLINK_MS);
  }, [open]);

  // Radix の Select は閉じるとすぐリストを外すので、退場のアニメーションを再生し終えてから外す
  // en: Radix Select unmounts the list as soon as it closes, so keep it until the exit animation ends
  React.useLayoutEffect(() => {
    if (!closing) return;
    const content = contentRef.current;
    const animationName = content
      ? getComputedStyle(content).animationName
      : "";
    // アニメーションが無い（className で上書きされた、テスト環境など）ときは待たずに外す
    // en: Unmount right away when there is no animation (overridden className, test environments, etc.)
    if (!animationName || animationName === "none") finishClose();
  }, [closing, finishClose]);

  // onOpenChange は Radix から呼ばれた時点で呼ぶ。点滅と退場は見た目だけで再生する
  // en: Call onOpenChange as soon as Radix does; the blink and exit are visual only
  const handleOpenChange = (next: boolean) => {
    const selecting = selectingRef.current;
    selectingRef.current = null;
    if (next === open) return;
    if (!next) closedBySelectRef.current = selecting;
    setOpen(next);
  };

  const markSelecting = React.useCallback((value: string) => {
    selectingRef.current = value;
    // 選択にならなかった操作（タッチの pointerup など）を、次に閉じるときの点滅と取り違えないよう、
    // 同じイベントの処理が終わったら消す
    // en: Clear after the current event so a non-selecting gesture is not mistaken for a selection later
    queueMicrotask(() => {
      if (selectingRef.current === value) selectingRef.current = null;
    });
  }, []);

  const handleContentAnimationEnd = React.useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (closing && event.target === event.currentTarget) finishClose();
    },
    [closing, finishClose]
  );

  const motionContext = React.useMemo(
    () => ({
      blinkingValue,
      closing,
      contentRef,
      markSelecting,
      onContentAnimationEnd: handleContentAnimationEnd,
    }),
    [blinkingValue, closing, markSelecting, handleContentAnimationEnd]
  );

  return (
    <SelectMotionContext.Provider value={motionContext}>
      <SelectPrimitive.Root
        data-slot="select"
        open={renderOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </SelectMotionContext.Provider>
  );
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;
export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  /**
   * セレクトトリガーのサイズバリエーション
   * en: Size variation of the select trigger
   */
  size?: SelectTriggerVariantProps["size"];
  /**
   * セレクトトリガーのエラー状態
   * en: Error state of the select trigger
   */
  isInvalid?: SelectTriggerVariantProps["isInvalid"];
  /**
   * セレクトトリガーの無効化状態
   * en: Disabled state of the select trigger
   */
  disabled?: boolean;
}

/**
 * **概要 / Overview**
 *
 * - セレクトのトリガー部分で、クリックで選択肢リストを開閉するボタンとして機能します。
 * - en: The trigger part of the select that functions as a button to open/close the option list when clicked.
 *
 * @param {SelectTriggerProps} props
 */
function SelectTrigger({
  className,
  size,
  children,
  isInvalid,
  disabled,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      aria-invalid={isInvalid || undefined}
      className={cn(
        selectTriggerVariants({
          size,
          isInvalid,
          isDisabled: disabled,
        }),
        "group/select-trigger",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span className="flex-1 min-w-0 text-left truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <Icon
          icon="arrow_drop_down"
          className={cn(
            selectIconVariants({ size, isDisabled: disabled }),
            "shrink-0",
            // 開閉に合わせて 180° 回す（状態変化のスプリング）
            // en: Rotates 180° with the open state (state-change spring)
            "transition-transform duration-(--motion-settle-duration) ease-(--motion-settle-ease) delay-(--motion-latency) group-data-[state=open]/select-trigger:rotate-180"
          )}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * **概要 / Overview**
 *
 * - セレクトのドロップダウンリスト本体で、選択肢リストの表示・スクロール制御を行います。
 * - en: The main dropdown list body of the select that handles display and scroll control of option lists.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="option1">オプション1</SelectItem>
 * </SelectContent>
 * ```
 */
function SelectContent({
  className,
  children,
  position = "popper",
  ref,
  onAnimationEnd,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const motion = React.useContext(SelectMotionContext);
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (motion) motion.contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [motion, ref]
  );

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-closing={motion?.closing ? "" : undefined}
        className={cn(selectContentVariants({ position }), className)}
        position={position}
        ref={setRefs}
        onAnimationEnd={event => {
          onAnimationEnd?.(event);
          motion?.onContentAnimationEnd(event);
        }}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(selectViewportVariants({ position }))}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * **概要 / Overview**
 *
 * - セレクトのラベル部分で、グループ化された選択肢のラベル表示に使います。
 * - en: The label part of the select used to display labels for grouped options.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectLabel>カテゴリー</SelectLabel>
 * ```
 */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 character-1-bold-pro text-text-neutral-high",
        className
      )}
      {...props}
    />
  );
}

export interface SelectItemProps
  extends React.ComponentProps<typeof SelectPrimitive.Item> {
  /**
   * 選択肢テキスト部分に適用するクラス名
   * en: Class name applied to the selectable item text area
   */
  textClassName?: string;
}

/**
 * **概要 / Overview**
 *
 * - セレクトの各選択肢アイテムで、選択可能なリスト項目として機能します。
 * - en: Each selectable item in the select that functions as a selectable list item.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectItem value="option1">オプション1</SelectItem>
 * ```
 */
function SelectItem({
  className,
  children,
  textClassName,
  value,
  disabled,
  onClick,
  onPointerUp,
  onKeyDown,
  ...props
}: SelectItemProps) {
  const blink = React.useContext(SelectMotionContext);
  // Radix が選択として扱う操作（クリック・pointerup・Enter / Space）の前に、選ぼうとしている値を伝える
  // en: Report the value before Radix handles a selecting gesture (click, pointerup, Enter / Space)
  const markSelecting = () => {
    if (!disabled) blink?.markSelecting(value);
  };

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-blinking={blink?.blinkingValue === value ? "" : undefined}
      value={value}
      disabled={disabled}
      onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) markSelecting();
      }}
      onPointerUp={event => {
        onPointerUp?.(event);
        if (!event.defaultPrevented) markSelecting();
      }}
      onKeyDown={event => {
        onKeyDown?.(event);
        if (
          !event.defaultPrevented &&
          (event.key === "Enter" || event.key === " ")
        )
          markSelecting();
      }}
      className={cn(
        [
          "relative flex w-full cursor-pointer select-none items-center rounded-notice",
          "py-1.5 pl-8 pr-2 text-sm",
          "character-1-regular-pro text-text-neutral-middle",
          "outline-none focus:bg-neutral-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          "data-[blinking]:animate-motion-blink",
        ].join(" "),
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Icon icon="check" size={4} className="text-current" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className={cn("flex-1", textClassName)}>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * **概要 / Overview**
 *
 * - セレクトの区切り線で、選択肢リスト内の区切り表示に使います。
 * - en: The separator line in the select used to display divisions within the option list.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectSeparator />
 * ```
 */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-divider-low", className)}
      {...props}
    />
  );
}

/**
 * **概要 / Overview**
 *
 * - セレクトの上スクロールボタンで、選択肢が多い場合にリストを上方向にスクロールします。
 * - en: The up scroll button of the select that scrolls the list upward when there are many options.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectScrollUpButton />
 * ```
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <Icon
        icon="expand_less"
        size={4}
        className="text-object-neutral-middle"
      />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * **概要 / Overview**
 *
 * - セレクトの下スクロールボタンで、選択肢が多い場合にリストを下方向にスクロールします。
 * - en: The down scroll button of the select that scrolls the list downward when there are many options.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <SelectScrollDownButton />
 * ```
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <Icon
        icon="expand_more"
        size={4}
        className="text-object-neutral-middle"
      />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
