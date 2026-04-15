/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Link } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Link", () => {
  describe("Basic Rendering", () => {
    it("renders a basic link", () => {
      // Given: 基本的なLink
      testContainer.render(<Link href="/test">テストリンク</Link>);

      // When: a要素を確認
      const link = testContainer.querySelector("a");

      // Then: 正常に描画される
      expect(link).toBeDefined();
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe("/test");
    });

    it("renders children text correctly", () => {
      // Given: テキスト付きのLink
      testContainer.render(<Link href="/page">ページへ移動</Link>);

      // When: span要素のテキストを確認
      const span = testContainer.querySelector("span");

      // Then: 子要素のテキストが表示される
      expect(span.textContent).toBe("ページへ移動");
    });

    it("applies default styles correctly", () => {
      // Given: デフォルトのLink
      testContainer.render(<Link href="/default">デフォルト</Link>);

      // When: スタイルクラスを確認
      const link = testContainer.querySelector("a");
      const span = testContainer.querySelector("span");

      // Then: デフォルトスタイルが適用される
      expect(link.className).toContain("inline");
      expect(link.className).toContain("group");
      expect(link.className).toContain("character-3-regular-pro");
      expect(span.className).toContain("text-info-500");
      expect(span.className).toContain("group-hover:text-info-600");
    });
  });

  describe("Underline Styling", () => {
    it("applies underline styling by default", () => {
      // Given: デフォルトのLink
      testContainer.render(<Link href="/test">テスト</Link>);

      // When: span要素のクラス名を確認
      const span = testContainer.querySelector("span");

      // Then: 常にアンダーラインスタイルが適用される
      expect(span.className).toContain("underline");
      expect(span.className).toContain("decoration-current");
      expect(span.className).toContain("underline-offset-2");
    });

    it("maintains underline styling consistently", () => {
      // Given: 異なるhrefのLink
      testContainer.render(
        <Link href="https://example.com">新しいサイトへのリンク</Link>
      );

      // When: span要素のクラス名を確認
      const span = testContainer.querySelector("span");

      // Then: 一貫してアンダーラインスタイルが適用される
      expect(span.className).toContain("underline");
      expect(span.className).toContain("decoration-current");
      expect(span.className).toContain("underline-offset-2");
    });
  });

  describe("Open In New Window/Tab Feature", () => {
    it("does not show open in new icon by default", () => {
      // Given: isOpenInNew未指定のLink
      testContainer.render(<Link href="/internal">同じタブで開く</Link>);

      // When: 新しいタブで開くアイコンを確認
      const link = testContainer.querySelector("a");
      const icon = link.querySelector("span[aria-hidden='true']");

      // Then: 新しいタブで開くアイコンが表示されない
      expect(icon).toBeNull();
    });

    it("shows open in new icon when isOpenInNew is true", () => {
      // Given: isOpenInNew=trueのLink
      testContainer.render(
        <Link href="https://example.com" isOpenInNew={true}>
          新しいタブで開く
        </Link>
      );

      // When: 新しいタブで開くアイコンを確認
      const link = testContainer.querySelector("a");
      const icon = link.querySelector("span[aria-hidden='true']");

      // Then: 新しいタブで開くアイコンが表示される
      expect(icon).toBeDefined();
      expect(icon!.textContent).toBe("open_in_new");
      expect(icon!.className).toContain("ml-1");
      expect(icon!.className).toContain("align-middle");
      expect(icon!.className).toContain("inline-block");
      expect(icon!.className).toContain("text-info-500");
      expect(icon!.className).toContain("group-hover:text-info-600");
    });

    it("does not show open in new icon when isOpenInNew is false", () => {
      // Given: isOpenInNew=falseのLink
      testContainer.render(
        <Link href="/page" isOpenInNew={false}>
          同じタブで開く
        </Link>
      );

      // When: 新しいタブで開くアイコンを確認
      const link = testContainer.querySelector("a");
      const icon = link.querySelector("span[aria-hidden='true']");

      // Then: 新しいタブで開くアイコンが表示されない
      expect(icon).toBeNull();
    });
  });

  describe("Character Size Handling", () => {
    it("applies default character size when no character class is provided", () => {
      // Given: characterクラス未指定のLink
      testContainer.render(<Link href="/test">テスト</Link>);

      // When: a要素のクラス名を確認
      const link = testContainer.querySelector("a");

      // Then: デフォルトcharacterクラスが適用される
      expect(link.className).toContain("character-3-regular-pro");
    });

    it("does not override existing character class", () => {
      // Given: characterクラス指定済みのLink
      testContainer.render(
        <Link href="/test" className="character-5-bold-pro">
          大きなテキスト
        </Link>
      );

      // When: a要素のクラス名を確認
      const link = testContainer.querySelector("a");

      // Then: 既存のcharacterクラスが保持され、デフォルトが追加されない
      expect(link.className).toContain("character-5-bold-pro");
      expect(link.className).not.toContain("character-3-regular-pro");
    });

    it("sets correct icon size based on character class", () => {
      // Given: character-4付きで新しいタブで開くLink
      testContainer.render(
        <Link
          href="https://example.com"
          className="character-4-bold-pro"
          isOpenInNew={true}
        >
          大きなリンク
        </Link>
      );

      // When: アイコンのサイズを確認
      const link = testContainer.querySelector("a");
      const icon = link.querySelector("span[aria-hidden='true']");

      // Then: characterサイズに合わせたアイコンサイズが設定される
      expect(icon).toBeDefined();
      expect(icon!.className).toContain("icon-4");
    });

    it("uses default icon size when no character class is present", () => {
      // Given: characterクラス未指定で新しいタブで開くLink
      testContainer.render(
        <Link href="https://example.com" isOpenInNew={true}>
          新しいタブで開く
        </Link>
      );

      // When: アイコンのサイズを確認
      const link = testContainer.querySelector("a");
      const icon = link.querySelector("span[aria-hidden='true']");

      // Then: デフォルトアイコンサイズが設定される
      expect(icon).toBeDefined();
      expect(icon!.className).toContain("icon-3");
    });
  });

  describe("Event Handling", () => {
    it("handles click events properly", () => {
      // Given: clickハンドラー付きのLink
      const handleClick = vi.fn();
      testContainer.render(
        <Link href="/test" onClick={handleClick}>
          クリック可能
        </Link>
      );

      // When: リンクをクリック
      const link = testContainer.querySelector("a");
      EventHelpers.click(link);

      // Then: クリックハンドラーが呼ばれる
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("provides click event details", () => {
      // Given: イベント詳細をチェックするハンドラー
      const handleClick = vi.fn();
      testContainer.render(
        <Link href="/test" onClick={handleClick}>
          テストリンク
        </Link>
      );

      // When: リンクをクリック
      const link = testContainer.querySelector("a");
      EventHelpers.click(link);

      // Then: 正しいイベントオブジェクトが渡される
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0].type).toBe("click");
    });

    it("supports keyboard interaction", () => {
      // Given: キーボードイベントハンドラー付きのLink
      const handleKeyDown = vi.fn();
      testContainer.render(
        <Link href="/test" onKeyDown={handleKeyDown}>
          キーボード対応
        </Link>
      );

      // When: キーボードイベントを実行
      const link = testContainer.querySelector("a");
      EventHelpers.keyDown(link, "Enter");

      // Then: キーボードイベントが処理される
      expect(handleKeyDown).toHaveBeenCalledOnce();
    });
  });

  describe("Custom Properties", () => {
    it("forwards DOM attributes", () => {
      // Given: カスタム属性付きのLink
      const testId = "custom-link-id";
      testContainer.render(
        <Link
          href="/test"
          data-testid={testId}
          title="リンクの説明"
          target="_blank"
        >
          カスタムLink
        </Link>
      );

      // When: 属性を確認
      const link = testContainer.querySelector("a");

      // Then: DOM属性が転送される
      expect(link.getAttribute("data-testid")).toBe(testId);
      expect(link.getAttribute("title")).toBe("リンクの説明");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("href")).toBe("/test");
    });

    it("supports custom className", () => {
      // Given: カスタムクラス付きのLink
      const customClass = "my-custom-link-class";
      testContainer.render(
        <Link href="/test" className={customClass}>
          カスタムスタイル
        </Link>
      );

      // When: クラス名を確認
      const link = testContainer.querySelector("a");

      // Then: カスタムクラスが追加される
      expect(link.className).toContain(customClass);
      // デフォルトクラスも保持される
      expect(link.className).toContain("inline");
      expect(link.className).toContain("group");
    });

    it("supports custom id and data attributes", () => {
      // Given: カスタムid属性付きのLink
      const customId = "link-123";
      testContainer.render(
        <Link href="/test" id={customId} data-value="test-link">
          ID付きLink
        </Link>
      );

      // When: 属性を確認
      const link = testContainer.querySelector("a");

      // Then: 属性が正しく設定される
      expect(link.getAttribute("id")).toBe(customId);
      expect(link.getAttribute("data-value")).toBe("test-link");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      // Given: ref付きのLink
      const ref = React.createRef<HTMLAnchorElement>();
      testContainer.render(
        <Link href="/test" ref={ref}>
          Ref付きLink
        </Link>
      );

      // When: refの値を確認
      const link = testContainer.querySelector("a");

      // Then: refが正しく設定される
      expect(ref.current).toBe(link);
    });

    it("allows ref access to element properties", () => {
      // Given: ref付きのLink
      const ref = React.createRef<HTMLAnchorElement>();
      testContainer.render(
        <Link href="/test" ref={ref} data-testid="ref-test">
          Refテスト
        </Link>
      );

      // When: refを通じて要素にアクセス
      const refElement = ref.current;
      const queryElement = testContainer.querySelector(
        "[data-testid='ref-test']"
      );

      // Then: 同じ要素を参照している
      expect(refElement).toBe(queryElement);
      expect(refElement!.tagName).toBe("A");
      expect(refElement!.href).toContain("/test");
    });
  });

  describe("Complex Children", () => {
    it("handles text children", () => {
      // Given: テキスト子要素のLink
      testContainer.render(<Link href="/text">シンプルテキスト</Link>);

      // When: テキストを確認
      const span = testContainer.querySelector("span");

      // Then: テキストが正しく表示される
      expect(span.textContent).toBe("シンプルテキスト");
    });

    it("handles complex JSX children", () => {
      // Given: 複雑なJSX子要素のLink
      testContainer.render(
        <Link href="/complex">
          <strong>重要な</strong>
          <em>リンク</em>
        </Link>
      );

      // When: 子要素を確認
      const span = testContainer.querySelector("span");
      const strong = span.querySelector("strong");
      const em = span.querySelector("em");

      // Then: 複雑な構造も正常に描画される
      expect(strong).toBeDefined();
      expect(em).toBeDefined();
      expect(strong!.textContent).toBe("重要な");
      expect(em!.textContent).toBe("リンク");
    });

    it("handles mixed content children", () => {
      // Given: 混合コンテンツ子要素のLink
      testContainer.render(
        <Link href="/mixed">
          前のテキスト <span data-testid="inner-span">中間</span> 後のテキスト
        </Link>
      );

      // When: 子要素を確認
      const innerSpan = testContainer.queryByTestId("inner-span");

      // Then: 混合コンテンツが正常に表示される
      expect(innerSpan).toBeDefined();
      expect(innerSpan.textContent).toBe("中間");
    });
  });

  describe("Accessibility", () => {
    it("maintains accessibility for screen readers", () => {
      // Given: accessibility属性付きのLink
      testContainer.render(
        <Link href="/accessible" aria-label="詳細ページへ移動" role="link">
          詳細
        </Link>
      );

      // When: accessibility属性を確認
      const link = testContainer.querySelector("a");

      // Then: accessibility属性が設定される
      expect(link.getAttribute("aria-label")).toBe("詳細ページへ移動");
      expect(link.getAttribute("role")).toBe("link");
    });

    it("handles new tab/window links accessibility", () => {
      // Given: 新しいタブで開くリンクのaccessibility
      testContainer.render(
        <Link
          href="https://example.com"
          isOpenInNew={true}
          aria-label="新しいタブでサイトを開く"
          target="_blank"
          rel="noopener noreferrer"
        >
          新しいタブで開く
        </Link>
      );

      // When: 属性を確認
      const link = testContainer.querySelector("a");

      // Then: 新しいタブで開くリンクのaccessibility属性が設定される
      expect(link.getAttribute("aria-label")).toBe("新しいタブでサイトを開く");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty href", () => {
      // Given: 空のhrefのLink
      expect(() => {
        testContainer.render(<Link href="">空のリンク</Link>);
      }).not.toThrow();

      // When: href属性を確認
      const link = testContainer.querySelector("a");

      // Then: 空のhrefが設定される
      expect(link.getAttribute("href")).toBe("");
    });

    it("handles missing href", () => {
      // Given: href未指定のLink
      expect(() => {
        testContainer.render(<Link>hrefなしリンク</Link>);
      }).not.toThrow();
    });

    it("handles very long text content", () => {
      // Given: 非常に長いテキストのLink
      const longText =
        "これは非常に長いリンクテキストで、実際のアプリケーションでは稀ですが、テストとして動作を確認します。" +
        "x".repeat(100);
      testContainer.render(<Link href="/long">{longText}</Link>);

      // When: テキストを確認
      const span = testContainer.querySelector("span");

      // Then: 長いテキストも正常に表示される
      expect(span.textContent).toBe(longText);
    });

    it("handles null children gracefully", () => {
      // Given: null children
      expect(() => {
        testContainer.render(<Link href="/null">{null}</Link>);
      }).not.toThrow();
    });
  });

  describe("Style Integration", () => {
    it("maintains consistency across different combinations", () => {
      // Given: 異なる組み合わせのLink
      const combinations = [{ isOpenInNew: false }, { isOpenInNew: true }];

      combinations.forEach(({ isOpenInNew }, index) => {
        // When: 特定の組み合わせを描画
        testContainer.render(
          <Link
            href="/test"
            isOpenInNew={isOpenInNew}
            data-testid={`combo-${index}`}
          >
            組み合わせ{index}
          </Link>
        );

        // Then: 基本スタイルが一貫して適用される
        const link = testContainer.queryByTestId(`combo-${index}`);
        expect(link.className).toContain("inline");
        expect(link.className).toContain("group");

        // Clean up for next iteration
        testContainer.cleanup();
        testContainer.setup();
      });
    });

    it("works with StyleHelpers", () => {
      // Given: 特定スタイルのLink
      testContainer.render(
        <Link href="/style" className="custom-style">
          スタイルテスト
        </Link>
      );

      // When: StyleHelpersでクラスを確認
      const link = testContainer.querySelector("a");

      // Then: StyleHelpersが正しく動作する
      expect(StyleHelpers.hasClass(link, "inline")).toBe(true);
      expect(StyleHelpers.hasClass(link, "group")).toBe(true);
      expect(StyleHelpers.hasClass(link, "custom-style")).toBe(true);
      expect(StyleHelpers.hasClass(link, "nonexistent-class")).toBe(false);
    });
  });

  describe("Performance", () => {
    // 時間ベースのアサーションは CI 負荷で flaky のため skip
    // en: Skip time-based performance assertion; flaky on loaded CI runners
    it.skip("renders multiple links efficiently", () => {
      // Given: 複数のLink要素
      const manyLinks = Array.from({ length: 30 }, (_, i) => (
        <Link
          key={i}
          href={`/link-${i}`}
          isOpenInNew={i % 2 === 0}
          data-testid={`link-${i}`}
        >
          リンク{i + 1}
        </Link>
      ));

      // When: 複数のリンクを描画
      const startTime = performance.now();
      testContainer.render(<div>{manyLinks}</div>);
      const endTime = performance.now();

      // Then: パフォーマンスが適切である
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(30); // 30ms以下

      // And: リンクが正常に描画される
      const firstLink = testContainer.queryByTestId("link-0");
      const lastLink = testContainer.queryByTestId("link-29");
      expect(firstLink).toBeDefined();
      expect(lastLink).toBeDefined();
    });
  });

  describe("asChild", () => {
    it("renders child element as root when asChild is true", () => {
      // Given: asChild で span を渡す
      testContainer.render(
        <Link asChild>
          <span data-testid="custom-link">カスタムリンク</span>
        </Link>,
      );

      // Then: span がルート要素になる
      const customLink = testContainer.queryByTestId("custom-link");
      expect(customLink).toBeDefined();
      expect(customLink?.tagName).toBe("SPAN");
      expect(customLink?.className).toContain("inline");
      expect(customLink?.className).toContain("group");
    });

    it("passes className to child element when asChild is true", () => {
      // Given: asChild + className
      testContainer.render(
        <Link asChild className="character-2-regular-pro">
          <span data-testid="styled-link">テスト</span>
        </Link>,
      );

      // Then: className が子要素に反映される
      const styledLink = testContainer.queryByTestId("styled-link");
      expect(styledLink?.className).toContain("character-2-regular-pro");
    });

    it("renders isOpenInNew icon when asChild is true", () => {
      // Given: asChild + isOpenInNew
      testContainer.render(
        <Link asChild isOpenInNew>
          <a href="https://example.com" data-testid="external-child">
            外部リンク
          </a>
        </Link>,
      );

      // Then: open_in_new アイコンが表示される
      const externalLink = testContainer.queryByTestId("external-child");
      expect(externalLink).toBeDefined();
      expect(externalLink?.innerHTML).toContain("open_in_new");
    });

    it("renders as normal <a> when asChild is false", () => {
      // Given: asChild なし（デフォルト）
      testContainer.render(
        <Link href="/test" data-testid="normal-link">
          通常リンク
        </Link>,
      );

      // Then: <a> タグとしてレンダリング
      const normalLink = testContainer.queryByTestId("normal-link");
      expect(normalLink).toBeDefined();
      expect(normalLink?.tagName).toBe("A");
    });
  });
});
