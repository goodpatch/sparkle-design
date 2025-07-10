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

describe("Breadcrumb", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("基本レンダリング", () => {
    it("ホーム・コンポーネント・現在ページが正しく表示される", () => {
      // Given: パンくず（Home > Components > Breadcrumb）をレンダリング
      testContainer.render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // When: テキストを取得
      const text = testContainer.getContainer().textContent;

      // Then: 各ラベルが正しく表示される
      expect(text).toContain("Home");
      expect(text).toContain("Components");
      expect(text).toContain("Breadcrumb");
    });
  });

  describe("リンクの属性", () => {
    it("リンクが正しいhrefを持つ", () => {
      // Given: パンくず（Home, Components）をレンダリング
      testContainer.render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // When: a要素を取得
      const links = testContainer.getContainer().querySelectorAll("a");

      // Then: href属性が正しい
      expect(links[0]).toHaveAttribute("href", "/");
      expect(links[1]).toHaveAttribute("href", "/components");
    });
  });

  describe("現在ページ", () => {
    it("BreadcrumbPageはリンクでない", () => {
      // Given: パンくずの現在ページをレンダリング
      testContainer.render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // When: li要素を取得
      const page = testContainer.getContainer().querySelector("li");

      // Then: a要素が存在せず、テキストが正しい
      expect(page?.querySelector("a")).toBeNull();
      expect(page?.textContent).toBe("Current");
    });
  });

  describe("アクセシビリティ", () => {
    it("nav要素にaria-labelが付与されている", () => {
      // Given: パンくずをレンダリング
      testContainer.render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

      // When: nav要素を取得
      const nav = testContainer.getContainer().querySelector("nav");

      // Then: aria-label="breadcrumb"が付与されている
      expect(nav).not.toBeNull();
      expect(nav?.getAttribute("aria-label") ?? "").toContain("breadcrumb");
    });
  });

  describe("エッジケース", () => {
    it("BreadcrumbListが空でもエラーにならない", () => {
      // Given: 空のBreadcrumbListをレンダリング
      // When/Then: 例外が発生しない
      expect(() => {
        testContainer.render(
          <Breadcrumb>
            <BreadcrumbList />
          </Breadcrumb>
        );
      }).not.toThrow();
    });
  });
});
