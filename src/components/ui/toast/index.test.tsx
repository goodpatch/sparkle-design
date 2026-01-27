/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  AsyncHelpers,
  EventHelpers,
  StyleHelpers,
  TestContainer,
} from "../../../test/helpers";

import { toast, Toast, Toaster } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  const toasts = document.querySelectorAll("[data-sonner-toast]");
  toasts.forEach(toastElement => {
    const closeButton = toastElement.querySelector("button");
    if (closeButton instanceof HTMLElement) {
      EventHelpers.click(closeButton);
    } else {
      toastElement.remove();
    }
  });
  testContainer.cleanup();
});

describe("Toast", () => {
  describe("Basic Rendering", () => {
    it("Toasterコンポーネントがレンダリングされる", () => {
      // Given: Toasterコンポーネントをレンダリングする
      testContainer.render(<Toaster />);

      // Then: aria-live="polite" を持つ要素が配置される
      const liveRegion = document.querySelector('[aria-live="polite"]');
      expect(liveRegion).not.toBeNull();
    });

    it("Toastコンポーネントが必須プロパティでレンダリングされる", () => {
      // Given: descriptionのみでToastをレンダリングする
      testContainer.render(<Toast description="テストメッセージ" />);

      // Then: descriptionが表示される
      expect(testContainer.getContainer().textContent).toContain(
        "テストメッセージ"
      );
    });

    it("titleとdescriptionが両方指定された場合に表示される", () => {
      // Given: titleとdescriptionを含むToastをレンダリングする
      testContainer.render(
        <Toast title="タイトル" description="詳細な説明文" />
      );

      // Then: 両方が表示される
      const textContent = testContainer.getContainer().textContent;
      expect(textContent).toContain("タイトル");
      expect(textContent).toContain("詳細な説明文");
    });

    it("titleが指定されない場合はdescriptionのみ表示される", () => {
      // Given: descriptionのみのToastをレンダリングする
      testContainer.render(<Toast description="説明文のみ" />);

      // Then: descriptionのみが表示される
      const paragraphs = testContainer.getContainer().querySelectorAll("p");
      expect(paragraphs).toHaveLength(1);
      expect(testContainer.getContainer().textContent).toContain("説明文のみ");
    });
  });

  describe("Styling", () => {
    it("基本スタイルのクラスが適用される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(<Toast title="通知" description="内容" />);

      // Then: コンテナに基本クラスが付与される
      const toastElement = testContainer.getContainer().firstElementChild;
      expect(toastElement).not.toBeNull();
      if (toastElement) {
        expect(StyleHelpers.hasClass(toastElement, "shadow-float")).toBe(true);
        expect(StyleHelpers.hasClass(toastElement, "rounded-notice")).toBe(
          true
        );
        expect(StyleHelpers.hasClass(toastElement, "bg-neutral-50")).toBe(true);
        expect(StyleHelpers.hasClass(toastElement, "border")).toBe(true);
        expect(
          StyleHelpers.hasClass(toastElement, "border-divider-middle")
        ).toBe(true);
      }
    });
  });

  describe("Toast Function", () => {
    it("toast関数を呼び出すと識別子が返される", () => {
      // Given: Toasterをレンダリングする
      testContainer.render(<Toaster />);

      // When: toast関数を呼び出す
      const toastId = toast({
        title: "テストトースト",
        description: "テストの説明",
      });

      // Then: 識別子が返される
      expect(typeof toastId === "number" || typeof toastId === "string").toBe(
        true
      );
    });

    it("toast関数でトーストが表示される", async () => {
      // Given: Toasterをレンダリングする
      testContainer.render(<Toaster />);

      // When: toast関数を呼び出す
      toast({
        title: "表示テスト",
        description: "これはテストです",
      });

      // Then: トーストが表示される
      await AsyncHelpers.waitFor(() => {
        const hasTitle = document.body.textContent?.includes("表示テスト");
        const hasDescription =
          document.body.textContent?.includes("これはテストです");
        return Boolean(hasTitle && hasDescription);
      });
    });
  });

  describe("User Interaction", () => {
    it("閉じるボタンをクリックできる", () => {
      // Given: Toastをレンダリングする
      testContainer.render(<Toast title="閉じるテスト" description="テスト" />);

      // When: 閉じるボタンをクリックする
      const closeButton = testContainer.queryButton();
      EventHelpers.click(closeButton);

      // Then: クリックできる（Sonner側の閉じる挙動は統合で検証）
      expect(closeButton).toBeTruthy();
    });

    it("閉じるボタンにcloseアイコンが表示される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(
        <Toast title="アイコンテスト" description="テスト" />
      );

      // Then: closeアイコンが表示される
      const closeButton = testContainer.queryButton();
      const icon = closeButton.querySelector('[aria-hidden="true"]');
      expect(icon?.textContent).toBe("close");
    });

    it("isCloseTrigger=falseの場合は閉じるボタンが表示されない", () => {
      // Given: isCloseTriggerをfalseに設定したToastをレンダリングする
      testContainer.render(
        <Toast
          title="閉じるボタンなし"
          description="テスト"
          isCloseTrigger={false}
        />
      );

      // Then: 閉じるボタンが存在しない
      const button = testContainer.getContainer().querySelector("button");
      expect(button).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("タイトルが適切なセマンティックマークアップで表示される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(
        <Toast title="アクセシビリティテスト" description="テスト" />
      );

      // Then: タイトルがp要素として表示される
      const title = Array.from(
        testContainer.getContainer().querySelectorAll("p")
      ).find(p => p.textContent === "アクセシビリティテスト");
      expect(title).not.toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("空のtitleでもエラーなくレンダリングされる", () => {
      // Given: 空のtitleでToastをレンダリングする
      expect(() => {
        testContainer.render(<Toast title="" description="説明のみ" />);
      }).not.toThrow();
    });

    it("非常に長いtitleでもレンダリングされる", () => {
      // Given: 非常に長いtitleを持つToastをレンダリングする
      const longTitle = "あ".repeat(1000);
      testContainer.render(<Toast title={longTitle} description="説明" />);

      // Then: テキストが表示される
      expect(testContainer.getContainer().textContent).toContain(longTitle);
    });

    it("非常に長いdescriptionでもレンダリングされる", () => {
      // Given: 非常に長いdescriptionを持つToastをレンダリングする
      const longDescription = "い".repeat(1000);
      testContainer.render(
        <Toast title="タイトル" description={longDescription} />
      );

      // Then: descriptionが表示される
      expect(testContainer.getContainer().textContent).toContain(
        longDescription
      );
    });

    it("複数のクラス名が適用できる", () => {
      // Given: カスタムclassNameを持つToastをレンダリングする
      testContainer.render(
        <Toast
          title="カスタムクラス"
          description="テスト"
          className="custom-class another-class"
        />
      );

      // Then: カスタムクラスが適用される
      const toastElement = testContainer
        .getContainer()
        .querySelector(".custom-class");
      expect(toastElement).not.toBeNull();
    });

    it("titleなしdescriptionのみでもレンダリングされる", () => {
      // Given: titleなしのToastをレンダリングする
      testContainer.render(<Toast description="説明のみのトースト" />);

      // Then: descriptionが表示される
      expect(testContainer.getContainer().textContent).toContain(
        "説明のみのトースト"
      );

      // Then: titleのp要素は存在しない（または空）
      const paragraphs = testContainer.getContainer().querySelectorAll("p");
      const hasTitle = Array.from(paragraphs).some(
        p =>
          p.className.includes("character-3-bold-pro") && p.textContent !== ""
      );
      expect(hasTitle).toBe(false);
    });
  });
});
