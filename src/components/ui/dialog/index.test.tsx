/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCancel,
  DialogAction,
} from "./index";

/**
 * テストヘルパー関数
 * en: Test helper functions
 */
function setupDialog(ui?: React.ReactNode) {
  return render(
    ui ?? (
      <Dialog>
        <DialogTrigger asChild>
          <Button>open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイトル</DialogTitle>
            <DialogDescription>説明文</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCancel>キャンセル</DialogCancel>
            <DialogAction>確定</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}

describe("Dialog", () => {
  // Portal を利用するコンポーネントであり jsdom では制限があるため挙動を最小限スモークテスト
  // en: Limited smoke tests only due to jsdom constraints with portal-based components

  it("opens and closes via trigger & cancel", async () => {
    // GIVEN: ダイアログ（タイトル/説明/アクション/キャンセル）を含む初期状態
    // en: GIVEN the dialog with title/description/action/cancel is rendered
    setupDialog();

    // WHEN: トリガーボタンをクリックして開く
    // en: WHEN the trigger button is clicked to open
    fireEvent.click(screen.getByRole("button", { name: "open" }));
    const title = await screen.findByText("タイトル");

    // THEN: タイトルが表示される
    // en: THEN the title should be visible
    expect(title).toBeInTheDocument();

    // WHEN: キャンセルボタンをクリック
    // en: WHEN cancel button is clicked
    fireEvent.click(screen.getByRole("button", { name: "キャンセル" }));

    // THEN: タイトル要素が消える（閉じた）
    // en: THEN the dialog content should be removed
    expect(screen.queryByText("タイトル")).toBeNull();
  });

  it("closes with Escape key", async () => {
    // GIVEN: Esc 用のタイトルと説明を持つダイアログ
    // en: GIVEN a dialog instance with Esc-specific title/description
    setupDialog(
      <Dialog>
        <DialogTrigger asChild>
          <Button>open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escタイトル</DialogTitle>
            <DialogDescription>Esc説明</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCancel>キャンセル</DialogCancel>
            <DialogAction>確定</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // WHEN: ダイアログを開き Escape キーを押下
    // en: WHEN the dialog is opened then Escape is pressed
    fireEvent.click(screen.getByRole("button", { name: "open" }));
    await screen.findByText("Escタイトル");
    fireEvent.keyDown(document, { key: "Escape" });

    // THEN: ダイアログは閉じる
    // en: THEN the dialog closes
    expect(screen.queryByText("Escタイトル")).toBeNull();
  });

  it("wires aria-labelledby & aria-describedby", async () => {
    // GIVEN: タイトルと説明を持つダイアログ
    // en: GIVEN a dialog with title and description
    setupDialog(
      <Dialog>
        <DialogTrigger asChild>
          <Button>open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AAA</DialogTitle>
            <DialogDescription>BBB</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCancel>キャンセル</DialogCancel>
            <DialogAction>確定</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // WHEN: トリガーで開く
    // en: WHEN opening via trigger
    fireEvent.click(screen.getByRole("button", { name: "open" }));
    const title = await screen.findByText("AAA");
    const desc = screen.getByText("BBB");

    // THEN: content に正しい aria 属性が設定されている
    // en: THEN aria-labelledby / aria-describedby reference the generated IDs
    const content = title.closest("[data-slot=dialog-content]")!;
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    expect(content.getAttribute("aria-describedby")).toBe(desc.id);
  });
});
