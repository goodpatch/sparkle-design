"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { IconButton } from "../icon-button";

function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />;
}

function ModalClose({
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "icon">) {
  return (
    <DialogPrimitive.Close asChild>
      <IconButton
        icon="close"
        data-slot="modal-close"
        size="xs"
        variant="ghost"
        theme="secondary"
        {...props}
      />
    </DialogPrimitive.Close>
  );
}

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
  size?: ModalSize;
}

function ModalContent({
  className,
  children,
  size = "md",
  ...props
}: ModalContentProps) {
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
      ? "max-w-full w-full h-full"
      : "";
  return (
    <ModalPortal data-slot="modal-portal">
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(
          sizeClass,
          "z-50 flex flex-col bg-background border py-4 w-full rounded-modal data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] grid translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn("flex gap-2 px-6 py-2 items-center w-full", className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn("flex flex-row justify-end gap-2 px-6 py-2", className)}
      {...props}
    />
  );
}

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

function ModalBody({
  className,
  isSpace = true,
  ...props
}: React.ComponentProps<"div"> & {
  isSpace?: boolean;
}) {
  return (
    <div
      data-slot="modal-body"
      className={cn("h-full flex-1", isSpace ? "px-6 py-2" : "", className)}
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
