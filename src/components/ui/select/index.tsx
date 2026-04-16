/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Icon } from "@/components/ui/icon";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  [
    "group flex items-center justify-between w-full rounded-action border bg-white text-text-high transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2",
    "overflow-hidden whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 py-1 pl-2 pr-1 gap-2 character-2-regular-pro",
        md: "h-10 py-1 pl-3 pr-1.5 gap-2 character-3-regular-pro",
        lg: "h-12 py-1 pl-4 pr-2 gap-2 character-4-regular-pro",
      },
      isInvalid: {
        true: "bg-white border-negative-500 hover:border-negative-600 data-[state=open]:border-negative-600",
        false:
          "border-neutral-500 hover:border-neutral-600 data-[state=open]:border-neutral-600",
      },
      isDisabled: {
        true: "cursor-not-allowed bg-neutral-50 border-neutral-200 hover:border-neutral-200 text-text-disabled",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        isInvalid: true,
        isDisabled: true,
        class: "bg-neutral-50 border-negative-200 hover:border-negative-200",
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
      md: "icon-6-fill-0",
      lg: "icon-7-fill-0",
    },
    isDisabled: {
      true: "text-text-disabled",
      false: "text-neutral-700",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const selectContentVariants = cva(
  [
    "bg-white text-text-high",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-action border shadow-float",
  ].join(" "),
  {
    variants: {
      position: {
        popper:
          "bg-white data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
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
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
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
            "shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
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
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(selectContentVariants({ position }), className)}
        position={position}
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
        "px-2 py-1.5 character-1-bold-pro text-text-high",
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
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        [
          "relative flex w-full cursor-pointer select-none items-center rounded-notice",
          "py-1.5 pl-8 pr-2 text-sm",
          "character-1-regular-pro text-neutral-700",
          "outline-none focus:bg-neutral-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        ].join(" "),
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Icon icon="check" size={4} />
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
      <Icon icon="expand_less" size={4} />
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
      <Icon icon="expand_more" size={4} />
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
