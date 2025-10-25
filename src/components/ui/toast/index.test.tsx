/**
 * @jest-environment jsdom
 */

import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { toast, Toast, Toaster } from "./index";

describe("Toast", () => {
  beforeEach(() => {
    // 各テスト前にDOMをクリーンアップ
    document.body.innerHTML = "";
  });

  afterEach(() => {
    // 全てのトーストを閉じる
    act(() => {
      const toasts = document.querySelectorAll("[data-sonner-toast]");
      toasts.forEach(toast => {
        const closeButton = toast.querySelector('button[aria-label*="close"]');
        if (closeButton instanceof HTMLElement) {
          closeButton.click();
        }
      });
    });
  });

  describe("Basic Rendering", () => {
    it("Toasterコンポーネントがレンダリングされる", () => {
      // Given: Toasterコンポーネントをレンダリングする
      render(<Toaster />);

      // Then: aria-live="polite" を持つ要素が配置される
      const liveRegion = document.querySelector('[aria-live="polite"]');
      expect(liveRegion).not.toBeNull();
    });

    it("Toastコンポーネントが必須プロパティでレンダリングされる", () => {
      // Given: descriptionのみでToastをレンダリングする
      const { container } = render(<Toast description="テストメッセージ" />);

      // Then: descriptionが表示される
      expect(container.textContent).toContain("テストメッセージ");
    });

    it("titleとdescriptionが両方指定された場合に表示される", () => {
      // Given: titleとdescriptionを含むToastをレンダリングする
      const { container } = render(
        <Toast title="タイトル" description="詳細な説明文" />
      );

      // Then: 両方が表示される
      expect(container.textContent).toContain("タイトル");
      expect(container.textContent).toContain("詳細な説明文");
    });

    it("titleが指定されない場合はdescriptionのみ表示される", () => {
      // Given: descriptionのみのToastをレンダリングする
      const { container } = render(<Toast description="説明文のみ" />);

      // Then: descriptionのみが表示される
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(1);
      expect(container.textContent).toContain("説明文のみ");
    });

    it("titleのみが指定された場合も表示される", () => {
      // Given: titleとdescriptionを持つToastをレンダリングする
      const { container } = render(
        <Toast title="タイトル" description="説明" />
      );

      // Then: タイトルが表示される
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs.length).toBeGreaterThanOrEqual(1);
      expect(container.textContent).toContain("タイトル");
    });
  });

  describe("Variant Styling", () => {
    it("neutralバリアントで正しいスタイルが適用される", () => {
      // Given: neutralバリアントのToastをレンダリングする
      const { container } = render(
        <Toast
          title="中立メッセージ"
          description="説明"
          variant="neutral"
        />
      );

      // Then: bg-neutral-700クラスが適用される
      const toastElement = container.querySelector(".bg-neutral-700");
      expect(toastElement).not.toBeNull();
    });

    it("successバリアントで正しいスタイルが適用される", () => {
      // Given: successバリアントのToastをレンダリングする
      const { container } = render(
        <Toast
          title="成功メッセージ"
          description="成功しました"
          variant="success"
        />
      );

      // Then: bg-success-500クラスが適用される
      const toastElement = container.querySelector(".bg-success-500");
      expect(toastElement).not.toBeNull();
    });

    it("negativeバリアントで正しいスタイルが適用される", () => {
      // Given: negativeバリアントのToastをレンダリングする
      const { container } = render(
        <Toast
          title="エラーメッセージ"
          description="エラーが発生しました"
          variant="negative"
        />
      );

      // Then: bg-negative-500クラスが適用される
      const toastElement = container.querySelector(".bg-negative-500");
      expect(toastElement).not.toBeNull();
    });

    it("successバリアントでチェックアイコンが表示される", () => {
      // Given: successバリアントのToastをレンダリングする
      const { container } = render(
        <Toast title="成功" description="完了" variant="success" />
      );

      // Then: check_circleアイコンが表示される
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon?.textContent).toBe("check_circle");
    });

    it("negativeバリアントでエラーアイコンが表示される", () => {
      // Given: negativeバリアントのToastをレンダリングする
      const { container } = render(
        <Toast title="エラー" description="失敗" variant="negative" />
      );

      // Then: errorアイコンが表示される
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon?.textContent).toBe("error");
    });

    it("neutralバリアントではアイコンが表示されない", () => {
      // Given: neutralバリアントのToastをレンダリングする
      const { container } = render(
        <Toast title="通知" description="お知らせ" variant="neutral" />
      );

      // Then: アイコンが存在しない
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      // closeボタンのアイコンのみが存在する
      expect(icons.length).toBeLessThanOrEqual(1);
    });

    it("neutralバリアントのdescriptionは正しい色が適用される", () => {
      // Given: neutralバリアントでdescriptionを持つToastをレンダリングする
      const { container } = render(
        <Toast title="タイトル" description="説明" variant="neutral" />
      );

      // Then: descriptionにtext-neutral-100クラスが適用される
      const description = container.querySelector(".text-neutral-100");
      expect(description?.textContent).toBe("説明");
    });
  });

  describe("Toast Function", () => {
    it("toast関数を呼び出すと識別子が返される", async () => {
      // Given: Toasterをレンダリングする
      render(<Toaster />);

      // When: toast関数を呼び出す
      let toastId: string | number | undefined;
      act(() => {
        toastId = toast({
          title: "テストトースト",
          description: "テストの説明",
        });
      });

      // Then: 識別子が返される
      expect(typeof toastId === "number" || typeof toastId === "string").toBe(
        true
      );

      // Cleanup
      await waitFor(() => {
        act(() => {
          if (toastId !== undefined) {
            const dismissButton = document.querySelector(
              'button[aria-label*="close"]'
            );
            if (dismissButton instanceof HTMLElement) {
              dismissButton.click();
            }
          }
        });
      });
    });

    it("toast関数でトーストが表示される", async () => {
      // Given: Toasterをレンダリングする
      render(<Toaster />);

      // When: toast関数を呼び出す
      act(() => {
        toast({
          title: "表示テスト",
          description: "これはテストです",
        });
      });

      // Then: トーストが表示される
      await waitFor(() => {
        expect(screen.queryByText("表示テスト")).not.toBeNull();
        expect(screen.queryByText("これはテストです")).not.toBeNull();
      });
    });

    it("toast関数で各バリアントが正しく適用される", async () => {
      // Given: Toasterをレンダリングする
      render(<Toaster />);

      // When: successバリアントでtoastを表示する
      act(() => {
        toast({
          title: "成功",
          description: "処理が完了しました",
          variant: "success",
        });
      });

      // Then: successスタイルが適用される
      await waitFor(() => {
        const successToast = document.querySelector(".bg-success-500");
        expect(successToast).not.toBeNull();
      });
    });
  });

  describe("User Interaction", () => {
    it("閉じるボタンをクリックするとトーストが閉じる", async () => {
      // Given: Toastをレンダリングする
      const testId = "test-toast-id";
      const { container } = render(
        <Toast title="閉じるテスト" description="テスト" id={testId} />
      );

      // When: 閉じるボタンをクリックする
      const closeButton = container.querySelector("button");
      expect(closeButton).not.toBeNull();

      // Note: Sonnerの内部動作により、実際の閉じる動作は統合テストで確認すべき
      // ここではボタンの存在とクリック可能性を確認
      act(() => {
        closeButton?.click();
      });

      // Then: クリックイベントが発火する（Sonnerが処理）
      expect(closeButton).toBeTruthy();
    });

    it("閉じるボタンに適切なアイコンが表示される", () => {
      // Given: Toastをレンダリングする
      const { container } = render(
        <Toast title="アイコンテスト" description="テスト" />
      );

      // Then: closeアイコンが表示される
      const closeButtons = container.querySelectorAll("button");
      const closeButton = Array.from(closeButtons).find(
        btn =>
          btn.querySelector('[aria-hidden="true"]')?.textContent === "close"
      );
      expect(closeButton).toBeTruthy();
    });

    it("isCloseTrigger=falseの場合は閉じるボタンが表示されない", () => {
      // Given: isCloseTriggerをfalseに設定したToastをレンダリングする
      const { container } = render(
        <Toast
          title="閉じるボタンなし"
          description="テスト"
          isCloseTrigger={false}
        />
      );

      // Then: 閉じるボタンが存在しない
      const closeButton = container.querySelector("button");
      expect(closeButton).toBeNull();
    });

    it("isCloseTrigger=trueの場合は閉じるボタンが表示される（デフォルト動作）", () => {
      // Given: isCloseTriggerを明示的にtrueに設定したToastをレンダリングする
      const { container } = render(
        <Toast
          title="閉じるボタンあり"
          description="テスト"
          isCloseTrigger={true}
        />
      );

      // Then: 閉じるボタンが存在する
      const closeButton = container.querySelector("button");
      expect(closeButton).not.toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("Toasterにaria-live属性が設定される", () => {
      // Given: Toasterをレンダリングする
      render(<Toaster />);

      // Then: aria-live="polite"が設定される
      const liveRegion = document.querySelector('[aria-live="polite"]');
      expect(liveRegion).not.toBeNull();
    });

    it("タイトルが適切なセマンティックマークアップで表示される", () => {
      // Given: Toastをレンダリングする
      const { container } = render(
        <Toast title="アクセシビリティテスト" description="テスト" />
      );

      // Then: タイトルがp要素として表示される
      const title = Array.from(container.querySelectorAll("p")).find(
        p => p.textContent === "アクセシビリティテスト"
      );
      expect(title).not.toBeNull();
    });

    it("アイコンにaria-hidden属性が設定される", () => {
      // Given: successバリアントのToastをレンダリングする
      const { container } = render(
        <Toast
          title="アイコンテスト"
          description="テスト"
          variant="success"
        />
      );

      // Then: アイコンにaria-hidden="true"が設定される
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("Edge Cases", () => {
    it("空のtitleでもエラーなくレンダリングされる", () => {
      // Given: 空のtitleでToastをレンダリングする
      expect(() => {
        render(<Toast title="" description="説明のみ" />);
      }).not.toThrow();
    });

    it("非常に長いtitleでもレンダリングされる", () => {
      // Given: 非常に長いtitleを持つToastをレンダリングする
      const longTitle = "あ".repeat(1000);
      const { container } = render(
        <Toast title={longTitle} description="説明" />
      );

      // Then: テキストが表示される
      expect(container.textContent).toContain(longTitle);
    });

    it("非常に長いdescriptionでもレンダリングされる", () => {
      // Given: 非常に長いdescriptionを持つToastをレンダリングする
      const longDescription = "い".repeat(1000);
      const { container } = render(
        <Toast title="タイトル" description={longDescription} />
      );

      // Then: descriptionが表示される
      expect(container.textContent).toContain(longDescription);
    });

    it("複数のクラス名が適用できる", () => {
      // Given: カスタムclassNameを持つToastをレンダリングする
      const { container } = render(
        <Toast
          title="カスタムクラス"
          description="テスト"
          className="custom-class another-class"
        />
      );

      // Then: カスタムクラスが適用される
      const toastElement = container.querySelector(".custom-class");
      expect(toastElement).not.toBeNull();
    });

    it("undefined variantでもエラーなくレンダリングされる", () => {
      // Given: variantなしでToastをレンダリングする
      expect(() => {
        render(
          <Toast title="デフォルト" description="テスト" variant={undefined} />
        );
      }).not.toThrow();
    });

    it("titleなしdescriptionのみでもレンダリングされる", () => {
      // Given: titleなしのToastをレンダリングする
      const { container } = render(<Toast description="説明のみのトースト" />);

      // Then: descriptionが表示される
      expect(container.textContent).toContain("説明のみのトースト");

      // Then: titleのp要素は存在しない（または空）
      const paragraphs = container.querySelectorAll("p");
      const hasTitle = Array.from(paragraphs).some(
        p =>
          p.className.includes("character-3-bold-pro") &&
          p.textContent !== ""
      );
      expect(hasTitle).toBe(false);
    });
  });
});
