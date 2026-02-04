import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

// InlineMessage コンポーネントの基本動作テスト / en: basic behavior tests
describe("InlineMessage", () => {
  it("renders title & description (children) and wires aria attributes", () => {
    render(
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
    render(
      <InlineMessage status="info" onClose={handler} isCloseTrigger>
        <InlineMessageTitle>タイトル</InlineMessageTitle>
        <InlineMessageDescription>説明</InlineMessageDescription>
      </InlineMessage>
    );
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });
});
