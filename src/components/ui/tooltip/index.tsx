"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

/**
 * TooltipContentVariants
 * ツールチップの位置やオフセットを指定するための型
 * en: Type for specifying tooltip position and offset
 */
type TooltipContentVariants = {
  /**
   * ツールチップの表示位置を指定します。
   * en: Specifies the position of the tooltip (top, right, bottom, left).
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * トリガー要素とツールチップの間の距離を指定します。
   * en: Specifies the distance between the trigger element and the tooltip.
   */
  sideOffset?: number;
};

/**
 * TooltipContentProps
 * TooltipContentコンポーネントのプロパティ型
 * en: Props type for TooltipContent component
 */
interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content>,
    TooltipContentVariants {}

/**
 * TooltipProvider コンポーネント
 * en: TooltipProvider component
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Tooltip コンポーネント
 * en: Tooltip component
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger コンポーネント
 * en: TooltipTrigger component
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * TooltipContent コンポーネント
 * en: TooltipContent component
 */
function TooltipContent({
  className,
  side = "top",
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "bg-neutral-900 shadow-float animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 w-fit origin-[--radix-tooltip-content-transform-origin] rounded-notice",
          "px-2 py-1 character-2-regular-pro text-white",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-neutral-900 fill-neutral-900 shadow-float z-50 size-3 translate-y-[calc(-50%_-_1px)] rotate-45 rounded-xs" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
export type { TooltipContentVariants };
