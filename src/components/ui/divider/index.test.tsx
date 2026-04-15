/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TestContainer, StyleHelpers } from "../../../test/helpers";
import { Divider, type DividerProps } from "./index";

/**
 * テストデータ定数
 * en: Test data constants
 */
const EMPHASIS_TEST_CASES = [
  {
    emphasis: "low" as const,
    expectedClasses: ["border-base-100", "bg-base-100"],
  },
  {
    emphasis: "middle" as const,
    expectedClasses: ["border-base-200", "bg-base-200"],
  },
  {
    emphasis: "high" as const,
    expectedClasses: ["border-base-300", "bg-base-300"],
  },
] as const;

const LINE_STYLE_TEST_CASES = [
  { lineStyle: "solid" as const, shouldHaveDashed: false },
  { lineStyle: "dashed" as const, shouldHaveDashed: true },
] as const;

const DIRECTION_TEST_CASES = [
  { direction: "horizontal" as const, expectedClasses: ["w-full", "h-px"] },
  { direction: "vertical" as const, expectedClasses: ["h-full", "w-px"] },
] as const;

/**
 * テストヘルパー関数
 * en: Test helper functions
 */
const TestHelpers = {
  /**
   * Dividerを描画して要素を取得
   * en: Render Divider and get element
   */
  renderDivider(container: TestContainer, props: DividerProps = {}) {
    container.render(<Divider {...props} />);
    return container.querySelector("div");
  },

  /**
   * 複数のクラスが存在することを確認
   * en: Assert multiple classes exist
   */
  expectClassesToExist(element: Element, classes: readonly string[]) {
    classes.forEach(className => {
      expect(element.className).toContain(className);
    });
  },

  /**
   * デフォルトスタイルの確認
   * en: Assert default styles
   */
  expectDefaultStyles(element: Element) {
    const defaultClasses = [
      "shrink-0",
      "border-base-200",
      "bg-base-200",
      "w-full",
      "h-px",
    ];
    TestHelpers.expectClassesToExist(element, defaultClasses);
  },
};

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
      // When: div要素を確認
      const divider = TestHelpers.renderDivider(testContainer);

      // Then: 正常に描画される
      expect(divider).toBeDefined();
      expect(divider.tagName).toBe("DIV");
    });

    it("applies default styles correctly", () => {
      // Given: デフォルトのDivider
      // When: スタイルクラスを確認
      const divider = TestHelpers.renderDivider(testContainer);

      // Then: デフォルトスタイルが適用される
      TestHelpers.expectDefaultStyles(divider);
    });
  });

  describe("Emphasis Variants", () => {
    it.each(EMPHASIS_TEST_CASES)(
      "applies $emphasis emphasis correctly",
      ({ emphasis, expectedClasses }) => {
        // Given: 指定されたemphasisのDivider
        // When: クラス名を確認
        const divider = TestHelpers.renderDivider(testContainer, { emphasis });

        // Then: 対応するクラスが適用される
        TestHelpers.expectClassesToExist(divider, expectedClasses);
      }
    );
  });

  describe("Line Style Variants", () => {
    it("applies solid line style by default", () => {
      // Given: lineStyle未指定のDivider
      // When: クラス名を確認
      const divider = TestHelpers.renderDivider(testContainer);

      // Then: solid（デフォルト）スタイルが適用される
      expect(divider.className).not.toContain("border-dashed");
    });

    it.each(LINE_STYLE_TEST_CASES)(
      "applies $lineStyle line style correctly",
      ({ lineStyle, shouldHaveDashed }) => {
        // Given: 指定されたlineStyleのDivider
        // When: クラス名を確認
        const divider = TestHelpers.renderDivider(testContainer, { lineStyle });

        // Then: 期待されるdashedクラスの有無が正しい
        if (shouldHaveDashed) {
          expect(divider.className).toContain("border-dashed");
        } else {
          expect(divider.className).not.toContain("border-dashed");
        }
      }
    );
  });

  describe("Direction Variants", () => {
    it("applies horizontal direction by default", () => {
      // Given: direction未指定のDivider
      // When: クラス名を確認
      const divider = TestHelpers.renderDivider(testContainer);

      // Then: horizontal（デフォルト）方向が適用される
      TestHelpers.expectClassesToExist(divider, ["w-full", "h-px"]);
    });

    it.each(DIRECTION_TEST_CASES)(
      "applies $direction direction correctly",
      ({ direction, expectedClasses }) => {
        // Given: 指定されたdirectionのDivider
        // When: クラス名を確認
        const divider = TestHelpers.renderDivider(testContainer, { direction });

        // Then: 対応するクラスが適用される
        TestHelpers.expectClassesToExist(divider, expectedClasses);
      }
    );
  });

  describe("Combined Variants", () => {
    const combinedTestCases = [
      {
        props: {
          emphasis: "high" as const,
          lineStyle: "dashed" as const,
          direction: "vertical" as const,
        },
        expectedClasses: [
          "border-base-300",
          "border-dashed",
          "h-full",
          "w-px",
          "shrink-0",
          "bg-transparent",
          "border-l",
        ],
        description: "applies multiple variants correctly",
      },
      {
        props: {
          emphasis: "low" as const,
          lineStyle: "dashed" as const,
          direction: "horizontal" as const,
        },
        expectedClasses: [
          "border-base-100",
          "border-dashed",
          "w-full",
          "h-px",
          "bg-transparent",
          "border-t",
        ],
        description: "combines low emphasis with dashed horizontal style",
      },
    ] as const;

    it.each(combinedTestCases)("$description", ({ props, expectedClasses }) => {
      // Given: 複数のvariant指定のDivider
      // When: クラス名を確認
      const divider = TestHelpers.renderDivider(testContainer, props);

      // Then: 全てのvariantクラスが適用される
      TestHelpers.expectClassesToExist(divider, expectedClasses);
    });
  });

  describe("Custom Properties", () => {
    it("forwards DOM attributes", () => {
      // Given: カスタム属性付きのDivider
      const testId = "custom-divider-id";
      testContainer.render(
        <Divider data-testid={testId} title="Divider element" />
      );
      const divider = testContainer.querySelector("div");

      // Then: DOM属性が転送される
      expect(divider.getAttribute("data-testid")).toBe(testId);
      expect(divider.getAttribute("title")).toBe("Divider element");
    });

    it("supports custom className", () => {
      // Given: カスタムクラス付きのDivider
      const customClass = "my-custom-divider-class";
      const divider = TestHelpers.renderDivider(testContainer, {
        className: customClass,
      });

      // Then: カスタムクラスが追加される
      expect(divider.className).toContain(customClass);
      // デフォルトクラスも保持される
      expect(divider.className).toContain("shrink-0");
    });

    it("supports custom id and data attributes", () => {
      // Given: カスタムid属性付きのDivider
      const customId = "divider-123";
      testContainer.render(<Divider id={customId} data-value="separator" />);
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
      const divider = testContainer.querySelector("div");

      // Then: refが正しく設定される
      expect(ref.current).toBe(divider);
    });

    it("allows ref access to element properties", () => {
      // Given: ref付きのDivider
      const ref = React.createRef<HTMLDivElement>();
      testContainer.render(<Divider ref={ref} data-testid="ref-test" />);
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
      const divider = TestHelpers.renderDivider(testContainer, {
        emphasis: "high",
        lineStyle: "dashed",
      });

      // Then: StyleHelpersが正しく動作する
      expect(StyleHelpers.hasClass(divider, "shrink-0")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "border-base-300")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "border-dashed")).toBe(true);
      expect(StyleHelpers.hasClass(divider, "nonexistent-class")).toBe(false);
    });

    it("works with StyleHelpers to check multiple classes", () => {
      // Given: 複数クラス付きのDivider
      const divider = TestHelpers.renderDivider(testContainer, {
        direction: "vertical",
        emphasis: "low",
      });
      const expectedClasses = ["shrink-0", "border-base-100", "h-full", "w-px"];

      // Then: 複数クラスチェックが正しく動作する
      expect(StyleHelpers.hasClasses(divider, expectedClasses)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles null or undefined props gracefully", () => {
      // Given & When: undefined propsを含むDivider
      expect(() => {
        testContainer.render(
          <Divider
            emphasis={undefined}
            lineStyle={undefined}
            direction={undefined}
          />
        );
      }).not.toThrow();

      const divider = testContainer.querySelector("div");

      // Then: デフォルト値が適用される
      expect(divider.className).toContain("border-base-200");
      expect(divider.className).toContain("w-full");
      expect(divider.className).toContain("h-px");
    });

    it("handles invalid props without crashing", () => {
      // Given & When: 無効なprops付きのDivider
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
      const divider = testContainer.querySelector("div");

      // Then: accessibility属性が設定される
      expect(divider.getAttribute("role")).toBe("separator");
      expect(divider.getAttribute("aria-orientation")).toBe("horizontal");
      expect(divider.getAttribute("aria-label")).toBe("Content separator");
    });
  });

  describe("Layout Integration", () => {
    const layoutTestCases = [
      {
        direction: "horizontal" as const,
        testId: "horizontal-divider",
        expectedClasses: ["w-full", "h-px"],
        description: "works as horizontal separator in layouts",
      },
      {
        direction: "vertical" as const,
        testId: "vertical-divider",
        expectedClasses: ["h-full", "w-px"],
        description: "works as vertical separator in layouts",
      },
    ] as const;

    it.each(layoutTestCases)(
      "$description",
      ({ direction, testId, expectedClasses }) => {
        // Given: レイアウト内のDivider
        testContainer.render(
          <div style={{ display: "flex" }}>
            <div>コンテンツ1</div>
            <Divider direction={direction} data-testid={testId} />
            <div>コンテンツ2</div>
          </div>
        );

        // When: レイアウト内のdividerを確認
        const divider = testContainer.queryByTestId(testId);

        // Then: 適切な方向のスタイルが適用される
        TestHelpers.expectClassesToExist(divider, expectedClasses);
      }
    );
  });

  describe("Performance", () => {
    // 時間ベースのアサーションは CI 負荷で flaky のため skip
    // en: Skip time-based performance assertion; flaky on loaded CI runners
    it.skip("renders multiple dividers efficiently", () => {
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
