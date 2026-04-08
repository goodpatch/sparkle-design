/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
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
 * - フォーム入力や詳細表示には使わず、削除確認や再試行確認などのアクション確認に使います。
 * - en: Do not use Dialog for forms or detail views. Use it for action confirmations such as delete and retry flows.
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
 * **アンチパターン / Anti-patterns**
 *
 * - フォーム入力や詳細表示には使わず、削除確認や再試行確認などのアクション確認に使ってください。
 *   en: Do not use Dialog for forms or detail views. Use it for action confirmations such as delete and retry flows.
 *
 * ```tsx
 * // ✅ Correct
 * <Dialog>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>削除確認</DialogTitle>
 *       <DialogDescription>本当に削除しますか？</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogCancel>キャンセル</DialogCancel>
 *       <DialogAction>削除</DialogAction>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 *
 * // ❌ Wrong - フォーム入力に Dialog を使わない
 * <Dialog>
 *   <DialogContent>
 *     <Input />
 *     <Select />
 *   </DialogContent>
 * </Dialog>
 * ```

 * @param {React.ComponentProps<typeof DialogPrimitive.Root>} props
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
        "fixed inset-0 z-50 bg-black/50",
        // オープン：ease-out で 400ms フェードイン
        // en: open — fade-in over 400ms with ease-out
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:animation-duration-400 data-[state=open]:[--tw-ease:ease-out]",
        // クローズ：ease-in で 3000ms フェードアウト
        // en: close — fade-out over 3000ms with ease-in
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:animation-duration-3000 data-[state=closed]:[--tw-ease:ease-in]",
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
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-popout sm:max-w-lg",
          // オープン：下から 6px スライドアップ + フェードイン + scale 0.97→1.0（expo-out）
          // en: open — slide up 6px + fade-in + scale 0.97→1.0 with expo-out easing
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:zoom-in-97 data-[state=open]:animation-duration-400 data-[state=open]:[--tw-ease:cubic-bezier(0.16,1,0.3,1)]",
          // クローズ：スライドなし・スケールのみでその場に収縮
          // en: close — scale-only shrink, no slide
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-97 data-[state=closed]:animation-duration-300 data-[state=closed]:[--tw-ease:cubic-bezier(0.4,0,1,1)]",
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

/**
 * **アンチパターン / Anti-patterns**
 *
 * - `DialogCancel` の children に `<Button>` を渡さないでください。内部で Button を描画します。
 *   en: Do not pass `<Button>` as children. DialogCancel renders a Button internally.
 *
 * ```tsx
 * // ✅ Correct
 * <DialogCancel>キャンセル</DialogCancel>
 *
 * // ❌ Wrong - 二重ラップ
 * <DialogCancel><Button>キャンセル</Button></DialogCancel>
 * ```

 */
function DialogCancel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Cancel>) {
  return (
    <DialogPrimitive.Cancel data-slot="dialog-cancel" asChild {...props}>
      <Button variant="ghost" theme="neutral" size="sm" className={className}>
        {children}
      </Button>
    </DialogPrimitive.Cancel>
  );
}

/**
 * **アンチパターン / Anti-patterns**
 *
 * - `DialogAction` の children に `<Button>` を渡さないでください。内部で Button を描画します。
 *   en: Do not pass `<Button>` as children. DialogAction renders a Button internally.
 *
 * ```tsx
 * // ✅ Correct
 * <DialogAction>確定</DialogAction>
 *
 * // ❌ Wrong - 二重ラップ
 * <DialogAction><Button>確定</Button></DialogAction>
 * ```

 */
function DialogAction({
  className,
  children,
  theme = "primary",
  variant = "solid",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Action> & ButtonProps) {
  return (
    <DialogPrimitive.Action data-slot="dialog-action" asChild {...props}>
      <Button variant={variant} theme={theme} size="sm" className={className}>
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
