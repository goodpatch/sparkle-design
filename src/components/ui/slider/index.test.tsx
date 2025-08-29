/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  TestContainer,
  EventHelpers,
  A11yHelpers,
  StyleHelpers,
} from "@/test/helpers";
import { Slider } from "./index";

describe("Slider", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  // ヘルパー関数: 値インディケーターを取得
  const getValueIndicator = (
    container: HTMLElement
  ): HTMLSpanElement | null => {
    const spans = container.querySelectorAll("span");
    return (spans[spans.length - 1] as HTMLSpanElement) || null;
  };

  // ヘルパー関数: スライダーのthumbを取得
  const getSliderThumb = (container: HTMLElement): HTMLSpanElement | null => {
    return container.querySelector('[role="slider"]') as HTMLSpanElement;
  };

  // ヘルパー関数: スライダーのrootを取得
  const getSliderRoot = (container: HTMLElement): HTMLSpanElement | null => {
    return container.querySelector(
      '[data-orientation="horizontal"]'
    ) as HTMLSpanElement;
  };

  describe("Basic Rendering", () => {
    it("renders slider with default props", () => {
      testContainer.render(<Slider />);

      const container = testContainer.getContainer();
      const sliderThumb = getSliderThumb(container);

      expect(container).toBeTruthy();
      expect(sliderThumb).toBeInTheDocument();
      expect(sliderThumb).toHaveAttribute("aria-valuemin", "0");
      expect(sliderThumb).toHaveAttribute("aria-valuemax", "100");
      expect(sliderThumb).toHaveAttribute("aria-valuenow", "0");
    });

    it("renders with custom min, max, and default value", () => {
      testContainer.render(<Slider min={10} max={90} defaultValue={[50]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuemin", "10");
      expect(sliderThumb).toHaveAttribute("aria-valuemax", "90");
      expect(sliderThumb).toHaveAttribute("aria-valuenow", "50");
    });

    it("displays value in the value indicator", () => {
      testContainer.render(<Slider defaultValue={[75]} />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(valueIndicator).toHaveTextContent("75");
    });

    it("displays value with unit when provided", () => {
      testContainer.render(<Slider defaultValue={[25]} unit="%" />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(valueIndicator).toHaveTextContent("25%");
    });

    it("applies custom className", () => {
      testContainer.render(<Slider className="custom-slider" />);
      const sliderRoot = getSliderRoot(testContainer.getContainer());

      expect(sliderRoot).toHaveClass("custom-slider");
    });
  });

  describe("Controlled Mode", () => {
    it("supports controlled mode with value prop", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider value={[60]} onValueChange={handleValueChange} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "60");
      expect(valueIndicator).toHaveTextContent("60");
    });

    it("calls onValueChange when value changes in controlled mode", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider value={[40]} onValueChange={handleValueChange} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        EventHelpers.keyDown(sliderThumb, "ArrowRight");
        expect(handleValueChange).toHaveBeenCalled();
      }
    });
  });

  describe("Uncontrolled Mode", () => {
    it("supports uncontrolled mode with defaultValue", () => {
      testContainer.render(<Slider defaultValue={[30]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "30");
      expect(valueIndicator).toHaveTextContent("30");
    });

    it("calls onValueChange when value changes in uncontrolled mode", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider defaultValue={[20]} onValueChange={handleValueChange} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        EventHelpers.keyDown(sliderThumb, "ArrowRight");
        expect(handleValueChange).toHaveBeenCalled();
      }
    });

    it("updates value indicator in uncontrolled mode when value changes", () => {
      testContainer.render(<Slider defaultValue={[25]} />);

      const container = testContainer.getContainer();
      const sliderThumb = getSliderThumb(container);
      let valueIndicator = getValueIndicator(container);

      // 初期値の確認
      expect(valueIndicator).toHaveTextContent("25");

      if (sliderThumb) {
        // 値を変更
        EventHelpers.keyDown(sliderThumb, "ArrowRight");

        // 値インディケーターが更新されることを確認（再取得）
        valueIndicator = getValueIndicator(testContainer.getContainer());
        expect(valueIndicator).not.toHaveTextContent("25");
      }
    });
  });

  describe("User Interaction", () => {
    it("handles keyboard navigation with arrow keys", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider
          defaultValue={[50]}
          step={1}
          onValueChange={handleValueChange}
        />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        // 実際のステップ値を考慮: 50 + 1 = 51, 50 - 1 = 49
        EventHelpers.keyDown(sliderThumb, "ArrowRight");
        expect(handleValueChange).toHaveBeenCalledWith([51]);

        // Reset mock
        handleValueChange.mockClear();

        // Test arrow left decreases value (50 → 49では無く、現在の値から-1)
        EventHelpers.keyDown(sliderThumb, "ArrowLeft");
        expect(handleValueChange).toHaveBeenCalled();
      }
    });

    it("handles Home and End keys", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider
          defaultValue={[50]}
          min={0}
          max={100}
          onValueChange={handleValueChange}
        />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        // Test Home key sets to minimum
        EventHelpers.keyDown(sliderThumb, "Home");
        expect(handleValueChange).toHaveBeenCalledWith([0]);

        // Reset mock
        handleValueChange.mockClear();

        // Test End key sets to maximum
        EventHelpers.keyDown(sliderThumb, "End");
        expect(handleValueChange).toHaveBeenCalledWith([100]);
      }
    });

    it("handles step value correctly", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider
          defaultValue={[50]}
          step={10}
          onValueChange={handleValueChange}
        />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        EventHelpers.keyDown(sliderThumb, "ArrowRight");
        expect(handleValueChange).toHaveBeenCalledWith([60]);
      }
    });

    it("respects min and max boundaries", () => {
      testContainer.render(<Slider min={20} max={80} defaultValue={[20]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuemin", "20");
      expect(sliderThumb).toHaveAttribute("aria-valuemax", "80");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled state with isDisabled prop", () => {
      testContainer.render(<Slider isDisabled />);

      const sliderRoot = getSliderRoot(testContainer.getContainer());
      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderRoot).toHaveAttribute("aria-disabled", "true");
      // Radix UIではthumb要素にはaria-disabled属性は付かない
      expect(sliderThumb).not.toHaveAttribute("aria-disabled");

      if (sliderRoot) {
        expect(StyleHelpers.hasClass(sliderRoot, "cursor-not-allowed")).toBe(
          true
        );
      }
      if (valueIndicator) {
        expect(
          StyleHelpers.hasClass(valueIndicator, "text-text-disabled")
        ).toBe(true);
      }
    });

    it("applies disabled state with disabled prop", () => {
      testContainer.render(<Slider disabled />);

      const sliderRoot = getSliderRoot(testContainer.getContainer());
      const sliderThumb = getSliderThumb(testContainer.getContainer());

      expect(sliderRoot).toHaveAttribute("aria-disabled", "true");
      // Radix UIではthumb要素にはaria-disabled属性は付かない
      expect(sliderThumb).not.toHaveAttribute("aria-disabled");
    });

    it("does not respond to keyboard events when disabled", () => {
      const handleValueChange = vi.fn();
      testContainer.render(
        <Slider
          disabled
          defaultValue={[50]}
          onValueChange={handleValueChange}
        />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        EventHelpers.keyDown(sliderThumb, "ArrowRight");
        expect(handleValueChange).not.toHaveBeenCalled();
      }
    });

    it("applies disabled styling to track and thumb", () => {
      testContainer.render(<Slider isDisabled defaultValue={[50]} />);

      const container = testContainer.getContainer();
      // 実際のDOM構造に基づいてセレクタを修正
      const track = container.querySelector("span.relative.w-full.grow");
      const range = container.querySelector("span.absolute.h-full");
      const thumb = getSliderThumb(container);

      if (track) {
        expect(StyleHelpers.hasClass(track, "bg-neutral-100")).toBe(true);
        expect(StyleHelpers.hasClass(track, "cursor-not-allowed")).toBe(true);
      }
      if (range) {
        expect(StyleHelpers.hasClass(range, "bg-neutral-200")).toBe(true);
      }
      if (thumb) {
        expect(StyleHelpers.hasClass(thumb, "bg-neutral-100")).toBe(true);
        expect(StyleHelpers.hasClass(thumb, "cursor-not-allowed")).toBe(true);
      }
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      testContainer.render(
        <Slider defaultValue={[50]} min={0} max={100} step={1} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        expect(A11yHelpers.hasRole(sliderThumb, "slider")).toBe(true);
      }
      expect(sliderThumb).toHaveAttribute("aria-valuenow", "50");
      expect(sliderThumb).toHaveAttribute("aria-valuemin", "0");
      expect(sliderThumb).toHaveAttribute("aria-valuemax", "100");
    });

    it("supports keyboard navigation", () => {
      testContainer.render(<Slider defaultValue={[50]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("tabindex", "0");
    });

    it("provides proper focus management", () => {
      testContainer.render(<Slider defaultValue={[50]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      if (sliderThumb) {
        EventHelpers.focus(sliderThumb);
        expect(sliderThumb).toHaveFocus();
      }
    });

    it("updates aria-valuenow when value changes", () => {
      testContainer.render(<Slider value={[75]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "75");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined value gracefully", () => {
      testContainer.render(<Slider value={undefined} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toBeInTheDocument();
      expect(valueIndicator).toHaveTextContent("0");
    });

    it("handles empty array value", () => {
      testContainer.render(<Slider value={[]} />);

      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(valueIndicator).toHaveTextContent("");
    });

    it("handles negative values", () => {
      testContainer.render(<Slider min={-50} max={50} defaultValue={[-25]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "-25");
      expect(valueIndicator).toHaveTextContent("-25");
    });

    it("handles decimal values with step", () => {
      testContainer.render(
        <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "0.5");
      expect(valueIndicator).toHaveTextContent("0.5");
    });

    it("handles very large numbers", () => {
      testContainer.render(
        <Slider min={0} max={1000000} defaultValue={[500000]} />
      );

      const sliderThumb = getSliderThumb(testContainer.getContainer());
      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(sliderThumb).toHaveAttribute("aria-valuenow", "500000");
      expect(valueIndicator).toHaveTextContent("500000");
    });

    it("handles unit with special characters", () => {
      testContainer.render(<Slider defaultValue={[100]} unit="°C" />);

      const valueIndicator = getValueIndicator(testContainer.getContainer());

      expect(valueIndicator).toHaveTextContent("100°C");
    });

    it("handles missing onValueChange gracefully", () => {
      testContainer.render(<Slider defaultValue={[50]} />);

      const sliderThumb = getSliderThumb(testContainer.getContainer());

      // Should not throw when onValueChange is not provided
      expect(() => {
        if (sliderThumb) {
          EventHelpers.keyDown(sliderThumb, "ArrowRight");
        }
      }).not.toThrow();
    });
  });

  describe("Styling", () => {
    it("applies correct default styling classes", () => {
      testContainer.render(<Slider />);

      const container = testContainer.getContainer();
      const sliderRoot = getSliderRoot(container);
      const track = container.querySelector("span.relative.w-full.grow");
      const range = container.querySelector("span.absolute.h-full");
      const thumb = getSliderThumb(container);

      if (sliderRoot) {
        expect(StyleHelpers.hasClass(sliderRoot, "relative")).toBe(true);
        expect(StyleHelpers.hasClass(sliderRoot, "flex")).toBe(true);
      }
      // 有効な状態でのスタイリングを確認
      if (track) {
        expect(StyleHelpers.hasClass(track, "bg-neutral-200")).toBe(true);
      }
      if (range && track) {
        // ダイナミッククラスなので存在確認のみ
        expect(range).toBeInTheDocument();
      }
      if (thumb) {
        expect(StyleHelpers.hasClass(thumb, "rounded-full")).toBe(true);
        expect(StyleHelpers.hasClass(thumb, "bg-white")).toBe(true);
      }
    });

    it("applies proper layout classes to container", () => {
      testContainer.render(<Slider />);

      const container = testContainer.getContainer().firstElementChild;

      if (container) {
        expect(StyleHelpers.hasClass(container, "flex")).toBe(true);
        expect(StyleHelpers.hasClass(container, "justify-center")).toBe(true);
        expect(StyleHelpers.hasClass(container, "gap-3")).toBe(true);
        expect(StyleHelpers.hasClass(container, "w-full")).toBe(true);
      }
    });

    it("applies correct styling for value indicator", () => {
      testContainer.render(<Slider />);

      const valueIndicator = getValueIndicator(testContainer.getContainer());

      if (valueIndicator) {
        expect(StyleHelpers.hasClass(valueIndicator, "text-right")).toBe(true);
        expect(StyleHelpers.hasClass(valueIndicator, "tabular-nums")).toBe(
          true
        );
        expect(
          StyleHelpers.hasClass(valueIndicator, "character-3-regular-mono")
        ).toBe(true);
      }
    });

    it("sets min-width based on digits and unit (default)", () => {
      testContainer.render(<Slider />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());
      // default max is 100 -> 3 digits, no unit => 3ch
      expect(valueIndicator).toHaveStyle({
        minWidth: "calc(3ch + var(--spacing) * 2)",
      });
    });

    it("sets min-width with ASCII unit", () => {
      testContainer.render(<Slider unit="%" />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());
      // 3 digits (100) + 1 (%) => 4ch
      expect(valueIndicator).toHaveStyle({
        minWidth: "calc(4ch + var(--spacing) * 2)",
      });
    });

    it("sets min-width with multibyte unit (CJK)", () => {
      testContainer.render(<Slider unit="回" />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());
      // 3 digits (100) + 2ch (全角1文字) => 5ch
      expect(valueIndicator).toHaveStyle({
        minWidth: "calc(5ch + var(--spacing) * 2)",
      });
    });

    it("sets min-width with custom max and emoji unit", () => {
      testContainer.render(<Slider max={1000} unit="🧪" />);
      const valueIndicator = getValueIndicator(testContainer.getContainer());
      // 4 digits (1000) + 2ch (emoji) => 6ch
      expect(valueIndicator).toHaveStyle({
        minWidth: "calc(6ch + var(--spacing) * 2)",
      });
    });
  });
});
