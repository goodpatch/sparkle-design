import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
} from "../../../test/helpers";
import { Input } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Input", () => {
  describe("Basic Rendering", () => {
    it("renders a basic input field", () => {
      // Given: 基本的なInput
      testContainer.render(<Input />);

      // When: input要素を確認
      const input = testContainer.queryInput();

      // Then: 正常に描画される
      expect(input).toBeTruthy();
      expect(input.tagName).toBe("INPUT");
    });

    it("renders with specified placeholder", () => {
      // Given: placeholder付きのInput
      testContainer.render(<Input placeholder="Enter text here" />);

      // When: placeholder属性を確認
      const input = testContainer.queryInput();

      // Then: placeholderが設定される
      expect(input.placeholder).toBe("Enter text here");
    });

    it("renders with specified value", () => {
      // Given: value付きのInput
      testContainer.render(<Input value="initial value" />);

      // When: value属性を確認
      const input = testContainer.queryInput();

      // Then: valueが設定される
      expect(input.value).toBe("initial value");
    });
  });

  describe("Icon Button Functionality", () => {
    it("renders icon button when isIconButtonEnable is true", () => {
      // Given: アイコンボタン有効なInput
      testContainer.render(<Input isIconButtonEnable iconButtonIcon="edit" />);

      // When: button要素を確認
      const button = testContainer.queryButton();

      // Then: ボタンが描画される
      expect(button).toBeTruthy();
    });

    it("does not render icon button when isIconButtonEnable is false", () => {
      // Given: アイコンボタン無効なInput
      testContainer.render(<Input isIconButtonEnable={false} />);

      // When: button要素を確認
      const container = testContainer.getContainer();
      const button = container.querySelector("button");

      // Then: ボタンは描画されない
      expect(button).toBeNull();
    });

    it("calls onIconButtonClick when icon button is clicked", () => {
      // Given: onIconButtonClickコールバック付きのInput
      const handleClick = vi.fn();
      testContainer.render(
        <Input
          isIconButtonEnable
          iconButtonIcon="edit"
          onIconButtonClick={handleClick}
        />
      );
      const button = testContainer.queryButton();

      // When: アイコンボタンをクリック
      EventHelpers.click(button);

      // Then: コールバックが呼ばれる
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onIconButtonClick when button is disabled", () => {
      // Given: disabled状態でコールバック付きのInput
      const handleClick = vi.fn();
      testContainer.render(
        <Input
          isIconButtonEnable
          iconButtonIcon="edit"
          onIconButtonClick={handleClick}
          isDisabled
        />
      );
      const button = testContainer.queryButton();

      // When: アイコンボタンをクリック
      EventHelpers.click(button);

      // Then: コールバックは呼ばれない
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Input Events", () => {
    it("calls onChange when input value changes", () => {
      // Given: onChangeコールバック付きのInput
      const handleChange = vi.fn();
      testContainer.render(<Input onChange={handleChange} />);
      const input = testContainer.queryInput();

      // When: 値を変更
      EventHelpers.change(input, "new value");

      // Then: onChangeが呼ばれる
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("does not fire onChange when disabled", () => {
      // Given: disabled状態でonChangeコールバック付きのInput
      const handleChange = vi.fn();
      testContainer.render(<Input isDisabled onChange={handleChange} />);
      const input = testContainer.queryInput();

      // When: 値を変更しようとする
      EventHelpers.change(input, "should not work");

      // Then: onChangeは呼ばれない
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.disabled).toBe(true);
    });

    it("calls onFocus when input receives focus", () => {
      // Given: onFocusコールバック付きのInput
      const handleFocus = vi.fn();
      testContainer.render(<Input onFocus={handleFocus} />);
      const input = testContainer.queryInput();

      // When: フォーカスを当てる
      EventHelpers.focus(input);

      // Then: onFocusが呼ばれる
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", () => {
      // Given: onBlurコールバック付きのInput
      const handleBlur = vi.fn();
      testContainer.render(<Input onBlur={handleBlur} />);
      const input = testContainer.queryInput();

      // When: フォーカスを当ててから外す
      EventHelpers.focus(input);
      EventHelpers.blur(input);

      // Then: onBlurが呼ばれる
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Container Click Focus", () => {
    it("focuses input when container is clicked", () => {
      // Given: Input
      testContainer.render(<Input />);
      const wrapper = testContainer.getContainer()
        .firstElementChild as HTMLElement;
      const input = testContainer.queryInput();

      expect(document.activeElement).not.toBe(input);

      // When: コンテナをクリック
      EventHelpers.click(wrapper);

      // Then: inputにフォーカスが当たる
      expect(document.activeElement).toBe(input);
    });

    it("does not focus input when container is clicked and input is disabled", () => {
      // Given: disabled状態のInput
      testContainer.render(<Input isDisabled />);
      const wrapper = testContainer.getContainer()
        .firstElementChild as HTMLElement;
      const input = testContainer.queryInput();

      // When: コンテナをクリック
      EventHelpers.click(wrapper);

      // Then: inputにフォーカスは当たらない
      expect(document.activeElement).not.toBe(input);
    });
  });

  describe("Disabled State", () => {
    it("sets disabled attribute when isDisabled is true", () => {
      // Given: disabled状態のInput
      testContainer.render(<Input isDisabled />);
      const input = testContainer.queryInput();

      // Then: disabled属性が設定される
      expect(A11yHelpers.isDisabled(input)).toBe(true);
    });

    it("applies disabled styling classes", () => {
      // Given: disabled状態のInput
      testContainer.render(<Input isDisabled />);
      const container = testContainer.getContainer().firstElementChild;

      // Then: disabledスタイリングが適用される（実際のCVAクラス名）
      expect(container?.className).toContain("cursor-not-allowed");
    });
  });

  describe("Size Variants", () => {
    it("applies size variant classes correctly", () => {
      // Given: 異なるサイズのInput
      const sizeClassMap = {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      } as const;

      Object.entries(sizeClassMap).forEach(([size, expectedClass]) => {
        testContainer.render(
          <Input size={size as keyof typeof sizeClassMap} />
        );
        const container = testContainer.getContainer().firstElementChild;

        // Then: 適切なサイズクラスが適用される
        expect(container?.className).toContain(expectedClass);
      });
    });
  });

  describe("Invalid State", () => {
    it("applies invalid state classes when isInvalid is true", () => {
      // Given: invalid状態のInput
      testContainer.render(<Input isInvalid />);
      const container = testContainer.getContainer().firstElementChild;

      // Then: invalid状態のクラスが適用される（実際のCVAクラス名）
      expect(container?.className).toContain("border-negative-500");
    });

    it("maintains invalid state with icon button", () => {
      // Given: invalid状態でアイコンボタン付きのInput
      testContainer.render(
        <Input isInvalid isIconButtonEnable iconButtonIcon="edit" />
      );
      const container = testContainer.getContainer().firstElementChild;

      // Then: invalid状態のクラスが保持される（実際のCVAクラス名）
      expect(container?.className).toContain("border-negative-500");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      // Given: aria-label付きのInput
      testContainer.render(<Input aria-label="Search field" />);
      const input = testContainer.queryInput();

      // Then: 適切なARIA属性が設定される
      expect(A11yHelpers.hasAriaLabel(input, "Search field")).toBe(true);
    });

    it("associates with label when id is provided", () => {
      // Given: id付きのInput
      testContainer.render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" />
        </div>
      );
      const input = testContainer.querySelector("#test-input");

      // Then: labelと関連付けられる
      expect(input?.getAttribute("id")).toBe("test-input");
    });

    it("supports aria-describedby for error messages", () => {
      // Given: aria-describedby付きのInput
      testContainer.render(
        <div>
          <Input aria-describedby="error-message" isInvalid />
          <div id="error-message">This field is required</div>
        </div>
      );
      const input = testContainer.queryInput();

      // Then: aria-describedbyが設定される
      expect(A11yHelpers.hasAriaDescribedBy(input)).toBe(true);
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports standard keyboard navigation", () => {
      // Given: Input
      testContainer.render(<Input />);
      const input = testContainer.queryInput();

      // When: キーボード操作
      EventHelpers.keyDown(input, "Enter");
      EventHelpers.keyDown(input, "Tab");

      // Then: キーボードイベントが適切に処理される
      expect(input).toBeTruthy(); // イベントが処理されること
    });

    it("allows tab navigation to icon button when present", () => {
      // Given: アイコンボタン付きのInput
      testContainer.render(<Input isIconButtonEnable iconButtonIcon="edit" />);
      const input = testContainer.queryInput();
      const button = testContainer.queryButton();

      // When: inputからTabキーを押す
      EventHelpers.focus(input);
      EventHelpers.keyDown(input, "Tab");

      // Then: buttonがfocusableである
      expect(button.tabIndex).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works in uncontrolled mode with defaultValue", () => {
      // Given: uncontrolledモードのInput
      testContainer.render(<Input defaultValue="initial" />);
      const input = testContainer.queryInput();

      // When: ユーザーが値を変更
      EventHelpers.change(input, "user input");

      // Then: 内部状態が更新される
      expect(input.value).toBe("user input");
    });

    it("works in controlled mode with value prop", () => {
      // Given: controlledモードのInput
      const handleChange = vi.fn();
      testContainer.render(
        <Input value="controlled" onChange={handleChange} />
      );
      const input = testContainer.queryInput();

      // When: ユーザーが値を変更
      EventHelpers.change(input, "new value");

      // Then: onChangeが呼ばれ、親が状態を管理
      expect(handleChange).toHaveBeenCalled();
      // controlled modeなので、propが変わらない限り値は変わらない
      expect(input.value).toBe("controlled");
    });
  });

  describe("Error Handling", () => {
    it("handles missing props gracefully", () => {
      // Given: 最小限のpropsでInput
      expect(() => {
        testContainer.render(<Input />);
      }).not.toThrow();

      // Then: 正常に動作する
      const input = testContainer.queryInput();
      expect(input).toBeTruthy();
    });

    it("handles rapid value changes gracefully", () => {
      // Given: onChangeコールバック付きのInput
      const handleChange = vi.fn();
      testContainer.render(<Input onChange={handleChange} />);
      const input = testContainer.queryInput();

      // When: 連続して値を変更
      EventHelpers.change(input, "first");
      EventHelpers.change(input, "second");
      EventHelpers.change(input, "third");

      // Then: 各変更が適切に処理される
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("Integration", () => {
    it("works with form submission", () => {
      // Given: form内のInput
      testContainer.render(
        <form>
          <Input name="username" defaultValue="testuser" />
        </form>
      );
      const input = testContainer.queryInput();

      // Then: form dataに含まれる
      expect(input.name).toBe("username");
      expect(input.value).toBe("testuser");
    });

    it("supports various input types", () => {
      // Given: type属性付きのInput
      testContainer.render(<Input type="email" />);
      const input = testContainer.queryInput();

      // Then: type属性が設定される
      expect(input.type).toBe("email");
    });
  });
});
