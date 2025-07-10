"use client";

import * as React from "react";
import { AlertDialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon, IconProps } from "../icon";

/**
 * **概要 / Overview**
 *
 * - ダイアログはユーザーにアクションの実行や中断を確認するために使用するコンポーネントです。
 * - en: The Dialog component is used to confirm the execution or interruption of actions with users.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>ダイアログを開く</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>確認</DialogTitle>
 *       <DialogDescription>本当に削除しますか？</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogCancel>キャンセル</DialogCancel>
 *       <DialogAction>削除</DialogAction>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * @param props
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-popout duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-3 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogIcon({ className, icon, ...props }: IconProps) {
  return <Icon icon={icon} className={className} size={7} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-text-high leading-none character-4-bold-pro flex gap-2 items-center justify-start",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-text-high character-2-regular-pro", className)}
      {...props}
    />
  );
}

function DialogCancel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Cancel>) {
  return (
    <DialogPrimitive.Cancel data-slot="dialog-cancel" asChild {...props}>
      <Button variant="ghost" theme="secondary" size="sm" className={className}>
        {children}
      </Button>
    </DialogPrimitive.Cancel>
  );
}

function DialogAction({
  className,
  children,
  theme = "primary",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Action> & ButtonProps) {
  return (
    <DialogPrimitive.Action data-slot="dialog-action" asChild {...props}>
      <Button variant="solid" theme={theme} size="sm" className={className}>
        {children}
      </Button>
    </DialogPrimitive.Action>
  );
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
  DialogCancel,
  DialogAction,
};
