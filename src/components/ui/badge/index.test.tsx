import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Badge } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Badge", () => {
  describe("Basic Rendering", () => {
    it("renders a basic badge with number", () => {
      // Given: 基本的なBadge
      testContainer.render(<Badge>5</Badge>);

      // When: div要素を確認
      const badge = testContainer.querySelector("div");

      // Then: 正常に描画される
      expect(badge).toBeTruthy();
      expect(badge.textContent).toBe("5");
    });

    it("renders with specified content", () => {
      // Given: 特定のコンテンツ付きのBadge
      testContainer.render(<Badge>99+</Badge>);

      // When: 内容を確認
      const badge = testContainer.querySelector("div");

      // Then: 指定したコンテンツが表示される
      expect(badge.textContent).toBe("99+");
    });

    it("applies base styles correctly", () => {
      // Given: 基本的なBadge
      testContainer.render(<Badge>3</Badge>);

      // When: スタイルクラスを確認
      const badge = testContainer.querySelector("div");

      // Then: 基本スタイルが適用される
      expect(badge.className).toContain("inline-flex");
      expect(badge.className).toContain("items-center");
      expect(badge.className).toContain("text-white");
      expect(badge.className).toContain("text-center");
      expect(badge.className).toContain("justify-center");
      expect(badge.className).toContain("rounded-full");
      expect(badge.className).toContain("transition-colors");
    });
  });

  describe("Size Variants", () => {
    it("applies medium size by default", () => {
      // Given: size未指定のBadge
      testContainer.render(<Badge>8</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: mediumサイズのクラスが適用される
      expect(badge.className).toContain("min-w-8");
      expect(badge.className).toContain("py-1");
      expect(badge.className).toContain("px-2");
      expect(badge.className).toContain("character-3-bold-mono");
    });

    it("applies x5s size correctly", () => {
      // Given: x5sサイズのBadge
      testContainer.render(<Badge size="x5s">1</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: x5sサイズのクラスが適用される（数字は非表示）
      expect(badge.className).toContain("w-2");
      expect(badge.className).toContain("h-2");
      expect(badge.className).toContain("min-w-2");
      expect(badge.textContent).toBe(""); // 数字は非表示
    });

    it("applies x4s size correctly", () => {
      // Given: x4sサイズのBadge
      testContainer.render(<Badge size="x4s">2</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: x4sサイズのクラスが適用される（数字は非表示）
      expect(badge.className).toContain("w-3");
      expect(badge.className).toContain("h-3");
      expect(badge.className).toContain("min-w-3");
      expect(badge.textContent).toBe(""); // 数字は非表示
    });

    it("applies x3s size correctly", () => {
      // Given: x3sサイズのBadge
      testContainer.render(<Badge size="x3s">3</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: x3sサイズのクラスが適用される（数字は非表示）
      expect(badge.className).toContain("w-4");
      expect(badge.className).toContain("h-4");
      expect(badge.className).toContain("min-w-4");
      expect(badge.textContent).toBe(""); // 数字は非表示
    });

    it("applies x2s size correctly", () => {
      // Given: x2sサイズのBadge
      testContainer.render(<Badge size="x2s">4</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: x2sサイズのクラスが適用される
      expect(badge.className).toContain("min-w-5");
      expect(badge.className).toContain("py-0");
      expect(badge.className).toContain("px-1.5");
      expect(badge.className).toContain("character-1-bold-mono");
    });

    it("applies xs size correctly", () => {
      // Given: xsサイズのBadge
      testContainer.render(<Badge size="xs">5</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: xsサイズのクラスが適用される
      expect(badge.className).toContain("min-w-6");
      expect(badge.className).toContain("py-0.5");
      expect(badge.className).toContain("px-1.5");
      expect(badge.className).toContain("character-1-bold-mono");
    });

    it("applies sm size correctly", () => {
      // Given: smサイズのBadge
      testContainer.render(<Badge size="sm">6</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: smサイズのクラスが適用される
      expect(badge.className).toContain("min-w-7");
      expect(badge.className).toContain("py-0.5");
      expect(badge.className).toContain("px-2");
      expect(badge.className).toContain("character-2-bold-mono");
    });
  });

  describe("Status Colors", () => {
    it("applies info status by default", () => {
      // Given: status未指定のBadge
      testContainer.render(<Badge>7</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: infoステータスのスタイルが適用される
      expect(badge.className).toContain("bg-info-500");
    });

    it("applies success status correctly", () => {
      // Given: successステータスのBadge
      testContainer.render(<Badge status="success">8</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: successステータスのスタイルが適用される
      expect(badge.className).toContain("bg-success-500");
    });

    it("applies negative status correctly", () => {
      // Given: negativeステータスのBadge
      testContainer.render(<Badge status="negative">9</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: negativeステータスのスタイルが適用される
      expect(badge.className).toContain("bg-negative-500");
    });
  });

  describe("Number Visibility", () => {
    it("shows number by default when isNumberVisible is true", () => {
      // Given: isNumberVisible=trueのBadge
      testContainer.render(<Badge isNumberVisible={true}>10</Badge>);

      // When: コンテンツを確認
      const badge = testContainer.querySelector("div");

      // Then: 数字が表示される
      expect(badge.textContent).toBe("10");
    });

    it("hides number when isNumberVisible is false", () => {
      // Given: isNumberVisible=falseのBadge
      testContainer.render(
        <Badge isNumberVisible={false} size="md">
          11
        </Badge>
      );

      // When: コンテンツとクラスを確認
      const badge = testContainer.querySelector("div");

      // Then: 数字が非表示になり、適切な高さが設定される
      expect(badge.textContent).toBe("");
      expect(badge.className).toContain("h-8"); // mdサイズの場合
    });

    it("automatically hides number for small sizes", () => {
      // Given: 小さなサイズのBadge
      const sizes = ["x5s", "x4s", "x3s"] as const;

      sizes.forEach(size => {
        testContainer.render(<Badge size={size}>12</Badge>);

        // When: コンテンツを確認
        const badge = testContainer.querySelector("div");

        // Then: 自動的に数字が非表示になる
        expect(badge.textContent).toBe("");

        // Clean up for next iteration
        testContainer.cleanup();
        testContainer.setup();
      });
    });

    it("hides number when children is not provided", () => {
      // Given: children未指定のBadge
      testContainer.render(<Badge size="md" />);

      // When: コンテンツとクラスを確認
      const badge = testContainer.querySelector("div");

      // Then: 数字が非表示になり、適切な高さが設定される
      expect(badge.textContent).toBe("");
      expect(badge.className).toContain("h-8");
    });
  });

  describe("Gap Feature", () => {
    it("does not apply gap by default", () => {
      // Given: isGapped未指定のBadge
      testContainer.render(<Badge>13</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: gapのクラスが適用されない
      expect(badge.className).not.toContain("outline-white");
    });

    it("applies gap styles when isGapped is true", () => {
      // Given: isGapped=trueのBadge
      testContainer.render(
        <Badge isGapped={true} size="md">
          14
        </Badge>
      );

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: gapのクラスが適用される
      expect(badge.className).toContain("outline-white");
      expect(badge.className).toContain("outline-4");
    });

    it("applies different outline width for different sizes", () => {
      // Given: 異なるサイズのgapped Badge
      const testCases = [
        { size: "x5s" as const, expectedOutline: "outline-2" },
        { size: "x4s" as const, expectedOutline: "outline-2" },
        { size: "x3s" as const, expectedOutline: "outline-4" },
        { size: "x2s" as const, expectedOutline: "outline-4" },
        { size: "xs" as const, expectedOutline: "outline-4" },
        { size: "sm" as const, expectedOutline: "outline-4" },
        { size: "md" as const, expectedOutline: "outline-4" },
      ];

      testCases.forEach(({ size, expectedOutline }) => {
        testContainer.render(
          <Badge isGapped={true} size={size}>
            15
          </Badge>
        );

        // When: クラス名を確認
        const badge = testContainer.querySelector("div");

        // Then: 適切なアウトライン幅が適用される
        expect(badge.className).toContain("outline-white");
        expect(badge.className).toContain(expectedOutline);

        // Clean up for next iteration
        testContainer.cleanup();
        testContainer.setup();
      });
    });
  });

  describe("User Interaction", () => {
    it("handles click events properly", async () => {
      // Given: clickハンドラー付きのBadge
      const handleClick = vi.fn();
      testContainer.render(<Badge onClick={handleClick}>16</Badge>);

      // When: バッジをクリック
      const badge = testContainer.querySelector("div");
      await EventHelpers.click(badge);

      // Then: クリックハンドラーが呼ばれる
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("provides click event details", async () => {
      // Given: イベント詳細をチェックするハンドラー
      const handleClick = vi.fn();
      testContainer.render(<Badge onClick={handleClick}>17</Badge>);

      // When: バッジをクリック
      const badge = testContainer.querySelector("div");
      await EventHelpers.click(badge);

      // Then: 正しいイベントオブジェクトが渡される
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0].type).toBe("click");
    });

    it("supports keyboard interaction", async () => {
      // Given: キーボードイベントハンドラー付きのBadge
      const handleKeyDown = vi.fn();
      testContainer.render(
        <Badge onKeyDown={handleKeyDown} tabIndex={0}>
          18
        </Badge>
      );

      // When: キーボードイベントを実行
      const badge = testContainer.querySelector("div");
      await EventHelpers.keyDown(badge, "Enter");

      // Then: キーボードイベントが処理される
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("is accessible by default", () => {
      // Given: 基本的なBadge
      testContainer.render(<Badge>19</Badge>);

      // When: 要素を確認
      const badge = testContainer.querySelector("div");

      // Then: アクセシブルな状態である
      expect(badge).toBeTruthy();
      expect(badge.getAttribute("aria-hidden")).toBe(null);
    });

    it("supports custom ARIA attributes", () => {
      // Given: カスタムARIA属性付きのBadge
      const ariaLabel = "Notification count";
      testContainer.render(<Badge aria-label={ariaLabel}>20</Badge>);

      // When: ARIA属性を確認
      const badge = testContainer.querySelector("div");

      // Then: カスタムARIA属性が適用される
      expect(badge.getAttribute("aria-label")).toBe(ariaLabel);
    });

    it("provides semantic meaning with role", () => {
      // Given: role属性付きのBadge
      testContainer.render(<Badge role="status">21</Badge>);

      // When: role属性を確認
      const badge = testContainer.querySelector("div");

      // Then: 適切なroleが設定される
      expect(badge.getAttribute("role")).toBe("status");
    });

    it("supports aria-live for dynamic content", () => {
      // Given: aria-live属性付きのBadge
      testContainer.render(<Badge aria-live="polite">22</Badge>);

      // When: aria-live属性を確認
      const badge = testContainer.querySelector("div");

      // Then: aria-live属性が設定される
      expect(badge.getAttribute("aria-live")).toBe("polite");
    });

    it("has proper focus styles", () => {
      // Given: フォーカス可能なBadge
      testContainer.render(<Badge tabIndex={0}>23</Badge>);

      // When: フォーカススタイルを確認
      const badge = testContainer.querySelector("div");

      // Then: フォーカススタイルが適用される
      expect(badge.className).toContain("focus:outline-hidden");
      expect(badge.className).toContain("focus:ring-2");
      expect(badge.className).toContain("focus:ring-ring");
      expect(badge.className).toContain("focus:ring-offset-2");
    });
  });

  describe("Custom Properties", () => {
    it("forwards DOM attributes", () => {
      // Given: カスタム属性付きのBadge
      const testId = "custom-badge-id";
      testContainer.render(
        <Badge data-testid={testId} title="Notification badge">
          24
        </Badge>
      );

      // When: 属性を確認
      const badge = testContainer.querySelector("div");

      // Then: DOM属性が転送される
      expect(badge.getAttribute("data-testid")).toBe(testId);
      expect(badge.getAttribute("title")).toBe("Notification badge");
    });

    it("supports custom className", () => {
      // Given: カスタムクラス付きのBadge
      const customClass = "my-custom-badge-class";
      testContainer.render(<Badge className={customClass}>25</Badge>);

      // When: クラス名を確認
      const badge = testContainer.querySelector("div");

      // Then: カスタムクラスが追加される
      expect(badge.className).toContain(customClass);
    });

    it("supports custom id and data attributes", () => {
      // Given: カスタムid属性付きのBadge
      const customId = "badge-26";
      testContainer.render(
        <Badge id={customId} data-value="26">
          26
        </Badge>
      );

      // When: 属性を確認
      const badge = testContainer.querySelector("div");

      // Then: 属性が正しく設定される
      expect(badge.getAttribute("id")).toBe(customId);
      expect(badge.getAttribute("data-value")).toBe("26");
    });
  });

  describe("Edge Cases", () => {
    it("handles zero value properly", () => {
      // Given: 値が0のBadge
      testContainer.render(<Badge>0</Badge>);

      // When: コンテンツを確認
      const badge = testContainer.querySelector("div");

      // Then: 0が正常に表示される
      expect(badge.textContent).toBe("0");
    });

    it("handles large numbers", () => {
      // Given: 大きな数値のBadge
      testContainer.render(<Badge>9999+</Badge>);

      // When: コンテンツを確認
      const badge = testContainer.querySelector("div");

      // Then: 大きな数値が正常に表示される
      expect(badge.textContent).toBe("9999+");
    });

    it("handles non-numeric content", () => {
      // Given: 非数値コンテンツのBadge
      testContainer.render(<Badge>NEW</Badge>);

      // When: コンテンツを確認
      const badge = testContainer.querySelector("div");

      // Then: 非数値コンテンツが正常に表示される
      expect(badge.textContent).toBe("NEW");
    });

    it("handles complex children", () => {
      // Given: 複雑なchildrenのBadge
      testContainer.render(
        <Badge>
          <span data-testid="icon">!</span>
          <span data-testid="text">Alert</span>
        </Badge>
      );

      // When: 子要素を確認
      const icon = testContainer.querySelector('[data-testid="icon"]');
      const text = testContainer.querySelector('[data-testid="text"]');

      // Then: 複雑な構造も正常に描画される
      expect(icon).toBeTruthy();
      expect(text).toBeTruthy();
      expect(icon.textContent).toBe("!");
      expect(text.textContent).toBe("Alert");
    });
  });

  describe("Style Integration", () => {
    it("maintains consistency across different size and status combinations", () => {
      // Given: 異なるサイズとステータスの組み合わせ
      const combinations = [
        { size: "x2s" as const, status: "info" as const },
        { size: "xs" as const, status: "success" as const },
        { size: "sm" as const, status: "negative" as const },
        { size: "md" as const, status: "info" as const },
      ];

      combinations.forEach(({ size, status }) => {
        // When: 特定の組み合わせを描画
        testContainer.render(
          <Badge size={size} status={status}>
            27
          </Badge>
        );

        // Then: 基本スタイルが一貫して適用される
        const badge = testContainer.querySelector("div");
        expect(badge.className).toContain("inline-flex");
        expect(badge.className).toContain("items-center");
        expect(badge.className).toContain("text-white");
        expect(badge.className).toContain("rounded-full");

        // Clean up for next iteration
        testContainer.cleanup();
        testContainer.setup();
      });
    });

    it("applies proper typography for each size", () => {
      // Given: タイポグラフィが指定される各サイズ
      const typographySizes = [
        { size: "x2s" as const, expectedClass: "character-1-bold-mono" },
        { size: "xs" as const, expectedClass: "character-1-bold-mono" },
        { size: "sm" as const, expectedClass: "character-2-bold-mono" },
        { size: "md" as const, expectedClass: "character-3-bold-mono" },
      ];

      typographySizes.forEach(({ size, expectedClass }) => {
        // When: 特定サイズのBadgeを描画
        testContainer.render(<Badge size={size}>28</Badge>);

        // Then: 適切なタイポグラフィクラスが適用される
        const badge = testContainer.querySelector("div");
        expect(badge.className).toContain(expectedClass);

        // Clean up for next iteration
        testContainer.cleanup();
        testContainer.setup();
      });
    });
  });

  describe("Integration Tests", () => {
    it("works well in notification contexts", () => {
      // Given: 通知コンテキスト内のBadge
      testContainer.render(
        <div>
          <span>Messages</span>
          <Badge status="info">5</Badge>
          <span>Alerts</span>
          <Badge status="negative">2</Badge>
        </div>
      );

      // When: 通知バッジを確認
      const infoBadge = testContainer.querySelector(
        "div[class*='bg-info-500']"
      );
      const negativeBadge = testContainer.querySelector(
        "div[class*='bg-negative-500']"
      );

      // Then: 通知コンテキストで正常に機能する
      expect(infoBadge).toBeTruthy();
      expect(negativeBadge).toBeTruthy();
      expect(infoBadge.textContent).toBe("5");
      expect(negativeBadge.textContent).toBe("2");
    });

    it("maintains performance with multiple badges", () => {
      // Given: 複数のBadge要素
      const manyBadges = Array.from({ length: 20 }, (_, i) => (
        <Badge
          key={i}
          status={i % 3 === 0 ? "info" : i % 3 === 1 ? "success" : "negative"}
        >
          {i + 1}
        </Badge>
      ));

      // When: 複数のバッジを描画
      const startTime = performance.now();
      testContainer.render(<div>{manyBadges}</div>);
      const endTime = performance.now();

      // Then: パフォーマンスが適切である
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(30); // 30ms以下

      // And: バッジが正常に描画される
      const container = testContainer.querySelector("div");
      expect(container).toBeTruthy();
      expect(container.children.length).toBe(20);
    });

    it("integrates well with icon components", () => {
      // Given: アイコンと組み合わせたBadge
      testContainer.render(
        <div>
          <span data-testid="icon">🔔</span>
          <Badge size="xs" status="negative">
            3
          </Badge>
        </div>
      );

      // When: アイコンとバッジの統合を確認
      const icon = testContainer.querySelector('[data-testid="icon"]');
      const container = testContainer.getContainer();

      // Then: アイコンと正しく統合される
      expect(icon).toBeTruthy();
      expect(icon?.textContent).toBe("🔔");
      // badgeコンポーネント自体が含む要素（親div内の全体）を確認
      expect(container.textContent).toContain("🔔");
      expect(container.textContent).toContain("3");
    });
  });
});
