import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Dialog, DialogContent, DialogTitle, DialogCancel } from "../dialog";
import { Modal, ModalContent, ModalTitle, ModalClose } from "../modal";

afterEach(cleanup);

describe("共通 Overlay の合成", () => {
  it("Dialog の開閉状態とキャンセル操作を維持する", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>確認</DialogTitle>
          <DialogCancel>中断</DialogCancel>
        </DialogContent>
      </Dialog>
    );
    const overlay = document.querySelector('[data-slot="dialog-overlay"]')!;
    expect(overlay.className).toContain("bg-surface-overlay");
    expect(overlay.getAttribute("data-state")).toBe("open");
    fireEvent.click(screen.getByRole("button", { name: "中断" }));
    expect(document.querySelector('[data-slot="dialog-overlay"]')).toBeNull();
  });

  it("Modal の開閉状態と閉じる操作を維持する", () => {
    render(
      <Modal defaultOpen>
        <ModalContent aria-describedby={undefined}>
          <ModalTitle>編集</ModalTitle>
          <ModalClose />
        </ModalContent>
      </Modal>
    );
    const overlay = document.querySelector('[data-slot="modal-overlay"]')!;
    expect(overlay.className).toContain("bg-surface-overlay");
    expect(overlay.getAttribute("data-state")).toBe("open");
    fireEvent.click(screen.getByRole("button", { name: /閉じる|Close/ }));
    expect(document.querySelector('[data-slot="modal-overlay"]')).toBeNull();
  });
});
