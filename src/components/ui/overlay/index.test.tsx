/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Overlay } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Overlay", () => {
  describe("Basic Rendering", () => {
    it("renders an overlay element", () => {
      // Given: 基本的なOverlay
      testContainer.render(<Overlay />);

      // When: overlay要素を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 正常に描画される
      expect(overlay).toBeTruthy();
    });

    it("applies base styles correctly", () => {
      // Given: 基本的なOverlay
      testContainer.render(<Overlay />);

      // When: スタイルクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 基本スタイルが適用される
      expect(overlay.className).toContain("fixed");
      expect(overlay.className).toContain("inset-0");
      expect(overlay.className).toContain("bg-[var(--color-black-alpha-300)]");
    });

    it("renders as a div element", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: 要素のタイプを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: div要素として描画される
      expect(overlay.tagName).toBe("DIV");
    });

    it("sets data-slot attribute correctly", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: data-slot属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 正しいdata-slot値が設定される
      expect(overlay.getAttribute("data-slot")).toBe("overlay");
    });
  });

  describe("Animation Classes", () => {
    it("includes animation classes for open state", () => {
      // Given: data-state="open"のOverlay
      testContainer.render(<Overlay data-state="open" />);

      // When: アニメーションクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: オープン時のアニメーションクラスが含まれる
      expect(overlay.className).toContain("data-[state=open]:animate-in");
      expect(overlay.className).toContain("data-[state=open]:fade-in-0");
    });

    it("includes animation classes for closed state", () => {
      // Given: data-state="closed"のOverlay
      testContainer.render(<Overlay data-state="closed" />);

      // When: アニメーションクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: クローズ時のアニメーションクラスが含まれる
      expect(overlay.className).toContain("data-[state=closed]:animate-out");
      expect(overlay.className).toContain("data-[state=closed]:fade-out-0");
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      // Given: カスタムclassName付きのOverlay
      const customClass = "custom-overlay-class";
      testContainer.render(<Overlay className={customClass} />);

      // When: classを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: カスタムclassが追加される
      expect(overlay.className).toContain(customClass);
    });

    it("preserves base classes when custom className is applied", () => {
      // Given: カスタムclassName付きのOverlay
      testContainer.render(<Overlay className="custom-class" />);

      // When: classを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 基本クラスも保持される
      expect(overlay.className).toContain("fixed");
      expect(overlay.className).toContain("inset-0");
      expect(overlay.className).toContain("custom-class");
    });

    it("forwards additional HTML attributes", () => {
      // Given: 追加のHTML属性を持つOverlay
      testContainer.render(
        <Overlay data-testid="overlay-test" aria-hidden="true" />
      );

      // When: 属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 追加の属性が適用される
      expect(overlay.getAttribute("data-testid")).toBe("overlay-test");
      expect(overlay.getAttribute("aria-hidden")).toBe("true");
    });

    it("forwards id attribute", () => {
      // Given: id属性を持つOverlay
      testContainer.render(<Overlay id="custom-overlay-id" />);

      // When: id属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: id属性が適用される
      expect(overlay.id).toBe("custom-overlay-id");
    });

    it("forwards style prop", () => {
      // Given: style属性を持つOverlay
      const customStyle = { opacity: 0.5 };
      testContainer.render(<Overlay style={customStyle} />);

      // When: style属性を確認
      const overlay = testContainer.querySelector<HTMLDivElement>(
        '[data-slot="overlay"]'
      );

      // Then: style属性が適用される
      expect(overlay.style.opacity).toBe("0.5");
    });
  });

  describe("Event Handlers", () => {
    it("handles onClick event", () => {
      // Given: onClick付きのOverlay
      const handleClick = vi.fn();
      testContainer.render(<Overlay onClick={handleClick} />);

      // When: クリックイベントを発火
      const overlay = testContainer.querySelector('[data-slot="overlay"]');
      EventHelpers.click(overlay);

      // Then: クリックハンドラが呼ばれる
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles multiple click events", () => {
      // Given: onClick付きのOverlay
      const handleClick = vi.fn();
      testContainer.render(<Overlay onClick={handleClick} />);

      // When: 複数回クリック
      const overlay = testContainer.querySelector('[data-slot="overlay"]');
      EventHelpers.click(overlay);
      EventHelpers.click(overlay);

      // Then: クリックハンドラが各回呼ばれる
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("does not throw error without event handlers", () => {
      // Given: イベントハンドラなしのOverlay
      testContainer.render(<Overlay />);

      // When: クリックイベントを発火
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: エラーなく実行される
      expect(() => EventHelpers.click(overlay)).not.toThrow();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the div element", () => {
      // Given: ref付きのOverlay
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(<Overlay ref={ref} />);

      // When: refを確認
      // Then: refが正しく転送される
      expect(ref.current).toBeTruthy();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("allows ref to access DOM methods", () => {
      // Given: ref付きのOverlay
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(<Overlay ref={ref} />);

      // When: refを通じてDOM操作を実行
      const scrollTop = ref.current?.scrollTop;

      // Then: DOM APIにアクセスできる
      expect(scrollTop).toBeDefined();
    });
  });

  describe("Fixed Positioning", () => {
    it("covers full viewport with inset-0", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: スタイルクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: inset-0でフルビューポートをカバー
      expect(overlay.className).toContain("inset-0");
    });

    it("applies fixed positioning", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: スタイルクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: fixedポジショニングが適用される
      expect(overlay.className).toContain("fixed");
    });
  });

  describe("Background Styling", () => {
    it("applies semi-transparent background", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: 背景色クラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 半透明の背景色が適用される
      expect(overlay.className).toContain("bg-[var(--color-black-alpha-300)]");
    });
  });

  describe("Accessibility", () => {
    it("can be made accessible with aria-hidden", () => {
      // Given: aria-hidden付きのOverlay
      testContainer.render(<Overlay aria-hidden="true" />);

      // When: aria-hidden属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: aria-hidden属性が設定される
      expect(overlay.getAttribute("aria-hidden")).toBe("true");
    });

    it("can be made accessible with role attribute", () => {
      // Given: role属性付きのOverlay
      testContainer.render(<Overlay role="presentation" />);

      // When: role属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: role属性が設定される
      expect(overlay.getAttribute("role")).toBe("presentation");
    });

    it("can be labeled with aria-label", () => {
      // Given: aria-label付きのOverlay
      testContainer.render(<Overlay aria-label="モーダルオーバーレイ" />);

      // When: aria-label属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: aria-label属性が設定される
      expect(overlay.getAttribute("aria-label")).toBe("モーダルオーバーレイ");
    });
  });

  describe("Edge Cases", () => {
    it("handles no props gracefully", () => {
      // Given: プロップなしのOverlay
      testContainer.render(<Overlay />);

      // When: 要素を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: デフォルトのスタイルで正常に描画される
      expect(overlay).toBeTruthy();
      expect(overlay.className).toContain("fixed");
    });

    it("handles empty className prop", () => {
      // Given: 空のclassName付きのOverlay
      testContainer.render(<Overlay className="" />);

      // When: 要素を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 基本クラスは保持される
      expect(overlay).toBeTruthy();
      expect(overlay.className).toContain("fixed");
    });

    it("handles undefined className prop", () => {
      // Given: undefinedのclassName付きのOverlay
      testContainer.render(<Overlay className={undefined} />);

      // When: 要素を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 基本クラスは保持される
      expect(overlay).toBeTruthy();
      expect(overlay.className).toContain("fixed");
    });

    it("properly cleans up when unmounted", () => {
      // Given: マウントされたOverlay
      testContainer.render(<Overlay />);
      const overlay = testContainer.querySelector('[data-slot="overlay"]');
      expect(overlay).toBeTruthy();

      // When: アンマウント
      testContainer.cleanup();
      testContainer.setup();

      // Then: 以前の要素は存在しない
      const container = testContainer.getContainer();
      const overlayAfterCleanup = container.querySelector(
        '[data-slot="overlay"]'
      );
      expect(overlayAfterCleanup).toBeNull();
    });
  });

  describe("Integration", () => {
    it("can be used with children elements", () => {
      // Given: 子要素を持つOverlay
      testContainer.render(
        <Overlay>
          <div data-testid="child-element">Child Content</div>
        </Overlay>
      );

      // When: 子要素を確認
      const childElement = testContainer.querySelector(
        '[data-testid="child-element"]'
      );

      // Then: 子要素が正しくレンダリングされる
      expect(childElement).toBeTruthy();
      expect(childElement.textContent).toBe("Child Content");
    });

    it("can be nested within other components", () => {
      // Given: 他のコンポーネント内にネストされたOverlay
      testContainer.render(
        <div data-testid="parent">
          <Overlay />
        </div>
      );

      // When: 親要素とOverlayを確認
      const parent = testContainer.querySelector('[data-testid="parent"]');
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: 正しくネストされる
      expect(parent).toBeTruthy();
      expect(overlay).toBeTruthy();
    });

    it("can be used with multiple instances", () => {
      // Given: 複数のOverlayインスタンス
      testContainer.render(
        <>
          <Overlay className="overlay-1" />
          <Overlay className="overlay-2" />
          <Overlay className="overlay-3" />
        </>
      );

      // When: 全てのOverlayを確認
      const container = testContainer.getContainer();
      const overlays = container.querySelectorAll('[data-slot="overlay"]');

      // Then: 全てのインスタンスが描画される
      expect(overlays.length).toBe(3);
    });
  });

  describe("Data Attributes", () => {
    it("accepts custom data attributes", () => {
      // Given: カスタムdata属性を持つOverlay
      testContainer.render(
        <Overlay data-custom="custom-value" data-index="1" />
      );

      // When: data属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: カスタムdata属性が設定される
      expect(overlay.getAttribute("data-custom")).toBe("custom-value");
      expect(overlay.getAttribute("data-index")).toBe("1");
    });

    it("preserves data-state attribute", () => {
      // Given: data-state属性を持つOverlay
      testContainer.render(<Overlay data-state="open" />);

      // When: data-state属性を確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');

      // Then: data-state属性が保持される
      expect(overlay.getAttribute("data-state")).toBe("open");
    });
  });

  describe("Style Consistency", () => {
    it("maintains consistent className structure", () => {
      // Given: 複数のOverlayインスタンス
      testContainer.render(
        <>
          <Overlay data-testid="overlay-1" />
          <Overlay data-testid="overlay-2" />
        </>
      );

      // When: 各Overlayのclassを確認
      const overlay1 = testContainer.querySelector('[data-testid="overlay-1"]');
      const overlay2 = testContainer.querySelector('[data-testid="overlay-2"]');

      // Then: 全てのインスタンスで一貫したクラス構造
      expect(overlay1.className).toBe(overlay2.className);
    });

    it("applies all animation-related classes", () => {
      // Given: Overlay
      testContainer.render(<Overlay />);

      // When: アニメーション関連のクラスを確認
      const overlay = testContainer.querySelector('[data-slot="overlay"]');
      const className = overlay.className;

      // Then: 全てのアニメーションクラスが含まれる
      expect(className).toContain("data-[state=open]:animate-in");
      expect(className).toContain("data-[state=closed]:animate-out");
      expect(className).toContain("data-[state=open]:fade-in-0");
      expect(className).toContain("data-[state=closed]:fade-out-0");
    });
  });
});
