"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Icon } from "@/components/icon";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "flex items-center justify-between w-full rounded-action border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden whitespace-pre",
  {
    variants: {
      size: {
        sm: "h-8 py-1 pl-2 pr-1 gap-2 character-2-regular-pro",
        md: "h-10 py-1 pl-3 pr-1.5 gap-2 character-3-regular-pro",
        lg: "h-12 py-1 pl-4 pr-2 gap-2 character-4-regular-pro",
      },
      isInvalid: {
        true: "border-negative-500 hover:border-negative-600 data-[state=open]:border-negative-800",
        false:
          "border-base-200 hover:border-base-300 data-[state=open]:border-base-500",
      },
      isDisabled: {
        true: "cursor-not-allowed border-base-100 hover:border-base-100 text-base-200",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        isInvalid: true,
        isDisabled: true,
        class: "border-negative-100 text-base-200 hover:border-negative-100",
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
      true: "text-base-200",
      false: "text-base-700",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const selectScrollButtonVariants = cva(
  "flex cursor-default items-center justify-center py-1"
);

const selectContentVariants = cva(
  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-action border shadow-float",
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

const selectLabelVariants = cva(
  "px-2 py-1.5 character-1-bold-pro text-base-900"
);

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-notice py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-base-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
);

const selectItemIndicatorVariants = cva(
  "absolute right-2 flex h-3.5 w-3.5 items-center justify-center"
);

const selectItemTextVariants = cva("character-1-regular-pro text-base-700");

const selectSeparatorVariants = cva("-mx-1 my-1 h-px bg-base-100");

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

/**
 * セレクトのトリガー部分。
 * クリックで選択肢リストを開閉するボタンとして機能します。
 */
function SelectTrigger({
  className,
  size,
  children,
  isInvalid,
  disabled,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size: "sm" | "md" | "lg";
  isInvalid?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
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
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon
          icon="expand_more"
          className={cn(selectIconVariants({ size, isDisabled: disabled }))}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * セレクトのドロップダウンリスト本体。
 * 選択肢リストの表示・スクロール制御を行います。
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
 * セレクトのラベル部分。
 * グループ化された選択肢のラベル表示に使います。
 */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(selectLabelVariants(), className)}
      {...props}
    />
  );
}

/**
 * セレクトの各選択肢アイテム。
 * 選択可能なリスト項目として機能します。
 */
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants(), className)}
      {...props}
    >
      <span className={selectItemIndicatorVariants()}>
        <SelectPrimitive.ItemIndicator>
          <Icon icon="check" size={4} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>
        <span className={cn(selectItemTextVariants(), className)}>
          {children}
        </span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * セレクトの区切り線。
 * 選択肢リスト内の区切り表示に使います。
 */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(selectSeparatorVariants(), className)}
      {...props}
    />
  );
}

/**
 * セレクトの上スクロールボタン。
 * 選択肢が多い場合にリストを上方向にスクロールします。
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(selectScrollButtonVariants(), className)}
      {...props}
    >
      <Icon icon="expand_less" size={4} />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * セレクトの下スクロールボタン。
 * 選択肢が多い場合にリストを下方向にスクロールします。
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(selectScrollButtonVariants(), className)}
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
