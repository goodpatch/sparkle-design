/**
 * @jest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "../../../test/helpers";
import { Radio, RadioItem } from "./index";

let testContainer: TestContainer;

beforeEach(() => {
  testContainer = new TestContainer();
  testContainer.setup();
});

afterEach(() => {
  testContainer.cleanup();
});

describe("Radio", () => {
  describe("Basic Rendering", () => {
    it("renders radio group with items", () => {
      // Given: RadioコンポーネントがRadioItemと共に描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
          <RadioItem value="option2" id="radio2" label="オプション2" />
        </Radio>
      );

      // When: 描画を確認
      const radio1 = testContainer.querySelector("#radio1");
      const radio2 = testContainer.querySelector("#radio2");

      // Then: 両方のラジオボタンが描画されている
      expect(radio1).toBeDefined();
      expect(radio2).toBeDefined();
    });

    it("renders with default medium size", () => {
      // Given: デフォルトサイズのRadioItemが描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
        </Radio>
      );

      // When: ラジオボタンの外側（Item）と内側（Indicator）を取得
      const radioItem = testContainer.querySelector("#radio1");
      const indicator = radioItem.querySelector('div[class*="h-5"]');

      // Then: 外側はh-10（mediumサイズ）、内側はh-5（indicatorサイズ）が適用されている
      expect(StyleHelpers.hasClass(radioItem, "h-10")).toBe(true);
      expect(StyleHelpers.hasClass(radioItem, "w-10")).toBe(true);
      expect(indicator).toBeTruthy();
    });
  });

  describe("Size Variants", () => {
    it("applies small size classes correctly", () => {
      // Given: smallサイズのRadioItemが描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="小さい" size="sm" />
        </Radio>
      );

      // When: ラジオボタンの外側（Item）と内側（Indicator）を取得
      const radioItem = testContainer.querySelector("#radio1");
      const indicator = radioItem.querySelector('div[class*="h-4"]');

      // Then: 外側はh-8（smallサイズ）、内側はh-4（indicatorサイズ）が適用されている
      expect(StyleHelpers.hasClass(radioItem, "h-8")).toBe(true);
      expect(StyleHelpers.hasClass(radioItem, "w-8")).toBe(true);
      expect(indicator).toBeTruthy();
    });

    it("applies large size classes correctly", () => {
      // Given: largeサイズのRadioItemが描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="大きい" size="lg" />
        </Radio>
      );

      // When: ラジオボタンの外側（Item）と内側（Indicator）を取得
      const radioItem = testContainer.querySelector("#radio1");
      const indicator = radioItem.querySelector('div[class*="h-6"]');

      // Then: 外側はh-12（largeサイズ）、内側はh-6（indicatorサイズ）が適用されている
      expect(StyleHelpers.hasClass(radioItem, "h-12")).toBe(true);
      expect(StyleHelpers.hasClass(radioItem, "w-12")).toBe(true);
      expect(indicator).toBeTruthy();
    });
  });

  describe("User Interaction", () => {
    it("selects radio item when clicked", () => {
      // Given: 複数のRadioItemを持つRadioグループ
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
          <RadioItem value="option2" id="radio2" label="オプション2" />
        </Radio>
      );

      // When: 最初のラジオボタンをクリック
      const radio1 = testContainer.querySelector("#radio1");
      EventHelpers.click(radio1);

      // Then: 選択状態になる
      expect(radio1.getAttribute("data-state")).toBe("checked");
      expect(radio1.getAttribute("aria-checked")).toBe("true");
    });

    it("deselects previous selection when new item is clicked", () => {
      // Given: 複数のRadioItemを持つRadioグループ
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
          <RadioItem value="option2" id="radio2" label="オプション2" />
        </Radio>
      );

      const radio1 = testContainer.querySelector("#radio1");
      const radio2 = testContainer.querySelector("#radio2");

      // When: 最初のラジオボタンを選択してから2番目を選択
      EventHelpers.click(radio1);
      EventHelpers.click(radio2);

      // Then: 2番目が選択され、1番目は非選択になる
      expect(radio1.getAttribute("data-state")).toBe("unchecked");
      expect(radio1.getAttribute("aria-checked")).toBe("false");
      expect(radio2.getAttribute("data-state")).toBe("checked");
      expect(radio2.getAttribute("aria-checked")).toBe("true");
    });

    it("calls onValueChange callback when selection changes", () => {
      // Given: onValueChangeコールバック付きのRadioグループ
      const handleValueChange = vi.fn();
      testContainer.render(
        <Radio onValueChange={handleValueChange}>
          <RadioItem value="option1" id="radio1" label="オプション1" />
          <RadioItem value="option2" id="radio2" label="オプション2" />
        </Radio>
      );

      // When: ラジオボタンをクリック
      const radio1 = testContainer.querySelector("#radio1");
      EventHelpers.click(radio1);

      // Then: コールバックが正しい値で呼ばれる
      expect(handleValueChange).toHaveBeenCalledTimes(1);
      expect(handleValueChange).toHaveBeenCalledWith("option1");
    });

    it("works with controlled mode", () => {
      // Given: controlledモードのRadioグループ
      const handleValueChange = vi.fn();
      testContainer.render(
        <Radio value="option2" onValueChange={handleValueChange}>
          <RadioItem value="option1" id="radio1" label="オプション1" />
          <RadioItem value="option2" id="radio2" label="オプション2" />
        </Radio>
      );

      // When: 初期状態を確認
      const radio1 = testContainer.querySelector("#radio1");
      const radio2 = testContainer.querySelector("#radio2");

      // Then: valueプロパティで指定されたオプションが選択されている
      expect(radio1.getAttribute("data-state")).toBe("unchecked");
      expect(radio2.getAttribute("data-state")).toBe("checked");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styling when disabled", () => {
      // Given: disabled状態のRadioItem
      testContainer.render(
        <Radio>
          <RadioItem
            value="option1"
            id="radio1"
            label="無効なオプション"
            disabled
          />
        </Radio>
      );

      // When: ラジオボタンを取得
      const radio = testContainer.querySelector("#radio1");
      const label = testContainer.querySelector('label[for="radio1"]');

      // Then: disabled属性とスタイリングが適用されている
      expect(A11yHelpers.isDisabled(radio)).toBe(true);
      expect(StyleHelpers.hasClass(label, "text-text-neutral-disabled")).toBe(
        true
      );
      expect(StyleHelpers.hasClass(label, "cursor-not-allowed")).toBe(true);
    });

    it("does not respond to clicks when disabled", () => {
      // Given: disabled状態のRadioItem
      const handleValueChange = vi.fn();
      testContainer.render(
        <Radio onValueChange={handleValueChange}>
          <RadioItem
            value="option1"
            id="radio1"
            label="無効なオプション"
            disabled
          />
          <RadioItem value="option2" id="radio2" label="有効なオプション" />
        </Radio>
      );

      // When: disabledなラジオボタンをクリック
      const radio1 = testContainer.querySelector("#radio1");
      EventHelpers.click(radio1);

      // Then: 選択されず、コールバックも呼ばれない
      expect(radio1.getAttribute("data-state")).toBe("unchecked");
      expect(handleValueChange).not.toHaveBeenCalled();
    });
  });

  describe("Invalid State", () => {
    it("applies error styling when isInvalid is true", () => {
      // Given: エラー状態のRadioItem
      testContainer.render(
        <Radio>
          <RadioItem
            value="option1"
            id="radio1"
            label="エラーオプション"
            isInvalid
          />
        </Radio>
      );

      // When: ラジオボタンの内側のindicatorを取得
      const radioItem = testContainer.querySelector("#radio1");
      const indicator = radioItem.querySelector(
        'div[class*="border-object-negative-enabled"]'
      );

      // Then: エラー状態のスタイリングが内側のindicatorに適用されている
      expect(indicator).toBeTruthy();
      expect(
        StyleHelpers.hasClass(indicator!, "border-object-negative-enabled")
      ).toBe(true);
    });

    it("applies error styling when selected and invalid", () => {
      // Given: エラー状態で選択されたRadioItem
      testContainer.render(
        <Radio value="option1">
          <RadioItem
            value="option1"
            id="radio1"
            label="エラーオプション"
            isInvalid
          />
        </Radio>
      );

      // When: ラジオボタンの内側のindicatorを取得（選択済み状態）
      const radioItem = testContainer.querySelector("#radio1");
      const indicator = radioItem.querySelector(
        'div[class*="border-object-negative-enabled"]'
      );

      // Then: エラー状態のスタイリングが内側のindicatorに適用されている
      expect(radioItem.getAttribute("data-state")).toBe("checked");
      expect(indicator).toBeTruthy();
      expect(
        StyleHelpers.hasClass(indicator!, "border-object-negative-enabled")
      ).toBe(true);
    });
  });

  describe("Label Integration", () => {
    it("renders label with correct association", () => {
      // Given: ラベル付きのRadioItem
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="テストラベル" />
        </Radio>
      );

      // When: ラベルを取得
      const label = testContainer.querySelector('label[for="radio1"]');

      // Then: ラベルが正しく関連付けられている
      expect(label).toBeDefined();
      expect(label.textContent).toBe("テストラベル");
      expect(label.getAttribute("for")).toBe("radio1");
    });

    it("allows selection via label click", () => {
      // Given: ラベル付きのRadioItem
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="クリック可能ラベル" />
        </Radio>
      );

      // When: ラベルをクリック
      const label = testContainer.querySelector('label[for="radio1"]');
      const radio = testContainer.querySelector("#radio1");
      EventHelpers.click(label);

      // Then: ラジオボタンが選択される
      expect(radio.getAttribute("data-state")).toBe("checked");
    });

    it("renders without label when label prop is not provided", () => {
      // Given: ラベルなしのRadioItem
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" />
        </Radio>
      );

      // When: ラベルを検索
      const label = testContainer
        .getContainer()
        .querySelector('label[for="radio1"]');

      // Then: ラベルは描画されない
      expect(label).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      // Given: RadioItemが描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
        </Radio>
      );

      // When: ラジオボタンを取得
      const radio = testContainer.querySelector("#radio1");

      // Then: 適切なARIA属性が設定されている
      expect(radio.getAttribute("role")).toBe("radio");
      expect(radio.getAttribute("aria-checked")).toBe("false");
      expect(radio.getAttribute("type")).toBe("button");
    });

    it("updates aria-checked when selection changes", () => {
      // Given: RadioItemが描画される
      testContainer.render(
        <Radio>
          <RadioItem value="option1" id="radio1" label="オプション1" />
        </Radio>
      );

      // When: ラジオボタンをクリック
      const radio = testContainer.querySelector("#radio1");
      EventHelpers.click(radio);

      // Then: aria-checkedが更新される
      expect(radio.getAttribute("aria-checked")).toBe("true");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined value prop gracefully", () => {
      // Given: undefined valueのRadioItem
      expect(() => {
        testContainer.render(
          <Radio>
            <RadioItem value={undefined as any} id="radio1" label="値なし" />
          </Radio>
        );
      }).not.toThrow();
    });

    it("handles empty radio group", () => {
      // Given: 空のRadioグループ
      expect(() => {
        testContainer.render(<Radio />);
      }).not.toThrow();
    });

    it("handles single radio item", () => {
      // Given: 単一のRadioItem
      testContainer.render(
        <Radio>
          <RadioItem value="single" id="radio1" label="単一オプション" />
        </Radio>
      );

      // When: クリック
      const radio = testContainer.querySelector("#radio1");
      EventHelpers.click(radio);

      // Then: 正常に選択される
      expect(radio.getAttribute("data-state")).toBe("checked");
    });
  });

  describe("Keyboard Navigation", () => {
    it.skip("responds to keyboard navigation (Arrow keys)", () => {
      // Keyboard navigation testing with Radix UI RadioGroup is complex
      // and requires more sophisticated event simulation than our current setup supports.
      // Arrow key navigation between radio items is handled internally by Radix UI.
      // This would be better tested in E2E tests or with a more complete testing environment.
    });

    it.skip("responds to keyboard activation (Space key)", () => {
      // Keyboard activation testing is complex with Radix UI components
      // and requires more sophisticated event simulation than our current setup supports
      // This would be better tested in E2E tests or with a more complete testing environment
    });
  });

  describe("Figma token mapping", () => {
    // Figma: Radio/Parts/Item 176:7906（2026-10-01 取得）
    // en: Figma Radio/Parts/Item 176:7906 (retrieved 2026-10-01)
    const renderItem = (props: {
      isInvalid?: boolean;
      disabled?: boolean;
      checked?: boolean;
    }) => {
      testContainer.render(
        <Radio defaultValue={props.checked ? "a" : undefined}>
          <RadioItem
            value="a"
            id="token-radio"
            label="A"
            isInvalid={props.isInvalid}
            disabled={props.disabled}
          />
        </Radio>
      );
      const item = testContainer.querySelector("#token-radio");
      const ring = item.firstElementChild as HTMLElement;
      const dot = item.querySelector(
        '[data-slot="radio-group-indicator"]'
      ) as HTMLElement | null;
      return { item, ring, dot };
    };

    it.each([
      [
        "neutral",
        {},
        [
          "bg-surface-base-0",
          "border-object-neutral-low",
          "hover:border-object-neutral-middle",
        ],
      ],
      [
        "neutral disabled",
        { disabled: true },
        [
          "border-object-neutral-disabled",
          "[.group[data-state=checked]_&]:border-object-primary-disabled",
        ],
      ],
      [
        "invalid",
        { isInvalid: true },
        [
          "border-object-negative-enabled",
          "hover:border-object-negative-hover",
        ],
      ],
      [
        "invalid disabled",
        { isInvalid: true, disabled: true },
        ["border-object-negative-disabled"],
      ],
    ])("applies %s ring tokens", (_, props, expected) => {
      const { ring } = renderItem(props);
      expected.forEach(cls =>
        expect(ring.className.split(/\s+/)).toContain(cls)
      );
    });

    it.each([
      [
        "neutral",
        {},
        [
          "[.group[data-state=checked]_&]:bg-object-primary-enabled",
          "[.group[data-state=checked]_&]:hover:bg-object-primary-hover",
        ],
      ],
      [
        "neutral disabled",
        { disabled: true },
        ["[.group[data-state=checked]_&]:bg-object-primary-disabled"],
      ],
      [
        "invalid",
        { isInvalid: true },
        [
          "[.group[data-state=checked]_&]:bg-object-negative-enabled",
          "[.group[data-state=checked]_&]:hover:bg-object-negative-hover",
        ],
      ],
      [
        "invalid disabled",
        { isInvalid: true, disabled: true },
        ["[.group[data-state=checked]_&]:bg-object-negative-disabled"],
      ],
    ])("applies %s checked dot tokens", (_, props, expected) => {
      const { dot } = renderItem({ ...props, checked: true });
      expect(dot).toBeTruthy();
      expected.forEach(cls =>
        expect(dot!.className.split(/\s+/)).toContain(cls)
      );
    });

    it("uses text-neutral-middle for the label (not the undefined text-medium)", () => {
      renderItem({});
      const label = testContainer.querySelector('label[for="token-radio"]');
      expect(label.className).toContain("text-text-neutral-middle");
      expect(label.className).not.toContain("text-text-medium");
    });

    it("sets aria-invalid on the radiogroup, not on each radio (ARIA 1.2)", () => {
      testContainer.render(
        <Radio isInvalid>
          <RadioItem value="a" id="g-a" label="A" />
          <RadioItem value="b" id="g-b" label="B" />
        </Radio>
      );
      const group = testContainer.querySelector('[role="radiogroup"]');
      expect(group.getAttribute("aria-invalid")).toBe("true");
      testContainer
        .getContainer()
        .querySelectorAll('[role="radio"]')
        .forEach((r: Element) =>
          expect(r.hasAttribute("aria-invalid")).toBe(false)
        );
    });

    it("propagates group isInvalid to every item's error style", () => {
      testContainer.render(
        <Radio isInvalid>
          <RadioItem value="a" id="p-a" label="A" />
        </Radio>
      );
      const ring = testContainer.querySelector("#p-a")
        .firstElementChild as HTMLElement;
      expect(ring.className.split(/\s+/)).toContain(
        "border-object-negative-enabled"
      );
    });

    it("treats aria-invalid passed to Radio (e.g. by FormControl) as invalid", () => {
      testContainer.render(
        <Radio aria-invalid>
          <RadioItem value="a" id="f-a" label="A" />
        </Radio>
      );
      const group = testContainer.querySelector('[role="radiogroup"]');
      expect(group.getAttribute("aria-invalid")).toBe("true");
      const ring = testContainer.querySelector("#f-a")
        .firstElementChild as HTMLElement;
      expect(ring.className.split(/\s+/)).toContain(
        "border-object-negative-enabled"
      );
    });

    it.each([false, "false", ""] as const)(
      "does not treat aria-invalid=%j as invalid",
      value => {
        testContainer.render(
          <Radio aria-invalid={value as React.AriaAttributes["aria-invalid"]}>
            <RadioItem value="a" id="n-a" label="A" />
          </Radio>
        );
        const group = testContainer.querySelector('[role="radiogroup"]');
        expect(group.hasAttribute("aria-invalid")).toBe(false);
      }
    );

    it("does not set aria-invalid when valid, and item-level isInvalid stays visual only", () => {
      const { item } = renderItem({ isInvalid: true });
      expect(item.hasAttribute("aria-invalid")).toBe(false);
      const group = testContainer.querySelector('[role="radiogroup"]');
      expect(group.hasAttribute("aria-invalid")).toBe(false);
    });
  });
});
