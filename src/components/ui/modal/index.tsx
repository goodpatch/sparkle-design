/**
 * This file is part of Sparkle Design.
 * License: https://github.com/goodpatch/sparkle-design/blob/main/LICENSE
 * If you modify this file, add a "Modifications" note here.
 */
"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { IconButton } from "../icon-button";

/**
 * **概要 / Overview**
 *
 * - モーダルはコンテンツに重ねられたウィンドウを介して、ユーザーの注意を特定の情報に集中させるために使用するコンポーネントです。
 * - en: The Modal component is used to focus user attention on specific information through a window overlaid on content.
 * - 作成/編集フォームや詳細表示など、確認だけではない情報入力・閲覧に使います。
 * - en: Use Modal for forms and detail views such as create/edit flows, not for simple action confirmation.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Modal>
 *   <ModalTrigger>モーダルを開く</ModalTrigger>
 *   <ModalContent size="md">
 *     <ModalHeader>
 *       <ModalTitle>タイトル</ModalTitle>
 *       <ModalClose />
 *     </ModalHeader>
 *     <ModalBody>
 *       <p>モーダルの内容</p>
 *     </ModalBody>
 *     <ModalFooter>
 *       <button>OK</button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @param {React.ComponentProps<typeof DialogPrimitive.Root>} props
 */
function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

/// モーダルのトリガー要素
function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

/// モーダルのポータル要素
function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />;
}

/// モーダルのタイトル要素
function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn("character-4-bold-pro flex-1", className)}
      {...props}
    />
  );
}

/// モーダルのクローズボタン
function ModalClose({
  "aria-label": ariaLabel = "閉じる",
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "icon">) {
  return (
    <DialogPrimitive.Close asChild>
      <IconButton
        icon="close"
        data-slot="modal-close"
        size="xs"
        variant="ghost"
        theme="neutral"
        aria-label={ariaLabel}
        {...props}
      />
    </DialogPrimitive.Close>
  );
}

/// モーダルのオーバーレイ要素
function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

// Figmaのsizeバリアントに合わせた型定義
export type ModalSize =
  // 320px
  | "sm"
  // 480px
  | "md"
  // 640px
  | "lg"
  // 960px
  | "xl"
  // 100vw
  | "full";

interface ModalContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  /**
   * モーダルのサイズ（sm、md、lg、xl、full）
   * en: Modal size (sm, md, lg, xl, full)
   */
  size?: ModalSize;
  /**
   * オーバーレイクリック時にモーダルを閉じるかどうか
   * en: Determines whether clicking the overlay closes the modal
   */
  closeOnOverlayClick?: boolean;
}

/// モーダルの本体
function ModalContent({
  className,
  children,
  size = "md",
  closeOnOverlayClick = false,
  onInteractOutside,
  ...props
}: ModalContentProps) {
  const handleInteractOutside = React.useCallback<
    NonNullable<ModalContentProps["onInteractOutside"]>
  >(
    event => {
      onInteractOutside?.(event);
      if (!closeOnOverlayClick && !event.defaultPrevented) {
        event.preventDefault();
      }
    },
    [closeOnOverlayClick, onInteractOutside]
  );

  // Figmaのsizeバリアントに合わせたサイズごとのスタイル定義
  const sizeClass =
    size === "sm"
      ? "max-w-xs"
      : size === "md"
        ? "max-w-[480px]"
        : size === "lg"
          ? "max-w-[640px]"
          : size === "xl"
            ? "max-w-[960px]"
            : size === "full"
              ? "max-w-[calc(100vw-80px)] h-[calc(100vh-80px)] overflow-hidden"
              : "";
  return (
    <ModalPortal data-slot="modal-portal">
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(
          sizeClass,
          "z-50 flex flex-col gap-0 w-full max-h-[calc(100vh-80px)] bg-white border-divider-low py-4 rounded-modal data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200",
          className
        )}
        onInteractOutside={handleInteractOutside}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

/// モーダルのヘッダー
function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex gap-2 px-6 py-2 items-center w-full shrink-0 grow-0",
        className
      )}
      {...props}
    />
  );
}

/// モーダルのボディ
function ModalBody({
  className,
  isSpace = true,
  ...props
}: React.ComponentProps<"div"> & { isSpace?: boolean }) {
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "grow overflow-auto min-h-0",
        isSpace ? "px-6 py-2" : "",
        className
      )}
      {...props}
    />
  );
}

/// モーダルのフッター
function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex flex-row justify-end gap-2 px-6 py-2 shrink-0 grow-0",
        className
      )}
      {...props}
    />
  );
}

export {
  Modal,
  ModalClose,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
