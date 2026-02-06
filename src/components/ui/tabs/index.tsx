/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
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
          "rounded-t-md",
          // active
          "data-[state=active]:bg-primary-500",
          "data-[state=active]:text-white",
          "hover:data-[state=active]:bg-primary-600",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-primary-700",
          // inactive
          "data-[state=inactive]:bg-transparent",
          "data-[state=inactive]:text-neutral-700",
          "enabled:hover:data-[state=inactive]:bg-neutral-50",
          "focus-visible:outline-none focus-visible:data-[state=inactive]:bg-neutral-100",
          "focus-visible:data-[state=inactive]:text-primary-700",
          // disabled
          "disabled:data-[state=inactive]:text-neutral-200",
        ].join(" "),
        line: [
          "relative rounded-none border-none z-10 focus-visible:outline-none",
          "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-0.5 after:rounded after:pointer-events-none after:z-10",
          // active
          "data-[state=active]:text-primary-500",
          "data-[state=active]:after:bg-primary-500",
          "data-[state=active]:after:h-0.5",
          // inactive
          "data-[state=inactive]:text-neutral-500",
          "data-[state=inactive]:after:bg-transparent",
          // hover (inactive, not disabled)
          "enabled:hover:data-[state=inactive]:bg-neutral-50",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-neutral-100",
          "focus-visible:data-[state=active]:text-primary-700",
          "focus-visible:data-[state=inactive]:text-primary-700",
          // disabled
          "disabled:data-[state=active]:text-neutral-200",
          "disabled:data-[state=inactive]:text-neutral-200",
        ].join(" "),
        ghost: [
          "rounded-t-md border-x border-t border-b-0 border-transparent text-text-middle",
          // active
          "data-[state=active]:text-text-high",
          "data-[state=active]:border-divider-middle",
          "hover:data-[state=active]:bg-neutral-50",
          "data-[state=active]:rounded-t-md",
          "focus-visible:outline-none focus-visible:data-[state=active]:bg-neutral-200",
          // inactive
          "data-[state=inactive]:text-neutral-500",
          "enabled:hover:data-[state=inactive]:bg-neutral-50",
          "focus-visible:outline-none focus-visible:data-[state=inactive]:bg-neutral-100",
          "focus-visible:data-[state=inactive]:text-primary-700",
          // disabled
          "disabled:data-[state=active]:text-neutral-200",
          "disabled:data-[state=inactive]:text-neutral-200",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
type TabsTriggerProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    TabsTriggerVariants;

const tabsListVariants = cva(
  [
    "relative inline-flex w-fit items-center justify-center gap-2 overflow-visible",
  ],
  {
    variants: {
      variant: {
        solid: "border-b-2 border-b-primary-500 rounded-none",
        line: "border-b-2 border-b-neutral-200 rounded-none overflow-visible",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

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
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & TabsListVariants) {
  return (
    <TabsListVariantContext.Provider value={variant ?? "solid"}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant }), className)}
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
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => {
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
});
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
