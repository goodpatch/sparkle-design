/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { TestContainer } from "@/test/helpers";
import { Modal, ModalContent, ModalTitle, type ModalSize } from "./index";

let testContainer: TestContainer;

describe("Modal", () => {
  // Portal-based components (Modal) are challenging to test with jsdom
  // due to portal rendering behavior and DOM limitations.
  // These components require more complex setup and potentially headless browser testing.

  it.todo("should render modal with trigger");
  it.todo("should open modal when triggered");
  it.todo("should close modal with close button");
  it.todo("should handle overlay clicks for closure");
  it.todo("should support keyboard navigation (Escape key)");
  it.todo("should trap focus within modal when open");
  it.todo("should return focus to trigger when closed");
});

describe("Modal のサイズ", () => {
  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it.each<[ModalSize, string]>([
    ["sm", "max-w-xs"],
    ["md", "max-w-[512px]"],
    ["lg", "max-w-[672px]"],
    ["xl", "max-w-[1024px]"],
  ])("size=%s は Figma の幅（%s）になる", (size, expectedClass) => {
    // GIVEN: 指定サイズで開いたモーダル
    // en: GIVEN a modal opened with the given size
    testContainer.render(
      <Modal open>
        <ModalContent size={size}>
          <ModalTitle>タイトル</ModalTitle>
        </ModalContent>
      </Modal>
    );

    // WHEN: モーダルの本体を取得する
    // en: WHEN the modal content is queried
    const content = screen.getByRole("dialog");

    // THEN: Figma の size バリアントと同じ最大幅のクラスが付く
    // en: THEN it has the max-width class matching the Figma size variant
    expect(content).toHaveClass(expectedClass);
  });
});

describe("Modal のモーション", () => {
  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("モーショントークンで開閉し、中身はパネルより遅れて出る", () => {
    // GIVEN: 開いたモーダル
    // en: GIVEN an open modal
    testContainer.render(
      <Modal open>
        <ModalContent>
          <ModalTitle>タイトル</ModalTitle>
        </ModalContent>
      </Modal>
    );

    // WHEN: モーダルの本体を取得する
    // en: WHEN the modal content is queried
    const content = screen.getByRole("dialog");

    // THEN: パネルは下から出て、中身はパネルより遅れてフェードインする
    // en: THEN the panel rises from below and its children fade in after it
    [
      "data-[state=open]:animate-motion-pop-in",
      "data-[state=closed]:animate-motion-pop-out",
      "[--motion-pop-from-y:1]",
      "*:animate-motion-content-in",
    ].forEach(cls => expect(content).toHaveClass(cls));

    // THEN: 時間を直書きせず、モーショントークンだけで動かす
    // en: THEN timing comes only from the motion tokens, never hard-coded
    expect(content.className).not.toMatch(
      /\b(animate-in|animate-out|duration-\d+)\b/
    );
  });
});
