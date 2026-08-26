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
      expect(
        StyleHelpers.hasClass(button, "bg-surface-primary-high-enabled")
      ).toBe(true);
      expect(StyleHelpers.hasClass(button, "text-object-inverse")).toBe(true);
      // Figma 刷新で solid の枠線は削除された
      // en: The border on solid was removed in the Figma refresh.
      expect(StyleHelpers.hasClass(button, "border")).toBe(false);
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

        expect(
          StyleHelpers.hasClass(button, "bg-surface-primary-high-enabled")
        ).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-object-inverse")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border")).toBe(false);
      });

      it("applies solid neutral classes", () => {
        testContainer.render(
          <IconButton variant="solid" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "bg-surface-neutral-high-enabled")
        ).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-object-inverse")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border")).toBe(false);
      });

      it("applies solid negative classes", () => {
        testContainer.render(
          <IconButton variant="solid" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "bg-surface-negative-high-enabled")
        ).toBe(true);
        expect(StyleHelpers.hasClass(button, "text-object-inverse")).toBe(true);
        expect(StyleHelpers.hasClass(button, "border")).toBe(false);
      });
    });

    describe("outline variant", () => {
      it("applies outline primary classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="primary" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-surface-base-0")).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "text-object-primary-enabled")
        ).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "border-border-primary-high")
        ).toBe(true);
      });

      it("applies outline neutral classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-surface-base-0")).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "text-object-neutral-middle")
        ).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "border-border-neutral-high")
        ).toBe(true);
      });

      it("applies outline negative classes", () => {
        testContainer.render(
          <IconButton variant="outline" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, "bg-surface-base-0")).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "text-object-negative-enabled")
        ).toBe(true);
        expect(
          StyleHelpers.hasClass(button, "border-border-negative-high")
        ).toBe(true);
      });
    });

    describe("ghost variant", () => {
      it("applies ghost primary classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="primary" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "text-object-primary-enabled")
        ).toBe(true);
        // Ghost variant doesn't have background or border by default
        expect(
          StyleHelpers.hasClass(button, "bg-surface-primary-high-enabled")
        ).toBe(false);
      });

      it("applies ghost neutral classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="neutral" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "text-object-neutral-middle")
        ).toBe(true);
      });

      it("applies ghost negative classes", () => {
        testContainer.render(
          <IconButton variant="ghost" theme="negative" icon="plus" />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(button, "text-object-negative-enabled")
        ).toBe(true);
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

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-high-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:text-object-inverse")
      ).toBe(true);
      // Figma 刷新で solid の枠線が消えたため disabled:border-none も不要になった
      // en: disabled:border-none is no longer needed because the solid border is gone.
      expect(StyleHelpers.hasClass(button, "border")).toBe(false);
    });

    it("applies disabled styling for outline variant", () => {
      testContainer.render(
        <IconButton variant="outline" theme="primary" icon="plus" isDisabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-low-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:text-object-primary-disabled")
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:border-border-primary-low")
      ).toBe(true);
    });

    it("applies disabled styling for ghost variant", () => {
      testContainer.render(
        <IconButton variant="ghost" theme="primary" icon="plus" isDisabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-low-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:text-object-primary-disabled")
      ).toBe(true);
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

    // native の disabled でも無効状態のスタイルが当たること（goodpatch/sparkle-design#305）
    // en: The native `disabled` prop must also apply the disabled styles (#305).
    it("applies disabled styling with the native disabled prop", () => {
      testContainer.render(
        <IconButton variant="solid" theme="primary" icon="plus" disabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-high-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:text-object-inverse")
      ).toBe(true);
      expect(StyleHelpers.hasClass(button, "cursor-not-allowed")).toBe(true);
    });

    it("applies disabled styling with the native disabled prop for outline variant", () => {
      testContainer.render(
        <IconButton variant="outline" theme="primary" icon="plus" disabled />
      );
      const button = testContainer.queryButton();

      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-low-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(button, "disabled:text-object-primary-disabled")
      ).toBe(true);
    });

    // 無効状態では有効時の hover / active クラスを出力しないこと（goodpatch/sparkle-design#305 のコメント）
    // en: Disabled buttons must not emit the enabled hover / active classes (#305 comment).
    it.each([
      ["primary", "hover:bg-surface-primary-low-hover"],
      ["neutral", "hover:bg-surface-neutral-low-hover"],
      ["negative", "hover:bg-surface-negative-low-hover"],
    ] as const)(
      "does not emit enabled hover classes for disabled outline %s",
      (theme, hoverClass) => {
        testContainer.render(
          <IconButton variant="outline" theme={theme} icon="plus" isDisabled />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, hoverClass)).toBe(false);
      }
    );
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
    // asChild で差し込んだ要素がレンダリングされること（goodpatch/sparkle-design#304）
    // en: The slotted element must actually be rendered (#304).
    it("renders the slotted element instead of a button", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く">
          <a href="/foo" aria-label="開く" data-testid="custom-element" />
        </IconButton>
      );
      const container = testContainer.getContainer();

      const link = container.querySelector<HTMLAnchorElement>(
        '[data-testid="custom-element"]'
      );
      expect(link).not.toBeNull();
      expect(link?.tagName).toBe("A");
      expect(link?.getAttribute("href")).toBe("/foo");
      expect(container.querySelector("button")).toBeNull();
    });

    it("renders the icon inside the slotted element", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く">
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");
      const iconSpan = link.querySelector('span[aria-hidden="true"]');

      expect(iconSpan).not.toBeNull();
      expect(iconSpan?.textContent).toBe("open_in_new");
    });

    it("keeps the slotted element's own children", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く">
          <a href="/foo">
            <span data-testid="own-child">Custom element</span>
          </a>
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.querySelector('[data-testid="own-child"]')).not.toBeNull();
      expect(link.textContent).toContain("Custom element");
    });

    it("merges the button classes onto the slotted element", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く">
          <a href="/foo" aria-label="開く" className="my-link" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(StyleHelpers.hasClass(link, "my-link")).toBe(true);
      expect(
        StyleHelpers.hasClass(link, "bg-surface-primary-high-enabled")
      ).toBe(true);
    });

    // <a> に button 専用の属性を渡さないこと
    // en: Button-only attributes must not be forwarded to elements like <a>.
    it("does not forward button-only attributes to the slotted element", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く">
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.hasAttribute("type")).toBe(false);
      expect(link.hasAttribute("disabled")).toBe(false);
    });

    it("marks aria-disabled and warns when the slotted element is disabled", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isDisabled>
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.getAttribute("aria-disabled")).toBe("true");
      expect(link.getAttribute("data-disabled")).toBe("true");
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("[IconButton] asChild + disabled/loading")
      );

      warnSpy.mockRestore();
    });

    it("does not trigger click events when the slotted element is disabled", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const handleClick = vi.fn();

      testContainer.render(
        <IconButton
          asChild
          icon="open_in_new"
          aria-label="開く"
          isDisabled
          onClick={handleClick}
        >
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      // cancelable: true で dispatch し、preventDefault による遷移抑止まで検証する
      // en: Dispatch as cancelable so the preventDefault-based activation guard is exercised.
      EventHelpers.click(link, { cancelable: true });
      EventHelpers.keyDown(link, "Enter");

      expect(handleClick).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it("forwards ref to the slotted element", () => {
      const ref = React.createRef<HTMLAnchorElement>();

      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" ref={ref}>
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe("A");
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
