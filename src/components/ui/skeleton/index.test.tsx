/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestContainer, StyleHelpers } from "@/test/helpers";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("Basic Rendering", () => {
    it("レンダリングされる / should render", () => {
      testContainer.render(<Skeleton />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
    });

    it("div要素としてレンダリングされる / should render as a div element", () => {
      testContainer.render(<Skeleton />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.tagName).toBe("DIV");
    });

    it("デフォルトのクラス名が適用される / should apply default classes", () => {
      testContainer.render(<Skeleton />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();

      // アニメーションクラスの確認
      expect(StyleHelpers.hasClass(skeleton!, "animate-pulse")).toBe(true);

      // 背景色クラスの確認
      expect(StyleHelpers.hasClass(skeleton!, "bg-skeleton-fill")).toBe(true);

      // border-radiusクラスの確認
      expect(StyleHelpers.hasClass(skeleton!, "rounded-notice")).toBe(true);
    });
  });

  describe("Custom Styling", () => {
    it("カスタムクラスが追加される / should accept custom className", () => {
      testContainer.render(<Skeleton className="h-4 w-[250px]" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();

      // デフォルトクラスの確認
      expect(StyleHelpers.hasClass(skeleton!, "animate-pulse")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "bg-skeleton-fill")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "rounded-notice")).toBe(true);

      // カスタムクラスの確認
      expect(StyleHelpers.hasClass(skeleton!, "h-4")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "w-[250px]")).toBe(true);
    });

    it("複数のカスタムクラスが適用される / should apply multiple custom classes", () => {
      testContainer.render(
        <Skeleton className="h-12 w-full rounded-full bg-blue-200" />
      );
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();

      expect(StyleHelpers.hasClass(skeleton!, "h-12")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "w-full")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "rounded-full")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "bg-blue-200")).toBe(true);
    });
  });

  describe("HTML Attributes", () => {
    it("data属性が渡される / should accept data attributes", () => {
      testContainer.render(<Skeleton data-testid="custom-skeleton" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("data-testid")).toBe("custom-skeleton");
    });

    it("aria属性が渡される / should accept aria attributes", () => {
      testContainer.render(
        <Skeleton aria-label="コンテンツを読み込み中 (Loading content)" />
      );
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("aria-label")).toBe(
        "コンテンツを読み込み中 (Loading content)"
      );
    });

    it("role属性が渡される / should accept role attribute", () => {
      testContainer.render(<Skeleton role="status" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("role")).toBe("status");
    });

    it("複数のHTML属性が渡される / should accept multiple HTML attributes", () => {
      testContainer.render(
        <Skeleton data-testid="skeleton" aria-busy="true" aria-live="polite" />
      );
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("data-testid")).toBe("skeleton");
      expect(skeleton?.getAttribute("aria-busy")).toBe("true");
      expect(skeleton?.getAttribute("aria-live")).toBe("polite");
    });
  });

  describe("Accessibility", () => {
    it("スクリーンリーダー用のラベルを設定できる / should support screen reader labels", () => {
      testContainer.render(<Skeleton aria-label="読み込み中 (Loading)" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("aria-label")).toBe("読み込み中 (Loading)");
    });

    it("aria-busy属性を設定できる / should support aria-busy attribute", () => {
      testContainer.render(<Skeleton aria-busy="true" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("aria-busy")).toBe("true");
    });

    it("role=status を設定できる / should support role=status", () => {
      testContainer.render(<Skeleton role="status" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("role")).toBe("status");
    });

    it("aria-live属性を設定できる / should support aria-live attribute", () => {
      testContainer.render(<Skeleton aria-live="polite" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton?.getAttribute("aria-live")).toBe("polite");
    });
  });

  describe("Common Use Cases", () => {
    it("テキスト行のスケルトンとして使用できる / should work as text line skeleton", () => {
      testContainer.render(<Skeleton className="h-4 w-[250px]" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(StyleHelpers.hasClass(skeleton!, "h-4")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "w-[250px]")).toBe(true);
    });

    it("円形アバターのスケルトンとして使用できる / should work as circular avatar skeleton", () => {
      testContainer.render(<Skeleton className="h-12 w-12 rounded-full" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(StyleHelpers.hasClass(skeleton!, "h-12")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "w-12")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "rounded-full")).toBe(true);
    });

    it("カードのスケルトンとして使用できる / should work as card skeleton", () => {
      testContainer.render(<Skeleton className="h-[125px] w-[250px]" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(StyleHelpers.hasClass(skeleton!, "h-[125px]")).toBe(true);
      expect(StyleHelpers.hasClass(skeleton!, "w-[250px]")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("className未指定でもレンダリングされる / should render without className", () => {
      testContainer.render(<Skeleton />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(StyleHelpers.hasClass(skeleton!, "animate-pulse")).toBe(true);
    });

    it("空文字列のclassNameでもレンダリングされる / should render with empty className", () => {
      testContainer.render(<Skeleton className="" />);
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(StyleHelpers.hasClass(skeleton!, "animate-pulse")).toBe(true);
    });

    it("子要素をレンダリングできる / should render children if provided", () => {
      testContainer.render(
        <Skeleton>
          <span>Loading content</span>
        </Skeleton>
      );
      const skeleton = testContainer.getContainer().firstElementChild;

      expect(skeleton).toBeInTheDocument();
      expect(skeleton?.textContent).toBe("Loading content");
    });
  });

  describe("Reusability", () => {
    it("複数のSkeletonを同時にレンダリングできる / should render multiple skeletons", () => {
      testContainer.render(
        <div>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      );

      const skeletons = testContainer
        .getContainer()
        .querySelectorAll(".animate-pulse");
      expect(skeletons).toHaveLength(3);
    });

    it("異なるサイズのSkeletonを組み合わせられる / should combine different sized skeletons", () => {
      testContainer.render(
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );

      const skeletons = testContainer
        .getContainer()
        .querySelectorAll(".animate-pulse");
      expect(skeletons.length).toBeGreaterThan(1);
    });
  });
});
