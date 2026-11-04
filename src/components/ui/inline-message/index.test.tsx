/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { TestContainer } from "@/test/helpers";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

// InlineMessage コンポーネントの基本動作テスト / en: basic behavior tests
describe("InlineMessage", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("renders title & description (children) and wires aria attributes", () => {
    testContainer.render(
      <InlineMessage status="info">
        <InlineMessageTitle>タイトル</InlineMessageTitle>
        <InlineMessageDescription>説明</InlineMessageDescription>
      </InlineMessage>
    );
    const root = screen.getByRole("alert");
    const title = screen.getByText("タイトル");
    const desc = screen.getByText("説明");
    expect(root.getAttribute("aria-labelledby")).toBe(title.id);
    expect(root.getAttribute("aria-describedby")).toBe(desc.id);
  });

  it("renders close button when onClose & isCloseTrigger true", () => {
    const handler = () => {};
    testContainer.render(
      <InlineMessage status="info" onClose={handler} isCloseTrigger>
        <InlineMessageTitle>タイトル</InlineMessageTitle>
        <InlineMessageDescription>説明</InlineMessageDescription>
      </InlineMessage>
    );
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });

  it("does not set aria-labelledby when no title is provided", () => {
    testContainer.render(
      <InlineMessage status="info">
        <InlineMessageDescription>説明のみ</InlineMessageDescription>
      </InlineMessage>
    );
    const root = screen.getByRole("alert");
    const desc = screen.getByText("説明のみ");
    expect(root.hasAttribute("aria-labelledby")).toBe(false);
    expect(root.getAttribute("aria-describedby")).toBe(desc.id);
  });
});

describe("InlineMessage のモーション", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
    vi.restoreAllMocks();
  });

  const renderClosable = (onClose: () => void) =>
    testContainer.render(
      <InlineMessage status="info" onClose={onClose}>
        <InlineMessageTitle>タイトル</InlineMessageTitle>
      </InlineMessage>
    );

  it("上から出て、閉じるときは退場のアニメーションで消える", () => {
    // GIVEN: インラインメッセージ
    // en: GIVEN an inline message
    renderClosable(() => {});
    const root = screen.getByRole("alert");

    // THEN: 出現・退場はモーショントークンで、上から出る
    // en: THEN it enters and exits with the motion tokens, dropping in from above
    [
      "animate-motion-pop-in",
      "[--motion-pop-from-y:-1]",
      "data-[closing]:animate-motion-pop-out",
    ].forEach(cls => expect(root.className).toContain(cls));
  });

  it("退場のアニメーションがあるときは、再生し終えてから onClose を呼ぶ", () => {
    // GIVEN: 退場のアニメーションがかかる環境（jsdom は CSS を適用しないので差し替える）
    // en: GIVEN the message has an exit animation (jsdom applies no CSS, so stub it)
    const original = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation(element => {
      const style = original(element);
      return (element as HTMLElement).hasAttribute("data-closing")
        ? { ...style, animationName: "motion-fade-out, motion-pop-out" }
        : style;
    });
    const onClose = vi.fn();
    renderClosable(onClose);
    const root = screen.getByRole("alert");

    // WHEN: 閉じるボタンを押す
    // en: WHEN the close button is pressed
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));

    // THEN: 退場を再生している間は onClose を呼ばない
    // en: THEN onClose is not called while the exit plays
    expect(root).toHaveAttribute("data-closing");
    expect(onClose).not.toHaveBeenCalled();

    // WHEN: 退場のアニメーションが終わる
    // en: WHEN the exit animation ends
    fireEvent.animationEnd(root);

    // THEN: onClose を呼ぶ
    // en: THEN onClose is called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("アニメーションが無いときは、すぐ onClose を呼ぶ", () => {
    // GIVEN: アニメーションの無い環境（jsdom）
    // en: GIVEN no animation (jsdom)
    const onClose = vi.fn();
    renderClosable(onClose);

    // WHEN: 閉じるボタンを押す
    // en: WHEN the close button is pressed
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));

    // THEN: 待たずに onClose を呼ぶ
    // en: THEN onClose is called without waiting
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
