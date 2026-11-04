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
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed",
    "px-3 py-2 character-2-regular-pro data-[state=active]:[font-weight:var(--font-weight-char-bold)]!",
    "relative focus-visible:outline-none focus-visible:z-20 before:pointer-events-none before:absolute before:inset-[-4px] before:rounded-lg before:border-2 before:border-border-ring before:opacity-0 focus-visible:before:opacity-100",
  ],
  {
    variants: {
      variant: {
        solid: [
          "rounded-t-action",
          // active（塗りは tabs-indicator が持つ）
          "data-[state=active]:bg-transparent",
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
          // 下線は tabs-indicator が持つ
          "data-[state=active]:after:bg-transparent",
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
          // 背景と枠は tabs-indicator が持つ
          "data-[state=active]:bg-transparent",
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
          "disabled:data-[state=active]:border-border-neutral-middle",
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
        "w-full max-w-full justify-start gap-2 overflow-x-auto overflow-y-visible p-1",
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
 * 選択中のタブの見た目（塗り・下線・枠）を持つインジケーター。選択が変わると、状態変化のスプリングで次のタブへ移動する
 * en: Indicator carrying the active tab's look (fill / underline / outline). It moves to the next tab with the state-change spring
 */
const tabsIndicatorVariants = cva(
  [
    "pointer-events-none absolute top-0 left-0",
    // 選択が別のタブへ移ったときだけ動かす（最初の位置合わせや大きさの変化では動かさない）
    // en: Animate only when the selection moves to another tab (not on first placement or resizes)
    "data-[ready]:transition-[translate,width,height] data-[ready]:duration-(--motion-settle-duration) data-[ready]:ease-(--motion-settle-ease) data-[ready]:delay-(--motion-latency)",
  ],
  {
    variants: {
      variant: {
        solid: "rounded-t-action bg-surface-primary-high-enabled",
        line: "z-10 h-0.5 rounded bg-border-primary-extra-high",
        ghost:
          "rounded-t-action border-x border-t border-border-neutral-middle bg-surface-base-0",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

type TabRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  moving: boolean;
};

/**
 * リストの中での位置を、リストの拡大縮小（Modal の開くアニメーションなど）を割り戻して求める。
 * offsetLeft / offsetWidth は整数に丸められて 1px ずれるので使わない
 * en: Position within the list, undoing any scaling of the list (e.g. a Modal scaling in).
 * offsetLeft / offsetWidth are rounded to integers and drift by 1px, so they are not used
 */
function rectWithin(
  element: HTMLElement,
  list: HTMLElement
): Omit<TabRect, "moving"> | null {
  const listRect = list.getBoundingClientRect();
  if (list.offsetWidth === 0 || listRect.width === 0) return null;
  const scale = listRect.width / list.offsetWidth;
  const rect = element.getBoundingClientRect();
  return {
    x: (rect.left - listRect.left) / scale - list.clientLeft + list.scrollLeft,
    y: (rect.top - listRect.top) / scale - list.clientTop + list.scrollTop,
    width: rect.width / scale,
    height: rect.height / scale,
  };
}

function useActiveTabRect(listRef: React.RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = React.useState<TabRect | null>(null);
  const [ready, setReady] = React.useState(false);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => measure());

    function measure() {
      if (!list) return;
      const triggers = Array.from(
        list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')
      ).filter(trigger => trigger.closest('[data-slot="tabs-list"]') === list);
      triggers.forEach(trigger => resizeObserver?.observe(trigger));
      const active = triggers.find(
        trigger => trigger.dataset.state === "active"
      );
      const measured = active ? rectWithin(active, list) : null;
      // 選択が別のタブへ移ったら動かし始める。最初の位置合わせ（フォントの読み込みを含む）では動かさない。
      // 移動中にタブの大きさが変わっても（選択中は太字になる）途中で止まらないよう、次に選択が変わるまで保つ
      // en: Start animating once the selection moves to another tab; never for the first placement
      // (including font loading). Keep it until the next selection change so a size change mid-move
      // (the active label turns bold) does not cut the animation
      const changed =
        lastActiveRef.current !== null &&
        active !== undefined &&
        lastActiveRef.current !== active;
      if (active) lastActiveRef.current = active;
      setRect(prev => {
        if (!measured) return null;
        const next = {
          ...measured,
          moving: changed || (prev?.moving ?? false),
        };
        return prev &&
          prev.x === next.x &&
          prev.y === next.y &&
          prev.width === next.width &&
          prev.height === next.height &&
          prev.moving === next.moving
          ? prev
          : next;
      });
    }

    measure();
    resizeObserver?.observe(list);
    // 選択の変化（data-state）とタブの追加・削除を拾う
    // en: Pick up selection changes (data-state) and tabs being added or removed
    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });
    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
    };
  }, [listRef]);

  React.useEffect(() => {
    if (!rect || ready) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [rect, ready]);

  return { rect, ready };
}

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
  ref,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & TabsListVariants) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const { rect, ready } = useActiveTabRect(listRef);
  const effectiveVariant: TabsVariantType = variant ?? "solid";
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  // line は下線だけなので、タブの下端（after と同じ位置）に置く
  // en: The line variant is only an underline, placed at the tab's bottom edge (where ::after was)
  const indicatorStyle: React.CSSProperties | undefined = rect
    ? effectiveVariant === "line"
      ? {
          translate: `${rect.x}px ${rect.y + rect.height}px`,
          width: rect.width,
        }
      : {
          translate: `${rect.x}px ${rect.y}px`,
          width: rect.width,
          height: rect.height,
        }
    : undefined;

  return (
    <TabsListVariantContext.Provider value={effectiveVariant}>
      <TabsPrimitive.List
        ref={setRefs}
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, scrollable }), className)}
        {...props}
      >
        <span
          aria-hidden="true"
          data-slot="tabs-indicator"
          data-ready={ready && rect?.moving ? "" : undefined}
          hidden={!rect}
          className={tabsIndicatorVariants({ variant: effectiveVariant })}
          style={indicatorStyle}
        />
        {children}
      </TabsPrimitive.List>
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
