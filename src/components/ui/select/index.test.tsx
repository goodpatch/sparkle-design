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
  it.todo("should handle disabled state correctly");
  it.todo("should support multi-select mode");
});
