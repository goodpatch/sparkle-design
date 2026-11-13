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
          // active。インジケーターを測れたら、塗りは tabs-indicator に任せる（SSR では測れるまでトリガーが持つ）
          // en: active. Once the indicator is measured it carries the fill (under SSR the trigger keeps it until then)
          "data-[state=active]:bg-surface-primary-high-enabled",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:bg-transparent",
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
          // インジケーターを測れたら、下線は tabs-indicator に任せる
          // en: Once the indicator is measured it carries the underline
          "data-[state=active]:after:bg-border-primary-extra-high",
          "data-[state=active]:after:h-0.5",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:after:bg-transparent",
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
          // インジケーターを測れたら、背景と枠は tabs-indicator に任せる
          // en: Once the indicator is measured it carries the background and outline
          "data-[state=active]:bg-surface-base-0",
          "data-[state=active]:border-border-neutral-middle",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:bg-transparent",
          "group-data-[indicator-ready]/tabs-list:data-[state=active]:border-transparent",
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
        // スクロールバーを隠す代わりに、隠れたタブがある側の端をフェードさせて続きがあることを示す
        // en: With the scrollbar hidden, fade the edge that has more tabs beyond it to show there is more
        // 左右は物理方向（RTL でも左は左）。グラデーションが to_right なので、論理方向にはしない
        // en: Left / right are physical (left stays left in RTL), matching the to_right gradient
        "[--tabs-fade-left:0px] [--tabs-fade-right:0px] data-[fade-left]:[--tabs-fade-left:2rem] data-[fade-right]:[--tabs-fade-right:2rem]",
        "[mask-image:linear-gradient(to_right,transparent,black_var(--tabs-fade-left),black_calc(100%-var(--tabs-fade-right)),transparent)]",
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
        // 強制カラーモードでは背景色が消されるので、残る border で選択中の印を描く。
        // line はリストの下線（2px）と重なるので、4px にして太さで見分けられるようにする
        // en: Forced-colors mode drops backgrounds, so draw the selection mark with a border, which survives.
        // The line variant overlaps the list's 2px baseline, so make it 4px to stand out by thickness
        solid:
          "rounded-t-action bg-surface-primary-high-enabled forced-colors:border-b-[3px]",
        line: "z-10 h-0.5 rounded bg-border-primary-extra-high forced-colors:h-1 forced-colors:border-b-4",
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

/**
 * スクロールできるリストで、選んだタブが見える位置までリストだけをスクロールする（ページは動かさない）
 * en: In a scrolling list, scroll only the list (never the page) until the selected tab is visible
 */
function revealInList(
  list: HTMLElement,
  tab: { x: number; width: number },
  instant = false
) {
  const max = list.scrollWidth - list.clientWidth;
  if (max <= 0) return;
  // RTL では scrollLeft が 0（右端）から負の向きに増える。見えている範囲での位置で考え、最後に向きに合わせて丸める
  // en: In RTL, scrollLeft runs from 0 (right edge) into negatives. Work in visible-area coordinates
  // and clamp to the direction's range at the end
  const rtl = getComputedStyle(list).direction === "rtl";
  // 端のフェード（2rem）に掛からないよう、その分だけ余白を取る
  // en: Leave room for the edge fade (2rem) so the tab does not sit under it
  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const margin = rootFontSize * 2;
  const start = list.scrollLeft;
  // tab.x は scrollLeft を足した位置なので、引くと見えている範囲の中での位置になる
  // en: tab.x includes scrollLeft, so subtracting it gives the position within the visible area
  const visible = tab.x - start;
  let delta = 0;
  if (visible - margin < 0) delta = visible - margin;
  else if (visible + tab.width + margin > list.clientWidth)
    delta = visible + tab.width + margin - list.clientWidth;
  if (delta === 0) return;
  const left = rtl
    ? Math.min(Math.max(start + delta, -max), 0)
    : Math.min(Math.max(start + delta, 0), max);
  if (Math.abs(left - start) < 1) return;
  const reduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof list.scrollTo === "function") {
    list.scrollTo({ left, behavior: reduce || instant ? "auto" : "smooth" });
  } else {
    list.scrollLeft = left;
  }
}

/**
 * スクロールできるリストの、隠れたタブがある側（物理方向の left / right）を返す
 * en: Which physical sides (left / right) of a scrolling list have tabs hidden beyond them
 */
function useScrollEdges(
  listRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const [edges, setEdges] = React.useState({ left: false, right: false });

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !enabled) {
      setEdges({ left: false, right: false });
      return;
    }
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => update());
    function update() {
      if (!list) return;
      // リストの大きさが変わらなくても、タブの追加やフォントの読み込みで中身の幅は変わるので、タブも監視する
      // en: Content width changes without the list resizing (tabs added, fonts loading), so watch the tabs too
      Array.from(list.children).forEach(child =>
        resizeObserver?.observe(child)
      );
      const max = list.scrollWidth - list.clientWidth;
      // RTL では scrollLeft が 0（右端）から負の向きに増える
      // en: In RTL, scrollLeft runs from 0 (right edge) into negatives
      const fromLeft =
        getComputedStyle(list).direction === "rtl"
          ? max + list.scrollLeft
          : list.scrollLeft;
      const left = fromLeft > 1;
      const right = fromLeft < max - 1;
      setEdges(prev =>
        prev.left === left && prev.right === right ? prev : { left, right }
      );
    }
    update();
    list.addEventListener("scroll", update, { passive: true });
    resizeObserver?.observe(list);
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(list, { childList: true, subtree: true });
    return () => {
      list.removeEventListener("scroll", update);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, [listRef, enabled]);

  return edges;
}

function useActiveTabRect(listRef: React.RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = React.useState<TabRect | null>(null);
  const [ready, setReady] = React.useState(false);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);
  const revealedRef = React.useRef<{
    tab: HTMLElement;
    width: number;
  } | null>(null);

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
      // 選んだタブを見える位置へ。最初の表示（初期値がはみ出している場合）も含め、まだ見せていないタブなら動かす。
      // 選んだタブは太字になって幅が変わるので、幅が変わったときも取り直す。最初の表示では一瞬で動かす
      // en: Bring the selected tab into view whenever it has not been revealed yet, including the first
      // render (an initial value beyond the edge). It turns bold and widens, so re-reveal on width changes
      // too. The first reveal jumps instantly
      const revealed = revealedRef.current;
      if (
        measured &&
        active &&
        (revealed === null ||
          revealed.tab !== active ||
          revealed.width !== measured.width)
      ) {
        revealInList(list, measured, revealed === null);
        revealedRef.current = { tab: active, width: measured.width };
      }
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
  const edges = useScrollEdges(listRef, scrollable === true);
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
        data-indicator-ready={rect ? "" : undefined}
        data-fade-left={edges.left ? "" : undefined}
        data-fade-right={edges.right ? "" : undefined}
        className={cn(
          "group/tabs-list",
          tabsListVariants({ variant, scrollable }),
          className
        )}
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
