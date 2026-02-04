import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tag } from "./index";

// ヘルパー: data-testidでラッパー要素を取得
// en: Helper: get wrapper element by data-testid
const renderTag = (props: React.ComponentProps<typeof Tag>) => {
  const testId = `tag-${Math.random().toString(36).slice(2)}`;
  render(<Tag data-testid={testId} {...props} />);
  return screen.getByTestId(testId);
};

describe("Tag", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      // Given: デフォルトプロパティでTagをレンダリング
      const tag = renderTag({ children: "Sample Tag" });

      // When/Then: 正常に描画され、基本クラスが適用される
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass("inline-flex", "items-center", "justify-center");
    });

    it("renders with custom content", () => {
      // Given: カスタムコンテンツでTagをレンダリング
      renderTag({ children: "Custom Content" });

      // When: テキストを確認
      // Then: カスタムコンテンツが表示される
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      // Given: カスタムクラス付きのTag
      const tag = renderTag({ children: "Test", className: "custom-class" });

      // Then: カスタムクラスが適用される
      expect(tag).toHaveClass("custom-class");
    });
  });

  describe("Variant Styling", () => {
    const variants = [
      { variant: "solid" as const, expected: "bg-neutral-500" },
      { variant: "outline" as const, expected: "bg-white" },
      { variant: "subtle" as const, expected: "bg-neutral-100" },
    ];

    variants.forEach(({ variant, expected }) => {
      it(`applies ${variant} variant styles`, () => {
        // Given: 指定されたvariantのTag
        const tag = renderTag({ variant, children: "Test Tag" });

        // Then: 対応するスタイルが適用される
        expect(tag).toHaveClass(expected);
      });
    });
  });

  describe("Size Variants", () => {
    const sizes = [
      { size: "sm" as const, expected: "min-w-10" },
      { size: "md" as const, expected: "min-w-12" },
      { size: "lg" as const, expected: "min-w-14" },
    ];

    sizes.forEach(({ size, expected }) => {
      it(`applies ${size} size styles`, () => {
        // Given: 指定されたsizeのTag
        const tag = renderTag({ size, children: "Test Tag" });

        // Then: 対応するサイズスタイルが適用される
        expect(tag).toHaveClass(expected);
      });
    });
  });

  describe("Status Variants", () => {
    const statuses = [
      { status: "neutral" as const, expected: "bg-neutral-500" },
      { status: "info" as const, expected: "bg-primary-500" },
      { status: "success" as const, expected: "bg-success-500" },
      { status: "warning" as const, expected: "bg-warning-500" },
      { status: "negative" as const, expected: "bg-negative-500" },
    ];

    statuses.forEach(({ status, expected }) => {
      it(`applies ${status} status styles`, () => {
        // Given: 指定されたstatusのTag
        const tag = renderTag({ status, children: "Test Tag" });

        // Then: 対応するステータススタイルが適用される
        expect(tag.className).toContain(expected);
      });
    });
  });

  describe("Combined Props", () => {
    it("applies multiple props correctly", () => {
      // Given: 複数のプロパティを持つTag
      const tag = renderTag({
        variant: "outline",
        size: "lg",
        status: "info",
        className: "custom",
        children: "Combined Props",
      });

      // Then: すべてのプロパティが適用される
      expect(tag).toHaveClass("border", "min-w-14", "custom");
      expect(tag.className).toContain("border-primary-500");
    });
  });

  describe("Accessibility", () => {
    it("supports ARIA attributes", () => {
      // Given: ARIA属性付きのTag
      const tag = renderTag({
        "aria-label": "Information tag",
        role: "status",
        children: "Info",
      });

      // Then: ARIA属性が適用される
      expect(tag).toHaveAttribute("aria-label", "Information tag");
      expect(tag).toHaveAttribute("role", "status");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      // Given: 空のコンテンツでTagをレンダリング
      const tag = renderTag({ children: "" });

      // Then: 正常に描画される
      expect(tag).toBeInTheDocument();
    });

    it("handles numeric content", () => {
      // Given: 数値コンテンツでTagをレンダリング
      renderTag({ children: 42 });

      // Then: 数値が正しく表示される
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles React node content", () => {
      // Given: React要素を含むTag
      renderTag({
        children: (
          <>
            <span>Complex</span> Content
          </>
        ),
      });

      // Then: React要素が正しく表示される
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies truncate styles for text overflow", () => {
      // Given: 長いテキストを含むTag
      const tag = renderTag({
        children: "This is a very long tag text that should show ellipsis",
      });

      // Then: 内部のspan要素にtruncateクラスが適用される
      const span = tag.querySelector("span");
      expect(span).toHaveClass("truncate");
    });
  });
});
