/**
 * @jest-environment jsdom
 */

import React from "react";
import { act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
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

  describe("モーション", () => {
    const options = (
      <>
        <SelectTrigger>
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </>
    );
    const renderOpenSelect = (
      props: React.ComponentProps<typeof Select> = {}
    ) =>
      testContainer.render(
        <Select defaultOpen {...props}>
          {options}
        </Select>
      );
    const getContent = () =>
      document.querySelector('[data-slot="select-content"]') as HTMLElement;
    // jsdom は CSS を適用しないので、閉じるときだけ退場のアニメーションがかかるように差し替える
    // en: jsdom applies no CSS, so stub an exit animation on the closing list
    const originalGetComputedStyle = window.getComputedStyle;
    const stubExitAnimation = () => {
      const original = originalGetComputedStyle;
      vi.spyOn(window, "getComputedStyle").mockImplementation(element => {
        const style = original(element);
        if (
          (element as HTMLElement).dataset?.slot === "select-content" &&
          (element as HTMLElement).hasAttribute("data-closing")
        ) {
          return { ...style, animationName: "motion-fade-out, motion-pop-out" };
        }
        return style;
      });
    };

    it("リストはトリガーの側から出て、矢印は開閉に合わせて回る", () => {
      // GIVEN: 開いたセレクト
      // en: GIVEN an open select
      renderOpenSelect();

      // WHEN: リストとトリガーの矢印を取得する
      // en: WHEN the list and the trigger arrow are queried
      const content = document.querySelector(
        '[data-slot="select-content"]'
      ) as HTMLElement;
      const trigger = document.querySelector(
        '[data-slot="select-trigger"]'
      ) as HTMLElement;
      const arrow = trigger.querySelector(
        '[aria-hidden="true"]'
      ) as HTMLElement;

      // THEN: リストはモーショントークンで開閉し、下に開くときは上から出る
      // en: THEN the list uses the motion tokens and drops down from above when opening below
      [
        "data-[state=open]:animate-motion-pop-in",
        "data-[closing]:data-[state=open]:animate-motion-pop-out",
        "data-[side=bottom]:[--motion-pop-from-y:-1]",
      ].forEach(cls => expect(content.className).toContain(cls));
      expect(content.className).not.toMatch(
        /\b(animate-in|animate-out|duration-\d+)\b/
      );

      // THEN: 矢印は状態変化のスプリングで 180° 回る
      // en: THEN the arrow rotates 180° with the state-change spring
      expect(trigger.className).toContain("group/select-trigger");
      [
        "duration-(--motion-settle-duration)",
        "ease-(--motion-settle-ease)",
        "group-data-[state=open]/select-trigger:rotate-180",
      ].forEach(cls => expect(arrow.className).toContain(cls));
    });

    it("項目を選ぶと値はすぐ反映し、見た目だけ点滅してから閉じる", () => {
      // GIVEN: 開いたセレクト
      // en: GIVEN an open select
      vi.useFakeTimers();
      const onOpenChange = vi.fn();
      const onValueChange = vi.fn();
      renderOpenSelect({ onOpenChange, onValueChange });
      const item = document.querySelectorAll(
        '[data-slot="select-item"]'
      )[1] as HTMLElement;

      // WHEN: 2 つ目の項目を Enter で選ぶ
      // en: WHEN the second item is picked with Enter
      fireEvent.keyDown(item, { key: "Enter" });

      // THEN: コールバックはその時点で呼ばれ、リストは点滅のあいだ残る
      // en: THEN the callbacks fire right away and the list stays while the item blinks
      expect(onValueChange).toHaveBeenCalledWith("option2");
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(item).toHaveAttribute("data-blinking");
      expect(item.className).toContain("data-[blinking]:animate-motion-blink");
      expect(getContent()).not.toHaveAttribute("data-closing");

      // WHEN: 点滅の時間（160ms）が過ぎる
      // en: WHEN the blink duration (160ms) has passed
      act(() => {
        vi.advanceTimersByTime(160);
      });

      // THEN: リストを外す（jsdom では退場のアニメーションが無いので待たない）
      // en: THEN the list unmounts (no exit animation in jsdom, so no wait)
      expect(getContent()).toBeNull();
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it("Esc で閉じるときは点滅せず、onOpenChange をすぐ呼ぶ", () => {
      // GIVEN: 開いたセレクト
      // en: GIVEN an open select
      const onOpenChange = vi.fn();
      renderOpenSelect({ onOpenChange });

      // WHEN: Esc を押す
      // en: WHEN Escape is pressed
      fireEvent.keyDown(getContent(), { key: "Escape" });

      // THEN: 点滅せずに閉じる
      // en: THEN it closes without a blink
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(document.querySelector("[data-blinking]")).toBeNull();
      expect(getContent()).toBeNull();
    });

    it("退場のアニメーションがあるときは、onOpenChange はすぐ呼び、再生し終えてからリストを外す", () => {
      // GIVEN: リストに退場のアニメーションがかかる、開いたセレクト
      // en: GIVEN an open select whose list has an exit animation
      stubExitAnimation();
      const onOpenChange = vi.fn();
      renderOpenSelect({ onOpenChange });
      const content = getContent();

      // WHEN: Esc を押す
      // en: WHEN Escape is pressed
      fireEvent.keyDown(content, { key: "Escape" });

      // THEN: onOpenChange はすぐ呼ばれ、退場を再生している間はリストが残る
      // en: THEN onOpenChange fires right away and the list stays while the exit plays
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(content).toHaveAttribute("data-closing");
      expect(getContent()).toBe(content);

      // WHEN: 退場のアニメーションが終わる
      // en: WHEN the exit animation ends
      fireEvent.animationEnd(content);

      // THEN: リストを外す
      // en: THEN the list unmounts
      expect(getContent()).toBeNull();
    });

    it("制御側で open を false にしたときも、退場を再生してからリストを外す", () => {
      // GIVEN: open を制御している、開いたセレクト
      // en: GIVEN an open select whose open state is controlled
      stubExitAnimation();
      testContainer.render(<Select open>{options}</Select>);
      const content = getContent();

      // WHEN: 利用側が open を false にする
      // en: WHEN the consumer sets open to false
      testContainer.render(<Select open={false}>{options}</Select>);

      // THEN: 退場を再生している間はリストが残り、終わると外れる
      // en: THEN the list stays while the exit plays and unmounts when it ends
      expect(content).toHaveAttribute("data-closing");
      fireEvent.animationEnd(content);
      expect(getContent()).toBeNull();
    });
  });
});
