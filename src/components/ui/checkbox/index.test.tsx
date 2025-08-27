import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
} from "../../../test/helpers";
import { Checkbox } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Checkbox", () => {
  describe("Initial State", () => {
    it("renders with unchecked state by default", () => {
      // Given: デフォルトのCheckboxが描画される
      testContainer.render(<Checkbox id="test-checkbox" />);

      // When: 初期状態を確認
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: unchecked状態になっている
      expect(checkbox.getAttribute("data-state")).toBe("unchecked");
      expect(checkbox.getAttribute("aria-checked")).toBe("false");
    });

    it("renders with checked state when defaultChecked is true", () => {
      // Given: defaultChecked=trueのCheckboxが描画される
      testContainer.render(
        <Checkbox id="test-checkbox" defaultChecked={true} />
      );

      // When: 初期状態を確認
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: checked状態になっている
      expect(checkbox.getAttribute("data-state")).toBe("checked");
      expect(checkbox.getAttribute("aria-checked")).toBe("true");
    });

    it("renders with controlled checked state", () => {
      // Given: checked=trueのCheckboxが描画される
      testContainer.render(<Checkbox id="test-checkbox" checked={true} />);

      // When: 初期状態を確認
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: checked状態になっている
      expect(checkbox.getAttribute("data-state")).toBe("checked");
      expect(checkbox.getAttribute("aria-checked")).toBe("true");
    });
  });

  describe("User Interactions", () => {
    it("toggles from unchecked to checked when clicked", () => {
      // Given: unchecked状態のCheckbox
      testContainer.render(<Checkbox id="test-checkbox" />);
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: checked状態に変わる
      expect(checkbox.getAttribute("data-state")).toBe("checked");
      expect(checkbox.getAttribute("aria-checked")).toBe("true");
    });

    it("toggles from checked to unchecked when clicked", () => {
      // Given: checked状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" defaultChecked={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: unchecked状態に変わる
      expect(checkbox.getAttribute("data-state")).toBe("unchecked");
      expect(checkbox.getAttribute("aria-checked")).toBe("false");
    });

    it("calls onCheckedChange callback when state changes", () => {
      // Given: onCheckedChangeコールバック付きのCheckbox
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox id="test-checkbox" onCheckedChange={handleChange} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: コールバックが呼ばれる
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it.skip("responds to keyboard activation (Space key)", () => {
      // Keyboard activation testing is complex with Radix UI components
      // and requires more sophisticated event simulation than our current setup supports
      // This would be better tested in E2E tests or with a more complete testing environment
    });

    it.skip("responds to keyboard activation (Enter key)", () => {
      // Keyboard activation testing is complex with Radix UI components
      // and requires more sophisticated event simulation than our current setup supports
      // This would be better tested in E2E tests or with a more complete testing environment
    });
  });

  describe("Disabled State", () => {
    it("does not toggle when disabled and clicked", () => {
      // Given: disabled状態のCheckbox
      testContainer.render(<Checkbox id="test-checkbox" isDisabled />);
      const checkbox = testContainer.querySelector("#test-checkbox");
      const initialState = checkbox.getAttribute("data-state");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: 状態は変わらない
      expect(checkbox.getAttribute("data-state")).toBe(initialState);
      expect(A11yHelpers.isDisabled(checkbox)).toBe(true);
    });

    it("does not call onCheckedChange when disabled and clicked", () => {
      // Given: disabled状態でコールバック付きのCheckbox
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox
          id="test-checkbox"
          isDisabled
          onCheckedChange={handleChange}
        />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: コールバックは呼ばれない
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to keyboard when disabled", () => {
      // Given: disabled状態のCheckbox
      testContainer.render(<Checkbox id="test-checkbox" isDisabled />);
      const checkbox = testContainer.querySelector("#test-checkbox");
      const initialState = checkbox.getAttribute("data-state");

      // When: キーボード操作される
      EventHelpers.focus(checkbox as HTMLElement);
      EventHelpers.keyDown(checkbox, " ");

      // Then: 状態は変わらない
      expect(checkbox.getAttribute("data-state")).toBe(initialState);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      // Given: 基本的なCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" aria-label="Test checkbox" />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: 適切なARIA属性が設定されている
      expect(checkbox.getAttribute("role")).toBe("checkbox");
      expect(A11yHelpers.hasAriaLabel(checkbox, "Test checkbox")).toBe(true);
      expect(checkbox.getAttribute("aria-checked")).toBeDefined();
    });

    it("is focusable when not disabled", () => {
      // Given: 有効なCheckbox
      testContainer.render(<Checkbox id="test-checkbox" />);
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: フォーカスされる
      EventHelpers.focus(checkbox as HTMLElement);

      // Then: フォーカスされている
      expect(document.activeElement).toBe(checkbox);
    });

    it("is not focusable when disabled", () => {
      // Given: disabled状態のCheckbox
      testContainer.render(<Checkbox id="test-checkbox" isDisabled />);
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: フォーカスしようとする
      EventHelpers.focus(checkbox as HTMLElement);

      // Then: フォーカスされない
      expect(document.activeElement).not.toBe(checkbox);
    });

    it("associates with label when provided", () => {
      // Given: ラベル付きのCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" label="Accept terms" />
      );

      // Then: ラベルが適切に関連付けられている
      const container = testContainer.getContainer();
      const label = container.querySelector("label");
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe("Accept terms");
    });
  });

  describe("CSS Classes and Styling", () => {
    it("applies size variant classes correctly", () => {
      // Given: 異なるサイズのCheckbox
      const testCases = [
        {
          size: "sm",
          expectedOuterClasses: ["h-8", "w-8"],
          expectedInnerClasses: ["h-4", "w-4"],
        },
        {
          size: "md",
          expectedOuterClasses: ["h-10", "w-10"],
          expectedInnerClasses: ["h-5", "w-5"],
        },
        {
          size: "lg",
          expectedOuterClasses: ["h-12", "w-12"],
          expectedInnerClasses: ["h-6", "w-6"],
        },
      ] as const;

      testCases.forEach(
        ({ size, expectedOuterClasses, expectedInnerClasses }) => {
          testContainer.render(<Checkbox id={`test-${size}`} size={size} />);
          const checkboxOuter = testContainer.querySelector(`#test-${size}`);
          const checkboxInner = checkboxOuter.querySelector(
            'div[class*="rounded-xs"]'
          );

          // Then: 外側（タップ可能領域）と内側（視覚的チェックボックス）に適切なサイズクラスが適用されている
          expectedOuterClasses.forEach(className => {
            expect(checkboxOuter.className).toContain(className);
          });
          expect(checkboxInner).toBeTruthy();
          expectedInnerClasses.forEach(className => {
            expect(checkboxInner!.className).toContain(className);
          });
        }
      );
    });

    it("applies correct classes for different states", () => {
      // Given: checked状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" defaultChecked={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: checked状態のクラスが適用されている
      expect(checkbox.getAttribute("data-state")).toBe("checked");
    });

    it("applies invalid state classes when isInvalid is true", () => {
      // Given: invalid状態のCheckbox
      testContainer.render(<Checkbox id="test-checkbox" isInvalid />);
      const checkboxOuter = testContainer.querySelector("#test-checkbox");
      const checkboxInner = checkboxOuter.querySelector(
        'div[class*="border-negative-500"]'
      );

      // Then: invalid状態のクラスが内側のチェックボックスに適用されている
      expect(checkboxInner).toBeTruthy();
      expect(checkboxInner!.className).toContain("border-negative-500");
    });
  });

  describe("Error Handling", () => {
    it("handles missing id gracefully", () => {
      // Given: idが設定されていないCheckbox
      expect(() => {
        testContainer.render(<Checkbox />);
      }).not.toThrow();

      // Then: 正常に描画される
      const checkbox = testContainer
        .getContainer()
        .querySelector("[role=checkbox]");
      expect(checkbox).toBeTruthy();
    });

    it("handles rapid successive clicks gracefully", () => {
      // Given: Checkbox with callback
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox id="test-checkbox" onCheckedChange={handleChange} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: 連続してクリックされる
      EventHelpers.click(checkbox);
      EventHelpers.click(checkbox);
      EventHelpers.click(checkbox);

      // Then: 各クリックが適切に処理される
      expect(handleChange).toHaveBeenCalledTimes(3);
      expect(checkbox.getAttribute("data-state")).toBe("checked");
    });
  });

  describe("Indeterminate State", () => {
    it("renders with indeterminate state when indeterminate prop is true", () => {
      // Given: indeterminate=trueのCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: indeterminate状態になっている
      expect(checkbox.getAttribute("data-state")).toBe("indeterminate");
      expect(checkbox.getAttribute("aria-checked")).toBe("mixed");
    });

    it("renders with indeterminate state when controlled checked is 'indeterminate'", () => {
      // Given: checked="indeterminate"のControlled Checkbox
      testContainer.render(
        <Checkbox id="test-checkbox" checked="indeterminate" />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: indeterminate状態になっている
      expect(checkbox.getAttribute("data-state")).toBe("indeterminate");
      expect(checkbox.getAttribute("aria-checked")).toBe("mixed");
    });

    it("transitions from indeterminate to checked when clicked", () => {
      // Given: indeterminate状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: checked状態に変わる
      expect(checkbox.getAttribute("data-state")).toBe("checked");
      expect(checkbox.getAttribute("aria-checked")).toBe("true");
    });

    it("calls onCheckedChange with true when indeterminate checkbox is clicked", () => {
      // Given: indeterminate状態でコールバック付きのCheckbox
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox
          id="test-checkbox"
          indeterminate={true}
          onCheckedChange={handleChange}
        />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: コールバックがtrueで呼ばれる
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("displays correct icon for indeterminate state", () => {
      // Given: indeterminate状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} />
      );

      // Then: indeterminate用のアイコンが表示されている
      const container = testContainer.getContainer();
      const icon = container.querySelector('[data-slot="checkbox-indicator"]');
      expect(icon?.textContent).toBe("check_indeterminate_small");
    });

    it("applies correct styling for indeterminate state", () => {
      // Given: indeterminate状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} />
      );
      const checkboxOuter = testContainer.querySelector("#test-checkbox");
      const checkboxInner = checkboxOuter.querySelector(
        'div[class*="border-2"]'
      );

      // Then: indeterminate状態のスタイルが適用されている
      expect(checkboxOuter.getAttribute("data-state")).toBe("indeterminate");
      // CVAで定義されたクラスが内側のチェックボックスに適用されていることを確認
      expect(checkboxInner).toBeTruthy();
      expect(checkboxInner!.className).toContain("border-2");
    });

    it("handles controlled indeterminate state correctly", () => {
      // Given: controlled indeterminate状態のCheckbox
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox
          id="test-checkbox"
          checked="indeterminate"
          onCheckedChange={handleChange}
        />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックされる
      EventHelpers.click(checkbox);

      // Then: コールバックが呼ばれるが、状態は制御されている
      expect(handleChange).toHaveBeenCalledWith(true);
      expect(checkbox.getAttribute("data-state")).toBe("indeterminate");
    });

    it("respects indeterminate prop changes in uncontrolled mode", () => {
      // Given: 最初はfalseのindeterminateプロパティ
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={false} />
      );
      let checkbox = testContainer.querySelector("#test-checkbox");
      expect(checkbox.getAttribute("data-state")).toBe("unchecked");

      // When: 新しいコンポーネントでindeterminateプロパティがtrueに変更される
      testContainer.cleanup();
      testContainer.setup();
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} />
      );
      checkbox = testContainer.querySelector("#test-checkbox");

      // Then: indeterminate状態に変わる
      expect(checkbox.getAttribute("data-state")).toBe("indeterminate");
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works in uncontrolled mode with defaultChecked", () => {
      // Given: uncontrolledモードのCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" defaultChecked={false} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: ユーザーがクリックする
      EventHelpers.click(checkbox);

      // Then: 内部状態が更新される
      expect(checkbox.getAttribute("data-state")).toBe("checked");
    });

    it("works in controlled mode with checked prop", () => {
      // Given: controlledモードのCheckbox
      const handleChange = vi.fn();
      testContainer.render(
        <Checkbox
          id="test-checkbox"
          checked={false}
          onCheckedChange={handleChange}
        />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: ユーザーがクリックする
      EventHelpers.click(checkbox);

      // Then: コールバックが呼ばれ、親が状態を管理する
      expect(handleChange).toHaveBeenCalledWith(true);
      // controlled modeなので、propが変わらない限り状態は変わらない
      expect(checkbox.getAttribute("data-state")).toBe("unchecked");
    });

    it("prioritizes controlled checked prop over indeterminate prop", () => {
      // Given: checkedプロパティとindeterminateプロパティが両方設定されている
      testContainer.render(
        <Checkbox id="test-checkbox" checked={true} indeterminate={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // Then: checkedプロパティが優先される
      expect(checkbox.getAttribute("data-state")).toBe("checked");
      expect(checkbox.getAttribute("aria-checked")).toBe("true");
    });

    it("handles indeterminate state with invalid styling", () => {
      // Given: indeterminate かつ invalid状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} isInvalid={true} />
      );
      const checkboxOuter = testContainer.querySelector("#test-checkbox");
      const checkboxInner = checkboxOuter.querySelector(
        'div[class*="border-negative-500"]'
      );

      // Then: indeterminate状態でinvalidスタイルが内側のチェックボックスに適用されている
      expect(checkboxOuter.getAttribute("data-state")).toBe("indeterminate");
      expect(checkboxInner).toBeTruthy();
      expect(checkboxInner!.className).toContain("border-negative-500");
    });

    it("handles indeterminate state when disabled", () => {
      // Given: indeterminate かつ disabled状態のCheckbox
      testContainer.render(
        <Checkbox id="test-checkbox" indeterminate={true} isDisabled={true} />
      );
      const checkbox = testContainer.querySelector("#test-checkbox");

      // When: クリックしようとする
      EventHelpers.click(checkbox);

      // Then: indeterminate状態のままでクリックは無効
      expect(checkbox.getAttribute("data-state")).toBe("indeterminate");
      expect(A11yHelpers.isDisabled(checkbox)).toBe(true);
    });
  });
});
