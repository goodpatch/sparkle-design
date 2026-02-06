/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { TestContainer } from "@/test/helpers";
import "@testing-library/jest-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./index";

/**
 * テストデータ定数
 * en: Test data constants
 */
const BREADCRUMB_TEST_DATA = {
  pages: [
    { label: "Home", href: "/", isCurrent: false },
    { label: "Components", href: "/components", isCurrent: false },
    { label: "Breadcrumb", href: "/breadcrumb", isCurrent: true },
  ],
  separators: ["/", ">", "→", "•"],
} as const;

type BreadcrumbPageData = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

/**
 * テストヘルパー関数
 * en: Test helper functions
 */
const TestHelpers = {
  /**
   * 基本的なBreadcrumbを作成
   * en: Create basic breadcrumb
   */
  createBasicBreadcrumb(
    items: readonly BreadcrumbPageData[] = BREADCRUMB_TEST_DATA.pages
  ) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  },

  /**
   * カスタム区切り文字付きBreadcrumbを作成
   * en: Create breadcrumb with custom separator
   */
  createBreadcrumbWithSeparator(separator: string) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },

  /**
   * リンク要素の検証
   * en: Validate link elements
   */
  validateLinks(
    container: Element,
    expectedLinks: Array<{ href: string; text: string }>
  ) {
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(expectedLinks.length);

    expectedLinks.forEach((expected, index) => {
      expect(links[index]).toHaveAttribute("href", expected.href);
      expect(links[index]).toHaveTextContent(expected.text);
    });
  },

  /**
   * アクセシビリティ属性の検証
   * en: Validate accessibility attributes
   */
  validateAccessibility(container: Element) {
    const nav = container.querySelector("nav");
    const currentPage = container.querySelector("[aria-current='page']");

    expect(nav).toHaveAttribute("aria-label");
    if (currentPage) {
      expect(currentPage).toHaveAttribute("aria-disabled", "true");
    }
  },
};

let testContainer: TestContainer;

