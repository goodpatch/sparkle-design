/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  A11yHelpers,
  AsyncHelpers,
  EventHelpers,
  StyleHelpers,
  TestContainer,
} from "@/test/helpers";

import { toast, Toast, Toaster } from "./index";

describe("Toast", () => {
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

  describe("Basic Rendering", () => {
    it("Toasterコンポーネントがレンダリングされる", () => {
      // Given: Toasterコンポーネントをレンダリングする
      testContainer.render(<Toaster />);

      // When: aria-live属性を持つ要素を検索する
      const liveRegion = document.querySelector('[aria-live="polite"]');

      // Then: aria-live="polite" を持つ要素が配置される
      expect(liveRegion).not.toBeNull();
    });

    it("Toastコンポーネントが必須プロパティでレンダリングされる", () => {
      // Given: descriptionのみでToastをレンダリングする
      testContainer.render(<Toast description="テストメッセージ" />);

      // When: テキスト内容を確認する
      const textContent = testContainer.getContainer().textContent;

      // Then: descriptionが表示される
      expect(textContent).toContain("テストメッセージ");
    });

    it("titleとdescriptionが両方指定された場合に表示される", () => {
      // Given: titleとdescriptionを含むToastをレンダリングする
      testContainer.render(
        <Toast title="タイトル" description="詳細な説明文" />
      );

      // When: テキスト内容を確認する
      const textContent = testContainer.getContainer().textContent;

      // Then: 両方が表示される
      expect(textContent).toContain("タイトル");
      expect(textContent).toContain("詳細な説明文");
    });

    it("titleが指定されない場合はdescriptionのみ表示される", () => {
      // Given: descriptionのみのToastをレンダリングする
      testContainer.render(<Toast description="説明文のみ" />);

      // When: p要素を確認する
      const paragraphs = testContainer.getContainer().querySelectorAll("p");

      // Then: descriptionのみが表示される
      expect(paragraphs).toHaveLength(1);
      expect(testContainer.getContainer().textContent).toContain("説明文のみ");
    });
  });

  describe("Styling", () => {
    it("基本スタイルのクラスが適用される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(<Toast title="通知" description="内容" />);

      // When: コンテナ要素を取得する
      const toastElement = testContainer.getContainer().firstElementChild;

      // Then: コンテナに基本クラスが付与される
      expect(toastElement).not.toBeNull();
      if (toastElement) {
        expect(StyleHelpers.hasClass(toastElement, "shadow-float")).toBe(true);
        expect(StyleHelpers.hasClass(toastElement, "rounded-notice")).toBe(
          true
        );
        expect(
          StyleHelpers.hasClass(
            toastElement,
            "bg-surface-neutral-middle-enabled"
          )
        ).toBe(true);
        expect(StyleHelpers.hasClass(toastElement, "border")).toBe(true);
        expect(
          StyleHelpers.hasClass(toastElement, "border-border-neutral-middle")
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

  describe("モーション", () => {
    it("トーストはモーショントークンで、画面の上端の外から入る", async () => {
      // GIVEN: Toaster
      // en: GIVEN a Toaster
      testContainer.render(<Toaster />);

      // WHEN: トーストを出す
      // en: WHEN a toast is shown
      toast({ description: "モーションのテスト" });
      await AsyncHelpers.waitFor(() =>
        Boolean(document.querySelector("[data-sonner-toast]"))
      );
      const toastElement = document.querySelector(
        "[data-sonner-toast]"
      ) as HTMLElement;

      // THEN: 初期位置と退場位置は要素の高さの 140% 上で、時間はトークンで決まる
      // en: THEN it starts and exits 140% of its height above, timed by the motion tokens
      [
        "data-[mounted=false]:[--y:translateY(-140%)]!",
        "data-[removed=true]:data-[front=true]:[--y:translateY(-140%)]!",
        "motion-reduce:data-[mounted=false]:[--y:translateY(0)]!",
      ].forEach(cls => expect(toastElement.className).toContain(cls));
      expect(toastElement.className).toContain(
        "transform_var(--motion-move-duration)_var(--motion-move-ease)"
      );
      expect(toastElement.className).toContain(
        "opacity_var(--motion-toast-fade-duration)"
      );
      // sonner が 200ms で要素を外すので、退場は 200ms までに抑える
      // en: sonner unmounts after 200ms, so the exit is capped at 200ms
      expect(toastElement.className).toContain(
        "transform_min(var(--motion-exit-duration),200ms)_var(--motion-exit-ease)"
      );
    });

    it("toastOptions.className を渡しても、モーションのクラスは残る", async () => {
      // GIVEN: 独自のクラスを渡した Toaster
      // en: GIVEN a Toaster with a custom class
      testContainer.render(<Toaster toastOptions={{ className: "custom" }} />);

      // WHEN: トーストを出す
      // en: WHEN a toast is shown
      toast({ description: "クラスのテスト" });
      await AsyncHelpers.waitFor(() =>
        Boolean(document.querySelector("[data-sonner-toast]"))
      );
      const toastElement = document.querySelector(
        "[data-sonner-toast]"
      ) as HTMLElement;

      // THEN: 両方のクラスが付く
      // en: THEN both classes are applied
      expect(toastElement.className).toContain("custom");
      expect(toastElement.className).toContain(
        "data-[mounted=false]:[--y:translateY(-140%)]!"
      );
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

      // When: 閉じるボタン内のアイコンを確認する
      const closeButton = testContainer.queryButton();
      const icon = closeButton.querySelector('[aria-hidden="true"]');

      // Then: closeアイコンが表示される
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

      // When: ボタン要素を検索する
      const button = testContainer.getContainer().querySelector("button");

      // Then: 閉じるボタンが存在しない
      expect(button).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("タイトルが適切なセマンティックマークアップで表示される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(
        <Toast title="アクセシビリティテスト" description="テスト" />
      );

      // When: p要素からタイトルを検索する
      const title = Array.from(
        testContainer.getContainer().querySelectorAll("p")
      ).find(p => p.textContent === "アクセシビリティテスト");

      // Then: タイトルがp要素として表示される
      expect(title).not.toBeNull();
    });

    it("Toastコンポーネントにrole=statusが設定される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(
        <Toast title="ステータステスト" description="テスト" />
      );

      // When: Toast要素を取得する
      const toastElement = testContainer.getContainer().firstElementChild!;

      // Then: role="status"が設定される
      expect(A11yHelpers.hasRole(toastElement, "status")).toBe(true);
    });

    it("閉じるボタンにaria-labelが設定される", () => {
      // Given: Toastをレンダリングする
      testContainer.render(<Toast title="閉じるテスト" description="テスト" />);

      // When: 閉じるボタンを取得する
      const closeButton = testContainer.queryButton();

      // Then: 閉じるボタンにaria-label="閉じる"が設定される
      expect(A11yHelpers.hasAriaLabel(closeButton, "閉じる")).toBe(true);
    });

    it("閉じるボタンなしの場合はaria-labelも存在しない", () => {
      // Given: isCloseTrigger=falseでToastをレンダリングする
      testContainer.render(
        <Toast title="ボタンなし" description="テスト" isCloseTrigger={false} />
      );

      // When: ボタン要素を検索する
      const button = testContainer.getContainer().querySelector("button");

      // Then: ボタンが存在しない
      expect(button).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("空のtitleでもエラーなくレンダリングされる", () => {
      // Given/When: 空のtitleでToastをレンダリングする
      expect(() => {
        testContainer.render(<Toast title="" description="説明のみ" />);
      }).not.toThrow();
    });

    it("非常に長いtitleでもレンダリングされる", () => {
      // Given: 非常に長いtitleを持つToastをレンダリングする
      const longTitle = "あ".repeat(1000);
      testContainer.render(<Toast title={longTitle} description="説明" />);

      // When: テキスト内容を確認する
      const textContent = testContainer.getContainer().textContent;

      // Then: テキストが表示される
      expect(textContent).toContain(longTitle);
    });

    it("非常に長いdescriptionでもレンダリングされる", () => {
      // Given: 非常に長いdescriptionを持つToastをレンダリングする
      const longDescription = "い".repeat(1000);
      testContainer.render(
        <Toast title="タイトル" description={longDescription} />
      );

      // When: テキスト内容を確認する
      const textContent = testContainer.getContainer().textContent;

      // Then: descriptionが表示される
      expect(textContent).toContain(longDescription);
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

      // When: カスタムクラスを持つ要素を検索する
      const toastElement = testContainer
        .getContainer()
        .querySelector(".custom-class");

      // Then: カスタムクラスが適用される
      expect(toastElement).not.toBeNull();
    });

    it("titleなしdescriptionのみでもレンダリングされる", () => {
      // Given: titleなしのToastをレンダリングする
      testContainer.render(<Toast description="説明のみのトースト" />);

      // When: テキスト内容とp要素を確認する
      const paragraphs = testContainer.getContainer().querySelectorAll("p");
      const hasTitle = Array.from(paragraphs).some(
        p =>
          p.className.includes("character-3-bold-pro") && p.textContent !== ""
      );

      // Then: descriptionが表示され、titleは存在しない
      expect(testContainer.getContainer().textContent).toContain(
        "説明のみのトースト"
      );
      expect(hasTitle).toBe(false);
    });
  });
});
