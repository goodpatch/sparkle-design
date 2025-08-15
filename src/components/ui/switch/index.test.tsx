/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "@/test/helpers";
import { Switch } from "./index";

describe("Switch", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders switch with default medium size", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement).toBeDefined();
      expect(StyleHelpers.hasClass(switchElement, "h-6")).toBe(true);
      expect(StyleHelpers.hasClass(switchElement, "w-11")).toBe(true);
    });

    it("renders switch thumb element", () => {
      testContainer.render(<Switch />);
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      expect(thumbElement).toBeDefined();
      expect(StyleHelpers.hasClass(thumbElement, "h-5")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "w-5")).toBe(true);
    });

    it("has proper role and default attributes", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("role")).toBe("switch");
      expect(switchElement.getAttribute("data-state")).toBe("unchecked");
    });
  });

  describe("Size Variants", () => {
    it("applies small size classes correctly", () => {
      testContainer.render(<Switch size="sm" />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      expect(StyleHelpers.hasClass(switchElement, "h-4")).toBe(true);
      expect(StyleHelpers.hasClass(switchElement, "w-7")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "h-3")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "w-3")).toBe(true);
    });

    it("applies medium size classes correctly (default)", () => {
      testContainer.render(<Switch size="md" />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      expect(StyleHelpers.hasClass(switchElement, "h-6")).toBe(true);
      expect(StyleHelpers.hasClass(switchElement, "w-11")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "h-5")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "w-5")).toBe(true);
    });

    it("applies large size classes correctly", () => {
      testContainer.render(<Switch size="lg" />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      expect(StyleHelpers.hasClass(switchElement, "h-8")).toBe(true);
      expect(StyleHelpers.hasClass(switchElement, "w-[60px]")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "h-7")).toBe(true);
      expect(StyleHelpers.hasClass(thumbElement, "w-7")).toBe(true);
    });
  });

  describe("State Management", () => {
    it("renders in unchecked state by default", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("data-state")).toBe("unchecked");
      expect(switchElement.getAttribute("aria-checked")).toBe("false");
    });

    it("renders in checked state when checked prop is true", () => {
      testContainer.render(<Switch checked={true} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("data-state")).toBe("checked");
      expect(switchElement.getAttribute("aria-checked")).toBe("true");
    });

    it("supports controlled mode with checked prop", () => {
      const handleChange = vi.fn();
      testContainer.render(
        <Switch checked={false} onCheckedChange={handleChange} />
      );
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("data-state")).toBe("unchecked");

      EventHelpers.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("supports uncontrolled mode without checked prop", () => {
      const handleChange = vi.fn();
      testContainer.render(<Switch onCheckedChange={handleChange} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("User Interaction", () => {
    it("toggles state when clicked", () => {
      const handleChange = vi.fn();
      testContainer.render(<Switch onCheckedChange={handleChange} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("handles keyboard interaction with Space key", () => {
      const handleKeyDown = vi.fn();
      testContainer.render(<Switch onKeyDown={handleKeyDown} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.keyDown(switchElement, " ");

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("handles keyboard interaction with Enter key", () => {
      const handleKeyDown = vi.fn();
      testContainer.render(<Switch onKeyDown={handleKeyDown} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.keyDown(switchElement, "Enter");

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("does not trigger interaction when disabled", () => {
      const handleChange = vi.fn();
      testContainer.render(<Switch disabled onCheckedChange={handleChange} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("applies disabled attribute when disabled prop is true", () => {
      testContainer.render(<Switch disabled />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(A11yHelpers.isDisabled(switchElement)).toBe(true);
      expect(switchElement.getAttribute("data-disabled")).toBe("");
    });

    it("applies disabled styling to switch when disabled", () => {
      testContainer.render(<Switch disabled />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(
        StyleHelpers.hasClass(switchElement, "disabled:cursor-not-allowed")
      ).toBe(true);
    });

    it("applies disabled styling to thumb when disabled and unchecked", () => {
      testContainer.render(<Switch disabled checked={false} />);
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      // disabled styling should be applied to thumb
      expect(thumbElement.className).toContain(
        "data-[state=unchecked]:bg-neutral-50"
      );
    });

    it("applies disabled styling to thumb when disabled and checked", () => {
      testContainer.render(<Switch disabled checked={true} />);
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      // disabled styling should be applied to thumb
      expect(thumbElement.className).toContain(
        "data-[state=checked]:bg-primary-50"
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(A11yHelpers.hasRole(switchElement, "switch")).toBe(true);
      expect(switchElement.getAttribute("aria-checked")).toBe("false");
    });

    it("updates aria-checked when state changes", () => {
      testContainer.render(<Switch checked={true} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("aria-checked")).toBe("true");
    });

    it("is focusable by default", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      EventHelpers.focus(switchElement as HTMLElement);

      expect(document.activeElement).toBe(switchElement);
    });

    it("has proper focus styling classes", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(
        StyleHelpers.hasClass(switchElement, "focus-visible:outline-hidden")
      ).toBe(true);
      expect(StyleHelpers.hasClass(switchElement, "focus-visible:ring-2")).toBe(
        true
      );
    });

    it("supports custom aria-label", () => {
      testContainer.render(
        <Switch aria-label="通知を有効にする Enable notifications" />
      );
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(
        A11yHelpers.hasAriaLabel(
          switchElement,
          "通知を有効にする Enable notifications"
        )
      ).toBe(true);
    });
  });

  describe("Custom Props", () => {
    it("applies custom className to switch", () => {
      testContainer.render(<Switch className="custom-switch" />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(StyleHelpers.hasClass(switchElement, "custom-switch")).toBe(true);
    });

    it("forwards additional props to switch element", () => {
      testContainer.render(<Switch data-testid="my-switch" id="switch-1" />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      expect(switchElement.getAttribute("data-testid")).toBe("my-switch");
      expect(switchElement.getAttribute("id")).toBe("switch-1");
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple rapid clicks gracefully", () => {
      const handleChange = vi.fn();
      testContainer.render(<Switch onCheckedChange={handleChange} />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');

      // Rapidly click multiple times
      EventHelpers.click(switchElement);
      EventHelpers.click(switchElement);
      EventHelpers.click(switchElement);

      // Should call handler for each click
      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("handles undefined onCheckedChange gracefully", () => {
      expect(() => {
        testContainer.render(<Switch />);
        const switchElement = testContainer.querySelector(
          '[data-slot="switch"]'
        );
        EventHelpers.click(switchElement);
      }).not.toThrow();
    });

    it("maintains data-slot attributes for styling purposes", () => {
      testContainer.render(<Switch />);
      const switchElement = testContainer.querySelector('[data-slot="switch"]');
      const thumbElement = testContainer.querySelector(
        '[data-slot="switch-thumb"]'
      );

      expect(switchElement.getAttribute("data-slot")).toBe("switch");
      expect(thumbElement.getAttribute("data-slot")).toBe("switch-thumb");
    });

    it("handles size prop changes correctly", () => {
      // Test switching from one size to another
      testContainer.render(<Switch size="sm" />);
      let switchElement = testContainer.querySelector('[data-slot="switch"]');
      expect(StyleHelpers.hasClass(switchElement, "h-4")).toBe(true);

      // Re-render with different size
      testContainer.render(<Switch size="lg" />);
      switchElement = testContainer.querySelector('[data-slot="switch"]');
      expect(StyleHelpers.hasClass(switchElement, "h-8")).toBe(true);
    });
  });
});
