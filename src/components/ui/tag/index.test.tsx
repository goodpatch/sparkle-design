import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tag } from "./index";

describe("Tag", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      // Given: デフォルトプロパティでTagをレンダリング
      render(<Tag>Sample Tag</Tag>);

      // When: 要素を確認
      const tag = screen.getByText("Sample Tag");

      // Then: 正常に描画される
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass("inline-flex", "items-center", "justify-center");
    });

    it("renders with custom content", () => {
      // Given: カスタムコンテンツでTagをレンダリング
      render(<Tag>Custom Content</Tag>);

      // When: テキストを確認
      // Then: カスタムコンテンツが表示される
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      // Given: カスタムクラス付きのTag
      render(<Tag className="custom-class">Test</Tag>);

      // When: 要素を確認
      const tag = screen.getByText("Test");

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
        render(<Tag variant={variant}>Test Tag</Tag>);

        // When: 要素を確認
        const tag = screen.getByText("Test Tag");

        // Then: 対応するスタイルが適用される
        expect(tag).toHaveClass(expected);
      });
    });
  });

  describe("Size Variants", () => {
    const sizes = [
      { size: "sm" as const, expected: "h-5" },
      { size: "md" as const, expected: "h-6" },
      { size: "lg" as const, expected: "h-8" },
    ];

    sizes.forEach(({ size, expected }) => {
      it(`applies ${size} size styles`, () => {
        // Given: 指定されたsizeのTag
        render(<Tag size={size}>Test Tag</Tag>);

        // When: 要素を確認
        const tag = screen.getByText("Test Tag");

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
        render(<Tag status={status}>Test Tag</Tag>);

        // When: 要素を確認
        const tag = screen.getByText("Test Tag");

        // Then: 対応するステータススタイルが適用される
        expect(tag.className).toContain(expected);
      });
    });
  });

  describe("Combined Props", () => {
    it("applies multiple props correctly", () => {
      // Given: 複数のプロパティを持つTag
      render(
        <Tag variant="outline" size="lg" status="info" className="custom">
          Combined Props
        </Tag>
      );

      // When: 要素を確認
      const tag = screen.getByText("Combined Props");

      // Then: すべてのプロパティが適用される
      expect(tag).toHaveClass("border", "h-8", "custom");
      expect(tag.className).toContain("border-primary-500");
    });
  });

  describe("Accessibility", () => {
    it("supports ARIA attributes", () => {
      // Given: ARIA属性付きのTag
      render(
        <Tag aria-label="Information tag" role="status">
          Info
        </Tag>
      );

      // When: 要素を確認
      const tag = screen.getByText("Info");

      // Then: ARIA属性が適用される
      expect(tag).toHaveAttribute("aria-label", "Information tag");
      expect(tag).toHaveAttribute("role", "status");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      // Given: 空のコンテンツでTagをレンダリング
      render(<Tag data-testid="empty-tag">{""}</Tag>);

      // When: 要素を確認
      const tag = screen.getByTestId("empty-tag");

      // Then: 正常に描画される
      expect(tag).toBeInTheDocument();
    });

    it("handles numeric content", () => {
      // Given: 数値コンテンツでTagをレンダリング
      render(<Tag>{42}</Tag>);

      // When: 数値を確認
      // Then: 数値が正しく表示される
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles React node content", () => {
      // Given: React要素を含むTag
      render(
        <Tag>
          <span>Complex</span> Content
        </Tag>
      );

      // When: 要素を確認
      // Then: React要素が正しく表示される
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
