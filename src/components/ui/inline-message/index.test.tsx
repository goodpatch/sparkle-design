/**
 * @jest-environment jsdom
 */

import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, screen } from "@testing-library/react";
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
  });

  const message = (onClose?: () => void) => (
    <InlineMessage status="info" onClose={onClose}>
      <InlineMessageTitle>タイトル</InlineMessageTitle>
    </InlineMessage>
  );

  it("後から表示されたものは、上から出る", () => {
    // GIVEN: クライアントで表示したインラインメッセージ
    // en: GIVEN an inline message shown on the client
    testContainer.render(message());
    const root = screen.getByRole("alert");

    // THEN: 出現はモーショントークンで、上から出る
    // en: THEN it enters with the motion tokens, dropping in from above
    expect(root).toHaveAttribute("data-appear");
    ["data-[appear]:animate-motion-pop-in", "[--motion-pop-from-y:-1]"].forEach(
      cls => expect(root.className).toContain(cls)
    );
  });

  it("ページを開いた時点で（SSR で）描かれていたものは、hydration のあとも動かない", async () => {
    // GIVEN: サーバーで描いた HTML
    // en: GIVEN server-rendered HTML
    const html = renderToString(message());
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const root = container.querySelector('[role="alert"]') as HTMLElement;
    expect(root).not.toHaveAttribute("data-appear");

    // WHEN: クライアントで hydration する
    // en: WHEN it is hydrated on the client
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const hydrated = await act(async () => hydrateRoot(container, message()));

    // THEN: 出現は再生せず、hydration の不一致も起きない
    // en: THEN the entrance does not play and there is no hydration mismatch
    expect(root).not.toHaveAttribute("data-appear");
    expect(errors).not.toHaveBeenCalled();

    act(() => hydrated.unmount());
    container.remove();
    errors.mockRestore();
  });

  it("閉じるボタンを押すと、その時点で onClose を呼ぶ", () => {
    // GIVEN: 閉じるボタンのあるインラインメッセージ
    // en: GIVEN an inline message with a close button
    const onClose = vi.fn();
    testContainer.render(message(onClose));

    // WHEN: 閉じるボタンを押す
    // en: WHEN the close button is pressed
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));

    // THEN: アニメーションを待たずに onClose を呼ぶ
    // en: THEN onClose is called without waiting for an animation
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
