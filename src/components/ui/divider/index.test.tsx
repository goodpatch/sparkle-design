import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TestContainer, StyleHelpers } from "../../../test/helpers";
import { Divider } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Divider", () => {
  describe("Basic Rendering", () => {
    it("renders a basic divider", () => {
      // Given: 基本的なDivider
      testContainer.render(<Divider />);

      // When: div要素を確認
      const divider = testContainer.querySelector("div");

      // Then: 正常に描画される
      expect(divider).toBeDefined();
      expect(divider.tagName).toBe("DIV");
    });

    it("applies default styles correctly", () => {
      // Given: デフォルトのDivider
      testContainer.render(<Divider />);

      // When: スタイルクラスを確認
      const divider = testContainer.querySelector("div");

      // Then: デフォルトスタイルが適用される
      expect(divider.className).toContain("shrink-0");
      expect(divider.className).toContain("border-base-200");
      expect(divider.className).toContain("bg-base-200");
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });
  });

  describe("Emphasis Variants", () => {
    it("applies low emphasis correctly", () => {
      // Given: low emphasisのDivider
      testContainer.render(<Divider emphasis="low" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: low emphasisのクラスが適用される
      expect(divider.className).toContain("border-base-100");
      expect(divider.className).toContain("bg-base-100");
    });

    it("applies middle emphasis correctly", () => {
      // Given: middle emphasisのDivider
      testContainer.render(<Divider emphasis="middle" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: middle emphasisのクラスが適用される
      expect(divider.className).toContain("border-base-200");
      expect(divider.className).toContain("bg-base-200");
    });

    it("applies high emphasis correctly", () => {
      // Given: high emphasisのDivider
      testContainer.render(<Divider emphasis="high" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: high emphasisのクラスが適用される
      expect(divider.className).toContain("border-base-300");
      expect(divider.className).toContain("bg-base-300");
    });
  });

  describe("Line Style Variants", () => {
    it("applies solid line style by default", () => {
      // Given: lineStyle未指定のDivider
      testContainer.render(<Divider />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: solid（デフォルト）スタイルが適用される
      expect(divider.className).not.toContain("border-dashed");
    });

    it("applies dashed line style correctly", () => {
      // Given: dashed lineStyleのDivider
      testContainer.render(<Divider lineStyle="dashed" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: dashedスタイルが適用される
      expect(divider.className).toContain("border-dashed");
    });

    it("applies solid line style explicitly", () => {
      // Given: solid lineStyleのDivider
      testContainer.render(<Divider lineStyle="solid" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: solidスタイルが適用される（dashedクラスが無い）
      expect(divider.className).not.toContain("border-dashed");
    });
  });

  describe("Direction Variants", () => {
    it("applies horizontal direction by default", () => {
      // Given: direction未指定のDivider
      testContainer.render(<Divider />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: horizontal（デフォルト）方向が適用される
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });

    it("applies horizontal direction explicitly", () => {
      // Given: horizontal directionのDivider
      testContainer.render(<Divider direction="horizontal" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: horizontal方向のクラスが適用される
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });

    it("applies vertical direction correctly", () => {
      // Given: vertical directionのDivider
      testContainer.render(<Divider direction="vertical" />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: vertical方向のクラスが適用される
      expect(divider.className).toContain("h-full");
      expect(divider.className).toContain("w-px");
    });
  });

  describe("Combined Variants", () => {
    it("applies multiple variants correctly", () => {
      // Given: 複数のvariant指定のDivider
      testContainer.render(
        <Divider emphasis="high" lineStyle="dashed" direction="vertical" />
      );

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: 全てのvariantクラスが適用される
      expect(divider.className).toContain("border-base-300");
      expect(divider.className).toContain("bg-base-300");
      expect(divider.className).toContain("border-dashed");
      expect(divider.className).toContain("h-full");
      expect(divider.className).toContain("w-px");
      expect(divider.className).toContain("shrink-0");
    });

    it("combines low emphasis with dashed horizontal style", () => {
      // Given: low emphasis + dashed + horizontalのDivider
      testContainer.render(
        <Divider emphasis="low" lineStyle="dashed" direction="horizontal" />
      );

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: 組み合わせのクラスが適用される
      expect(divider.className).toContain("border-base-100");
      expect(divider.className).toContain("bg-base-100");
      expect(divider.className).toContain("border-dashed");
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });
  });

  describe("Custom Properties", () => {
    it("forwards DOM attributes", () => {
      // Given: カスタム属性付きのDivider
      const testId = "custom-divider-id";
      testContainer.render(
        <Divider data-testid={testId} title="Divider element" />
      );

      // When: 属性を確認
      const divider = testContainer.querySelector("div");

      // Then: DOM属性が転送される
      expect(divider.getAttribute("data-testid")).toBe(testId);
      expect(divider.getAttribute("title")).toBe("Divider element");
    });

    it("supports custom className", () => {
      // Given: カスタムクラス付きのDivider
      const customClass = "my-custom-divider-class";
      testContainer.render(<Divider className={customClass} />);

      // When: クラス名を確認
      const divider = testContainer.querySelector("div");

      // Then: カスタムクラスが追加される
      expect(divider.className).toContain(customClass);
      // デフォルトクラスも保持される
      expect(divider.className).toContain("shrink-0");
    });

    it("supports custom id and data attributes", () => {
      // Given: カスタムid属性付きのDivider
      const customId = "divider-123";
      testContainer.render(<Divider id={customId} data-value="separator" />);

      // When: 属性を確認
      const divider = testContainer.querySelector("div");

      // Then: 属性が正しく設定される
      expect(divider.getAttribute("id")).toBe(customId);
      expect(divider.getAttribute("data-value")).toBe("separator");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      // Given: ref付きのDivider
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(<Divider ref={ref} />);

      // When: refの値を確認
      const divider = testContainer.querySelector("div");

      // Then: refが正しく設定される
      expect(ref.current).toBe(divider);
    });

    it("allows ref access to element properties", () => {
      // Given: ref付きのDivider
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(<Divider ref={ref} data-testid="ref-test" />);

      // When: refを通じて要素にアクセス
      const refElement = ref.current;
      const queryElement = testContainer.querySelector(
        "[data-testid='ref-test']"
      );

      // Then: 同じ要素を参照している
      expect(refElement).toBe(queryElement);
      expect(refElement!.tagName).toBe("DIV");
    });
  });

  describe("Style Helpers Integration", () => {
    it("works with StyleHelpers to check classes", () => {
      // Given: 特定スタイルのDivider
      testContainer.render(<Divider emphasis="high" lineStyle="dashed" />);

      // When: StyleHelpersでクラスを確認
      const divider = testContainer.querySelector("div");

      // Then: StyleHelpersが正しく動作する
      expect(StyleHelpers.hasClass(divider, "shrink-0")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "border-base-300")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "border-dashed")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "nonexistent-class")).toBe(false);
    });

    it("works with StyleHelpers to check multiple classes", () => {
      // Given: 複数クラス付きのDivider
      testContainer.render(<Divider direction="vertical" emphasis="low" />);

      // When: StyleHelpersで複数クラスを確認
      const divider = testContainer.querySelector("div");
      const expectedClasses = ["shrink-0", "border-base-100", "h-full", "w-px"];

      // Then: 複数クラスチェックが正しく動作する
      expect(StyleHelpers.hasClasses(divider, expectedClasses)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles null or undefined props gracefully", () => {
      // Given: undefined propsを含むDivider
      expect(() => {
        testContainer.render(
          <Divider
            emphasis={undefined}
            lineStyle={undefined}
            direction={undefined}
          />
        );
      }).not.toThrow();

      // When: 要素を確認
      const divider = testContainer.querySelector("div");

      // Then: デフォルト値が適用される
      expect(divider.className).toContain("border-base-200");
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });

    it("handles invalid props without crashing", () => {
      // Given: 無効なprops付きのDivider
      expect(() => {
        testContainer.render(
          <Divider
            // @ts-expect-error テスト用の無効なprops
            emphasis="invalid"
            // @ts-expect-error テスト用の無効なprops
            lineStyle="invalid"
            // @ts-expect-error テスト用の無効なprops
            direction="invalid"
          />
        );
      }).not.toThrow();
    });

    it("maintains accessibility with custom attributes", () => {
      // Given: accessibility属性付きのDivider
      testContainer.render(
        <Divider
          role="separator"
          aria-orientation="horizontal"
          aria-label="Content separator"
        />
      );

      // When: 属性を確認
      const divider = testContainer.querySelector("div");

      // Then: accessibility属性が設定される
      expect(divider.getAttribute("role")).toBe("separator");
      expect(divider.getAttribute("aria-orientation")).toBe("horizontal");
      expect(divider.getAttribute("aria-label")).toBe("Content separator");
    });
  });

  describe("Layout Integration", () => {
    it("works as horizontal separator in layouts", () => {
      // Given: 水平区切り線としてのDivider
      testContainer.render(
        <div>
          <div>上のコンテンツ</div>
          <Divider data-testid="horizontal-divider" />
          <div>下のコンテンツ</div>
        </div>
      );

      // When: レイアウト内のdividerを確認
      const divider = testContainer.queryByTestId("horizontal-divider");

      // Then: 水平方向のスタイルが適用される
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });

    it("works as vertical separator in layouts", () => {
      // Given: 垂直区切り線としてのDivider
      testContainer.render(
        <div style={{ display: "flex" }}>
          <div>左のコンテンツ</div>
          <Divider direction="vertical" data-testid="vertical-divider" />
          <div>右のコンテンツ</div>
        </div>
      );

      // When: レイアウト内のdividerを確認
      const divider = testContainer.queryByTestId("vertical-divider");

      // Then: 垂直方向のスタイルが適用される
      expect(divider.className).toContain("h-full");
      expect(divider.className).toContain("w-px");
    });
  });

  describe("Performance", () => {
    it("renders multiple dividers efficiently", () => {
      // Given: 複数のDivider要素
      const manyDividers = Array.from({ length: 50 }, (_, i) => (
        <Divider
          key={i}
          emphasis={i % 3 === 0 ? "low" : i % 3 === 1 ? "middle" : "high"}
          data-testid={`divider-${i}`}
        />
      ));

      // When: 複数のdividerを描画
      const startTime = performance.now();
      testContainer.render(<div>{manyDividers}</div>);
      const endTime = performance.now();

      // Then: パフォーマンスが適切である
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(20); // 20ms以下

      // And: dividerが正常に描画される
      const firstDivider = testContainer.queryByTestId("divider-0");
      const lastDivider = testContainer.queryByTestId("divider-49");
      expect(firstDivider).toBeDefined();
      expect(lastDivider).toBeDefined();
    });
  });
});
