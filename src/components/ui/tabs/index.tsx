/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

type TabsVariantType = NonNullable<TabsListVariants["variant"]>;
const TabsListVariantContext = createContext<TabsVariantType | undefined>(
  undefined
);

/**
 * TabsTriggerのバリアント定義
 * en: Variant definitions for TabsTrigger
 */
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed",
    "px-3 py-2 character-3-regular-pro",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        solid: [
          "rounded-t-action",
          // active
          "data-[state=active]:bg-surface-primary-high-enabled",
          "data-[state=active]:text-text-inverse",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-primary-high-hover",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-surface-primary-high-active",
          "disabled:data-[state=active]:bg-surface-primary-high-disabled",
          // inactive
          "data-[state=inactive]:bg-transparent",
          "data-[state=inactive]:text-text-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "focus-visible:outline-none focus-visible:data-[state=inactive]:bg-surface-neutral-low-active",
          // disabled
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ].join(" "),
        line: [
          "relative rounded-none border-none z-10 focus-visible:outline-none",
          "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-0.5 after:rounded after:pointer-events-none after:z-10",
          // active
          "data-[state=active]:text-text-primary-enabled",
          "data-[state=active]:after:bg-border-primary-extra-high",
          "data-[state=active]:after:h-0.5",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-primary-low-hover",
          "enabled:not-focus-visible:hover:data-[state=active]:text-text-primary-hover",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-surface-primary-low-active",
          "focus-visible:data-[state=active]:text-text-primary-active",
          // inactive
          "data-[state=inactive]:text-text-neutral-middle",
          "data-[state=inactive]:after:bg-transparent",
          // hover (inactive, not disabled)
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "focus-visible:outline-none focus-visible:data-[state=inactive]:bg-surface-neutral-low-active",
          // disabled
          "disabled:data-[state=active]:text-text-primary-disabled",
          "disabled:data-[state=active]:after:bg-border-primary-low",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ].join(" "),
        ghost: [
          "rounded-t-action border-x border-t border-b-0 border-transparent text-text-neutral-middle",
          // active
          "data-[state=active]:text-text-neutral-high",
          "data-[state=active]:bg-surface-base-0",
          "data-[state=active]:border-border-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=active]:bg-surface-neutral-low-hover",
          "data-[state=active]:rounded-t-action",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-surface-neutral-low-active",
          // inactive
          "data-[state=inactive]:text-text-neutral-middle",
          "enabled:not-focus-visible:hover:data-[state=inactive]:bg-surface-neutral-low-hover",
          "focus-visible:outline-none focus-visible:data-[state=inactive]:bg-surface-neutral-low-active",
          // disabled
          "disabled:data-[state=active]:text-text-neutral-disabled",
          "disabled:data-[state=active]:bg-surface-base-0",
          "disabled:data-[state=inactive]:text-text-neutral-disabled",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  TabsTriggerVariants;

const tabsListVariants = cva(["relative inline-flex items-center"], {
  variants: {
    variant: {
      solid: "border-b-2 border-b-border-neutral-low rounded-none",
      line: "border-b-2 border-b-border-neutral-low rounded-none overflow-visible",
      ghost: "",
    },
    scrollable: {
      true: [
        "w-full max-w-full justify-start gap-2 overflow-x-auto overflow-y-visible",
        "whitespace-nowrap overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      ].join(" "),
      false: "w-fit justify-center gap-2 overflow-visible",
    },
  },
  defaultVariants: {
    variant: "solid",
    scrollable: false,
  },
});

type TabsListVariants = VariantProps<typeof tabsListVariants>;

/**
 * **概要 / Overview**
 *
 * - タブはユーザーが扱う情報をシンプルに保つためのディスクロージャーとして使用するコンポーネントです。
 * - en: Tabs component is used as a disclosure to keep user-handled information simple.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList variant="solid">
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account Content</TabsContent>
 *   <TabsContent value="password">Password Content</TabsContent>
 * </Tabs>
 * ```
 *
 * @param {React.ComponentProps<typeof TabsPrimitive.Root>} props
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  scrollable,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & TabsListVariants) {
  return (
    <TabsListVariantContext.Provider value={variant ?? "solid"}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, scrollable }), className)}
        {...props}
      />
    </TabsListVariantContext.Provider>
  );
}

/**
 * タブトリガー（タブボタン）
 * en: Tab trigger (tab button)
 *
 * @param {TabsTriggerProps} props
 */
function TabsTrigger({ className, variant, ref, ...props }: TabsTriggerProps) {
  const contextVariant = useContext(TabsListVariantContext);
  const effectiveVariant: TabsVariantType = (variant ??
    contextVariant ??
    "solid") as TabsVariantType;
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        tabsTriggerVariants({ variant: effectiveVariant }),
        className
      )}
      {...props}
    />
  );
}
TabsTrigger.displayName = "TabsTrigger";

/**
 * タブの内容表示エリア
 * en: Tab content display area
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsListVariants };
