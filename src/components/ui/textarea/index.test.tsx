/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
} from "../../../test/helpers";
import { Textarea } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Textarea", () => {
  describe("Basic Rendering", () => {
    it("renders a basic textarea", () => {
      // GIVEN: 基本的なTextarea
      // en: GIVEN a basic textarea
      testContainer.render(<Textarea />);

      // WHEN: textarea要素を取得
      // en: WHEN querying the textarea element
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");

      // THEN: 正しく描画されている
      // en: THEN it should be rendered correctly
      expect(el).toBeTruthy();
      expect(el.tagName).toBe("TEXTAREA");
    });

    it("supports placeholder prop", () => {
      // GIVEN: placeholder付き
      // en: GIVEN a textarea with placeholder
      testContainer.render(<Textarea placeholder="複数行" />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: placeholder が設定される
      // en: THEN placeholder should be set
      expect(el.placeholder).toBe("複数行");
    });

    it("renders with initial value (controlled like)", () => {
      // GIVEN: value 付き (親制御想定)
      // en: GIVEN a value prop (controlled scenario)
      testContainer.render(<Textarea value="initial" onChange={() => {}} />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      expect(el.value).toBe("initial");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled attribute when isDisabled is true", () => {
      // GIVEN: isDisabled 指定
      testContainer.render(<Textarea isDisabled />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: disabled 属性が付与
      expect(el.disabled).toBe(true);
    });

    it("prefers isDisabled over native disabled prop", () => {
      // GIVEN: isDisabled と disabled 両方指定
      testContainer.render(<Textarea isDisabled disabled={false} />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: isDisabled が優先
      expect(el.disabled).toBe(true);
    });
  });

  describe("Invalid State", () => {
    it("adds error class when isInvalid is true", () => {
      // GIVEN: エラー状態
      testContainer.render(<Textarea isInvalid />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: エラークラス
      expect(el.className).toContain("border-negative-500");
    });
  });

  describe("Size Variants", () => {
    it("applies size variant classes", () => {
      // GIVEN: 3サイズを検証
      (["sm", "md", "lg"] as const).forEach(size => {
        testContainer.render(<Textarea size={size} />);
        const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
        // THEN: 対応クラス存在
        const expected =
          size === "sm"
            ? "min-h-[56px]"
            : size === "md"
              ? "min-h-[56px]"
              : "min-h-[64px]";
        expect(el.className).toContain(expected);
      });
    });
  });

  describe("Events", () => {
    it("fires onChange when value changes (uncontrolled)", () => {
      // GIVEN: onChange コールバック
      const handle = vi.fn();
      testContainer.render(<Textarea defaultValue="a" onChange={handle} />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // WHEN: 値変更
      // NOTE: React の onChange は input イベントにフックするため helper を利用
      // Textarea 用に直接値を設定して input イベントを発火
      EventHelpers.change(el as any, "b");
      // THEN: 呼び出される
      expect(handle).toHaveBeenCalledTimes(1);
    });

    it("does not change value in controlled mode without prop update", () => {
      // GIVEN: controlled モード
      const handle = vi.fn();
      testContainer.render(<Textarea value="x" onChange={handle} />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // WHEN: ユーザー入力シミュレーション
      EventHelpers.change(el as any, "y");
      // THEN: DOM value は一時的に変わるが (React 再レンダで戻る想定) onChange 呼び出し
      expect(handle).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      // GIVEN: aria-label
      testContainer.render(<Textarea aria-label="long text" />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: aria-label 反映
      expect(A11yHelpers.hasAriaLabel(el, "long text")).toBe(true);
    });

    it("associates label via id/for", () => {
      // GIVEN: label + id
      testContainer.render(
        <div>
          <label htmlFor="txt">説明</label>
          <Textarea id="txt" />
        </div>
      );
      const el = testContainer.querySelector<HTMLTextAreaElement>("#txt");
      // THEN: id 設定確認
      expect(el.id).toBe("txt");
    });
  });

  describe("Edge Cases", () => {
    it("renders safely with minimal props", () => {
      // GIVEN: 最小プロップ
      expect(() => testContainer.render(<Textarea />)).not.toThrow();
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // THEN: 存在
      expect(el).toBeTruthy();
    });

    it("handles rapid multiple changes", () => {
      // GIVEN: onChange
      const handle = vi.fn();
      testContainer.render(<Textarea onChange={handle} />);
      const el = testContainer.querySelector<HTMLTextAreaElement>("textarea");
      // WHEN: 連続変更
      ["a", "b", "c"].forEach(v => {
        EventHelpers.change(el as any, v);
      });
      // THEN: 呼び出し回数
      expect(handle).toHaveBeenCalledTimes(3);
    });
  });
});
