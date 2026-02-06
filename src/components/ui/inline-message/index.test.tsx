/**
 * @jest-environment jsdom
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";
import { TestContainer } from "@/test/helpers";

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
