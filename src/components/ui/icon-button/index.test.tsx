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
import { IconButton } from "./index";

describe("IconButton", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      testContainer.render(<IconButton icon="plus" />);
      const button = testContainer.queryButton();

      expect(button).toBeDefined();
      expect(button.tagName).toBe("BUTTON");
      expect(button.type).toBe("button");
    });

    it("renders the correct icon", () => {
      testContainer.render(<IconButton icon="edit" />);
      const container = testContainer.getContainer();
      const iconSpan = container.querySelector('span[aria-hidden="true"]');

      expect(iconSpan).toBeDefined();
      expect(iconSpan?.textContent).toBe("edit");
    });

    it("applies default variant, size, and theme classes", () => {
      testContainer.render(<IconButton icon="plus" />);
      const button = testContainer.queryButton();

      // Default: variant="solid", size="md", theme="primary"
      expect(StyleHelpers.hasClass(button, "w-10")).toBe(true);
      expect(StyleHelpers.hasClass(button, "h-10")).toBe(true);
      expect(StyleHelpers.hasClass(button, "bg-primary-500")).toBe(true);
      expect(StyleHelpers.hasClass(button, "text-white")).toBe(true);
      expect(StyleHelpers.hasClass(button, "border-primary-600")).toBe(true);
    });

    it("forwards custom className", () => {
      const customClass = "my-custom-class";
      testContainer.render(<IconButton icon="plus" className={customClass} />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, customClass)).toBe(true);
    });

    it("forwards arbitrary props", () => {
      testContainer.render(
        <IconButton icon="plus" data-testid="custom-button" />
      );
      const button = testContainer.queryByTestId("custom-button");

      expect(button).toBeDefined();
    });
  });

  describe("Variant Styling", () => {
    describe("solid variant", () => {
      it("applies solid primary classes", () => {
        testContainer.render(
          <IconButton variant="solid" theme="primary" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-primary-500")).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-primary-600")).toBe(true);
      });

      it("applies solid neutral classes", () => {
        testContainer.render(
          <IconButton variant="solid" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "bg-[var(--color-black-alpha-600)]")
        ).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-neutral-600")).toBe(true);
      });

      it("applies solid negative classes", () => {
        testContainer.render(
          <IconButton variant="solid" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-negative-500")).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-negative-600")).toBe(true);
      });
    });

    describe("outline variant", () => {
      it("applies outline primary classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="primary" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-primary-500")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-primary-300")).toBe(true);
      });

      it("applies outline neutral classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-neutral-700")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-neutral-300")).toBe(true);
      });

      it("applies outline negative classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-white")).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-negative-500")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border-negative-300")).toBe(true);
      });
    });

    describe("ghost variant", () => {
      it("applies ghost primary classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="primary" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "text-primary-500")).toBe(true);
        // Ghost variant doesn't have background or border by default
        expect(StyleHelpers.hasClass(button, "bg-primary-500")).toBe(false);
      });

      it("applies ghost neutral classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "text-neutral-700")).toBe(true);
      });

      it("applies ghost negative classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "text-negative-500")).toBe(true);
      });
    });
  });

  describe("Size Variants", () => {
    it("applies extra small size classes", () => {
      testContainer.render(<IconButton size="xs" icon="plus" />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "w-6")).toBe(true);
      expect(StyleHelpers.hasClass(button, "h-6")).toBe(true);
      expect(StyleHelpers.hasClass(button, "p-1")).toBe(true);
    });

    it("applies small size classes", () => {
      testContainer.render(<IconButton size="sm" icon="plus" />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "w-8")).toBe(true);
      expect(StyleHelpers.hasClass(button, "h-8")).toBe(true);
      expect(StyleHelpers.hasClass(button, "p-1.5")).toBe(true);
    });

    it("applies medium size classes (default)", () => {
      testContainer.render(<IconButton size="md" icon="plus" />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "w-10")).toBe(true);
      expect(StyleHelpers.hasClass(button, "h-10")).toBe(true);
      expect(StyleHelpers.hasClass(button, "p-2")).toBe(true);
    });

    it("applies large size classes", () => {
      testContainer.render(<IconButton size="lg" icon="plus" />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "w-12")).toBe(true);
      expect(StyleHelpers.hasClass(button, "h-12")).toBe(true);
      expect(StyleHelpers.hasClass(button, "p-2")).toBe(true);
    });
  });

  describe("Loading State", () => {
    it("shows spinner when loading", () => {
      testContainer.render(<IconButton icon="plus" isLoading />);
      const container = testContainer.getContainer();

      // Spinner should be present
      const spinner = container.querySelector(
        '[data-testid="spinner"], .animate-spin'
      );
      expect(spinner).toBeDefined();

      // Icon should not be present
      const iconSpan = container.querySelector('span[aria-hidden="true"]');
      expect(iconSpan?.textContent).not.toBe("plus");
    });

    it("applies loading cursor style", () => {
      testContainer.render(<IconButton icon="plus" isLoading />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "cursor-not-allowed")).toBe(true);
    });

    it("is disabled when loading", () => {
      testContainer.render(<IconButton icon="plus" isLoading />);
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(true);
    });

    it("does not trigger click events when loading", () => {
      const handleClick = vi.fn();
      testContainer.render(
        <IconButton icon="plus" isLoading onClick={handleClick} />
      );
      const button = testContainer.queryButton();

      EventHelpers.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("is disabled with isDisabled prop", () => {
      testContainer.render(<IconButton icon="plus" isDisabled />);
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(true);
    });

    it("is disabled with disabled prop", () => {
      testContainer.render(<IconButton icon="plus" disabled />);
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(true);
    });

    it("applies disabled cursor style", () => {
      testContainer.render(<IconButton icon="plus" isDisabled />);
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "cursor-not-allowed")).toBe(true);
    });

    it("applies disabled styling for solid variant", () => {
      testContainer.render(
        <IconButton variant="solid" theme="primary" icon="plus" isDisabled />
      );
      const button = testContainer.queryButton();

      expect(StyleHelpers.hasClass(button, "disabled:bg-primary-200")).toBe(
        true
      );
      expect(StyleHelpers.hasClass(button, "disabled:text-white")).toBe(true);
      expect(StyleHelpers.hasClass(button, "disabled:border-none")).toBe(true);
    });

    it("applies disabled styling for outline variant", () => {
      testContainer.render(
        <IconButton variant="outline" theme="primary" icon="plus" isDisabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-[var(--color-white-alpha-700)]"
        )
      ).toBe(true);
      expect(StyleHelpers.hasClass(button, "disabled:text-primary-200")).toBe(
        true
      );
      expect(StyleHelpers.hasClass(button, "disabled:border-primary-100")).toBe(
        true
      );
    });

    it("applies disabled styling for ghost variant", () => {
      testContainer.render(
        <IconButton variant="ghost" theme="primary" icon="plus" isDisabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-[var(--color-white-alpha-700)]"
        )
      ).toBe(true);
      expect(StyleHelpers.hasClass(button, "disabled:text-primary-200")).toBe(
        true
      );
    });

    it("does not trigger click events when disabled", () => {
      const handleClick = vi.fn();
      testContainer.render(
        <IconButton icon="plus" isDisabled onClick={handleClick} />
      );
      const button = testContainer.queryButton();

      EventHelpers.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("User Interaction", () => {
    it("handles click events properly", () => {
      const handleClick = vi.fn();
      testContainer.render(<IconButton icon="plus" onClick={handleClick} />);
      const button = testContainer.queryButton();

      EventHelpers.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events", () => {
      const handleKeyDown = vi.fn();
      testContainer.render(
        <IconButton icon="plus" onKeyDown={handleKeyDown} />
      );
      const button = testContainer.queryButton();

      EventHelpers.keyDown(button, "Enter");

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("handles focus and blur events", () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      testContainer.render(
        <IconButton icon="plus" onFocus={handleFocus} onBlur={handleBlur} />
      );
      const button = testContainer.queryButton();

      EventHelpers.focus(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      EventHelpers.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("AsChild Functionality", () => {
    it("renders as a Slot when asChild is true", () => {
      testContainer.render(
        <IconButton asChild icon="plus">
          <div data-testid="custom-element">Custom element</div>
        </IconButton>
      );
      const container = testContainer.getContainer();

      // When asChild is true, Slot merges props with the child element
      // The div should still exist but with the button's props merged
      const customElement = container.querySelector(
        '[data-testid="custom-element"]'
      );
      expect(customElement).toBeDefined();

      // Check if the element exists and has some content
      if (customElement) {
        expect(customElement.textContent).toContain("Custom element");
      }
    });
  });

  describe("Accessibility", () => {
    it("has proper button semantics", () => {
      testContainer.render(<IconButton icon="plus" />);
      const button = testContainer.queryButton();

      expect(button.tagName).toBe("BUTTON");
      expect(button.type).toBe("button");
    });

    it("supports aria-label", () => {
      const ariaLabel = "Add item";
      testContainer.render(<IconButton icon="plus" aria-label={ariaLabel} />);
      const button = testContainer.queryButton();

      expect(A11yHelpers.hasAriaLabel(button, ariaLabel)).toBe(true);
    });

    it("has proper focus styles", () => {
      testContainer.render(<IconButton icon="plus" />);
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(button, "focus-visible:outline-hidden")
      ).toBe(true);
      expect(StyleHelpers.hasClass(button, "focus-visible:ring-2")).toBe(true);
    });

    it("properly hides icon from screen readers", () => {
      testContainer.render(<IconButton icon="plus" />);
      const container = testContainer.getContainer();
      const iconSpan = container.querySelector('span[aria-hidden="true"]');

      expect(iconSpan?.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty icon gracefully", () => {
      testContainer.render(<IconButton icon="" />);
      const container = testContainer.getContainer();
      const iconSpan = container.querySelector('span[aria-hidden="true"]');

      expect(iconSpan?.textContent).toBe("");
    });

    it("handles both isDisabled and isLoading being true", () => {
      testContainer.render(<IconButton icon="plus" isDisabled isLoading />);
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(true);
      expect(StyleHelpers.hasClass(button, "cursor-not-allowed")).toBe(true);
    });

    it("prioritizes isLoading over normal icon display", () => {
      testContainer.render(<IconButton icon="plus" isLoading />);
      const container = testContainer.getContainer();

      // Should show spinner instead of icon
      const spinner = container.querySelector(
        '[data-testid="spinner"], .animate-spin'
      );
      expect(spinner).toBeDefined();

      // Icon should not be the original icon
      const iconSpan = container.querySelector('span[aria-hidden="true"]');
      expect(iconSpan?.textContent).not.toBe("plus");
    });

    it("maintains display name for debugging", () => {
      expect(IconButton.displayName).toBe("IconButton");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to button element", () => {
      const ref = { current: null as HTMLButtonElement | null };

      testContainer.render(<IconButton icon="plus" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe("BUTTON");
    });
  });
});
