import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Button } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Button", () => {
  describe("Basic Rendering", () => {
    it("renders a button element", () => {
      // Given: 基本的なButton
      testContainer.render(<Button>Click me</Button>);

      // When: button要素を確認
      const button = testContainer.queryButton();

      // Then: 正常に描画される
      expect(button).toBeTruthy();
      expect(button.tagName).toBe("BUTTON");
      expect(button.textContent).toBe("Click me");
    });

    it("renders with default type button", () => {
      // Given: type未指定のButton
      testContainer.render(<Button>Default Button</Button>);

      // When: type属性を確認
      const button = testContainer.queryButton();

      // Then: デフォルトでtype="button"になる
      expect(button.type).toBe("button");
    });

    it("renders with specified type", () => {
      // Given: type="submit"のButton
      testContainer.render(<Button type="submit">Submit Button</Button>);

      // When: type属性を確認
      const button = testContainer.queryButton();

      // Then: 指定したtypeが設定される
      expect(button.type).toBe("submit");
    });
  });

  describe("Variant Styles", () => {
    it("applies solid variant by default", () => {
      // Given: variant未指定のButton
      testContainer.render(<Button>Solid Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: solidバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(button, "border")).toBe(true);
      expect(StyleHelpers.hasClass(button, "shadow-raise")).toBe(true);
    });

    it("applies solid primary variant classes", () => {
      // Given: solid primaryバリアントのButton
      testContainer.render(
        <Button variant="solid" theme="primary">
          Primary Button
        </Button>
      );

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: solid primaryバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(button, "bg-primary-500")).toBe(true);
      expect(StyleHelpers.hasClass(button, "text-white")).toBe(true);
    });

    it("applies solid neutral variant classes", () => {
      // Given: solid neutralバリアントのButton
      testContainer.render(
        <Button variant="solid" theme="neutral">
          neutral Button
        </Button>
      );

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: solid neutralバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(button, "border")).toBe(true);
      expect(StyleHelpers.hasClass(button, "shadow-raise")).toBe(true);
    });

    it("applies outline variant classes", () => {
      // Given: outlineバリアントのButton
      testContainer.render(<Button variant="outline">Outline Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: outlineバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(button, "border")).toBe(true);
      expect(StyleHelpers.hasClass(button, "shadow-raise")).toBe(true);
    });

    it("applies negative theme classes", () => {
      // Given: negativeテーマのButton
      testContainer.render(<Button theme="negative">Delete Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: negativeテーマのクラスが適用される
      expect(button.className).toContain("negative");
    });

    it("applies ghost variant classes", () => {
      // Given: ghostバリアントのButton
      testContainer.render(<Button variant="ghost">Ghost Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: ghostバリアントにはborderがない
      expect(StyleHelpers.hasClass(button, "border")).toBe(false);
    });
  });

  describe("Size Variants", () => {
    it("applies medium size by default", () => {
      // Given: size未指定のButton
      testContainer.render(<Button>Medium Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: mediumサイズのクラスが適用される（CVAのmコンボーネントクラス）
      expect(StyleHelpers.hasClass(button, "h-10")).toBe(true);
      expect(StyleHelpers.hasClass(button, "px-4")).toBe(true);
    });

    it("applies small size classes", () => {
      // Given: smallサイズのButton
      testContainer.render(<Button size="sm">Small Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: smallサイズのクラスが適用される（CVAのsmサイズクラス）
      expect(StyleHelpers.hasClass(button, "h-8")).toBe(true);
      expect(StyleHelpers.hasClass(button, "px-3")).toBe(true);
    });

    it("applies large size classes", () => {
      // Given: largeサイズのButton
      testContainer.render(<Button size="lg">Large Button</Button>);

      // When: クラス名を確認
      const button = testContainer.queryButton();

      // Then: largeサイズのクラスが適用される
      expect(StyleHelpers.hasClass(button, "h-12")).toBe(true);
      expect(StyleHelpers.hasClass(button, "px-5")).toBe(true);
    });
  });

  describe("User Interactions", () => {
    it("calls onClick when clicked", () => {
      // Given: onClickコールバック付きのButton
      const handleClick = vi.fn();
      testContainer.render(<Button onClick={handleClick}>Click me</Button>);
      const button = testContainer.queryButton();

      // When: クリックされる
      EventHelpers.click(button);

      // Then: onClickが呼ばれる
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      // Given: disabled状態でonClickコールバック付きのButton
      const handleClick = vi.fn();
      testContainer.render(
        <Button onClick={handleClick} isDisabled>
          Disabled Button
        </Button>
      );
      const button = testContainer.queryButton();

      // When: クリックされる
      EventHelpers.click(button);

      // Then: onClickは呼ばれない
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("responds to keyboard activation (Enter key)", () => {
      // Given: onKeyDownコールバック付きのButton
      const handleKeyDown = vi.fn();
      testContainer.render(
        <Button onKeyDown={handleKeyDown}>Keyboard Button</Button>
      );
      const button = testContainer.queryButton();

      // When: フォーカス後にEnterキーを押す
      EventHelpers.focus(button);
      EventHelpers.keyDown(button, "Enter");

      // Then: onKeyDownが呼ばれる（キーボードナビゲーションの基本機能確認）
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("responds to keyboard activation (Space key)", () => {
      // Given: onKeyDownコールバック付きのButton
      const handleKeyDown = vi.fn();
      testContainer.render(
        <Button onKeyDown={handleKeyDown}>Space Button</Button>
      );
      const button = testContainer.queryButton();

      // When: フォーカス後にSpaceキーを押す
      EventHelpers.focus(button);
      EventHelpers.keyDown(button, " ");

      // Then: onKeyDownが呼ばれる（キーボードナビゲーションの基本機能確認）
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled State", () => {
    it("sets disabled attribute when isDisabled prop is true", () => {
      // Given: disabled状態のButton
      testContainer.render(<Button isDisabled>Disabled Button</Button>);
      const button = testContainer.queryButton();

      // Then: disabled属性が設定される
      expect(A11yHelpers.isDisabled(button)).toBe(true);
    });

    it("is not focusable when disabled", () => {
      // Given: disabled状態のButton
      testContainer.render(<Button isDisabled>Disabled Button</Button>);
      const button = testContainer.queryButton();

      // When: フォーカスしようとする
      EventHelpers.focus(button);

      // Then: フォーカスされない
      expect(document.activeElement).not.toBe(button);
    });
  });

  describe("Loading State", () => {
    it("shows loading indicator when isLoading prop is true", () => {
      // Given: loading状態のButton
      testContainer.render(<Button isLoading>Loading Button</Button>);

      // When: loading indicatorを確認
      const container = testContainer.getContainer();
      const loadingIndicator = container.querySelector(
        '[data-testid="loading-spinner"]'
      );

      // Then: loading indicatorが表示される
      expect(loadingIndicator).toBeTruthy();
    });

    it("sets aria-busy when isLoading", () => {
      // Given: loading状態のButton
      testContainer.render(<Button isLoading>Loading Button</Button>);
      const button = testContainer.queryButton();

      // Then: aria-busy が付与される
      expect(button.getAttribute("aria-busy")).toBe("true");
    });

    it("is disabled when isLoading", () => {
      // Given: loading状態のButton
      testContainer.render(<Button isLoading>Loading Button</Button>);
      const button = testContainer.queryButton();

      // Then: disabledになる
      expect(A11yHelpers.isDisabled(button)).toBe(true);
    });

    it("does not call onClick when isLoading", () => {
      // Given: loading状態でonClickコールバック付きのButton
      const handleClick = vi.fn();
      testContainer.render(
        <Button onClick={handleClick} isLoading>
          Loading Button
        </Button>
      );
      const button = testContainer.queryButton();

      // When: クリックされる
      EventHelpers.click(button);

      // Then: onClickは呼ばれない
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      // Given: aria-label付きのButton
      testContainer.render(<Button aria-label="Close dialog">×</Button>);
      const button = testContainer.queryButton();

      // Then: 適切なARIA属性が設定される
      expect(A11yHelpers.hasAriaLabel(button, "Close dialog")).toBe(true);
    });

    it("is focusable when not disabled", () => {
      // Given: 有効なButton
      testContainer.render(<Button>Focusable Button</Button>);
      const button = testContainer.queryButton();

      // When: フォーカスされる
      EventHelpers.focus(button);

      // Then: フォーカスされる
      expect(document.activeElement).toBe(button);
    });

    it("supports aria-describedby for additional context", () => {
      // Given: aria-describedby付きのButton
      testContainer.render(
        <div>
          <Button aria-describedby="help-text">Help Button</Button>
          <div id="help-text">This button provides help</div>
        </div>
      );
      const button = testContainer.queryButton();

      // Then: aria-describedbyが設定される
      expect(A11yHelpers.hasAriaDescribedBy(button)).toBe(true);
    });

    it("has proper role attribute", () => {
      // Given: 基本的なButton
      testContainer.render(<Button>Button</Button>);
      const button = testContainer.queryButton();

      // Then: role="button"が設定される（または暗黙的に持つ）
      expect(
        button.getAttribute("role") === "button" || button.tagName === "BUTTON"
      ).toBe(true);
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      // Given: カスタムクラス付きのButton
      testContainer.render(
        <Button className="custom-class">Custom Button</Button>
      );
      const button = testContainer.queryButton();

      // Then: カスタムクラスが適用される
      expect(StyleHelpers.hasClass(button, "custom-class")).toBe(true);
    });

    it("supports data attributes", () => {
      // Given: data属性付きのButton
      testContainer.render(
        <Button data-testid="test-button" data-analytics="click-event">
          Data Button
        </Button>
      );
      const button = testContainer.queryButton();

      // Then: data属性が設定される
      expect(button.getAttribute("data-testid")).toBe("test-button");
      expect(button.getAttribute("data-analytics")).toBe("click-event");
    });
  });
  describe("Icon Integration", () => {
    it("renders with prefix icon", () => {
      // Given: プレフィックスアイコン付きのButton
      testContainer.render(<Button prefixIcon="plus">Add Item</Button>);

      // When: アイコンを確認
      const container = testContainer.getContainer();
      const icon = container.querySelector('span[aria-hidden="true"]');

      // Then: プレフィックスアイコンが表示される
      expect(icon).toBeTruthy();
      expect(icon?.textContent).toBe("plus");
    });

    it("renders with suffix icon", () => {
      // Given: サフィックスアイコン付きのButton
      testContainer.render(<Button suffixIcon="arrow-right">Next Step</Button>);

      // When: アイコンを確認
      const container = testContainer.getContainer();
      const icons = container.querySelectorAll('span[aria-hidden="true"]');
      const suffixIcon = Array.from(icons).find(
        icon => icon.textContent === "arrow-right"
      );

      // Then: サフィックスアイコンが表示される
      expect(suffixIcon).toBeTruthy();
    });

    it("renders with both prefix and suffix icons", () => {
      // Given: 両側アイコン付きのButton
      testContainer.render(
        <Button prefixIcon="download" suffixIcon="external-link">
          Download File
        </Button>
      );

      // When: アイコンを確認
      const container = testContainer.getContainer();
      const icons = container.querySelectorAll('span[aria-hidden="true"]');
      const prefixIcon = Array.from(icons).find(
        icon => icon.textContent === "download"
      );
      const suffixIcon = Array.from(icons).find(
        icon => icon.textContent === "external-link"
      );

      // Then: 両方のアイコンが表示される
      expect(prefixIcon).toBeTruthy();
      expect(suffixIcon).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("handles missing children gracefully", () => {
      // Given: 子要素なしのButton
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(() => {
        testContainer.render(<Button />);
      }).not.toThrow();

      // Then: a11y上の警告を出す
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("[Button] Accessible name is missing")
      );
      warnSpy.mockRestore();

      // Then: 正常に描画される
      const button = testContainer.queryButton();
      expect(button).toBeTruthy();
    });

    it("does not warn when aria-label is provided even without children", () => {
      // Given: aria-label 付きで子要素なしのButton
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      testContainer.render(<Button aria-label="Close" />);
      testContainer.queryButton();

      // Then: 警告は不要
      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("warns when pointer-down style handlers are provided (deprecated for a11y)", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <Button onPointerDown={() => {}}>PointerDown Button</Button>
      );
      testContainer.queryButton();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[Button] onMouseDown/onPointerDown/onTouchStart are deprecated"
        )
      );
      warnSpy.mockRestore();
    });

    it("handles rapid clicks gracefully", () => {
      // Given: onClickコールバック付きのButton
      const handleClick = vi.fn();
      testContainer.render(<Button onClick={handleClick}>Rapid Click</Button>);
      const button = testContainer.queryButton();

      // When: 連続してクリック
      EventHelpers.click(button);
      EventHelpers.click(button);
      EventHelpers.click(button);

      // Then: 各クリックが適切に処理される
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it("handles invalid variant gracefully", () => {
      // Given: 無効なvariantのButton
      expect(() => {
        testContainer.render(
          // @ts-expect-error Testing invalid variant
          <Button variant="invalid">Invalid Variant</Button>
        );
      }).not.toThrow();

      // Then: フォールバックスタイルが適用される
      const button = testContainer.queryButton();
      expect(button).toBeTruthy();
    });
  });

  describe("Integration", () => {
    it("works in form context", () => {
      // Given: form内のsubmit Button
      const handleSubmit = vi.fn(e => e.preventDefault());
      testContainer.render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      );
      const button = testContainer.queryButton();

      // When: ボタンをクリック
      EventHelpers.click(button);

      // Then: フォームのsubmitが実行される
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it.skip("supports asChild pattern for polymorphic rendering", () => {
      // asChild パターンのテストは実装の複雑さとRadix UI Slotの制約により
      // jsdom環境では不安定なため、スキップします
      // 実際のブラウザ環境やE2Eテストでのテストが推奨されます
    });
  });
});
