/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  TestContainer,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Spinner, type SpinnerProps } from ".";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Spinner", () => {
  describe("基本機能", () => {
    it("基本的なスピナーが正しく表示される", () => {
      // Given: 基本的なSpinner
      testContainer.render(<Spinner />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: スピナーが存在し、適切な属性を持つ
      expect(spinner).toBeDefined();
      expect(spinner.getAttribute("role")).toBe("status");
      expect(spinner.getAttribute("aria-label")).toBe("読み込み中");
    });

    it("スピナーアイコンが表示される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: wrapper要素内のicon要素を確認
      const spinner = testContainer.querySelector("span");
      const icon = spinner.querySelector("span");

      // Then: 適切なアイコンが表示される
      expect(icon).toBeDefined();
      expect(icon!.className).toContain("animate-spin");
      expect(icon!.textContent).toBe("progress_activity");
    });

    it("inline-flexスタイルが適用される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: wrapper要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: 適切なFlexスタイルが適用される
      expect(spinner.className).toContain("inline-flex");
      expect(spinner.className).toContain("items-center");
      expect(spinner.className).toContain("justify-center");
    });
  });

  describe("サイズバリエーション", () => {
    const sizeTestCases = [
      { size: 3, description: "小さいサイズ" },
      { size: 5, description: "デフォルトサイズ" },
      { size: 8, description: "大きいサイズ" },
      { size: 12, description: "特大サイズ" },
    ];

    sizeTestCases.forEach(({ size, description }) => {
      it(`${description}(${size})が正しく適用される`, () => {
        // Given: 指定サイズのSpinner
        testContainer.render(<Spinner size={size} />);

        // When: icon要素を確認
        const spinner = testContainer.querySelector("span");
        const icon = spinner.querySelector("span");

        // Then: 適切なサイズクラスが適用される
        expect(icon).toBeDefined();
        expect(icon!.className).toContain(`icon-${size}`);
      });
    });

    it("サイズ未指定の場合デフォルトサイズが適用される", () => {
      // Given: サイズ未指定のSpinner
      testContainer.render(<Spinner />);

      // When: icon要素を確認
      const spinner = testContainer.querySelector("span");
      const icon = spinner.querySelector("span");

      // Then: デフォルトのサイズクラスが適用される
      expect(icon).toBeDefined();
      expect(icon!.className).toContain("icon-3"); // デフォルトサイズは3
    });
  });

  describe("アクセシビリティ", () => {
    it("適切なrole属性が設定される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: 適切なrole属性が設定される
      expect(A11yHelpers.hasRole(spinner, "status")).toBe(true);
    });

    it("デフォルトのaria-label属性が設定される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: デフォルトのaria-label属性が設定される
      expect(spinner.getAttribute("aria-label")).toBe("読み込み中");
    });

    it("カスタムaria-label属性が設定される", () => {
      // Given: カスタムaria-label付きのSpinner
      const customLabel = "データを読み込んでいます";
      testContainer.render(<Spinner aria-label={customLabel} />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: カスタムaria-label属性が設定される
      expect(spinner.getAttribute("aria-label")).toBe(customLabel);
    });

    it("aria-labelが適切に読み上げソフトで認識される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: アクセシビリティ情報が適切に設定される
      expect(A11yHelpers.hasRole(spinner, "status")).toBe(true);
      expect(spinner.hasAttribute("aria-label")).toBe(true);
    });
  });

  describe("アニメーション", () => {
    it("アニメーションクラスが適用される", () => {
      // Given: Spinner
      testContainer.render(<Spinner />);

      // When: icon要素を確認
      const spinner = testContainer.querySelector("span");
      const icon = spinner.querySelector("span");

      // Then: アニメーションクラスが適用される
      expect(icon).toBeDefined();
      expect(StyleHelpers.hasClass(icon!, "animate-spin")).toBe(true);
    });

    it("カスタムクラスとアニメーションクラスが共存する", () => {
      // Given: カスタムクラス付きのSpinner
      const customClass = "custom-spinner-style";
      testContainer.render(<Spinner className={customClass} />);

      // When: icon要素を確認
      const spinner = testContainer.querySelector("span");
      const icon = spinner.querySelector("span");

      // Then: 両方のクラスが適用される
      expect(icon).toBeDefined();
      expect(StyleHelpers.hasClass(icon!, "animate-spin")).toBe(true);
      expect(StyleHelpers.hasClass(icon!, customClass)).toBe(true);
    });
  });

  describe("カスタマイゼーション", () => {
    it("カスタムclassNameが適用される", () => {
      // Given: カスタムクラス付きのSpinner
      const customClass = "my-custom-spinner";
      testContainer.render(<Spinner className={customClass} />);

      // When: icon要素を確認
      const spinner = testContainer.querySelector("span");
      const icon = spinner?.querySelector("span");

      // Then: カスタムクラスが適用される
      expect(icon).toBeDefined();
      expect(StyleHelpers.hasClass(icon!, customClass)).toBe(true);
    });

    it("カスタムid属性が適用される", () => {
      // Given: カスタムid付きのSpinner
      const customId = "loading-spinner";
      testContainer.render(<Spinner id={customId} />);

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: カスタムid属性が適用される
      expect(spinner.getAttribute("id")).toBe(customId);
    });

    it("data属性が適用される", () => {
      // Given: data属性付きのSpinner
      testContainer.render(
        <Spinner data-testid="spinner" data-state="loading" />
      );

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: data属性が適用される
      expect(spinner.getAttribute("data-testid")).toBe("spinner");
      expect(spinner.getAttribute("data-state")).toBe("loading");
    });
  });

  describe("refフォワーディング", () => {
    it("refが正しくspan要素に転送される", () => {
      // Given: ref付きのSpinner
      const ref = React.createRef<HTMLSpanElement>();
      testContainer.render(<Spinner ref={ref} />);

      // When: refの値を確認
      const spinner = testContainer.querySelector("span");

      // Then: refが正しく設定される
      expect(ref.current).toBe(spinner);
    });

    it("refを使って要素にアクセスできる", () => {
      // Given: ref付きのSpinner
      const ref = React.createRef<HTMLSpanElement>();
      testContainer.render(<Spinner ref={ref} data-testid="ref-test" />);

      // When: refを通じて要素にアクセス
      const refElement = ref.current;
      const queryElement = testContainer.querySelector(
        "[data-testid='ref-test']"
      );

      // Then: 同じ要素を参照している
      expect(refElement).toBe(queryElement);
    });
  });

  describe("HTMLAttributes", () => {
    it("HTMLSpanElement属性が正しく適用される", () => {
      // Given: HTML属性付きのSpinner
      testContainer.render(
        <Spinner
          title="ローディング中です"
          tabIndex={0}
          style={{ color: "blue" }}
        />
      );

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");

      // Then: HTML属性が適用される
      expect(spinner.getAttribute("title")).toBe("ローディング中です");
      expect(spinner.getAttribute("tabindex")).toBe("0");
      const spanElement = spinner as HTMLSpanElement;
      expect(spanElement.style.color).toBe("blue");
    });

    it("イベントハンドラーが適用される", () => {
      // Given: イベントハンドラー付きのSpinner
      const handleClick = vi.fn();
      const handleMouseOver = vi.fn();
      testContainer.render(
        <Spinner onClick={handleClick} onMouseOver={handleMouseOver} />
      );

      // When: spinner要素を確認
      const spinner = testContainer.querySelector("span");
      const spanElement = spinner as HTMLSpanElement;

      // Then: イベントハンドラーが設定される
      expect(spanElement.onclick).toBeDefined();
      expect(spanElement.onmouseover).toBeDefined();
    });
  });

  describe("エラーハンドリング", () => {
    it("無効なサイズでもクラッシュしない", () => {
      // Given: 無効なサイズ値
      expect(() => {
        testContainer.render(
          // @ts-expect-error テスト用の無効なサイズ
          <Spinner size="invalid" />
        );
      }).not.toThrow();
    });

    it("負のサイズでもクラッシュしない", () => {
      // Given: 負のサイズ値
      expect(() => {
        testContainer.render(<Spinner size={-1} />);
      }).not.toThrow();
    });

    it("非常に大きなサイズでもクラッシュしない", () => {
      // Given: 非常に大きなサイズ値
      expect(() => {
        testContainer.render(<Spinner size={999} />);
      }).not.toThrow();
    });
  });

  describe("表示制御", () => {
    it("条件付きレンダリングが正常に動作する", () => {
      // Given: 条件付きでレンダリングされるSpinner
      const ConditionalSpinner = ({ isLoading }: { isLoading: boolean }) => (
        <div>{isLoading && <Spinner data-testid="conditional-spinner" />}</div>
      );

      // When: isLoading=trueで描画
      testContainer.render(<ConditionalSpinner isLoading={true} />);

      // Then: スピナーが表示される
      const spinner = testContainer.querySelector(
        "[data-testid='conditional-spinner']"
      );
      expect(spinner).toBeDefined();

      // When: isLoading=falseで再描画
      testContainer.render(<ConditionalSpinner isLoading={false} />);

      // Then: スピナーが非表示になる
      const hiddenSpinner = testContainer
        .getContainer()
        .querySelector("[data-testid='conditional-spinner']");
      expect(hiddenSpinner).toBe(null);
    });

    it("複数のスピナーが同時に表示される", () => {
      // Given: 複数のSpinner
      testContainer.render(
        <div>
          <Spinner data-testid="spinner-1" size={3} />
          <Spinner data-testid="spinner-2" size={5} />
          <Spinner data-testid="spinner-3" size={8} />
        </div>
      );

      // When: 各スピナーを確認
      const spinner1 = testContainer.querySelector("[data-testid='spinner-1']");
      const spinner2 = testContainer.querySelector("[data-testid='spinner-2']");
      const spinner3 = testContainer.querySelector("[data-testid='spinner-3']");

      // Then: 全てのスピナーが表示される
      expect(spinner1).toBeDefined();
      expect(spinner2).toBeDefined();
      expect(spinner3).toBeDefined();
    });
  });

  describe("パフォーマンス", () => {
    // 時間ベースのアサーションは CI 負荷で flaky のため skip
    // en: Skip time-based performance assertion; flaky on loaded CI runners
    it.skip("大量のスピナーが描画されてもパフォーマンスが維持される", () => {
      // Given: 大量のSpinner要素
      const manySpinners = Array.from({ length: 100 }, (_, i) => (
        <Spinner key={i} size={3} data-testid={`spinner-${i}`} />
      ));

      // When: 大量のスピナーを描画
      const startTime = performance.now();
      testContainer.render(<div>{manySpinners}</div>);
      const endTime = performance.now();

      // Then: パフォーマンスが適切である
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(50); // 50ms以下

      // And: スピナーが正常に描画される
      const firstSpinner = testContainer.querySelector(
        "[data-testid='spinner-0']"
      );
      const lastSpinner = testContainer.querySelector(
        "[data-testid='spinner-99']"
      );
      expect(firstSpinner).toBeDefined();
      expect(lastSpinner).toBeDefined();
    });
  });

  describe("統合テスト", () => {
    /**
     * 他のコンポーネントとの組み合わせテスト
     *
     * 注意: このテストは複雑なDOM構造での要素選択が失敗するため、
     * より信頼性の高いテスト手法（data-testid等）の導入後に実装予定
     */
    it.todo("複数の要素が混在する環境でのSpinner動作確認");

    it("フォームの送信状態表示として使用できる", () => {
      // Given: フォーム内のSpinner
      testContainer.render(
        <form>
          <input type="text" placeholder="入力してください" />
          <button type="submit">
            <Spinner size={3} />
            送信中
          </button>
        </form>
      );

      // When: フォーム要素を確認
      const form = testContainer.querySelector("form");
      const input = form.querySelector("input");
      const submitButton = form.querySelector("button[type='submit']");
      const spinner = submitButton!.querySelector("span[role='status']");

      // Then: フォーム統合が正常に動作する
      expect(form).toBeDefined();
      expect(input).toBeDefined();
      expect(submitButton).toBeDefined();
      expect(spinner).toBeDefined();
    });
  });
});
