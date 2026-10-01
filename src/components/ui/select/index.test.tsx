/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestContainer } from "@/test/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./index";

describe("Select", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("SelectItem はポインターカーソルを持つ", () => {
    testContainer.render(
      <Select open>
        <SelectTrigger>
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const item = document.querySelector('[data-slot="select-item"]');

    expect(item?.className).toContain("cursor-pointer");
  });

  // Portal-based components (Select dropdown) are challenging to test with jsdom
  // due to portal rendering behavior and DOM limitations.
  // These components require more complex setup and potentially headless browser testing.

  it.todo("should render select trigger with placeholder");
  it.todo("should open dropdown when clicked");
  it.todo("should display options in dropdown");
  it.todo("should select option when clicked");
  it.todo("should close dropdown after selection");
  it.todo("should support keyboard navigation (arrow keys)");
  it.todo("should support search/filtering functionality");
  describe("Figma token mapping", () => {
    // Figma: Select 139:22300（2026-10-01 取得）
    // en: Figma Select 139:22300 (retrieved 2026-10-01)
    const renderTrigger = (props: {
      isInvalid?: boolean;
      disabled?: boolean;
    }) => {
      testContainer.render(
        <Select>
          <SelectTrigger {...props}>
            <SelectValue placeholder="選択" />
          </SelectTrigger>
        </Select>
      );
      const trigger = testContainer.querySelector(
        '[data-slot="select-trigger"]'
      ) as HTMLElement;
      const icon = trigger.lastElementChild as HTMLElement;
      return { trigger, icon };
    };

    it.each([
      [
        "enabled",
        {},
        [
          "bg-surface-base-0",
          "border-border-neutral-extra-high-enabled",
          "hover:border-border-neutral-extra-high-hover",
          "data-[state=open]:border-border-neutral-extra-high-hover",
        ],
        "text-object-neutral-middle",
      ],
      [
        "invalid",
        { isInvalid: true },
        [
          "border-border-negative-extra-high-enabled",
          "hover:border-border-negative-extra-high-hover",
          "data-[state=open]:border-border-negative-extra-high-hover",
        ],
        "text-object-neutral-middle",
      ],
      [
        "disabled",
        { disabled: true },
        [
          "bg-surface-neutral-middle-disabled",
          "border-border-neutral-extra-high-disabled",
          "text-text-neutral-disabled",
        ],
        "text-object-neutral-disabled",
      ],
      [
        "invalid disabled",
        { isInvalid: true, disabled: true },
        [
          "bg-surface-neutral-middle-disabled",
          "border-border-negative-extra-high-disabled",
        ],
        "text-object-neutral-disabled",
      ],
    ])("applies %s trigger and icon tokens", (_, props, expected, iconCls) => {
      const { trigger, icon } = renderTrigger(props);
      expected.forEach(cls => expect(trigger.className).toContain(cls));
      expect(icon.className).toContain(iconCls);
    });
  });

  it.todo("should handle disabled state correctly");
  it.todo("should support multi-select mode");
});
