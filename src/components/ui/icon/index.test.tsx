/**
 * @jest-environment jsdom
 */
import React from "react";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { TestContainer, StyleHelpers } from "@/test/helpers";
import { Icon } from ".";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Icon", () => {
  describe("基本レンダリング / Basic Rendering", () => {
    it("span要素としてレンダリングされ、アイコン名を表示する", () => {
      // Given: 基本的なIcon
      // en: Given a basic Icon
      testContainer.render(<Icon icon="favorite" />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: 正しく描画され、テキストと属性が設定される
      // en: Then it renders correctly with text and attributes
      expect(span.tagName).toBe("SPAN");
      expect(span.textContent).toBe("favorite");
      expect(span.getAttribute("aria-hidden")).toBe("true");
      expect(StyleHelpers.hasClass(span, "select-none")).toBe(true);
    });
  });

  describe("サイズと塗りつぶし / Size and Fill", () => {
    it("デフォルトでは icon-3-fill-0 が付与される", () => {
      // Given: デフォルトのIcon
      // en: Given a default Icon
      testContainer.render(<Icon icon="home" />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: デフォルトクラスが付与される
      // en: Then default class is applied
      expect(StyleHelpers.hasClass(span, "icon-3-fill-0")).toBe(true);
    });

    it("size指定で icon-<size>-fill-0 が付与される", () => {
      // Given: size指定のIcon
      // en: Given Icon with size
      testContainer.render(<Icon icon="home" size={6} />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: 指定サイズのクラスが付与される
      // en: Then class for specified size is applied
      expect(StyleHelpers.hasClass(span, "icon-6-fill-0")).toBe(true);
    });

    it("fill=true で icon-3-fill-1 が付与される", () => {
      // Given: fill指定のIcon
      // en: Given Icon with fill
      testContainer.render(<Icon icon="home" fill />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: fill=1のクラスが付与される
      // en: Then fill=1 class is applied
      expect(StyleHelpers.hasClass(span, "icon-3-fill-1")).toBe(true);
    });

    it("size と fill の両方を指定できる", () => {
      // Given: sizeとfillを指定
      // en: Given size and fill specified
      testContainer.render(<Icon icon="home" size={8} fill />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: 両方の指定に応じたクラス
      // en: Then class reflects both size and fill
      expect(StyleHelpers.hasClass(span, "icon-8-fill-1")).toBe(true);
    });
  });

  describe("クラスマージ / Class Merging", () => {
    it("追加のclassNameがマージされる", () => {
      // Given: 追加classNameを付与
      // en: Given additional className provided
      testContainer.render(
        <Icon icon="favorite" className="text-red-500 custom-icon" />
      );

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: すべてのクラスが共存する
      // en: Then all classes coexist
      expect(StyleHelpers.hasClass(span, "text-red-500")).toBe(true);
      expect(StyleHelpers.hasClass(span, "custom-icon")).toBe(true);
      expect(StyleHelpers.hasClass(span, "select-none")).toBe(true);
    });

    it("classNameに icon-*-fill-* が含まれる場合は自動付与しない", () => {
      // Given: 既にアイコングラフ用クラスを含む
      // en: Given className already includes the icon typography class
      testContainer.render(
        <Icon icon="favorite" className="icon-10-fill-1 some-class" fill />
      );

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: 既存クラスは残り、自動生成クラスは追加されない
      // en: Then keep provided class and do not add auto-generated one
      expect(StyleHelpers.hasClass(span, "icon-10-fill-1")).toBe(true);
      expect(span.className.includes("icon-3-fill-1")).toBe(false);
      expect(span.className.includes("icon-6-fill-0")).toBe(false);
    });
  });

  describe("HTMLAttributes / Props", () => {
    it("id や data 属性、style が反映される", () => {
      // Given
      // en: Given
      testContainer.render(
        <Icon
          icon="star"
          id="star-icon"
          data-testid="icon"
          style={{ color: "blue" }}
          title="スター"
        />
      );

      // When
      // en: When
      const span = testContainer.querySelector("span");

      // Then
      // en: Then
      expect(span.getAttribute("id")).toBe("star-icon");
      expect(span.getAttribute("data-testid")).toBe("icon");
      expect((span as HTMLSpanElement).style.color).toBe("blue");
      expect(span.getAttribute("title")).toBe("スター");
    });
  });

  describe("refフォワーディング / Ref Forwarding", () => {
    it("ref が span 要素に転送される", () => {
      // Given
      // en: Given
      const ref = React.createRef<HTMLSpanElement>();
      testContainer.render(<Icon icon="check" ref={ref} data-testid="ref" />);

      // When
      // en: When
      const span = testContainer.querySelector("[data-testid='ref']");

      // Then
      // en: Then
      expect(ref.current).toBe(span);
      expect(ref.current!.textContent).toBe("check");
    });
  });

  describe("アクセシビリティ / Accessibility", () => {
    it("aria-hidden=true が設定される", () => {
      // Given: Icon
      // en: Given Icon
      testContainer.render(<Icon icon="visibility_off" />);

      // When: aria-hiddenなspan要素を取得
      // en: When selecting the aria-hidden span element
      const span = testContainer.querySelector("span[aria-hidden='true']");

      // Then: aria-hidden=true が設定されている
      // en: Then aria-hidden=true is set
      expect(span.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("エッジケース / Edge Cases", () => {
    it("空文字のiconでもクラッシュしない", () => {
      // Given / When / Then
      // en: Given / When / Then
      expect(() => testContainer.render(<Icon icon="" />)).not.toThrow();
    });

    it("負のサイズでもクラッシュしない", () => {
      // Given / When / Then
      // en: Given / When / Then
      expect(() =>
        testContainer.render(<Icon icon="home" size={-1} />)
      ).not.toThrow();
    });
  });
});
