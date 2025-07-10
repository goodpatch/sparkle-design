/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestContainer, StyleHelpers } from "../../../test/helpers";
import { Tag } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Tag", () => {
  describe("Basic Rendering", () => {
    it("renders a basic tag", () => {
      // Given: 基本的なTag
      testContainer.render(<Tag>Sample Tag</Tag>);

      // When: span要素を確認
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: 正常に描画される
      expect(tag).toBeTruthy();
      expect(tag?.textContent).toBe("Sample Tag");
    });

    it("applies base styles correctly", () => {
      // Given: 基本的なTag
      testContainer.render(<Tag>Styled Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: 基本スタイルが適用される
      expect(tag?.className).toContain("inline-flex");
      expect(tag?.className).toContain("items-center");
      expect(tag?.className).toContain("rounded-md");
    });

    it("supports custom className", () => {
      // Given: カスタムクラス付きのTag
      testContainer.render(<Tag className="custom-class">Custom Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: カスタムクラスが適用される
      expect(tag?.className).toContain("custom-class");
    });
  });

  describe("Variant Styling", () => {
    it("applies solid variant by default", () => {
      // Given: variant未指定のTag
      testContainer.render(<Tag>Solid Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: solidバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "bg-base-500")).toBe(true);
    });

    it("applies outline variant classes", () => {
      // Given: outlineバリアントのTag
      testContainer.render(<Tag variant="outline">Outline Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: outlineバリアントのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "border")).toBe(true);
    });
  });

  describe("Size Variants", () => {
    it("applies medium size by default", () => {
      // Given: size未指定のTag
      testContainer.render(<Tag>Medium Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: mediumサイズのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "h-6")).toBe(true);
    });

    it("applies small size classes", () => {
      // Given: smallサイズのTag
      testContainer.render(<Tag size="sm">Small Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: smallサイズのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "h-5")).toBe(true);
    });

    it("applies large size classes", () => {
      // Given: largeサイズのTag
      testContainer.render(<Tag size="lg">Large Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: largeサイズのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "h-8")).toBe(true);
    });
  });

  describe("Status Variants", () => {
    it("applies info status classes", () => {
      // Given: infoステータスのTag
      testContainer.render(<Tag status="info">Info Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: infoステータスのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "bg-primary-500")).toBe(
        true
      );
    });

    it("applies success status classes", () => {
      // Given: successステータスのTag
      testContainer.render(<Tag status="success">Success Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: successステータスのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "bg-success-500")).toBe(
        true
      );
    });

    it("applies warning status classes", () => {
      // Given: warningステータスのTag
      testContainer.render(<Tag status="warning">Warning Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: warningステータスのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "bg-warning-500")).toBe(
        true
      );
    });

    it("applies negative status classes", () => {
      // Given: negativeステータスのTag
      testContainer.render(<Tag status="negative">Error Tag</Tag>);
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;

      // Then: negativeステータスのクラスが適用される
      expect(StyleHelpers.hasClass(tag as Element, "bg-negative-500")).toBe(
        true
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles minimal content gracefully", () => {
      // Given: 最小限の内容のTag
      expect(() => {
        testContainer.render(<Tag> </Tag>);
      }).not.toThrow();

      // Then: 正常に描画される
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;
      expect(tag).toBeTruthy();
    });

    it("handles null children gracefully", () => {
      // Given: null childrenのTag
      expect(() => {
        testContainer.render(<Tag>{null}</Tag>);
      }).not.toThrow();

      // Then: 正常に描画される
      const container = testContainer.getContainer();
      const tag = container.firstElementChild;
      expect(tag).toBeTruthy();
    });
  });
});
