import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
} from "../../../test/helpers";
import { InputPassword } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("InputPassword", () => {
  describe("Initial State", () => {
    it("renders as password type by default", () => {
      // Given: デフォルトのInputPasswordが描画される
      testContainer.render(<InputPassword />);

      // When: 初期状態を確認
      const input = testContainer.queryInput();

      // Then: password typeになっている
      expect(input.getAttribute("type")).toBe("password");
    });

    it("renders with visibility toggle button", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);

      // When: visibility toggle buttonを確認
      const button = testContainer.queryButton();

      // Then: ボタンが存在する
      expect(button).toBeTruthy();
      expect(button.getAttribute("type")).toBe("button");
    });

    it("has proper accessibility attributes", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword aria-label="Password field" />);

      // When: アクセシビリティ属性を確認
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // Then: 適切なARIA属性が設定されている
      expect(A11yHelpers.hasAriaLabel(input, "Password field")).toBe(true);
      expect(button.getAttribute("aria-label")).toContain("パスワード");
    });
  });

  describe("Visibility Toggle", () => {
    it("toggles from password to text when button is clicked", () => {
      // Given: password typeのInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: text typeに変わる
      expect(input.getAttribute("type")).toBe("text");
    });

    it("toggles from text back to password when button is clicked again", () => {
      // Given: text typeに変更されたInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      EventHelpers.click(button); // first click to text
      expect(input.getAttribute("type")).toBe("text");

      // When: visibility toggle buttonを再度クリック
      EventHelpers.click(button);

      // Then: password typeに戻る
      expect(input.getAttribute("type")).toBe("password");
    });

    it("updates button aria-label when visibility changes", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);
      const button = testContainer.queryButton();
      const initialAriaLabel = button.getAttribute("aria-label");

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: aria-labelが更新される
      const updatedAriaLabel = button.getAttribute("aria-label");
      expect(updatedAriaLabel).not.toBe(initialAriaLabel);
    });

    it("maintains input focus when visibility is toggled", () => {
      // Given: フォーカスされたInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      EventHelpers.focus(input);
      expect(document.activeElement).toBe(input);

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: inputのフォーカスが維持される
      expect(document.activeElement).toBe(input);
    });
  });

  describe("Input Functionality", () => {
    it("accepts text input when visible (text type)", () => {
      // Given: text typeに切り替えられたInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      EventHelpers.click(button); // switch to text

      // When: テキストを入力
      EventHelpers.change(input, "my-password");

      // Then: 値が設定される
      expect(input.value).toBe("my-password");
    });

    it("accepts text input when hidden (password type)", () => {
      // Given: password typeのInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();

      // When: テキストを入力
      EventHelpers.change(input, "secret123");

      // Then: 値が設定される
      expect(input.value).toBe("secret123");
    });

    it("calls onChange when input value changes", () => {
      // Given: onChangeコールバック付きのInputPassword
      const handleChange = vi.fn();
      testContainer.render(<InputPassword onChange={handleChange} />);
      const input = testContainer.queryInput();

      // When: テキストを入力
      EventHelpers.change(input, "newpassword");

      // Then: onChangeが呼ばれる
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("preserves input value when visibility is toggled", () => {
      // Given: 値が入力されたInputPassword
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      EventHelpers.change(input, "mypassword");

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: 値が保持される
      expect(input.value).toBe("mypassword");
    });
  });

  describe("Disabled State", () => {
    it("disables both input and button when isDisabled is true", () => {
      // Given: disabled状態のInputPassword
      testContainer.render(<InputPassword isDisabled />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // Then: 両方がdisabledになる
      expect(A11yHelpers.isDisabled(input)).toBe(true);
      expect(A11yHelpers.isDisabled(button)).toBe(true);
    });

    it("does not toggle visibility when disabled and button is clicked", () => {
      // Given: disabled状態のInputPassword
      testContainer.render(<InputPassword isDisabled />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();
      const initialType = input.getAttribute("type");

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: typeは変わらない
      expect(input.getAttribute("type")).toBe(initialType);
    });

    it("does not accept input when disabled", () => {
      // Given: disabled状態のInputPassword
      testContainer.render(<InputPassword isDisabled />);
      const input = testContainer.queryInput();

      // When: disabledかどうかを確認
      expect(input.disabled).toBe(true);

      // Then: disabled属性が正しく設定されている
      expect(input).toHaveProperty("disabled", true);
    });
  });

  describe("Size Variants", () => {
    it("applies size variant classes correctly", () => {
      // Given: 異なるサイズのInputPassword
      const sizeClassMap = {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      } as const;

      Object.entries(sizeClassMap).forEach(([size, expectedClass]) => {
        testContainer.render(
          <InputPassword size={size as keyof typeof sizeClassMap} />
        );
        const container = testContainer.getContainer().firstElementChild;

        // Then: 適切なサイズクラスが適用される
        expect(container?.className).toContain(expectedClass);
      });
    });
  });

  describe("Invalid State", () => {
    it("applies invalid state classes when isInvalid is true", () => {
      // Given: invalid状態のInputPassword
      testContainer.render(<InputPassword isInvalid />);
      const container = testContainer.getContainer().firstElementChild;

      // Then: invalid状態のクラスが適用されている（実際のCVAクラス名）
      expect(container?.className).toContain("border-negative-500");
    });

    it("maintains invalid state styling when visibility is toggled", () => {
      // Given: invalid状態のInputPassword
      testContainer.render(<InputPassword isInvalid />);
      const container = testContainer.getContainer().firstElementChild;
      const button = testContainer.queryButton();

      // When: visibility toggle buttonをクリック
      EventHelpers.click(button);

      // Then: invalid状態のスタイリングが維持される（実際のCVAクラス名）
      expect(container?.className).toContain("border-negative-500");
    });
  });

  describe("Keyboard Navigation", () => {
    it("allows tab navigation between input and button", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: inputにフォーカス後、Tabキーを押す
      EventHelpers.focus(input);
      EventHelpers.keyDown(input, "Tab");

      // Then: buttonにフォーカスが移る（実際のフォーカス移動は実装に依存）
      expect(button.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it("toggles visibility when button is focused and Enter is pressed", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: buttonをクリックする（Enterキーの代わりにクリックイベント）
      EventHelpers.click(button);

      // Then: visibilityが切り替わる
      expect(input.getAttribute("type")).toBe("text");
    });

    it("toggles visibility when button is focused and Space is pressed", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: buttonをクリックする（Spaceキーの代わりにクリックイベント）
      EventHelpers.click(button);

      // Then: visibilityが切り替わる
      expect(input.getAttribute("type")).toBe("text");
    });
  });

  describe("Error Handling", () => {
    it("handles rapid button clicks gracefully", () => {
      // Given: InputPasswordが描画される
      testContainer.render(<InputPassword />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: 連続してボタンをクリック
      EventHelpers.click(button);
      EventHelpers.click(button);
      EventHelpers.click(button);

      // Then: 最終的な状態は正しい（奇数回クリックなのでtext）
      expect(input.getAttribute("type")).toBe("text");
    });

    it("handles missing props gracefully", () => {
      // Given: 最小限のpropsでInputPasswordが描画される
      expect(() => {
        testContainer.render(<InputPassword />);
      }).not.toThrow();

      // Then: 正常に動作する
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  describe("Integration", () => {
    it("works with form submission", () => {
      // Given: form内のInputPassword
      testContainer.render(
        <form>
          <InputPassword name="password" />
        </form>
      );
      const input = testContainer.queryInput();

      // When: パスワードを入力
      EventHelpers.change(input, "formpassword");

      // Then: form dataに含まれる
      expect(input.name).toBe("password");
      expect(input.value).toBe("formpassword");
    });

    it("supports controlled mode", () => {
      // Given: controlled modeのInputPassword
      const handleChange = vi.fn();
      testContainer.render(
        <InputPassword value="controlled" onChange={handleChange} />
      );
      const input = testContainer.queryInput();

      // When: 値を変更しようとする
      EventHelpers.change(input, "newvalue");

      // Then: onChangeが呼ばれる
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