describe("Breadcrumb", () => {
  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders complete breadcrumb navigation correctly", () => {
      // Given: 完全なBreadcrumbナビゲーション
      testContainer.render(TestHelpers.createBasicBreadcrumb());
      const container = testContainer.getContainer();

      // Then: すべての要素が正しく表示される
      expect(container.textContent).toContain("Home");
      expect(container.textContent).toContain("Components");
      expect(container.textContent).toContain("Breadcrumb");
      expect(container.textContent).toContain("/");
    });

    it("renders individual components correctly", () => {
      // Given: 個別のBreadcrumbコンポーネント
      testContainer.render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test">Test Link</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // Then: 各コンポーネントが適切にレンダリングされる
      const nav = testContainer.querySelector("nav");
      const list = testContainer.querySelector("ol");
      const container = testContainer.getContainer();
      const items = container.querySelectorAll("li");

      expect(nav).toBeDefined();
      expect(list).toBeDefined();
      expect(items).toHaveLength(2); // 2 BreadcrumbItem elements
    });
  });

  describe("Link Functionality", () => {
    const linkTestCases = [
      { href: "/", text: "Home" },
      { href: "/components", text: "Components" },
    ] as const;

    it.each(linkTestCases)(
      "renders link with correct href and text: $text -> $href",
      ({ href, text }) => {
        // Given: 特定のhrefとtextを持つリンク
        const pages = [{ label: text, href, isCurrent: false }];
        testContainer.render(TestHelpers.createBasicBreadcrumb(pages));

        // Then: リンクが正しく設定される
        TestHelpers.validateLinks(testContainer.getContainer(), [
          { href, text },
        ]);
      }
    );

    it("does not render current page as link", () => {
      // Given: 現在ページを含むBreadcrumb
      const pages = [{ label: "Current", href: "/current", isCurrent: true }];
      testContainer.render(TestHelpers.createBasicBreadcrumb(pages));

      // Then: 現在ページはリンクでない
      const container = testContainer.getContainer();
      const links = container.querySelectorAll("a");
      const currentPageSpan = testContainer.querySelector(
        "span[aria-current='page']"
      );

      expect(links).toHaveLength(0);
      expect(currentPageSpan).toBeDefined();
      expect(currentPageSpan?.textContent).toBe("Current");
    });
  });

  describe("Separator Functionality", () => {
    it("renders default separator", () => {
      // Given: デフォルトのBreadcrumb
      testContainer.render(TestHelpers.createBasicBreadcrumb());

      // Then: デフォルトの区切り文字が表示される
      expect(testContainer.getContainer().textContent).toContain("/");
    });

    it.each(BREADCRUMB_TEST_DATA.separators)(
      "renders custom separator: %s",
      separator => {
        // Given: カスタム区切り文字
        testContainer.render(
          TestHelpers.createBreadcrumbWithSeparator(separator)
        );

        // Then: カスタム区切り文字が表示される
        expect(testContainer.getContainer().textContent).toContain(separator);
      }
    );

    it("hides separators from screen readers", () => {
      // Given: 区切り文字を含むBreadcrumb
      testContainer.render(TestHelpers.createBasicBreadcrumb());

      // Then: 区切り文字がaria-hiddenになっている
      const container = testContainer.getContainer();
      const separators = container.querySelectorAll("span[aria-hidden='true']");
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("provides proper navigation labeling", () => {
      // Given: 基本的なBreadcrumb
      testContainer.render(TestHelpers.createBasicBreadcrumb());

      // Then: アクセシビリティ属性が正しく設定される
      TestHelpers.validateAccessibility(testContainer.getContainer());
    });

    it("marks current page with aria-current", () => {
      // Given: 現在ページを含むBreadcrumb
      testContainer.render(TestHelpers.createBasicBreadcrumb());

      // Then: 現在ページにaria-current="page"が設定される
      const currentPage = testContainer.querySelector(
        "span[aria-current='page']"
      );
      expect(currentPage).toBeDefined();
      expect(currentPage?.getAttribute("aria-disabled")).toBe("true");
    });

    it("provides semantic HTML structure", () => {
      // Given: 完全なBreadcrumb構造
      testContainer.render(TestHelpers.createBasicBreadcrumb());

      // Then: 適切なHTML要素が使用される
      const nav = testContainer.querySelector("nav");
      const list = testContainer.querySelector("ol");

      expect(nav).toBeDefined();
      expect(list).toBeDefined();
      expect(nav?.getAttribute("aria-label")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty breadcrumb list", () => {
      // Given & When: 空のBreadcrumbList
      expect(() => {
        testContainer.render(
          <Breadcrumb>
            <BreadcrumbList />
          </Breadcrumb>
        );
      }).not.toThrow();

      // Then: 適切にレンダリングされる
      const nav = testContainer.querySelector("nav");
      const list = testContainer.querySelector("ol");
      expect(nav).toBeDefined();
      expect(list).toBeDefined();
    });

    it("handles single item breadcrumb", () => {
      // Given: 単一項目のBreadcrumb
      const singlePage = [{ label: "Home", href: "/", isCurrent: true }];
      testContainer.render(TestHelpers.createBasicBreadcrumb(singlePage));

      // Then: 正しくレンダリングされる
      const container = testContainer.getContainer();
      expect(container.textContent).toContain("Home");

      const currentPage = testContainer.querySelector(
        "span[aria-current='page']"
      );
      expect(currentPage).toBeDefined();
    });

    it("handles custom className", () => {
      // Given: カスタムクラスを持つBreadcrumb
      testContainer.render(
        <Breadcrumb className="custom-breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Test</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // Then: カスタムクラスが適用される
      const nav = testContainer.querySelector("nav");
      expect(nav?.className).toContain("custom-breadcrumb");
    });

    it("forwards additional props correctly", () => {
      // Given: 追加のpropsを持つBreadcrumb
      testContainer.render(
        <Breadcrumb data-testid="breadcrumb-nav" id="main-breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Test</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // Then: props が正しく転送される
      const nav = testContainer.querySelector("nav");
      expect(nav?.getAttribute("data-testid")).toBe("breadcrumb-nav");
      expect(nav?.getAttribute("id")).toBe("main-breadcrumb");
    });
  });
});
