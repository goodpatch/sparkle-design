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
    // console.warn の spy が後続テストに漏れないよう必ず復元する
    // en: Always restore spies (e.g. console.warn) so they do not leak into later tests.
    vi.restoreAllMocks();
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
    // isDisabled と native disabled の双方を確認する
    // en: Disabled buttons must not emit the enabled hover / active classes (#305 comment),
    // for both `isDisabled` and the native `disabled` prop.
    it.each([
      [
        "primary",
        "hover:bg-surface-primary-low-hover",
        "active:bg-surface-primary-low-active",
      ],
      [
        "neutral",
        "hover:bg-surface-neutral-low-hover",
        "active:bg-surface-neutral-low-active",
      ],
      [
        "negative",
        "hover:bg-surface-negative-low-hover",
        "active:bg-surface-negative-low-active",
      ],
    ] as const)(
      "does not emit enabled hover / active classes for disabled outline %s",
      (theme, hoverClass, activeClass) => {
        testContainer.render(
          <IconButton variant="outline" theme={theme} icon="plus" isDisabled />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, hoverClass)).toBe(false);
        expect(StyleHelpers.hasClass(button, activeClass)).toBe(false);
      }
    );

    it.each([
      ["primary", "hover:bg-surface-primary-low-hover"],
      ["neutral", "hover:bg-surface-neutral-low-hover"],
      ["negative", "hover:bg-surface-negative-low-hover"],
    ] as const)(
      "does not emit enabled hover classes for outline %s with the native disabled prop",
      (theme, hoverClass) => {
        testContainer.render(
          <IconButton variant="outline" theme={theme} icon="plus" disabled />
        );
        const button = testContainer.queryButton();

        expect(StyleHelpers.hasClass(button, hoverClass)).toBe(false);
      }
    );

    it.each(["solid", "outline", "ghost"] as const)(
      "applies the disabled styles for %s with the native disabled prop",
      variant => {
        testContainer.render(
          <IconButton variant={variant} theme="neutral" icon="plus" disabled />
        );
        const button = testContainer.queryButton();

        expect(
          StyleHelpers.hasClass(
            button,
            variant === "solid"
              ? "disabled:bg-surface-neutral-high-disabled"
              : "disabled:bg-surface-neutral-low-disabled"
          )
        ).toBe(true);
      }
    );
    // disabled: を足したのに aria-disabled: を足し忘れると asChild で配色が欠ける。
    // 逆に aria-disabled: だけ書くと native button で配色が欠けるので、両方向を確認する
    // en: A `disabled:` without its `aria-disabled:` pair breaks the asChild case, and the reverse
    // breaks the native button case — so check both directions (#311).
    it.each(
      (["solid", "outline", "ghost"] as const).flatMap(variant =>
        (["primary", "neutral", "negative"] as const).map(
          theme => [variant, theme] as const
        )
      )
    )(
      "pairs every disabled utility with an aria-disabled counterpart (%s / %s)",
      (variant, theme) => {
        testContainer.render(
          <IconButton
            variant={variant}
            theme={theme}
            icon="plus"
            aria-label="追加"
            isDisabled
          />
        );
        const classes = Array.from(testContainer.queryButton().classList);
        const suffixesOf = (prefix: string) =>
          classes
            .filter(name => name.startsWith(prefix))
            .map(name => name.slice(prefix.length))
            .sort();

        const disabledUtilities = suffixesOf("disabled:");

        // 配色クラスが 1 つも無ければテストが空振りしているので、まず下限を確認する
        // en: Guard against a vacuous run: there must be real color utilities to compare.
        expect(disabledUtilities.length).toBeGreaterThanOrEqual(2);
        expect(suffixesOf("aria-disabled:")).toEqual(disabledUtilities);
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

    // <a> に button 専用の属性を渡さないこと（利用者が type を明示した場合も含む）
    // en: Button-only attributes must not be forwarded to elements like <a>,
    // including when the caller passes `type` explicitly.
    it("does not forward button-only attributes to the slotted element", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" type="submit">
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.hasAttribute("type")).toBe(false);
    });

    it("does not set the disabled attribute on a non-button slotted element", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isDisabled>
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.hasAttribute("disabled")).toBe(false);
      expect(link.getAttribute("aria-disabled")).toBe("true");
    });

    // 差し込み先が button の場合は、その要素自身の type を尊重する
    // en: When the slotted element is a button, its own `type` is preserved.
    it("keeps the slotted button's own type", () => {
      testContainer.render(
        <IconButton asChild icon="send" aria-label="送信">
          <button type="submit" />
        </IconButton>
      );
      const button = testContainer.queryButton();

      expect(button.getAttribute("type")).toBe("submit");
    });

    // 差し込み先が type 未指定の button なら、暗黙の submit を避けるため type="button" を補う
    // en: A slotted button without an explicit type gets type="button" to avoid implicit submit.
    it("defaults the slotted button's type to button", () => {
      testContainer.render(
        <IconButton asChild icon="send" aria-label="送信">
          <button />
        </IconButton>
      );
      const button = testContainer.queryButton();

      expect(button.getAttribute("type")).toBe("button");
    });

    // 差し込み先が native の button なら、native の disabled と無効スタイルがそのまま効く
    // en: A slotted native button receives the real `disabled` attribute and the disabled styles.
    it("forwards the native disabled state to a slotted button", () => {
      testContainer.render(
        <IconButton asChild icon="send" aria-label="送信" isDisabled>
          <button />
        </IconButton>
      );
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(true);
      expect(button.hasAttribute("aria-disabled")).toBe(false);
      expect(
        StyleHelpers.hasClass(
          button,
          "disabled:bg-surface-primary-high-disabled"
        )
      ).toBe(true);
    });

    it("renders the spinner inside the slotted element while loading", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isLoading>
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.querySelector(".animate-spin")).not.toBeNull();
      expect(link.textContent).not.toContain("open_in_new");
    });

    // button 以外を差し込んだ無効時は、aria-disabled と aria-disabled: 由来の配色で表現する
    // en: For a disabled non-button slot, the state is expressed via aria-disabled and its utilities.
    it("marks aria-disabled and applies the aria-disabled styles when the slotted element is disabled", () => {
      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isDisabled>
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      expect(link.getAttribute("aria-disabled")).toBe("true");
      expect(link.getAttribute("data-disabled")).toBe("true");
      expect(
        StyleHelpers.hasClass(
          link,
          "aria-disabled:bg-surface-primary-high-disabled"
        )
      ).toBe(true);
      expect(
        StyleHelpers.hasClass(link, "aria-disabled:text-object-inverse")
      ).toBe(true);
    });

    // 無効時は IconButton 側のハンドラだけでなく、差し込んだ要素自身のハンドラも抑止する。
    // Radix Slot は子のハンドラを先に呼ぶため、capture フェーズで止める必要がある
    // en: When disabled, both the IconButton handler and the slotted element's own handler must be
    // blocked. Radix Slot calls the child's handler first, so the guard runs in the capture phase.
    it("does not trigger click events when the slotted element is disabled", () => {
      const handleClick = vi.fn();
      const slottedClick = vi.fn();

      testContainer.render(
        <IconButton
          asChild
          icon="open_in_new"
          aria-label="開く"
          isDisabled
          onClick={handleClick}
        >
          <a href="/foo" aria-label="開く" onClick={slottedClick} />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      // cancelable: true で dispatch し、戻り値で preventDefault による遷移抑止まで検証する
      // en: Dispatch as cancelable and use the return value to verify preventDefault was applied.
      const notCanceled = EventHelpers.click(link, { cancelable: true });

      expect(handleClick).not.toHaveBeenCalled();
      expect(slottedClick).not.toHaveBeenCalled();
      expect(notCanceled).toBe(false);
    });

    it("does not trigger Enter activation when the slotted element is disabled", () => {
      const handleKeyDown = vi.fn();

      testContainer.render(
        <IconButton
          asChild
          icon="open_in_new"
          aria-label="開く"
          isDisabled
          onKeyDown={handleKeyDown}
        >
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      const notCanceled = EventHelpers.keyDown(link, "Enter", {
        cancelable: true,
      });

      expect(handleKeyDown).not.toHaveBeenCalled();
      expect(notCanceled).toBe(false);
    });

    // 有効時はハンドラが素通しされること（ガードが常に握り潰す実装への退行を防ぐ）
    // en: Handlers must pass through while enabled (guards against a regression that always blocks).
    it("passes click and keydown through when the slotted element is enabled", () => {
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      const slottedClick = vi.fn();

      testContainer.render(
        <IconButton
          asChild
          icon="open_in_new"
          aria-label="開く"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <a
            href="/foo"
            aria-label="開く"
            onClick={event => {
              // jsdom の未実装ナビゲーションを避けるため、差し込み側で既定動作を止める
              // en: Cancel the default action here so jsdom's unimplemented navigation is not hit.
              event.preventDefault();
              slottedClick();
            }}
          />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      EventHelpers.click(link, { cancelable: true });
      EventHelpers.keyDown(link, "Enter", { cancelable: true });

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(slottedClick).toHaveBeenCalledTimes(1);
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it.each([
      ["outline", "aria-disabled:border-border-primary-low"],
      ["ghost", "aria-disabled:text-object-primary-disabled"],
    ] as const)(
      "applies the aria-disabled utilities for the %s variant on a slotted link",
      (variant, utility) => {
        testContainer.render(
          <IconButton
            asChild
            variant={variant}
            icon="open_in_new"
            aria-label="開く"
            isDisabled
          >
            <a href="/foo" aria-label="開く" />
          </IconButton>
        );

        expect(
          StyleHelpers.hasClass(
            testContainer.querySelector<HTMLAnchorElement>("a"),
            utility
          )
        ).toBe(true);
      }
    );

    // 利用者が aria-disabled を直接渡した場合、見た目と挙動が食い違わないこと
    // en: A caller-provided aria-disabled must not leave the look and the behavior out of sync.
    it("blocks activation when the caller sets aria-disabled directly", () => {
      const handleClick = vi.fn();

      testContainer.render(
        <IconButton
          icon="plus"
          aria-label="追加"
          aria-disabled
          onClick={handleClick}
        />
      );
      const button = testContainer.queryButton();

      expect(button.disabled).toBe(false);
      expect(button.getAttribute("aria-disabled")).toBe("true");
      expect(
        StyleHelpers.hasClass(
          button,
          "aria-disabled:bg-surface-primary-high-disabled"
        )
      ).toBe(true);
      expect(EventHelpers.click(button, { cancelable: true })).toBe(false);
      expect(handleClick).not.toHaveBeenCalled();
    });

    // Slot は子のハンドラを先に呼ぶため、capture 同士でも子が先になる
    // en: Slot calls the child's handler first, even capture-to-capture.
    it("suppresses the slotted element's own capture handlers when disabled", () => {
      const slottedClickCapture = vi.fn();
      const slottedKeyDownCapture = vi.fn();

      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isDisabled>
          <a
            href="/foo"
            aria-label="開く"
            onClickCapture={slottedClickCapture}
            onKeyDownCapture={slottedKeyDownCapture}
          />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      EventHelpers.click(link, { cancelable: true });
      EventHelpers.keyDown(link, "Enter", { cancelable: true });

      expect(slottedClickCapture).not.toHaveBeenCalled();
      expect(slottedKeyDownCapture).not.toHaveBeenCalled();
    });

    // 対象の props を網羅して検証する（1 つ落とし忘れても検知できるようにするため）
    // en: Cover every targeted prop so that dropping one from the list is caught.
    const BUTTON_ONLY_PROPS = {
      type: "submit",
      form: "my-form",
      formAction: "/submit",
      formEncType: "multipart/form-data",
      formMethod: "post",
      formNoValidate: true,
      formTarget: "_blank",
      value: "save",
      popoverTarget: "sheet",
      popoverTargetAction: "toggle",
    } as const;

    const BUTTON_ONLY_ATTRIBUTES = [
      "type",
      "form",
      "formaction",
      "formenctype",
      "formmethod",
      "formnovalidate",
      "formtarget",
      "value",
      "popovertarget",
      "popovertargetaction",
    ] as const;

    // 対象の props を網羅して検証する（goodpatch/sparkle-design#315）
    // en: Cover every targeted prop (#315).
    it("drops every button-only prop on a non-button slotted element", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton
          asChild
          icon="open_in_new"
          aria-label="開く"
          {...BUTTON_ONLY_PROPS}
        >
          <a href="/foo" aria-label="開く" />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      for (const attribute of BUTTON_ONLY_ATTRIBUTES) {
        expect(link.hasAttribute(attribute)).toBe(false);
      }
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("は無視されます")
      );
    });

    it("forwards every button-only prop to a slotted native button", () => {
      testContainer.render(
        <IconButton
          asChild
          icon="send"
          aria-label="送信"
          {...BUTTON_ONLY_PROPS}
        >
          <button />
        </IconButton>
      );
      const button = testContainer.queryButton();

      for (const attribute of BUTTON_ONLY_ATTRIBUTES) {
        expect(button.hasAttribute(attribute)).toBe(true);
      }
    });

    it("keeps the computed disabled state over the slotted button's own disabled", () => {
      testContainer.render(
        <IconButton asChild icon="send" aria-label="送信" isDisabled>
          <button disabled={false} />
        </IconButton>
      );

      expect(testContainer.queryButton().disabled).toBe(true);
    });

    it("suppresses auxclick on a disabled slotted link", () => {
      const slottedAuxClick = vi.fn();

      testContainer.render(
        <IconButton asChild icon="open_in_new" aria-label="開く" isDisabled>
          <a href="/foo" aria-label="開く" onAuxClick={slottedAuxClick} />
        </IconButton>
      );
      const link = testContainer.querySelector<HTMLAnchorElement>("a");

      const notCanceled = EventHelpers.auxClick(link, { cancelable: true });

      expect(slottedAuxClick).not.toHaveBeenCalled();
      expect(notCanceled).toBe(false);
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

  describe("Development Warnings", () => {
    // asChild に単一要素以外を渡すと Slot が何も描画しないため、無音の故障になりやすい
    // en: asChild with anything but a single element renders nothing — a silent failure.
    it("warns and renders nothing when asChild has no element child", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton asChild icon="plus" aria-label="追加" />
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("[IconButton] asChild には単一の React 要素")
      );
      expect(testContainer.getContainer().innerHTML).toBe("");
    });

    it("warns when children are passed without asChild", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton icon="plus" aria-label="追加">
          ラベル
        </IconButton>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("children は描画されません")
      );
      expect(testContainer.queryButton().textContent).toBe("plus");
    });

    // asChild では差し込んだ要素側にアクセシブルネームが必要（アイコンは aria-hidden のため）
    // en: With asChild the slotted element needs an accessible name (the icon is aria-hidden).
    it("warns when neither the button nor the slotted element has an accessible name", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton asChild icon="plus">
          <span data-testid="slotted" />
        </IconButton>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("aria-label を指定してください")
      );
    });

    it.each([
      [
        "the slotted element has aria-label",
        <span key="labelled" aria-label="追加" />,
      ],
      [
        "the slotted element has text content",
        <span key="text">追加する</span>,
      ],
    ])("does not warn about the accessible name when %s", (_case, child) => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      testContainer.render(
        <IconButton asChild icon="plus">
          {child}
        </IconButton>
      );

      expect(warnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("aria-label を指定してください")
      );
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
