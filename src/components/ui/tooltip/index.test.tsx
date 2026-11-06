/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestContainer } from "@/test/helpers";
import { Tooltip, TooltipTrigger, TooltipContent } from "./index";

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Tooltip", () => {
  let testContainer: TestContainer;

  beforeEach(() => {
    testContainer = new TestContainer();
    testContainer.setup();
  });

  afterEach(() => {
    testContainer.cleanup();
  });

  it("renders TooltipTrigger and TooltipContent correctly", async () => {
    // Given: TooltipTriggerとTooltipContentを含むTooltipコンポーネントがレンダリングされる
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side="top">Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: TooltipTriggerが表示される
    expect(screen.getByText("Hover me")).toBeInTheDocument();

    // Then: ユーザーがTooltipTriggerにホバーするとTooltipContentが表示される
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    const tooltipContents = await screen.findAllByText("Tooltip Content");
    // 文字は tooltip-text に包まれているので、本体（tooltip-content）までさかのぼる
    // en: The text is wrapped in tooltip-text, so walk up to the content element
    const visibleTooltip = tooltipContents
      .map(text => text.closest('[data-slot="tooltip-content"]'))
      .find(content => content?.getAttribute("data-state") === "delayed-open");
    expect(visibleTooltip).toBeInTheDocument();
  });

  it("displays TooltipContent on hover", async () => {
    // Given: TooltipContentが含まれるTooltipコンポーネントがレンダリングされる
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentが表示されることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    // 文字は tooltip-text に包まれているので、本体（tooltip-content）までさかのぼる
    // en: The text is wrapped in tooltip-text, so walk up to the content element
    const visibleTooltip = tooltipContents
      .map(text => text.closest('[data-slot="tooltip-content"]'))
      .find(content => content?.getAttribute("data-state") === "delayed-open");
    expect(visibleTooltip).toBeVisible();
  });

  it("renders with default side when no side is provided", async () => {
    // Given: TooltipContentにsideが指定されていない
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentのdata-side属性がデフォルト値"top"であることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    // 文字は tooltip-text に包まれているので、本体（tooltip-content）までさかのぼる
    // en: The text is wrapped in tooltip-text, so walk up to the content element
    const visibleTooltip = tooltipContents
      .map(text => text.closest('[data-slot="tooltip-content"]'))
      .find(content => content?.getAttribute("data-state") === "delayed-open");
    expect(visibleTooltip).toHaveAttribute("data-side", "top");
  });

  it("applies the correct side to TooltipContent", async () => {
    // Given: TooltipContentにside="right"が指定されている
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent side="right">Tooltip Content</TooltipContent>
      </Tooltip>
    );

    // When: ユーザーがTooltipTriggerにホバーする
    const trigger = screen.getByText("Hover me");
    await userEvent.hover(trigger);

    // Then: TooltipContentのdata-side属性が"right"であることを確認する
    const tooltipContents = await screen.findAllByText("Tooltip Content");
    // 文字は tooltip-text に包まれているので、本体（tooltip-content）までさかのぼる
    // en: The text is wrapped in tooltip-text, so walk up to the content element
    const visibleTooltip = tooltipContents
      .map(text => text.closest('[data-slot="tooltip-content"]'))
      .find(content => content?.getAttribute("data-state") === "delayed-open");
    expect(visibleTooltip).toHaveAttribute("data-side", "right");
  });

  it("applies Figma tokens to the content and arrow", async () => {
    // Figma: Tooltip 973:684（2026-10-01 取得）
    // en: Figma Tooltip 973:684 (retrieved 2026-10-01)
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Token</TooltipTrigger>
        <TooltipContent side="top">Token Content</TooltipContent>
      </Tooltip>
    );
    await userEvent.hover(screen.getByText("Token"));
    await screen.findAllByText("Token Content");
    const content = document.querySelector(
      '[data-slot="tooltip-content"]'
    ) as HTMLElement;
    expect(content).toBeTruthy();
    ["bg-surface-inverse", "text-text-inverse", "rounded-notice"].forEach(cls =>
      expect(content.className).toContain(cls)
    );
    const arrow = content.querySelector("svg") as SVGElement;
    expect(arrow).toBeTruthy();
    const arrowClass = arrow.getAttribute("class") ?? "";
    ["bg-surface-inverse", "fill-surface-inverse"].forEach(cls =>
      expect(arrowClass).toContain(cls)
    );
  });

  it("animates with the Small motion tokens from the anchor side", async () => {
    // Given: 上に出る Tooltip
    testContainer.render(
      <Tooltip>
        <TooltipTrigger>Motion</TooltipTrigger>
        <TooltipContent side="top">Motion Content</TooltipContent>
      </Tooltip>
    );

    // When: ホバーして開く
    await userEvent.hover(screen.getByText("Motion"));
    await screen.findAllByText("Motion Content");
    const content = document.querySelector(
      '[data-slot="tooltip-content"]'
    ) as HTMLElement;

    // Then: 箱は Small のトークンで、アンカーの側（下）から出る
    // en: The box uses the Small motion tokens and rises from the anchor side
    [
      "animate-motion-pop-in-small",
      "data-[state=closed]:animate-motion-pop-out-small",
      "data-[side=top]:[--motion-pop-from-y:1]",
      "origin-(--radix-tooltip-content-transform-origin)",
    ].forEach(cls => expect(content.className).toContain(cls));
    expect(content.className).not.toMatch(
      /\b(animate-in|animate-out|duration-\d+)\b/
    );

    // Then: 文字は箱より遅れてフェードインする
    // en: The text fades in after the box
    const text = content.querySelector(
      '[data-slot="tooltip-text"]'
    ) as HTMLElement;
    expect(text).toHaveTextContent("Motion Content");
    expect(text.className).toContain("animate-motion-content-in-tooltip");
  });
});
